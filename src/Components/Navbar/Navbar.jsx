import React from 'react'
import './Navbar.css'

const resumeUrl = `${process.env.PUBLIC_URL}/Ganesh%20Raaj%20Resume%202%2B.pdf`

const navLinks = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Contact',    href: '#contact' },
]

const Navbar = () => {
  return (
    <nav className="n-wrapper">
      <div className="left-nav">
        <div className="left-nav-name">
          Portfo<span>lio.</span>
        </div>
        <div className="resume-actions">
          <a
            href={resumeUrl}
            className="resume-link"
            target="_blank"
            rel="noreferrer"
          >
            View Resume
          </a>
          <a
            href={resumeUrl}
            className="resume-link resume-download"
            download="Ganesh-Raaj-Resume.pdf"
          >
            Download
          </a>
        </div>
      </div>
      <div className="right-nav">
        <ul>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
