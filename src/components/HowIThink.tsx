import { siteConfig } from '@/config/site';

const PRINCIPLE_ICONS = [
  // Question mark
  <svg key="q" viewBox="0 0 40 40" className="w-10 h-10">
    <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <path d="M 14 16 Q 14 11 20 11 Q 26 11 26 16 Q 26 19 22 21 L 22 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="22" cy="28" r="1.5" fill="currentColor" />
  </svg>,
  // Checkmark with X
  <svg key="t" viewBox="0 0 40 40" className="w-10 h-10">
    <rect x="6" y="6" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" rx="2" />
    <path d="M 11 15 L 15 19 L 22 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M 25 28 L 31 22 M 31 28 L 25 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  // Branching paths
  <svg key="c" viewBox="0 0 40 40" className="w-10 h-10">
    <circle cx="8" cy="20" r="2.5" fill="currentColor" />
    <circle cx="32" cy="10" r="2.5" fill="currentColor" />
    <circle cx="32" cy="30" r="2.5" fill="currentColor" />
    <circle cx="32" cy="20" r="2.5" fill="currentColor" />
    <path d="M 10 20 Q 20 20 30 10" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <path d="M 10 20 Q 20 20 30 30" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <path d="M 10 20 L 30 20" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>,
  // Eye / visibility
  <svg key="v" viewBox="0 0 40 40" className="w-10 h-10">
    <ellipse cx="20" cy="20" rx="14" ry="8" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <circle cx="20" cy="20" r="3.5" fill="currentColor" />
    <circle cx="20" cy="20" r="1.2" fill="var(--paper)" />
  </svg>,
];

export function HowIThink() {
  return (
    <section
      id="how-i-think"
      className="relative py-20 lg:py-32 border-t border-[var(--graphite)] bg-[var(--paper-dark)]/30"
      aria-label="How I Think"
    >
      <div className="section-padding max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="mb-12 lg:mb-20 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[var(--ink-muted)]">03</span>
            <span className="w-8 h-px bg-[var(--ink-muted)]" />
            <span className="editorial-label">How I Think</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--ink)] leading-[1.1] mb-4">
            The principles behind the investigations.
          </h2>

          <p className="text-[15px] text-[var(--ink-muted)] leading-relaxed max-w-xl">
            Four ideas that connect the projects — not rules, but habits of thinking
            that shape how I approach a problem.
          </p>
        </div>

        {/* Principles */}
        <div className="space-y-0">
          {siteConfig.principles.map((principle, idx) => (
            <div
              key={principle.number}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 py-10 lg:py-14 border-t border-[var(--graphite)] first:border-t-0"
            >
              {/* Number and icon */}
              <div className="lg:col-span-3 flex items-start gap-4">
                <div className="text-[var(--cobalt)]">
                  {PRINCIPLE_ICONS[idx]}
                </div>
                <div>
                  <span className="font-mono text-3xl font-medium text-[var(--graphite)] block">
                    {principle.number}
                  </span>
                </div>
              </div>

              {/* Statement */}
              <div className="lg:col-span-4">
                <h3 className="font-serif text-xl lg:text-2xl font-medium text-[var(--ink)] leading-snug">
                  {principle.title}
                </h3>
                <p className="font-serif text-base lg:text-lg text-[var(--ink-soft)] italic font-light leading-relaxed mt-2">
                  "{principle.statement}"
                </p>
              </div>

              {/* Description */}
              <div className="lg:col-span-5">
                <p className="text-[14px] text-[var(--ink-muted)] leading-[1.75] max-w-prose-ed">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
