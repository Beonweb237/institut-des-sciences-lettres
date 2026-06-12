import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  MapPin,
  Users,
  TrendingUp,
  X,
  Calculator,
  Calendar,
  MessageCircle,
  Search,
  ChevronDown,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

interface Formation {
  id: number;
  slug: string;
  title: string;
  level: 'Licence' | 'Master' | 'Doctorat' | 'MBA' | 'Executive' | 'Certificat';
  domain: string;
  format: string;
  campus: string;
  duration: string;
  intake: string;
  description: string;
  insertion: string;
  image: string;
}

const formationsData: Formation[] = [
  { id: 1, slug: 'diplomatie-relations-internationales', title: 'Diplomatie & Relations Internationales', level: 'Master', domain: 'Droit & Science politique', format: 'Initial', campus: 'Paris', duration: '2 ans', intake: '80 étudiants/an', description: 'Former les acteurs de la diplomatie internationale de demain. Négociation, droit international, géopolitique.', insertion: '94% insertion à 6 mois', image: '/formation-diplomacy.jpg' },
  { id: 2, slug: 'cybersecurite', title: 'Cybersécurité & Systèmes d\'Information', level: 'Master', domain: 'Sciences & Ingénierie', format: 'Initial', campus: 'Paris', duration: '2 ans', intake: '120 étudiants/an', description: 'Protection des systèmes d\'information, cryptographie avancée, réponse aux incidents cyber.', insertion: '96% insertion — salaire médian 52k€', image: '/formation-cyber.jpg' },
  { id: 3, slug: 'transition-ecologique', title: 'Transition Écologique & Économie Circulaire', level: 'Master', domain: 'Environnement', format: 'Initial', campus: 'Paris & Bordeaux', duration: '2 ans', intake: '45 étudiants/an', description: 'Former les décideurs capables de mener la transition écologique dans les organisations.', insertion: '91% insertion à 6 mois', image: '/formation-sustainability.jpg' },
  { id: 4, slug: 'droit-international-affaires', title: 'Droit International des Affaires', level: 'Licence', domain: 'Droit & Science politique', format: 'Initial', campus: 'Paris', duration: '3 ans', intake: '200 étudiants/an', description: 'Droit des affaires, commerce international, résolution des conflits transfrontaliers.', insertion: '89% poursuite d\'études', image: '/campus-library.jpg' },
  { id: 5, slug: 'mba-entrepreneuriat', title: 'MBA Entrepreneuriat & Innovation', level: 'MBA', domain: 'Management', format: 'Continue', campus: 'Paris', duration: '1 an', intake: '60 étudiants/an', description: 'Création d\'entreprise, levée de fonds, innovation disruptive, leadership entrepreneur.', insertion: '88% création ou reprise d\'entreprise', image: '/campus-modern-building.jpg' },
  { id: 6, slug: 'intelligence-artificielle-data-science', title: 'Intelligence Artificielle & Data Science', level: 'Master', domain: 'Sciences & Ingénierie', format: 'Initial', campus: 'Paris', duration: '2 ans', intake: '150 étudiants/an', description: 'Machine learning, deep learning, traitement du langage naturel, vision par ordinateur.', insertion: '97% insertion — salaire médian 58k€', image: '/research-lab-1.jpg' },
  { id: 7, slug: 'licence-economie-finance', title: 'Licence Économie & Finance', level: 'Licence', domain: 'Économie & Finance', format: 'Initial', campus: 'Paris', duration: '3 ans', intake: '180 étudiants/an', description: 'Macroéconomie, microéconomie, marchés financiers, analyse économétrique.', insertion: '86% poursuite d\'études', image: '/campus-aerial.jpg' },
  { id: 8, slug: 'master-finance-marches', title: 'Master Finance & Marchés de Capitaux', level: 'Master', domain: 'Économie & Finance', format: 'Initial', campus: 'Paris & Londres', duration: '2 ans', intake: '90 étudiants/an', description: 'Finance d\'entreprise, fusions et acquisitions, trading, gestion de portefeuille.', insertion: '95% insertion — salaire médian 55k€', image: '/campus-aerial.jpg' },
  { id: 9, slug: 'doctorat-science-politique', title: 'Doctorat en Science Politique', level: 'Doctorat', domain: 'Droit & Science politique', format: 'Initial', campus: 'Paris', duration: '3 ans', intake: '25 doctorants/an', description: 'Recherche fondamentale en science politique, relations internationales, gouvernance.', insertion: '78% insertion académique', image: '/campus-library.jpg' },
  { id: 10, slug: 'mba-strategie-digitale', title: 'MBA Stratégie Digitale & Transformation', level: 'MBA', domain: 'Management', format: 'Alternance', campus: 'Paris', duration: '16 mois', intake: '50 étudiants/an', description: 'Transformation digitale, stratégie omnicanale, data-driven management, agilité.', insertion: '92% insertion à 6 mois', image: '/campus-modern-building.jpg' },
  { id: 11, slug: 'executive-leadership', title: 'Executive Leadership & Gestion d\'Équipe', level: 'Executive', domain: 'Management', format: 'Continue', campus: 'Paris', duration: '6 mois', intake: '30 participants', description: 'Développement du leadership, gestion des talents, conduite du changement, communication.', insertion: ' Promotion interne dans les 12 mois', image: '/executive-classroom.jpg' },
  { id: 12, slug: 'licence-lettres-classiques', title: 'Licence Lettres Classiques & Humanités', level: 'Licence', domain: 'Arts & Lettres', format: 'Initial', campus: 'Paris', duration: '3 ans', intake: '120 étudiants/an', description: 'Latin, grec, histoire de l\'art, philosophie, littérature comparée.', insertion: '82% poursuite d\'études', image: '/campus-garden.jpg' },
  { id: 13, slug: 'master-droit-fiscal', title: 'Master Droit Fiscal & Fiscalité Internationale', level: 'Master', domain: 'Droit & Science politique', format: 'Alternance', campus: 'Paris', duration: '2 ans', intake: '70 étudiants/an', description: 'Droit fiscal français et comparé, fiscalité des entreprises, planification fiscale.', insertion: '93% insertion — salaire médian 48k€', image: '/campus-library.jpg' },
  { id: 14, slug: 'licence-sciences-vie', title: 'Licence Sciences de la Vie & Biotechnologie', level: 'Licence', domain: 'Santé', format: 'Initial', campus: 'Bordeaux', duration: '3 ans', intake: '100 étudiants/an', description: 'Biologie cellulaire, génétique, microbiologie, biotechnologies industrielles.', insertion: '88% poursuite d\'études', image: '/formation-sustainability.jpg' },
  { id: 15, slug: 'certificat-ia-management', title: 'Certificat IA pour le Management', level: 'Certificat', domain: 'Management', format: 'En ligne', campus: 'En ligne', duration: '3 mois', intake: '40 participants', description: 'Intégration de l\'IA dans les processus de management, outils pratiques, éthique.', insertion: '  compétences IA acquises', image: '/research-lab-1.jpg' },
  { id: 16, slug: 'master-marketing-luxe', title: 'Master Marketing du Luxe & Mode', level: 'Master', domain: 'Management', format: 'Initial', campus: 'Paris', duration: '2 ans', intake: '60 étudiants/an', description: 'Stratégies marketing du secteur luxe, branding, distribution sélective, digital.', insertion: '90% insertion — salaire médian 42k€', image: '/campus-garden.jpg' },
  { id: 17, slug: 'doctorat-economie', title: 'Doctorat en Économie', level: 'Doctorat', domain: 'Économie & Finance', format: 'Initial', campus: 'Paris', duration: '3 ans', intake: '20 doctorants/an', description: 'Recherche en économie théorique et appliquée, économétrie, politiques publiques.', insertion: '82% insertion académique', image: '/campus-library.jpg' },
  { id: 18, slug: 'mba-international-business', title: 'MBA International Business', level: 'MBA', domain: 'Management', format: 'Initial', campus: 'Londres', duration: '1 an', intake: '80 étudiants/an', description: 'Commerce international, management interculturel, supply chain globale, négociation.', insertion: '93% insertion à 6 mois', image: '/campus-aerial.jpg' },
  { id: 19, slug: 'executive-finance-durable', title: 'Executive Finance Durable & ESG', level: 'Executive', domain: 'Économie & Finance', format: 'Continue', campus: 'Paris', duration: '4 mois', intake: '25 participants', description: 'Finance verte, reporting ESG, investissement responsable, réglementation européenne.', insertion: '  expertise ESG reconnue', image: '/executive-classroom.jpg' },
  { id: 20, slug: 'master-sante-publique', title: 'Master Santé Publique & Politiques de Santé', level: 'Master', domain: 'Santé', format: 'Alternance', campus: 'Paris', duration: '2 ans', intake: '55 étudiants/an', description: 'Épidémiologie, gestion des systèmes de santé, prévention, économie de la santé.', insertion: '89% insertion à 6 mois', image: '/formation-sustainability.jpg' },
  { id: 21, slug: 'licence-informatique', title: 'Licence Informatique & Développement Logiciel', level: 'Licence', domain: 'Sciences & Ingénierie', format: 'Initial', campus: 'Paris', duration: '3 ans', intake: '160 étudiants/an', description: 'Programmation, algorithmique, bases de données, développement web et mobile.', insertion: '91% poursuite d\'études ou insertion', image: '/formation-cyber.jpg' },
  { id: 22, slug: 'certificat-negociation', title: 'Certificat Négociation Internationale', level: 'Certificat', domain: 'Droit & Science politique', format: 'Continue', campus: 'Paris', duration: '2 mois', intake: '20 participants', description: 'Techniques de négociation, médiation interculturelle, résolution des conflits.', insertion: '  compétences certifiées', image: '/formation-diplomacy.jpg' },
  { id: 23, slug: 'master-ingenierie-financiere', title: 'Master Ingénierie Financière Quantitative', level: 'Master', domain: 'Économie & Finance', format: 'Initial', campus: 'Paris', duration: '2 ans', intake: '65 étudiants/an', description: 'Modélisation mathématique, produits dérivés, risque, programmation quantitative.', insertion: '98% insertion — salaire médian 62k€', image: '/campus-aerial.jpg' },
  { id: 24, slug: 'double-diplome-droit-management', title: 'Double Diplôme Droit & Management', level: 'Master', domain: 'Droit & Science politique', format: 'Double diplôme', campus: 'Paris', duration: '3 ans', intake: '40 étudiants/an', description: 'Double compétence droit des affaires et management, ouverture internationale garantie.', insertion: '96% insertion à 6 mois', image: '/campus-library.jpg' },
];

const niveaux = ['Tous les niveaux', 'Licence', 'Master', 'Doctorat', 'MBA', 'Executive', 'Certificat'];
const domaines = ['Tous les domaines', 'Droit & Science politique', 'Économie & Finance', 'Sciences & Ingénierie', 'Arts & Lettres', 'Management', 'Santé', 'Environnement'];
const formats = ['Tous les formats', 'Initial', 'Alternance', 'Continue', 'En ligne', 'Double diplôme'];
const campusOptions = ['Tous les campus', 'Paris', 'Bordeaux', 'Londres', 'En ligne'];

/* ------------------------------------------------------------------ */
/*  LEVEL BADGE STYLE                                                  */
/* ------------------------------------------------------------------ */

function getLevelClasses(level: Formation['level']) {
  switch (level) {
    case 'Licence':
      return 'bg-[#1E3A5F] text-white';
    case 'Master':
      return 'bg-[#C9A962] text-[#0A1628]';
    case 'Doctorat':
      return 'bg-[#0A1628] text-white ring-1 ring-[#C9A962]';
    case 'MBA':
      return 'bg-[#F59E0B] text-[#0A1628]';
    case 'Executive':
      return 'bg-[#10B981] text-white';
    case 'Certificat':
      return 'bg-[#3B82F6] text-white';
    default:
      return 'bg-gray-200 text-gray-700';
  }
}

/* ------------------------------------------------------------------ */
/*  EASING TOKEN                                                       */
/* ------------------------------------------------------------------ */

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function Formations() {
  const [search, setSearch] = useState('');
  const [niveau, setNiveau] = useState('Tous les niveaux');
  const [domaine, setDomaine] = useState('Tous les domaines');
  const [format, setFormat] = useState('Tous les formats');
  const [campus, setCampus] = useState('Tous les campus');

  /* scroll-reveal on mount */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = useMemo(() => {
    return formationsData.filter((f) => {
      const matchSearch =
        search === '' ||
        f.title.toLowerCase().includes(search.toLowerCase()) ||
        f.description.toLowerCase().includes(search.toLowerCase());
      const matchNiveau = niveau === 'Tous les niveaux' || f.level === niveau;
      const matchDomaine = domaine === 'Tous les domaines' || f.domain === domaine;
      const matchFormat = format === 'Tous les formats' || f.format === format;
      const matchCampus = campus === 'Tous les campus' || f.campus.includes(campus);
      return matchSearch && matchNiveau && matchDomaine && matchFormat && matchCampus;
    });
  }, [search, niveau, domaine, format, campus]);

  const activeFilters = useMemo(() => {
    const filters: { label: string; key: string }[] = [];
    if (niveau !== 'Tous les niveaux') filters.push({ label: niveau, key: 'niveau' });
    if (domaine !== 'Tous les domaines') filters.push({ label: domaine, key: 'domaine' });
    if (format !== 'Tous les formats') filters.push({ label: format, key: 'format' });
    if (campus !== 'Tous les campus') filters.push({ label: campus, key: 'campus' });
    return filters;
  }, [niveau, domaine, format, campus]);

  const resetFilters = useCallback(() => {
    setNiveau('Tous les niveaux');
    setDomaine('Tous les domaines');
    setFormat('Tous les formats');
    setCampus('Tous les campus');
    setSearch('');
  }, []);

  const removeFilter = useCallback(
    (key: string) => {
      switch (key) {
        case 'niveau':
          setNiveau('Tous les niveaux');
          break;
        case 'domaine':
          setDomaine('Tous les domaines');
          break;
        case 'format':
          setFormat('Tous les formats');
          break;
        case 'campus':
          setCampus('Tous les campus');
          break;
      }
    },
    []
  );

  return (
    <div className="min-h-[100dvh]">
      {/* ============================================================ */}
      {/*  SECTION 1 — HERO                                            */}
      {/* ============================================================ */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          height: '60vh',
          minHeight: '400px',
          background: 'linear-gradient(135deg, rgba(10,22,40,0.92) 0%, rgba(30,58,95,0.85) 100%)',
        }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: 'url(/campus-aerial.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div className="container-isl relative z-10 text-center">
          {/* Breadcrumb */}
          <nav className="mb-6" aria-label="Fil d'Ariane">
            <ol className="flex items-center justify-center gap-2 text-sm text-white/60">
              <li>
                <Link to="/" className="hover:text-gold transition-colors">
                  Accueil
                </Link>
              </li>
              <li>/</li>
              <li className="text-white/80">Formations</li>
            </ol>
          </nav>

          {/* Label */}
          <p className="section-label text-center mb-4">PROGRAMMES 2025-2026</p>

          {/* Gold divider */}
          <div className="gold-divider mx-auto mb-6" />

          {/* Heading */}
          <motion.h1
            className="heading-hero text-white mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            Nos formations
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="body-large text-white/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.2 }}
          >
            De la Licence au Doctorat, en passant par le MBA et la Formation Exécutive : découvrez les programmes qui façonneront votre avenir.
          </motion.p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 2 — FILTER BAR                                      */}
      {/* ============================================================ */}
      <motion.section
        className="sticky bg-white border-b border-gray-200 z-40"
        style={{ top: '80px' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.3 }}
      >
        <div className="container-isl py-4">
          {/* Filter row */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            {/* Left — filters */}
            <div className="flex flex-wrap items-end gap-4 lg:gap-6">
              {/* Search */}
              <div className="w-full sm:w-auto sm:min-w-[220px]">
                <label className="section-label mb-1 !text-[10px]">Rechercher</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    type="text"
                    placeholder="Nom du programme..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 border-gray-200 text-sm rounded bg-white"
                  />
                </div>
              </div>

              {/* Niveau */}
              <FilterSelect label="Niveau" value={niveau} options={niveaux} onChange={setNiveau} />

              {/* Domaine */}
              <FilterSelect label="Domaine" value={domaine} options={domaines} onChange={setDomaine} />

              {/* Campus */}
              <FilterSelect label="Campus" value={campus} options={campusOptions} onChange={setCampus} />
            </div>

            {/* Right — count + reset */}
            <div className="flex items-center gap-4 shrink-0">
              <span className="body-small text-gray-500 whitespace-nowrap">
                {filtered.length} programme{filtered.length !== 1 ? 's' : ''}
              </span>
              {activeFilters.length > 0 && (
                <button
                  onClick={resetFilters}
                  className="body-small text-[#3B82F6] hover:underline whitespace-nowrap"
                >
                  Réinitialiser
                </button>
              )}
            </div>
          </div>

          {/* Active filter pills */}
          <AnimatePresence>
            {activeFilters.length > 0 && (
              <motion.div
                className="flex flex-wrap gap-2 mt-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeFilters.map((f) => (
                  <span
                    key={f.key}
                    className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-gold text-navy rounded-sm"
                  >
                    {f.label}
                    <button
                      onClick={() => removeFilter(f.key)}
                      className="hover:opacity-70"
                      aria-label={`Retirer le filtre ${f.label}`}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* ============================================================ */}
      {/*  SECTION 3 — CARDS GRID                                      */}
      {/* ============================================================ */}
      <section className="section-padding bg-cream">
        <div className="container-isl">
          {filtered.length === 0 ? (
            /* Empty state */
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="heading-subsection text-gray-700 mb-4">
                Aucun programme ne correspond à vos critères.
              </p>
              <p className="body-regular text-gray-500 mb-8">
                Essayez d'élargir votre recherche ou réinitialisez les filtres.
              </p>
              <Button onClick={resetFilters} className="btn-primary">
                Réinitialiser les filtres
              </Button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((formation, index) => (
                  <FormationCard key={formation.id} formation={formation} index={index} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 4 — EXECUTIVE CTA                                   */}
      {/* ============================================================ */}
      <section className="bg-navy py-20 lg:py-24">
        <div className="container-isl max-w-[700px] mx-auto text-center">
          <p className="section-label text-center mb-4">FORMATION CONTINUE</p>
          <div className="gold-divider mx-auto mb-6" />
          <motion.h2
            className="heading-page text-white mb-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            Vous êtes professionnel ?
          </motion.h2>
          <motion.p
            className="body-large text-white/80 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.15 }}
          >
            L'ISL propose des programmes Executive Education, des MBA spécialisés et des certificats courts pour faire évoluer votre carrière sans interrompre votre activité.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.3 }}
          >
            <Link
              to="/formations"
              className="btn-outline-gold"
              onClick={(e) => {
                e.preventDefault();
                setNiveau('Executive');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Découvrir la formation continue
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 5 — BESOIN D'AIDE ?                                 */}
      {/* ============================================================ */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="container-isl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* JPO */}
            <motion.div
              className="text-center md:text-left"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: easeOutExpo }}
            >
              <Calendar className="text-gold mx-auto md:mx-0 mb-4" size={48} strokeWidth={1.5} />
              <h3 className="font-heading font-medium text-xl text-navy-light mb-3">
                Journées Portes Ouvertes
              </h3>
              <p className="body-regular text-gray-600 mb-4">
                Venez nous rencontrer les 15 et 16 mars 2025. Visites guidées, rencontres avec les équipes, ateliers de découverte.
              </p>
              <Link to="/admission" className="link-gold text-navy font-medium text-sm">
                S'inscrire aux JPO &rarr;
              </Link>
            </motion.div>

            {/* Simulateur */}
            <motion.div
              className="text-center md:text-left"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.15 }}
            >
              <Calculator className="text-gold mx-auto md:mx-0 mb-4" size={48} strokeWidth={1.5} />
              <h3 className="font-heading font-medium text-xl text-navy-light mb-3">
                Simulateur d'admissibilité
              </h3>
              <p className="body-regular text-gray-600 mb-4">
                Évaluez vos chances d'admission selon votre profil académique et vos résultats. Résultat en 2 minutes.
              </p>
              <Link to="/admission" className="link-gold text-navy font-medium text-sm">
                Tester mon profil &rarr;
              </Link>
            </motion.div>

            {/* Contact */}
            <motion.div
              className="text-center md:text-left"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.3 }}
            >
              <MessageCircle className="text-gold mx-auto md:mx-0 mb-4" size={48} strokeWidth={1.5} />
              <h3 className="font-heading font-medium text-xl text-navy-light mb-3">
                Une question ?
              </h3>
              <p className="body-regular text-gray-600 mb-4">
                Notre équipe des admissions vous répond du lundi au vendredi, 9h-18h. Délai moyen de réponse : 24h.
              </p>
              <Link to="/contact" className="link-gold text-navy font-medium text-sm">
                Contacter les admissions &rarr;
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FILTER SELECT SUB-COMPONENT                                        */
/* ------------------------------------------------------------------ */

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="min-w-[160px]">
      <label className="section-label mb-1 !text-[10px]">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none border border-gray-200 rounded bg-white px-3 py-2 pr-8 text-sm text-navy-light focus:outline-none focus:ring-2 focus:ring-gold/50 cursor-pointer"
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          size={14}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FORMATION CARD SUB-COMPONENT                                       */
/* ------------------------------------------------------------------ */

function FormationCard({ formation, index }: { formation: Formation; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        layout: { duration: 0.4, ease: easeOutExpo },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
        delay: index * 0.03,
      }}
      className="formation-card group flex flex-col h-full"
    >
      {/* Image container */}
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={formation.image}
          alt={formation.title}
          className="formation-card-img w-full h-full object-cover transition-transform duration-500"
          loading="lazy"
        />
        {/* Level badge */}
        <span
          className={`absolute top-4 left-4 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] rounded-sm ${getLevelClasses(formation.level)}`}
        >
          {formation.level}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 border-t-2 border-transparent group-hover:border-gold transition-colors duration-300">
        <h3 className="font-heading font-medium text-lg text-navy-light mb-3 leading-snug">
          {formation.title}
        </h3>

        {/* Meta row */}
        <div className="flex flex-wrap gap-3 mb-3 text-sm text-gray-500">
          <span className="inline-flex items-center gap-1">
            <Clock size={14} className="shrink-0" />
            {formation.duration}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin size={14} className="shrink-0" />
            {formation.campus}
          </span>
          <span className="inline-flex items-center gap-1">
            <Users size={14} className="shrink-0" />
            {formation.intake}
          </span>
        </div>

        {/* Description */}
        <p className="body-small text-gray-600 mb-4 line-clamp-2 flex-1">
          {formation.description}
        </p>

        {/* Insertion metric */}
        <div className="flex items-center gap-1.5 text-sm text-emerald mb-4">
          <TrendingUp size={14} />
          <span>{formation.insertion}</span>
        </div>

        {/* CTA */}
        <Link
          to={`/formations/${formation.slug}`}
          className="link-gold text-navy font-semibold text-sm mt-auto"
        >
          En savoir plus &rarr;
        </Link>
      </div>
    </motion.article>
  );
}
