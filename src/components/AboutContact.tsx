import { useState } from 'react';
import { Copy, Check, Mail, Github, ExternalLink, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { isValidUrl, isValidMailto } from '@/utils/links';

const ICONS = {
  github: Github,
  mail: Mail,
  external: ExternalLink,
};

export function About() {
  return (
    <section
      id="about"
      className="relative py-20 lg:py-32 border-t border-[var(--graphite)] bg-[var(--paper-dark)]/30"
      aria-label="About"
    >
      <div className="section-padding max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="mb-12 lg:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[var(--ink-muted)]">05</span>
            <span className="w-8 h-px bg-[var(--ink-muted)]" />
            <span className="editorial-label">About</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Typographic portrait */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <div className="relative border border-[var(--graphite)] rounded bg-[var(--paper)] p-6 lg:p-8 space-y-6">
                {/* Typographic monogram */}
                <div className="relative aspect-square flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 paper-texture" />
                  <div className="relative text-center">
                    <div className="font-serif text-7xl lg:text-8xl font-medium text-[var(--ink)] leading-none">
                      R<span className="text-[var(--cobalt)]">.</span>R
                    </div>
                    <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink-muted)]">
                      Yaragonda
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-[var(--graphite)]" />
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[var(--graphite)]" />
                </div>

                {/* Identity */}
                <div className="space-y-3">
                  <div>
                    <p className="font-serif text-lg font-medium text-[var(--ink)]">
                      {siteConfig.name}
                    </p>
                  </div>
                  <div className="space-y-1.5 text-[13px] text-[var(--ink-muted)]">
                    <p>{siteConfig.field}</p>
                    <p>{siteConfig.school}</p>
                  </div>
                </div>

                {/* Contact link */}
                <div className="pt-2 border-t border-[var(--graphite)]">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="focus-ring inline-flex items-center gap-2 text-[13px] text-[var(--cobalt-bright)] hover:underline"
                  >
                    <Mail size={13} />
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* About text */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--ink)] leading-[1.1]">
              A student who builds to understand.
            </h2>

            <div className="space-y-5 max-w-prose-ed">
              {siteConfig.aboutText.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-[15px] lg:text-base text-[var(--ink-soft)] leading-[1.8]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Interests list */}
            <div className="pt-6 border-t border-[var(--graphite)]">
              <p className="editorial-label mb-4">Areas of Interest</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Algorithm analysis',
                  'Agent-based simulation',
                  'Decision systems',
                  'Systems thinking',
                  'Information literacy',
                  'Accessibility tools',
                  'Computational complexity',
                  'Adversarial testing',
                ].map((interest) => (
                  <span
                    key={interest}
                    className="font-mono text-[11px] px-3 py-1.5 bg-[var(--paper-dark)] border border-[var(--graphite)] rounded text-[var(--ink-soft)]"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6">
              <button
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 72;
                    window.scrollTo({ top, behavior: 'smooth' });
                  }
                }}
                className="focus-ring group inline-flex items-center gap-2 text-sm font-medium text-[var(--ink)] hover:text-[var(--cobalt-bright)] transition-colors"
              >
                Have a question worth exploring?
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: do nothing — the mailto link is still available
    }
  };

  const validSocialLinks = siteConfig.socialLinks.filter(
    (link) => isValidUrl(link.url) || isValidMailto(link.url)
  );

  return (
    <section
      id="contact"
      className="relative py-20 lg:py-32 border-t border-[var(--graphite)]"
      aria-label="Contact"
    >
      <div className="section-padding max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: editorial */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs text-[var(--ink-muted)]">06</span>
              <span className="w-8 h-px bg-[var(--ink-muted)]" />
              <span className="editorial-label">Contact</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--ink)] leading-[1.1]">
              Have a question worth exploring?
            </h2>

            <p className="text-[15px] text-[var(--ink-muted)] leading-relaxed max-w-xl">
              I'm interested in thoughtful conversations about software, algorithms,
              simulations, and ideas that become more interesting when you start
              testing them.
            </p>

            {/* Email actions */}
            <div className="pt-4 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="focus-ring inline-flex items-center gap-2 px-5 py-3 bg-[var(--ink)] text-[var(--paper)] text-sm font-medium rounded transition-all hover:bg-[var(--cobalt)]"
                >
                  <Mail size={16} />
                  {siteConfig.email}
                </a>
                <button
                  onClick={copyEmail}
                  className="focus-ring inline-flex items-center gap-2 px-4 py-3 border border-[var(--ink)] text-[var(--ink)] text-sm font-medium rounded transition-all hover:bg-[var(--ink)] hover:text-[var(--paper)]"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check size={16} className="text-green-600" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy
                    </>
                  )}
                </button>
              </div>

              {/* Social links */}
              {validSocialLinks.length > 0 && (
                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <span className="editorial-label">Also on</span>
                  {validSocialLinks.map((link) => {
                    const Icon = ICONS[link.icon];
                    const isMailto = link.url.startsWith('mailto:');
                    return (
                      <a
                        key={link.label}
                        href={link.url}
                        {...(!isMailto
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                        className="focus-ring inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--ink-soft)] hover:text-[var(--cobalt-bright)] transition-colors"
                      >
                        <Icon size={14} />
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right: closing statement */}
          <div className="lg:col-span-5">
            <div className="border border-[var(--graphite)] rounded p-6 lg:p-8 bg-[var(--paper-dark)]/30 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center border border-[var(--ink)] font-serif text-xs font-semibold">
                  S
                </span>
                <span className="font-serif text-sm font-medium text-[var(--ink)]">
                  Systems of Thought
                </span>
              </div>

              <p className="font-serif text-base text-[var(--ink-soft)] italic font-light leading-relaxed">
                "I build systems to understand the world, not just software to fill a screen."
              </p>

              <div className="pt-4 border-t border-[var(--graphite)] space-y-1.5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-muted)]">
                  {siteConfig.name}
                </p>
                <p className="font-mono text-[10px] text-[var(--ink-muted)]">
                  {siteConfig.field} · {siteConfig.school}
                </p>
                <p className="font-mono text-[10px] text-[var(--ink-muted)] pt-2">
                  © 2026 · Built with intent
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
