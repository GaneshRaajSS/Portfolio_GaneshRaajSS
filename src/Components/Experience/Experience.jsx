import React, { useState } from 'react'
import './Experience.css'

const experiences = [
  {
    id: 1,
    company: 'Hexaware Technologies Ltd',
    client: 'EY (Ernst & Young)',
    role: 'Associate Software Developer',
    duration: 'Oct 2024 - Present',
    location: 'Chennai, Tamil Nadu, India',
    tools: ['C#', '.NET', 'React.js', 'Python', 'SQL Server', 'Azure'],
    responsibilities: [
      'Working on Fullstack development using C#, .NET, Python, SQL Server and Azure for application development and integration.',
      'Developing and maintaining user interfaces using React.js, JavaScript, HTML5, and CSS3.',
      'Working with UX to implement visual concepts and ensure a consistent user experience.',
      'Optimizing web applications for maximum speed and scalability across devices and browsers.',
      'Ensuring cross-browser compatibility and conducting code reviews.',
      'Supporting and guiding the team for analyzing and fixing defects.',
      'Conducting Knowledge Transfer (KT) sessions for teammates on application functionality and development practices.',
      'Providing code documentation and other inputs to technical documents.',
    ],
  },
]

const PREVIEW_COUNT = 3

const ExperienceCard = ({ exp }) => {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? exp.responsibilities : exp.responsibilities.slice(0, PREVIEW_COUNT)

  return (
    <div className="timeline-item" key={exp.id}>
      <div className="timeline-marker" />
      <div className="timeline-card">
        <div className="exp-header">
          <div className="exp-header-left">
            <h3 className="exp-role">{exp.role}</h3>
            <span className="exp-company">{exp.company}</span>
            {exp.client && (
              <span className="exp-client">Client: {exp.client}</span>
            )}
          </div>
          <div className="exp-header-right">
            <span className="exp-duration">{exp.duration}</span>
            <span className="exp-location">{exp.location}</span>
          </div>
        </div>
        <div className="exp-tools">
          {exp.tools.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>
        <ul className="exp-responsibilities">
          {visible.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
        {exp.responsibilities.length > PREVIEW_COUNT && (
          <button
            className="exp-toggle"
            onClick={() => setExpanded(e => !e)}
          >
            {expanded
              ? '▲ Show less'
              : `▼ Show ${exp.responsibilities.length - PREVIEW_COUNT} more`}
          </button>
        )}
      </div>
    </div>
  )
}

const Experience = () => {
  return (
    <>
    <div className="Etitle">
      <div className="BG-text-e"><span>EXPERIENCE</span></div>
      <div className="E-title"><span>WORK HISTORY</span></div>
    </div>
    <div className="Experience">
      <div className="timeline">
        {experiences.map((exp) => (
          <ExperienceCard key={exp.id} exp={exp} />
        ))}
      </div>
    </div>
    </>
  )
}

export default Experience

