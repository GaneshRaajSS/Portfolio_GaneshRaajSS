import React, { useState } from 'react'
import './Skills.css'
import { SiSharp, SiDotnet, SiPython, SiJavascript, SiHtml5, SiCss, SiReact, SiBootstrap, SiMui, SiGithubcopilot, SiGit, SiGithub, SiSnowflake } from 'react-icons/si'
import { FaDatabase } from 'react-icons/fa'
import { VscAzure } from 'react-icons/vsc'

const categories = [
  {
    name: 'Languages',
    skills: [
      { label: 'C#',         Icon: SiSharp,      color: '#9B4F96' },
      { label: 'Python',     Icon: SiPython,     color: '#3776AB' },
      { label: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
      { label: 'HTML5',      Icon: SiHtml5,      color: '#E34F26' },
      { label: 'CSS3',       Icon: SiCss,        color: '#1572B6' },
      { label: 'SQL',        Icon: FaDatabase,   color: '#CC2927' },
    ],
  },
  {
    name: 'Frameworks',
    skills: [
      { label: '.NET',        Icon: SiDotnet,    color: '#512BD4' },
      { label: 'React.js',    Icon: SiReact,     color: '#61DAFB' },
      { label: 'Bootstrap',   Icon: SiBootstrap, color: '#7952B3' },
      { label: 'Material UI', Icon: SiMui,       color: '#007FFF' },
    ],
  },
  {
    name: 'Cloud',
    skills: [
      { label: 'Azure', Icon: VscAzure, color: '#0089D6' },
    ],
  },
  {
    name: 'Tools',
    skills: [
      { label: 'Git',    Icon: SiGit,    color: '#F05032' },
      { label: 'GitHub', Icon: SiGithub, color: '#111'    },
    ],
  },
  {
    name: 'AI Tools',
    skills: [
      { label: 'GitHub Copilot', Icon: SiGithubcopilot, color: '#111'    },
      { label: 'Droid',         Icon: SiSnowflake,     color: '#d83536' },
    ],
  },
]

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('Languages')

  const current = categories.find(c => c.name === activeCategory)

  return (
    <>
      <div className="Stitle">
        <div className="BG-text"><span>ABOUT ME</span></div>
        <div className="S-title"><span>SKILLS</span></div>
      </div>
      <div className="Skills">
        <div className="skills-tabs">
          {categories.map(cat => (
            <button
              key={cat.name}
              className={`skills-tab${activeCategory === cat.name ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat.name)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="skills-grid">
          {current.skills.map(({ label, Icon, color }) => (
            <div className="skill-card" key={label}>
              <div className="skill-card-icon">
                <Icon size={46} color={color} />
              </div>
              <span className="skill-card-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Skills

