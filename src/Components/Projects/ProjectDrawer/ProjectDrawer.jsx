import React, { useEffect } from 'react'
import './ProjectDrawer.css'

const ProjectDrawer = ({ project, onClose }) => {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!project) return null

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <div className="drawer" role="dialog" aria-modal="true">
        <button className="drawer-close" onClick={onClose} aria-label="Close">&#x2715;</button>

        <div className="drawer-content">
          <p className="drawer-duration">{project.duration}</p>
          <h2 className="drawer-title">{project.title}</h2>

          <div className="drawer-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <p className="drawer-desc">{project.description}</p>

          {project.responsibilities && (
            <div className="drawer-section">
              <h4>Responsibilities</h4>
              <ul>
                {project.responsibilities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}

          {project.highlights && (
            <div className="drawer-section">
              <h4>Highlights</h4>
              <ul>
                {project.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="drawer-links">
            {project.github && (
              <a href={project.github} target="https://github.com/GaneshRaajSS" rel="noreferrer" className="drawer-btn drawer-btn-outline">
                GitHub
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="drawer-btn drawer-btn-filled">
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectDrawer
