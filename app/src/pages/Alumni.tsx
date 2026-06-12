import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import CountUp from 'react-countup';
import {
  Network,
  Briefcase,
  Users,
  MapPin,
  Clock,
  Calendar,
  Heart,
  ExternalLink,
  ChevronRight,
  Globe,
  GraduationCap,
  Building2,
  ArrowRight,
  Mail,
  User,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const heroStats = [
  { value: 45000, suffix: '+', label: 'Alumni' },
  { value: 120, suffix: '', label: 'Pays' },
  { value: 45, suffix: '', label: 'Chapitres régionaux' },
  { value: 2400, suffix: '', label: 'Offres emploi / an' },
];

const services = [
  {
    icon: Network,
    title: 'Annuaire & Networking',
    body: "Accédez à l'annuaire des 45 000 alumni. Filtrez par promotion, secteur, localisation. Participez aux événements networking régionaux et sectoriels.",
    cta: "Accéder à l'annuaire",
  },
  {
    icon: Briefcase,
    title: 'Offres d\'emploi exclusives',
    body: "2 400 offres d'emploi réservées aux alumni chaque année. Déposez votre CV, activez les alertes et trouvez votre prochain défi professionnel.",
    cta: 'Voir les offres',
  },
  {
    icon: Users,
    title: 'Programme de mentorat',
    body: "Devenez mentor ou trouvez un mentor. L'ISL met en relation alumni expérimentés et jeunes diplômés pour des parcours de 6 à 12 mois.",
    cta: 'Rejoindre le programme',
  },
];

const events = [
  {
    date: '15 MAI 2025',
    title: 'Gala ISL 2025 — 153ème promotion',
    location: 'Palais de Chaillot, Paris 16e',
    time: '19h00 — 23h00',
    description: "La cérémonie annuelle de remise des diplômes et le gala de prestige de l'ISL.",
  },
  {
    date: '28 FÉV 2025',
    title: 'Afterwork Paris Chapter — Février',
    location: 'Le Perchoir, Paris 11e',
    time: '18h30 — 21h00',
    description: "Rencontrez les alumni parisiens dans une ambiance conviviale.",
  },
  {
    date: '12 MARS 2025',
    title: 'Forum Emploi Alumni — Printemps',
    location: 'Campus ISL, Amphi Descartes',
    time: '10h00 — 17h00',
    description: "50 entreprises partenaires recrutent nos alumni. CV, entretiens flash, conférences.",
  },
  {
    date: '05 AVR 2025',
    title: 'Conférence Innovation & IA',
    location: 'Campus ISL, Salle Curie',
    time: '14h00 — 18h00',
    description: "Table ronde sur l'intelligence artificielle avec des alumni leaders tech.",
  },
  {
    date: '22 MAI 2025',
    title: 'Afterwork Londres Chapter',
    location: 'The Shard, London',
    time: '18h00 — 21h00',
    description: "Networking exclusif pour les alumni basés à Londres et en Angleterre.",
  },
  {
    date: '10 JUIN 2025',
    title: 'Rencontre Promotion 2015 — 10 ans',
    location: 'Campus ISL, Jardin des Académies',
    time: '11h00 — 18h00',
    description: "Retrouvailles de la promotion 2015 pour célébrer 10 ans de parcours.",
  },
];

const portraits = [
  {
    photo: '/testimonial-sarah.jpg',
    name: 'Sarah Benmoussa',
    role: "Diplômée 2023 — Affaires politiques, ONU Genève",
    quote: "L'ISL m'a donné une méthode de pensée et un réseau international.",
  },
  {
    photo: '/testimonial-antoine.jpg',
    name: 'Antoine Morel',
    role: "Diplômé 2022 — Consultant Cybersécurité, Capgemini",
    quote: "Les échanges entreprises dès la première année m'ont permis d'atterrir en CDI avant ma graduation.",
  },
  {
    photo: '/testimonial-yuki.jpg',
    name: 'Yuki Tanaka',
    role: "Diplômée 2024 — Stratégie internationale, L'Oréal",
    quote: "Le programme double diplôme Paris-Tokyo a transformé ma carrière.",
  },
  {
    photo: '/testimonial-sarah.jpg',
    name: 'Lucas Martin',
    role: "Diplômé 2020 — Entrepreneur, Fondateur GreenTech",
    quote: "L'esprit d'entreprise de l'ISL m'a donné le courage de me lancer.",
  },
  {
    photo: '/testimonial-antoine.jpg',
    name: 'Amira Hassan',
    role: "Diplômée 2021 — Analyste Finance Durable, BNP Paribas",
    quote: "La diversité des promotions prépare aux défis multiculturels du monde professionnel.",
  },
  {
    photo: '/testimonial-yuki.jpg',
    name: 'Thomas Laurent',
    role: "Diplômé 2019 — Directeur RSE, TotalEnergies",
    quote: "Le réseau alumni m'a accompagné à chaque étape de ma carrière. Un capital inestimable.",
  },
];

const chapters = [
  'Paris', 'Londres', 'New York', 'Berlin', 'Montréal', 'Genève',
  'Bruxelles', 'Singapour', 'Hong Kong', 'Dubai', 'Tokyo', 'São Paulo',
  'Casablanca', 'Dakar', 'Abidjan', 'Shanghai', 'Mumbai', 'Sydney',
  'Madrid', 'Rome', 'Amsterdam', 'Francfort', 'Zurich', 'Munich',
  'Vienne', 'Istanbul', 'Moscou', 'Mexico', 'Buenos Aires', 'Lima',
  'Bogotá', 'Lagos', 'Nairobi', 'Le Caire', 'Tel Aviv', 'Doha',
  'Kuala Lumpur', 'Jakarta', 'Bangkok', 'Séoul', 'Pékin', 'Toronto',
  'San Francisco', 'Boston', 'Dublin',
];

const newsItems = [
  {
    date: '15 JAN',
    category: 'NOMINATION',
    title: "Sarah Benmoussa (promo 2023) nommée conseillère spéciale auprès du Secrétaire général de l'ONU",
  },
  {
    date: '10 JAN',
    category: 'DISTINCTION',
    title: "Le Professeur Dubois (promo 1998) reçoit la médaille Fields honorifique",
  },
  {
    date: '05 JAN',
    category: 'ÉVÉNEMENT',
    title: "Lancement du Chapitre Alumni Afrique de l'Ouest à Abidjan",
  },
];

const donationAmounts = ['50€', '100€', '250€', '500€', '1000€'];
const donationProjects = [
  "Bourses d'excellence",
  'Équipement recherche',
  'Fonds de solidarité',
  'Libre',
];

/* ------------------------------------------------------------------ */
/*  HELPER: useScrollReveal                                            */
/* ------------------------------------------------------------------ */

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const els = ref.current.querySelectorAll('[data-reveal]');
      els.forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        });
      });
    },
    { scope: ref }
  );

  return ref;
}

/* ------------------------------------------------------------------ */
/*  SECTION 1 — HERO                                                  */
/* ------------------------------------------------------------------ */

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [statsInView, setStatsInView] = useState(false);

  useGSAP(
    () => {
      if (!ref.current) return;
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from(ref.current.querySelector('.hero-label'), { y: 20, opacity: 0, duration: 0.6 }, 0.2)
        .from(ref.current.querySelector('.hero-divider'), { scaleX: 0, duration: 0.5 }, 0.4)
        .from(ref.current.querySelector('.hero-title'), { y: 40, opacity: 0, duration: 0.8 }, 0.5)
        .from(ref.current.querySelector('.hero-sub'), { y: 20, opacity: 0, duration: 0.6 }, 0.8)
        .from(ref.current.querySelector('.hero-stats'), { y: 20, opacity: 0, duration: 0.6 }, 1.0);
    },
    { scope: ref }
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsInView(true);
      },
      { threshold: 0.15 }
    );
    const statsEl = ref.current?.querySelector('.hero-stats');
    if (statsEl) observer.observe(statsEl);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-[55vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/alumni-network.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(10,22,40,0.9) 0%, rgba(30,58,95,0.85) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 container-isl text-center pt-32 pb-16">
        {/* Breadcrumb */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center justify-center gap-2 text-sm text-white/60">
            <li>
              <Link to="/" className="hover:text-gold transition-colors">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li className="text-white">Alumni</li>
          </ol>
        </nav>

        <p className="hero-label section-label">RÉSEAU ISL ALUMNI</p>
        <div className="hero-divider gold-divider mx-auto mb-6" />
        <h1 className="hero-title heading-hero text-white mb-6">
          Une communauté pour la vie
        </h1>
        <p className="hero-sub body-large text-white/80 max-w-2xl mx-auto mb-10">
          45 000 alumni dans 120 pays. Un réseau qui s'engage, qui recrute, qui
          inspire. Bienvenue chez vous.
        </p>

        {/* Stats row */}
        <div className="hero-stats flex flex-wrap items-center justify-center gap-8 lg:gap-12">
          {heroStats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-heading font-bold text-2xl md:text-3xl text-gold">
                {statsInView ? (
                  <CountUp end={s.value} duration={2} suffix={s.suffix} separator=" " />
                ) : (
                  <span>0{s.suffix}</span>
                )}
              </div>
              <p className="text-xs uppercase tracking-[0.08em] text-white/50 mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION 2 — SERVICES ALUMNI                                       */
/* ------------------------------------------------------------------ */

function ServicesSection() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="bg-white py-16 lg:py-24">
      <div className="container-isl">
        <p className="section-label" data-reveal>SERVICES</p>
        <div className="gold-divider mb-4" data-reveal />
        <h2 className="heading-section text-navy mb-12" data-reveal>
          Les services de votre réseau
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc) => (
            <div
              key={svc.title}
              className="bg-cream rounded p-8 lg:p-10 border-t-2 border-gold transition-all duration-300 hover:-translate-y-1 hover:shadow-isl-lg"
              data-reveal
            >
              <svc.icon size={48} className="text-gold mb-5" />
              <h3 className="heading-subsection text-navy mb-3">{svc.title}</h3>
              <p className="body-regular text-gray-600 mb-6">{svc.body}</p>
              <button className="text-sm font-semibold text-navy hover:text-gold transition-colors inline-flex items-center gap-1 group">
                {svc.cta}
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION 3 — EVENTS CALENDAR                                       */
/* ------------------------------------------------------------------ */

function EventsSection() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="bg-cream py-16 lg:py-20">
      <div className="container-isl">
        <p className="section-label" data-reveal>ÉVÉNEMENTS</p>
        <div className="gold-divider mb-4" data-reveal />
        <h2 className="heading-page text-navy mb-10" data-reveal>
          Prochains événements
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((evt) => (
            <div
              key={evt.title}
              className="bg-white rounded p-6 shadow-isl transition-all duration-300 hover:shadow-isl-lg group"
              data-reveal
            >
              {/* Date badge */}
              <div className="inline-flex items-center gap-2 bg-gold text-navy text-xs font-semibold uppercase tracking-[0.06em] px-3 py-1.5 rounded mb-4">
                <Calendar size={12} />
                {evt.date}
              </div>

              <h3 className="font-heading font-medium text-navy text-lg mb-2 leading-snug group-hover:text-navy-light transition-colors">
                {evt.title}
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                <MapPin size={12} />
                {evt.location}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                <Clock size={12} />
                {evt.time}
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {evt.description}
              </p>

              <button className="btn-outline-gold text-xs px-5 py-2.5">
                S'inscrire
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION 4 — PORTRAITS ALUMNI                                      */
/* ------------------------------------------------------------------ */

function PortraitsSection() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="relative bg-navy py-16 lg:py-24 overflow-hidden">
      {/* Decorative shapes */}
      <img
        src="/shape-organic-1.svg"
        alt=""
        className="absolute top-8 left-8 w-40 h-40 opacity-10 pointer-events-none"
      />
      <img
        src="/shape-organic-2.svg"
        alt=""
        className="absolute bottom-8 right-8 w-32 h-32 opacity-10 pointer-events-none"
      />

      <div className="container-isl relative z-10">
        <p className="section-label" data-reveal>PORTRAITS</p>
        <div className="gold-divider mb-4" data-reveal />
        <h2 className="heading-section text-white mb-12" data-reveal>
          Leurs parcours inspirent
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {portraits.map((p) => (
            <div
              key={p.name}
              className="group relative bg-navy-light rounded overflow-hidden cursor-pointer"
              data-reveal
            >
              {/* Photo */}
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={p.photo}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Info overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy via-navy/90 to-transparent p-5 pt-16">
                <h3 className="font-heading font-medium text-white text-base mb-0.5">
                  {p.name}
                </h3>
                <p className="text-xs text-gold">{p.role}</p>
              </div>

              {/* Quote on hover */}
              <div className="absolute inset-0 bg-navy/85 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                <blockquote className="font-heading italic text-white/90 text-center text-lg leading-relaxed">
                  "{p.quote}"
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION 5 — CHAPTERS MAP                                          */
/* ------------------------------------------------------------------ */

function ChaptersSection() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="bg-white py-16 lg:py-20">
      <div className="container-isl">
        <p className="section-label" data-reveal>CHAPITRES</p>
        <div className="gold-divider mb-4" data-reveal />
        <h2 className="heading-page text-navy mb-8" data-reveal>
          45 chapitres à travers le monde
        </h2>

        {/* Map image */}
        <div className="relative mb-10 rounded overflow-hidden" data-reveal>
          <img
            src="/international-map.svg"
            alt="Carte des 45 chapitres alumni de l'ISL dans le monde"
            className="w-full h-auto max-h-[400px] object-contain bg-navy rounded"
          />
        </div>

        {/* City grid */}
        <div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-x-4 gap-y-2"
          data-reveal
        >
          {chapters.map((city) => (
            <button
              key={city}
              className="text-sm text-navy-light hover:text-gold hover:underline transition-colors text-left py-1"
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION 6 — DONATION                                              */
/* ------------------------------------------------------------------ */

function DonationSection() {
  const ref = useScrollReveal();
  const [selectedAmount, setSelectedAmount] = useState<string | null>('100€');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedProject, setSelectedProject] = useState(donationProjects[0]);

  const displayAmount = selectedAmount === 'Autre' && customAmount
    ? `${customAmount}€`
    : selectedAmount;

  return (
    <section ref={ref} className="bg-cream py-16 lg:py-20">
      <div className="container-isl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — Info */}
          <div>
            <p className="section-label" data-reveal>FAIRE UN DON</p>
            <div className="gold-divider mb-4" data-reveal />
            <h2 className="heading-page text-navy mb-4" data-reveal>
              Contribuez à l'excellence
            </h2>
            <p className="body-large text-gray-600 mb-6" data-reveal>
              Votre don permet à l'ISL de financer des bourses d'excellence,
              d'équiper nos laboratoires et d'accueillir les meilleurs talents,
              quelle que soit leur origine.
            </p>

            <div className="bg-emerald/10 border border-emerald/20 rounded p-4 mb-6" data-reveal>
              <p className="text-emerald font-semibold body-regular">
                1€ donné = 1,66€ après réduction d'impôt (mécénat)
              </p>
            </div>

            {/* Key alumni stats */}
            <div className="grid grid-cols-2 gap-4" data-reveal>
              {[
                { value: '45k', label: 'Alumni' },
                { value: '120', label: 'Pays' },
                { value: '85%', label: "Emploi à 6 mois" },
                { value: '66%', label: "Déduction fiscale" },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded p-4 text-center">
                  <div className="stat-number text-2xl">{s.value}</div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Donation form */}
          <div
            className="bg-white rounded p-6 lg:p-8 shadow-isl"
            data-reveal
          >
            {/* Amount selector */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-navy uppercase tracking-[0.06em] mb-3">
                Montant du don
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
                {donationAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => { setSelectedAmount(amount); setCustomAmount(''); }}
                    className={`py-2.5 px-3 rounded text-sm font-semibold transition-all duration-200 ${
                      selectedAmount === amount
                        ? 'bg-gold text-navy'
                        : 'bg-transparent border border-gray-200 text-gray-600 hover:border-gold hover:text-gold'
                    }`}
                  >
                    {amount}
                  </button>
                ))}
                <button
                  onClick={() => setSelectedAmount('Autre')}
                  className={`py-2.5 px-3 rounded text-sm font-semibold transition-all duration-200 ${
                    selectedAmount === 'Autre'
                      ? 'bg-gold text-navy'
                      : 'bg-transparent border border-gray-200 text-gray-600 hover:border-gold hover:text-gold'
                  }`}
                >
                  Autre
                </button>
              </div>
              {selectedAmount === 'Autre' && (
                <div className="relative">
                  <input
                    type="number"
                    placeholder="Montant libre"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:border-gold focus:outline-none"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">€</span>
                </div>
              )}
            </div>

            {/* Project selector */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-navy uppercase tracking-[0.06em] mb-3">
                À quoi souhaitez-vous contribuer ?
              </label>
              <div className="space-y-2">
                {donationProjects.map((project) => (
                  <label
                    key={project}
                    className="flex items-center gap-3 p-3 rounded border border-gray-200 cursor-pointer hover:border-gold/50 transition-colors"
                  >
                    <input
                      type="radio"
                      name="project"
                      value={project}
                      checked={selectedProject === project}
                      onChange={() => setSelectedProject(project)}
                      className="w-4 h-4 accent-gold"
                    />
                    <span className="text-sm text-gray-700">{project}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Donor info */}
            <div className="grid sm:grid-cols-3 gap-3 mb-6">
              <div>
                <label className="block text-xs font-semibold text-navy mb-1.5">Prénom</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:border-gold focus:outline-none"
                  placeholder="Prénom"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-navy mb-1.5">Nom</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:border-gold focus:outline-none"
                  placeholder="Nom"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-navy mb-1.5">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:border-gold focus:outline-none"
                  placeholder="email@exemple.fr"
                />
              </div>
            </div>

            {/* Submit */}
            <button className="btn-primary w-full mb-4">
              Faire un don {displayAmount && displayAmount !== 'Autre' ? `de ${displayAmount}` : ''}
            </button>

            <p className="text-xs text-gray-500 text-center leading-relaxed">
              Votre don ouvre droit à une réduction d'impôt de 66% dans la
              limite de 20% de votre revenu imposable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION 7 — NEWS                                                  */
/* ------------------------------------------------------------------ */

function NewsSection() {
  const ref = useScrollReveal();

  const categoryColors: Record<string, string> = {
    NOMINATION: 'bg-navy text-white',
    DISTINCTION: 'bg-gold text-navy',
    'ÉVÉNEMENT': 'bg-sky-blue text-white',
  };

  return (
    <section ref={ref} className="bg-white py-12 lg:py-16">
      <div className="container-isl">
        <p className="section-label" data-reveal>ACTUALITÉS</p>
        <div className="gold-divider mb-4" data-reveal />
        <h2 className="heading-page text-navy mb-8" data-reveal>
          L'actualité du réseau
        </h2>

        <div className="space-y-4">
          {newsItems.map((item) => (
            <div
              key={item.title}
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 bg-cream rounded px-5 py-4 group cursor-pointer hover:shadow-isl transition-all duration-300"
              data-reveal
            >
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-gold shrink-0">
                {item.date}
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider shrink-0 w-fit ${
                  categoryColors[item.category] || 'bg-gray-200 text-gray-600'
                }`}
              >
                {item.category}
              </span>
              <p className="text-sm font-semibold text-navy flex-1 group-hover:text-navy-light transition-colors">
                {item.title}
              </p>
              <ArrowRight
                size={16}
                className="text-gold shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION 8 — CTA JOIN                                              */
/* ------------------------------------------------------------------ */

function JoinCTASection() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="bg-navy py-16 lg:py-20">
      <div className="container-isl text-center max-w-xl">
        <h2 className="heading-page text-white mb-4" data-reveal>
          Rejoignez le réseau
        </h2>
        <p className="body-large text-white/80 mb-8" data-reveal>
          Créez votre compte alumni en 2 minutes. Accédez à l'annuaire, aux
          offres d'emploi et aux événements.
        </p>
        <div className="flex flex-col items-center gap-4" data-reveal>
          <button className="btn-primary">Créer mon compte alumni</button>
          <button className="text-sm text-white/70 hover:text-gold transition-colors link-gold">
            Déjà membre ? Se connecter
          </button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN PAGE COMPONENT                                               */
/* ------------------------------------------------------------------ */

export default function AlumniPage() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <EventsSection />
      <PortraitsSection />
      <ChaptersSection />
      <DonationSection />
      <NewsSection />
      <JoinCTASection />
    </main>
  );
}
