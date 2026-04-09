// pages/Home/data/projects.ts
export interface Project {
  id: string;
  name: string;
  category: 'SaaS' | 'Backend' | 'Marketplace' | 'API';
  description: string;
  tech: string[];
  github: string;
  highlights: string[];
}

export const projects: Project[] = [
  {
    id: 'pfe-platform',
    name: 'PFE Academic Platform',
    category: 'Backend',
    description: 'Scalable Django REST APIs for managing student projects, supervisors, and academic workflows with RBAC and real-time notifications.',
    tech: ['Django', 'DRF', 'PostgreSQL', 'Redis', 'Docker', 'Django Channels'],
    github: 'https://github.com/LAREF/PFE-main',
    highlights: [
      'Role-based access control for students, supervisors, and admins',
      'Real-time notifications using Django Channels and Redis',
      'Optimized PostgreSQL queries and caching',
      'Dockerized deployment for consistent environments',
      'Project submission, review workflows, and document management'
    ]
  },
  {
    id: 'library-website',
    name: 'Tisemsilt Library Website',
    category: 'Backend',
    description: 'High-performance Django REST APIs for library catalog search, reservations, member management, and institutional publishing.',
    tech: ['Django', 'DRF', 'PostgreSQL', 'Redis', 'Docker'],
    github: 'https://github.com/Ibrahimlaref/clothes_store_larazuz',
    highlights: [
      'Catalog search with full-text search capabilities',
      'Book reservation and member account management',
      'JRPC integration and Redis caching',
      'Automated backup and recovery mechanisms',
      'Secure, modular architecture for scalability'
    ]
  },
  {
    id: 'ibuy-retail',
    name: 'IBuy Retail Platform',
    category: 'Marketplace',
    description: 'End-to-end retail efficiency platform featuring barcode checkout, inventory analytics, and personalized product recommendations.',
    tech: ['Django', 'DRF', 'React', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/LAREF/IbuyApi-main',
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
  }
];