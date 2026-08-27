import React from 'react'
import './Certifications.css'

const certifications = [
  {
    id: 1,
    title: 'Microsoft Azure Fundamentals [AZ-900]',
    issuer: 'Microsoft',
    date: 'Nov 2024',
    credentialId: '5718572C159484BF',
    viewUrl: '#',
  },
  {
    id: 2,
    title: 'Postman API - Fundamentals',
    issuer: 'Postman',
    date: 'Apr 2025',
    // credentialId: 'UC-XXXX-XXXX',
    viewUrl: '#',
  },
  {
    id: 3,
    title: 'Microsoft Full Stack Engineer - Associate',
    issuer: 'Hexaware',
    date: 'Apr 2025',
    credentialId: 'TSR Bronze Certification',
    viewUrl: '#',
  },
  {
    id: 4,
    title: 'Scrum Fundamentals',
    issuer: 'Scrum Study',
    date: 'Oct 2025',
    credentialId: '1120266',
    viewUrl: '#',
  },
]

const Certifications = ({ onClose }) => {
  return (
    <div className="cert-overlay" onClick={onClose}>
      <div className="cert-modal" onClick={e => e.stopPropagation()}>
        <div className="cert-modal-header">
          <h2 className="cert-modal-title">My <span className="cert-highlight">Certifications</span></h2>
          <button className="cert-close" onClick={onClose}>✕</button>
        </div>
        <div className="cert-list">
          {certifications.map(cert => (
            <div className="cert-card" key={cert.id}>
              <div className="cert-card-left">
                <div className="cert-badge">🏅</div>
              </div>
              <div className="cert-card-body">
                <span className="cert-title">{cert.title}</span>
                <span className="cert-issuer">{cert.issuer} &nbsp;·&nbsp; {cert.date}</span>
                <span className="cert-id">Credential ID: {cert.credentialId}</span>
              </div>
              <a
                href={cert.viewUrl}
                target="_blank"
                rel="noreferrer"
                className="cert-view-btn"
              >
                View ↗
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Certifications

