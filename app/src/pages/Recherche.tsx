import { useState, useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  Brain,
  Leaf,
  Shield,
  HeartPulse,
  BookOpen,
  BarChart3,
  Microscope,
  ExternalLink,
  Users,
  GraduationCap,
  ChevronRight,
  Award,
  Building2,
} from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const heroStats = [
  { value: '23', label: 'Laboratoires' },
  { value: '180', label: 'Enseignants-chercheurs' },
  { value: '340+', label: 'Publications/an' },
  { value: '45M€', label: 'Budget recherche' },
];

const researchAxes = [
  {
    icon: Brain,
    color: '#3B82F6',
    colorVar: 'var(--sky-blue)',
    title: 'Intelligence Artificielle Éthique',
    body: "Chaire internationale dédiée à l'éthique des algorithmes, l'IA explicable et la lutte contre les biais. Partenariat avec Facebook AI Research et l'INRIA.",
    stats: '12 chercheurs | 48 publications | ERC Grant 2.5M€',
  },
  {
    icon: Leaf,
    color: '#10B981',
    colorVar: 'var(--emerald)',
    title: 'Changement Climatique & Transitions Écologiques',
    body: "Observatoire interdisciplinaire analysant les transitions énergétiques, économiques et sociales. Collaborations avec le GIEC et le MNHN.",
    stats: '18 chercheurs | 62 publications | ANR 1.8M€',
  },
  {
    icon: Shield,
    color: '#F59E0B',
    colorVar: 'var(--amber-energy)',
    title: 'Gouvernance Mondiale & Sécurité Internationale',
    body: 'Analyse des systèmes de gouvernance globale, cybersécurité internationale, géopolitique des technologies et droit des conflits.',
    stats: '15 chercheurs | 55 publications | Horizon Europe 3.2M€',
  },
  {
    icon: HeartPulse,
    color: '#E11D48',
    colorVar: '#E11D48',
    title: 'Santé Globale & Biotechnologies',
    body: "Recherche en santé publique internationale, épidémiologie, biotechnologies éthiques. Partenariats avec l'INSERM et l'Institut Pasteur.",
    stats: '22 chercheurs | 71 publications | ANR 2.1M€',
  },
  {
    icon: BookOpen,
    color: '#2E5C8A',
    colorVar: 'var(--navy-mid)',
    title: 'Humanités Numériques',
    body: 'Croisement des sciences humaines et du numérique : traitement automatique des langues, archéologie computationnelle, patrimoine culturel digital.',
    stats: '9 chercheurs | 34 publications | FIRAH 800k€',
  },
  {
    icon: BarChart3,
    color: '#C9A962',
    colorVar: 'var(--gold)',
    title: 'Économie & Finance Quantitative',
    body: 'Modélisation économétrique, finance comportementale, cryptomonnaies et régulation des marchés. Chaires BNP Paribas et Société Générale.',
    stats: '14 chercheurs | 49 publications | Chaire 1.5M€',
  },
];

const labs = [
  {
    image: '/formation-cyber.jpg',
    name: "LIAIS (Laboratoire d'Intelligence Artificielle et Sciences)",
    director: 'Pr. Laurent Dubois',
    researchers: '12 chercheurs permanents, 8 doctorants',
    focus: "IA éthique, apprentissage automatique, traitement du langage",
    partners: ['INRIA', 'FAIR', 'CNRS'],
    recent: '3 publications Nature/Science en 2024',
  },
  {
    image: null,
    name: "CERI (Centre d'Études des Relations Internationales)",
    director: 'Pr. Anne-Sophie Martin',
    researchers: '15 chercheurs, 10 doctorants',
    focus: "Géopolitique, sécurité internationale, droit des conflits",
    partners: ['Sciences Po', 'EUI', 'Chatham House'],
    recent: 'Rapport pour le Parlement européen — Décembre 2024',
  },
  {
    image: null,
    name: 'OCEAN (Observatoire du Climat et des Transitions)',
    director: 'Pr. Marc Lefebvre',
    researchers: '18 chercheurs, 12 doctorants',
    focus: "Modélisation climatique, économie de l'environnement",
    partners: ['GIEC', 'MNHN', 'Météo-France'],
    recent: 'Rapport GIEC — Contribution chapitre 4',
  },
  {
    image: null,
    name: 'LABSANTE (Laboratoire de Santé Globale)',
    director: 'Pr. Claire Fontaine',
    researchers: '22 chercheurs, 15 doctorants',
    focus: "Santé publique, épidémiologie, biotechnologies éthiques",
    partners: ['INSERM', 'Institut Pasteur', 'WHO'],
    recent: "Projet ANR SANTE-DIGITALE — 4.5M€ de financement",
  },
];

const publications = [
  {
    type: 'ARTICLE',
    typeColor: 'bg-sky-blue text-white',
    title: 'Towards Fairness in Deep Learning: A Multi-Stakeholder Approach',
    authors: 'Dubois L., et al.',
    journal: 'Nature Machine Intelligence, Jan 2025',
  },
  {
    type: 'OUVRAGE',
    typeColor: 'bg-navy-mid text-white',
    title: 'Géopolitique des semi-conducteurs : l\'Asie du Sud-Est face aux grandes puissances',
    authors: 'Martin A.-S.',
    journal: 'Presses de Sciences Po, 2024',
  },
  {
    type: 'RAPPORT',
    typeColor: 'bg-emerald text-white',
    title: 'Rapport sur les transitions énergétiques dans les territoires ultramarins',
    authors: 'Lefebvre M., et al.',
    journal: 'Rapport ANR, Déc 2024',
  },
  {
    type: 'ARTICLE',
    typeColor: 'bg-sky-blue text-white',
    title: 'Epidemiological Modeling of Emerging Pathogens: Lessons from COVID-19 to Disease X',
    authors: 'Fontaine C., et al.',
    journal: 'The Lancet, Nov 2024',
  },
  {
    type: 'OUVRAGE',
    typeColor: 'bg-navy-mid text-white',
    title: 'Les archives numériques comme patrimoine : enjeux de conservation et d\'accès',
    authors: 'Roux P.',
    journal: 'Editions de la BnF, 2024',
  },
  {
    type: 'BREVET',
    typeColor: 'bg-amber-energy text-white',
    title: 'Brevet FR2024-08912 : Système de détection d\'anomalies par IA fédérée',
    authors: 'ISL / INRIA',
    journal: 'Oct 2024',
  },
];

const projets = [
  {
    title: 'ERC Advanced Grant "ETHICAL-AI"',
    funding: '2.5M€ — European Research Council (2023-2028)',
    lead: 'Pr. Laurent Dubois',
    desc: 'Construire des cadres éthiques opérationnels pour l\'IA dans les secteurs sensibles (santé, justice, défense).',
    progress: 60,
    progressColor: 'bg-sky-blue',
    tags: 'IA Éthique | 5 ans | 12 partenaires européens',
  },
  {
    title: 'ANR "TERRITOIRES-2050"',
    funding: '1.8M€ — Agence Nationale de la Recherche (2024-2027)',
    lead: 'Pr. Marc Lefebvre',
    desc: "Modélisation des transitions écologiques à l'échelle locale : outils décisionnels pour les collectivités.",
    progress: 35,
    progressColor: 'bg-emerald',
    tags: 'Climat | 4 ans | 8 collectivités partenaires',
  },
  {
    title: 'Horizon Europe "CYBER-GOV"',
    funding: '3.2M€ — Commission Européenne (2024-2028)',
    lead: 'Pr. Anne-Sophie Martin',
    desc: 'Gouvernance de la cybersécurité européenne : standards, régulations et coopération transfrontalière.',
    progress: 25,
    progressColor: 'bg-amber-energy',
    tags: 'Cybersécurité | 5 ans | 9 pays européens',
  },
  {
    title: 'PEPR "SANTE-DIGITALE"',
    funding: '4.5M€ — France 2030 (2023-2027)',
    lead: 'Pr. Claire Fontaine',
    desc: "Santé personnalisée par l'IA : du génome au traitement, en passant par les objets connectés.",
    progress: 45,
    progressColor: 'bg-[#E11D48]',
    tags: 'Santé | 5 ans | France 2030',
  },
];

const ecolesDoctorales = [
  {
    name: 'Droit & Science politique',
    count: '35 doctorants',
    director: 'Pr. Philippe Renaud',
    topics: ['Droit international', 'Relations internationales', 'Science politique comparée'],
  },
  {
    name: 'Sciences & Technologies',
    count: '52 doctorants',
    director: 'Pr. Laurent Dubois',
    topics: ['Intelligence artificielle', 'Cybersécurité', 'Data Science'],
  },
  {
    name: 'Économie & Gestion',
    count: '28 doctorants',
    director: 'Pr. Sophie Bernard',
    topics: ['Finance quantitative', 'Économie comportementale', 'Innovation'],
  },
  {
    name: 'Lettres, Arts & Civilisations',
    count: '22 doctorants',
    director: 'Pr. Marie Dupont',
    topics: ['Humanités numériques', 'Patrimoine culturel', 'Histoire de l\'art'],
  },
  {
    name: 'Santé & Biologie',
    count: '31 doctorants',
    director: 'Pr. Claire Fontaine',
    topics: ['Santé publique', 'Épidémiologie', 'Biotechnologies'],
  },
  {
    name: 'Sciences de l\'Homme & Société',
    count: '12 doctorants',
    director: 'Pr. Jean-Pierre Martin',
    topics: ['Anthropologie', 'Sociologie numérique', 'Études genre'],
  },
];

/* ------------------------------------------------------------------ */
/*  Recherche Page Component                                           */
/* ------------------------------------------------------------------ */

export default function Recherche() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pubFilter, setPubFilter] = useState('Toutes');
  const [animatedProgress, setAnimatedProgress] = useState<number[]>([0, 0, 0, 0]);

  const pubFilters = ['Toutes', 'Articles', 'Ouvrages', 'Rapports', 'Brevets'];

  const filteredPublications =
    pubFilter === 'Toutes'
      ? publications
      : publications.filter((p) => {
          if (pubFilter === 'Articles') return p.type === 'ARTICLE';
          if (pubFilter === 'Ouvrages') return p.type === 'OUVRAGE';
          if (pubFilter === 'Rapports') return p.type === 'RAPPORT';
          if (pubFilter === 'Brevets') return p.type === 'BREVET';
          return true;
        });

  /* GSAP Scroll Animations */
  useGSAP(
    () => {
      if (!containerRef.current) return;

      /* Hero */
      gsap.from('.re-hero > *', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
      });

      gsap.from('.re-hero-stat', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.8,
        ease: 'power3.out',
      });

      /* Research axes */
      gsap.from('.re-axis-card', {
        scrollTrigger: {
          trigger: '.re-axes-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
      });

      /* Labs */
      gsap.from('.re-lab-card', {
        scrollTrigger: {
          trigger: '.re-labs-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        x: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });

      /* Publications */
      gsap.from('.re-pub-item', {
        scrollTrigger: {
          trigger: '.re-pub-list',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
      });

      /* Projects */
      gsap.from('.re-project-card', {
        scrollTrigger: {
          trigger: '.re-projects-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        onComplete: () => {
          /* Animate progress bars after cards appear */
          setAnimatedProgress(projets.map((p) => p.progress));
        },
      });

      /* Doctorat */
      gsap.from('.re-doc-left', {
        scrollTrigger: {
          trigger: '.re-doctorat',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.re-doc-ecole', {
        scrollTrigger: {
          trigger: '.re-doctorat',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.3,
        ease: 'power3.out',
      });

      /* CTA */
      gsap.from('.re-cta-partner', {
        scrollTrigger: {
          trigger: '.re-cta-partner',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      {/* ============================================================ */}
      {/* SECTION 1 — HERO                                             */}
      {/* ============================================================ */}
      <section
        className="relative flex items-center justify-center min-h-[55vh]"
        style={{
          background:
            'linear-gradient(135deg, rgba(10,22,40,0.93) 0%, rgba(30,58,95,0.85) 100%), url(/research-lab-1.jpg) center/cover no-repeat',
        }}
      >
        <div className="re-hero container-isl text-center pt-32 pb-16">
          <p className="body-small text-white/60 mb-4">Accueil / Recherche</p>
          <p className="section-label !text-sky-blue">RECHERCHE &amp; INNOVATION</p>
          <div className="gold-divider mx-auto mb-6" />
          <h1 className="heading-hero text-white mb-6">À la frontière du savoir</h1>
          <p className="body-large text-white/80 max-w-2xl mx-auto mb-10">
            23 laboratoires, 180 enseignants-chercheurs, 340 publications par an. L'ISL contribue
            aux grandes avancées scientifiques et humaines de notre temps.
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {heroStats.map((s, i) => (
              <div key={i} className="re-hero-stat text-center">
                <div className="font-heading font-bold text-[clamp(2rem,4vw,3rem)] text-sky-blue leading-none tracking-[-0.02em]">
                  {s.value}
                </div>
                <div className="text-xs font-semibold uppercase tracking-[0.08em] text-white/60 mt-2">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — AXES DE RECHERCHE                                */}
      {/* ============================================================ */}
      <section className="bg-white section-padding-lg">
        <div className="container-isl">
          <p className="section-label">AXES DE RECHERCHE</p>
          <div className="gold-divider mb-6" />
          <h2 className="heading-section text-navy mb-14">
            Nos domaines d'excellence
          </h2>

          <div className="re-axes-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchAxes.map((axe, i) => {
              const Icon = axe.icon;
              return (
                <div
                  key={i}
                  className="re-axis-card group bg-cream rounded p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-isl-lg cursor-pointer"
                  style={{ borderLeft: `4px solid ${axe.color}` }}
                >
                  <div className="mb-5">
                    <Icon size={48} style={{ color: axe.color }} />
                  </div>
                  <h3 className="font-heading font-medium text-[clamp(1.25rem,1.5vw,1.5rem)] text-navy mb-4 leading-tight">
                    {axe.title}
                  </h3>
                  <p className="body-regular text-gray-600 mb-4">{axe.body}</p>
                  <p className="body-small text-gray-500 mb-5">{axe.stats}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold hover:underline" style={{ color: axe.color }}>
                    Découvrir l'axe
                    <ChevronRight size={14} />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — LABORATOIRES                                     */}
      {/* ============================================================ */}
      <section className="bg-cream section-padding">
        <div className="container-isl">
          <p className="section-label">LABORATOIRES</p>
          <div className="gold-divider mb-6" />
          <h2 className="heading-page text-navy mb-10">
            Nos laboratoires de recherche
          </h2>

          <div className="re-labs-grid grid grid-cols-1 lg:grid-cols-2 gap-6">
            {labs.map((lab, i) => (
              <div
                key={i}
                className="re-lab-card bg-white rounded p-6 shadow-isl transition-all duration-300 hover:shadow-isl-lg flex flex-col sm:flex-row gap-6"
              >
                {lab.image && (
                  <div className="sm:w-[30%] shrink-0">
                    <img
                      src={lab.image}
                      alt={lab.name}
                      className="w-full h-40 sm:h-full object-cover rounded"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className={lab.image ? 'sm:w-[70%]' : 'w-full'}>
                  <h3 className="font-heading font-medium text-lg text-navy mb-2">
                    {lab.name}
                  </h3>
                  <div className="space-y-1.5 mb-4">
                    <p className="body-small text-gray-600">
                      <span className="font-semibold">Directeur :</span> {lab.director}
                    </p>
                    <p className="body-small text-gray-600">
                      <span className="font-semibold">Équipe :</span> {lab.researchers}
                    </p>
                    <p className="body-small text-gray-600">
                      <span className="font-semibold">Axes :</span> {lab.focus}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {lab.partners.map((p) => (
                      <Badge
                        key={p}
                        variant="secondary"
                        className="bg-navy/5 text-navy-light text-xs"
                      >
                        {p}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-emerald mb-3">
                    <Award size={14} />
                    <span>{lab.recent}</span>
                  </div>
                  <button className="inline-flex items-center gap-1 text-sm font-semibold text-gold hover:text-gold-light transition-colors">
                    Visiter le site du labo
                    <ExternalLink size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — PUBLICATIONS                                     */}
      {/* ============================================================ */}
      <section className="bg-white section-padding">
        <div className="container-isl">
          <p className="section-label">PUBLICATIONS</p>
          <div className="gold-divider mb-6" />
          <h2 className="heading-page text-navy mb-8">
            Publications récentes
          </h2>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {pubFilters.map((f) => (
              <button
                key={f}
                onClick={() => setPubFilter(f)}
                className={`px-4 py-2 text-sm font-medium rounded transition-all ${
                  pubFilter === f
                    ? 'bg-navy text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="re-pub-list space-y-4">
            {filteredPublications.map((pub, i) => (
              <div
                key={`${pubFilter}-${i}`}
                className="re-pub-item flex flex-col sm:flex-row sm:items-center gap-3 bg-cream rounded px-5 py-4 transition-all hover:shadow-isl"
              >
                <Badge className={`${pub.typeColor} shrink-0 text-[10px] uppercase tracking-wider`}>
                  {pub.type}
                </Badge>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-navy-light text-sm sm:text-base truncate">
                    {pub.title}
                  </p>
                  <p className="body-small text-gray-500">
                    {pub.authors} — {pub.journal}
                  </p>
                </div>
                <button className="shrink-0 text-sky-blue hover:text-sky-blue/80 transition-colors">
                  <ExternalLink size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5 — PROJETS EN COURS                                 */}
      {/* ============================================================ */}
      <section className="bg-navy section-padding">
        <div className="container-isl">
          <p className="section-label !text-gold">PROJETS</p>
          <div className="gold-divider mb-6" />
          <h2 className="heading-page text-white mb-10">
            Projets de recherche en cours
          </h2>

          <div className="re-projects-grid grid grid-cols-1 md:grid-cols-2 gap-6">
            {projets.map((p, i) => (
              <div
                key={i}
                className="re-project-card bg-navy-light rounded p-8 border-t-2 border-gold transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Microscope size={18} className="text-gold" />
                  <h3 className="font-heading font-medium text-lg text-white">
                    {p.title}
                  </h3>
                </div>
                <p className="body-small text-gold mb-2">{p.funding}</p>
                <p className="body-small text-white/60 mb-3">
                  <span className="font-semibold">Responsable :</span> {p.lead}
                </p>
                <p className="body-regular text-white/80 mb-6">{p.desc}</p>
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-white/60 mb-2">
                    <span>Avancement</span>
                    <span>{p.progress}%</span>
                  </div>
                  <div className="h-2 bg-navy rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1500 ease-out ${p.progressColor.replace('bg-[', 'bg-[').replace(']', ']')}`}
                      style={{
                        width: `${animatedProgress[i] || 0}%`,
                        transition: 'width 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                  </div>
                </div>
                <p className="text-xs text-white/40">{p.tags}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 6 — DOCTORAT                                         */}
      {/* ============================================================ */}
      <section className="bg-cream section-padding">
        <div className="re-doctorat container-isl">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left */}
            <div className="re-doc-left lg:w-1/2">
              <p className="section-label">DOCTORAT</p>
              <div className="gold-divider mb-6" />
              <h2 className="heading-page text-navy mb-6">
                Rejoignez nos doctorants
              </h2>
              <p className="body-large text-gray-600 mb-6">
                L'ISL accueille 180 doctorants dans 6 écoles doctorales. Bourses, encadrement
                d'excellence et réseau international : toutes les conditions sont réunies pour votre
                recherche.
              </p>
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <GraduationCap size={20} className="text-gold" />
                  <span className="text-sm font-semibold text-navy">180 doctorants</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 size={20} className="text-gold" />
                  <span className="text-sm font-semibold text-navy">6 écoles doctorales</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={20} className="text-gold" />
                  <span className="text-sm font-semibold text-navy">85% soutenance sous 4 ans</span>
                </div>
              </div>
              <Link to="/contact" className="btn-primary inline-flex">
                Candidater en doctorat
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>

            {/* Right — Écoles doctorales */}
            <div className="lg:w-1/2">
              <Accordion type="single" collapsible>
                {ecolesDoctorales.map((ed, i) => (
                  <AccordionItem
                    key={i}
                    value={`ed-${i}`}
                    className="re-doc-ecole border-b border-gray-200"
                  >
                    <AccordionTrigger className="py-5 text-left hover:no-underline [&[data-state=open]]:border-l-2 [&[data-state=open]]:border-gold [&[data-state=open]]:pl-4">
                      <div className="flex items-center justify-between w-full pr-4">
                        <span className="font-heading font-medium text-navy">
                          École doctorale {ed.name}
                        </span>
                        <Badge
                          variant="secondary"
                          className="shrink-0 ml-3 bg-navy/5 text-navy-light text-xs"
                        >
                          {ed.count}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 pl-4">
                      <p className="body-small text-gray-600 mb-3">
                        <span className="font-semibold">Directeur :</span> {ed.director}
                      </p>
                      <p className="body-small text-gray-500 mb-2">Sujets de thèse :</p>
                      <div className="flex flex-wrap gap-2">
                        {ed.topics.map((t) => (
                          <Badge
                            key={t}
                            variant="outline"
                            className="text-xs border-gray-300 text-gray-600"
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 7 — CTA PARTENARIATS                                 */}
      {/* ============================================================ */}
      <section className="bg-white py-16 md:py-20">
        <div className="re-cta-partner container-isl text-center max-w-2xl">
          <Users size={40} className="text-gold mx-auto mb-5" />
          <h2 className="heading-page text-navy mb-5">
            Vous souhaitez collaborer ?
          </h2>
          <p className="body-large text-gray-600 mb-8">
            Entreprises, institutions, fondations : découvrez nos opportunités de partenariat
            recherche, chaires, mécénat et CIFRE.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/entreprises" className="btn-primary">
              Devenir partenaire recherche
            </Link>
            <Link to="/contact" className="btn-outline-gold">
              Contacter la DRI
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
