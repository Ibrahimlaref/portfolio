// routes/allroutes.tsx
import { lazy } from 'react';

const Home = lazy(() => import('@/pages/Home/Home'));

export interface AppRoute {
  path: string;
  component: React.LazyExoticComponent<any>;
  protected: boolean;
  layout: 'default' | 'header-only' | 'none';
}

const allRoutes: AppRoute[] = [
  { path: '/', component: Home, protected: false, layout: 'none' },
];

export default allRoutes;