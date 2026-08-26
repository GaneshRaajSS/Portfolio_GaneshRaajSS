import React from 'react'
import './Navbar.css'

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
        <a href="#about" className="left-nav-name">
          Portfo<span>lio.</span>
        </a>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#" className="resume-link">Resume</a>
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
