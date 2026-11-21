// components/ui/ProjectCard.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ExternalLink, FileText, Github, Play } from 'lucide-react';
import { Project, ProjectImage, ProjectVideo } from '@/pages/Home/data/projects';

interface ProjectCardProps {
  project: Project;
}

interface ProjectScreenshotsSliderProps {
  screenshots: Array<string | ProjectImage>;
  projectName: string;
  className?: string;
}

const ProjectScreenshot: React.FC<{ screenshot: string | ProjectImage; alt: string; className?: string }> = ({
  screenshot,
  alt,
  className,
}) => {
  if (typeof screenshot === 'string') {
    return <img src={screenshot} alt={alt} loading="lazy" className={className} />;
  }

  return (
    <picture className="project-screenshot-frame">
      <source srcSet={screenshot.webp} type="image/webp" />
      <img src={screenshot.jpeg} alt={screenshot.alt || alt} loading="lazy" className={className} />
    </picture>
  );
};

const ProjectDemoVideo: React.FC<{ video: ProjectVideo; projectName: string }> = ({ video, projectName }) => (
  <div className="space-y-2">
    {video.kind === 'file' ? (
      <video
        className="w-full rounded-lg"
        controls
        preload="metadata"
        poster={video.poster}
        aria-label={`Vidéo de démonstration : ${projectName}`}
      >
        <source src={video.src} type={video.mimeType ?? 'video/mp4'} />
        <a href={video.src}>{`Ouvrir la vidéo de démonstration de ${projectName}`}</a>
      </video>
    ) : (
      <iframe
        className="aspect-video w-full rounded-lg"
        src={video.src}
        title={`Vidéo de démonstration : ${projectName}`}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    )}
    <a className="text-sm text-cyan-300 underline" href={video.link ?? video.src} target="_blank" rel="noopener noreferrer">
      Ouvrir la vidéo de démonstration
    </a>
  </div>
);

const ProjectScreenshotsSlider: React.FC<ProjectScreenshotsSliderProps> = ({ screenshots, projectName, className = '' }) => {
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
      className={`project-screenshot-slider ${className} ${isVisible ? 'slide-visible' : ''}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={`Captures d’écran : ${projectName}`}
    >
      <div
        ref={sliderRef}
        className="project-screenshot-strip"
        aria-label={`Captures d’écran de ${projectName}`}
      >
        {screenshots.map((screenshot, index) => (
          <ProjectScreenshot
            key={typeof screenshot === 'string' ? screenshot : screenshot.webp}
            screenshot={screenshot}
            alt={`${projectName} — capture d’écran ${index + 1}`}
            className="project-screenshot-image"
          />
        ))}
      </div>
      <div className="mt-2 flex justify-center gap-1.5">
        {screenshots.map((screenshot, index) => (
          <button
            key={`${typeof screenshot === 'string' ? screenshot : screenshot.webp}-dot`}
            type="button"
            aria-label={`Afficher la capture d’écran ${index + 1}`}
            aria-current={activeIndex === index ? 'true' : undefined}
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
  const cardScreenshots = useMemo(
    () => (project.coverImage ? [project.coverImage, ...(project.screenshots ?? [])] : project.screenshots ?? []),
    [project.coverImage, project.screenshots]
  );

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
        {project.video?.previewImage ? (
          <a
            className="group relative block h-48 w-full overflow-hidden rounded-lg"
            href={project.video.link ?? project.video.src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Voir la vidéo de démonstration de ${project.name}`}
          >
            <ProjectScreenshot
              screenshot={project.video.previewImage}
              alt={project.video.previewImage.alt}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/25 text-white transition-colors group-hover:bg-black/40">
              <span className="flex items-center gap-2 rounded-full bg-black/75 px-4 py-2 font-semibold shadow-lg">
                <Play className="h-5 w-5 fill-current" aria-hidden="true" />
                Voir la vidéo
              </span>
            </span>
          </a>
        ) : cardScreenshots.length ? (
          <ProjectScreenshotsSlider
            screenshots={cardScreenshots}
            projectName={project.name}
            className="project-screenshot-slider-card"
          />
        ) : (
          <div
            className="flex h-48 items-center justify-center rounded-lg border border-white/10 bg-white/5 px-6 text-center text-sm text-gray-400"
            role="img"
            aria-label={`${project.name} project preview unavailable`}
          >
            Project preview unavailable
          </div>
        )}
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
        {project.github ? (
          <Button variant="outline" size="sm" asChild>
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </a>
          </Button>
        ) : null}
        {project.live ? (
          <Button variant="outline" size="sm" asChild>
            <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.name} live site`}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Live site
            </a>
          </Button>
        ) : null}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" size="sm">
              {t('buttons.details')}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0D1117] border-gray-700 max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">{project.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-gray-300">{project.description}</p>
              {(project.period || project.role) ? (
                <dl className="grid gap-3 rounded-lg border border-gray-700 bg-white/5 p-4 text-sm sm:grid-cols-2">
                  {project.period ? (
                    <div>
                      <dt className="text-gray-400">Period</dt>
                      <dd className="font-medium text-white">{project.period}</dd>
                    </div>
                  ) : null}
                  {project.role ? (
                    <div>
                      <dt className="text-gray-400">Role</dt>
                      <dd className="font-medium text-white">{project.role}</dd>
                    </div>
                  ) : null}
                </dl>
              ) : null}
              {project.coverImage ? (
                <ProjectScreenshot
                  screenshot={project.coverImage}
                  alt={project.coverImage.alt}
                  className="w-full rounded-lg"
                />
              ) : null}
              {project.screenshots?.length ? (
                <ProjectScreenshotsSlider
                  screenshots={project.screenshots}
                  projectName={project.name}
                  className="project-screenshot-slider-dialog"
                />
              ) : null}
              {project.video ? <ProjectDemoVideo video={project.video} projectName={project.name} /> : null}
              {project.reports?.length ? (
                <div>
                  <h4 className="font-semibold text-white mb-2">Reports</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.reports.map((report) => (
                      <Button key={report.href} variant="outline" size="sm" asChild>
                        <a href={report.href} target="_blank" rel="noopener noreferrer">
                          <FileText className="h-4 w-4 mr-2" aria-hidden="true" />
                          {report.label}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              ) : null}
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
