// pages/Home/sections/AboutSection.tsx
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { GraduationCap, MapPin, Code, Lightbulb } from 'lucide-react';

const AboutSection = () => {
  const { t } = useTranslation('about');
  const ref = useScrollReveal();

  const facts = [
    { icon: GraduationCap, label: t('facts.student'), value: 'Software Engineer · Graduated from Higher National School of Computer Science, Sidi Bel Abbes' },
    { icon: MapPin, label: t('facts.location'), value: 'Relizane, Algeria' },
    { icon: Code, label: t('facts.stack'), value: 'Django · React · PostgreSQL · Docker · Redis' },
    { icon: Lightbulb, label: t('facts.current'), value: 'Building scalable SaaS backends & AI tooling' },
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div ref={ref} className="reveal">
          <div className="relative">
            <div className="w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-cyan-400/50 shadow-2xl">
              <img
                src="/assets/images/avatar.jpg"
                alt="LAREF"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/256x256?text=LAREF';
                }}
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-cyan-400/20 animate-pulse"></div>
          </div>
        </div>

        <div ref={ref} className="reveal">
          <h2 className="text-4xl font-space-grotesk font-bold text-white mb-6">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            {t('bio')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {facts.map((fact, index) => (
              <div key={index} className="glass rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <fact.icon className="h-5 w-5 text-cyan-400" />
                  <div>
                    <div className="text-sm text-gray-400">{fact.label}</div>
                    <div className="text-white font-medium">{fact.value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;