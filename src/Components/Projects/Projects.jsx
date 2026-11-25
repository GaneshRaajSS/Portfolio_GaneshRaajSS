import React, { useState } from 'react'
import './Projects.css'
import ProjectDrawer from './ProjectDrawer/ProjectDrawer'

const projects = [
  {
    id: 1,
    category: 'AI • FULL-STACK',
    title: 'Document Similarity Comparison & Ranking System',
    duration: 'May 2025 - June 2025',
    description:
      'AI-powered resume-to-JD matching engine using dual-layer comparison: semantic filtering with Azure OpenAI embeddings and deep ranking with GPT-4o-mini.',
    tags: ['React', 'FastAPI', 'MS SQL', 'Azure', 'OpenAI', 'OpenTelemetry'],
    responsibilities: [
      'Designed and implemented a dual-layer AI matching engine using Azure OpenAI text-embedding-3-small for semantic filtering and GPT-4o-mini for deep contextual ranking.',
      'Developed backend services using Python and FastAPI with modular layers for resume/JD uploads, PDF/DOCX text extraction, embedding generation, and similarity computation.',
      'Stored resume metadata, job descriptions, pre-computed embeddings, GPT explanations, similarity scores, and ranking history in MS SQL Server.',
      'Integrated Azure Blob Storage for uploaded resumes and reports with logical folder structures and access-tier controls.',
      'Used Azure Communication Services for email notifications and OpenTelemetry with Azure Application Insights for metrics, logs, and traces.',
      'Built secure authentication and RBAC using Okta MFA.',
    ],
    highlights: [
      'Reduced manual screening time with automated AI-driven shortlisting',
      'GPT-4o-mini generated human-readable explanations alongside scores',
      'Full observability stack with distributed tracing via OpenTelemetry',
    ],
    github: 'https://github.com/GaneshRaajSS/Designathon_ResumeRanker',
    live: null,
  },
  {
    id: 2,
    category: 'DESKTOP • PRODUCTIVITY • EXPERIMENTAL',
    title: 'DeskMate: Nova the Dragon',
    duration: 'Sept 2026 - Nov 2026',
    description:
      'A Python-based desktop productivity and learning companion featuring animated states, interview preparation, and gamified DSA training.',
    tags: ['Python', 'tkinter', 'PIL/Pillow', 'Factory Droid SDK', 'JSON', 'pystray', 'keyboard'],
    responsibilities: [
      'Conceptualized and defined requirements for a Python-based desktop productivity and learning application.',
      'Used Claude through Factory Droid for AI-assisted implementation of an animated desktop companion, interview preparation module, and DSA trainer.',
      'Guided the development of features including 15+ animation states, repository-aware interview questions, and gamified learning progression.',
      'Performed functional testing, identified defects, and resolved issues through AI-assisted troubleshooting and minor code modifications.',
      'Delivered the initial application within one week, followed by one week of testing and bug fixes.',
    ],
    highlights: [
      'Built 15+ animated desktop companion states',
      'Added repository-aware interview questions and a gamified DSA trainer',
      'Completed the initial application and bug-fix cycle in two weeks',
    ],
    github: null,
    live: null,
  },
]

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null)

  return (
    <>
    <div className="Ptitle">
      <div className="BG-text-p"><span>PROJECTS</span></div>
      <div className="P-title"><span>RECENT WORKS</span></div>
    </div>
    <div className="Projects">
      <div className="project-cards">
        {projects.map((project) => (
          <article
            className={`project-card project-card--${project.id}`}
            key={project.id}
            onClick={() => setActiveProject(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setActiveProject(project)
              }
            }}
          >
            <div className="project-card-topline">
              <span className="project-number">0{project.id}</span>
              <span className="project-category">{project.category}</span>
            </div>
            <div className="project-card-content">
              <p className="project-duration">{project.duration}</p>
              <h3>{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              <div className="project-tags">
                {project.tags.slice(0, 4).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
                {project.tags.length > 4 && (
                  <span className="project-tag-more">+{project.tags.length - 4}</span>
                )}
              </div>
              <span className="project-cta">
                Explore project <span aria-hidden="true">↗</span>
              </span>
            </div>
          </article>
        ))}
      </div>

      {activeProject && (
        <ProjectDrawer
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </div>
    </>
  )
}

export default Projects

