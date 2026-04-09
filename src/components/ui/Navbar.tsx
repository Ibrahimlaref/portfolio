// components/ui/Navbar.tsx
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from '@/redux/selectors/themeSelector';
import { selectLocale as selectLocaleFromStore } from '@/redux/selectors/localeSelector';
import { setTheme } from '@/redux/reducers/ThemeReducer';
import { setLocale } from '@/redux/reducers/LocaleReducer';
import { useActiveSection } from '@/hooks/useActiveSection';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Moon, Sun, Menu, Github, Linkedin, Mail } from 'lucide-react';

const Navbar = () => {
  const { t, i18n } = useTranslation('common');
  const theme = useSelector(selectTheme);
  const locale = useSelector(selectLocaleFromStore);
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useActiveSection(['hero', 'about', 'skills', 'projects', 'timeline', 'contact']);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    dispatch(setTheme(newTheme));
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const changeLocale = (newLocale: 'en' | 'fr' | 'ar') => {
    dispatch(setLocale(newLocale));
    i18n.changeLanguage(newLocale);
  };

  const navItems = [
    { id: 'hero', label: t('nav.hero') },
    { id: 'about', label: t('nav.about') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'timeline', label: t('nav.timeline') },
    { id: 'contact', label: t('nav.contact') },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-[#0A0F1E]/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="font-space-grotesk font-bold text-xl gradient-text">
            Ibrahim LAREF
          </div>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors hover:text-cyan-400 ${
                  activeSection === item.id ? 'text-cyan-400' : 'text-gray-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={locale}
              onChange={(e) => changeLocale(e.target.value as 'en' | 'fr' | 'ar')}
              className="bg-transparent text-white border-none outline-none text-sm"
            >
              <option value="en">EN</option>
              <option value="fr">FR</option>
              <option value="ar">AR</option>
            </select>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-white hover:text-cyan-400"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <div className="hidden md:flex space-x-2">
              <Button variant="ghost" size="sm" asChild className="text-white hover:text-cyan-400">
                <a href="https://github.com/Ibrahimlaref" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild className="text-white hover:text-cyan-400">
                <a href="https://www.linkedin.com/in/laref-ibrahim" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild className="text-white hover:text-cyan-400">
                <a href="mailto:contact@laref.dev">
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden text-white hover:text-cyan-400">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#0D1117] border-gray-700">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`text-left text-sm font-medium transition-colors hover:text-cyan-400 ${
                        activeSection === item.id ? 'text-cyan-400' : 'text-gray-300'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="flex space-x-2 pt-4">
                    <Button variant="ghost" size="sm" asChild>
                      <a href="https://github.com/LAREF" target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <a href="mailto:contact@laref.dev">
                        <Mail className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;