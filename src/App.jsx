import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, Users, Package, BarChart2, Plus, Archive as ArchiveIcon } from 'lucide-react';
import { useUI } from './context/UIContext';
import NewJobModal from './components/NewJobModal';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Inventory from './pages/Inventory';
import Analytics from './pages/Analytics';
import Archive from './pages/Archive';
import DynamicClock from './components/DynamicClock';

function Sidebar() {
  const location = useLocation();
  const { setJobModalOpen } = useUI();
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { name: 'Customers', path: '/customers', icon: <Users size={20} /> },
    { name: 'Inventory', path: '/inventory', icon: <Package size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart2 size={20} /> },
    { name: 'Archive', path: '/archive', icon: <ArchiveIcon size={20} /> },
  ];

  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-header">
        <h2>Expert Stringing</h2>
        <div className="badge badge-ready">Pro</div>
      </div>
      <nav className="nav-menu">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button className="btn-primary" style={{ width: '100%' }} onClick={() => setJobModalOpen(true)}>
          <Plus size={18} /> New Job
        </button>
      </div>
    </aside>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content" style={{ position: 'relative' }}>
          <DynamicClock />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/archive" element={<Archive />} />
          </Routes>
        </main>
        <NewJobModal />
      </div>
    </Router>
  );
}

export default App;
