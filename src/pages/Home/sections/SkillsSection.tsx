import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const skillGroups = [
  {
    id: 'dataScience',
    skills: [
      'Python', 'pandas', 'NumPy', 'SciPy', 'scikit-learn', 'RDKit', 'Matplotlib', 'Seaborn',
      'Jupyter', 'PyTorch', 'Transformers', 'OpenCV', 'LangChain', 'LangGraph', 'RAG',
      'OpenAI API', 'Pinecone', 'CrewAI', 'AutoGen',
    ],
  },
  {
    id: 'backend',
    skills: [
      'Python', 'Django', 'Django REST Framework', 'FastAPI', 'Celery', 'Django Channels',
      'WebSockets', 'JWT', 'Laravel',
    ],
  },
  {
    id: 'frontendMobile',
    skills: ['React', 'Next.js', 'TypeScript', 'Flutter', 'Dart', 'Tailwind CSS'],
  },
  {
    id: 'databases',
    skills: ['PostgreSQL', 'Redis', 'MongoDB', 'MySQL', 'SQLite'],
  },
  {
    id: 'devops',
    skills: ['Docker', 'GitHub Actions (CI/CD)', 'Nginx', 'Linux'],
  },
  {
    id: 'methods',
    skills: ['Microservices', 'SOLID', 'MVC', 'Domain-Driven Design', 'Agile/Scrum'],
  },
];

const SkillsSection = () => {
  const { t } = useTranslation('skills');
  const ref = useScrollReveal();

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div ref={ref} className="text-center mb-12 reveal">
        <h2 className="text-4xl font-space-grotesk font-bold text-white mb-4">
          {t('title')}
        </h2>
        <p className="text-gray-400">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {skillGroups.map(({ id, skills }) => (
          <section key={id} className="glass rounded-xl p-5 sm:p-6">
            <h3 className="text-lg font-semibold text-cyan-300 mb-4">
              {t(`categories.${id}`)}
            </h3>
            <ul className="flex flex-wrap gap-2" aria-label={t(`categories.${id}`)}>
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-1.5 text-sm text-gray-200"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
