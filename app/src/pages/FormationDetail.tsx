import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import {
  Clock, MapPin, Users, Euro, Download, Calendar,
  CheckCircle, ArrowLeft, Briefcase, TrendingUp, Award
} from 'lucide-react';

const programme = {
  title: 'Master Géopolitique & Relations Internationales',
  level: 'MASTER',
  duration: '2 ans',
  campus: 'Paris',
  intake: '45 étudiants',
  fees: '15 800 € / an',
  language: 'Français & Anglais',
  rncp: 'Niveau 7 RNCP',
  insertion: '94%',
  salary: '45k€',
};

const tabs = [
  { id: 'presentation', label: 'Présentation' },
  { id: 'admission', label: 'Admission' },
  { id: 'programme', label: 'Programme' },
  { id: 'debouches', label: 'Débouchés' },
];

const coursesS1 = [
  { name: 'Théories des Relations Internationales', hours: 36, ects: 5 },
  { name: 'Droit international public', hours: 30, ects: 4 },
  { name: 'Géopolitique contemporaine', hours: 36, ects: 5 },
  { name: 'Négociation internationale', hours: 24, ects: 3 },
  { name: 'Méthodologie de recherche', hours: 24, ects: 3 },
];

const coursesS2 = [
  { name: 'Diplomatie et pratiques négociales', hours: 36, ects: 5 },
  { name: 'Enjeux sécuritaires mondiaux', hours: 30, ects: 4 },
  { name: 'Droit des conflits armés', hours: 24, ects: 3 },
  { name: 'Géoéconomie', hours: 30, ects: 4 },
  { name: 'Stage professionnel', hours: 120, ects: 6 },
];

const careers = [
  { title: 'Diplomate / Consul', desc: 'Représentez votre pays à l\'étranger.' },
  { title: 'Analyste politique', desc: 'Analysez les dynamiques politiques et risques géopolitiques.' },
  { title: 'Responsable affaires publiques', desc: "Défendez les intérêts d'organisations auprès des institutions." },
  { title: 'Consultant ONG', desc: 'Coordonnez des projets humanitaires internationaux.' },
];

const testimonials = [
  { name: 'Sarah Benali', role: 'Promotion 2022', quote: "Ce Master m'a ouvert les portes du Quai d'Orsay.", image: '/testimonial-sarah.jpg' },
  { name: 'Antoine Morel', role: 'Promotion 2021', quote: 'Un réseau exceptionnel et des enseignants de haut niveau.', image: '/testimonial-antoine.jpg' },
];

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function FormationDetail() {
  const [activeTab, setActiveTab] = useState('presentation');

  return (
    <div>
      {/* Hero */}
      <section
        className="relative flex items-center overflow-hidden"
        style={{ minHeight: '50vh', background: 'linear-gradient(180deg, rgba(10,22,40,0.85) 0%, rgba(10,22,40,0.95) 100%)' }}
      >
        <div
          className="absolute inset-0 -z-10"
          style={{ backgroundImage: 'url(/formation-diplomacy.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="container-isl relative z-10 py-24">
          <Link to="/formations" className="inline-flex items-center gap-2 text-white/70 hover:text-gold text-sm mb-6 transition-colors">
            <ArrowLeft size={16} />
            Retour aux formations
          </Link>
          <motion.span className="section-label text-gold mb-4 block" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {programme.level} — Rentrée 2025
          </motion.span>
          <motion.h1 className="heading-hero text-white max-w-4xl mb-6" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.2 }}>
            {programme.title}
          </motion.h1>
          <motion.div className="flex flex-wrap gap-x-8 gap-y-3 mb-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.4 }}>
            <span className="inline-flex items-center gap-2 text-white/80"><Clock size={18} className="text-gold" />{programme.duration}</span>
            <span className="inline-flex items-center gap-2 text-white/80"><MapPin size={18} className="text-gold" />{programme.campus}</span>
            <span className="inline-flex items-center gap-2 text-white/80"><Users size={18} className="text-gold" />{programme.intake}</span>
            <span className="inline-flex items-center gap-2 text-white/80"><Euro size={18} className="text-gold" />{programme.fees}</span>
          </motion.div>
          <motion.div className="flex flex-wrap gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.6 }}>
            <Link to="/admission" className="btn-primary">Postuler</Link>
            <button className="btn-outline-light"><Download size={16} className="mr-2" />Brochure PDF</button>
          </motion.div>
        </div>
      </section>

      {/* Sticky Tab Nav */}
      <div className="sticky top-20 bg-white border-b border-gray-200 z-40">
        <div className="container-isl flex items-center gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); document.getElementById(tab.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
              className={`px-5 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${activeTab === tab.id ? 'text-navy border-gold' : 'text-gray-500 border-transparent hover:text-navy-light'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Presentation */}
      <section id="presentation" className="section-padding bg-white">
        <div className="container-isl">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <div className="gold-divider mb-6" />
              <h2 className="heading-page mb-8">Présentation</h2>
              <p className="body-large text-gray-600 mb-6">
                Le Master Géopolitique & Relations Internationales de l&apos;ISL forme depuis 30 ans les acteurs de la scène internationale. Anciens élèves au Quai d&apos;Orsay, à l&apos;ONU, dans les grandes ONG et organisations européennes.
              </p>
              <p className="body-large text-gray-600 mb-8">
                Le programme allie enseignement théorique rigoureux et immersion professionnelle : simulations de négociations internationales, stages obligatoires à l&apos;étranger, séminaires avec des diplomates en exercice.
              </p>
              <h3 className="heading-subsection text-navy mb-4">Objectifs pédagogiques</h3>
              <ul className="space-y-3 mb-8">
                {['Maîtriser les théories des relations internationales', 'Développer des compétences en négociation interculturelle', 'Acquérir une expertise juridique en droit international', 'Comprendre les enjeux géoéconomiques mondiaux'].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-600"><CheckCircle size={18} className="text-gold shrink-0 mt-0.5" />{item}</li>
                ))}
              </ul>
              <h3 className="heading-subsection text-navy mb-4">Compétences acquises</h3>
              <div className="flex flex-wrap gap-2">
                {['Analyse géopolitique', 'Négociation', 'Droit des traités', 'Leadership diplomatique', 'Anglais C1+'].map((skill) => (
                  <span key={skill} className="px-3 py-1.5 text-sm font-medium text-navy-light bg-cream border border-gray-200 rounded-sm">{skill}</span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-cream p-8 rounded border-l-[3px] border-gold">
                <h3 className="font-heading font-medium text-xl text-navy-light mb-6">Chiffres clés</h3>
                <div className="space-y-6">
                  <div><span className="stat-number text-2xl">{programme.insertion}</span><p className="text-sm text-gray-600">Taux d&apos;insertion à 6 mois</p></div>
                  <div className="gold-divider" />
                  <div><span className="stat-number text-2xl">{programme.salary}</span><p className="text-sm text-gray-600">Salaire médian premier emploi</p></div>
                  <div className="gold-divider" />
                  <div><span className="stat-number text-2xl">4.6/5</span><p className="text-sm text-gray-600">Satisfaction étudiants</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admission */}
      <section id="admission" className="section-padding bg-cream">
        <div className="container-isl">
          <div className="gold-divider mb-6" />
          <h2 className="heading-page mb-12">Conditions d&apos;admission</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded shadow-isl">
              <h3 className="heading-subsection text-navy mb-4">Prérequis</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2"><CheckCircle size={16} className="text-gold shrink-0 mt-1" />Licence en droit, science politique, histoire ou équivalent</li>
                <li className="flex items-start gap-2"><CheckCircle size={16} className="text-gold shrink-0 mt-1" />Moyenne générale supérieure à 14/20</li>
                <li className="flex items-start gap-2"><CheckCircle size={16} className="text-gold shrink-0 mt-1" />Niveau d&apos;anglais B2 minimum (TOEFL 90+)</li>
                <li className="flex items-start gap-2"><CheckCircle size={16} className="text-gold shrink-0 mt-1" />Lettre de motivation + 2 lettres de recommandation</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded shadow-isl">
              <h3 className="heading-subsection text-navy mb-4">Frais et bourses</h3>
              <p className="text-3xl font-heading font-bold text-gold mb-2">{programme.fees}</p>
              <p className="text-sm text-gray-600 mb-4">Frais de scolarité annuels</p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>&bull; Bourse Excellence ISL : jusqu&apos;à 10 000 &euro;/an</p>
                <p>&bull; Bourse sociale CROUS : selon QEU</p>
                <p>&bull; Alternance possible dès la 2ème année</p>
              </div>
            </div>
          </div>
          <div className="bg-navy p-8 rounded text-white">
            <h3 className="heading-subsection text-white mb-6">Calendrier des admissions</h3>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { date: '15 Nov 2024', title: 'Ouverture des candidatures', desc: 'Dépôt en ligne sur le portail ISL' },
                { date: '15 Fév 2025', title: 'Date limite', desc: 'Clôture des dépôts pour les Master 1' },
                { date: '30 Avr 2025', title: 'Résultats', desc: 'Notification des décisions d&apos;admission' },
              ].map((step) => (
                <div key={step.title} className="border-l-2 border-gold pl-4">
                  <p className="text-gold text-sm font-semibold mb-1">{step.date}</p>
                  <p className="font-medium mb-1">{step.title}</p>
                  <p className="text-white/60 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programme */}
      <section id="programme" className="section-padding bg-white">
        <div className="container-isl">
          <div className="gold-divider mb-6" />
          <h2 className="heading-page mb-12">Programme</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="heading-subsection text-navy mb-4">Semestre 1</h3>
              <div className="bg-cream rounded overflow-hidden">
                {coursesS1.map((c) => (
                  <div key={c.name} className="flex items-center justify-between px-5 py-3 border-b border-gray-200 last:border-0 hover:bg-white transition-colors">
                    <span className="text-navy-light flex-1 pr-4">{c.name}</span>
                    <span className="text-sm text-gray-500 w-16 text-right">{c.hours}h</span>
                    <span className="text-xs font-semibold bg-white text-navy px-2 py-1 rounded-sm ml-3 w-14 text-center">{c.ects} ECTS</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="heading-subsection text-navy mb-4">Semestre 2</h3>
              <div className="bg-cream rounded overflow-hidden">
                {coursesS2.map((c) => (
                  <div key={c.name} className="flex items-center justify-between px-5 py-3 border-b border-gray-200 last:border-0 hover:bg-white transition-colors">
                    <span className="text-navy-light flex-1 pr-4">{c.name}</span>
                    <span className="text-sm text-gray-500 w-16 text-right">{c.hours}h</span>
                    <span className="text-xs font-semibold bg-white text-navy px-2 py-1 rounded-sm ml-3 w-14 text-center">{c.ects} ECTS</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12 bg-navy/5 p-6 rounded">
            <p className="text-sm text-gray-600"><strong>Semestres 3 et 4</strong> : Spécialisation (géopolitique de l&apos;espace, sécurité internationale, ou géoéconomie), stage de 6 mois à l&apos;étranger et mémoire de recherche.</p>
          </div>
        </div>
      </section>

      {/* Debouches */}
      <section id="debouches" className="section-padding bg-navy">
        <div className="container-isl">
          <div className="gold-divider mb-6" />
          <h2 className="heading-page text-white mb-12">Débouchés professionnels</h2>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/5 border border-white/10 p-8 rounded text-center">
              <TrendingUp size={28} className="text-gold mx-auto mb-3" />
              <span className="stat-number">94%</span>
              <p className="text-white/60 text-sm mt-2">Taux d&apos;insertion &agrave; 6 mois</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded text-center">
              <Euro size={28} className="text-gold mx-auto mb-3" />
              <span className="stat-number">45k&euro;</span>
              <p className="text-white/60 text-sm mt-2">Salaire m&eacute;dian premier emploi</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded text-center">
              <Award size={28} className="text-gold mx-auto mb-3" />
              <span className="stat-number">87%</span>
              <p className="text-white/60 text-sm mt-2">En poste de cadre &agrave; 3 ans</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {careers.map((c) => (
              <div key={c.title} className="bg-white/5 border border-white/10 p-6 rounded">
                <Briefcase size={20} className="text-gold mb-3" />
                <h4 className="font-heading text-lg font-medium text-white mb-2">{c.title}</h4>
                <p className="text-white/60 text-sm">{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
            {["Quai d'Orsay", 'ONU', 'OCDE', 'Banque mondiale'].map((p) => (
              <span key={p} className="text-white text-sm font-medium">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-cream">
        <div className="container-isl">
          <div className="gold-divider mb-6" />
          <h2 className="heading-page mb-12">Ils t&eacute;moignent</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="testimonial-card">
                <p className="font-heading italic text-lg text-gray-700 mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="container-isl text-center">
          <div className="gold-divider mx-auto mb-6" />
          <h2 className="heading-section mb-6">Pr&ecirc;t &agrave; postuler ?</h2>
          <p className="body-large text-gray-600 max-w-2xl mx-auto mb-8">
            Les candidatures pour la rentr&eacute;e 2025 sont ouvertes jusqu&apos;au 15 f&eacute;vrier 2025.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/admission" className="btn-primary">
              <Calendar size={18} className="mr-2" />
              Candidater maintenant
            </Link>
            <Link to="/formations" className="btn-navy">
              <ArrowLeft size={18} className="mr-2" />
              Explorer les autres formations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
