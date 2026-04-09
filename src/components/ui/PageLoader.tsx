// components/ui/PageLoader.tsx
import { useEffect } from 'react';

const PageLoader = () => {
  useEffect(() => {
    const hideLoader = () => {
      const loader = document.getElementById('page-loader');
      if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.style.display = 'none';
        }, 500);
      }
    };

    if (document.fonts) {
      document.fonts.ready.then(hideLoader);
    } else {
      setTimeout(hideLoader, 1000);
    }
  }, []);

  return (
    <div
      id="page-loader"
      className="fixed inset-0 bg-[#0A0F1E] flex items-center justify-center z-50 transition-opacity duration-500"
    >
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-cyan-400 font-space-grotesk">Loading...</p>
      </div>
    </div>
  );
};

export default PageLoader;