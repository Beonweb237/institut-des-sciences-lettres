import { Link } from 'react-router';
import { Linkedin, Instagram, Twitter, Youtube } from 'lucide-react';

const formationLinks = [
  { label: 'Licence', path: '/formations' },
  { label: 'Master', path: '/formations' },
  { label: 'Doctorat', path: '/formations' },
  { label: 'MBA', path: '/formations' },
  { label: 'Executive Education', path: '/formations' },
  { label: 'Toutes nos formations', path: '/formations' },
];

const vieLinks = [
  { label: 'Admissions', path: '/admission' },
  { label: 'Recherche', path: '/recherche' },
  { label: 'Campus', path: '/campus' },
  { label: 'International', path: '/international' },
  { label: 'Alumni', path: '/alumni' },
  { label: 'Entreprises', path: '/entreprises' },
];

const resourceLinks = [
  { label: 'Espace \u00C9tudiant', path: '/espace-etudiant' },
  { label: 'Espace Candidat', path: '/espace-etudiant' },
  { label: 'Biblioth\u00E8que', path: '/campus' },
  { label: 'Intranet', path: '/espace-etudiant' },
  { label: 'Mentions l\u00E9gales', path: '#' },
  { label: 'RGPD', path: '#' },
  { label: 'Accessibilit\u00E9', path: '#' },
  { label: 'Nous contacter', path: '/contact' },
];

const socialLinks = [
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Twitter, label: 'X / Twitter', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white" style={{ borderTop: '3px solid var(--gold)' }}>
      <div className="container-isl py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="space-y-5">
            <div>
              <span className="font-heading text-3xl font-semibold text-gold">ISL</span>
              <p className="font-heading text-base mt-1">Institut des Sciences & Lettres</p>
            </div>
            <p className="text-sm text-white/60">Fond\u00E9e en 1872</p>
            <address className="text-sm text-white/60 not-italic leading-relaxed">
              17 rue de l'Universit\u00E9<br />
              75007 Paris, France
            </address>
            <div className="flex items-center gap-3 pt-2">
              <img src="/logo-aacsb.svg" alt="AACSB Accreditation" className="h-8 w-auto opacity-70" />
              <img src="/logo-equis.svg" alt="EQUIS Accreditation" className="h-8 w-auto opacity-70" />
              <img src="/logo-cti.svg" alt="CTI Accreditation" className="h-8 w-auto opacity-70" />
            </div>
          </div>

          {/* Formations Column */}
          <div>
            <h4 className="font-heading text-lg font-medium text-white mb-5">Formations</h4>
            <ul className="space-y-3">
              {formationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Vie de l'ISL Column */}
          <div>
            <h4 className="font-heading text-lg font-medium text-white mb-5">Vie de l'ISL</h4>
            <ul className="space-y-3">
              {vieLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-heading text-lg font-medium text-white mb-5">Ressources</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          <p className="text-xs text-white/40 text-center sm:text-left">
            &copy; 2025 Institut des Sciences & Lettres &mdash; Tous droits r\u00E9serv\u00E9s
            {' '}&mdash;{' '}
            <a
              href="https://www.beonweb.cm/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
            >
              Con\u00E7u par Beonweb
            </a>
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-white/60 hover:text-gold transition-colors"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
