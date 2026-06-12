import { Routes, Route } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import Formations from './pages/Formations';
import FormationDetail from './pages/FormationDetail';
import Admission from './pages/Admission';
import Recherche from './pages/Recherche';
import Campus from './pages/Campus';
import Entreprises from './pages/Entreprises';
import Alumni from './pages/Alumni';
import International from './pages/International';
import About from './pages/About';
import Contact from './pages/Contact';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formations" element={<Formations />} />
        <Route path="/formations/:slug" element={<FormationDetail />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/recherche" element={<Recherche />} />
        <Route path="/campus" element={<Campus />} />
        <Route path="/entreprises" element={<Entreprises />} />
        <Route path="/alumni" element={<Alumni />} />
        <Route path="/international" element={<International />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/espace-etudiant" element={<StudentDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Layout>
  );
}
