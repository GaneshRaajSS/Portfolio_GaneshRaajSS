# Ganesh Raaj S S — Portfolio

Personal portfolio website built with React.js showcasing my skills, work experience, projects, and contact information.

## Sections

- **About** — Introduction, role, and a certifications modal
- **Skills** — Tabbed skill cards (Languages, Frameworks, Cloud, Tools, AI Tools) with brand icons
- **Experience** — Work history timeline with expandable responsibilities
- **Projects** — Project cards with a detailed drawer view
- **Contact** — Contact links with copy-to-clipboard and an animated terminal card

## Tech Stack

- React.js
- CSS3 (no UI framework)
- react-icons

## Run Locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
```

## Mask Certificate Identifiers

Install the PDF tool once:

```bash
python -m pip install -r requirements.txt
```

Run the script with the same path twice to safely replace the PDF in place.
It writes and verifies a temporary masked file before replacing the existing
PDF, so the unmasked certificate does not remain in the project:

```bash
python scripts/mask_certificate_ids.py public/Certs/certificate.pdf public/Certs/certificate.pdf
```

By default, the script masks values after `Credential ID` and
`Certification number` labels. For other certificate labels, pass them with
`--labels`:

```bash
python scripts/mask_certificate_ids.py public/Certs/certificate.pdf public/Certs/certificate.pdf --labels "Credential ID" "Certificate number"
```

Review the PDF after masking. Scanned/image-only certificates need OCR or
image-based redaction.

If an ID is selectable in the PDF but its label is part of the certificate
image, pass the exact ID with `--values`:

```bash
python scripts/mask_certificate_ids.py public/Certs/certificate.pdf public/Certs/certificate.pdf --values "1120266"
```
