import { useEffect } from 'react';
import { ArrowLeft, ChevronRight, CheckCircle2, AlertCircle, Wrench, Lightbulb } from 'lucide-react';
import { siteConfig, type ProjectConfig } from '@/config/site';
import { ProjectLinks } from './ProjectLinks';
import { ProjectVisual } from './ProjectVisuals';

interface ProjectDetailProps {
  project: ProjectConfig | null;
  onClose: () => void;
}

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', onKey);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', onKey);
      };
    }
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-[var(--paper)] overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — project detail`}
    >
      <div className="sticky top-0 z-10 bg-[var(--paper)]/95 backdrop-blur-sm border-b border-[var(--graphite)]">
        <div className="section-padding h-[60px] flex items-center justify-between max-w-[1200px] mx-auto">
          <button
            onClick={onClose}
            className="focus-ring flex items-center gap-2 text-sm font-medium text-[var(--ink)] hover:text-[var(--cobalt-bright)] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </button>
          <span className="font-mono text-[10px] text-[var(--ink-muted)]">
            {project.number} / 06
          </span>
        </div>
      </div>

      <div className="section-padding max-w-[1200px] mx-auto py-12 lg:py-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--ink-muted)] mb-8">
          <span>Projects</span>
          <ChevronRight size={12} />
          <span className="text-[var(--ink)]">{project.title}</span>
        </div>

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-4xl font-medium text-[var(--graphite)]">{project.number}</span>
              <div>
                <p className="editorial-label">{project.category}</p>
              </div>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--ink)] leading-[1.05]">
              {project.title}
            </h1>

            <p className="font-serif text-lg lg:text-xl text-[var(--ink-soft)] italic font-light leading-relaxed">
              "{project.tagline}"
            </p>

            <div className="pt-2">
              <ProjectLinks demoUrl={project.demoUrl} githubUrl={project.githubUrl} />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative border border-[var(--graphite)] rounded bg-[var(--paper-dark)]/40 p-6 aspect-[4/3] flex items-center justify-center overflow-hidden">
              <ProjectVisual type={project.visualType} />
              <div className="absolute top-3 left-3 editorial-label">fig. {project.number}</div>
              <div className="absolute bottom-3 right-3 editorial-label">
                {project.visualType.replace(/-/g, ' ')}
              </div>
            </div>
          </div>
        </div>

        {/* Problem section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div>
                <p className="editorial-label mb-2">The Problem</p>
                <p className="font-serif text-lg text-[var(--ink)] leading-relaxed font-medium">
                  {project.problem}
                </p>
              </div>
              <div>
                <p className="editorial-label mb-2">Why It Matters</p>
                <p className="text-[14px] text-[var(--ink-muted)] leading-[1.7]">
                  {project.whyItMatters}
                </p>
              </div>
              <div>
                <p className="editorial-label mb-2">Core Approach</p>
                <p className="text-[14px] text-[var(--ink-muted)] leading-[1.7]">
                  {project.coreApproach}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-10">
            {/* Detailed description */}
            <div>
              <p className="editorial-label mb-3">Investigation</p>
              <p className="text-[15px] text-[var(--ink-soft)] leading-[1.75] max-w-prose-ed">
                {project.detailedDescription}
              </p>
            </div>

            {/* Features */}
            <div>
              <p className="editorial-label mb-4">Key Features</p>
              <div className="space-y-4">
                {project.features.map((feature, i) => (
                  <div key={i} className="flex gap-3">
                    <CheckCircle2 size={16} className="flex-shrink-0 text-[var(--cobalt-bright)] mt-0.5" />
                    <div>
                      <p className="text-[14px] font-medium text-[var(--ink)]">{feature.title}</p>
                      <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed mt-0.5">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Technical details */}
        <div className="border-t border-[var(--graphite)] pt-12 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Technical challenges */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Wrench size={14} className="text-[var(--amber)]" />
                <p className="editorial-label">Technical Challenges</p>
              </div>
              <ul className="space-y-3">
                {project.technicalChallenges.map((challenge, i) => (
                  <li key={i} className="flex gap-2.5 text-[13px] text-[var(--ink-soft)] leading-relaxed">
                    <span className="font-mono text-[var(--ink-muted)] mt-0.5">→</span>
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>

            {/* Design decisions */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb size={14} className="text-[var(--cobalt-bright)]" />
                <p className="editorial-label">Design Decisions</p>
              </div>
              <ul className="space-y-3">
                {project.designDecisions.map((decision, i) => (
                  <li key={i} className="flex gap-2.5 text-[13px] text-[var(--ink-soft)] leading-relaxed">
                    <span className="font-mono text-[var(--ink-muted)] mt-0.5">→</span>
                    {decision}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Testing and limitations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          <div>
            <p className="editorial-label mb-3">Testing & Evaluation</p>
            <p className="text-[13px] text-[var(--ink-muted)] leading-[1.7]">
              {project.testingApproach}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle size={14} className="text-[var(--amber)]" />
              <p className="editorial-label">Limitations</p>
            </div>
            <p className="text-[13px] text-[var(--ink-muted)] leading-[1.7]">
              {project.limitations}
            </p>
          </div>
        </div>

        {/* Future improvements */}
        <div className="mb-12">
          <p className="editorial-label mb-3">Future Improvements</p>
          <p className="text-[13px] text-[var(--ink-muted)] leading-[1.7] max-w-prose-ed">
            {project.futureImprovements}
          </p>
        </div>

        {/* Technical notes */}
        <div className="border-t border-[var(--graphite)] pt-8 mb-16">
          <p className="editorial-label mb-4">Technical Notes</p>
          <div className="flex flex-wrap gap-2">
            {project.techNotes.map((note, i) => (
              <span
                key={i}
                className="font-mono text-[11px] px-3 py-1.5 bg-[var(--paper-dark)] border border-[var(--graphite)] rounded text-[var(--ink-soft)]"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Navigation between projects */}
        <ProjectDetailNav currentId={project.id} onClose={onClose} />
      </div>
    </div>
  );
}

function ProjectDetailNav({
  currentId,
  onClose,
}: {
  currentId: string;
  onClose: () => void;
}) {
  const projects = siteConfig.projects;
  const currentIndex = projects.findIndex((p) => p.id === currentId);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const handleNav = (id: string) => {
    onClose();
    // Small delay to allow the detail panel to close before scrolling
    setTimeout(() => {
      const el = document.getElementById(`project-detail-anchor-${id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Open the new project detail
        window.dispatchEvent(new CustomEvent('open-project', { detail: id }));
      }
    }, 100);
  };

  return (
    <div className="border-t border-[var(--graphite)] pt-8 grid grid-cols-2 gap-4">
      {prevProject ? (
        <button
          onClick={() => handleNav(prevProject.id)}
          className="focus-ring group flex flex-col items-start gap-1 p-4 border border-[var(--graphite)] rounded hover:border-[var(--ink-muted)] transition-colors text-left"
        >
          <span className="font-mono text-[10px] text-[var(--ink-muted)]">← Previous</span>
          <span className="font-serif text-base font-medium text-[var(--ink)] group-hover:text-[var(--cobalt-bright)] transition-colors">
            {prevProject.title}
          </span>
        </button>
      ) : (
        <div />
      )}
      {nextProject ? (
        <button
          onClick={() => handleNav(nextProject.id)}
          className="focus-ring group flex flex-col items-end gap-1 p-4 border border-[var(--graphite)] rounded hover:border-[var(--ink-muted)] transition-colors text-right"
        >
          <span className="font-mono text-[10px] text-[var(--ink-muted)]">Next →</span>
          <span className="font-serif text-base font-medium text-[var(--ink)] group-hover:text-[var(--cobalt-bright)] transition-colors">
            {nextProject.title}
          </span>
        </button>
      ) : (
        <div />
      )}
    </div>
  );
}
