import React from 'react'
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

const Experience = () => {
  return (
    <div className="Experience">
      <div className="timeline">
        {experiences.map((exp) => (
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
                {exp.responsibilities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Experience
