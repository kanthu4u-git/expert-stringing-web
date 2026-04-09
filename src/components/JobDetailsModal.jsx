import { X } from 'lucide-react';

function JobDetailsModal({ job, onClose }) {
  if (!job) return null;

  return (
    <div className="modal-overlay animate-fade-in" style={{ zIndex: 999 }}>
      <div className="modal-container glass-panel" style={{ maxWidth: '500px' }}>
        <header className="modal-header">
          <h2>Job Details - {job.customerName}</h2>
          <button className="btn-icon" onClick={onClose}><X size={20} /></button>
        </header>

        <div className="modal-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="detail-group">
              <label className="text-muted" style={{ fontSize: '0.85rem' }}>Racket Model</label>
              <p style={{ fontWeight: '500', fontSize: '1.1rem' }}>{job.racketModel}</p>
            </div>
            <div className="detail-group">
              <label className="text-muted" style={{ fontSize: '0.85rem' }}>Sport</label>
              <p style={{ fontWeight: '500', fontSize: '1.1rem' }}>{job.sport}</p>
            </div>
            
            <div className="detail-group">
              <label className="text-muted" style={{ fontSize: '0.85rem' }}>Mains Tension</label>
              <p style={{ fontWeight: '500', fontSize: '1.1rem' }}>{job.mainsTension} lbs</p>
            </div>
            <div className="detail-group">
              <label className="text-muted" style={{ fontSize: '0.85rem' }}>Crosses Tension</label>
              <p style={{ fontWeight: '500', fontSize: '1.1rem' }}>{job.crossesTension} lbs</p>
            </div>
          </div>
          
          <div className="detail-group" style={{ marginTop: '1rem' }}>
            <label className="text-muted" style={{ fontSize: '0.85rem' }}>Add-ons</label>
            <div className="addons-list" style={{ marginTop: '0.5rem' }}>
              {job.addons && job.addons.length > 0 ? (
                job.addons.map(a => <span key={a} className="badge badge-ready">{a}</span>)
              ) : (
                <span className="text-muted">None</span>
              )}
            </div>
          </div>

          <div className="detail-group" style={{ marginTop: '1rem' }}>
            <label className="text-muted" style={{ fontSize: '0.85rem' }}>Notes</label>
            <p style={{ fontStyle: 'italic', color: '#cbd5e1' }}>{job.notes || 'No external notes provided.'}</p>
          </div>
        </div>

        <footer className="modal-footer" style={{ justifyContent: 'flex-end', gap: '1rem', background: 'rgba(0,0,0,0.1)' }}>
          <div className="price-tag" style={{ marginRight: 'auto', fontSize: '1.25rem', fontWeight: 'bold', color: '#10b981' }}>
             Total: ${15 + (job.addons?.length || 0) * 2}.00
          </div>
          <button className="btn-secondary" onClick={onClose}>Close</button>
        </footer>
      </div>
    </div>
  );
}

export default JobDetailsModal;
