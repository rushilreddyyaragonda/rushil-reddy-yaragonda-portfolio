import { ArrowRight, User } from 'lucide-react';
import { SystemVisual } from './SystemVisual';
import { siteConfig } from '@/config/site';

export function Home() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-[72px] paper-texture overflow-hidden"
      aria-label="Home"
    >
      <div className="section-padding w-full max-w-[1400px] mx-auto py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Editorial content */}
          <div className="lg:col-span-7 space-y-6 animate-fade-up">
            {/* Introductory label */}
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[var(--ink-muted)]" />
              <span className="editorial-label">
                Computer Science · Independent Projects
              </span>
            </div>

            {/* Main headline */}
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-medium leading-[1.05] tracking-tight text-[var(--ink)]">
              Systems
              <br />
              of Thought
            </h1>

            {/* Primary statement */}
            <p className="font-serif text-lg sm:text-xl lg:text-2xl text-[var(--ink-soft)] leading-relaxed max-w-xl italic font-light">
              "{siteConfig.tagline}"
            </p>

            {/* Supporting paragraph */}
            <p className="text-[15px] sm:text-base text-[var(--ink-muted)] leading-[1.7] max-w-lg">
              I'm interested in what happens beneath the surface: how algorithms fail,
              how people move through complex environments, how decisions change outcomes,
              and how small rules can shape entire systems.
            </p>

            {/* Name and academic context */}
            <div className="pt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[var(--ink-muted)]">
              <span className="font-medium text-[var(--ink-soft)]">{siteConfig.name}</span>
              <span className="w-1 h-1 rounded-full bg-[var(--graphite)]" />
              <span>{siteConfig.field}</span>
              <span className="w-1 h-1 rounded-full bg-[var(--graphite)]" />
              <span>{siteConfig.school}</span>
            </div>

            {/* Actions */}
            <div className="pt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => scrollToSection('projects')}
                className="focus-ring group inline-flex items-center gap-2 px-5 py-3 bg-[var(--ink)] text-[var(--paper)] text-sm font-medium rounded transition-all hover:bg-[var(--cobalt)]"
              >
                Explore the Projects
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="focus-ring group inline-flex items-center gap-2 px-5 py-3 border border-[var(--ink)] text-[var(--ink)] text-sm font-medium rounded transition-all hover:bg-[var(--ink)] hover:text-[var(--paper)]"
              >
                <User size={16} />
                A Little About Me
              </button>
            </div>
          </div>

          {/* Signature visual — editorial figure */}
          <div className="lg:col-span-5 relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {/* Figure frame */}
            <div className="relative">
              {/* Top metadata bar */}
              <div className="flex items-center justify-between mb-0 pb-0">
                <span className="editorial-label">fig. 01</span>
                <span className="font-mono text-[10px] text-[var(--ink-muted)] uppercase tracking-[0.2em]">
                  interactive
                </span>
              </div>

              {/* Canvas container */}
              <div className="relative h-[280px] sm:h-[360px] lg:h-[420px] xl:h-[460px] border border-[var(--graphite)] bg-[var(--paper)] overflow-hidden">
                <SystemVisual />

                {/* Corner ticks */}
                <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[var(--ink)]/30" />
                <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[var(--ink)]/30" />
                <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[var(--ink)]/30" />
                <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[var(--ink)]/30" />

                {/* Caption overlay (bottom) */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--paper)] via-[var(--paper)]/80 to-transparent pt-8 pb-3 px-3">
                  <p className="font-mono text-[9px] text-[var(--ink-muted)] leading-relaxed">
                    A network of connected ideas. Move your cursor to disturb the field.
                  </p>
                </div>
              </div>

              {/* Bottom caption strip */}
              <div className="flex items-center justify-between mt-0 pt-2 border-t border-[var(--graphite)]">
                <span className="font-mono text-[9px] text-[var(--ink-muted)] uppercase tracking-[0.15em]">
                  systems of thought
                </span>
                <span className="font-mono text-[9px] text-[var(--ink-muted)]">
                  10 nodes · ~30 edges
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom scroll hint */}
        <div className="hidden lg:flex items-center gap-3 mt-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <span className="editorial-label">scroll to explore</span>
          <span className="w-16 h-px bg-[var(--graphite)]" />
          <span className="font-mono text-[10px] text-[var(--ink-muted)]">06 projects · 04 principles · 04 experiments</span>
        </div>
      </div>
    </section>
  );
}
