import React from 'react'
import './Skills.css'

const skills = [
  { label: 'C# / .NET',        className: 'csharp', percent: '70%' },
  { label: 'Python',            className: 'python', percent: '50%' },
  { label: 'React.js',          className: 'react',  percent: '65%' },
  { label: 'JavaScript',        className: 'js',     percent: '65%' },
  { label: 'HTML',              className: 'html',   percent: '80%' },
  { label: 'CSS',               className: 'css',    percent: '75%' },
  { label: 'SQL Server',        className: 'sql',    percent: '65%' },
  { label: 'Microsoft Azure',   className: 'azure',  percent: '40%' },
]

const Skills = () => {
  return (
    <div className="Skills">
      <div className="s-left">
        <div className="T-skills">
          {skills.map((skill) => (
            <div className="s-box" key={skill.className}>
              <span className="s-title">{skill.label}</span>
              <div className="s-bar">
                <span className={`skill-per ${skill.className}`}>
                  <span className="s-per">{skill.percent}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Skills
