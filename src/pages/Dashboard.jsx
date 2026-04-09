import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { CheckCircle, Clock, CreditCard, ChevronRight, Activity, FileText } from 'lucide-react';
import { generateInvoice } from '../utils/pdfGenerator';
import JobDetailsModal from '../components/JobDetailsModal';
import './Dashboard.css';

function Dashboard() {
  const [selectedJob, setSelectedJob] = useState(null);
  const jobs = useLiveQuery(() => db.jobs.toArray()) || [];

  const pending = jobs.filter(j => j.status === 'Pending').length;
  const ready = jobs.filter(j => j.status === 'Ready').length;
  const unpaid = jobs.filter(j => j.status !== 'Paid').length;

  const handleUpdateStatus = async (id, currentStatus) => {
    let nextStatus = 'Ready';
    if (currentStatus === 'Ready') nextStatus = 'Paid';
    if (currentStatus === 'Paid') nextStatus = 'Pending'; // optional cycle
    
    await db.jobs.update(id, { status: nextStatus });
  };

  return (
    <div className="dashboard animate-fade-in">
      <header className="page-header">
        <h1>Dashboard</h1>
        <p className="text-muted">Welcome back. Here's what's happening today.</p>
      </header>

      {/* Status Summary Tiles */}
      <div className="summary-tiles">
        <div className="tile glass-panel">
          <div className="tile-icon pending"><Clock size={24} /></div>
          <div className="tile-content">
            <h3>{pending}</h3>
            <p>Pending Jobs</p>
          </div>
        </div>
        <div className="tile glass-panel">
          <div className="tile-icon ready"><CheckCircle size={24} /></div>
          <div className="tile-content">
            <h3>{ready}</h3>
            <p>Ready for Pickup</p>
          </div>
        </div>
        <div className="tile glass-panel">
          <div className="tile-icon unpaid"><CreditCard size={24} /></div>
          <div className="tile-content">
            <h3>{unpaid}</h3>
            <p>Unpaid</p>
          </div>
        </div>
        <div className="tile glass-panel">
          <div className="tile-icon efficiency"><Activity size={24} /></div>
          <div className="tile-content">
            <h3>22m</h3>
            <p>Avg String Time</p>
          </div>
        </div>
      </div>

      {/* Smart Job Cards Area */}
      <section className="jobs-section glass-panel">
        <div className="section-header">
          <h2>Active Jobs</h2>
          <div className="filters">
            <button className="badge badge-pending">Pending</button>
            <button className="badge badge-ready">Ready</button>
          </div>
        </div>
        <div className="jobs-list">
          {jobs.filter(j => j.status !== 'Paid').length === 0 ? (
            <div className="empty-state">
              <p className="text-muted">No active jobs. Click 'New Job' to get started.</p>
            </div>
          ) : (
            jobs.filter(j => j.status !== 'Paid').map(job => (
              <div key={job.id} className="job-card glass-panel">
                <div className="job-info">
                  <h4>{job.customerName}</h4>
                  <p className="text-muted">{job.racketModel}</p>
                </div>
                <div className="job-status">
                  <span className={`badge badge-${job.status.toLowerCase()}`}>{job.status}</span>
                </div>
                <div className="job-action" style={{ display: 'flex', gap: '0.5rem' }}>
                  {job.status === 'Pending' && (
                    <button className="btn-icon" onClick={() => handleUpdateStatus(job.id, job.status)} title="Mark as Ready">
                      <CheckCircle size={18} color="#10b981" />
                    </button>
                  )}
                  {job.status === 'Ready' && (
                    <button className="btn-icon" onClick={() => handleUpdateStatus(job.id, job.status)} title="Mark as Paid">
                      <CreditCard size={18} color="#f59e0b" />
                    </button>
                  )}
                  <button className="btn-icon" onClick={() => generateInvoice(job)} title="Download Invoice">
                    <FileText size={18} color="#6366f1" />
                  </button>
                  <button className="btn-icon" onClick={() => setSelectedJob(job)} title="View Details">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <JobDetailsModal 
        job={selectedJob} 
        onClose={() => setSelectedJob(null)} 
      />
    </div>
  );
}

export default Dashboard;
