import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { Archive as ArchiveIcon, Search } from 'lucide-react';
import JobDetailsModal from '../components/JobDetailsModal';

function Archive() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  
  const jobs = useLiveQuery(() => db.jobs.where('status').equals('Paid').toArray()) || [];

  const filteredJobs = jobs.filter(j => 
    j.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    j.racketModel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tennisJobs = filteredJobs.filter(j => j.sport === 'Tennis');
  const badmintonJobs = filteredJobs.filter(j => j.sport === 'Badminton');

  return (
    <div className="page-container animate-fade-in">
      <header className="page-header">
        <h1>Completed Jobs Archive</h1>
        <p className="text-muted">History of all finalized and paid stringing operations.</p>
      </header>
      
      <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem', display: 'flex' }}>
        <div className="search-bar" style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--glass-border)', padding: '0.5rem 1rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', maxWidth: '400px' }}>
          <Search size={18} className="text-muted" />
          <input 
            type="text" 
            placeholder="Search customer or racket..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: '#f8fafc', width: '100%', outline: 'none' }}
          />
        </div>
      </div>

      <div className="analytics-grid" style={{ gap: '2rem' }}>
        <section className="glass-panel" style={{ padding: '1.5rem' }}>
          <h2 style={{ marginBottom: '1.5rem', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArchiveIcon size={20} /> Tennis History
          </h2>
          {tennisJobs.length === 0 ? (
            <p className="text-muted">No completed Tennis jobs yet.</p>
          ) : (
            <div className="jobs-list">
              {tennisJobs.map(job => (
                <div key={job.id} className="job-card glass-panel" style={{ background: 'rgba(255,255,255,0.02)', cursor: 'pointer' }} onClick={() => setSelectedJob(job)}>
                  <div className="job-info">
                    <h4>{job.customerName}</h4>
                    <p className="text-muted">{job.racketModel}</p>
                  </div>
                  <div className="job-status">
                    <span className="badge badge-paid" style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', border: '1px solid #4f46e5' }}>Paid</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="glass-panel" style={{ padding: '1.5rem' }}>
          <h2 style={{ marginBottom: '1.5rem', color: '#a78bfa', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArchiveIcon size={20} /> Badminton History
          </h2>
          {badmintonJobs.length === 0 ? (
            <p className="text-muted">No completed Badminton jobs yet.</p>
          ) : (
            <div className="jobs-list">
              {badmintonJobs.map(job => (
                <div key={job.id} className="job-card glass-panel" style={{ background: 'rgba(255,255,255,0.02)', cursor: 'pointer' }} onClick={() => setSelectedJob(job)}>
                  <div className="job-info">
                    <h4>{job.customerName}</h4>
                    <p className="text-muted">{job.racketModel}</p>
                  </div>
                  <div className="job-status">
                    <span className="badge badge-paid" style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', border: '1px solid #4f46e5' }}>Paid</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <JobDetailsModal 
        job={selectedJob} 
        onClose={() => setSelectedJob(null)} 
      />
    </div>
  );
}

export default Archive;
