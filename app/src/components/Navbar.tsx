import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
  {
    label: 'Formations',
    path: '/formations',
    children: [
      { label: 'Licence', path: '/formations' },
      { label: 'Master', path: '/formations' },
      { label: 'Doctorat', path: '/formations' },
      { label: 'MBA', path: '/formations' },
      { label: 'Executive Education', path: '/formations' },
    ],
  },
  { label: 'Recherche', path: '/recherche' },
  {
    label: 'Campus',
    path: '/campus',
    children: [
      { label: 'Installations', path: '/campus' },
      { label: 'Vie étudiante', path: '/campus' },
      { label: 'Logement', path: '/campus' },
    ],
  },
  { label: 'International', path: '/international' },
  { label: 'À Propos', path: '/a-propos' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const toggleDropdown = useCallback((label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'h-16 shadow-isl bg-navy/95 backdrop-blur-xl'
            : 'h-20 bg-navy/95 backdrop-blur-md'
        }`}
        style={{ borderBottom: '1px solid rgba(201,169,98,0.15)' }}
      >
        <div className="container-isl h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <span className="font-heading text-2xl font-semibold text-gold tracking-tight">
              ISL
            </span>
            <span className="hidden sm:block font-heading text-lg font-medium text-white leading-tight">
              Institut des Sciences & Lettres
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" role="navigation" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <div key={link.label} className="relative">
                {link.children ? (
                  <button
                    className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-gold transition-colors uppercase tracking-[0.06em]"
                    onClick={() => toggleDropdown(link.label)}
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    aria-expanded={openDropdown === link.label}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        openDropdown === link.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className={`text-sm font-medium uppercase tracking-[0.06em] transition-colors link-gold ${
                      location.pathname === link.path ? 'text-gold' : 'text-white/90 hover:text-gold'
                    }`}
                    aria-current={location.pathname === link.path ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                )}

                {/* Dropdown */}
                {link.children && openDropdown === link.label && (
                  <div
                    className="absolute top-full left-0 mt-2 w-56 bg-navy-light/95 backdrop-blur-xl rounded shadow-isl-lg border border-gold/20 overflow-hidden"
                    onMouseLeave={() => setOpenDropdown(null)}
                    role="menu"
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.path}
                        className="block px-5 py-3 text-sm text-white/80 hover:text-gold hover:bg-white/5 transition-colors"
                        role="menuitem"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/espace-etudiant" className="btn-outline-gold text-xs px-5 py-2.5">
              Espace Candidat
            </Link>
            <div className="flex items-center gap-1 text-xs">
              <span className="text-white font-medium">FR</span>
              <span className="text-white/40">/</span>
              <span className="text-white/60 hover:text-white cursor-pointer transition-colors">EN</span>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden text-gold p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-navy pt-20 lg:hidden" role="dialog" aria-modal="true">
          <nav className="container-isl py-8 flex flex-col gap-2" role="navigation" aria-label="Navigation mobile">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.children ? (
                  <>
                    <button
                      className="w-full text-left text-lg font-heading text-white py-3 border-b border-white/10 flex items-center justify-between"
                      onClick={() => toggleDropdown(link.label)}
                      aria-expanded={openDropdown === link.label}
                    >
                      {link.label}
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${
                          openDropdown === link.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openDropdown === link.label && (
                      <div className="pl-4 py-2 flex flex-col gap-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.path}
                            className="text-base text-white/70 hover:text-gold py-2 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={link.path}
                    className="block text-lg font-heading text-white py-3 border-b border-white/10"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="mt-6 flex flex-col gap-4">
              <Link to="/espace-etudiant" className="btn-outline-gold w-full text-center">
                Espace Candidat
              </Link>
              <Link to="/contact" className="btn-primary w-full text-center">
                Nous contacter
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
