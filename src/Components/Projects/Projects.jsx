import React, { useState } from 'react'
import './Projects.css'
import ProjectDrawer from './ProjectDrawer/ProjectDrawer'

const projects = [
  {
    id: 1,
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
          <div
            className="project-card"
            key={project.id}
            onClick={() => setActiveProject(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setActiveProject(project)}
          >
            <h3>{project.title}</h3>
            <p className="project-duration">{project.duration}</p>
            <p className="project-desc">{project.description}</p>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <span className="project-cta">View Details &rarr;</span>
          </div>
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

