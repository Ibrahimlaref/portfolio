// pages/Home/Home.tsx
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import TimelineSection from './sections/TimelineSection';
import ContactSection from './sections/ContactSection';
import Navbar from '@/components/ui/Navbar';
import ParticleCanvas from '@/components/ui/ParticleCanvas';
import CursorGlow from '@/components/ui/CursorGlow';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      <Navbar />
      <ParticleCanvas />
      <CursorGlow />

      <main>
        <section id="hero">
          <HeroSection />
        </section>
        <section id="about">
          <AboutSection />
        </section>
        <section id="skills">
          <SkillsSection />
        </section>
        <section id="projects">
          <ProjectsSection />
        </section>
        <section id="timeline">
          <TimelineSection />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </main>
    </div>
  );
};

export default Home;