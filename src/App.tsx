import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Home } from '@/components/Home';
import { Projects } from '@/components/Projects';
import { ProjectDetail } from '@/components/ProjectDetail';
import { HowIThink } from '@/components/HowIThink';
import { Experiments } from '@/components/Experiments';
import { About, Contact } from '@/components/AboutContact';
import { siteConfig } from '@/config/site';

function App() {
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);

  const openProject = (id: string) => {
    setOpenProjectId(id);
  };

  const closeProject = () => {
    setOpenProjectId(null);
  };

  // Listen for cross-component project navigation (from ProjectDetailNav)
  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      setOpenProjectId(id);
    };
    window.addEventListener('open-project', handler);
    return () => window.removeEventListener('open-project', handler);
  }, []);

  const openProject_ = openProjectId
    ? siteConfig.projects.find((p) => p.id === openProjectId) ?? null
    : null;

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Navigation />

      <main>
        <Home />
        <Projects onOpenProject={openProject} />
        <HowIThink />
        <Experiments />
        <About />
        <Contact />
      </main>

      <ProjectDetail project={openProject_} onClose={closeProject} />
    </div>
  );
}

export default App;
