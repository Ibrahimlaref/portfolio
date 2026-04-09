// components/ui/TimelineItem.tsx
import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  isLeft: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ year, title, description, isLeft }) => {
  const ref = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`flex items-center w-full mb-8 reveal ${isLeft ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`w-full md:w-5/12 ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}>
        <div className="glass rounded-lg p-6">
          <div className="text-cyan-400 font-space-grotesk font-bold text-lg mb-2">{year}</div>
          <h3 className="text-white font-bold text-xl mb-2">{title}</h3>
          <p className="text-gray-300">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TimelineItem);