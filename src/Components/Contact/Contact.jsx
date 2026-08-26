import React from 'react'
import './Contact.css'

const contactLinks = [
  {
    label: 'Email',
    value: 'ssganeshraaj@gmail.com',
    href: 'mailto:ssganeshraaj@gmail.com',
  },
  {
    label: 'Phone',
    value: '+91 7338902478',
    href: 'tel:+917338902478',
  },
  {
    label: 'GitHub',
    value: 'github.com/ganeshraaj',
    href: 'https://github.com/ganeshraaj',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/ganeshraaj',
    href: 'https://linkedin.com/in/ganeshraaj',
  },
]

const Contact = () => {
  return (
    <div className="contact">
      <div className="contact-content">
        <div className="contact-info">
          <h2 className="contact-heading">
            Get In <span className="contact-highlight">Touch</span>
          </h2>
          <p className="contact-subtext">
            I am currently open to new opportunities. Whether you have a question,
            a project idea, or just want to say hi — feel free to reach out!
          </p>
          <div className="contact-links">
            {contactLinks.map((item) => (
              // eslint-disable-next-line react/jsx-no-target-blank
              <a
                key={item.label}
                href={item.href}
                className="contact-link-item"
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
              >
                <span className="contact-link-label">{item.label}</span>
                <span className="contact-link-value">{item.value}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="contact-form-wrap">
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input id="name" type="text" placeholder="Your name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="your@email.com" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="5" placeholder="Your message..." />
            </div>
            <button type="submit" className="contact-submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
