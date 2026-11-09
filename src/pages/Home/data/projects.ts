// pages/Home/data/projects.ts
export interface Project {
  id: string;
  name: string;
  category: 'SaaS' | 'Backend' | 'Marketplace' | 'API';
  description: string;
  tech: string[];
  github: string;
  live?: string;
  highlights: string[];
  period?: string;
  role?: string;
  coverImage?: ProjectImage;
  screenshots?: Array<string | ProjectImage>;
  video?: ProjectVideo;
}

export interface ProjectImage {
  webp: string;
  jpeg: string;
  alt: string;
}

export interface ProjectVideo {
  src: string;
  kind: 'file' | 'embed';
  mimeType?: string;
  poster?: string;
  link?: string;
  previewImage?: ProjectImage;
}

export const projects: Project[] = [
  {
    id: 'vendex',
    name: 'Vendex',
    category: 'SaaS',
    description: 'Laravel-based SaaS platform for Algerian e-commerce order management, confirmation, and delivery tracking. Active development on a major client project, extending the platform alongside a colleague.',
    tech: ['Laravel', 'Ecotrack API', 'Carrier APIs', 'Webhooks', 'Polling', 'Google Sheets'],
    github: 'https://github.com/Ibrahimlaref/vendexdz',
    live: 'https://www.vendexdz.com/',
    period: 'juin-août 2026',
    role: 'Full-stack developer, working with a colleague on a major client project',
    highlights: [
      'Integrated Anderson, WorldExpress, and DHD through the Ecotrack API; integrated ZR Express, Noest, Yalidine, and Maystro through their own APIs for order submission and status synchronization',
      'Built a webhook-first synchronization flow with polling fallback',
      'Extended Module 11 for commissions, payroll, and invoicing across agents, managers, administrators, and sellers',
      'Extended Module 9 for worker time tracking',
      'Added Google Sheets as an intermediary for slow-sync platforms',
      'Debugged the order status pipeline and fixed swapped article-name and comment fields on carrier submission',
      'Fixed UI consistency issues and drafted a formal Arabic cahier des charges with a financial annex for the client',
      'Used Antigravity, OpenCode, Trae, and Claude Code as coding agents; used Claude to draft structured handoff prompts',
    ],
    coverImage: {
      webp: '/images/projects/vendex/vendex-accueil.webp',
      jpeg: '/images/projects/vendex/vendex-accueil.jpg',
      alt: 'Page d’accueil de Vendex avec le tableau de confirmation et de suivi des commandes',
    },
    screenshots: [
      {
        webp: '/images/projects/vendex/vendex-services.webp',
        jpeg: '/images/projects/vendex/vendex-services.jpg',
        alt: 'Services Vendex : confirmation rapide, suivi des commandes et statistiques',
      },
      {
        webp: '/images/projects/vendex/vendex-suivi-commandes.webp',
        jpeg: '/images/projects/vendex/vendex-suivi-commandes.jpg',
        alt: 'Suivi en temps réel du cycle d’une commande Vendex, identifiant masqué',
      },
      {
        webp: '/images/projects/vendex/vendex-temoignages.webp',
        jpeg: '/images/projects/vendex/vendex-temoignages.jpg',
        alt: 'Section des témoignages Vendex, noms des auteurs masqués',
      },
      {
        webp: '/images/projects/vendex/vendex-contact.webp',
        jpeg: '/images/projects/vendex/vendex-contact.jpg',
        alt: 'Cartes de contact Vendex avec les coordonnées masquées',
      },
    ],
  },
  {
    id: 'pfe-platform',
    name: 'Plateforme PFE',
    category: 'Backend',
    description: "Plateforme de gestion académique des projets de fin d’études. Charge de la base de données réduite de 40 %, temps de réponse de l’API réduit de 30 %, plus de 200 utilisateurs.",
    tech: ['Django', 'Django REST Framework', 'SQLite', 'Django Channels', 'Redis', 'Celery', 'JWT', 'Swagger'],
    github: 'https://github.com/LAREF/PFE-main',
    highlights: [
      'Gestion des projets et des parcours académiques',
      'Rôles étudiant, enseignant, administrateur et utilisateur externe',
      'Notifications temps réel via Django Channels et Redis',
      'API REST avec authentification JWT et documentation Swagger',
      'Charge de la base de données réduite de 40 % ; temps de réponse de l’API réduit de 30 % ; plus de 200 utilisateurs',
    ],
    period: 'mars-juin 2025',
    role: 'TODO : rôle à confirmer',
  },
  {
    id: 'library-website',
    name: "Bibliothèque d'État de Tissemsilt",
    category: 'Backend',
    description: "Développement backend : temps de réponse de l'API réduit de 40 % grâce à JRPC et au cache Redis, avec ajout de la recherche et de la réservation de livres.",
    tech: ['Django', 'DRF', 'PostgreSQL', 'Redis', 'Docker'],
    github: '',
    highlights: [
      "Temps de réponse de l'API réduit de 40 % (JRPC, cache Redis)",
      'Ajout de la recherche et de la réservation de livres',
    ],
    coverImage: {
      webp: '/images/projects/tissemsilt-library/bibliotheque-tissemsilt-accueil.webp',
      jpeg: '/images/projects/tissemsilt-library/bibliotheque-tissemsilt-accueil.jpg',
      alt: "Page d'accueil de la Bibliothèque d'État de Tissemsilt",
    },
    screenshots: [
      {
        webp: '/images/projects/tissemsilt-library/bibliotheque-tissemsilt-recherche-livres.webp',
        jpeg: '/images/projects/tissemsilt-library/bibliotheque-tissemsilt-recherche-livres.jpg',
        alt: 'Catalogue de livres avec recherche et filtres de la Bibliothèque d’État de Tissemsilt',
      },
      {
        webp: '/images/projects/tissemsilt-library/bibliotheque-tissemsilt-actualites.webp',
        jpeg: '/images/projects/tissemsilt-library/bibliotheque-tissemsilt-actualites.jpg',
        alt: 'Actualités et activités de la Bibliothèque d’État de Tissemsilt',
      },
      {
        webp: '/images/projects/tissemsilt-library/bibliotheque-tissemsilt-espaces.webp',
        jpeg: '/images/projects/tissemsilt-library/bibliotheque-tissemsilt-espaces.jpg',
        alt: 'Vue des espaces intérieurs de la Bibliothèque d’État de Tissemsilt',
      },
      {
        webp: '/images/projects/tissemsilt-library/bibliotheque-tissemsilt-fiche-livre.webp',
        jpeg: '/images/projects/tissemsilt-library/bibliotheque-tissemsilt-fiche-livre.jpg',
        alt: 'Fiche détaillée d’un livre dans le catalogue de la Bibliothèque d’État de Tissemsilt',
      },
    ],
    period: 'janvier-mars 2025',
    role: 'Développeur backend',
  },
  {
    id: 'ibuy-retail',
    name: 'IBuy Retail Platform',
    category: 'Marketplace',
    description: 'End-to-end retail efficiency platform featuring barcode checkout, inventory analytics, and personalized product recommendations.',
    tech: ['Django', 'DRF', 'React', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/LAREF/IbuyApi-main',
    video: {
      kind: 'embed',
      src: 'https://drive.google.com/file/d/1agA0nzoz4BR3KWJs5xJAi3i2YivDRarR/preview',
      link: 'https://drive.google.com/file/d/1agA0nzoz4BR3KWJs5xJAi3i2YivDRarR/view?usp=sharing',
      previewImage: {
        webp: '/images/projects/ibuy/ibuy-demo-video-poster.webp',
        jpeg: '/images/projects/ibuy/ibuy-demo-video-poster.jpg',
        alt: 'Aperçu de la vidéo de démonstration IBuy, avec l’application ouverte sur un smartphone',
      },
    },
    highlights: [
      'Mobile barcode scanning reduced checkout time by 60%',
      'Advanced search, filters, and favorites workflows',
      'Real-time sales and inventory analytics dashboards',
      'Scheduled cron jobs for stock alerts and expiry detection',
      'Mobile and web synchronization via RESTful APIs'
    ]
  },
  {
    id: 'autopart-market',
    name: 'AutoPartMarket',
    category: 'Marketplace',
    description: 'Auto parts e-commerce platform with compatibility search, order tracking, and admin inventory management.',
    tech: ['Django', 'DRF', 'React', 'PostgreSQL', 'Nginx'],
    github: 'https://github.com/LAREF/autopartmarket-main',
    highlights: [
      'Vehicle compatibility matching for make/model/year',
      'Secure payment gateway and order management',
      'Admin dashboard for inventory and sales analytics',
      'Database query optimization and caching',
      'Shipping integration and email notifications'
    ]
  },
  {
    id: 'jira-multi-tenant',
    name: 'Jira-like Project Management',
    category: 'SaaS',
    description: 'Multi-tenant SaaS platform implementing database-per-tenant, schema-per-tenant, and shared schema strategies for licensed enterprise workloads.',
    tech: ['Django', 'PostgreSQL', 'Docker', 'DRF', 'Multi-tenancy'],
    github: 'https://github.com/LAREF/jira_with_multi_tenant_shered_database_shered_schema',
    highlights: [
      'Implemented four multi-tenant architecture strategies',
      'Issue tracking, sprint planning, and role-based permissions',
      'Tenant isolation reference implementation',
      'Customizable workflows for enterprise SaaS'
    ]
  },
  {
    id: 'ai-review-assistant',
    name: 'AI Code Review Assistant',
    category: 'Backend',
    description: 'GPT-4 powered code review system using RAG architecture, vector search, and prompt engineering for contextual review suggestions.',
    tech: ['Python', 'FastAPI', 'OpenAI API', 'LangChain', 'Vector DB'],
    github: 'https://github.com/LAREF/back_end_1CS',
    highlights: [
      'Implemented GPT-4 review automation with RAG architecture',
      'Built a vector knowledge base for code standards',
      'Created custom prompt pipeline for actionable feedback',
      'Increased review accuracy by 45%'
    ]
  },
  {
    id: 'fittech',
    name: 'FitTech',
    category: 'SaaS',
    description: 'Multi-tenant SaaS gym management platform \u2014 covers multi-brand/gym management, member CRM, equipment tracking, AI coaching (RAG + Reflexion Agent), real-time chat, wallet & billing, and RNN-powered analytics. Built as a full-stack product with a focus on scalability and multi-tenancy.',
    tech: ['React', 'TypeScript', 'Django REST', 'PostgreSQL', 'Redis', 'Docker', 'LangChain', 'RAG'],
    github: '',
    highlights: [
      'Multi-brand and multi-gym tenant management',
      'Member CRM, equipment tracking, shop, wallet, and billing workflows',
      'AI coaching architecture using RAG and a Reflexion Agent',
      'Real-time chat and operational notifications',
      'RNN-powered analytics for demand, retention, and business insights'
    ],
    screenshots: [
      '/assets/fittech/165560a6-8abe-4790-aa43-b0cfe61fba7f.png',
      '/assets/fittech/493ae4e3-df7c-440f-a028-a530b17d020c.png',
      '/assets/fittech/5b324716-346c-4202-8345-3554eafc86f8.png',
      '/assets/fittech/6b1cc27f-e1ec-47d8-91f0-e469cc897a33.png',
      '/assets/fittech/6e4fff7c-356e-42b2-8f4d-7cf3a79dd848.png',
      '/assets/fittech/8842edf0-490e-4a63-9df0-ecbca9346592.png',
      '/assets/fittech/9ddb292e-fb1a-4e1b-a7f5-0ff4a36797d1.png',
      '/assets/fittech/b554a970-5367-4abd-952e-ae9de783c649.png',
      '/assets/fittech/c65b03d8-9ad8-4573-b912-2efc3eec0ab4.png',
      '/assets/fittech/cc55c0aa-db5e-4e60-a3de-6fd1b940b520.png',
      '/assets/fittech/db1748ea-e17c-4a8e-9680-dc994556ce8e.png',
      '/assets/fittech/e95a55f0-6845-44c8-a23d-f616a2926c12.png',
      '/assets/fittech/f515063a-16ac-4e32-af0b-3b170a3619b8.png',
      '/assets/fittech/file (1).webp',
      '/assets/fittech/file.webp'
    ]
  },
  {
    id: 'lazuli',
    name: 'Lazuli',
    category: 'Marketplace',
    description: 'Full-stack e-commerce application with a Django REST Framework backend and a React/Vite frontend \u2014 featuring product catalogue, cart, orders, authentication, and an admin dashboard.',
    tech: ['React', 'Vite', 'TypeScript', 'Django REST', 'PostgreSQL', 'Python'],
    github: '',
    highlights: [
      'Product catalogue browsing and e-commerce workflows',
      'Shopping cart and order management',
      'Authentication-backed customer experience',
      'Admin dashboard for catalogue and operations management',
      'Django REST Framework API integrated with a React/Vite frontend'
    ],
    screenshots: [
      '/assets/LAZULI/0e387c67-f81e-4f47-a925-4a9fa0e163d2.png',
      '/assets/LAZULI/10b9abff-70b2-444e-a8f8-94d41b64a0e2.png',
      '/assets/LAZULI/32622f42-8508-49f4-86cc-e3adf0d957e8.png',
      '/assets/LAZULI/382119b1-0249-47da-994d-5e1a88ed9f43.png',
      '/assets/LAZULI/5e902d46-35e8-454b-ad1d-4d55a6fc4080.png',
      '/assets/LAZULI/9a59bd1a-f629-4354-b0e8-fa8643606a73.png',
      '/assets/LAZULI/9c54388c-8a30-4ef4-83e9-f094d580dbb8.png',
      '/assets/LAZULI/ac5730f0-3710-4c89-9ccf-b80c18d3275d.png',
      '/assets/LAZULI/b1da30c6-dfe1-4da2-b906-c7d3ec1ab63d.png',
      '/assets/LAZULI/c40d5419-d865-4782-9b51-b5490c506af4.png',
      '/assets/LAZULI/c4d07495-8237-4c1b-a8fa-3aada2ab6e96.png',
      '/assets/LAZULI/e2a3a326-c6ef-4a02-a99b-414660e0ebea.png',
      '/assets/LAZULI/ff0ab534-a70b-43fc-8fa9-19da86eda44d.png',
      '/assets/LAZULI/file (1).webp',
      '/assets/LAZULI/file.webp'
    ]
  }
];
