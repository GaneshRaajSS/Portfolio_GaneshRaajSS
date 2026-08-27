import React, { useState, useEffect, useRef } from 'react'
import './Contact.css'

const contactLinks = [
  {
    label: 'Email',
    value: 'ssganeshraaj@gmail.com',
    href: 'mailto:ssganeshraaj@gmail.com',
    icon: '✉',
    copyable: true,
  },
  {
    label: 'Phone',
    value: '+91 7338902478',
    href: 'tel:+917338902478',
    icon: '📞',
    copyable: false,
  },
  {
    label: 'GitHub',
    value: 'github.com/ganeshraaj',
    href: 'https://github.com/ganeshraaj',
    icon: '⌥',
    copyable: false,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/ganeshraaj',
    href: 'https://linkedin.com/in/ganeshraaj',
    icon: 'in',
    copyable: false,
  },
]

const TERMINAL_LINES = [
  { type: 'comment', text: '# Let\'s build something great together' },
  { type: 'cmd',     text: 'whoami' },
  { type: 'out',     text: 'ganesh-raaj  —  Full Stack Developer' },
  { type: 'cmd',     text: 'cat status.txt' },
  { type: 'out',     text: '✔  Open to full-time & freelance roles' },
  { type: 'out',     text: '✔  Available for remote / hybrid work' },
  { type: 'out',     text: '✔  Based in Chennai, India' },
  { type: 'cmd',     text: 'echo $RESPONSE_TIME' },
  { type: 'out',     text: 'Within 24 hours  ⚡' },
  { type: 'cmd',     text: 'contact --send "Hey, let\'s talk!"' },
  { type: 'success', text: '→  Message delivered. Talk soon!' },
]

const CHAR_DELAY = 28
const LINE_PAUSE = 380

const TerminalCard = () => {
  const [visibleLines, setVisibleLines] = useState([])
  const [currentChar, setCurrentChar] = useState(0)
  const [lineIndex, setLineIndex] = useState(0)
  const [done, setDone] = useState(false)
  const bodyRef = useRef(null)

  useEffect(() => {
    if (done) return
    const line = TERMINAL_LINES[lineIndex]
    if (!line) { setDone(true); return }

    if (currentChar === 0) {
      setVisibleLines(prev => [...prev, { ...line, display: '' }])
    }

    if (currentChar < line.text.length) {
      const t = setTimeout(() => {
        setVisibleLines(prev => {
          const next = [...prev]
          next[next.length - 1] = { ...next[next.length - 1], display: line.text.slice(0, currentChar + 1) }
          return next
        })
        setCurrentChar(c => c + 1)
      }, CHAR_DELAY)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setLineIndex(i => i + 1)
        setCurrentChar(0)
      }, LINE_PAUSE)
      return () => clearTimeout(t)
    }
  }, [lineIndex, currentChar, done])

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [visibleLines])

  return (
    <div className="terminal-card">
      <div className="terminal-topbar">
        <span className="terminal-dot td-red" />
        <span className="terminal-dot td-yellow" />
        <span className="terminal-dot td-green" />
        <span className="terminal-title">ganesh@portfolio ~ </span>
      </div>
      <div className="terminal-body" ref={bodyRef}>
        {visibleLines.map((line, i) => (
          <div key={i} className={`t-line t-${line.type}`}>
            {line.type === 'cmd' && <span className="t-prompt">$ </span>}
            {line.type === 'comment' && <span className="t-prompt"></span>}
            <span>{line.display}</span>
            {i === visibleLines.length - 1 && !done && (
              <span className="t-cursor" />
            )}
          </div>
        ))}
        {done && <div className="t-line t-cmd"><span className="t-prompt">$ </span><span className="t-cursor" /></div>}
      </div>
    </div>
  )
}

const Contact = () => {
  const [copied, setCopied] = useState(false)

  const handleCopy = (e, value) => {
    e.preventDefault()
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <>
      <div className="Ctitle">
        <div className="BG-text-c"><span>CONTACT</span></div>
        <div className="C-title"><span>GET IN TOUCH</span></div>
      </div>
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
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  key={item.label}
                  href={item.href}
                  className="contact-link-item"
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                  onClick={item.copyable ? (e) => handleCopy(e, item.value) : undefined}
                >
                  <span className="contact-link-icon">{item.icon}</span>
                  <span className="contact-link-text">
                    <span className="contact-link-label">{item.label}</span>
                    <span className="contact-link-value">{item.value}</span>
                  </span>
                  {item.copyable && (
                    <span className="contact-copy-badge">
                      {copied ? 'Copied!' : 'Copy'}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>

          <div className="contact-visual">
            <TerminalCard />
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
