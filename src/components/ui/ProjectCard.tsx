import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

const statusColors: Record<Project['status'], string> = {
  live: 'var(--green)',
  'in-progress': 'var(--yellow)',
  archived: 'var(--text-muted)',
};

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        transition: 'border-color var(--transition), background var(--transition)',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-accent)';
        (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-card-hover)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-card)';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: statusColors[project.status],
              display: 'block',
              flexShrink: 0,
              marginTop: '2px',
            }}
          />
          <span
            style={{
              fontSize: '17px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {project.name}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '12px',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '4px 10px',
                fontFamily: 'var(--font-mono)',
              }}
            >
              github
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '12px',
                color: 'var(--accent)',
                border: '1px solid var(--border-accent)',
                borderRadius: 'var(--radius-sm)',
                padding: '4px 10px',
                fontFamily: 'var(--font-mono)',
              }}
            >
              live ↗
            </a>
          )}
        </div>
      </div>

      <p
        style={{
          fontSize: '15px',
          color: 'var(--text-secondary)',
          lineHeight: '1.75',
          fontFamily: 'var(--font-mono)',
          margin: 0,
        }}
      >
        {project.description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {project.techStack.map((tech) => (
          <span
            key={tech}
            style={{
              fontSize: '13px',
              color: 'var(--text-secondary)',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              padding: '4px 12px',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ProjectCard;