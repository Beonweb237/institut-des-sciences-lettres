import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, BookOpen, Newspaper, FileText, Users,
  FolderOpen, MessageSquare, Mail, Calendar, UserCog, Image,
  Settings, Bell, Search, TrendingUp, TrendingDown, Eye,
  CheckCircle, XCircle, MoreHorizontal, Upload, Send, Paperclip,
  LogOut, Plus, ChevronLeft, ChevronRight, Edit3, Trash2, Copy,
  Archive, X, Filter, Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';

/* ─── Animation helpers ─── */
const staggerContainer = { animate: { transition: { staggerChildren: 0.08 } } };
const staggerItem = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

/* ─── Types ─── */
type AdminView = 'dashboard' | 'formations' | 'actualites' | 'pages' | 'admissions' | 'candidatures' | 'documents' | 'messagerie' | 'newsletter' | 'evenements' | 'utilisateurs' | 'medias' | 'parametres';

/* ─── Sidebar sections ─── */
const sidebarSections = [
  {
    label: 'CONTENU',
    items: [
      { key: 'dashboard' as AdminView, label: 'Tableau de bord', icon: LayoutDashboard },
      { key: 'formations' as AdminView, label: 'Formations', icon: BookOpen },
      { key: 'actualites' as AdminView, label: 'Actualités', icon: Newspaper },
      { key: 'pages' as AdminView, label: 'Pages', icon: FileText },
    ],
  },
  {
    label: 'CANDIDATURES',
    items: [
      { key: 'admissions' as AdminView, label: 'Admissions', icon: Users, badge: '47 nouvelles' },
      { key: 'candidatures' as AdminView, label: 'Candidatures', icon: FileText, badge: '128' },
      { key: 'documents' as AdminView, label: 'Documents', icon: FolderOpen },
    ],
  },
  {
    label: 'COMMUNICATION',
    items: [
      { key: 'messagerie' as AdminView, label: 'Messagerie', icon: MessageSquare, badge: '12' },
      { key: 'newsletter' as AdminView, label: 'Newsletter', icon: Mail },
      { key: 'evenements' as AdminView, label: 'Événements', icon: Calendar },
    ],
  },
  {
    label: 'PARAMÈTRES',
    items: [
      { key: 'utilisateurs' as AdminView, label: 'Utilisateurs', icon: UserCog },
      { key: 'medias' as AdminView, label: 'Médias', icon: Image },
      { key: 'parametres' as AdminView, label: 'Paramètres', icon: Settings },
    ],
  },
];

/* ─── Mock Data ─── */
const kpiData = [
  { label: 'Total Candidatures', value: 1247, change: '+12%', changeType: 'up' as const, icon: FileText, color: '#3B82F6' },
  { label: "Taux d'acceptation", value: '34%', change: '+2%', changeType: 'up' as const, icon: CheckCircle, color: '#10B981' },
  { label: 'Nouveaux étudiants', value: 423, change: '+8%', changeType: 'up' as const, icon: Users, color: '#F59E0B' },
  { label: 'Formations actives', value: 28, change: '+3', changeType: 'up' as const, icon: BookOpen, color: '#0A1628' },
];

// Line chart data: candidatures over 12 months
const candidaturesMonthly = [
  { month: 'Sep', value: 78 },
  { month: 'Oct', value: 112 },
  { month: 'Nov', value: 95 },
  { month: 'Déc', value: 134 },
  { month: 'Jan', value: 156 },
  { month: 'Fév', value: 189 },
  { month: 'Mar', value: 210 },
  { month: 'Avr', value: 175 },
  { month: 'Mai', value: 145 },
  { month: 'Juin', value: 98 },
  { month: 'Juil', value: 45 },
  { month: 'Août', value: 62 },
];

// Bar chart data: admissions by programme
const admissionsByProgramme = [
  { name: 'Master Cybersécurité', value: 128 },
  { name: 'Diplomatie & Relations Int.', value: 95 },
  { name: 'MBA Entrepreneuriat', value: 64 },
  { name: 'Master Finance', value: 87 },
  { name: 'Licence Droit', value: 72 },
  { name: 'Master IA & Data', value: 56 },
];

const formationsData = [
  { id: 1, nom: 'Diplomatie & Relations Internationales', niveau: 'Master', domaine: 'Droit & Politique', campus: 'Paris', places: 60, candidatures: 47, status: 'publiée' as const },
  { id: 2, nom: 'Cybersécurité & Systèmes d\'Information', niveau: 'Master', domaine: 'Sciences', campus: 'Paris', places: 80, candidatures: 128, status: 'publiée' as const },
  { id: 3, nom: 'Transition Écologique & Développement Durable', niveau: 'Master', domaine: 'Environnement', campus: 'Paris & Bordeaux', places: 40, candidatures: 34, status: 'publiée' as const },
  { id: 4, nom: 'Droit International des Affaires', niveau: 'Licence', domaine: 'Droit & Politique', campus: 'Paris', places: 50, candidatures: 0, status: 'brouillon' as const },
  { id: 5, nom: 'MBA Entrepreneuriat & Innovation', niveau: 'MBA', domaine: 'Management', campus: 'Paris', places: 35, candidatures: 22, status: 'publiée' as const },
  { id: 6, nom: 'Intelligence Artificielle & Data Science', niveau: 'Master', domaine: 'Sciences', campus: 'Bordeaux', places: 45, candidatures: 56, status: 'publiée' as const },
  { id: 7, nom: 'Finance Internationale', niveau: 'Master', domaine: 'Management', campus: 'Paris', places: 55, candidatures: 87, status: 'publiée' as const },
];

const admissionsData = [
  { id: '2025-0047', candidat: 'Thomas Martin', formation: 'Master Cybersécurité', dateDepot: '12/01/2025', status: 'instruction' as const, documents: '4/5' },
  { id: '2025-0046', candidat: 'Sarah Benmoussa', formation: 'Master Diplomatie', dateDepot: '10/01/2025', status: 'entretien' as const, documents: '5/5' },
  { id: '2025-0045', candidat: 'Antoine Morel', formation: 'Master Cybersécurité', dateDepot: '08/01/2025', status: 'validee' as const, documents: '5/5' },
  { id: '2025-0044', candidat: 'Yuki Tanaka', formation: 'Master Diplomatie', dateDepot: '05/01/2025', status: 'refusee' as const, documents: '5/5' },
  { id: '2025-0043', candidat: 'Lucas Bernard', formation: 'MBA Entrepreneuriat', dateDepot: '03/01/2025', status: 'instruction' as const, documents: '3/5' },
  { id: '2025-0042', candidat: 'Emma Petit', formation: 'Master Finance', dateDepot: '02/01/2025', status: 'entretien' as const, documents: '5/5' },
  { id: '2025-0041', candidat: 'Inès Durand', formation: 'Master IA & Data', dateDepot: '28/12/2024', status: 'validee' as const, documents: '5/5' },
  { id: '2025-0040', candidat: 'Khaled Meziane', formation: 'Master Cybersécurité', dateDepot: '27/12/2024', status: 'instruction' as const, documents: '4/5' },
];

const newsData = [
  { id: 1, titre: "L'ISL décroche un ERC Grant de 2,5M€", categorie: 'Recherche', auteur: 'Pierre L.', date: '15/01/2025', status: 'publiée' as const },
  { id: 2, titre: 'Inauguration du pôle innovation technologique', categorie: 'Campus', auteur: 'Marie D.', date: '08/01/2025', status: 'publiée' as const },
  { id: 3, titre: 'Le Prof. Martin reçoit la Médaille CNRS', categorie: 'Distinction', auteur: 'Pierre L.', date: '20/12/2024', status: 'publiée' as const },
  { id: 4, titre: 'JPO Mars 2025 — Programme complet', categorie: 'Admission', auteur: 'Sarah B.', date: null, status: 'brouillon' as const },
  { id: 5, titre: 'Partenariat avec Université de Tokyo', categorie: 'International', auteur: 'Marie D.', date: '18/12/2024', status: 'publiée' as const },
];

const messagesData = [
  { id: 1, expediteur: 'Thomas Martin', email: 'thomas.martin@email.com', sujet: 'Question Master Cybersécurité', apercu: 'Bonjour, je souhaiterais savoir si...', date: '10:23', status: 'non-lu' as const, formation: 'Master Cybersécurité' },
  { id: 2, expediteur: 'Capgemini RH', email: 'rh@capgemini.com', sujet: 'Partenariat stages 2025', apercu: 'Nous souhaiterions renouveler notre...', date: 'Hier', status: 'lu' as const, formation: null },
  { id: 3, expediteur: 'Yuki Tanaka', email: 'yuki.tanaka@email.com', sujet: 'Visa étudiant', apercu: 'Je suis étudiante japonaise et je...', date: 'Hier', status: 'lu' as const, formation: 'Master Diplomatie' },
  { id: 4, expediteur: 'L\'Oréal Talent', email: 'talent@loreal.com', sujet: 'Recrutement alternance', apercu: 'Nous recherchons des profils en...', date: 'Hier', status: 'non-lu' as const, formation: null },
  { id: 5, expediteur: 'Sophie Laurent', email: 'sophie@email.com', sujet: 'Demande de bourse', apercu: 'Je vous écris concernant ma demande...', date: 'Lun', status: 'non-lu' as const, formation: 'Licence Droit' },
  { id: 6, expediteur: 'Université de Genève', email: 'mobilite@unige.ch', sujet: 'Convention de mobilité', apercu: 'Dans le cadre de notre partenariat...', date: 'Lun', status: 'lu' as const, formation: null },
];

const recentActivity = [
  { action: 'Nouvelle candidature — Master Cybersécurité', user: 'Thomas Martin', date: 'Il y a 5 min' },
  { action: 'Document validé — Relevé de notes L3', user: 'Admin — Marie D.', date: 'Il y a 12 min' },
  { action: 'Actualité publiée — "Inauguration pôle innovation"', user: 'Admin — Pierre L.', date: 'Il y a 1h' },
  { action: 'Message reçu — Question frais de scolarité', user: 'Service Admissions', date: 'Il y a 2h' },
  { action: 'Candidature mise à jour — Diplomatie', user: 'Sarah Benmoussa', date: 'Il y a 3h' },
];

/* ─── Status helpers ─── */
function FormationStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    publiée: 'bg-[#10B981]/10 text-[#10B981]',
    brouillon: 'bg-[#F59E0B]/10 text-[#F59E0B]',
    archivee: 'bg-gray-100 text-gray-500',
  };
  return <Badge variant="secondary" className={`${styles[status] || ''} text-xs`}>{status === 'publiée' ? 'Publiée' : status === 'brouillon' ? 'Brouillon' : 'Archivée'}</Badge>;
}

function AdmissionStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    instruction: 'bg-[#F59E0B]/10 text-[#F59E0B]',
    entretien: 'bg-[#3B82F6]/10 text-[#3B82F6]',
    validee: 'bg-[#10B981]/10 text-[#10B981]',
    refusee: 'bg-[#DC2626]/10 text-[#DC2626]',
  };
  const labels: Record<string, string> = {
    instruction: 'En instruction',
    entretien: 'Entretien programmé',
    validee: 'Validée',
    refusee: 'Refusée',
  };
  return <Badge variant="secondary" className={`${styles[status] || ''} text-xs`}>{labels[status] || status}</Badge>;
}

/* ─── Simple CSS Line Chart ─── */
function SimpleLineChart() {
  const maxVal = Math.max(...candidaturesMonthly.map(d => d.value));
  const points = candidaturesMonthly.map((d, i) => {
    const x = (i / (candidaturesMonthly.length - 1)) * 100;
    const y = 100 - (d.value / maxVal) * 80 - 10;
    return `${x},${y}`;
  }).join(' ');
  const areaPoints = `0,100 ${points} 100,100`;

  return (
    <div className="w-full">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-52 overflow-visible">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Area */}
        <polygon points={areaPoints} fill="url(#areaGrad)" />
        {/* Line */}
        <polyline points={points} fill="none" stroke="#3B82F6" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
        {/* Data points */}
        {candidaturesMonthly.map((d, i) => {
          const x = (i / (candidaturesMonthly.length - 1)) * 100;
          const y = 100 - (d.value / maxVal) * 80 - 10;
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="1.2" fill="#C9A962" />
              <circle cx={x} cy={y} r="2" fill="transparent" stroke="#C9A962" strokeWidth="0.3" opacity="0.5" />
            </g>
          );
        })}
      </svg>
      {/* X-axis labels */}
      <div className="flex justify-between px-1 mt-2">
        {candidaturesMonthly.map((d, i) => (
          <span key={i} className="text-[10px] text-gray-400">{d.month}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── Horizontal Bar Chart ─── */
function HorizontalBarChart() {
  const maxVal = Math.max(...admissionsByProgramme.map(d => d.value));
  return (
    <div className="space-y-4">
      {admissionsByProgramme.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="text-xs text-gray-600 w-40 text-right truncate flex-shrink-0">{item.name}</span>
          <div className="flex-1 h-7 bg-gray-100 rounded-sm overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(item.value / maxVal) * 100}%` }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="h-full rounded-sm flex items-center justify-end px-2"
              style={{ background: 'linear-gradient(90deg, #0A1628 0%, #1E3A5F 100%)' }}
            >
              <span className="text-xs font-semibold text-white">{item.value}</span>
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── KPI Card ─── */
function AdminKPI({ data, index }: { data: typeof kpiData[0]; index: number }) {
  return (
    <motion.div variants={staggerItem}>
      <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2.5 rounded-lg" style={{ backgroundColor: `${data.color}15` }}>
              <data.icon size={20} style={{ color: data.color }} />
            </div>
            <div className={`flex items-center gap-1 text-xs font-medium ${data.changeType === 'up' ? 'text-[#10B981]' : 'text-[#DC2626]'}`}>
              {data.changeType === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {data.change}
            </div>
          </div>
          <div className="font-heading text-3xl font-bold text-[#0A1628] mb-1">{typeof data.value === 'number' ? data.value.toLocaleString() : data.value}</div>
          <div className="text-sm text-gray-500">{data.label}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   VIEW COMPONENTS
   ═══════════════════════════════════════════ */

function DashboardView() {
  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
      {/* KPIs */}
      <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {kpiData.map((kpi, i) => (
          <AdminKPI key={i} data={kpi} index={i} />
        ))}
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={staggerItem}>
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="font-heading text-base font-medium text-[#0A1628]">Candidatures par mois</CardTitle>
            </CardHeader>
            <CardContent><SimpleLineChart /></CardContent>
          </Card>
        </motion.div>
        <motion.div variants={staggerItem}>
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="font-heading text-base font-medium text-[#0A1628]">Admissions par formation</CardTitle>
            </CardHeader>
            <CardContent><HorizontalBarChart /></CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div variants={staggerItem}>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="font-heading text-base font-medium text-[#0A1628]">Activité récente</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Utilisateur</TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentActivity.map((a, i) => (
                    <TableRow key={i} className="hover:bg-gray-50/50">
                      <TableCell className="text-sm text-[#0A1628]">{a.action}</TableCell>
                      <TableCell className="text-sm text-gray-500">{a.user}</TableCell>
                      <TableCell className="text-sm text-gray-400 text-right">{a.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

function FormationsView() {
  const [filterStatus, setFilterStatus] = useState('tous');
  const [searchTerm, setSearchTerm] = useState('');
  const filtered = formationsData.filter(f => {
    const matchStatus = filterStatus === 'tous' || f.status === filterStatus;
    const matchSearch = f.nom.toLowerCase().includes(searchTerm.toLowerCase()) || f.domaine.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="heading-subsection text-[#0A1628]">Formations</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="text-xs h-9"><Upload size={14} className="mr-1.5" />Importer CSV</Button>
          <Button className="bg-gold text-navy hover:bg-gold-light text-xs h-9"><Plus size={14} className="mr-1.5" />Ajouter une formation</Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Rechercher une formation..." className="pl-9 h-9 text-sm" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <select className="h-9 px-3 border border-gray-200 rounded-md text-sm bg-white" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="tous">Tous les statuts</option>
          <option value="publiée">Publiée</option>
          <option value="brouillon">Brouillon</option>
        </select>
        <span className="text-sm text-gray-500">{filtered.length} formations</span>
      </div>

      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Formation</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Niveau</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Domaine</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Campus</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Places</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Candidatures</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Statut</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((f) => (
                <TableRow key={f.id} className="hover:bg-gray-50/50">
                  <TableCell className="font-medium text-sm text-[#0A1628] max-w-[250px] truncate">{f.nom}</TableCell>
                  <TableCell className="text-sm text-gray-600">{f.niveau}</TableCell>
                  <TableCell className="text-sm text-gray-600">{f.domaine}</TableCell>
                  <TableCell className="text-sm text-gray-600">{f.campus}</TableCell>
                  <TableCell className="text-sm text-gray-600 text-center">{f.places}</TableCell>
                  <TableCell className="text-sm text-gray-600 text-center">{f.candidatures || '—'}</TableCell>
                  <TableCell><FormationStatusBadge status={f.status} /></TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><Edit3 size={14} className="text-gray-500" /></Button></TooltipTrigger><TooltipContent><p>Éditer</p></TooltipContent></Tooltip></TooltipProvider>
                      <TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><Copy size={14} className="text-gray-500" /></Button></TooltipTrigger><TooltipContent><p>Dupliquer</p></TooltipContent></Tooltip></TooltipProvider>
                      <TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><Archive size={14} className="text-gray-400" /></Button></TooltipTrigger><TooltipContent><p>Archiver</p></TooltipContent></Tooltip></TooltipProvider>
                      <TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><Trash2 size={14} className="text-gray-400" /></Button></TooltipTrigger><TooltipContent><p>Supprimer</p></TooltipContent></Tooltip></TooltipProvider>
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

function AdmissionsView() {
  const [filterStatus, setFilterStatus] = useState('tous');
  const [filterFormation, setFilterFormation] = useState('tous');
  const filtered = admissionsData.filter(a => {
    const matchStatus = filterStatus === 'tous' || a.status === filterStatus;
    const matchForm = filterFormation === 'tous' || a.formation.includes(filterFormation);
    return matchStatus && matchForm;
  });

  const statsPills = [
    { label: '47 nouvelles', color: 'bg-[#F59E0B]/10 text-[#F59E0B]' },
    { label: '128 validées', color: 'bg-[#10B981]/10 text-[#10B981]' },
    { label: '23 en attente', color: 'bg-[#3B82F6]/10 text-[#3B82F6]' },
    { label: '8 à compléter', color: 'bg-[#DC2626]/10 text-[#DC2626]' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="heading-subsection text-[#0A1628]">Admissions</h2>
        <div className="flex flex-wrap gap-2">
          {statsPills.map((p, i) => (
            <Badge key={i} variant="secondary" className={`${p.color} text-xs px-3 py-1`}>{p.label}</Badge>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Nom, email, numéro candidat..." className="pl-9 h-9 text-sm" />
        </div>
        <select className="h-9 px-3 border border-gray-200 rounded-md text-sm bg-white" value={filterFormation} onChange={e => setFilterFormation(e.target.value)}>
          <option value="tous">Toutes les formations</option>
          <option value="Cybersécurité">Master Cybersécurité</option>
          <option value="Diplomatie">Master Diplomatie</option>
          <option value="MBA">MBA</option>
          <option value="Finance">Master Finance</option>
        </select>
        <select className="h-9 px-3 border border-gray-200 rounded-md text-sm bg-white" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="tous">Tous les statuts</option>
          <option value="instruction">En instruction</option>
          <option value="entretien">Entretien programmé</option>
          <option value="validee">Validée</option>
          <option value="refusee">Refusée</option>
        </select>
      </div>

      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">N°</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Candidat</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Formation</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Date dépôt</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Statut</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Documents</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((a) => (
                <TableRow key={a.id} className="hover:bg-gray-50/50">
                  <TableCell className="text-sm font-mono text-gray-600">{a.id}</TableCell>
                  <TableCell className="font-medium text-sm text-[#0A1628]">{a.candidat}</TableCell>
                  <TableCell className="text-sm text-gray-600">{a.formation}</TableCell>
                  <TableCell className="text-sm text-gray-500">{a.dateDepot}</TableCell>
                  <TableCell><AdmissionStatusBadge status={a.status} /></TableCell>
                  <TableCell className="text-sm text-gray-600 text-center">{a.documents}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm" className="h-8 text-xs">Voir</Button>
                      {a.status !== 'validee' && a.status !== 'refusee' && (
                        <>
                          <Button variant="ghost" size="sm" className="h-8 text-xs text-[#10B981] hover:text-[#10B981]">Valider</Button>
                          <Button variant="ghost" size="sm" className="h-8 text-xs text-[#DC2626] hover:text-[#DC2626]">Refuser</Button>
                        </>
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

function ActualitesView() {
  const [editorOpen, setEditorOpen] = useState(false);
  const [editArticle, setEditArticle] = useState<typeof newsData[0] | null>(null);

  const openEditor = (article?: typeof newsData[0]) => {
    setEditArticle(article || null);
    setEditorOpen(true);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="heading-subsection text-[#0A1628]">Actualités</h2>
        <Button className="bg-gold text-navy hover:bg-gold-light text-xs h-9" onClick={() => openEditor()}><Plus size={14} className="mr-1.5" />Nouvelle actualité</Button>
      </div>

      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Titre</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Catégorie</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Auteur</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Statut</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newsData.map((n) => (
                <TableRow key={n.id} className="hover:bg-gray-50/50">
                  <TableCell className="font-medium text-sm text-[#0A1628] max-w-[300px] truncate">{n.titre}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-[#C9A962]/10 text-[#C9A962] text-xs border-0">{n.categorie}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{n.auteur}</TableCell>
                  <TableCell className="text-sm text-gray-500">{n.date || '—'}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={n.status === 'publiée' ? 'bg-[#10B981]/10 text-[#10B981] text-xs' : 'bg-[#F59E0B]/10 text-[#F59E0B] text-xs'}>
                      {n.status === 'publiée' ? 'Publiée' : 'Brouillon'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditor(n)}><Edit3 size={14} className="text-gray-500" /></Button></TooltipTrigger><TooltipContent><p>Éditer</p></TooltipContent></Tooltip></TooltipProvider>
                      <TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><Eye size={14} className="text-gray-500" /></Button></TooltipTrigger><TooltipContent><p>Prévisualiser</p></TooltipContent></Tooltip></TooltipProvider>
                      <TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><Archive size={14} className="text-gray-400" /></Button></TooltipTrigger><TooltipContent><p>Archiver</p></TooltipContent></Tooltip></TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* News Editor Dialog */}
      <Dialog open={editorOpen} onOpenChange={setEditorOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading text-lg">
              {editArticle ? 'Modifier l\'actualité' : 'Nouvelle actualité'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Titre</label>
              <Input defaultValue={editArticle?.titre || ''} placeholder="Titre de l'actualité" className="text-sm" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Catégorie</label>
                <select className="w-full h-10 px-3 border border-gray-200 rounded-md text-sm bg-white">
                  <option>Recherche</option>
                  <option>Campus</option>
                  <option>Distinction</option>
                  <option>Admission</option>
                  <option>International</option>
                  <option>Alumni</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Date de publication</label>
                <Input type="date" className="text-sm" defaultValue={editArticle?.date || new Date().toISOString().split('T')[0]} />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Résumé</label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none"
                placeholder="Résumé pour les listes (160 caractères max)"
                defaultValue={editArticle ? 'Résumé de l\'article...' : ''}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Contenu</label>
              <textarea
                rows={8}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none"
                placeholder="Contenu de l'article..."
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Image de couverture</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gold transition-colors cursor-pointer">
                <Upload size={24} className="mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">Glissez une image ou cliquez pour parcourir</p>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Statut</label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="status" defaultChecked={editArticle?.status === 'publiée' || !editArticle} className="accent-gold" /> Publiée
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="status" defaultChecked={editArticle?.status === 'brouillon'} className="accent-gold" /> Brouillon
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
              <Button variant="outline" size="sm" className="h-9 text-xs" onClick={() => setEditorOpen(false)}>Annuler</Button>
              <Button variant="outline" size="sm" className="h-9 text-xs">Prévisualiser</Button>
              <Button size="sm" className="bg-gold text-navy hover:bg-gold-light h-9 text-xs">Enregistrer</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

function MessagerieView() {
  const [selectedMsg, setSelectedMsg] = useState<typeof messagesData[0] | null>(null);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
      <h2 className="heading-subsection text-[#0A1628]">Messagerie</h2>
      <div className="flex flex-col lg:flex-row gap-0 border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm min-h-[500px]">
        {/* Inbox */}
        <div className="w-full lg:w-[360px] border-r border-gray-200 flex flex-col">
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Rechercher..." className="pl-8 h-9 text-sm" />
            </div>
          </div>
          <Tabs defaultValue="tous" className="w-full">
            <TabsList className="w-full bg-transparent border-b border-gray-200 rounded-none h-auto p-0 gap-0">
              <TabsTrigger value="tous" className="flex-1 rounded-none text-xs py-2.5 data-[state=active]:bg-gray-50">Tous</TabsTrigger>
              <TabsTrigger value="non-lus" className="flex-1 rounded-none text-xs py-2.5 data-[state=active]:bg-gray-50">Non lus (12)</TabsTrigger>
              <TabsTrigger value="admissions" className="flex-1 rounded-none text-xs py-2.5 data-[state=active]:bg-gray-50">Admissions</TabsTrigger>
            </TabsList>
            <TabsContent value="tous" className="mt-0">
              <div className="divide-y divide-gray-50 max-h-[400px] overflow-y-auto">
                {messagesData.map((m) => (
                  <button key={m.id} onClick={() => setSelectedMsg(m)} className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${selectedMsg?.id === m.id ? 'bg-gray-50' : ''} ${m.status === 'non-lu' ? 'bg-[#3B82F6]/3' : ''}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-sm ${m.status === 'non-lu' ? 'font-semibold text-[#0A1628]' : 'font-medium text-gray-700'}`}>{m.expediteur}</span>
                      {m.status === 'non-lu' && <span className="w-2 h-2 rounded-full bg-[#3B82F6] flex-shrink-0" />}
                    </div>
                    <div className={`text-sm ${m.status === 'non-lu' ? 'font-medium text-[#0A1628]' : 'text-gray-600'} mb-0.5 truncate`}>{m.sujet}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400 truncate flex-1">{m.apercu}</span>
                      <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{m.date}</span>
                    </div>
                  </button>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="non-lus" className="mt-0">
              <div className="divide-y divide-gray-50 max-h-[400px] overflow-y-auto">
                {messagesData.filter(m => m.status === 'non-lu').map((m) => (
                  <button key={m.id} onClick={() => setSelectedMsg(m)} className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${selectedMsg?.id === m.id ? 'bg-gray-50' : ''}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm text-[#0A1628]">{m.expediteur}</span>
                      <span className="w-2 h-2 rounded-full bg-[#3B82F6] flex-shrink-0" />
                    </div>
                    <div className="text-sm font-medium text-[#0A1628] mb-0.5 truncate">{m.sujet}</div>
                    <div className="text-xs text-gray-400 truncate">{m.apercu}</div>
                  </button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Conversation */}
        <div className="flex-1 flex flex-col">
          {selectedMsg ? (
            <>
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-[#1E3A5F] text-white text-sm">{selectedMsg.expediteur.split(' ').map(w => w[0]).join('').slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-sm text-[#0A1628]">{selectedMsg.expediteur}</h4>
                    <p className="text-xs text-gray-500">{selectedMsg.email}{selectedMsg.formation ? ` · ${selectedMsg.formation}` : ''}</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-gray-50/50">
                <div className="bg-white rounded-lg rounded-bl-none p-4 shadow-sm max-w-[80%]">
                  <p className="text-sm text-[#0A1628]">{selectedMsg.sujet}</p>
                  <p className="text-sm text-gray-600 mt-2">{selectedMsg.apercu} Je vous prie de bien vouloir m'orienter dans mes démarches. Cordialement, {selectedMsg.expediteur}</p>
                  <span className="text-[10px] text-gray-400 mt-2 block">{selectedMsg.date}</span>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-end gap-2">
                  <textarea
                    rows={3}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none"
                    placeholder="Votre réponse..."
                  />
                  <div className="flex gap-1">
                    <Button variant="outline" size="icon" className="h-9 w-9 flex-shrink-0"><Paperclip size={16} className="text-gray-500" /></Button>
                    <Button size="icon" className="h-9 w-9 bg-gold text-navy hover:bg-gold-light flex-shrink-0"><Send size={16} /></Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <MessageSquare size={32} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">Sélectionnez un message pour voir la conversation</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Generic placeholder for other views ─── */
function PlaceholderView({ title, description }: { title: string; description: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
      <h2 className="heading-subsection text-[#0A1628]">{title}</h2>
      <Card className="border-0 shadow-sm">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Settings size={24} className="text-gray-400" />
          </div>
          <p className="text-gray-500 text-sm">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MAIN ADMIN DASHBOARD COMPONENT
   ═══════════════════════════════════════════ */
export default function AdminDashboard() {
  const [activeView, setActiveView] = useState<AdminView>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <DashboardView />;
      case 'formations': return <FormationsView />;
      case 'admissions':
      case 'candidatures': return <AdmissionsView />;
      case 'actualites': return <ActualitesView />;
      case 'messagerie': return <MessagerieView />;
      case 'pages': return <PlaceholderView title="Pages" description="Gestion des pages du site — fonctionnalité en cours de développement." />;
      case 'documents': return <PlaceholderView title="Documents" description="Gestion des documents candidats — fonctionnalité en cours de développement." />;
      case 'newsletter': return <PlaceholderView title="Newsletter" description="Gestion des newsletters — fonctionnalité en cours de développement." />;
      case 'evenements': return <PlaceholderView title="Événements" description="Gestion des événements — fonctionnalité en cours de développement." />;
      case 'utilisateurs': return <PlaceholderView title="Utilisateurs" description="Gestion des utilisateurs — fonctionnalité en cours de développement." />;
      case 'medias': return <PlaceholderView title="Médias" description="Gestion des médias — fonctionnalité en cours de développement." />;
      case 'parametres': return <PlaceholderView title="Paramètres" description="Paramètres du site — fonctionnalité en cours de développement." />;
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
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-[280px] bg-[#0A1628] flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden absolute top-4 right-4 text-white/60 hover:text-white">
          <X size={20} />
        </button>

        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-heading text-xl font-semibold text-[#C9A962] tracking-tight">ISL</span>
            <span className="font-heading text-sm font-medium text-white">Administration</span>
          </div>
        </div>

        {/* Nav sections */}
        <nav className="flex-1 p-4 overflow-y-auto">
          {sidebarSections.map((section) => (
            <div key={section.label} className="mb-5">
              <p className="px-4 text-[10px] font-semibold uppercase tracking-[0.08em] text-white/40 mb-2">{section.label}</p>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = activeView === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => { setActiveView(item.key); setSidebarOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-[#1E3A5F] text-white border-l-[3px] border-[#C9A962]'
                          : 'text-white/70 hover:bg-[#1E3A5F] hover:text-white border-l-[3px] border-transparent'
                      }`}
                    >
                      <item.icon size={17} />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span className="bg-[#C9A962]/20 text-[#C9A962] text-[10px] font-semibold px-1.5 py-0.5 rounded-full whitespace-nowrap">{item.badge}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Admin Profile */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-[#C9A962] text-[#0A1628] text-sm font-semibold">AD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin ISL</p>
              <p className="text-xs text-white/50">Direction</p>
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
              <div className="relative hidden sm:block max-w-xs">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input placeholder="Rechercher..." className="pl-9 h-9 text-sm bg-white" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative h-9 w-9">
                <Bell size={18} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#DC2626] rounded-full" />
              </Button>
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-[#1E3A5F] text-white text-sm">AD</AvatarFallback>
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
