import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import CountUp from 'react-countup';
import {
  Users,
  Handshake,
  Heart,
  Phone,
  ExternalLink,
  Building2,
  TrendingUp,
  ChevronDown,
  Briefcase,
  CheckCircle2,
  Building,
  MapPin,
  Globe,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const stats = [
  { value: 94, suffix: '%', label: "Taux d'insertion à 6 mois" },
  { value: 450, suffix: '', label: 'Partenaires entreprises' },
  { value: 2800, suffix: '', label: 'Conventions de stage / an' },
  { value: 680, suffix: '', label: 'Alternants en formation' },
  { value: 48, suffix: 'k€', label: 'Salaire médian Master' },
  { value: 85, suffix: '%', label: 'Satisfaction partenaires' },
];

const partnerLogos = [
  { src: '/partner-logo-1.svg', alt: 'BNP Paribas' },
  { src: '/partner-logo-2.svg', alt: "L'Oréal" },
  { src: '/partner-logo-3.svg', alt: 'Capgemini' },
  { src: '/partner-logo-4.svg', alt: 'TotalEnergies' },
  { src: '/partner-logo-5.svg', alt: 'Sanofi' },
  { src: '/partner-logo-6.svg', alt: 'Michelin' },
];

const services = [
  {
    icon: Users,
    title: 'Recrutement & Stages',
    body: "Déposez vos offres de stage, alternance et CDI sur notre plateforme JobTeaser. Accédez à notre CVthèque de 4 200 profils. Participez à nos forums emploi.",
    features: ['Plateforme JobTeaser', 'CVthèque filtrée', 'Forum emploi annuel', 'Journées entreprises'],
    cta: 'Déposer une offre',
  },
  {
    icon: Handshake,
    title: 'Chaires & Partenariats',
    body: "Créez une chaire d'enseignement ou de recherche avec l'ISL. Cofinancez des projets de recherche. Développez des programmes sur mesure pour vos équipes.",
    features: ["Chaires d'entreprise", 'Projets CIFRE', 'Programmes sur mesure', 'Mentorat étudiant'],
    cta: 'Créer un partenariat',
  },
  {
    icon: Heart,
    title: 'Mécénat & Fondation ISL',
    body: "Soutenez l'excellence académique, l'ouverture sociale et la recherche. Découvrez les projets prioritaires de la Fondation ISL et les avantages fiscaux du mécénat.",
    features: ["Bourses d'excellence", 'Chaires de recherche', 'Équipements', 'Avantages fiscaux (66%)'],
    cta: 'Devenir mécène',
  },
];

const executivePrograms = [
  {
    title: 'MBA Corporate',
    meta: '12-18 mois | Sur mesure | 15-30 participants',
    desc: "Un MBA conçu pour votre entreprise. Nous adaptons le cursus à vos enjeux stratégiques, avec des modules en présentiel et à distance.",
  },
  {
    title: 'Certificats Exécutifs',
    meta: '3-10 jours | Compétences ciblées',
    desc: "Formations courtes et intensives sur des sujets clés : leadership, finance, transformation digitale, RSE et gouvernance.",
  },
  {
    title: 'Séminaires Sur Mesure',
    meta: '2-5 jours | Conçus pour vous',
    desc: "Nous concevons des séminaires entièrement personnalisés pour vos équipes dirigeantes et vos talents à fort potentiel.",
  },
  {
    title: 'CPF & VAE',
    meta: 'Utilisez votre Compte Formation',
    desc: "Nos formations éligibles au Compte Personnel de Formation et à la Validation des Acquis de l'Expérience.",
  },
];

const testimonials = [
  {
    quote: "L'ISL nous fournit chaque année des profils d'une qualité exceptionnelle. Leur formation allie rigueur académique et sens de l'entreprise.",
    author: 'Pierre Lefebvre',
    role: 'DRH',
    company: 'BNP Paribas',
  },
  {
    quote: "Notre chaire 'Finance Durable' avec l'ISL est un succès. Les étudiants apportent un regard neuf sur nos enjeux RSE.",
    author: 'Isabelle Moreau',
    role: 'Directrice RSE',
    company: 'TotalEnergies',
  },
  {
    quote: "Le programme de mentorat ISL-L'Oréal nous permet d'identifier les talents internationaux dès leur formation.",
    author: 'Yuki Tanaka',
    role: 'Responsable Talents Internationaux',
    company: "L'Oréal",
  },
];

const whyRecruitStats = [
  { value: 94, suffix: '%', label: "Taux d'emploi à 6 mois" },
  { value: 4200, suffix: '', label: 'Étudiants formés' },
  { value: 87, suffix: '', label: 'Nationalités' },
  { value: 50, suffix: '', label: 'Top 50 QS Ranking' },
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

  useGSAP(
    () => {
      if (!ref.current) return;
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from(ref.current.querySelector('.hero-label'), { y: 20, opacity: 0, duration: 0.6 }, 0.2)
        .from(ref.current.querySelector('.hero-divider'), { scaleX: 0, duration: 0.5 }, 0.4)
        .from(ref.current.querySelector('.hero-title'), { y: 40, opacity: 0, duration: 0.8 }, 0.5)
        .from(ref.current.querySelector('.hero-sub'), { y: 20, opacity: 0, duration: 0.6 }, 0.8);
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className="relative min-h-[55vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background image + overlay */}
      <div className="absolute inset-0">
        <img
          src="/executive-classroom.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(10,22,40,0.92) 0%, rgba(30,58,95,0.85) 100%)',
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
            <li className="text-white">Entreprises</li>
          </ol>
        </nav>

        <p className="hero-label section-label">ESPACE ENTREPRISES</p>
        <div className="hero-divider gold-divider mx-auto mb-6" />
        <h1 className="hero-title heading-hero text-white mb-6">
          Recrutez les talents de l'ISL
        </h1>
        <p className="hero-sub body-large text-white/80 max-w-2xl mx-auto">
          4 200 étudiants, 87 nationalités, 15 domaines d'excellence. Découvrez
          comment nos partenariats entreprises créent de la valeur pour votre
          organisation.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION 2 — KEY STATS                                             */
/* ------------------------------------------------------------------ */

function StatsSection() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-navy py-12 md:py-16">
      <div className="container-isl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center" data-reveal>
              <div className="stat-number">
                {inView ? (
                  <CountUp end={s.value} duration={2} suffix={s.suffix} />
                ) : (
                  <span>0{s.suffix}</span>
                )}
              </div>
              <p className="text-xs uppercase tracking-[0.08em] text-white/50 mt-2">
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
/*  SECTION 3 — PARTNER LOGOS                                         */
/* ------------------------------------------------------------------ */

function PartnersSection() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="bg-white py-16 lg:py-20">
      <div className="container-isl">
        <p className="section-label" data-reveal>PARTENAIRES</p>
        <div className="gold-divider mb-4" data-reveal />
        <h2 className="heading-page text-navy mb-10" data-reveal>
          Entreprises partenaires
        </h2>

        {/* Logo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12 items-center">
          {partnerLogos.map((logo) => (
            <div
              key={logo.alt}
              className="flex items-center justify-center p-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-400 cursor-pointer"
              data-reveal
            >
              <img src={logo.src} alt={logo.alt} className="max-h-12 w-auto" />
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="mt-12 testimonial-card" data-reveal>
          <blockquote className="font-heading italic text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
            "Les étudiants de l'ISL allient excellence académique et agilité
            professionnelle. Nous recrutons 40 stagiaires ISL chaque année et en
            embauchons 70% en CDI."
          </blockquote>
          <footer className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center text-white font-heading font-semibold text-sm">
              MD
            </div>
            <div>
              <p className="text-sm font-semibold text-navy">Marie Dupont</p>
              <p className="text-xs text-gray-500">DRH — Capgemini Invent</p>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION 4 — SERVICES                                              */
/* ------------------------------------------------------------------ */

function ServicesSection() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="bg-cream py-16 lg:py-24">
      <div className="container-isl">
        <p className="section-label" data-reveal>SERVICES</p>
        <div className="gold-divider mb-4" data-reveal />
        <h2 className="heading-section text-navy mb-12" data-reveal>
          Comment collaborer avec l'ISL
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc) => (
            <div
              key={svc.title}
              className="bg-white rounded p-8 lg:p-10 border-t-2 border-gold shadow-isl transition-all duration-300 hover:-translate-y-1 hover:shadow-isl-lg"
              data-reveal
            >
              <svc.icon size={48} className="text-gold mb-5" />
              <h3 className="heading-subsection text-navy mb-3">{svc.title}</h3>
              <p className="body-regular text-gray-600 mb-5">{svc.body}</p>
              <ul className="space-y-2 mb-6">
                {svc.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 size={14} className="text-gold shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className="text-sm font-semibold text-navy hover:text-gold transition-colors inline-flex items-center gap-1 group">
                {svc.cta}
                <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION 5 — WHY RECRUIT + EXECUTIVE EDUCATION                     */
/* ------------------------------------------------------------------ */

function ExecutiveSection() {
  const ref = useScrollReveal();
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  return (
    <section ref={ref} className="bg-navy py-16 lg:py-20">
      <div className="container-isl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — Executive intro + why recruit stats */}
          <div>
            <p className="section-label" data-reveal>EXECUTIVE EDUCATION</p>
            <div className="gold-divider mb-4" data-reveal />
            <h2 className="heading-page text-white mb-4" data-reveal>
              Former vos collaborateurs
            </h2>
            <p className="body-large text-white/80 mb-8" data-reveal>
              L'ISL conçoit des programmes de formation sur mesure pour les
              entreprises. Du séminaire de 2 jours au MBA corporate, nous
              adaptons notre pédagogie à vos enjeux stratégiques.
            </p>

            {/* Mini stats row */}
            <div className="flex flex-wrap gap-6 mb-8" data-reveal>
              {[
                { n: '120', l: 'programmes/an' },
                { n: '3 000', l: 'cadres formés' },
                { n: '98%', l: 'satisfaction' },
              ].map((s) => (
                <div key={s.l} className="flex items-center gap-3">
                  <TrendingUp size={20} className="text-gold" />
                  <div>
                    <span className="font-heading font-bold text-gold text-lg">{s.n}</span>
                    <span className="text-white/60 text-xs ml-1.5">{s.l}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn-outline-gold" data-reveal>
              Programme sur mesure →
            </button>
          </div>

          {/* Right — Accordion */}
          <div className="space-y-3" data-reveal>
            {executivePrograms.map((prog, i) => (
              <div
                key={prog.title}
                className="bg-navy-light/60 rounded border border-white/10 overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                  onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                  aria-expanded={openAccordion === i}
                >
                  <div>
                    <h4 className="font-heading font-medium text-white text-base">
                      {prog.title}
                    </h4>
                    <p className="text-xs text-white/50 mt-0.5">{prog.meta}</p>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-gold shrink-0 transition-transform duration-300 ${
                      openAccordion === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-white/70 leading-relaxed mb-3">
                      {prog.desc}
                    </p>
                    <button className="text-xs font-semibold text-gold hover:text-gold-light transition-colors inline-flex items-center gap-1">
                      En savoir plus
                      <ExternalLink size={12} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION 6 — RECRUITMENT PORTAL PREVIEW                            */
/* ------------------------------------------------------------------ */

function RecruitmentPortalSection() {
  const ref = useScrollReveal();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    poste: '',
    type: 'Stage',
    formation: '',
    description: '',
  });

  return (
    <section ref={ref} className="bg-white py-16 lg:py-20">
      <div className="container-isl">
        <p className="section-label" data-reveal>PORTAIL RECRUTEMENT</p>
        <div className="gold-divider mb-4" data-reveal />
        <h2 className="heading-page text-navy mb-10" data-reveal>
          Déposez vos offres en quelques clics
        </h2>

        {/* Mock form card */}
        <div className="max-w-3xl mx-auto" data-reveal>
          <div
            className="bg-white rounded shadow-isl-lg border border-gray-200 overflow-hidden"
            style={{ transform: 'rotate(-1deg)' }}
          >
            {/* Step indicator */}
            <div className="flex items-center border-b border-gray-200 bg-gray-50 px-6 py-4">
              {['Informations', 'Description', 'Publication'].map((label, i) => (
                <div key={label} className="flex items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                      i <= step
                        ? 'bg-gold text-navy'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={`ml-2 text-xs font-medium hidden sm:block ${
                      i <= step ? 'text-navy' : 'text-gray-400'
                    }`}
                  >
                    {label}
                  </span>
                  {i < 2 && (
                    <div className="w-8 sm:w-12 h-px bg-gray-300 mx-3" />
                  )}
                </div>
              ))}
            </div>

            {/* Form body */}
            <div className="p-6 lg:p-8">
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-xs font-semibold text-navy mb-1.5">
                    Poste *
                  </label>
                  <input
                    type="text"
                    placeholder="ex: Data Analyst H/F"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:border-gold focus:outline-none"
                    value={formData.poste}
                    onChange={(e) =>
                      setFormData({ ...formData, poste: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy mb-1.5">
                    Type de contrat *
                  </label>
                  <select
                    className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:border-gold focus:outline-none bg-white"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                  >
                    <option>Stage</option>
                    <option>Alternance</option>
                    <option>CDI</option>
                    <option>CDD</option>
                  </select>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-xs font-semibold text-navy mb-1.5">
                  Formation visée
                </label>
                <input
                  type="text"
                  placeholder="ex: Master Data Science"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:border-gold focus:outline-none"
                  value={formData.formation}
                  onChange={(e) =>
                    setFormData({ ...formData, formation: e.target.value })
                  }
                />
              </div>

              <div className="mb-6">
                <label className="block text-xs font-semibold text-navy mb-1.5">
                  Description du poste
                </label>
                <textarea
                  rows={4}
                  placeholder="Décrivez les missions, compétences requises et profil recherché..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:border-gold focus:outline-none resize-none"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <button className="btn-primary text-sm">Continuer</button>
                <span className="text-xs text-gray-400">
                  Cette offre sera publiée après modération
                </span>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button className="btn-primary">Accéder au portail recrutement</button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION 7 — PARTNER TESTIMONIALS                                  */
/* ------------------------------------------------------------------ */

function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="bg-cream py-12 lg:py-16">
      <div className="container-isl max-w-4xl">
        <p className="section-label text-center" data-reveal>TÉMOIGNAGES</p>
        <div className="gold-divider mx-auto mb-6" data-reveal />

        <div className="relative" data-reveal>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`transition-all duration-500 ${
                i === active
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 absolute inset-0 translate-y-4 pointer-events-none'
              }`}
            >
              <div className="testimonial-card text-center">
                <blockquote className="font-heading italic text-xl md:text-2xl text-gray-700 leading-relaxed mb-6 max-w-2xl mx-auto">
                  "{t.quote}"
                </blockquote>
                <footer>
                  <p className="font-semibold text-navy">{t.author}</p>
                  <p className="text-sm text-gray-500">
                    {t.role}, {t.company}
                  </p>
                </footer>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6" data-reveal>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === active ? 'bg-gold w-8' : 'bg-gold/30 hover:bg-gold/50'
              }`}
              aria-label={`Témoignage ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION 8 — CONTACT CTA                                           */
/* ------------------------------------------------------------------ */

function ContactCTASection() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="bg-navy py-16 lg:py-20">
      <div className="container-isl text-center max-w-2xl">
        <h2 className="heading-page text-white mb-4" data-reveal>
          Prêt à collaborer ?
        </h2>
        <p className="body-large text-white/80 mb-8" data-reveal>
          Notre équipe Relations Entreprises vous accompagne dans la
          construction de votre partenariat.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4" data-reveal>
          <Link to="/contact" className="btn-primary">
            Contacter nos équipes
          </Link>
          <a
            href="tel:+33144397200"
            className="btn-outline-light inline-flex items-center gap-2"
          >
            <Phone size={16} />
            +33 1 44 39 72 00
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN PAGE COMPONENT                                               */
/* ------------------------------------------------------------------ */

export default function EntreprisesPage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <PartnersSection />
      <ServicesSection />
      <ExecutiveSection />
      <RecruitmentPortalSection />
      <TestimonialsSection />
      <ContactCTASection />
    </main>
  );
}
