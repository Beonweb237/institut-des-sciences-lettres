import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CountUp from 'react-countup';
import {
  ChevronRight,
  ChevronLeft,
  MapPin,
  Clock,
  Calendar,
  BookOpen,
  ArrowRight,
  Users,
  FlaskConical,
  Building2,
  Award,
  Globe,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ─── Data ────────────────────────────────────────────
const stats = [
  { number: 4200, suffix: '', label: 'Étudiants', icon: Users },
  { number: 94, suffix: '%', label: 'Taux d\'insertion', icon: Award },
  { number: 87, suffix: '', label: 'Enseignants-chercheurs', icon: FlaskConical },
  { number: 48, suffix: 'e', label: 'Classement mondial QS', icon: Globe },
];

const formations = [
  {
    title: 'Master Géopolitique & Relations Internationales',
    level: 'Master',
    duration: '2 ans',
    campus: 'Paris',
    image: '/formation-diplomacy.jpg',
    tag: 'Excellence',
  },
  {
    title: 'Master Cybersécurité & Intelligence Artificielle',
    level: 'Master',
    duration: '2 ans',
    campus: 'Paris',
    image: '/formation-cyber.jpg',
    tag: 'Innovation',
  },
  {
    title: 'Bachelor Développement Durable & Transition Écologique',
    level: 'Licence',
    duration: '3 ans',
    campus: 'Paris',
    image: '/formation-sustainability.jpg',
    tag: 'RSE',
  },
];

const testimonials = [
  {
    quote:
      "L'ISL m'a offert une double compétence technique et diplomatique qui fait toute la différence sur le marché de l'emploi. Aujourd'hui conseillère en cybersécurité au Quai d'Orsay, je dois tout à l'excellence de mes professeurs.",
    name: 'Sarah Benali',
    role: 'Promotion 2022 — Master Cybersécurité',
    image: '/testimonial-sarah.jpg',
  },
  {
    quote:
      "Le réseau alumni de l'ISL est une vraie famille. Grâce à un parrain alumni, j'ai intégré BNP Paribas en tant que stratège ESG dès ma sortie. Les opportunités sont infinies quand on fait partie de cette communauté.",
    name: 'Antoine Morel',
    role: 'Promotion 2021 — MBA Finance Durable',
    image: '/testimonial-antoine.jpg',
  },
  {
    quote:
      "Venir du Japon pour étudier à l'ISL a été la meilleure décision de ma vie. L'accompagnement international est exceptionnel et la diversité culturelle sur le campus m'a ouvert des horizons insoupçonnés.",
    name: 'Yuki Tanaka',
    role: 'Promotion 2023 — Master Relations Internationales',
    image: '/testimonial-yuki.jpg',
  },
];

const partners = [
  { name: 'BNP Paribas', logo: '/partner-logo-1.svg' },
  { name: "L'Oréal", logo: '/partner-logo-2.svg' },
  { name: 'Capgemini', logo: '/partner-logo-3.svg' },
  { name: 'TotalEnergies', logo: '/partner-logo-4.svg' },
  { name: 'Sanofi', logo: '/partner-logo-5.svg' },
  { name: 'Michelin', logo: '/partner-logo-6.svg' },
];

const news = [
  {
    title: 'Nouveau laboratoire d\'intelligence artificielle éthique',
    excerpt: 'L\'ISL inaugure un laboratoire dédié à l\'IA responsable avec le soutien de la Commission européenne.',
    image: '/news-research.jpg',
    date: '15 Mai 2025',
    category: 'Recherche',
  },
  {
    title: 'Inauguration du nouveau campus numérique',
    excerpt: 'Une extension de 5 000m² dédiée aux filières tech et innovation, ouverte à la rentrée 2025.',
    image: '/news-campus.jpg',
    date: '28 Avr 2025',
    category: 'Campus',
  },
  {
    title: 'Le Pr Martin recevant le prix Nobel de Chimie',
    excerpt: 'Notre directeur de recherche distingué pour ses travaux sur les matériaux quantiques.',
    image: '/news-award.jpg',
    date: '10 Avr 2025',
    category: 'Distinction',
  },
];

// ─── Home Component ──────────────────────────────────
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);

  // Hero entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.fromTo('.hero-video', { opacity: 0 }, { opacity: 1, duration: 1.5 })
        .fromTo('.hero-gold-line', { scaleX: 0 }, { scaleX: 1, duration: 0.6 }, 0.3)
        .fromTo('.hero-label', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.5)
        .fromTo('.hero-title-word', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 }, 0.7)
        .fromTo('.hero-subtitle', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 1.2)
        .fromTo('.hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 1.5)
        .fromTo('.hero-profile-nav', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 1.8);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Stats scroll trigger
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => setStatsVisible(true),
    });

    return () => trigger.kill();
  }, []);

  // Scroll reveal animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.gsap-fade-up').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('.gsap-slide-left').forEach((el) => {
        gsap.fromTo(
          el,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('.gsap-slide-right').forEach((el) => {
        gsap.fromTo(
          el,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const nextTestimonial = () => setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div>
      {/* ═══════════════ HERO ═══════════════ */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
          className="hero-video absolute inset-0 w-full h-full object-cover opacity-0"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(10,22,40,0.92) 0%, rgba(30,58,95,0.75) 60%, rgba(42,82,120,0.50) 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 container-isl text-center text-white pt-20">
          <div className="hero-gold-line gold-divider mx-auto mb-6 origin-left" />
          <p className="hero-label section-label text-gold mb-4">Depuis 1872 — Paris</p>

          <h1 className="heading-hero text-white mb-6">
            {'Former les esprits qui transforment le monde'.split(' ').map((word, i) => (
              <span key={i} className="hero-title-word inline-block mr-[0.3em] opacity-0">
                {word}
              </span>
            ))}
          </h1>

          <p className="hero-subtitle text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 opacity-0">
            Excellence académique, recherche d'avant-garde et employabilité. L'ISL forme les leaders
            de demain dans un environnement stimulant et international.
          </p>

          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
            <Link to="/admission" className="btn-primary">
              Découvrir les admissions
              <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link to="/formations" className="btn-outline-light">
              Explorer les formations
            </Link>
          </div>
        </div>

        {/* Profile Navigation Bar */}
        <div
          className="hero-profile-nav absolute bottom-0 left-0 right-0 z-10 py-4 opacity-0"
          style={{ background: 'rgba(10, 22, 40, 0.7)' }}
        >
          <div className="container-isl flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <span className="text-sm text-white/60 font-medium">Je suis :</span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { label: 'Candidat', path: '/admission' },
                { label: 'Étudiant', path: '/espace-etudiant' },
                { label: 'Entreprise', path: '/entreprises' },
                { label: 'Alumni', path: '/alumni' },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="px-5 py-2 text-sm text-white border border-white/20 rounded-full hover:bg-gold hover:border-gold hover:text-navy transition-all duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CHIFFRES CLÉS ═══════════════ */}
      <section ref={statsRef} className="section-padding bg-cream">
        <div className="container-isl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="text-center gsap-fade-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <stat.icon size={28} className="mx-auto mb-3 text-gold" />
                <div className="stat-number">
                  {statsVisible ? (
                    <CountUp end={stat.number} duration={2} suffix={stat.suffix} />
                  ) : (
                    `0${stat.suffix}`
                  )}
                </div>
                <p className="section-label mt-2 !mb-0">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CAMPUS PREVIEW ═══════════════ */}
      <section className="section-padding-lg bg-white">
        <div className="container-isl">
          <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="gsap-slide-left relative">
              <img
                src="/campus-aerial.jpg"
                alt="Vue aérienne du campus ISL"
                className="w-full rounded shadow-isl-lg object-cover aspect-[4/3]"
              />
              <img
                src="/shape-organic-1.svg"
                alt=""
                className="absolute -bottom-8 -left-8 w-32 h-32 opacity-40 -z-10"
                aria-hidden="true"
              />
            </div>

            {/* Content */}
            <div className="gsap-slide-right">
              <div className="gold-divider mb-6" />
              <h2 className="heading-section mb-6">Un Campus d'Exception au Cœur de Paris</h2>
              <p className="body-large text-gray-600 mb-8">
                Entre architecture haussmannienne classique et extensions contemporaines en verre, le
                campus de l'ISL offre un environnement d'apprentissage unique dans le 7ème
                arrondissement. Bibliothèques historiques, laboratoires de pointe et espaces de vie
                verdoyants se conjuguent pour une expérience étudiante exceptionnelle.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  '3 hectares en plein cœur de Paris',
                  '12 laboratoires de recherche équipés',
                  'Bibliothèque patrimoniale de 400 000 ouvrages',
                  'Résidences étudiantes sur campus',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700">
                    <ChevronRight size={18} className="text-gold flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/campus" className="btn-navy">
                Découvrir le campus
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FORMATIONS PHARES ═══════════════ */}
      <section className="section-padding bg-cream">
        <div className="container-isl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div className="gsap-fade-up">
              <div className="gold-divider mb-6" />
              <h2 className="heading-section">Formations Phares</h2>
            </div>
            <Link
              to="/formations"
              className="link-gold text-navy-light font-medium text-sm mt-4 md:mt-0 flex items-center gap-1 gsap-fade-up"
            >
              Voir toutes les formations
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formations.map((formation, idx) => (
              <div
                key={formation.title}
                className="formation-card gsap-fade-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img
                    src={formation.image}
                    alt={formation.title}
                    className="formation-card-img w-full h-full object-cover transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-gold text-navy text-xs font-semibold uppercase tracking-wider">
                    {formation.level}
                  </span>
                  {formation.tag && (
                    <span className="absolute top-4 right-4 px-3 py-1 bg-navy text-gold text-xs font-semibold uppercase tracking-wider">
                      {formation.tag}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg font-medium text-navy-light mb-3 leading-snug">
                    {formation.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {formation.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {formation.campus}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TÉMOIGNAGES ═══════════════ */}
      <section className="section-padding bg-navy relative overflow-hidden">
        <img
          src="/shape-organic-2.svg"
          alt=""
          className="absolute top-10 right-10 w-48 h-48 opacity-10"
          aria-hidden="true"
        />
        <div className="container-isl relative z-10">
          <div className="text-center mb-12 gsap-fade-up">
            <div className="gold-divider mx-auto mb-6" />
            <h2 className="heading-section text-white">Ils Témoignent</h2>
          </div>

          {/* Desktop: 3 cards | Mobile: carousel */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={t.name} className="testimonial-card gsap-fade-up" style={{ animationDelay: `${idx * 0.15}s` }}>
                <div className="mb-4">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="opacity-20">
                    <path
                      d="M14 24c-3.3 0-6-2.7-6-6s2.7-6 6-6c.7 0 1.3.1 1.9.3C15.3 8.5 11.5 5.2 7 4.1c-.6-.1-1-.7-.9-1.3.1-.6.7-1 1.3-.9 6.2 1.5 10.6 6.8 11.6 13.2V12c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6h-2.5c-.6 3.3-2.3 6.2-4.8 8.3l-.4.3c-.5.4-1.2.3-1.6-.2s-.3-1.2.2-1.6l.4-.3c2-1.7 3.4-4.1 4-6.8H14zm20 0c-3.3 0-6-2.7-6-6s2.7-6 6-6c.7 0 1.3.1 1.9.3C35.3 8.5 31.5 5.2 27 4.1c-.6-.1-1-.7-.9-1.3.1-.6.7-1 1.3-.9 6.2 1.5 10.6 6.8 11.6 13.2V12c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6h-2.5c-.6 3.3-2.3 6.2-4.8 8.3l-.4.3c-.5.4-1.2.3-1.6-.2s-.3-1.2.2-1.6l.4-.3c2-1.7 3.4-4.1 4-6.8H34z"
                      fill="#C9A962"
                    />
                  </svg>
                </div>
                <p className="font-heading italic text-lg text-gray-700 mb-6 leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="testimonial-card">
              <div className="mb-4">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="opacity-20">
                  <path
                    d="M14 24c-3.3 0-6-2.7-6-6s2.7-6 6-6c.7 0 1.3.1 1.9.3C15.3 8.5 11.5 5.2 7 4.1c-.6-.1-1-.7-.9-1.3.1-.6.7-1 1.3-.9 6.2 1.5 10.6 6.8 11.6 13.2V12c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6h-2.5c-.6 3.3-2.3 6.2-4.8 8.3l-.4.3c-.5.4-1.2.3-1.6-.2s-.3-1.2.2-1.6l.4-.3c2-1.7 3.4-4.1 4-6.8H14z"
                    fill="#C9A962"
                  />
                </svg>
              </div>
              <p className="font-heading italic text-base text-gray-700 mb-6 leading-relaxed">
                "{testimonials[activeTestimonial].quote}"
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[activeTestimonial].image}
                  alt={testimonials[activeTestimonial].name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {testimonials[activeTestimonial].name}
                  </p>
                  <p className="text-xs text-gray-500">{testimonials[activeTestimonial].role}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-6">
              <button onClick={prevTestimonial} className="p-2 text-gold hover:text-gold-light transition-colors" aria-label="Témoignage précédent">
                <ChevronLeft size={24} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === activeTestimonial ? 'bg-gold' : 'bg-white/30'
                    }`}
                    aria-label={`Témoignage ${i + 1}`}
                  />
                ))}
              </div>
              <button onClick={nextTestimonial} className="p-2 text-gold hover:text-gold-light transition-colors" aria-label="Témoignage suivant">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ RECHERCHE ═══════════════ */}
      <section className="section-padding-lg bg-white">
        <div className="container-isl">
          <div className="grid lg:grid-cols-[45%_55%] gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="gsap-slide-left order-2 lg:order-1">
              <div className="gold-divider mb-6" />
              <h2 className="heading-section mb-6">Recherche d'Excellence</h2>
              <p className="body-large text-gray-600 mb-8">
                L'ISL compte 12 unités de recherche pluridisciplinaires, 87 enseignants-chercheurs et
                un budget recherche de 28M€. Nos laboratoires collaborent avec le CNRS, l'INRAE et
                les plus grandes universités internationales.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-navy/5 p-5 rounded">
                  <FlaskConical size={24} className="text-sky-blue mb-2" />
                  <p className="stat-number text-2xl">12</p>
                  <p className="text-sm text-gray-600">Laboratoires</p>
                </div>
                <div className="bg-navy/5 p-5 rounded">
                  <BookOpen size={24} className="text-sky-blue mb-2" />
                  <p className="stat-number text-2xl">340+</p>
                  <p className="text-sm text-gray-600">Publications/an</p>
                </div>
              </div>
              <Link to="/recherche" className="btn-navy">
                Explorer nos recherches
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>

            {/* Image */}
            <div className="gsap-slide-right order-1 lg:order-2 relative">
              <img
                src="/research-lab-1.jpg"
                alt="Laboratoire de recherche moderne à l'ISL"
                className="w-full rounded shadow-isl-lg object-cover aspect-[16/10]"
              />
              <img
                src="/shape-organic-3.svg"
                alt=""
                className="absolute -bottom-6 -right-6 w-28 h-28 opacity-30 -z-10"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PARTENAIRES ═══════════════ */}
      <section className="section-padding bg-cream">
        <div className="container-isl">
          <div className="text-center mb-12 gsap-fade-up">
            <div className="gold-divider mx-auto mb-6" />
            <h2 className="heading-section">Nos Partenaires</h2>
            <p className="body-large text-gray-600 mt-4 max-w-2xl mx-auto">
              Plus de 300 entreprises partenaires recrutent nos diplômés chaque année.
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center gsap-fade-up">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="flex items-center justify-center p-6 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
              >
                <img src={partner.logo} alt={partner.name} className="max-h-12 w-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ ACTUALITÉS ═══════════════ */}
      <section className="section-padding bg-white">
        <div className="container-isl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div className="gsap-fade-up">
              <div className="gold-divider mb-6" />
              <h2 className="heading-section">Actualités</h2>
            </div>
            <Link
              to="#"
              className="link-gold text-navy-light font-medium text-sm mt-4 md:mt-0 flex items-center gap-1 gsap-fade-up"
            >
              Toutes les actualités
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, idx) => (
              <article
                key={item.title}
                className="news-card gsap-fade-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="relative overflow-hidden aspect-[3/2]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="news-card-img w-full h-full object-cover transition-transform duration-500"
                  />
                  <span className="absolute top-4 right-4 px-3 py-1.5 bg-navy text-white text-xs font-semibold">
                    {item.date}
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gold mb-2 block">
                    {item.category}
                  </span>
                  <h3 className="font-heading text-lg font-medium text-navy-light mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{item.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ADMISSION ═══════════════ */}
      <section className="section-padding bg-navy relative overflow-hidden">
        <img
          src="/shape-organic-1.svg"
          alt=""
          className="absolute -top-20 -left-20 w-64 h-64 opacity-5"
          aria-hidden="true"
        />
        <img
          src="/shape-organic-2.svg"
          alt=""
          className="absolute -bottom-16 -right-16 w-48 h-48 opacity-5"
          aria-hidden="true"
        />
        <div className="container-isl relative z-10 text-center gsap-fade-up">
          <div className="gold-divider mx-auto mb-6" />
          <h2 className="heading-section text-white mb-6">Rejoignez l'ISL</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
            Les inscriptions pour la rentrée 2025 sont ouvertes. Découvrez nos programmes et
            commencez votre candidature dès aujourd'hui.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/admission" className="btn-primary">
              <Calendar size={18} className="mr-2" />
              Candidater maintenant
            </Link>
            <Link to="/admission" className="btn-outline-light">
              <Building2 size={18} className="mr-2" />
              Journées portes ouvertes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
