// routes/index.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, type ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/redux/selectors/authSelector';
import allRoutes from './allroutes';

const layoutMap: Record<string, ({ children }: { children: ReactNode }) => JSX.Element> = {
  'default': ({ children }: { children: ReactNode }) => <>{children}</>,
  'header-only': ({ children }: { children: ReactNode }) => <>{children}</>,
  'none': ({ children }: { children: ReactNode }) => <>{children}</>,
};

const AppRouter = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated); // but since no auth, always true

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {allRoutes.map(({ path, component: Page, protected: isProtected, layout }) => {
            const Layout = layoutMap[layout];
            const element = isProtected && !isAuthenticated
              ? <Navigate to='/login' replace />
              : <Layout><Page /></Layout>;
            return <Route key={path} path={path} element={element} />;
          })}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;