"""Mask identifier values in a certificate PDF.

Usage:
    python scripts/mask_certificate_ids.py public/Certs/certificate.pdf public/Certs/certificate.pdf
    python scripts/mask_certificate_ids.py original.pdf masked.pdf --labels "Credential ID" "Certificate number"

The input is safely replaced after a temporary masked copy is verified.
"""

from __future__ import annotations

import argparse
import os
import re
import sys
import tempfile
from pathlib import Path

import pymupdf


DEFAULT_LABELS = ("Certificate ID", "Credential ID", "Certification number")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input_pdf", type=Path, help="certificate PDF to mask")
    parser.add_argument(
        "output_pdf",
        type=Path,
        help="path for the masked PDF; use the input path to replace it in place",
    )
    parser.add_argument(
        "--labels",
        nargs="+",
        default=DEFAULT_LABELS,
        help="field labels whose values should be masked (default: %(default)s)",
    )
    parser.add_argument(
        "--values",
        nargs="+",
        default=(),
        help="explicit identifier values to mask when the PDF has no extractable label",
    )
    return parser.parse_args()


def mask_identifiers(
    input_pdf: Path,
    output_pdf: Path,
    labels: tuple[str, ...],
    values: tuple[str, ...] = (),
) -> int:
    if not input_pdf.is_file():
        raise FileNotFoundError(f"Input PDF does not exist: {input_pdf}")
    if any(not label.strip() for label in labels) or any(not value.strip() for value in values):
        raise ValueError("Field labels and identifier values cannot be empty.")
    if not labels and not values:
        raise ValueError("Provide at least one field label or identifier value.")

    patterns = [
        (label, re.compile(rf"^\s*{re.escape(label)}\s*:?\s*", re.IGNORECASE))
        for label in labels
    ]
    doc = pymupdf.open(input_pdf)
    masked_count = 0
    original_values = []

    try:
        for page in doc:
            page_replacements = []
            raw_page = page.get_text("rawdict")

            for block in raw_page["blocks"]:
                for line in block.get("lines", []):
                    chars = []
                    for span in line["spans"]:
                        for char in span["chars"]:
                            chars.append(
                                {
                                    **char,
                                    "font_size": span["size"],
                                    "color": span["color"],
                                }
                            )

                    line_text = "".join(char["c"] for char in chars)
                    for label, pattern in patterns:
                        match = pattern.match(line_text)
                        if not match:
                            continue

                        value_chars = chars[match.end():]
                        while value_chars and value_chars[-1]["c"].isspace():
                            value_chars.pop()
                        if not value_chars:
                            continue

                        original_values.append("".join(char["c"] for char in value_chars))
                        value_rect = pymupdf.Rect(value_chars[0]["bbox"])
                        for char in value_chars[1:]:
                            value_rect |= pymupdf.Rect(char["bbox"])
                        value_rect.x0 -= 0.3
                        value_rect.x1 += 0.3

                        first_char = value_chars[0]
                        color = first_char["color"]
                        page.add_redact_annot(value_rect, fill=(1, 1, 1), cross_out=False)
                        page_replacements.append(
                            (
                                pymupdf.Point(first_char["origin"]),
                                "*" * len(value_chars),
                                first_char["font_size"],
                                (
                                    ((color >> 16) & 255) / 255,
                                    ((color >> 8) & 255) / 255,
                                    (color & 255) / 255,
                                ),
                            )
                        )
                        masked_count += 1
                        break

            for value in values:
                for value_rect in page.search_for(value):
                    value_chars = [
                        char
                        for block in raw_page["blocks"]
                        for line in block.get("lines", [])
                        for span in line["spans"]
                        for char in span["chars"]
                        if pymupdf.Rect(char["bbox"]).intersects(value_rect)
                    ]
                    if not value_chars:
                        raise ValueError(
                            f"Could not determine text position for identifier value {value!r}."
                        )

                    original_values.append(value)
                    first_char = min(value_chars, key=lambda char: char["bbox"][0])
                    color = next(
                        span["color"]
                        for block in raw_page["blocks"]
                        for line in block.get("lines", [])
                        for span in line["spans"]
                        if first_char in span["chars"]
                    )
                    font_size = next(
                        span["size"]
                        for block in raw_page["blocks"]
                        for line in block.get("lines", [])
                        for span in line["spans"]
                        if first_char in span["chars"]
                    )
                    page.add_redact_annot(value_rect, fill=(1, 1, 1), cross_out=False)
                    page_replacements.append(
                        (
                            pymupdf.Point(first_char["origin"]),
                            "*" * len(value),
                            font_size,
                            (
                                ((color >> 16) & 255) / 255,
                                ((color >> 8) & 255) / 255,
                                (color & 255) / 255,
                            ),
                        )
                    )
                    masked_count += 1

            if page_replacements:
                page.apply_redactions(images=0, graphics=0)
                for origin, mask, font_size, color in page_replacements:
                    page.insert_text(
                        origin,
                        mask,
                        fontname="helv",
                        fontsize=font_size,
                        color=color,
                    )

        if masked_count == 0:
            extracted_pages = [page.get_text() for page in doc]
            extracted_text = "\n".join(extracted_pages)
            masked_values = sum(
                1
                for page_text in extracted_pages
                for line in page_text.splitlines()
                if re.fullmatch(r"\s*\*+\s*", line)
            )
            if values:
                already_masked = (
                    all(value not in extracted_text for value in values)
                    and masked_values >= len(values)
                )
            else:
                lines = [
                    line.strip()
                    for page_text in extracted_pages
                    for line in page_text.splitlines()
                    if line.strip()
                ]
                already_masked = all(
                    any(
                        re.fullmatch(rf"{re.escape(label)}\s*:?", line, re.IGNORECASE)
                        and index + 1 < len(lines)
                        and re.fullmatch(r"\*+", lines[index + 1])
                        for index, line in enumerate(lines)
                    )
                    for label in labels
                )
            if already_masked:
                return 0
            raise ValueError(
                "No identifier values found. Check the PDF text and field labels; "
                "use --values for selectable IDs without extractable labels. "
                "Scanned/image-only PDFs need OCR or image-based redaction."
            )

        output_pdf.parent.mkdir(parents=True, exist_ok=True)
        with tempfile.NamedTemporaryFile(
            suffix=output_pdf.suffix or ".pdf",
            dir=output_pdf.parent,
            delete=False,
        ) as temporary_file:
            temporary_pdf = Path(temporary_file.name)
        doc.save(temporary_pdf, garbage=4, deflate=True, clean=True)
    finally:
        doc.close()

    try:
        with pymupdf.open(temporary_pdf) as verified_doc:
            extracted_text = "\n".join(page.get_text() for page in verified_doc)
        for value in original_values:
            if value in extracted_text:
                raise RuntimeError("An original identifier value remains extractable after masking.")
        os.replace(temporary_pdf, output_pdf)
    finally:
        temporary_pdf.unlink(missing_ok=True)

    return masked_count


def main() -> int:
    args = parse_args()
    try:
        count = mask_identifiers(
            args.input_pdf,
            args.output_pdf,
            tuple(args.labels),
            tuple(args.values),
        )
    except (OSError, ValueError, RuntimeError, pymupdf.FileDataError) as error:
        print(f"Error: {error}", file=sys.stderr)
        return 1

    if count:
        print(f"Masked {count} identifier field(s) in {args.output_pdf}")
    else:
        print(f"No unmasked identifier values found; left {args.output_pdf} unchanged.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
