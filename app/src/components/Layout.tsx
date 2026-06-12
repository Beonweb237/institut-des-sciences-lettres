import { useEffect } from 'react';
import { useLocation } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col noise-bg">
      {/* Skip Link */}
      <a href="#main-content" className="skip-link">
        Aller au contenu
      </a>

      <Navbar />

      <main id="main-content" className="flex-1" role="main">
        {children}
      </main>

      <Footer />
    </div>
  );
}
