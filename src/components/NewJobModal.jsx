import { useState } from 'react';
import { useUI } from '../context/UIContext';
import { db } from '../db';
import { X, Play, Square, Plus } from 'lucide-react';
import './NewJobModal.css';

function NewJobModal() {
  const { isJobModalOpen, setJobModalOpen } = useUI();
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  
  const [formData, setFormData] = useState({
    customerName: '',
    racketModel: '',
    sport: 'Tennis',
    mainsTension: '',
    crossesTension: '',
    preStretch: '0',
    knots: '2',
    notes: '',
    addons: []
  });

  if (!isJobModalOpen) return null;

  const handleClose = () => setJobModalOpen(false);

  const toggleAddon = (addon) => {
    setFormData(prev => ({
      ...prev,
      addons: prev.addons.includes(addon) 
        ? prev.addons.filter(a => a !== addon) 
        : [...prev.addons, addon]
    }));
  };

  const handleSave = async () => {
    await db.jobs.add({
      customerName: formData.customerName || 'Walk-in Customer',
      racketModel: formData.racketModel || 'Unknown Racket',
      sport: formData.sport,
      mainsTension: formData.mainsTension,
      crossesTension: formData.crossesTension,
      addons: formData.addons,
      notes: formData.notes,
      status: 'Pending', // Pending, Ready, Paid
      createdAt: new Date().toISOString()
    });
    // In real app, we'd handle "Save & Add Another" vs "Save & Close"
    setJobModalOpen(false);
  };

  return (
    <div className="modal-overlay animate-fade-in">
      <div className="modal-container glass-panel">
        <header className="modal-header">
          <h2>New Job Entry</h2>
          <button className="btn-icon" onClick={handleClose}><X size={20} /></button>
        </header>
        
        <div className="modal-body">
          <div className="form-group">
            <label>Customer Name</label>
            <input 
              type="text" 
              placeholder="Start typing customer name..." 
              value={formData.customerName}
              onChange={(e) => setFormData({...formData, customerName: e.target.value})}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Racket Model</label>
              <input 
                type="text" 
                placeholder="e.g. Wilson Pro Staff" 
                value={formData.racketModel}
                onChange={(e) => setFormData({...formData, racketModel: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Sport</label>
              <select value={formData.sport} onChange={(e) => setFormData({...formData, sport: e.target.value})}>
                <option value="Tennis">Tennis 🎾</option>
                <option value="Badminton">Badminton 🏸</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Mains Tension (lbs)</label>
              <input 
                type="number" 
                placeholder="55" 
                value={formData.mainsTension}
                onChange={(e) => setFormData({...formData, mainsTension: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Crosses Tension (lbs)</label>
              <input 
                type="number" 
                placeholder="53" 
                value={formData.crossesTension}
                onChange={(e) => setFormData({...formData, crossesTension: e.target.value})}
              />
            </div>
          </div>
          
          <div className="form-group addons-group">
            <label>Add-ons</label>
            <div className="addons-list">
              {['Overgrip', 'Stencil', 'Vibration Dampener', 'Head Guard Tape'].map(addon => (
                <button 
                  key={addon}
                  className={`addon-chip ${formData.addons.includes(addon) ? 'active' : ''}`}
                  onClick={() => toggleAddon(addon)}
                >
                  {addon}
                </button>
              ))}
            </div>
          </div>
        </div>

        <footer className="modal-footer">
          <div className="timer-controls">
            <button className="btn-icon" onClick={() => setTimerRunning(!timerRunning)}>
              {timerRunning ? <Square size={20} color="#ef4444" /> : <Play size={20} color="#10b981" />}
            </button>
            <span>{timerSeconds}s</span>
          </div>
          <div className="action-buttons">
            <button className="btn-secondary" onClick={handleClose}>Cancel</button>
            <button className="btn-primary" onClick={handleSave}>Save Job</button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default NewJobModal;
