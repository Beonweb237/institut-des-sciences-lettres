import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import CountUp from 'react-countup';
import {
  Globe,
  Plane,
  Clock,
  MapPin,
  Users,
  Mail,
  Phone,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────── Data ─────────────────────── */

const heroStats = [
  { value: 87, suffix: '', label: 'Nationalités' },
  { value: 32, suffix: '%', label: 'Étudiants internationaux' },
  { value: 180, suffix: '', label: 'Universités partenaires' },
  { value: 65, suffix: '', label: 'Pays' },
];

const englishPrograms = [
  {
    badge: 'MASTER OF SCIENCE',
    title: 'MSc in International Security & Defense Policy',
    meta: [
      { icon: Clock, text: '2 years' },
      { icon: MapPin, text: 'Paris' },
      { icon: Users, text: '40 students' },
    ],
    description: 'Analyze global security challenges, defense policy, and strategic studies through an interdisciplinary lens.',
  },
  {
    badge: 'MASTER OF SCIENCE',
    title: 'MSc in Data Science & Artificial Intelligence',
    meta: [
      { icon: Clock, text: '2 years' },
      { icon: MapPin, text: 'Paris' },
      { icon: Users, text: '60 students' },
    ],
    description: 'Machine learning, deep learning, NLP, and computer vision. Industry partnerships with Google and DeepMind.',
  },
  {
    badge: 'MBA',
    title: 'MBA Global Executive',
    meta: [
      { icon: Clock, text: '18 months' },
      { icon: MapPin, text: 'Paris & Online' },
      { icon: Users, text: '35 students' },
    ],
    description: 'Designed for senior professionals. International residencies in London, Singapore, and New York.',
  },
];

type ContinentKey = 'Europe' | 'Amériques' | 'Asie-Pacifique' | 'Afrique & Moyen-Orient';

const exchangeDestinations: Record<ContinentKey, Record<string, string[]>> = {
  Europe: {
    UK: ['London School of Economics', "King's College London", 'University of Edinburgh (10 places)'],
    Germany: ['Humboldt-Universität Berlin', 'LMU Munich', 'Freie Universität Berlin (15 places)'],
    Spain: ['Universidad Complutense Madrid', 'Universitat Pompeu Fabra (8 places)'],
    Italy: ['Bocconi Milan', 'Luiss Rome (6 places)'],
    Netherlands: ['University of Amsterdam', 'Leiden University (8 places)'],
    Switzerland: ['University of Geneva', 'ETH Zürich (5 places)'],
  },
  'Amériques': {
    USA: ['Harvard Kennedy School (5 places)', 'UC Berkeley (8 places)', 'Columbia University (6 places)', 'Georgetown University (5 places)'],
    Canada: ['McGill University Montreal (8 places)', 'University of Toronto (6 places)', 'UBC Vancouver (5 places)'],
    'Brésil': ['Universidade de São Paulo (6 places)', 'FGV Rio de Janeiro (4 places)'],
    Mexique: ['ITAM Mexico City (5 places)', 'Universidad Nacional Autónoma (4 places)'],
  },
  'Asie-Pacifique': {
    Japan: ['University of Tokyo (6 places)', 'Waseda University (5 places)', 'Keio University (4 places)'],
    China: ['Fudan University Shanghai (6 places)', 'Peking University (5 places)', 'Tsinghua University (4 places)'],
    'South Korea': ['Seoul National University (5 places)', 'KAIST Daejeon (4 places)', 'Yonsei University (4 places)'],
    Singapore: ['National University of Singapore (6 places)', 'Nanyang Technological University (4 places)'],
    Australia: ['University of Melbourne (5 places)', 'Australian National University (4 places)'],
    India: ['IIT Delhi (4 places)', 'IIM Ahmedabad (3 places)'],
  },
  'Afrique & Moyen-Orient': {
    Morocco: ['Université Mohammed VI (5 places)', 'Université Cadi Ayyad Marrakech (4 places)'],
    Tunisia: ['Université de Tunis El Manar (4 places)', 'ESSTED (3 places)'],
    Senegal: ['Université Cheikh Anta Diop (4 places)', 'Gaston Berger University (3 places)'],
    'Ivory Coast': ['Université Félix Houphouët-Boigny (3 places)'],
    Israel: ['Hebrew University of Jerusalem (4 places)', 'Tel Aviv University (3 places)'],
    'United Arab Emirates': ['UAE University Al Ain (3 places)', 'American University of Sharjah (3 places)'],
  },
};

const continents = Object.keys(exchangeDestinations) as ContinentKey[];

const applicationSteps = [
  {
    number: '01',
    title: 'Postulez en ligne',
    body: "Dossier en ligne : relevés de notes, CV, lettre de motivation, preuve de niveau d'anglais (TOEFL/IELTS).",
  },
  {
    number: '02',
    title: 'Recevez votre admission',
    body: 'Délai de réponse : 4-6 semaines. Lettre\'acceptation officielle pour votre demande de visa.',
  },
  {
    number: '03',
    title: 'Obtenez votre visa',
    body: "L'ISL vous accompagne dans la procédure Etudes en France. Dossier Campus France et visa long séjour.",
  },
  {
    number: '04',
    title: 'Intégration sur le campus',
    body: "Semaine d'accueil internationale, parrainage étudiant, visite du campus et inscription administrative.",
  },
];

const scholarships = [
  {
    amount: "Jusqu'à 10 000€/an",
    title: "Bourse d'Excellence ISL International",
    eligibility: 'Tous les programmes | Mérite académique',
    deadline: '15 février 2025',
    cta: true,
  },
  {
    amount: '1 181€/mois',
    title: "Bourse d'Excellence Eiffel",
    eligibility: 'Master & Doctorat | Candidature via\'ISL',
    deadline: 'À confirmer',
    cta: false,
  },
  {
    amount: 'Variable',
    title: 'Bourses gouvernementales',
    eligibility: 'Bourses Campus France, bilières pays (Brésil, Mexique, Inde, etc.)',
    deadline: 'Selon les programmes',
    cta: false,
  },
];

/* ─────────────────────── Component ─────────────────────── */

export default function International() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeContinent, setActiveContinent] = useState<ContinentKey>('Europe');

  useGSAP(
    () => {
      /* Hero */
      gsap.from('.intl-hero-content > *', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.2,
      });

      gsap.from('.intl-hero-stat', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.8,
      });

      /* Split section */
      gsap.from('.intl-split-left', {
        scrollTrigger: {
          trigger: '.intl-split-section',
          start: 'top 75%',
        },
        x: -60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.intl-split-right', {
        scrollTrigger: {
          trigger: '.intl-split-section',
          start: 'top 75%',
        },
        x: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      /* Programme cards */
      gsap.from('.programme-card', {
        scrollTrigger: {
          trigger: '.programmes-section',
          start: 'top 75%',
        },
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
      });

      /* Destinations */
      gsap.from('.destinations-content', {
        scrollTrigger: {
          trigger: '.destinations-section',
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
      });

      /* Steps */
      gsap.from('.step-card', {
        scrollTrigger: {
          trigger: '.steps-section',
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      });

      /* Scholarships */
      gsap.from('.bourse-card', {
        scrollTrigger: {
          trigger: '.bourses-section',
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      });

      /* CTA */
      gsap.from('.intl-cta-content', {
        scrollTrigger: {
          trigger: '.intl-cta-section',
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="min-h-[100dvh]">
      {/* ─────────── Section 1: Hero ─────────── */}
      <section className="relative min-h-[55vh] flex items-center justify-center bg-navy overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/international-map.jpg)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(10,22,40,0.92) 0%, rgba(30,58,95,0.85) 100%)',
          }}
        />
        <div className="relative z-10 container-isl text-center py-24">
          <div className="intl-hero-content">
            <nav aria-label="Breadcrumb" className="mb-4">
              <span className="text-sm text-white/60">
                Accueil / <span className="text-white">International</span>
              </span>
            </nav>
            <p className="section-label" style={{ color: '#C9A962' }}>
              ISL INTERNATIONAL
            </p>
            <div className="gold-divider mx-auto mb-6" />
            <h1 className="heading-hero text-white mb-4">Une école sans frontières</h1>
            <p className="body-large text-white/80 max-w-3xl mx-auto mb-10">
              87 nationalités sur le campus. 180 universités partenaires dans 65 pays. L&apos;ISL forme
              les citoyens du monde.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
            {heroStats.map((s) => (
              <div key={s.label} className="intl-hero-stat text-center">
                <div className="stat-number">
                  <CountUp end={s.value} duration={2} suffix={s.suffix} />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/60 mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Section 2: Split Incoming / Outgoing ─────────── */}
      <section className="intl-split-section">
        <div className="flex flex-col lg:flex-row">
          {/* Left — Incoming */}
          <div className="intl-split-left flex-1 bg-cream py-16 lg:py-20 px-8 lg:px-12">
            <Globe size={48} className="text-sky-blue mb-6" strokeWidth={1.5} />
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-sky-blue mb-4">
              VOUS ÊTES ÉTUDIANT INTERNATIONAL
            </p>
            <h2 className="heading-page text-navy mb-4">Étudier à l&apos;ISL</h2>
            <p className="body-large text-gray-600 mb-8">
              Programmes en anglais, accompagnement visa et logement, bourses d&apos;excellence
              internationales : l&apos;ISL vous accueille.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Programmes en anglais',
                'Guide du candidat international',
                'Bourses internationales',
                'Logement et vie à Paris',
                'Demande de visa',
              ].map((item) => (
                <li key={item}>
                  <button className="flex items-center gap-2 text-sm font-medium text-navy hover:text-gold transition-colors link-gold group">
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    {item}
                  </button>
                </li>
              ))}
            </ul>
            <Button className="btn-primary gap-2">
              <ExternalLink size={16} />
              Postuler en tant qu&apos;international
            </Button>
          </div>
          {/* Right — Outgoing */}
          <div className="intl-split-right flex-1 bg-navy py-16 lg:py-20 px-8 lg:px-12">
            <Plane size={48} className="text-gold mb-6" strokeWidth={1.5} />
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gold mb-4">
              VOUS ÊTES ÉTUDIANT ISL
            </p>
            <h2 className="heading-page text-white mb-4">Partir à l&apos;étranger</h2>
            <p className="body-large text-white/80 mb-8">
              Semestre d&apos;échange, double diplôme, stage international : 65 destinations vous
              attendent. L&apos;ISL finance votre mobilité.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Destinations d'échange",
                'Double diplômes',
                "Stages à l'international",
                'Bourses de mobilité',
                'Témoignages de retour',
              ].map((item) => (
                <li key={item}>
                  <button className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-gold transition-colors link-gold group">
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    {item}
                  </button>
                </li>
              ))}
            </ul>
            <Button className="btn-outline-gold gap-2">
              <ExternalLink size={16} />
              Découvrir les destinations
            </Button>
          </div>
        </div>
      </section>

      {/* ─────────── Section 3: Programmes en Anglais ─────────── */}
      <section className="bg-white section-padding-lg programmes-section">
        <div className="container-isl">
          <p className="section-label">PROGRAMMES EN ANGLAIS</p>
          <div className="gold-divider mb-6" />
          <h2 className="heading-section text-navy mb-12">Formations entièrement en anglais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {englishPrograms.map((prog) => (
              <Card
                key={prog.title}
                className="programme-card formation-card border-0 shadow-isl overflow-hidden"
              >
                <div className="relative">
                  <div className="h-2 bg-sky-blue" />
                  <Badge className="absolute top-4 left-4 bg-sky-blue text-white border-0">
                    {prog.badge}
                  </Badge>
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-medium text-lg text-navy mb-3">{prog.title}</h3>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {prog.meta.map((m) => (
                      <span key={m.text} className="flex items-center gap-1 text-xs text-gray-500">
                        <m.icon size={14} />
                        {m.text}
                      </span>
                    ))}
                  </div>
                  <p className="body-small text-gray-600 mb-4">{prog.description}</p>
                  <Badge
                    variant="outline"
                    className="text-emerald border-emerald bg-emerald/10 mb-4"
                  >
                    100% English
                  </Badge>
                  <div>
                    <button className="text-sm font-medium text-navy hover:text-gold transition-colors link-gold">
                      Learn more →
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Section 4: Destinations d'Échange ─────────── */}
      <section className="bg-cream py-20 lg:py-24 destinations-section">
        <div className="container-isl">
          <p className="section-label">MOBILITÉ</p>
          <div className="gold-divider mb-6" />
          <h2 className="heading-page text-navy mb-8">180 destinations dans le monde</h2>

          {/* Map visual */}
          <div className="mb-10 rounded overflow-hidden shadow-isl">
            <img
              src="/international-map.jpg"
              alt="Carte des partenaires internationaux de l'ISL"
              className="w-full object-cover max-h-[400px]"
              loading="lazy"
            />
          </div>

          {/* Region tabs */}
          <div className="destinations-content">
            <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4">
              {continents.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveContinent(c)}
                  className={`px-5 py-2 text-sm font-medium transition-all duration-300 border-b-2 -mb-[17px] ${
                    activeContinent === c
                      ? 'border-gold text-navy'
                      : 'border-transparent text-gray-500 hover:text-navy'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {Object.entries(exchangeDestinations[activeContinent]).map(([country, universities]) => (
                <div key={country}>
                  <h4 className="font-heading font-medium text-lg text-navy mb-3">{country}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {universities.map((uni) => (
                      <div
                        key={uni}
                        className="flex items-center justify-between p-3 bg-white rounded hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-sm text-gray-700">{uni}</span>
                        <CheckCircle2 size={16} className="text-emerald flex-shrink-0 ml-3" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── Section 5: Guide Candidat International ─────────── */}
      <section className="bg-navy py-20 lg:py-24 steps-section">
        <div className="container-isl">
          <p className="section-label" style={{ color: '#C9A962' }}>
            CANDIDATURE
          </p>
          <div className="gold-divider mb-6" />
          <h2 className="heading-page text-white mb-10">Votre arrivée à l&apos;ISL</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {applicationSteps.map((step) => (
              <div
                key={step.number}
                className="step-card bg-navy-light p-8 rounded"
                style={{ borderRadius: '4px' }}
              >
                <div className="stat-number text-gold mb-3">{step.number}</div>
                <h3 className="font-heading font-medium text-lg text-white mb-3">{step.title}</h3>
                <p className="body-small text-white/70">{step.body}</p>
              </div>
            ))}
          </div>

          {/* Visa & accommodation support */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-navy-light p-8 rounded" style={{ borderRadius: '4px' }}>
              <h3 className="font-heading font-medium text-xl text-white mb-3">
                Accompagnement visa
              </h3>
              <p className="body-regular text-white/70 mb-4">
                Notre Bureau des Relations Internationales vous guide à chaque étape : constitution du
                dossier Campus France, rendez-vous consulaire, assurances obligatoires et titre de
                séjour.
              </p>
              <ul className="space-y-2">
                {[
                  "Procédure Etudes en France étape par étape",
                  'Préparation aux entretiens consulaires',
                  'Assurance santé et responsabilité civile',
                  "Accompagnement renouvellement titre de séjour",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/60">
                    <CheckCircle2 size={14} className="text-gold flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-navy-light p-8 rounded" style={{ borderRadius: '4px' }}
            >
              <h3 className="font-heading font-medium text-xl text-white mb-3">
                Logement étudiant
              </h3>
              <p className="body-regular text-white/70 mb-4">
                L&apos;ISL vous propose plusieurs solutions d&apos;hébergement : résidences
                universitaires sur le campus, colocations, et programme de familles d&apos;accueil
                pour les primo-arrivants.
              </p>
              <ul className="space-y-2">
                {[
                  'Résidences ISL prioritaires pour les internationaux',
                  'Plateforme logement avec annonces vérifiées',
                  'Programme famille d\'accueil (1er semestre)',
                  'Bureau logement dédié aux mobilités internationales',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/60">
                    <CheckCircle2 size={14} className="text-gold flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── Section 6: Bourses Internationales ─────────── */}
      <section className="bg-white py-20 lg:py-24 bourses-section">
        <div className="container-isl">
          <p className="section-label">FINANCEMENT</p>
          <div className="gold-divider mb-6" />
          <h2 className="heading-page text-navy mb-10">
            Bourses pour étudiants internationaux
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scholarships.map((b) => (
              <Card
                key={b.title}
                className="bourse-card bg-cream border-0 shadow-none p-8"
                style={{ borderTop: '3px solid #C9A962', borderRadius: '4px' }}
              >
                <div className="stat-number text-gold mb-2">{b.amount}</div>
                <h3 className="font-heading font-medium text-lg text-navy mb-2">{b.title}</h3>
                <p className="body-small text-gray-600 mb-1">{b.eligibility}</p>
                <p className="text-sm text-gray-500 mb-4">Date limite : {b.deadline}</p>
                {b.cta && (
                  <button className="text-sm font-medium text-navy hover:text-gold transition-colors link-gold">
                    Postuler →
                  </button>
                )}
              </Card>
            ))}
          </div>

          {/* Erasmus+ info */}
          <div className="mt-12 bg-cream p-8 rounded flex flex-col md:flex-row gap-6 items-start" style={{ borderRadius: '4px' }}>
            <div className="flex-1">
              <h3 className="font-heading font-medium text-xl text-navy mb-2">
                Programme Erasmus+
              </h3>
              <p className="body-regular text-gray-600">
                Échanges universitaires en Europe avec bourse mensuelle de 150 à 300€ selon la
                destination. Stages Erasmus+ également disponibles dans plus de 40 pays européens.
              </p>
            </div>
            <Badge className="bg-gold text-navy border-0 text-sm px-4 py-2">150–300€/mois</Badge>
          </div>
        </div>
      </section>

      {/* ─────────── Section 7: CTA Contact ─────────── */}
      <section className="bg-cream py-16 intl-cta-section">
        <div className="container-isl">
          <div className="intl-cta-content max-w-[700px] mx-auto text-center">
            <h2 className="heading-page text-navy mb-8">Une question sur l&apos;international ?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="p-6 border-0 shadow-isl text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center">
                    <Mail size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-medium text-navy text-sm">Bureau des Relations Internationales</p>
                    <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                      <Mail size={14} /> international@isl.fr
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Phone size={14} /> +33 1 44 39 73 00
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 border-0 shadow-isl text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center">
                    <Users size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-medium text-navy text-sm">Ambassadeurs étudiants</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Contactez un étudiant de votre pays
                    </p>
                    <button className="text-sm font-medium text-gold hover:text-gold-light transition-colors mt-2 link-gold">
                      Voir les ambassadeurs →
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
