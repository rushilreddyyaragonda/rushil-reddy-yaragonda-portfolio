import { useState } from 'react';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import { siteConfig, type ProjectConfig } from '@/config/site';
import { ProjectLinks } from './ProjectLinks';
import { ProjectVisual } from './ProjectVisuals';

const STATUS_COLORS: Record<string, string> = {
  'In development': 'text-[var(--amber)] bg-[var(--amber)]/8 border-[var(--amber)]/20',
  'Functional prototype': 'text-[var(--cobalt-bright)] bg-[var(--cobalt-bright)]/8 border-[var(--cobalt-bright)]/20',
  'Live demo available': 'text-green-700 bg-green-50 border-green-200',
  'Completed': 'text-green-700 bg-green-50 border-green-200',
};

function StatusBadge({ status }: { status: string }) {
  const colorClass = STATUS_COLORS[status] ?? 'text-[var(--ink-muted)] bg-[var(--paper-dark)] border-[var(--graphite)]';
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider border rounded ${colorClass}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function ProjectRow({
  project,
  index,
  onOpen,
}: {
  project: ProjectConfig;
  index: number;
  onOpen: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const isFeatured = index === 0;
  const isReversed = index % 2 === 1;

  if (isFeatured) {
    return (
      <article className="relative group">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Visual */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative border border-[var(--graphite)] rounded bg-[var(--paper-dark)]/40 p-6 aspect-[4/3] flex items-center justify-center overflow-hidden">
              <ProjectVisual type={project.visualType} />
              <div className="absolute top-3 left-3 editorial-label">fig. {project.number}</div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-2xl font-medium text-[var(--graphite)]">{project.number}</span>
              <StatusBadge status={project.status} />
            </div>

            <div>
              <p className="editorial-label mb-2">{project.category}</p>
              <h3 className="font-serif text-3xl lg:text-4xl font-medium tracking-tight text-[var(--ink)] leading-tight">
                {project.title}
              </h3>
            </div>

            <p className="font-serif text-base lg:text-lg text-[var(--ink-soft)] italic font-light leading-relaxed">
              "{project.tagline}"
            </p>

            <p className="text-[14px] text-[var(--ink-muted)] leading-[1.7] max-w-prose-ed">
              {project.shortDescription}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpen(project.id)}
                className="focus-ring group/btn inline-flex items-center gap-2 text-sm font-medium text-[var(--ink)] hover:text-[var(--cobalt-bright)] transition-colors"
              >
                Read the investigation
                <ArrowRight size={15} className="transition-transform group-hover/btn:translate-x-0.5" />
              </button>
              <ProjectLinks demoUrl={project.demoUrl} githubUrl={project.githubUrl} />
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="relative group">
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start ${isReversed ? '' : ''}`}>
        {/* Content */}
        <div className={`lg:col-span-7 space-y-3 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xl font-medium text-[var(--graphite)]">{project.number}</span>
            <StatusBadge status={project.status} />
          </div>

          <div>
            <p className="editorial-label mb-1.5">{project.category}</p>
            <h3 className="font-serif text-2xl lg:text-3xl font-medium tracking-tight text-[var(--ink)] leading-tight">
              {project.title}
            </h3>
          </div>

          <p className="font-serif text-sm lg:text-base text-[var(--ink-soft)] italic font-light leading-relaxed">
            "{project.tagline}"
          </p>

          {/* Expandable short description */}
          <div className="space-y-2">
            <p className="text-[13px] text-[var(--ink-muted)] leading-[1.7] max-w-prose-ed">
              {expanded ? project.detailedDescription : project.shortDescription}
            </p>
            <button
              onClick={() => setExpanded((v) => !v)}
              className="focus-ring inline-flex items-center gap-1 text-[12px] font-medium text-[var(--cobalt-bright)] hover:underline"
            >
              {expanded ? (
                <><Minus size={13} /> Show less</>
              ) : (
                <><Plus size={13} /> Expand overview</>
              )}
            </button>
          </div>

          <div className="pt-1 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpen(project.id)}
              className="focus-ring group/btn inline-flex items-center gap-2 text-sm font-medium text-[var(--ink)] hover:text-[var(--cobalt-bright)] transition-colors"
            >
              Read the investigation
              <ArrowRight size={15} className="transition-transform group-hover/btn:translate-x-0.5" />
            </button>
            <ProjectLinks demoUrl={project.demoUrl} githubUrl={project.githubUrl} />
          </div>
        </div>

        {/* Visual */}
        <div className={`lg:col-span-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="relative border border-[var(--graphite)] rounded bg-[var(--paper-dark)]/40 p-5 aspect-[4/3] flex items-center justify-center overflow-hidden">
            <ProjectVisual type={project.visualType} />
            <div className="absolute top-3 left-3 editorial-label">fig. {project.number}</div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Projects({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  const [filter, setFilter] = useState<string | null>(null);

  const categories = Array.from(
    new Set(siteConfig.projects.map((p) => p.category))
  );

  const filtered = filter
    ? siteConfig.projects.filter((p) => p.category === filter)
    : siteConfig.projects;

  return (
    <section
      id="projects"
      className="relative py-20 lg:py-32 border-t border-[var(--graphite)]"
      aria-label="Projects"
    >
      <div className="section-padding max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="mb-12 lg:mb-20 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[var(--ink-muted)]">02</span>
            <span className="w-8 h-px bg-[var(--ink-muted)]" />
            <span className="editorial-label">Projects</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--ink)] leading-[1.1] mb-4">
            Six projects. Six ways of questioning a system.
          </h2>

          <p className="text-[15px] text-[var(--ink-muted)] leading-relaxed max-w-xl">
            Each project begins with a question. The software is how I investigate it.
          </p>
        </div>

        {/* Category filter */}
        <div className="mb-10 lg:mb-16 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilter(null)}
            className={`focus-ring px-3 py-1.5 text-[12px] font-medium rounded-full border transition-all ${
              filter === null
                ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]'
                : 'text-[var(--ink-muted)] border-[var(--graphite)] hover:border-[var(--ink-muted)]'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`focus-ring px-3 py-1.5 text-[12px] font-medium rounded-full border transition-all ${
                filter === cat
                  ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]'
                  : 'text-[var(--ink-muted)] border-[var(--graphite)] hover:border-[var(--ink-muted)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project rows */}
        <div className="space-y-20 lg:space-y-28">
          {filtered.map((project, idx) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={siteConfig.projects.indexOf(project)}
              onOpen={onOpenProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
