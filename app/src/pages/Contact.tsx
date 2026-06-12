import { useRef, useState, useCallback } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  Send,
  User,
  MessageSquare,
  Linkedin,
  Instagram,
  Twitter,
  Youtube,
  ChevronDown,
  FileText,
  GraduationCap,
  Building2,
  Newspaper,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Profile tab data                                                   */
/* ------------------------------------------------------------------ */
const profileTabs = [
  {
    key: 'candidat',
    label: 'Candidat',
    icon: GraduationCap,
    service: 'Service des Admissions',
    email: 'admissions@isl.fr',
    phone: '+33 1 44 39 70 00',
    hours: 'Lundi — Vendredi, 9h00 — 18h00',
    address: '17 rue de l\'Université, 75007 Paris — Bureau 112',
    note: 'Délai moyen de réponse : 24h',
  },
  {
    key: 'etudiant',
    label: 'Étudiant',
    icon: User,
    service: 'Scolarité',
    email: 'scolarite@isl.fr',
    phone: '+33 1 44 39 71 00',
    hours: 'Lundi — Vendredi, 8h30 — 17h30',
    address: '17 rue de l\'Université, 75007 Paris — Bureau 201',
    note: 'Gestion des inscriptions, examens et certificats',
  },
  {
    key: 'entreprise',
    label: 'Entreprise',
    icon: Building2,
    service: 'Relations Entreprises',
    email: 'entreprises@isl.fr',
    phone: '+33 1 44 39 72 00',
    hours: 'Lundi — Vendredi, 9h00 — 18h00',
    address: '17 rue de l\'Université, 75007 Paris — Bureau 301',
    note: 'Contact privilégié pour les partenariats, stages et mécénat',
  },
  {
    key: 'alumni',
    label: 'Alumni',
    icon: FileText,
    service: 'Réseau Alumni',
    email: 'alumni@isl.fr',
    phone: '+33 1 44 39 73 00',
    hours: 'Lundi — Vendredi, 9h00 — 17h00',
    address: '17 rue de l\'Université, 75007 Paris — Bureau 205',
    note: 'Événements, dons et mise en relation',
  },
  {
    key: 'presse',
    label: 'Presse',
    icon: Newspaper,
    service: 'Service Communication',
    email: 'presse@isl.fr',
    phone: '+33 1 44 39 74 00',
    hours: 'Lundi — Vendredi, 9h00 — 18h00',
    address: '17 rue de l\'Université, 75007 Paris — Bureau 401',
    note: 'Communiqués, interviews, accréditations presse',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqData = [
  {
    question: 'Quel est le délai de réponse ?',
    answer:
      'Notre équipe répond sous 24h ouvrées en moyenne. En période de campagne d\'admission (décembre-mars), le délai peut atteindre 48h.',
  },
  {
    question: 'Comment modifier ma candidature ?',
    answer:
        "Connectez-vous à votre espace candidat pour modifier votre dossier tant que la date limite n'est pas dépassée.",
  },
  {
    question: 'Puis-je visiter le campus sans JPO ?',
    answer:
      'Oui, les visites individuelles sont possibles sur rendez-vous du lundi au vendredi.',
  },
  {
    question: "Comment accéder à mon espace étudiant ?",
    answer:
      "L'espace étudiant est accessible via le bouton 'Espace Étudiant' en haut de page.",
  },
  {
    question: 'Qui contacter pour un partenariat média ?',
    answer:
      'Le service communication/presse est joignable à presse@isl.fr ou au +33 1 44 39 74 00.',
  },
];

/* ------------------------------------------------------------------ */
/*  Form profile options                                               */
/* ------------------------------------------------------------------ */
const profileOptions = [
  'Futur étudiant (Licence)',
  'Futur étudiant (Master)',
  'Futur étudiant (Doctorat)',
  'Professionnel',
  'Entreprise',
  'Alumni',
  'Journaliste',
  'Autre',
];

/* ------------------------------------------------------------------ */
/*  Contact page                                                       */
/* ------------------------------------------------------------------ */
export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('candidat');
  const [formState, setFormState] = useState({
    profile: '',
    sujet: '',
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    message: '',
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* GSAP scroll animations (isolated from Framer Motion) */
  useGSAP(
    () => {
      /* Hero sequence */
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .from('.contact-hero-label', { y: 20, opacity: 0, duration: 0.6 }, 0.2)
        .from('.contact-hero-divider', { scaleX: 0, duration: 0.5 }, 0.4)
        .from('.contact-hero-heading', { y: 40, opacity: 0, duration: 0.8 }, 0.5)
        .from('.contact-hero-subtitle', { y: 30, opacity: 0, duration: 0.7 }, 0.7);

      /* Fade-up sections */
      gsap.utils.toArray<HTMLElement>('.contact-fade-up').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        });
      });

      /* Form left panel */
      gsap.from('.contact-form-left', {
        x: -40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-form-section', start: 'top 85%', toggleActions: 'play none none none' },
      });

      /* Form right panel */
      gsap.from('.contact-form-right', {
        x: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-form-section', start: 'top 85%', toggleActions: 'play none none none' },
      });

      /* Map section */
      gsap.from('.contact-map-left', {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.contact-map', start: 'top 85%', toggleActions: 'play none none none' },
      });
      gsap.from('.contact-map-right', {
        x: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-map', start: 'top 85%', toggleActions: 'play none none none' },
      });

      /* FAQ items */
      gsap.from('.contact-faq-item', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-faq', start: 'top 85%', toggleActions: 'play none none none' },
      });
    },
    { scope: containerRef }
  );

  /* Form handlers */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      setFormState((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      }));
      /* Clear error on change */
      if (errors[name]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
      }
    },
    [errors]
  );

  const validate = useCallback(() => {
    const newErrors: Record<string, string> = {};
    if (!formState.profile) newErrors.profile = 'Veuillez sélectionner votre profil';
    if (!formState.sujet.trim()) newErrors.sujet = 'Veuillez indiquer un sujet';
    if (!formState.prenom.trim()) newErrors.prenom = 'Veuillez indiquer votre prénom';
    if (!formState.nom.trim()) newErrors.nom = 'Veuillez indiquer votre nom';
    if (!formState.email.trim()) {
      newErrors.email = 'Veuillez indiquer votre email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Veuillez entrer une adresse email valide';
    }
    if (!formState.message.trim()) newErrors.message = 'Veuillez écrire un message';
    if (!formState.consent) newErrors.consent = 'Vous devez accepter le traitement de vos données';
    return newErrors;
  }, [formState]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors = validate();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setSubmitted(true);
    },
    [validate]
  );

  const handleReset = useCallback(() => {
    setFormState({
      profile: '',
      sujet: '',
      prenom: '',
      nom: '',
      email: '',
      telephone: '',
      message: '',
      consent: false,
    });
    setErrors({});
    setSubmitted(false);
  }, []);

  const activeProfile = profileTabs.find((t) => t.key === activeTab)!;

  return (
    <div ref={containerRef}>
      {/* ============================================================ */}
      {/* SECTION 1 — HERO                                              */}
      {/* ============================================================ */}
      <section
        className="relative flex items-center justify-center min-h-[45vh]"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(10,22,40,0.93) 0%, rgba(30,58,95,0.88) 100%), url(/campus-garden.jpg)',
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
              <li className="text-white/80">Contact</li>
            </ol>
          </nav>

          <p className="contact-hero-label section-label text-gold">CONTACT</p>
          <div className="contact-hero-divider gold-divider mx-auto mb-6" />
          <h1 className="contact-hero-heading heading-hero text-white mb-6">
            Nous Contacter
          </h1>
          <p className="contact-hero-subtitle body-large text-white/80 max-w-2xl mx-auto">
            Notre équipe vous répond sous 24h ouvrées. Choisissez le service adapté à votre
            demande.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — PROFILE SELECTOR                                  */}
      {/* ============================================================ */}
      <section className="bg-white py-12">
        <div className="container-isl">
          <h2 className="contact-fade-up heading-subsection text-navy text-center mb-8">
            Comment pouvons-nous vous aider ?
          </h2>

          {/* Tabs */}
          <div
            className="flex flex-wrap justify-center gap-2 mb-8"
            role="tablist"
            aria-label="Sélectionnez votre profil"
          >
            {profileTabs.map((tab) => (
              <button
                key={tab.key}
                role="tab"
                aria-selected={activeTab === tab.key}
                aria-controls={`panel-${tab.key}`}
                id={`tab-${tab.key}`}
                onClick={() => setActiveTab(tab.key)}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded border text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.key
                    ? 'bg-navy text-white border-navy'
                    : 'bg-transparent text-gray-600 border-gray-200 hover:border-navy hover:text-navy'
                }`}
              >
                <tab.icon size={16} aria-hidden="true" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content with Framer Motion */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              id={`panel-${activeTab}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeTab}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-cream rounded p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gold mb-1">
                  {activeProfile.service}
                </p>
                <h3 className="font-heading font-medium text-xl text-navy mb-6">
                  {activeProfile.label}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex items-start gap-3">
                    <Mail size={18} className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</p>
                      <a
                        href={`mailto:${activeProfile.email}`}
                        className="body-regular text-navy hover:text-gold transition-colors"
                      >
                        {activeProfile.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone size={18} className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Téléphone</p>
                      <a
                        href={`tel:${activeProfile.phone.replace(/\s/g, '')}`}
                        className="body-regular text-navy hover:text-gold transition-colors"
                      >
                        {activeProfile.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock size={18} className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Horaires</p>
                      <p className="body-regular text-gray-700">{activeProfile.hours}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Adresse</p>
                      <p className="body-regular text-gray-700">{activeProfile.address}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 pt-5 border-t border-gray-200">
                  <CheckCircle size={16} className="text-emerald flex-shrink-0" aria-hidden="true" />
                  <p className="body-small text-gray-600">{activeProfile.note}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — CONTACT FORM                                      */}
      {/* ============================================================ */}
      <section className="bg-cream section-padding contact-form-section">
        <div className="container-isl">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left — Form (55%) */}
            <div className="contact-form-left lg:w-[55%]">
              <p className="section-label">FORMULAIRE</p>
              <div className="gold-divider mb-6" />
              <h2 className="heading-page text-navy mb-8">Envoyez-nous un message</h2>

              {submitted ? (
                /* Success state */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                  className="bg-white rounded p-10 text-center border border-gray-100"
                >
                  <CheckCircle size={56} className="text-emerald mx-auto mb-4" aria-hidden="true" />
                  <h3 className="font-heading font-medium text-2xl text-navy mb-2">
                    Message envoyé !
                  </h3>
                  <p className="body-regular text-gray-600 mb-6">
                    Nous vous répondons sous 24h ouvrées.
                  </p>
                  <button type="button" onClick={handleReset} className="btn-primary">
                    Envoyer un autre message
                  </button>
                </motion.div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Profile select */}
                  <div>
                    <label htmlFor="profile" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Vous êtes <span className="text-error">*</span>
                    </label>
                    <select
                      id="profile"
                      name="profile"
                      value={formState.profile}
                      onChange={handleChange}
                      className={`w-full border rounded px-4 py-3 bg-white body-regular text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 transition-colors ${
                        errors.profile ? 'border-error' : 'border-gray-200'
                      }`}
                      aria-invalid={!!errors.profile}
                      aria-describedby={errors.profile ? 'profile-error' : undefined}
                    >
                      <option value="">Sélectionnez...</option>
                      {profileOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    {errors.profile && (
                      <p id="profile-error" className="text-error text-sm mt-1">
                        {errors.profile}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="sujet" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Sujet de votre message <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        aria-hidden="true"
                      />
                      <input
                        id="sujet"
                        name="sujet"
                        type="text"
                        value={formState.sujet}
                        onChange={handleChange}
                        placeholder="Ex : Question sur le Master Cybersécurité"
                        className={`w-full border rounded pl-10 pr-4 py-3 bg-white body-regular text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 transition-colors ${
                          errors.sujet ? 'border-error' : 'border-gray-200'
                        }`}
                        aria-invalid={!!errors.sujet}
                        aria-describedby={errors.sujet ? 'sujet-error' : undefined}
                      />
                    </div>
                    {errors.sujet && (
                      <p id="sujet-error" className="text-error text-sm mt-1">
                        {errors.sujet}
                      </p>
                    )}
                  </div>

                  {/* Name row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="prenom" className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Prénom <span className="text-error">*</span>
                      </label>
                      <input
                        id="prenom"
                        name="prenom"
                        type="text"
                        value={formState.prenom}
                        onChange={handleChange}
                        placeholder="Votre prénom"
                        className={`w-full border rounded px-4 py-3 bg-white body-regular text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 transition-colors ${
                          errors.prenom ? 'border-error' : 'border-gray-200'
                        }`}
                        aria-invalid={!!errors.prenom}
                        aria-describedby={errors.prenom ? 'prenom-error' : undefined}
                      />
                      {errors.prenom && (
                        <p id="prenom-error" className="text-error text-sm mt-1">
                          {errors.prenom}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="nom" className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Nom <span className="text-error">*</span>
                      </label>
                      <input
                        id="nom"
                        name="nom"
                        type="text"
                        value={formState.nom}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        className={`w-full border rounded px-4 py-3 bg-white body-regular text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 transition-colors ${
                          errors.nom ? 'border-error' : 'border-gray-200'
                        }`}
                        aria-invalid={!!errors.nom}
                        aria-describedby={errors.nom ? 'nom-error' : undefined}
                      />
                      {errors.nom && (
                        <p id="nom-error" className="text-error text-sm mt-1">
                          {errors.nom}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Email <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        aria-hidden="true"
                      />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="votre@email.fr"
                        className={`w-full border rounded pl-10 pr-4 py-3 bg-white body-regular text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 transition-colors ${
                          errors.email ? 'border-error' : 'border-gray-200'
                        }`}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                    </div>
                    {errors.email && (
                      <p id="email-error" className="text-error text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone (optional) */}
                  <div>
                    <label htmlFor="telephone" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Téléphone <span className="text-gray-400 font-normal">(optionnel)</span>
                    </label>
                    <div className="relative">
                      <Phone
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        aria-hidden="true"
                      />
                      <input
                        id="telephone"
                        name="telephone"
                        type="tel"
                        value={formState.telephone}
                        onChange={handleChange}
                        placeholder="+33 1 23 45 67 89"
                        className="w-full border border-gray-200 rounded pl-10 pr-4 py-3 bg-white body-regular text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Votre message <span className="text-error">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      maxLength={2000}
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Décrivez votre demande en quelques lignes..."
                      className={`w-full border rounded px-4 py-3 bg-white body-regular text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 transition-colors resize-none ${
                        errors.message ? 'border-error' : 'border-gray-200'
                      }`}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    <div className="flex items-center justify-between mt-1">
                      {errors.message ? (
                        <p id="message-error" className="text-error text-sm">
                          {errors.message}
                        </p>
                      ) : (
                        <span />
                      )}
                      <span className="text-xs text-gray-400">
                        {formState.message.length}/2000
                      </span>
                    </div>
                  </div>

                  {/* Consent */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={formState.consent}
                        onChange={handleChange}
                        className={`mt-1 w-4 h-4 accent-gold ${errors.consent ? 'ring-2 ring-error' : ''}`}
                        aria-invalid={!!errors.consent}
                        aria-describedby={errors.consent ? 'consent-error' : undefined}
                      />
                      <span className="body-small text-gray-600">
                        J'accepte que mes données soient traitées par l'ISL dans le cadre de ma
                        demande.{' '}
                        <a href="#" className="text-sky-blue hover:underline">
                          Politique de confidentialité
                        </a>
                      </span>
                    </label>
                    {errors.consent && (
                      <p id="consent-error" className="text-error text-sm mt-1">
                        {errors.consent}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button type="submit" className="btn-primary w-full">
                    <Send size={16} className="mr-2" aria-hidden="true" />
                    Envoyer mon message
                  </button>
                </form>
              )}
            </div>

            {/* Right — Info panel (45%) */}
            <div className="contact-form-right lg:w-[45%] lg:pl-12">
              <div className="bg-white rounded p-8 border border-gray-100 shadow-isl">
                {/* Response time */}
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
                  <CheckCircle size={24} className="text-emerald flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-heading font-medium text-lg text-navy">
                      Nous vous répondons sous 24h ouvrées
                    </p>
                    <p className="body-small text-gray-500">Du lundi au vendredi</p>
                  </div>
                </div>

                {/* Contact methods */}
                <div className="space-y-5 mb-8">
                  <div className="flex items-start gap-3">
                    <Phone size={18} className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Téléphone
                      </p>
                      <a
                        href="tel:+33144397000"
                        className="body-regular text-navy hover:text-gold transition-colors"
                      >
                        +33 1 44 39 70 00
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail size={18} className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Email
                      </p>
                      <a
                        href="mailto:contact@isl.fr"
                        className="body-regular text-navy hover:text-gold transition-colors"
                      >
                        contact@isl.fr
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Adresse
                      </p>
                      <p className="body-regular text-gray-700">
                        17 rue de l'Université
                        <br />
                        75007 Paris, France
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock size={18} className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Horaires
                      </p>
                      <p className="body-regular text-gray-700">
                        Lundi — Vendredi : 9h00 — 18h00
                      </p>
                    </div>
                  </div>
                </div>

                {/* Accessibility */}
                <div className="bg-cream rounded p-4 mb-8">
                  <p className="body-small text-gray-600">
                    Un accueil adapté aux personnes en situation de handicap est disponible sur
                    rendez-vous.
                  </p>
                </div>

                {/* Social links */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Suivez-nous
                  </p>
                  <div className="flex items-center gap-4">
                    {[
                      { icon: Linkedin, label: 'LinkedIn', href: '#' },
                      { icon: Instagram, label: 'Instagram', href: '#' },
                      { icon: Twitter, label: 'X / Twitter', href: '#' },
                      { icon: Youtube, label: 'YouTube', href: '#' },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        aria-label={s.label}
                        className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center text-navy hover:bg-gold hover:text-navy transition-colors"
                      >
                        <s.icon size={18} aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — PLAN D'ACCÈS                                      */}
      {/* ============================================================ */}
      <section className="bg-white py-16 contact-map">
        <div className="container-isl">
          <div className="contact-fade-up text-center mb-12">
            <p className="section-label">ACCÈS</p>
            <div className="gold-divider mx-auto mb-6" />
            <h2 className="heading-page text-navy">Nous trouver</h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left — Map placeholder */}
            <div className="contact-map-left lg:w-1/2">
              <div className="relative rounded overflow-hidden shadow-isl bg-gray-100 aspect-[4/3]">
                {/* Embedded map iframe */}
                <iframe
                  title="Carte ISL - 17 rue de l'Université, 75007 Paris"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=2.326%2C48.852%2C2.336%2C48.858&amp;layer=mapnik&amp;marker=48.855%2C2.331"
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                />
                {/* Overlay badge */}
                <div className="absolute bottom-4 left-4 bg-navy text-white text-xs font-semibold px-4 py-2 rounded shadow-lg">
                  ISL — 17 rue de l'Université
                </div>
              </div>
            </div>

            {/* Right — Access info */}
            <div className="contact-map-right lg:w-1/2 space-y-6">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Adresse
                  </p>
                  <p className="body-regular text-navy">
                    17 rue de l'Université, 75007 Paris, France
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M3 9h18M9 3v18" stroke="currentColor" strokeWidth="2" />
                </svg>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Métro
                  </p>
                  <p className="body-regular text-gray-700">
                    Saint-Germain-des-Prés <span className="text-gray-500">(Ligne 4)</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true">
                  <path d="M4 16c0-4 4-8 8-8s8 4 8 8" stroke="currentColor" strokeWidth="2" fill="none" />
                  <rect x="2" y="16" width="20" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="7" r="2" stroke="currentColor" strokeWidth="2" />
                </svg>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    RER
                  </p>
                  <p className="body-regular text-gray-700">
                    RER C : Musée d'Orsay <span className="text-gray-500">— 8 min à pied</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true">
                  <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M7 18v2M17 18v2M3 10h18" stroke="currentColor" strokeWidth="2" />
                </svg>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Bus
                  </p>
                  <p className="body-regular text-gray-700">
                    Lignes 63, 70, 86, 87
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Vélib'
                  </p>
                  <p className="body-regular text-gray-700">
                    Station n° 7015 — 1 min
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true">
                  <rect x="3" y="8" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M7 8V6a2 2 0 012-2h6a2 2 0 012 2v2" stroke="currentColor" strokeWidth="2" />
                </svg>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Parking
                  </p>
                  <p className="body-regular text-gray-700">
                    Parking Saemes Hôtel des Invalides — 8 min à pied
                  </p>
                </div>
              </div>

              <div className="bg-cream rounded p-4 mt-4">
                <p className="body-small text-gray-600">
                  <span className="font-semibold text-navy">Accessibilité :</span> Accès PMR : 15
                  rue de Vaugirard (entrée secondaire)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5 — FAQ                                               */}
      {/* ============================================================ */}
      <section className="bg-cream py-16 contact-faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="contact-fade-up text-center mb-12">
            <p className="section-label">FAQ</p>
            <div className="gold-divider mx-auto mb-6" />
            <h2 className="heading-page text-navy">Questions fréquentes</h2>
          </div>

          <div className="space-y-3">
            {faqData.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="contact-faq-item bg-white rounded border border-gray-100 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                    aria-expanded={isOpen}
                    aria-controls={`faq-content-${index}`}
                  >
                    <span className="font-heading font-medium text-navy pr-4">{faq.question}</span>
                    <ChevronDown
                      size={20}
                      className={`text-gold flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-content-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4 body-regular text-gray-600 border-t border-gray-100 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
