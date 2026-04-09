// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from './locales/en/common.json';
import enHero from './locales/en/hero.json';
import enAbout from './locales/en/about.json';
import enProjects from './locales/en/projects.json';
import enContact from './locales/en/contact.json';
import enTimeline from './locales/en/timeline.json';

import frCommon from './locales/fr/common.json';
import frHero from './locales/fr/hero.json';
import frAbout from './locales/fr/about.json';
import frProjects from './locales/fr/projects.json';
import frContact from './locales/fr/contact.json';
import frTimeline from './locales/fr/timeline.json';

import arCommon from './locales/ar/common.json';
import arHero from './locales/ar/hero.json';
import arAbout from './locales/ar/about.json';
import arProjects from './locales/ar/projects.json';
import arContact from './locales/ar/contact.json';
import arTimeline from './locales/ar/timeline.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        hero: enHero,
        about: enAbout,
        projects: enProjects,
        contact: enContact,
        timeline: enTimeline,
      },
      fr: {
        common: frCommon,
        hero: frHero,
        about: frAbout,
        projects: frProjects,
        contact: frContact,
        timeline: frTimeline,
      },
      ar: {
        common: arCommon,
        hero: arHero,
        about: arAbout,
        projects: arProjects,
        contact: arContact,
        timeline: arTimeline,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;