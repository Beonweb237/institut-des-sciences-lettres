import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, FileText, FolderOpen, Calendar, Award,
  MessageSquare, Settings, Bell, CheckCircle, Clock, AlertCircle,
  Upload, Eye, Trash2, ChevronLeft, ChevronRight, LogOut,
  Search, BookOpen, Mail, HelpCircle, X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

/* ─── Animation helpers ─── */
const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};
const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};
const staggerItem = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

/* ─── Count-up hook ─── */
function useCountUp(target: number, duration = 2000, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return value;
}

/* ─── Types ─── */
type View = 'dashboard' | 'candidatures' | 'documents' | 'emploi-du-temps' | 'notes' | 'messagerie' | 'parametres';

/* ─── Sidebar nav items ─── */
const navItems: { key: View; label: string; icon: React.ElementType; badge?: number }[] = [
  { key: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { key: 'candidatures', label: 'Mes candidatures', icon: FileText },
  { key: 'documents', label: 'Mes documents', icon: FolderOpen },
  { key: 'emploi-du-temps', label: 'Mon emploi du temps', icon: Calendar },
  { key: 'notes', label: 'Mes notes', icon: Award },
  { key: 'messagerie', label: 'Messagerie', icon: MessageSquare, badge: 3 },
  { key: 'parametres', label: 'Paramètres', icon: Settings },
];

/* ─── Mock Data ─── */
const candidatures = [
  {
    id: 1,
    formation: 'Master Cybersécurité & Systèmes d\'Information',
    dateDepot: '12 janvier 2025',
    campus: 'Campus Paris',
    rentree: 'Septembre 2025',
    status: 'En cours d\'instruction',
    statusColor: 'bg-[#3B82F6]/10 text-[#3B82F6]',
    steps: [
      { label: 'Dossier reçu', done: true },
      { label: 'En cours d\'étude', done: true },
      { label: 'Entretien', done: false, current: true },
      { label: 'Décision', done: false },
    ],
    documents: [
      { name: 'Relevé de notes L3', status: 'validé' as const },
      { name: 'Lettre de motivation', status: 'validé' as const },
      { name: 'CV', status: 'validé' as const },
      { name: 'Lettres de recommandation (x2)', status: 'validé' as const },
      { name: 'Certificat d\'anglais', status: 'attente' as const },
    ],
  },
  {
    id: 2,
    formation: 'Diplomatie & Relations Internationales',
    dateDepot: '08 janvier 2025',
    campus: 'Campus Paris',
    rentree: 'Septembre 2025',
    status: 'Dossier complet',
    statusColor: 'bg-[#10B981]/10 text-[#10B981]',
    steps: [
      { label: 'Dossier reçu', done: true },
      { label: 'En cours d\'étude', done: true },
      { label: 'Entretien', done: true },
      { label: 'Décision', done: false, current: true },
    ],
    documents: [
      { name: 'Relevé de notes L3', status: 'validé' as const },
      { name: 'Lettre de motivation', status: 'validé' as const },
      { name: 'CV', status: 'validé' as const },
      { name: 'Lettre de recommandation', status: 'validé' as const },
    ],
  },
  {
    id: 3,
    formation: 'MBA Entrepreneuriat & Innovation',
    dateDepot: '15 janvier 2025',
    campus: 'Campus Bordeaux',
    rentree: 'Septembre 2025',
    status: 'Dossier reçu',
    statusColor: 'bg-[#F59E0B]/10 text-[#F59E0B]',
    steps: [
      { label: 'Dossier reçu', done: true },
      { label: 'En cours d\'étude', done: false, current: true },
      { label: 'Entretien', done: false },
      { label: 'Décision', done: false },
    ],
    documents: [
      { name: 'Relevé de notes', status: 'validé' as const },
      { name: 'Lettre de motivation', status: 'attente' as const },
      { name: 'CV', status: 'validé' as const },
      { name: 'Lettre de recommandation', status: 'attente' as const },
    ],
  },
];

const documentsData = [
  { name: 'Relevé de notes L3', type: 'PDF', date: '12/01/2025', status: 'validé' as const },
  { name: 'Lettre de motivation', type: 'PDF', date: '12/01/2025', status: 'validé' as const },
  { name: 'CV', type: 'PDF', date: '10/01/2025', status: 'validé' as const },
  { name: 'Lettre de recommandation 1', type: 'PDF', date: '08/01/2025', status: 'validé' as const },
  { name: 'Lettre de recommandation 2', type: 'PDF', date: '05/01/2025', status: 'attente' as const },
  { name: 'Certificat TOEFL', type: 'PDF', date: '—', status: 'manquant' as const },
];

const timetableEvents = [
  { day: 1, start: 9, end: 12, title: 'Relations Internationales', room: 'Amphi A', color: 'bg-[#0A1628]/10 border-l-4 border-[#0A1628]' },
  { day: 1, start: 14, end: 17, title: 'Droit International', room: 'Salle 204', color: 'bg-[#3B82F6]/10 border-l-4 border-[#3B82F6]' },
  { day: 2, start: 10, end: 12, title: 'Économie Politique', room: 'Amphi B', color: 'bg-[#10B981]/10 border-l-4 border-[#10B981]' },
  { day: 3, start: 9, end: 13, title: 'Atelier Négociation', room: 'Salle 305', color: 'bg-[#C9A962]/15 border-l-4 border-[#C9A962]' },
  { day: 4, start: 14, end: 18, title: 'Séminaire Recherche', room: 'Labo 101', color: 'bg-[#10B981]/10 border-l-4 border-[#10B981]' },
  { day: 4, start: 9, end: 11, title: 'Méthodologie', room: 'Salle 201', color: 'bg-[#3B82F6]/10 border-l-4 border-[#3B82F6]' },
  { day: 5, start: 10, end: 12, title: 'Langue Vivante', room: 'Salle 108', color: 'bg-[#F59E0B]/10 border-l-4 border-[#F59E0B]' },
];

const gradesData = [
  { course: 'Théories des Relations Internationales', coef: 6, grade: 14.5, avg: 12.3 },
  { course: 'Droit International', coef: 5, grade: 16, avg: 13.1 },
  { course: 'Économie Politique', coef: 5, grade: 13, avg: 11.8 },
  { course: 'Négociation', coef: 5, grade: 15, avg: 12.7 },
  { course: 'Méthodologie', coef: 3, grade: 17, avg: 14.2 },
];

const announcements = [
  { title: 'Journée Portes Ouvertes — 15 mars 2025', category: 'Événement', date: '10 fév. 2025', excerpt: 'Venez découvrir le campus et rencontrer les équipes pédagogiques.' },
  { title: 'Nouveau partenariat avec Sciences Po', category: 'International', date: '05 fév. 2025', excerpt: 'Un double diplome exceptionnel dès la rentrée 2025.' },
  { title: 'Rappel : date limite de bourse', category: 'Administration', date: '01 fév. 2025', excerpt: 'Les dossiers de demande de bourse doivent être déposés avant le 28 février.' },
];

const activityFeed = [
  { icon: CheckCircle, text: "Document 'Relevé de notes L3' validé", time: 'Il y a 2h', color: '#10B981' },
  { icon: MessageSquare, text: 'Nouveau message du Service des Admissions', time: 'Il y a 5h', color: '#F59E0B' },
  { icon: Clock, text: 'Rappel : date limite de dépôt du dossier — 15 février', time: 'Il y a 1j', color: '#C9A962' },
  { icon: FileText, text: "Candidature 'Master Cybersécurité' mise à jour", time: 'Il y a 2j', color: '#3B82F6' },
];

const deadlines = [
  { date: '15 FÉV', label: 'Dépôt dossier complet — Master Cybersécurité', urgency: 'error' as const },
  { date: '01 MARS', label: 'Entretien de motivation — Diplomatie', urgency: 'warning' as const },
  { date: '30 AVRIL', label: 'Résultats d\'admission', urgency: 'info' as const },
];

/* ─── Status badge helper ─── */
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    validé: 'bg-[#10B981]/10 text-[#10B981]',
    attente: 'bg-[#F59E0B]/10 text-[#F59E0B]',
    manquant: 'bg-[#DC2626]/10 text-[#DC2626]',
  };
  const icons: Record<string, React.ElementType> = {
    validé: CheckCircle,
    attente: Clock,
    manquant: AlertCircle,
  };
  const Icon = icons[status] || Clock;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${styles[status] || ''}`}>
      <Icon size={12} />
      {status === 'validé' ? 'Validé' : status === 'attente' ? 'En attente' : 'À fournir'}
    </span>
  );
}

/* ─── Quick Links ─── */
const quickLinks = [
  { label: 'Admission', icon: FileText, href: '/admission' },
  { label: 'Bibliothèque', icon: BookOpen, href: '#' },
  { label: 'Messagerie', icon: Mail, href: '#' },
  { label: 'Paramètres', icon: Settings, href: '#' },
];

/* ─── KPI Card ─── */
function KPICard({ icon: Icon, value, label, sub, accent, delay }: {
  icon: React.ElementType; value: string; label: string; sub?: string; accent: string; delay: number;
}) {
  return (
    <motion.div variants={staggerItem} className="flex-1 min-w-[200px]">
      <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300" style={{ borderLeft: `3px solid ${accent}` }}>
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className={`p-2.5 rounded-lg`} style={{ backgroundColor: `${accent}15` }}>
              <Icon size={20} style={{ color: accent }} />
            </div>
            {sub && <span className="text-xs text-gray-400">{sub}</span>}
          </div>
          <div className="font-heading text-2xl font-bold text-[#0A1628] mb-0.5">{value}</div>
          <div className="text-sm text-gray-500">{label}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ─── Stepper ─── */
function Stepper({ steps }: { steps: { label: string; done: boolean; current?: boolean }[] }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors duration-300 ${
              step.done ? 'bg-[#10B981] text-white' : step.current ? 'bg-[#C9A962] text-[#0A1628]' : 'bg-gray-200 text-gray-400'
            }`}>
              {step.done ? <CheckCircle size={16} /> : i + 1}
            </div>
            <span className={`text-xs mt-1 font-medium ${step.done || step.current ? 'text-[#0A1628]' : 'text-gray-400'}`}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-8 h-0.5 mb-5 ${step.done ? 'bg-[#10B981]' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Dashboard View ─── */
function DashboardView() {
  const [startCount, setStartCount] = useState(false);
  useEffect(() => { setStartCount(true); }, []);
  const c1 = useCountUp(2, 2000, startCount);
  const c2 = useCountUp(5, 2000, startCount);
  const c3 = useCountUp(3, 2000, startCount);

  const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
      {/* Welcome Banner */}
      <motion.div variants={staggerItem} className="rounded-lg p-6 lg:p-8 text-white" style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1E3A5F 100%)' }}>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-heading text-2xl lg:text-3xl font-medium text-white mb-2">Bonjour, Thomas</h2>
            <p className="text-white/80 text-sm lg:text-base mb-4">Vous avez 2 candidatures en cours et 3 messages non lus.</p>
            <Button variant="outline" className="border-white text-white bg-transparent hover:bg-white hover:text-[#0A1628] text-xs h-9 px-4">
              Voir mes candidatures
            </Button>
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-white/60 text-sm capitalize">{today}</p>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <KPICard icon={FileText} value={String(c1)} label="Candidatures en cours" accent="#C9A962" delay={0} />
        <KPICard icon={FolderOpen} value={String(c2)} label="Documents validés" accent="#3B82F6" delay={0.1} />
        <KPICard icon={Calendar} value="15 FÉV" label="Prochaine échéance" sub="Dépôt dossier" accent="#10B981" delay={0.2} />
        <KPICard icon={MessageSquare} value={String(c3)} label="Messages non lus" accent="#F59E0B" delay={0.3} />
      </motion.div>

      {/* Candidatures Tracker */}
      <motion.div variants={staggerItem}>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="font-heading text-lg font-medium text-[#0A1628]">Suivi des candidatures</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {candidatures.map((c) => (
              <div key={c.id} className="border border-gray-100 rounded-lg p-4 lg:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h4 className="font-heading font-medium text-base text-[#0A1628] mb-1">{c.formation}</h4>
                    <p className="text-xs text-gray-500">Déposée le {c.dateDepot} | {c.campus} | Rentrée {c.rentree}</p>
                  </div>
                  <Badge variant="secondary" className={c.statusColor}>{c.status}</Badge>
                </div>
                <Stepper steps={c.steps} />
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <motion.div variants={staggerItem} className="xl:col-span-2">
          <Card className="border-0 shadow-sm h-full">
            <CardHeader className="pb-3">
              <CardTitle className="font-heading text-lg font-medium text-[#0A1628]">Activité récente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {activityFeed.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors">
                  <div className="mt-0.5 flex-shrink-0"><item.icon size={18} style={{ color: item.color }} /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#0A1628]">{item.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Deadlines */}
        <motion.div variants={staggerItem}>
          <Card className="border-0 shadow-sm h-full">
            <CardHeader className="pb-3">
              <CardTitle className="font-heading text-lg font-medium text-[#0A1628]">Échéances à venir</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {deadlines.map((d, i) => {
                const borderColors = { error: '#DC2626', warning: '#D97706', info: '#3B82F6' };
                return (
                  <div key={i} className="p-4 rounded-lg bg-white border" style={{ borderLeft: `3px solid ${borderColors[d.urgency]}` }}>
                    <div className="text-xs font-bold tracking-wider mb-1" style={{ color: borderColors[d.urgency] }}>{d.date}</div>
                    <div className="text-sm text-[#0A1628]">{d.label}</div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── Candidatures View ─── */
function CandidaturesView() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="heading-subsection text-[#0A1628]">Mes candidatures</h2>
        <Button className="bg-gold text-navy hover:bg-gold-light text-xs h-9 px-4">Nouvelle candidature +</Button>
      </div>
      {candidatures.map((c) => (
        <Card key={c.id} className="border-0 shadow-sm">
          <CardContent className="p-5 lg:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <div>
                <h4 className="font-heading font-medium text-lg text-[#0A1628] mb-1">{c.formation}</h4>
                <p className="text-sm text-gray-500">Déposée le {c.dateDepot} | {c.campus} | Rentrée {c.rentree}</p>
              </div>
              <Badge variant="secondary" className={c.statusColor}>{c.status}</Badge>
            </div>
            <div className="mb-5"><Stepper steps={c.steps} /></div>
            <div className="border-t border-gray-100 pt-4">
              <h5 className="text-sm font-semibold text-[#0A1628] mb-3">Documents</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {c.documents.map((d, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    {d.status === 'validé' ? <CheckCircle size={14} className="text-[#10B981]" /> : <Clock size={14} className="text-[#F59E0B]" />}
                    <span className="text-gray-700">{d.name}</span>
                    <StatusBadge status={d.status} />
                  </div>
                ))}
              </div>
            </div>
            {c.steps.find(s => s.current)?.label === 'Entretien' && (
              <div className="mt-4 p-3 rounded-lg bg-[#F59E0B]/5 text-sm text-[#0A1628]">
                Votre entretien de motivation est programmé pour le 1er mars 2025.
              </div>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="text-xs h-8">Modifier mon dossier</Button>
              <Button variant="outline" size="sm" className="text-xs h-8">Ajouter un document</Button>
              <Button variant="ghost" size="sm" className="text-xs h-8">Contacter les admissions</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </motion.div>
  );
}

/* ─── Documents View ─── */
function DocumentsView() {
  const [uploadOpen, setUploadOpen] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="heading-subsection text-[#0A1628]">Mes documents</h2>
        <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gold text-navy hover:bg-gold-light text-xs h-9 px-4">Téléverser un document +</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader><DialogTitle className="font-heading">Téléverser un document</DialogTitle></DialogHeader>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gold transition-colors cursor-pointer">
              <Upload size={32} className="mx-auto mb-3 text-gray-400" />
              <p className="text-sm text-gray-600 mb-1">Glissez un fichier ici ou cliquez pour parcourir</p>
              <p className="text-xs text-gray-400">PDF, JPG, PNG — Max 10Mo</p>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" size="sm" onClick={() => setUploadOpen(false)}>Annuler</Button>
              <Button size="sm" className="bg-gold text-navy hover:bg-gold-light">Téléverser</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Document</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Statut</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documentsData.map((d, i) => (
                <TableRow key={i} className="hover:bg-gray-50/50">
                  <TableCell className="font-medium text-sm text-[#0A1628]">{d.name}</TableCell>
                  <TableCell className="text-sm text-gray-500">{d.type}</TableCell>
                  <TableCell className="text-sm text-gray-500">{d.date}</TableCell>
                  <TableCell><StatusBadge status={d.status} /></TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><Eye size={14} className="text-gray-500" /></Button></TooltipTrigger><TooltipContent><p>Voir</p></TooltipContent></Tooltip></TooltipProvider>
                      {d.status !== 'manquant' && (
                        <TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><Trash2 size={14} className="text-gray-400" /></Button></TooltipTrigger><TooltipContent><p>Supprimer</p></TooltipContent></Tooltip></TooltipProvider>
                      )}
                      {d.status === 'manquant' && (
                        <Button variant="ghost" size="sm" className="h-8 text-xs text-gold hover:text-gold-light">Téléverser</Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </motion.div>
  );
}

/* ─── Emploi du Temps View ─── */
function TimetableView() {
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'];
  const fullDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  const hours = Array.from({ length: 11 }, (_, i) => i + 8); // 8h-18h
  const today = new Date().getDay(); // 1 = Monday

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="heading-subsection text-[#0A1628]">Mon emploi du temps</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Button variant="outline" size="icon" className="h-8 w-8"><ChevronLeft size={16} /></Button>
          <span className="font-medium text-sm">Semaine du 10 au 16 février 2025</span>
          <Button variant="outline" size="icon" className="h-8 w-8"><ChevronRight size={16} /></Button>
        </div>
      </div>
      <Card className="border-0 shadow-sm overflow-hidden">
        <CardContent className="p-0 overflow-x-auto">
          <div className="min-w-[700px]">
            {/* Header row */}
            <div className="grid grid-cols-[60px_repeat(5,1fr)] border-b border-gray-100">
              <div className="p-3 border-r border-gray-100 bg-gray-50" />
              {days.map((d, i) => (
                <div key={d} className={`p-3 text-center text-sm font-semibold ${i + 1 === today ? 'bg-[#C9A962]/10 text-[#C9A962]' : 'text-[#0A1628]'}`}>
                  {d}
                </div>
              ))}
            </div>
            {/* Grid */}
            {hours.map((h) => (
              <div key={h} className="grid grid-cols-[60px_repeat(5,1fr)] border-b border-gray-50 relative" style={{ height: '64px' }}>
                <div className="p-2 text-xs text-gray-400 border-r border-gray-100 bg-gray-50/50 text-right pr-3">{h}h</div>
                {days.map((_, dayIndex) => {
                  const event = timetableEvents.find(e => e.day === dayIndex + 1 && e.start === h);
                  return (
                    <div key={dayIndex} className={`border-r border-gray-50 relative ${dayIndex + 1 === today ? 'bg-[#C9A962]/3' : ''}`}>
                      {event && (
                        <div className={`absolute inset-x-1 top-1 rounded p-2 text-xs ${event.color}`} style={{ height: `${(event.end - event.start) * 64 - 8}px`, zIndex: 10 }}>
                          <div className="font-semibold text-[#0A1628] truncate">{event.title}</div>
                          <div className="text-gray-500 truncate">{event.room}</div>
                          <div className="text-gray-400">{event.start}h-{event.end}h</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ─── Notes View ─── */
function NotesView() {
  const weightedSum = gradesData.reduce((acc, g) => acc + g.grade * g.coef, 0);
  const totalCoef = gradesData.reduce((acc, g) => acc + g.coef, 0);
  const average = (weightedSum / totalCoef).toFixed(1);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
      <h2 className="heading-subsection text-[#0A1628]">Mes notes</h2>
      <Tabs defaultValue="s1" className="w-full">
        <TabsList className="bg-gray-100">
          <TabsTrigger value="s1" className="text-xs">Semestre 1 — 2024/2025</TabsTrigger>
          <TabsTrigger value="s2" className="text-xs" disabled>Semestre 2 — 2024/2025</TabsTrigger>
        </TabsList>
        <TabsContent value="s1">
          <Card className="border-0 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Cours</TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Coefficient</TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Note</TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Moyenne promo</TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Résultat</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gradesData.map((g, i) => (
                    <TableRow key={i} className="hover:bg-gray-50/50">
                      <TableCell className="font-medium text-sm text-[#0A1628]">{g.course}</TableCell>
                      <TableCell className="text-sm text-gray-600 text-center">{g.coef}</TableCell>
                      <TableCell className="text-sm font-semibold text-[#0A1628] text-center">{g.grade}/20</TableCell>
                      <TableCell className="text-sm text-gray-500 text-center">{g.avg}</TableCell>
                      <TableCell className="text-center"><CheckCircle size={16} className="text-[#10B981] inline" /></TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-[#C9A962]/10 font-semibold">
                    <TableCell className="text-sm text-[#0A1628]">Moyenne générale</TableCell>
                    <TableCell className="text-sm text-[#0A1628] text-center">{totalCoef}</TableCell>
                    <TableCell className="text-sm text-[#0A1628] text-center">{average}/20</TableCell>
                    <TableCell className="text-sm text-gray-600 text-center">12.8</TableCell>
                    <TableCell className="text-xs text-[#10B981] text-center">Mention Bien</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

/* ─── Messagerie View ─── */
function MessagerieView() {
  const messages = [
    { sender: 'Service des Admissions', subject: 'Votre candidature Master Cybersécurité', preview: 'Nous accusons réception de votre dossier...', date: '10 fév.', unread: true },
    { sender: 'Scolarité', subject: 'Confirmation d\'inscription', preview: 'Votre inscription pour le semestre 2 est confirmée.', date: '08 fév.', unread: true },
    { sender: 'Prof. Martin', subject: 'Séminaire de recherche', preview: 'Le séminaire de cette semaine est déplacé...', date: '05 fév.', unread: true },
    { sender: 'Bibliothèque', subject: 'Retour de document', preview: 'Veuillez retourner le livre "Théories des RI"...', date: '01 fév.', unread: false },
  ];
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
      <h2 className="heading-subsection text-[#0A1628]">Messagerie</h2>
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          {messages.map((m, i) => (
            <div key={i} className={`flex items-start gap-4 p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors cursor-pointer ${m.unread ? 'bg-[#3B82F6]/3' : ''}`}>
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarFallback className="bg-[#1E3A5F] text-white text-xs">{m.sender.split(' ').map(w => w[0]).join('').slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-sm ${m.unread ? 'font-semibold text-[#0A1628]' : 'font-medium text-gray-700'}`}>{m.sender}</span>
                  {m.unread && <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />}
                </div>
                <div className={`text-sm ${m.unread ? 'font-medium text-[#0A1628]' : 'text-gray-600'}`}>{m.subject}</div>
                <div className="text-xs text-gray-400 truncate">{m.preview}</div>
              </div>
              <span className="text-xs text-gray-400 flex-shrink-0">{m.date}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ─── Paramètres View ─── */
function ParametresView() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
      <h2 className="heading-subsection text-[#0A1628]">Paramètres</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader><CardTitle className="font-heading text-base font-medium text-[#0A1628]">Informations personnelles</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {['Nom', 'Prénom', 'Email', 'Téléphone'].map((label) => (
              <div key={label}>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">{label}</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" defaultValue={label === 'Nom' ? 'Martin' : label === 'Prénom' ? 'Thomas' : label === 'Email' ? 'thomas.martin@etudiant.isl.fr' : '+33 6 12 34 56 78'} />
              </div>
            ))}
            <Button className="bg-gold text-navy hover:bg-gold-light text-xs h-9 mt-2">Enregistrer</Button>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardHeader><CardTitle className="font-heading text-base font-medium text-[#0A1628]">Sécurité</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {['Mot de passe actuel', 'Nouveau mot de passe', 'Confirmer le mot de passe'].map((label) => (
              <div key={label}>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">{label}</label>
                <input type="password" className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" placeholder="••••••••" />
              </div>
            ))}
            <Button className="bg-gold text-navy hover:bg-gold-light text-xs h-9 mt-2">Modifier le mot de passe</Button>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MAIN STUDENT DASHBOARD COMPONENT
   ═══════════════════════════════════════════ */
export default function StudentDashboard() {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <DashboardView />;
      case 'candidatures': return <CandidaturesView />;
      case 'documents': return <DocumentsView />;
      case 'emploi-du-temps': return <TimetableView />;
      case 'notes': return <NotesView />;
      case 'messagerie': return <MessagerieView />;
      case 'parametres': return <ParametresView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="min-h-[100dvh] flex">
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-[260px] bg-[#0A1628] flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Close button mobile */}
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden absolute top-4 right-4 text-white/60 hover:text-white">
          <X size={20} />
        </button>

        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-heading text-xl font-semibold text-[#C9A962] tracking-tight">ISL</span>
            <span className="font-heading text-sm font-medium text-white">Espace Étudiant</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeView === item.key;
            return (
              <button
                key={item.key}
                onClick={() => { setActiveView(item.key); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#1E3A5F] text-white border-l-[3px] border-[#C9A962]'
                    : 'text-white/70 hover:bg-[#1E3A5F] hover:text-white border-l-[3px] border-transparent'
                }`}
              >
                <item.icon size={18} />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="bg-[#C9A962] text-[#0A1628] text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">{item.badge}</span>
                )}
              </button>
            );
          })}

          {/* Quick Links section */}
          <div className="pt-6 mt-6 border-t border-white/10">
            <p className="px-4 text-[10px] font-semibold uppercase tracking-[0.08em] text-white/40 mb-2">Liens rapides</p>
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded text-sm text-white/60 hover:bg-[#1E3A5F] hover:text-white transition-all duration-200"
              >
                <link.icon size={16} />
                <span>{link.label}</span>
              </a>
            ))}
          </div>

          {/* Announcements */}
          <div className="pt-6 mt-6 border-t border-white/10">
            <p className="px-4 text-[10px] font-semibold uppercase tracking-[0.08em] text-white/40 mb-3">Annonces</p>
            <div className="space-y-3 px-3">
              {announcements.map((a, i) => (
                <div key={i} className="p-3 rounded bg-[#1E3A5F]/50 hover:bg-[#1E3A5F] transition-colors cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-[#C9A962]/20 text-[#C9A962] text-[9px] px-1.5 py-0 border-0">{a.category}</Badge>
                    <span className="text-[10px] text-white/40">{a.date}</span>
                  </div>
                  <p className="text-xs text-white/80 font-medium leading-snug mb-1">{a.title}</p>
                  <p className="text-[10px] text-white/50 line-clamp-2">{a.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-[#C9A962] text-[#0A1628] text-sm font-semibold">TM</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Thomas Martin</p>
              <p className="text-xs text-white/50">Candidat 2025</p>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-white/40 hover:text-white transition-colors"><LogOut size={16} /></button>
                </TooltipTrigger>
                <TooltipContent><p>Déconnexion</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#F9FAFB] min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#F9FAFB]/95 backdrop-blur-sm border-b border-gray-200 px-6 lg:px-10 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="lg:hidden h-9 w-9" onClick={() => setSidebarOpen(true)}>
                <LayoutDashboard size={16} />
              </Button>
              <div>
                <h1 className="font-heading text-xl font-medium text-[#0A1628]">
                  {navItems.find(n => n.key === activeView)?.label || 'Tableau de bord'}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative h-9 w-9">
                <Bell size={18} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#DC2626] rounded-full" />
              </Button>
              <Avatar className="h-9 w-9 hidden sm:flex">
                <AvatarFallback className="bg-[#1E3A5F] text-white text-sm">TM</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 lg:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
