import { useEffect, useState } from 'react';
import { Menu, X, ArrowUp } from 'lucide-react';
import { useActiveSection } from '@/hooks/useActiveSection';

const NAV_SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'how-i-think', label: 'How I Think' },
  { id: 'experiments', label: 'Experiments' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

const SECTION_IDS = NAV_SECTIONS.map((s) => s.id);

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowBackToTop(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--paper)]/95 backdrop-blur-sm border-b border-[var(--graphite)]'
            : 'bg-transparent'
        }`}
      >
        <nav className="section-padding h-[72px] flex items-center justify-between" aria-label="Primary">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="focus-ring flex items-center gap-2.5 group"
            aria-label="Go to home"
          >
            <span className="flex items-center justify-center w-7 h-7 border border-[var(--ink)] transition-colors group-hover:bg-[var(--ink)] group-hover:text-[var(--paper)]">
              <span className="font-serif text-sm font-semibold">S</span>
            </span>
            <span className="hidden sm:block font-serif text-[15px] font-medium tracking-tight text-[var(--ink)]">
              Systems of Thought
            </span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_SECTIONS.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <li key={section.id}>
                  <button
                    onClick={() => handleNavClick(section.id)}
                    className={`focus-ring relative px-3 py-1.5 text-[13px] font-medium transition-colors rounded ${
                      isActive
                        ? 'text-[var(--ink)]'
                        : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {section.label}
                    {isActive && (
                      <span className="absolute -bottom-0.5 left-3 right-3 h-px bg-[var(--cobalt-bright)]" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="focus-ring md:hidden flex items-center justify-center w-10 h-10 rounded text-[var(--ink)]"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[var(--paper)] border-b border-[var(--graphite)] animate-fade-in">
            <ul className="section-padding py-4 space-y-1">
              {NAV_SECTIONS.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <li key={section.id}>
                    <button
                      onClick={() => handleNavClick(section.id)}
                      className={`focus-ring w-full text-left px-3 py-2.5 text-sm font-medium rounded transition-colors ${
                        isActive
                          ? 'text-[var(--ink)] bg-[var(--paper-dark)]'
                          : 'text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--paper-dark)]/50'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span className="font-mono text-[10px] text-[var(--ink-muted)] mr-2">
                        0{NAV_SECTIONS.indexOf(section) + 1}
                      </span>
                      {section.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </header>

      {/* Back to top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="focus-ring fixed bottom-6 right-6 z-40 flex items-center justify-center w-11 h-11 bg-[var(--ink)] text-[var(--paper)] rounded-full shadow-lg hover:bg-[var(--cobalt)] transition-colors animate-fade-in"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </>
  );
}
