import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import CountUp from 'react-countup';
import {
  Library,
  Microscope,
  Home,
  UtensilsCrossed,
  Dumbbell,
  Heart,
  CalendarDays,
  Palette,
  HandHeart,
  PlayCircle,
  Play,
  ExternalLink,
  Download,
  ChevronDown,
  X,
  ChevronLeft,
  ChevronRight,
  Users,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────── Data ─────────────────────── */

const heroStats = [
  { value: 12000, suffix: ' m²', label: 'Bibliothèques' },
  { value: 23, suffix: '', label: 'Laboratoires' },
  { value: 800, suffix: '', label: 'Chambres en résidence' },
  { value: 45, suffix: '', label: 'Associations' },
];

const galleryImages = [
  { src: '/campus-library.jpg', caption: 'Bibliothèque centrale — 400 000 ouvrages', aspect: 'portrait' },
  { src: '/campus-garden.jpg', caption: 'Jardin intérieur — espace de détente', aspect: 'landscape' },
  { src: '/campus-sports.jpg', caption: 'Complexe sportif — 2 500 m²', aspect: 'landscape' },
  { src: '/campus-modern-building.jpg', caption: "Pôle d'innovation — inauguré 2024", aspect: 'portrait' },
  { src: '/formation-diplomacy.jpg', caption: 'Salle du conseil — simulations diplomatiques', aspect: 'landscape' },
  { src: '/student-life-festival.jpg', caption: 'Festival de la vie étudiante — juin 2024', aspect: 'landscape' },
  { src: '/formation-cyber.jpg', caption: "Cyberlab — centre d'excellence", aspect: 'portrait' },
  { src: '/formation-sustainability.jpg', caption: 'Jardin botanique — recherche environnementale', aspect: 'landscape' },
];

const facilities = [
  {
    icon: Library,
    title: 'Bibliothèques',
    body: '12 000 m² de bibliothèques réparties sur 3 sites. 400 000 ouvrages, 50 000 ressources numériques, salles de travail de groupe, espaces de coworking ouverts 24/7.',
    detail: 'Bibliothèque centrale (Haussmann) | Bibliothèque sciences (Moderne) | Médiathèque (Numérique)',
  },
  {
    icon: Microscope,
    title: '23 Laboratoires de recherche',
    body: 'Équipements de pointe en IA, biologie, physique, chimie. Plateformes technologiques partagées avec le CNRS, l\'INRIA et l\'INSERM.',
    detail: null,
  },
  {
    icon: Home,
    title: 'Résidences étudiantes',
    body: '800 chambres et studios sur le campus ou à proximité immédiate. Logements meublés, connexion fibre, laveries, espaces communs.',
    detail: 'Résidence Condorcet (400 chambres) | Résidence Descartes (250 studios) | Résidence Voltaire (150 logements)',
  },
  {
    icon: UtensilsCrossed,
    title: 'Restauration',
    body: '3 restaurants universitaires (RU), cafétérias, food trucks, et espace gourmet. Menus diversifiés, options végétariennes et vegan, tarifs CROUS.',
    detail: null,
  },
  {
    icon: Dumbbell,
    title: 'Complexe sportif',
    body: '2 500 m² d\'installations : salle de musculation, 2 terrains multisports, salle d\'escalade, piscine partenariat. 25 associations sportives.',
    detail: null,
  },
  {
    icon: Heart,
    title: 'Santé & bien-être',
    body: 'Service médical universitaire, psychologues, conseillers d\'orientation, cellule handicap, cellule lutte contre les discriminations.',
    detail: null,
  },
];

const studentLifeCategories = [
  {
    type: 'image',
    image: '/student-life-festival.jpg',
    title: '45 Associations',
    body: 'Culture, humanitaire, sport, entrepreneuriat, politique... Il y en a pour tous les goûts et toutes les passions.',
    cta: 'Découvrir les associations',
  },
  {
    type: 'icon',
    icon: CalendarDays,
    title: 'Événements tout au long de l\'année',
    body: 'Gala de l\'ISL, Semaine internationale, Forum des métiers, Nuit de la recherche, Festival de cinéma...',
    cta: 'Calendrier des événements',
  },
  {
    type: 'icon',
    icon: Palette,
    title: 'Culture & création',
    body: 'Théâtre, musique, danse, photographie, radio campus, journal étudiant. Salle de spectacle de 300 places.',
    cta: 'En savoir plus',
  },
  {
    type: 'icon',
    icon: HandHeart,
    title: 'Engagement & solidarité',
    body: 'Programme de tutorat, associations humanitaires, marrainage des étudiants internationaux, jardins partagés.',
    cta: "S'engager",
  },
];

const virtualTourSpots = [
  'Bibliothèque centrale',
  'Laboratoire IA',
  'Résidence Condorcet',
  'Complexe sportif',
  'Salle du conseil',
];

const residencesISL = [
  { name: 'Résidence Condorcet', price: '380€/mois', distance: 'sur le campus', rooms: '400 chambres' },
  { name: 'Résidence Descartes', price: '520€/mois', distance: '5 min à pied', rooms: '250 studios' },
  { name: 'Résidence Voltaire', price: '450€/mois', distance: '10 min en métro', rooms: '150 logements' },
];

const otherHousing = [
  { title: 'CROUS', content: 'Demandes via la DSE — échelons 0 à 7. Le CROUS de Paris propose des bourses et des logements sociaux étudiants selon les ressources de votre famille.' },
  { title: 'Logement privé', content: 'Plateforme ISL-Partenaires — garanties Visale acceptées. Accédez à des centaines d\'annonces vérifiées près du campus.' },
  { title: 'Colocation', content: 'Groupe Facebook officiel — 2 400 membres. Trouvez facilement des colocataires parmi la communauté ISL.' },
  { title: "Famille d'accueil", content: 'Programme pour étudiants internationaux — 1er semestre. Hébergement temporaire en famille pour faciliter votre arrivée.' },
];

const campusStats = [
  { value: 12000, suffix: '', label: 'm² de bibliothèques' },
  { value: 400, suffix: ' 000', label: 'volumes' },
  { value: 800, suffix: '', label: 'logements étudiants' },
  { value: 3, suffix: '', label: 'restaurants universitaires' },
  { value: 23, suffix: '', label: 'plateformes de recherche' },
  { value: 2500, suffix: '', label: "m² d'installations sportives" },
  { value: 45, suffix: '', label: 'associations étudiantes' },
  { value: 100, suffix: '%', label: 'des bâtiments accessibles' },
];

/* ─────────────────────── Components ─────────────────────── */

export default function Campus() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  /* GSAP ScrollTrigger animations */
  useGSAP(
    () => {
      /* Hero content */
      gsap.from('.campus-hero-content > *', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.2,
      });

      /* Hero stats */
      gsap.from('.campus-hero-stat', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.8,
      });

      /* Gallery items */
      gsap.from('.gallery-item', {
        scrollTrigger: {
          trigger: '.gallery-grid',
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
      });

      /* Facilities */
      gsap.from('.facility-item', {
        scrollTrigger: {
          trigger: '.facilities-grid',
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
      });

      /* Student life */
      gsap.from('.student-life-item', {
        scrollTrigger: {
          trigger: '.student-life-grid',
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      });

      /* Virtual tour left/right */
      gsap.from('.virtual-tour-left', {
        scrollTrigger: {
          trigger: '.virtual-tour-section',
          start: 'top 75%',
        },
        x: -60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.virtual-tour-right', {
        scrollTrigger: {
          trigger: '.virtual-tour-section',
          start: 'top 75%',
        },
        x: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
      });

      /* Housing */
      gsap.from('.housing-residence-card', {
        scrollTrigger: {
          trigger: '.housing-section',
          start: 'top 75%',
        },
        x: -40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
      });

      gsap.from('.housing-accordion', {
        scrollTrigger: {
          trigger: '.housing-section',
          start: 'top 75%',
        },
        x: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
      });

      /* Stats */
      gsap.from('.campus-stat-item', {
        scrollTrigger: {
          trigger: '.campus-stats-section',
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power3.out',
      });

      /* CTA */
      gsap.from('.cta-jpo-content', {
        scrollTrigger: {
          trigger: '.cta-jpo-section',
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

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div ref={containerRef} className="min-h-[100dvh]">
      {/* ─────────── Section 1: Hero ─────────── */}
      <section
        className="relative min-h-[70vh] flex items-end bg-navy overflow-hidden"
        style={{ paddingBottom: '80px' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/campus-aerial.jpg)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(10,22,40,0.7) 0%, rgba(10,22,40,0.92) 100%)',
          }}
        />
        <div className="relative z-10 w-full" style={{ paddingLeft: '8vw', paddingRight: '8vw' }}>
          <div className="campus-hero-content">
            <nav aria-label="Breadcrumb" className="mb-4">
              <span className="text-sm text-white/60">
                Accueil / <span className="text-white">Campus</span>
              </span>
            </nav>
            <p className="section-label" style={{ color: '#C9A962' }}>
              CAMPUS PARIS
            </p>
            <div className="gold-divider mb-6" />
            <h1 className="heading-hero text-white mb-4">Bienvenue sur le campus</h1>
            <p className="body-large text-white/80 max-w-3xl mb-8">
              Entre le jardin du Luxembourg et les quais de la Seine, un campus d&apos;exception où
              patrimoine et modernité se rencontrent.
            </p>
          </div>
          <div className="flex flex-wrap gap-8 lg:gap-10">
            {heroStats.map((s) => (
              <div key={s.label} className="campus-hero-stat">
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

      {/* ─────────── Section 2: Photo Gallery ─────────── */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-isl">
          <p className="section-label">GALERIE</p>
          <div className="gold-divider mb-6" />
          <h2 className="heading-page text-navy mb-10">Le campus en images</h2>
          <div
            className="gallery-grid columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
          >
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="gallery-item break-inside-avoid relative group cursor-pointer overflow-hidden rounded"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  style={{ aspectRatio: img.aspect === 'portrait' ? '3/4' : '16/10' }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white text-sm font-medium px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    {img.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Section 3: Facilities ─────────── */}
      <section className="bg-cream section-padding-lg">
        <div className="container-isl">
          <p className="section-label">INSTALLATIONS</p>
          <div className="gold-divider mb-6" />
          <h2 className="heading-section text-navy mb-12">Des installations de pointe</h2>
          <div className="facilities-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="facility-item">
                  <Icon size={48} className="text-navy-light mb-4" strokeWidth={1.5} />
                  <h3 className="font-heading font-medium text-xl text-navy mb-3">{f.title}</h3>
                  <p className="body-regular text-gray-600 mb-3">{f.body}</p>
                  {f.detail && (
                    <p className="text-sm text-gray-500 italic">{f.detail}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────── Section 4: Student Life ─────────── */}
      <section className="bg-navy section-padding-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <img src="/shape-organic-1.svg" alt="" className="w-[300px] h-[300px]" loading="lazy" />
        </div>
        <div className="absolute bottom-0 left-0 opacity-10 pointer-events-none">
          <img src="/shape-organic-2.svg" alt="" className="w-[250px] h-[250px]" loading="lazy" />
        </div>
        <div className="container-isl relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-amber-energy mb-4">
            VIE ÉTUDIANTE
          </p>
          <div className="gold-divider mb-6" />
          <h2 className="heading-section text-white mb-12">Une vie de campus dynamique</h2>
          <div className="student-life-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentLifeCategories.map((cat, i) => (
              <div key={i} className="student-life-item text-center lg:text-left">
                {cat.type === 'image' ? (
                  <div className="mx-auto lg:mx-0 mb-4 overflow-hidden rounded-full w-[120px] h-[120px] group">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <span className="text-amber-energy mb-4 mx-auto lg:mx-0 block">
                    {cat.icon && <cat.icon size={48} strokeWidth={1.5} />}
                  </span>
                )}
                <h3 className="font-heading font-medium text-xl text-white mb-2">{cat.title}</h3>
                <p className="body-small text-white/70 mb-3">{cat.body}</p>
                <button className="text-sm font-medium text-gold hover:text-gold-light transition-colors link-gold">
                  {cat.cta} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Section 5: Virtual Tour ─────────── */}
      <section className="bg-white py-20 lg:py-24 virtual-tour-section">
        <div className="container-isl">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div className="virtual-tour-left flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-sky-blue mb-4">
                VISITE VIRTUELLE
              </p>
              <div className="gold-divider mb-6" />
              <h2 className="heading-page text-navy mb-4">
                Visitez le campus depuis chez vous
              </h2>
              <p className="body-large text-gray-600 mb-8">
                Explorez nos bibliothèques, laboratoires, résidences et espaces de vie en 360°. Une
                immersion complète avant votre venue.
              </p>
              <ul className="space-y-3 mb-8">
                {virtualTourSpots.map((spot) => (
                  <li key={spot} className="flex items-center gap-3 text-gray-700">
                    <PlayCircle size={20} className="text-sky-blue flex-shrink-0" />
                    <span className="text-sm font-medium">{spot}</span>
                  </li>
                ))}
              </ul>
              <Button className="btn-primary gap-2">
                <ExternalLink size={16} />
                Lancer la visite virtuelle
              </Button>
            </div>
            {/* Right */}
            <div className="virtual-tour-right flex-1 relative">
              <div className="relative rounded overflow-hidden group cursor-pointer">
                <img
                  src="/virtual-tour-preview.jpg"
                  alt="Visite virtuelle 360° du campus ISL"
                  className="w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-navy/30 group-hover:bg-navy/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-isl-lg">
                    <Play size={32} className="text-navy ml-1" fill="currentColor" />
                  </div>
                </div>
                <Badge className="absolute top-4 right-4 bg-sky-blue text-white border-0">
                  360°
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── Section 6: Housing ─────────── */}
      <section className="bg-cream py-20 lg:py-24 housing-section">
        <div className="container-isl">
          <p className="section-label">LOGEMENT</p>
          <div className="gold-divider mb-6" />
          <h2 className="heading-page text-navy mb-10">Se loger près du campus</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left — Résidences ISL */}
            <div className="space-y-6">
              <h3 className="font-heading font-medium text-xl text-navy mb-4">Résidences ISL</h3>
              {residencesISL.map((r) => (
                <Card key={r.name} className="housing-residence-card p-6 flex items-start gap-4 border-0 shadow-isl">
                  <Home size={28} className="text-navy-light flex-shrink-0 mt-1" strokeWidth={1.5} />
                  <div className="flex-1">
                    <h4 className="font-heading font-medium text-lg text-navy">{r.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {r.rooms} — {r.distance}
                    </p>
                    <Badge className="mt-2 bg-emerald text-white border-0 hover:bg-emerald">
                      {r.price}
                    </Badge>
                  </div>
                </Card>
              ))}
              <button className="text-sm font-medium text-navy hover:text-gold transition-colors link-gold mt-2">
                Demander un logement →
              </button>
            </div>
            {/* Right — Other options */}
            <div className="housing-accordion">
              <h3 className="font-heading font-medium text-xl text-navy mb-4">Autres options</h3>
              <Accordion type="single" collapsible className="w-full">
                {otherHousing.map((h, i) => (
                  <AccordionItem key={i} value={`housing-${i}`} className="border-b border-gray-200">
                    <AccordionTrigger className="text-left font-body text-base font-medium text-navy hover:text-gold py-4">
                      {h.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 body-small pb-4">
                      {h.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <button className="flex items-center gap-2 mt-6 text-sm font-medium text-navy hover:text-gold transition-colors link-gold">
                <Download size={16} />
                Guide logement étudiant (PDF)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── Section 7: Campus Stats ─────────── */}
      <section className="bg-navy py-16 lg:py-20 campus-stats-section">
        <div className="container-isl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10">
            {campusStats.map((s) => (
              <div key={s.label} className="campus-stat-item text-center">
                <div className="stat-number">
                  <CountUp end={s.value} duration={2} suffix={s.suffix} />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/60 mt-2">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Section 8: CTA JPO ─────────── */}
      <section className="bg-white py-16 cta-jpo-section">
        <div className="container-isl">
          <div className="cta-jpo-content max-w-[700px] mx-auto text-center">
            <h2 className="heading-page text-navy mb-4">Venez vivre le campus</h2>
            <p className="body-large text-gray-600 mb-8">
              Journées Portes Ouvertes — 15 &amp; 16 mars 2025. Visites guidées, rencontres, ateliers.
            </p>
            <Button className="btn-primary">S&apos;inscrire aux JPO</Button>
          </div>
        </div>
      </section>

      {/* ─────────── Lightbox ─────────── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-navy/95 flex items-center justify-center"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Visionneuse d'images"
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-10"
            onClick={closeLightbox}
            aria-label="Fermer"
          >
            <X size={32} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 z-10"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            aria-label="Image précédente"
          >
            <ChevronLeft size={40} />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 z-10"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            aria-label="Image suivante"
          >
            <ChevronRight size={40} />
          </button>
          <div className="max-w-5xl max-h-[85vh] px-16" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].caption}
              className="max-w-full max-h-[75vh] object-contain rounded"
            />
            <p className="text-white text-center mt-4 text-sm font-medium">
              {galleryImages[lightboxIndex].caption}
              <span className="text-white/50 ml-2">
                ({lightboxIndex + 1} / {galleryImages.length})
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
