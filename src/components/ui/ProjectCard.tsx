// components/ui/ProjectCard.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Github } from 'lucide-react';
import { Project } from '@/pages/Home/data/projects';

interface ProjectCardProps {
  project: Project;
}

interface ProjectScreenshotsSliderProps {
  screenshots: string[];
  projectName: string;
}

const ProjectScreenshotsSlider: React.FC<ProjectScreenshotsSliderProps> = ({ screenshots, projectName }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const scrollToIndex = (index: number) => {
    sliderRef.current?.scrollTo({
      left: sliderRef.current.offsetWidth * index,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (!wrapper || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(wrapper);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!screenshots?.length) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => {
        const nextIndex = (currentIndex + 1) % screenshots.length;
        sliderRef.current?.scrollTo({
          left: sliderRef.current.offsetWidth * nextIndex,
          behavior: 'smooth',
        });
        return nextIndex;
      });
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [screenshots]);

  return (
    <div
      ref={wrapperRef}
      className={`project-screenshot-slider ${isVisible ? 'slide-visible' : ''}`}
    >
      <div
        ref={sliderRef}
        className="project-screenshot-strip"
        aria-label={`${projectName} screenshots`}
      >
        {screenshots.map((screenshot, index) => (
          <img
            key={screenshot}
            src={screenshot}
            alt={`${projectName} screenshot ${index + 1}`}
            loading="lazy"
            className="project-screenshot-image"
          />
        ))}
      </div>
      <div className="mt-2 flex justify-center gap-1.5">
        {screenshots.map((screenshot, index) => (
          <button
            key={`${screenshot}-dot`}
            type="button"
            aria-label={`Show screenshot ${index + 1}`}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              activeIndex === index ? 'bg-cyan-400' : 'bg-gray-600'
            }`}
            onClick={() => {
              setActiveIndex(index);
              scrollToIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

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

      {project.screenshots?.length ? (
        <ProjectScreenshotsSlider screenshots={project.screenshots} projectName={project.name} />
      ) : null}

      <div className="flex space-x-2">
        {project.github ? (
          <Button variant="outline" size="sm" asChild>
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </a>
          </Button>
        ) : null}
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
