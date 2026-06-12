import { useRef, useState } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import CountUp from 'react-countup';
import {
  Award,
  Globe,
  Heart,
  Lightbulb,
  TrendingUp,
  Download,
  FileText,
  CheckCircle,
  Users,
  BookOpen,
  Microscope,
  Building2,
  GraduationCap,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Timeline data                                                      */
/* ------------------------------------------------------------------ */
const timelineData = [
  { year: '1872', event: "Fondation de l'Institut des Sciences & Lettres par décret impérial. Première promotion de 47 élèves." },
  { year: '1902', event: 'Création de la chaire de Relations internationales, première en France.' },
  { year: '1945', event: "Ouverture aux femmes. L'ISL est l'une des premières grandes écoles françaises à le faire." },
  { year: '1968', event: "Réforme des programmes : introduction des sciences sociales et de l'interdisciplinarité." },
  { year: '1985', event: 'Premiers partenariats internationaux : LSE, Harvard, Sciences Po.' },
  { year: '2001', event: "Création du pôle de recherche en intelligence artificielle." },
  { year: '2012', event: 'Inauguration du campus rénové : 12 000 m² de bibliothèques et laboratoires.' },
  { year: '2019', event: "Obtention de la triple couronne AACSB, EQUIS, AMBA pour l'ISL Business School." },
  { year: '2024', event: 'Classement 48e au QS World Rankings. 4 200 étudiants, 87 nationalités.' },
];

/* ------------------------------------------------------------------ */
/*  Values data                                                        */
/* ------------------------------------------------------------------ */
const valuesData = [
  {
    icon: Award,
    title: 'Excellence académique',
    body: "Nous visons l'excellence dans l'enseignement, la recherche et l'innovation. Nos standards sont exigeants, nos résultats parlent d'eux-mêmes.",
  },
  {
    icon: Globe,
    title: 'Ouverture internationale',
    body: '87 nationalités, 180 partenariats internationaux, bourses d\'excellence pour tous. La diversité est notre force.',
  },
  {
    icon: Heart,
    title: 'Engagement sociétal',
    body: 'Nous formons des citoyens engagés. Transition écologique, solidarité, lutte contre les discriminations : l\'ISL s\'engage.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation responsable',
    body: "Depuis 1872, l'ISL innove. IA, biotechnologies, humanités numériques : nous sommes à la pointe du savoir.",
  },
];

/* ------------------------------------------------------------------ */
/*  Rankings data                                                      */
/* ------------------------------------------------------------------ */
const rankingsData = [
  {
    label: 'QS',
    position: '48e',
    context: 'meilleure école française | Top 100 mondial',
    trend: '+5 places en 2 ans',
  },
  {
    label: 'Financial Times',
    position: '32e',
    context: 'Master en Management | Europe',
    trend: '+2 places',
  },
  {
    label: 'Shanghai',
    position: '51-75',
    context: 'Sciences politiques & Droit',
    trend: 'Stable',
  },
];

/* ------------------------------------------------------------------ */
/*  Stats data                                                         */
/* ------------------------------------------------------------------ */
const statsData = [
  { value: 4200, suffix: '', label: 'Étudiants', icon: Users },
  { value: 380, suffix: '', label: 'Enseignants-chercheurs', icon: GraduationCap },
  { value: 28000, suffix: '', label: 'Alumni', icon: Users },
  { value: 120, suffix: 'M€', label: 'Budget de recherche', icon: Microscope },
  { value: 23, suffix: '', label: 'Laboratoires', icon: Microscope },
  { value: 340, suffix: '+', label: 'Publications / an', icon: BookOpen },
  { value: 87, suffix: '', label: 'Nationalités', icon: Globe },
  { value: 45000, suffix: ' m²', label: 'Surface campus', icon: Building2 },
];

/* ------------------------------------------------------------------ */
/*  RSE commitments                                                    */
/* ------------------------------------------------------------------ */
const rseCommitments = [
  'Neutralité carbone 2030',
  'Parité : 50% femmes dans la direction',
  '100% des bâtiments accessibles PMR',
  'Zéro déchet plastique sur le campus',
  '50% de produits bio à la restauration',
];

/* ------------------------------------------------------------------ */
/*  Public documents                                                   */
/* ------------------------------------------------------------------ */
const publicDocs = [
  "Contrat pluriannuel d'objectifs et de performance",
  "Rapport d'activité 2023-2024",
  'Comptes financiers certifiés',
  'Rapport RSE 2024',
  "Statuts de l'établissement",
  'Règlement des études',
];

/* ------------------------------------------------------------------ */
/*  Governance tree                                                    */
/* ------------------------------------------------------------------ */
const governanceTree = {
  board: { title: "Conseil d'Administration", name: 'Jean-Pierre Lacroix', role: 'Président' },
  director: { title: 'Direction', name: 'Prof. Marc-André Bergeron', role: 'Directeur' },
  poles: [
    { title: 'Pôle Formation', name: 'Prof. Claire Dumont', role: 'Directrice' },
    { title: 'Pôle Recherche', name: 'Prof. Laurent Dubois', role: 'Directeur' },
    { title: 'Pôle Admin & Finances', name: 'Philippe Renaud', role: 'Directeur' },
  ],
};

/* ------------------------------------------------------------------ */
/*  About page component                                               */
/* ------------------------------------------------------------------ */
export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  /* GSAP scroll animations */
  useGSAP(
    () => {
      /* Hero fade-up sequence */
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .from('.about-hero-label', { y: 20, opacity: 0, duration: 0.6 }, 0.2)
        .from('.about-hero-divider', { scaleX: 0, duration: 0.5 }, 0.4)
        .from('.about-hero-heading', { y: 40, opacity: 0, duration: 0.8 }, 0.5)
        .from('.about-hero-subtitle', { y: 30, opacity: 0, duration: 0.7 }, 0.7);

      /* Fade-up elements */
      gsap.utils.toArray<HTMLElement>('.about-fade-up').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        });
      });

      /* Timeline items */
      gsap.utils.toArray<HTMLElement>('.about-timeline-item').forEach((el, i) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          delay: i * 0.08,
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        });
      });

      /* Value cards stagger */
      gsap.from('.about-value-card', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-values-grid', start: 'top 85%', toggleActions: 'play none none none' },
      });

      /* Governance nodes */
      gsap.from('.about-gov-node', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-governance', start: 'top 85%', toggleActions: 'play none none none' },
      });

      /* Ranking cards */
      gsap.from('.about-ranking-card', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-rankings-grid', start: 'top 85%', toggleActions: 'play none none none' },
      });

      /* Stat cards */
      ScrollTrigger.create({
        trigger: '.about-stats-grid',
        start: 'top 85%',
        onEnter: () => setStatsVisible(true),
        once: true,
      });

      /* RSE section */
      gsap.from('.about-rse-left', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-rse', start: 'top 85%', toggleActions: 'play none none none' },
      });
      gsap.from('.about-rse-right', {
        x: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-rse', start: 'top 85%', toggleActions: 'play none none none' },
      });

      /* Document rows */
      gsap.from('.about-doc-row', {
        x: -30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-docs-list', start: 'top 85%', toggleActions: 'play none none none' },
      });

      /* CTA section */
      gsap.from('.about-cta-content', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-cta', start: 'top 85%', toggleActions: 'play none none none' },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      {/* ============================================================ */}
      {/* SECTION 1 — HERO                                              */}
      {/* ============================================================ */}
      <section
        className="relative flex items-center justify-center min-h-[55vh]"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(10,22,40,0.93) 0%, rgba(30,58,95,0.88) 100%), url(/about-history.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container-isl text-center pt-32 pb-16">
          {/* Breadcrumb */}
          <nav className="mb-6" aria-label="Fil d'Ariane">
            <ol className="flex items-center justify-center gap-2 text-sm text-white/60">
              <li>
                <Link to="/" className="hover:text-gold transition-colors">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white/80">À Propos</li>
            </ol>
          </nav>

          <p className="about-hero-label section-label text-gold">NOTRE HISTOIRE</p>
          <div className="about-hero-divider gold-divider mx-auto mb-6" />
          <h1 className="about-hero-heading heading-hero text-white mb-6">
            À Propos de l'ISL
          </h1>
          <p className="about-hero-subtitle body-large text-white/80 max-w-2xl mx-auto">
            Fondée en 1872, l'ISL est l'une des grandes écoles françaises les plus prestigieuses.
            Plus de 150 ans d'excellence académique au service de la formation des élites de la
            République.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — TIMELINE                                          */}
      {/* ============================================================ */}
      <section className="bg-white section-padding">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="about-fade-up text-center mb-16">
            <p className="section-label">CHRONOLOGIE</p>
            <div className="gold-divider mx-auto mb-6" />
            <h2 className="heading-section text-navy">Plus de 150 ans d'histoire</h2>
          </div>

          {/* Vertical timeline */}
          <div className="relative">
            {/* Central line */}
            <div
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 md:-translate-x-px"
              aria-hidden="true"
            />

            {timelineData.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={item.year}
                  className={`about-timeline-item relative flex items-start mb-12 last:mb-0 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Gold node */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-gold rounded-full -translate-x-1/2 mt-2 z-10 ring-4 ring-white" />

                  {/* Content card */}
                  <div
                    className={`ml-12 md:ml-0 md:w-[45%] ${
                      isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'
                    }`}
                  >
                    <div className="bg-cream rounded p-6">
                      <span className="font-heading font-bold text-2xl text-gold">{item.year}</span>
                      <p className="body-regular text-gray-600 mt-2">{item.event}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — MISSION & VALUES                                  */}
      {/* ============================================================ */}
      <section className="bg-cream section-padding">
        <div className="container-isl">
          <div className="about-fade-up text-center mb-12">
            <p className="section-label">MISSION &amp; VALEURS</p>
            <div className="gold-divider mx-auto mb-6" />
            <h2 className="heading-section text-navy">Ce en quoi nous croyons</h2>
          </div>

          {/* Mission statement */}
          <div className="about-fade-up max-w-3xl mx-auto text-center mb-16">
            <blockquote className="relative">
              <span className="absolute -top-6 left-0 font-heading text-6xl text-gold/20" aria-hidden="true">
                &ldquo;
              </span>
              <p
                className="font-heading text-xl md:text-2xl text-navy-light italic leading-relaxed px-8"
              >
                L'ISL forme des leaders responsables, capables de comprendre le monde dans sa
                complexité et d'agir pour le transformer. Notre mission : l'excellence académique au
                service de l'intérêt général.
              </p>
              <span
                className="absolute -bottom-10 right-0 font-heading text-6xl text-gold/20"
                aria-hidden="true"
              >
                &rdquo;
              </span>
            </blockquote>
          </div>

          {/* Values grid */}
          <div className="about-values-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {valuesData.map((v) => (
              <div
                key={v.title}
                className="about-value-card bg-white rounded p-8 text-center transition-shadow duration-300 hover:shadow-isl-lg"
              >
                <v.icon size={40} className="text-gold mx-auto mb-4" aria-hidden="true" />
                <h3 className="font-heading font-medium text-xl text-navy mb-3">{v.title}</h3>
                <p className="body-small text-gray-600">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — GOVERNANCE                                        */}
      {/* ============================================================ */}
      <section className="bg-white section-padding about-governance">
        <div className="container-isl">
          <div className="about-fade-up text-center mb-16">
            <p className="section-label">GOUVERNANCE</p>
            <div className="gold-divider mx-auto mb-6" />
            <h2 className="heading-page text-navy">Organisation de l'établissement</h2>
          </div>

          {/* Org chart */}
          <div className="max-w-4xl mx-auto">
            {/* Board */}
            <div className="about-gov-node flex justify-center mb-8">
              <div className="bg-navy text-white rounded px-8 py-5 text-center shadow-isl-lg">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gold mb-1">
                  {governanceTree.board.title}
                </p>
                <p className="font-heading font-medium text-lg">{governanceTree.board.name}</p>
                <p className="body-small text-white/70">{governanceTree.board.role}</p>
              </div>
            </div>

            {/* Connector */}
            <div className="flex justify-center mb-8" aria-hidden="true">
              <div className="w-px h-8 bg-gray-200" />
            </div>

            {/* Director */}
            <div className="about-gov-node flex justify-center mb-8">
              <div className="bg-gold text-navy rounded px-8 py-5 text-center shadow-isl-lg flex items-center gap-5">
                <img
                  src="/team-director.jpg"
                  alt="Portrait du Prof. Marc-André Bergeron"
                  className="w-16 h-16 rounded-full object-cover border-2 border-navy/20"
                  loading="lazy"
                />
                <div className="text-left">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-navy/70 mb-1">
                    {governanceTree.director.title}
                  </p>
                  <p className="font-heading font-medium text-lg">{governanceTree.director.name}</p>
                  <p className="body-small text-navy/70">{governanceTree.director.role}</p>
                </div>
              </div>
            </div>

            {/* Connector lines to poles */}
            <div className="hidden md:flex justify-center mb-8" aria-hidden="true">
              <div className="relative w-full max-w-2xl h-8">
                <div className="absolute left-1/4 right-1/4 top-0 h-px bg-gray-200" />
                <div className="absolute left-1/4 top-0 w-px h-full bg-gray-200" />
                <div className="absolute left-1/2 top-0 w-px h-full bg-gray-200 -translate-x-px" />
                <div className="absolute right-1/4 top-0 w-px h-full bg-gray-200" />
              </div>
            </div>

            {/* 3 Poles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {governanceTree.poles.map((pole) => (
                <div
                  key={pole.title}
                  className="about-gov-node bg-cream rounded p-6 text-center border border-gray-100"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gold mb-2">
                    {pole.title}
                  </p>
                  <p className="font-heading font-medium text-navy">{pole.name}</p>
                  <p className="body-small text-gray-500">{pole.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5 — RANKINGS & ACCREDITATIONS                         */}
      {/* ============================================================ */}
      <section
        className="section-padding-lg"
        style={{ background: 'linear-gradient(180deg, #0A1628 0%, #1E3A5F 100%)' }}
      >
        <div className="container-isl">
          <div className="about-fade-up text-center mb-16">
            <p className="section-label">CLASSEMENTS</p>
            <div className="gold-divider mx-auto mb-6" />
            <h2 className="heading-section text-white">Reconnue dans le monde entier</h2>
          </div>

          {/* Rankings grid */}
          <div className="about-rankings-grid grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {rankingsData.map((r) => (
              <div
                key={r.label}
                className="about-ranking-card bg-navy-light/50 backdrop-blur rounded p-8 text-center border border-white/10"
              >
                <p className="font-heading font-semibold text-3xl text-gold mb-2">{r.label}</p>
                <p className="stat-number text-white mb-2">{r.position}</p>
                <p className="body-small text-white/60 mb-3">{r.context}</p>
                <div className="flex items-center justify-center gap-1 text-emerald">
                  <TrendingUp size={16} aria-hidden="true" />
                  <span className="text-sm font-medium">{r.trend}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Accreditations */}
          <div className="about-fade-up text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gold mb-6">
              ACCRÉDITATIONS
            </p>
            <div className="flex items-center justify-center gap-8 mb-4">
              <img src="/logo-aacsb.svg" alt="AACSB Accreditation" className="h-12 opacity-80" />
              <img src="/logo-equis.svg" alt="EQUIS Accreditation" className="h-12 opacity-80" />
              <img src="/logo-cti.svg" alt="CTI Accreditation" className="h-12 opacity-80" />
            </div>
            <p className="body-small text-white/60">
              Triple couronne AACSB — EQUIS — AMBA | Habilitation CTI
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 6 — CHIFFRES CLÉS                                     */}
      {/* ============================================================ */}
      <section className="bg-cream section-padding">
        <div className="container-isl">
          <div className="about-fade-up text-center mb-12">
            <p className="section-label">CHIFFRES CLÉS</p>
            <div className="gold-divider mx-auto mb-6" />
            <h2 className="heading-page text-navy">L'ISL en quelques chiffres</h2>
          </div>

          <div className="about-stats-grid grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((s) => (
              <div key={s.label} className="text-center">
                <s.icon size={28} className="text-gold mx-auto mb-3" aria-hidden="true" />
                <div className="stat-number">
                  {statsVisible ? (
                    <CountUp end={s.value} duration={2} separator=" " suffix={s.suffix} />
                  ) : (
                    <span>0{s.suffix}</span>
                  )}
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-500 mt-2">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 7 — RSE                                               */}
      {/* ============================================================ */}
      <section className="bg-white section-padding about-rse">
        <div className="container-isl">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            {/* Left — text */}
            <div className="about-rse-left lg:w-1/2">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-emerald mb-4">
                RSE
              </p>
              <div className="gold-divider mb-6" />
              <h2 className="heading-page text-navy mb-6">Notre engagement durable</h2>
              <p className="body-large text-gray-600 mb-8">
                L'ISL s'est engagée dans une démarche RSE ambitieuse : neutralité carbone d'ici
                2030, parité dans la gouvernance, accessibilité pour tous.
              </p>
              <ul className="space-y-4">
                {rseCommitments.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-emerald flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="body-regular text-gray-700">{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — image */}
            <div className="about-rse-right lg:w-1/2 relative">
              <img
                src="/formation-sustainability.jpg"
                alt="Étudiants ISL engagés dans une démarche de recherche environnementale"
                className="rounded shadow-isl-lg w-full object-cover aspect-[4/3]"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 bg-emerald text-white text-xs font-semibold uppercase tracking-[0.08em] px-4 py-2 rounded">
                Label RSE Engagé
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 8 — TRANSPARENCE / DONNÉES PUBLIQUES                  */}
      {/* ============================================================ */}
      <section className="bg-cream section-padding">
        <div className="container-isl">
          <div className="about-fade-up text-center mb-12">
            <p className="section-label">TRANSPARENCE</p>
            <div className="gold-divider mx-auto mb-6" />
            <h2 className="heading-page text-navy">Données publiques</h2>
          </div>

          <div className="about-docs-list max-w-4xl mx-auto space-y-3">
            {publicDocs.map((doc) => (
              <div
                key={doc}
                className="about-doc-row flex items-center justify-between bg-white rounded px-6 py-4 border border-gray-100 hover:shadow-isl transition-shadow duration-300"
              >
                <div className="flex items-center gap-4">
                  <FileText size={20} className="text-gold flex-shrink-0" aria-hidden="true" />
                  <span className="body-regular text-navy">{doc}</span>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-navy transition-colors"
                  aria-label={`Télécharger ${doc}`}
                >
                  <Download size={16} aria-hidden="true" />
                  <span className="hidden sm:inline">Télécharger</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 9 — CTA PRESSE                                        */}
      {/* ============================================================ */}
      <section
        className="about-cta py-16"
        style={{ background: 'linear-gradient(180deg, #0A1628 0%, #1E3A5F 100%)' }}
      >
        <div className="container-isl">
          <div className="about-cta-content max-w-2xl mx-auto text-center">
            <h2 className="heading-page text-white mb-4">Espace presse</h2>
            <p className="body-large text-white/80 mb-8">
              Journalistes : accédez à nos communiqués, notre charte graphique et nos contacts
              presse.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="btn-primary">
                Contact presse
              </Link>
              <Link to="/contact" className="btn-outline-light">
                Communiqués
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
