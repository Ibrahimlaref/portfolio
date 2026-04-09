// pages/Home/sections/ProjectsSection.tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Button } from '@/components/ui/button';
import ProjectCard from '@/components/ui/ProjectCard';
import { projects } from '../data/projects';

const ProjectsSection = () => {
  const { t } = useTranslation('projects');
  const ref = useScrollReveal();
  const [filter, setFilter] = useState<'All' | 'SaaS' | 'Backend' | 'Marketplace' | 'API'>('All');

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  const categories = ['All', 'SaaS', 'Backend', 'Marketplace', 'API'];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div ref={ref} className="text-center mb-12 reveal">
        <h2 className="text-4xl font-space-grotesk font-bold text-white mb-4">
          {t('title')}
        </h2>
        <p className="text-lg text-gray-300">
          {t('subtitle')}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((category) => (
          <Button
            key={category}
            variant={filter === category ? 'default' : 'outline'}
            onClick={() => setFilter(category as any)}
            className={filter === category ? 'bg-cyan-600 hover:bg-cyan-700' : ''}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;