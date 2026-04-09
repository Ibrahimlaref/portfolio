// pages/Home/sections/SkillsSection.tsx
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SkillTag from '@/components/ui/SkillTag';

const SkillsSection = () => {
  const { t } = useTranslation('skills');
  const ref = useScrollReveal();

  const skills = [
    'Django', 'Nest.js', 'Express.js', 'Flask', 'FastAPI', 'GraphQL', 'Strawberry',
    'React.js', 'Next.js', 'React Native', 'Vue.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS',
    'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite',
    'Python', 'JavaScript', 'TypeScript', 'Java', 'C/C++',
    'Docker', 'Git', 'GitHub Actions', 'CI/CD', 'Linux', 'Nginx', 'AWS',
    'OpenAI API', 'LangChain', 'LangGraph', 'RAG', 'Vector DBs', 'CrewAI', 'AutoGen', 'Prompt Engineering'
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div ref={ref} className="text-center mb-12 reveal">
        <h2 className="text-4xl font-space-grotesk font-bold text-white mb-4">
          {t('title')}
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {skills.map((skill, index) => (
          <SkillTag key={skill} skill={skill} index={index} />
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;