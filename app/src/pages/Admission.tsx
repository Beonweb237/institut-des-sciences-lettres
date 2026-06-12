import { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  GraduationCap,
  RotateCcw,
  Globe,
  Briefcase,
  Search,
  FileText,
  Send,
  Users,
  CheckCircle,
  Flag,
  Info,
  Clock,
  MapPin,
  Calendar,
  TrendingUp,
  ChevronRight,
  Check,
  Clock3,
  Lock,
} from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const profils = [
  {
    icon: GraduationCap,
    title: 'Lycéen / Bachelier',
    body: "Vous préparez votre baccalauréat ou l'avez obtenu récemment. Découvrez nos Licences et cycles préparatoires.",
    cta: 'Voir les admissions Licence',
    link: '/formations',
  },
  {
    icon: RotateCcw,
    title: 'Étudiant en réorientation',
    body: "Vous êtes déjà inscrit dans le supérieur et souhaitez changer d'orientation. Toutes nos formations sont ouvertes.",
    cta: 'Voir les admissions',
    link: '/formations',
  },
  {
    icon: Globe,
    title: 'Candidat international',
    body: 'Vous résidez hors de France ou êtes de nationalité étrangère. Guide spécifique visa, logement et équivalences.',
    cta: 'Guide candidat international',
    link: '/international',
  },
  {
    icon: Briefcase,
    title: 'Professionnel en reconversion',
    body: 'Vous souhaitez évoluer dans votre carrière ou vous reconvertir. Découvrez nos MBA et formations continues.',
    cta: 'Voir le portail Executive',
    link: '/formations',
  },
];

const timelineSteps = [
  {
    icon: Search,
    title: 'Explorer nos programmes',
    desc: "Consultez notre catalogue, participez aux JPO, téléchargez les brochures",
    duree: '1-3 mois avant',
  },
  {
    icon: FileText,
    title: 'Constituer votre dossier',
    desc: "Relevés de notes, lettre de motivation, CV, lettres de recommandation",
    duree: '2-4 semaines',
  },
  {
    icon: Send,
    title: 'Déposer votre candidature',
    desc: "En ligne via notre portail candidat. Suivi en temps réel",
    duree: '30 min',
  },
  {
    icon: Users,
    title: "Passer l'entretien",
    desc: "Entretien de motivation avec un jury pédagogique (30-45 min)",
    duree: '1-2 semaines après',
  },
  {
    icon: CheckCircle,
    title: 'Recevoir votre résultat',
    desc: "Décision par email + accès à votre espace candidat",
    duree: '2-4 semaines après',
  },
  {
    icon: Flag,
    title: 'Confirmer votre place',
    desc: "Versement de l'acompte + inscription administrative",
    duree: 'Avant la date limite',
  },
];

const datesAdmissions = [
  { date: '01 DÉC 2024', event: 'Ouverture des candidatures', statut: 'ouvert' },
  { date: '15 FÉV 2025', event: 'Date limite de dépôt', statut: 'avenir' },
  { date: '01-15 MARS', event: 'Entretiens de motivation', statut: 'avenir' },
  { date: '30 AVRIL', event: 'Résultats admission', statut: 'avenir' },
  { date: '15 MAI', event: 'Confirmation + acompte', statut: 'avenir' },
];

const fraisScolarite = [
  { programme: 'Licence', duree: '3 ans', frais: '170€ (tarif DFFT)', total: '510€' },
  { programme: 'Master', duree: '2 ans', frais: '243€ (tarif DFFT)', total: '486€' },
  { programme: 'Master (écoles)', duree: '2 ans', frais: '13 500€', total: '27 000€' },
  { programme: 'MBA', duree: '1 an', frais: '28 000€', total: '28 000€' },
  { programme: 'Formation Exécutive', duree: 'Variable', frais: 'Sur demande', total: '—' },
];

const bourses = [
  {
    badge: "JUSQU'À 100%",
    badgeColor: 'bg-emerald text-white',
    title: "Bourse d'Excellence ISL",
    body: "Attribuée sur critères académiques et sociaux. Couvre jusqu'à 100% des frais de scolarité.",
    cta: 'En savoir plus',
  },
  {
    badge: "BOURSE D'ÉTAT",
    badgeColor: 'bg-sky-blue text-white',
    title: 'Bourse sur critères sociaux (CROUS)',
    body: "Attribution selon les échelons du CROUS. Complément possible par l'ISL.",
    cta: 'Simuler ma bourse CROUS',
  },
  {
    badge: 'PLURALITÉ',
    badgeColor: 'bg-amber-energy text-white',
    title: 'Bourses régionales et partenariats',
    body: 'Île-de-France, régions, fondations entreprise (BNP Paribas, L\'Oréal).',
    cta: 'Voir toutes les bourses',
  },
];

const faqItems = [
  {
    q: 'Quelles sont les dates limites de candidature ?',
    a: "Les dates limites varient selon le programme. Pour les admissions parallèle (Grandes Écoles), la date limite est le 15 février 2025. Pour les Licences via Parcoursup, la date limite est le 2 avril 2025. Les Masters sélectifs ont des dates décalées jusqu'au 30 avril 2025.",
  },
  {
    q: 'Quels documents sont demandés dans le dossier ?',
    a: "Le dossier comprend : relevés de notes des deux dernières années, lettre de motivation (500 mots), CV détaillé, deux lettres de recommandation, copie du diplôme le plus élevé obtenu et justificatif d'identité. Les candidats internationaux doivent ajouter une attestation de niveau français (TCF/TEF/DALF).",
  },
  {
    q: "Comment se déroule l'entretien de motivation ?",
    a: "L'entretien de motivation dure 30 à 45 minutes et se déroule devant un jury de 2 à 3 personnes (enseignant-chercheur, administratif et éventuellement un professionnel). Le jury évalue votre projet professionnel, votre connaissance de l'ISL et votre motivation. L'entretien peut se faire en présentiel ou à distance.",
  },
  {
    q: "Puis-je candidater si je réside à l'étranger ?",
    a: "Oui, l'ISL accueille chaque année plus de 500 étudiants internationaux. Vous devez suivre la même procédure de candidature et compléter par une demande de visa étudiant après acceptation. Notre bureau international vous accompagne dans toutes les démarches administratives.",
  },
  {
    q: 'Les frais de scolarité sont-ils remboursables ?',
    a: "L'acompte de confirmation (10% des frais de scolarité) n'est pas remboursable en cas de désistement. En cas de refus de visa pour les étudiants internationaux, l'acompte est remboursé sur présentation du refus consulaire. Les frais de scolarité peuvent être étalés en 3 mensualités.",
  },
  {
    q: 'Existe-t-il des aides au logement ?',
    a: "Oui, l'ISL dispose de 400 places en résidence universitaire sur le campus. Les étudiants boursiers sont prioritaires. Pour les autres, notre service logement vous accompagne dans la recherche d'un logement en cité universitaire CROUS, en résidence privée ou en colocation.",
  },
  {
    q: 'Puis-je effectuer ma formation en alternance ?',
    a: "De nombreux Masters et la Formation Exécutive proposent des parcours en alternance (contrat pro ou apprentissage). Vous devez trouver une entreprise d'accueil avant la rentrée. Notre bureau des stages et relations entreprises vous accompagne dans cette démarche.",
  },
  {
    q: "Comment suivre l'avancement de ma candidature ?",
    a: "Dès la création de votre compte sur notre portail candidat, vous pouvez suivre l'avancement de votre dossier en temps réel. Chaque étape est notifiée par email : réception du dossier, dossier complet, convocation à l'entretien, décision finale.",
  },
];

const niveaux = [
  'Terminale',
  'BTS/DUT',
  'Licence 1',
  'Licence 2',
  'Licence 3',
  'Master 1',
  'Autre',
];

const filieres = [
  'Générale (L/ES/S)',
  'STI2D',
  'STMG',
  'BTS',
  'DUT',
  'Licence Scientifique',
  'Licence Droit',
  'Licence Lettres',
  'Autre',
];

const programmesVises = ['Licence', 'Master', 'MBA', 'Formation Exécutive'];

/* ------------------------------------------------------------------ */
/*  Helper: Status Icon                                                */
/* ------------------------------------------------------------------ */

function StatusIcon({ statut }: { statut: string }) {
  if (statut === 'ouvert')
    return <Check size={16} className="text-emerald shrink-0" />;
  if (statut === 'avenir')
    return <Clock3 size={16} className="text-amber-energy shrink-0" />;
  return <Lock size={16} className="text-gray-300 shrink-0" />;
}

/* ------------------------------------------------------------------ */
/*  Admission Page Component                                           */
/* ------------------------------------------------------------------ */

export default function Admission() {
  const containerRef = useRef<HTMLDivElement>(null);

  /* simulator state */
  const [simStep, setSimStep] = useState(0);
  const [niveau, setNiveau] = useState('');
  const [filiere, setFiliere] = useState('');
  const [moyenne, setMoyenne] = useState([14]);
  const [programmes, setProgrammes] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  /* timeline refs */
  const timelineRef = useRef<HTMLDivElement>(null);

  /* JPO scroll ref */
  const jpoRef = useRef<HTMLDivElement>(null);

  const runSimulator = useCallback(() => {
    let base = 50;
    if (moyenne[0] >= 16) base += 30;
    else if (moyenne[0] >= 14) base += 20;
    else if (moyenne[0] >= 12) base += 10;
    else if (moyenne[0] >= 10) base += 0;
    else base -= 20;

    if (programmes.includes('Licence')) base += 5;
    if (programmes.includes('Master')) base += 5;
    if (niveau === 'Terminale' && programmes.includes('Licence')) base += 5;
    if (niveau === 'Licence 3' && programmes.includes('Master')) base += 5;

    base = Math.min(98, Math.max(15, base));
    setScore(base);
    setShowResult(true);
  }, [moyenne, programmes, niveau]);

  /* GSAP Scroll Animations */
  useGSAP(
    () => {
      if (!containerRef.current) return;

      /* Hero fade-up */
      gsap.from('.ad-hero > *', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
      });

      /* Profile cards scale-in */
      gsap.from('.ad-profil-card', {
        scrollTrigger: {
          trigger: '.ad-profil-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        scale: 0.95,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.2)',
      });

      /* Timeline steps */
      gsap.from('.ad-timeline-step', {
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: 'power3.out',
      });

      /* Dates table rows */
      gsap.from('.ad-date-row', {
        scrollTrigger: {
          trigger: '.ad-dates-table',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      });

      /* Parcoursup card */
      gsap.from('.ad-parcoursup-card', {
        scrollTrigger: {
          trigger: '.ad-parcoursup-card',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        x: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      /* Simulator */
      gsap.from('.ad-simulator-card', {
        scrollTrigger: {
          trigger: '.ad-simulator-card',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      /* Fees */
      gsap.from('.ad-fees-table', {
        scrollTrigger: {
          trigger: '.ad-fees-table',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
      });

      gsap.from('.ad-bourse-card', {
        scrollTrigger: {
          trigger: '.ad-bourse-card',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      });

      /* JPO */
      gsap.from('.ad-jpo-left', {
        scrollTrigger: {
          trigger: jpoRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.ad-jpo-right', {
        scrollTrigger: {
          trigger: jpoRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      });

      /* FAQ */
      gsap.from('.ad-faq-item', {
        scrollTrigger: {
          trigger: '.ad-faq',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
      });

      /* CTA */
      gsap.from('.ad-cta-final', {
        scrollTrigger: {
          trigger: '.ad-cta-final',
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

  /* Simulator progress */
  const simProgress = (() => {
    let filled = 0;
    if (niveau) filled += 1;
    if (filiere) filled += 1;
    if (moyenne[0] > 8) filled += 1;
    if (programmes.length > 0) filled += 1;
    return (filled / 4) * 100;
  })();

  return (
    <div ref={containerRef}>
      {/* ============================================================ */}
      {/* SECTION 1 — HERO                                             */}
      {/* ============================================================ */}
      <section
        className="relative flex items-center justify-center min-h-[55vh]"
        style={{
          background:
            'linear-gradient(135deg, rgba(10,22,40,0.93) 0%, rgba(30,58,95,0.88) 100%), url(/campus-garden.jpg) center/cover no-repeat',
        }}
      >
        <div className="ad-hero container-isl text-center pt-32 pb-16">
          <p className="body-small text-white/60 mb-4">Accueil / Admission</p>
          <p className="section-label !text-gold">RENTÉE 2025-2026</p>
          <div className="gold-divider mx-auto mb-6" />
          <h1 className="heading-hero text-white mb-6">Candidater à l'ISL</h1>
          <p className="body-large text-white/80 max-w-2xl mx-auto">
            De l'exploration de nos programmes à la confirmation de votre admission, nous vous
            accompagnons à chaque étape du processus.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — PROFIL SELECTOR                                  */}
      {/* ============================================================ */}
      <section id="profil" className="bg-white py-12">
        <div className="container-isl">
          <h2 className="heading-subsection text-navy text-center mb-10">
            Quel candidat êtes-vous ?
          </h2>
          <div className="ad-profil-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {profils.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className="ad-profil-card group bg-white border-2 border-gray-200 rounded p-8 text-center transition-all duration-300 hover:border-gold hover:-translate-y-1 hover:shadow-isl-lg cursor-pointer"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-5">
                    <Icon size={48} className="text-gold" />
                  </div>
                  <h3 className="font-heading font-medium text-lg text-navy mb-3">
                    {p.title}
                  </h3>
                  <p className="body-small text-gray-600 mb-5">{p.body}</p>
                  <Link
                    to={p.link}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-gold hover:text-gold-light transition-colors"
                  >
                    {p.cta}
                    <ChevronRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — TIMELINE                                         */}
      {/* ============================================================ */}
      <section id="processus" className="bg-cream section-padding">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label text-center">PROCESSUS</p>
          <div className="gold-divider mx-auto mb-6" />
          <h2 className="heading-section text-navy text-center mb-16">
            Votre parcours vers l'ISL
          </h2>

          <div ref={timelineRef} className="relative">
            {/* Vertical line */}
            <div
              className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[3px] bg-gray-200 -translate-x-1/2"
            />
            <div className="md:hidden absolute left-4 top-0 bottom-0 w-[3px] bg-gray-200" />

            {timelineSteps.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`ad-timeline-step relative flex items-start mb-12 last:mb-0 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Node */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                    <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
                      <span className="text-navy text-xs font-bold">{i + 1}</span>
                    </div>
                  </div>
                  <div className="md:hidden absolute left-4 -translate-x-1/2 z-10">
                    <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
                      <span className="text-navy text-xs font-bold">{i + 1}</span>
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`ml-12 md:ml-0 md:w-[45%] ${
                      isLeft ? 'md:pr-12' : 'md:pl-12'
                    }`}
                  >
                    <div className="bg-white p-6 rounded shadow-isl">
                      <div className="flex items-center gap-3 mb-3">
                        <Icon size={20} className="text-gold" />
                        <h3 className="font-heading font-medium text-lg text-navy">
                          {step.title}
                        </h3>
                      </div>
                      <p className="body-regular text-gray-600 mb-3">{step.desc}</p>
                      <span className="inline-block text-xs font-semibold uppercase tracking-[0.08em] text-gray-500 bg-cream px-3 py-1 rounded">
                        {step.duree}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — DATES CLÉS                                       */}
      {/* ============================================================ */}
      <section id="calendrier" className="bg-white section-padding">
        <div className="container-isl">
          <p className="section-label">DATES CLÉS</p>
          <div className="gold-divider mb-6" />
          <h2 className="heading-page text-navy mb-12">
            Calendrier d'admission 2025-2026
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left — Admissions parallèle */}
            <div>
              <h3 className="font-heading font-medium text-xl text-navy mb-6">
                Admissions parallèle (Grandes Écoles)
              </h3>
              <div className="ad-dates-table overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">
                        Date
                      </th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">
                        Événement
                      </th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">
                        Statut
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {datesAdmissions.map((d, i) => (
                      <tr
                        key={i}
                        className="ad-date-row border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-2 font-semibold text-navy whitespace-nowrap">
                          {d.date}
                        </td>
                        <td className="py-4 px-2 text-gray-600">{d.event}</td>
                        <td className="py-4 px-2">
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium">
                            <StatusIcon statut={d.statut} />
                            {d.statut === 'ouvert' ? 'Ouvert' : 'À venir'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right — Parcoursup */}
            <div className="ad-parcoursup-card bg-sky-blue/5 border border-sky-blue rounded p-6">
              <div className="flex items-center gap-2 mb-4">
                <Info size={20} className="text-sky-blue" />
                <h3 className="font-heading font-medium text-xl text-navy">
                  Licences — Via Parcoursup
                </h3>
              </div>
              <p className="body-regular text-gray-600 mb-5">
                Les admissions en Licence se font via la plateforme Parcoursup. L'ISL propose
                12 licences sélectives. Découvrez nos vœux et attendus.
              </p>
              <div className="flex flex-wrap gap-4 mb-5 text-sm text-gray-600">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={14} className="text-sky-blue" />
                  Ouverture : 18 janvier 2025
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={14} className="text-sky-blue" />
                  Date limite : 2 avril 2025
                </span>
              </div>
              <a
                href="https://www.parcoursup.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-sky-blue hover:underline"
              >
                Accéder à Parcoursup
                <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5 — SIMULATEUR                                       */}
      {/* ============================================================ */}
      <section
        id="simulateur"
        className="bg-navy section-padding"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label !text-gold text-center">SIMULATEUR</p>
          <div className="gold-divider mx-auto mb-6" />
          <h2 className="heading-section text-white text-center mb-4">
            Testez votre admissibilité
          </h2>
          <p className="body-large text-white/80 text-center max-w-2xl mx-auto mb-12">
            Répondez à quelques questions sur votre profil académique. Notre simulateur évalue vos
            chances d'admission et vous recommande les programmes les plus adaptés.
          </p>

          <div className="ad-simulator-card bg-white rounded p-8 md:p-12">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Progression</span>
                <span>{Math.round(simProgress)}%</span>
              </div>
              <Progress value={simProgress} className="h-2 bg-gray-100" />
            </div>

            {/* Step 1 — Niveau */}
            <div className="mb-8">
              <h3 className="font-heading font-medium text-lg text-navy mb-4">
                1. Quel est votre niveau d'études actuel ?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {niveaux.map((n) => (
                  <button
                    key={n}
                    onClick={() => {
                      setNiveau(n);
                      setSimStep(Math.max(simStep, 1));
                    }}
                    className={`px-4 py-3 text-sm font-medium border-2 rounded transition-all ${
                      niveau === n
                        ? 'border-gold bg-gold/10 text-navy'
                        : 'border-gray-200 text-gray-600 hover:border-gold/50'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 — Filière */}
            <div className="mb-8">
              <h3 className="font-heading font-medium text-lg text-navy mb-4">
                2. Dans quelle filière ?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {filieres.map((f) => (
                  <button
                    key={f}
                    onClick={() => {
                      setFiliere(f);
                      setSimStep(Math.max(simStep, 2));
                    }}
                    className={`px-4 py-3 text-sm font-medium border-2 rounded transition-all ${
                      filiere === f
                        ? 'border-gold bg-gold/10 text-navy'
                        : 'border-gray-200 text-gray-600 hover:border-gold/50'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3 — Moyenne */}
            <div className="mb-8">
              <h3 className="font-heading font-medium text-lg text-navy mb-4">
                3. Quelle est votre moyenne générale ?
              </h3>
              <div className="px-2">
                <Slider
                  value={moyenne}
                  onValueChange={(v) => {
                    setMoyenne(v);
                    setSimStep(Math.max(simStep, 3));
                  }}
                  min={8}
                  max={20}
                  step={0.5}
                  className="mb-4"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">8</span>
                  <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1 bg-gold text-navy text-sm font-bold rounded-full">
                    {moyenne[0]}
                  </span>
                  <span className="text-sm text-gray-500">20</span>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                  <span>10 (Passable)</span>
                  <span>12 (Assez Bien)</span>
                  <span>14 (Bien)</span>
                  <span>16 (Très Bien)</span>
                </div>
              </div>
            </div>

            {/* Step 4 — Programme */}
            <div className="mb-8">
              <h3 className="font-heading font-medium text-lg text-navy mb-4">
                4. Quel type de programme vous intéresse ?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {programmesVises.map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setProgrammes((prev) =>
                        prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
                      );
                      setSimStep(Math.max(simStep, 4));
                    }}
                    className={`px-4 py-3 text-sm font-medium border-2 rounded transition-all ${
                      programmes.includes(p)
                        ? 'border-gold bg-gold/10 text-navy'
                        : 'border-gray-200 text-gray-600 hover:border-gold/50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={runSimulator}
              disabled={!niveau || !filiere || programmes.length === 0}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <TrendingUp size={18} className="mr-2" />
              Évaluer mon profil
            </button>

            {/* Result Panel */}
            {showResult && (
              <div className="mt-10 border-t border-gray-200 pt-10 animate-fade-up">
                <div className="flex flex-col md:flex-row items-center gap-10">
                  {/* Score ring */}
                  <div className="shrink-0 flex flex-col items-center">
                    <div className="relative w-36 h-36">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="#E5E7EB"
                          strokeWidth="6"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="#C9A962"
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeDasharray={`${(score / 100) * 264} 264`}
                          className="transition-all duration-1500"
                          style={{ transition: 'stroke-dasharray 1.5s ease-out' }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-heading font-bold text-3xl text-navy">
                          {score}%
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 text-center">
                      Probabilité d'admission
                    </p>
                  </div>

                  {/* Recommendations */}
                  <div className="flex-1 w-full">
                    <h4 className="font-heading font-medium text-lg text-navy mb-4">
                      Programmes recommandés
                    </h4>
                    <div className="space-y-3 mb-6">
                      {programmes.slice(0, 3).map((p) => {
                        const matchPct = Math.min(
                          98,
                          score + (p === 'Licence' ? 5 : p === 'Master' ? 3 : 0)
                        );
                        return (
                          <div
                            key={p}
                            className="flex items-center justify-between bg-cream rounded px-4 py-3"
                          >
                            <span className="font-medium text-navy">{p}</span>
                            <div className="flex items-center gap-3">
                              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gold rounded-full transition-all duration-1000"
                                  style={{ width: `${matchPct}%` }}
                                />
                              </div>
                              <span className="text-sm font-semibold text-navy w-12 text-right">
                                {matchPct}%
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="bg-cream rounded p-4 mb-5">
                      <p className="body-small text-gray-600">
                        {score >= 80
                          ? "Excellent profil ! Vos résultats académiques et votre projet sont très alignés avec les attentes de l'ISL. Nous vous encourageons vivement à candidater."
                          : score >= 60
                          ? "Bon profil candidat. Votre dossier présente des atouts solides. Pour renforcer votre candidature, nous vous recommandons de mettre en valeur votre projet professionnel dans votre lettre de motivation."
                          : "Votre profil présente un potentiel. Nous vous invitons à prendre contact avec notre équipe admissions pour un accompagnement personnalisé et des conseils pour renforcer votre dossier."}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link to="/espace-etudiant" className="btn-primary text-center">
                        Candidater maintenant
                      </Link>
                      <Link
                        to="/contact"
                        className="btn-outline-gold text-center"
                      >
                        Nous contacter
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 6 — FRAIS & BOURSES                                  */}
      {/* ============================================================ */}
      <section id="frais" className="bg-cream section-padding">
        <div className="container-isl">
          <p className="section-label">FINANCEMENT</p>
          <div className="gold-divider mb-6" />
          <h2 className="heading-page text-navy mb-10">
            Frais de scolarité et bourses
          </h2>

          {/* Fees table */}
          <div className="ad-fees-table overflow-x-auto mb-12">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-navy/10">
                  <th className="text-left py-4 px-4 font-heading font-medium text-navy">
                    Programme
                  </th>
                  <th className="text-left py-4 px-4 font-heading font-medium text-navy">
                    Durée
                  </th>
                  <th className="text-left py-4 px-4 font-heading font-medium text-navy">
                    Frais annuels
                  </th>
                  <th className="text-left py-4 px-4 font-heading font-medium text-navy">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {fraisScolarite.map((f, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-200 hover:bg-white/60 transition-colors"
                  >
                    <td className="py-4 px-4 font-medium text-navy">{f.programme}</td>
                    <td className="py-4 px-4 text-gray-600">{f.duree}</td>
                    <td className="py-4 px-4 text-gray-600">{f.frais}</td>
                    <td className="py-4 px-4 font-semibold text-navy">{f.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="body-small text-gray-500 mb-12">
            Tarifs DFFT = Droit de Formation et de Formation Technique (tarif ministériel). Tarifs
            écoles = formations sélectives avec frais de scolarité spécifiques.
          </p>

          {/* Bourses */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bourses.map((b, i) => (
              <div
                key={i}
                className="ad-bourse-card bg-white rounded p-6 border-l-4 border-gold shadow-isl transition-all duration-300 hover:-translate-y-1 hover:shadow-isl-lg"
              >
                <span
                  className={`inline-block px-3 py-1 text-xs font-semibold text-white rounded-full mb-4 ${b.badgeColor}`}
                >
                  {b.badge}
                </span>
                <h3 className="font-heading font-medium text-lg text-navy mb-3">
                  {b.title}
                </h3>
                <p className="body-small text-gray-600 mb-4">{b.body}</p>
                <button className="inline-flex items-center gap-1 text-sm font-semibold text-gold hover:text-gold-light transition-colors">
                  {b.cta}
                  <ChevronRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 7 — JPO                                              */}
      {/* ============================================================ */}
      <section id="jpo" className="bg-white section-padding" ref={jpoRef}>
        <div className="container-isl">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left */}
            <div className="ad-jpo-left lg:w-[55%]">
              <p className="section-label">JOURNÉES PORTES OUVERTES</p>
              <div className="gold-divider mb-6" />
              <h2 className="heading-page text-navy mb-8">Venez nous rencontrer</h2>

              <div className="bg-cream rounded p-8 border-l-4 border-gold mb-8">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="stat-number text-gold">15 &amp; 16</span>
                  <span className="section-label !mb-0">MARS 2025</span>
                </div>
                <div className="space-y-3 mb-5">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock size={18} className="text-gold shrink-0" />
                    <span>9h00 — 18h00</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin size={18} className="text-gold shrink-0" />
                    <span>17 rue de l'Université, 75007 Paris</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Users size={18} className="text-gold shrink-0" />
                    <span>Visites guidées toutes les 30 min</span>
                  </div>
                </div>
                <p className="body-regular text-gray-600">
                  Conférences sur les formations, ateliers de découverte, rencontres avec les
                  équipes pédagogiques, visites des laboratoires et du campus.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/espace-etudiant" className="btn-primary text-center">
                  S'inscrire aux JPO
                </Link>
                <button className="btn-outline-gold">Ajouter à mon calendrier</button>
              </div>
            </div>

            {/* Right */}
            <div className="ad-jpo-right lg:w-[45%] relative">
              <img
                src="/campus-modern-building.jpg"
                alt="Campus ISL — Bâtiment moderne"
                className="w-full h-full object-cover rounded min-h-[400px]"
                loading="lazy"
              />
              {/* Map overlay */}
              <div className="absolute bottom-4 right-4 w-48 h-32 bg-navy/90 rounded p-2 shadow-lg">
                <div className="w-full h-full bg-navy-light rounded flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={20} className="text-gold mx-auto mb-1" />
                    <p className="text-[10px] text-white/80">75007 Paris</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 8 — FAQ                                              */}
      {/* ============================================================ */}
      <section className="bg-cream section-padding">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label text-center">FAQ</p>
          <div className="gold-divider mx-auto mb-6" />
          <h2 className="heading-page text-navy text-center mb-10">
            Questions fréquentes
          </h2>

          <Accordion type="single" collapsible className="ad-faq">
            {faqItems.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="ad-faq-item border-b border-gray-200"
              >
                <AccordionTrigger className="text-navy hover:text-navy-light py-5 text-left font-heading font-medium text-base hover:no-underline [&[data-state=open]]:border-l-2 [&[data-state=open]]:border-gold [&[data-state=open]]:pl-4">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 body-regular pb-5 pl-4">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 9 — CTA FINAL                                        */}
      {/* ============================================================ */}
      <section className="bg-navy py-16 md:py-20">
        <div className="ad-cta-final container-isl text-center max-w-2xl">
          <h2 className="heading-section text-white mb-5">Prêt à vous lancer ?</h2>
          <p className="body-large text-white/80 mb-8">
            Les candidatures sont ouvertes. Notre équipe vous accompagne de A à Z.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/espace-etudiant" className="btn-primary">
              Candidater maintenant
            </Link>
            <Link to="/contact" className="btn-outline-light">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
