// pages/Home/data/projects.ts
export interface Project {
  id: string;
  name: string;
  category: ProjectCategory;
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
  reports?: ProjectReport[];
}

export type ProjectCategory = 'AI & Research' | 'SaaS' | 'Backend' | 'Marketplace';

export interface ProjectReport {
  label: string;
  href: string;
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

const projectImage = (folder: string, name: string, alt: string): ProjectImage => ({
  webp: `/images/projects/${folder}/${name}.webp`,
  jpeg: `/images/projects/${folder}/${name}.jpg`,
  alt,
});

export const projects: Project[] = [
  {
    id: "qsar",
    name: "QSAR",
    category: "AI & Research",
    description: "Predicting a molecule's toxicity and FDA approval status from its structure, when labels are scarce.",
    tech: ["Python","scikit-learn","RDKit","FastAPI","pandas","Docker"],
    github: "https://github.com/Ibrahimlaref/Qsar_prediction-",
    highlights: ["Problem: Labelling a molecule means running a biological assay. Public datasets hold a few hundred labelled examples against hundreds of thousands of structures available without labels. The question is whether those unlabelled structures can actually be put to use.","Approach: Molecules are described with RDKit descriptors, then self-training draws on a pool of unlabelled molecules from ZINC. The baseline is a random forest trained on the labelled data alone. Model selection uses a composite score, the mean of F1 and ROC-AUC, rather than accuracy alone, because the classes are imbalanced. The selected model is served by a FastAPI endpoint, for single and batch prediction.","Result: On ClinTox, F1 rises from 0.656 to 0.712, a relative gain of 8.5 %. On FDA approval it rises from 0.777 to 0.833, a gain of 7.3 %. Two caveats travel with that result: ROC-AUC does not improve and in fact falls slightly, and the test sets hold 67 and 71 molecules. On Tox21, the only dataset of real size, co-training wins instead, at 2.7 % F1, and self-training does not beat the baseline. The gain is real, but narrow and dataset-dependent."],
    period: "2025-2026",
    role: "AI engineer, data pipeline and API",
    screenshots: [projectImage('qsar','comparaison-methodes-clintox',"Chart comparing F1 and ROC-AUC of the semi-supervised methods against the supervised baseline on ClinTox"), projectImage('qsar','comparaison-methodes-fda',"Chart comparing the same methods on the FDA approval task"), projectImage('qsar','courbes-apprentissage-clintox',"Learning curves on ClinTox, semi-supervised method against supervised baseline")]
  },
  {
    id: "matssl",
    name: "MatSSL",
    category: "AI & Research",
    description: "Five semi-supervised methods evaluated on four properties of inorganic materials, with one thousand labels and up to one hundred thousand unlabelled compositions.",
    tech: ["Python","scikit-learn","LightGBM","Optuna","pymatgen","matminer","FastAPI","React"],
    github: "",
    highlights: ["Problem: Obtaining a property label requires a density functional theory calculation, which costs hours of compute per material. Generative searches such as GNoME, by contrast, propose hundreds of thousands of unlabelled compositions. Can semi-supervised learning exploit them when labels are scarce?","Approach: Five methods — self-training, co-training, label propagation, label spreading and cluster-then-label — are compared against an Optuna-tuned supervised baseline, at a fixed budget of one thousand labels, with unlabelled pools from one thousand to one hundred thousand compositions, across three random seeds. Each composition is described by 142 descriptors. A masked autoencoder trained on 526,352 GNoME compositions additionally learns a compact representation, with a validation R² of 0.912.","Result: The gains are marginal: 0.73 % on stability with co-training, 0.30 % on magnetism with self-training, and 0.01 % on metallicity, which is a tie. When the unlabelled pool comes from GNoME rather than the same dataset, magnetism loses 1.25 %: distribution shift cancels the benefit. The report's conclusion is that moving from 250 to 5,000 labels improves results far more than any of these methods. A second track, using all labels and 28 crystal-structure descriptors, reaches 91.5 % on metallicity, 94.6 % on magnetism and 90.3 % on stability; for band gap, an accuracy of 93.5 % covers a balanced accuracy of 58.9 %, which is the honest figure for a positive class representing 6.7 % of cases."],
    period: "2026",
    role: "Experimental design and execution, data pipeline, application and report. Machine-learning mini-project at ESI, carried out in a group of four.",
    screenshots: [projectImage('matssl','experiences-ssl',"Semi-supervised experiments page: best method, gain obtained, supervised bound and table of trained models"), projectImage('matssl','vue-ensemble',"Application landing page showing dataset volumes and the deployed models"), projectImage('matssl','piste-haute-precision',"High-accuracy track: accuracy by property, confusion matrices and ablation table"), projectImage('matssl','profil-toxicite',"Toxicity profile of a molecule, with one gauge per endpoint and its ROC-AUC")],
    reports: [{"label":"MatSSL report (PDF)","href":"/reports/matssl-rapport.pdf"}]
  },
  {
    id: 'fittech',
    name: 'FitTech',
    category: "AI & Research",
    description: "Multi-tenant gym management, with a coaching assistant grounded in document retrieval.",
    tech: ["Django REST","React","TypeScript","Flutter","PostgreSQL","Redis","LangChain"],
    github: '',
    highlights: ["Problem: The coaching assistant, backed by a language model, produced invented training instructions that could not be put in front of members as they stood.","Approach: A retrieval index built over 207 documents now grounds the model, together with a Reflexion-style loop that has it revise its answer before returning it. The platform is multi-tenant and distinguishes four roles: brand administrator, moderator, coach and member. Entry check-in uses a QR code, protected against replay by a nonce carried in the JWT. The interface is built on an internal design system, Sandow.","Result: The share of invented answers falls from 34 % to 1.2 %, measured over the 207-document index."],
    screenshots: [projectImage('fittech','tableau-de-bord',"FitTech dashboard showing revenue, members and activity charts"), projectImage('fittech','pointage-qr',"QR code check-in screen with the member's admission status"), projectImage('fittech','salle-de-coaching',"Discussion room for a coaching group")],
    period: "2026",
    role: "Full-stack development and the AI component"
  },
  {
    id: 'ai-review-assistant',
    name: "AI agents",
    category: "AI & Research",
    description: "Tool-using agents that walk a repository, produce an analysis of it and propose a review.",
    tech: ["Python","LangGraph","CrewAI","LangChain"],
    github: "",
    highlights: ["Problem: Reading an unfamiliar repository and reviewing its changes took a disproportionate amount of time for the value returned.","Approach: Agents built with LangGraph, CrewAI and LangChain are orchestrated to traverse the repository, return a structured analysis, then draft a review of the submitted changes.","Result: Manual analysis effort reduced by 70 %, and code-review precision improved by 45 %."],
    period: "2025-2026",
    role: "Design and integration",
    screenshots: []
  },
  {
    id: "daftari",
    name: "Daftari",
    category: "SaaS",
    description: "Replacing the paper credit notebook of Algerian grocery shops, and letting a struggling customer's debt be settled anonymously.",
    tech: ["React","TypeScript","Dexie / IndexedDB","Tailwind","vite-plugin-pwa","Supabase","Vitest","Playwright"],
    github: "https://github.com/Ibrahimlaref/Daftari_Mvp",
    highlights: ["Problem: Neighbourhood shops sell on credit to regular customers and keep the account in a paper notebook. The notebook gets lost or damaged, carry-overs contain errors, the total owed and the oldest debt are hard to establish, and neither shopkeeper nor customer holds a shared proof.","Approach: An installable web application that works offline, in Arabic by default with a switch to French. Recording a debt takes two steps, each customer has a statement, and data is held locally in IndexedDB through Dexie, with optional Supabase synchronisation. The \"Tafrij\" feature lets the shopkeeper publish, without the customer's name, the debt of someone who will not be able to repay; donors pay at the shop or by CCP transfer, and the money never passes through the application, which avoids having to operate a payment service.","Result: Thirty-eight unit tests, an automated end-to-end journey and offline reload are all verified. The interviews, covering eight to ten shops, and the two-week pilot across three to five shops remain to be carried out: there is as yet no field data, and the figures visible in the demonstration are fictional."],
    period: "2026-2027",
    role: "Product design, customer discovery and building the MVP. Project for the ESI \"Lean Startups\" module, carried out in a group of four.",
    screenshots: [projectImage('daftari','tableau-de-bord',"Shopkeeper dashboard in Arabic: total owed, overdue customers and a seven-day chart"), projectImage('daftari','saisie-deux-etapes',"Two-step screen for recording a debt"), projectImage('daftari','tableau-tafrij',"Tafrij board listing debt cases published without names"), projectImage('daftari','releve-client-fr',"A customer statement in the French interface, dark theme")],
    live: "https://daftari-mvp.vercel.app/#/welcome",
    reports: [{"label":"Daftari product hypotheses (PDF)","href":"/reports/daftari-document-hypotheses.pdf"},{"label":"Daftari interview guide (PDF)","href":"/reports/daftari-guide-entretien.pdf"}]
  },
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
    description: "Tracking final-year projects for students, supervisors and administration.",
    tech: ["Django","Django REST","Django Channels","Redis","Celery","JWT","Swagger"],
    github: "",
    highlights: ["Problem: Final-year project supervision relied on scattered exchanges, with no common view of progress or deliverables.","Approach: Separate journeys per role — student, teacher, administrator and external contributor — rest on real-time notifications through Django Channels and Redis, deferred tasks through Celery, and a REST API authenticated with JWT and documented with Swagger.","Result: Database load reduced by 40 % and API response time reduced by 30 %, for more than 200 users."],
    period: 'mars-juin 2025',
    role: "",
    coverImage: projectImage('pfe','suivi-projet',"Progress dashboard for a final-year project, from ideation to completion"),
    screenshots: [projectImage('pfe','espace-projet',"Project workspace: next meeting, deliverables and experience points"), projectImage('pfe','constitution-equipes',"Team formation screen, by project domain"), projectImage('pfe','liste-etudiants',"Student list with specialisation, group and average"), projectImage('pfe','connexion',"Platform sign-in page"), projectImage('pfe','page-accueil',"Public landing page of the platform")]
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
    id: 'lazuli',
    name: "Larazu",
    category: 'Marketplace',
    description: "A complete store: catalogue, cart, orders and an administration dashboard.",
    tech: ["Django REST","React","Vite","TypeScript","PostgreSQL"],
    github: "https://github.com/Ibrahimlaref/larazu_front_end",
    highlights: ["Problem: Putting a clothes store online covering the whole journey, from browsing to order tracking, without depending on a third-party platform.","Approach: A Django REST API and a React and Vite interface in TypeScript: catalogue, cart, orders, customer authentication, and an administration dashboard for both the catalogue and sales.","Result: The store covers the full journey, from product page to payment and order tracking."],
    screenshots: [projectImage('lazuli','boutique',"The Larazu storefront"), projectImage('lazuli','fiche-produit',"A product page, with size selection and add to cart"), projectImage('lazuli','admin-commandes',"Order administration table")],
    live: "https://larazu-front-end.vercel.app/",
    period: "2025-2026",
    role: "Full-stack development"
  },
  {
    id: 'ibuy-retail',
    name: 'IBuy Retail Platform',
    category: 'Marketplace',
    description: 'End-to-end retail efficiency platform featuring barcode checkout, inventory analytics, and personalized product recommendations.',
    tech: ['Django', 'DRF', 'React', 'PostgreSQL', 'Docker'],
    github: "",
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
    github: "",
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
    github: "https://github.com/Ibrahimlaref/jira_with_multi_tenant_shered_database_shered_isolatedschemas",
    highlights: [
      'Implemented four multi-tenant architecture strategies',
      'Issue tracking, sprint planning, and role-based permissions',
      'Tenant isolation reference implementation',
      'Customizable workflows for enterprise SaaS'
    ]
  }
];
