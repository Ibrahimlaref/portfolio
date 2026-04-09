// components/ui/ProjectCard.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Github } from 'lucide-react';
import { Project } from '@/pages/Home/data/projects';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { t } = useTranslation('projects');
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({});
  };

  return (
    <div
      className="glass rounded-lg p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer"
      style={{ ...tiltStyle, willChange: 'transform' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative mb-4">
        <img
          src={`/screenshots/${project.id}.png`}
          alt={`${project.name} screenshot`}
          loading="lazy"
          className="w-full h-48 object-cover rounded-lg"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg hidden"
        >
          {project.name}
        </div>
      </div>

      <h3 className="text-xl font-space-grotesk font-bold mb-2 text-white">{project.name}</h3>
      <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.slice(0, 4).map((tech) => (
          <Badge key={tech} variant="secondary" className="text-xs">
            {tech}
          </Badge>
        ))}
        {project.tech.length > 4 && (
          <Badge variant="secondary" className="text-xs">
            +{project.tech.length - 4}
          </Badge>
        )}
      </div>

      <div className="flex space-x-2">
        <Button variant="outline" size="sm" asChild>
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            <Github className="h-4 w-4 mr-2" />
            GitHub
          </a>
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" size="sm">
              {t('buttons.details')}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0D1117] border-gray-700 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">{project.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-gray-300">{project.description}</p>
              <div>
                <h4 className="font-semibold text-white mb-2">Highlights</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {project.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default React.memo(ProjectCard);