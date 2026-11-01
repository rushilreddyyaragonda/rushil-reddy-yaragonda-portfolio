import { ExternalLink, Github } from 'lucide-react';
import { isValidUrl, isValidGithubUrl } from '@/utils/links';

interface ProjectLinksProps {
  demoUrl: string;
  githubUrl: string;
  variant?: 'light' | 'dark';
}

export function ProjectLinks({ demoUrl, githubUrl, variant = 'light' }: ProjectLinksProps) {
  const showDemo = isValidUrl(demoUrl);
  const showGithub = isValidGithubUrl(githubUrl);

  if (!showDemo && !showGithub) return null;

  const baseClasses =
    variant === 'dark'
      ? 'inline-flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium rounded transition-all'
      : 'inline-flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium rounded transition-all';

  const demoClasses =
    variant === 'dark'
      ? 'bg-[var(--paper)] text-[var(--ink)] hover:bg-white'
      : 'bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--cobalt)]';

  const githubClasses =
    variant === 'dark'
      ? 'border border-[var(--paper)]/40 text-[var(--paper)] hover:bg-[var(--paper)]/10'
      : 'border border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]';

  return (
    <div className="flex flex-wrap items-center gap-3">
      {showDemo && (
        <a
          href={demoUrl.trim()}
          target="_blank"
          rel="noopener noreferrer"
          className={`focus-ring ${baseClasses} ${demoClasses}`}
        >
          <ExternalLink size={14} />
          Live Demo
        </a>
      )}
      {showGithub && (
        <a
          href={githubUrl.trim()}
          target="_blank"
          rel="noopener noreferrer"
          className={`focus-ring ${baseClasses} ${githubClasses}`}
        >
          <Github size={14} />
          GitHub Repository
        </a>
      )}
    </div>
  );
}
