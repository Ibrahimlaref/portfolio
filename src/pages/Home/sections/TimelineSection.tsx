// pages/Home/sections/TimelineSection.tsx
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import TimelineItem from '@/components/ui/TimelineItem';

const TimelineSection = () => {
  const { t } = useTranslation('timeline');
  const ref = useScrollReveal();

  const timelineData = [
    {
      year: 'Mar 2025 − Jun 2025',
      title: t('items.pfe.title'),
      description: t('items.pfe.description'),
      isLeft: true,
    },
    {
      year: 'Jan 2025 − Mar 2025',
      title: t('items.library.title'),
      description: t('items.library.description'),
      isLeft: false,
    },
    {
      year: 'Oct 2024 − Dec 2024',
      title: t('items.ibuy.title'),
      description: t('items.ibuy.description'),
      isLeft: true,
    },
    {
      year: 'Jun 2024 − Sep 2024',
      title: t('items.autopart.title'),
      description: t('items.autopart.description'),
      isLeft: false,
    },
    {
      year: 'Aug 2024 − Dec 2024',
      title: t('items.ai.title'),
      description: t('items.ai.description'),
      isLeft: true,
    },
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div ref={ref} className="text-center mb-12 reveal">
        <h2 className="text-4xl font-space-grotesk font-bold text-white mb-4">
          {t('title')}
        </h2>
      </div>

      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-cyan-400 h-full hidden md:block"></div>

        {timelineData.map((item, index) => (
          <TimelineItem
            key={index}
            year={item.year}
            title={item.title}
            description={item.description}
            isLeft={item.isLeft}
          />
        ))}
      </div>
    </div>
  );
};

export default TimelineSection;