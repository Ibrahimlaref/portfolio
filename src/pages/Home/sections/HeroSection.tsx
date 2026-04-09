// pages/Home/sections/HeroSection.tsx
import { useTranslation } from 'react-i18next';
import { useTypewriter } from '@/hooks/useTypewriter';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const { t } = useTranslation('hero');
  const typewriterText = useTypewriter([
    "SOFTWARE ENGINEER",
    "FULL-STACK DEVELOPER",
    "Django · React · AI",
    "SaaS & Scale"
  ]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-[#0A0F1E]">
      <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-space-grotesk font-bold mb-6">
          <span className="block text-white mb-2">Hi, I'm</span>
          <span className="gradient-text">Ibrahim Laref</span>
        </h1>

        <div className="text-2xl sm:text-3xl lg:text-4xl font-space-grotesk font-bold text-cyan-400 mb-6 h-16 flex items-center justify-center">
          {typewriterText}
          <span className="animate-pulse">|</span>
        </div>

        <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          {t('subtext')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-3"
            onClick={() => scrollToSection('projects')}
          >
            {t('buttons.viewWork')}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white px-8 py-3"
            onClick={() => scrollToSection('contact')}
          >
            {t('buttons.contactMe')}
          </Button>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-cyan-400" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;