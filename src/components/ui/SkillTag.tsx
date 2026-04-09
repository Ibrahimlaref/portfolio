// components/ui/SkillTag.tsx
import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface SkillTagProps {
  skill: string;
  index: number;
}

const SkillTag: React.FC<SkillTagProps> = ({ skill, index }) => {
  const ref = useScrollReveal({ delay: index * 80 });

  return (
    <div
      ref={ref}
      className="glass rounded-lg px-4 py-3 text-center reveal"
      style={{ '--delay': `${index * 80}ms` } as React.CSSProperties}
    >
      <span className="text-white font-medium">{skill}</span>
    </div>
  );
};

export default React.memo(SkillTag);