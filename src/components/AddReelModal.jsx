import { useState } from 'react';
import { db } from '../db';
import { X, PlusCircle } from 'lucide-react';

function AddReelModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    gauge: '',
    color: 'White',
    lengthMeters: 200,
    costPrice: ''
  });

  if (!isOpen) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    await db.inventory.add({
      ...formData,
      lengthMeters: Number(formData.lengthMeters),
      costPrice: Number(formData.costPrice)
    });
    setFormData({ brand: '', model: '', gauge: '', color: 'White', lengthMeters: 200, costPrice: '' });
    onClose();
  };

  return (
    <div className="modal-overlay animate-fade-in">
      <div className="modal-container glass-panel" style={{ maxWidth: '400px' }}>
        <header className="modal-header">
          <h2><PlusCircle size={20} style={{ display: 'inline', marginRight: '8px' }}/>Add New Reel</h2>
          <button className="btn-icon" onClick={onClose} type="button"><X size={20} /></button>
        </header>
        
        <form onSubmit={handleSave}>
          <div className="modal-body">
            <div className="form-group">
              <label>Brand</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Yonex"
                value={formData.brand}
                onChange={e => setFormData({...formData, brand: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Model</label>
              <input 
                type="text" 
                required
                placeholder="e.g. BG80"
                value={formData.model}
                onChange={e => setFormData({...formData, model: e.target.value})}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Gauge (mm)</label>
                <input 
                  type="number" 
                  step="0.01"
                  required
                  placeholder="1.25"
                  value={formData.gauge}
                  onChange={e => setFormData({...formData, gauge: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Color</label>
                <input 
                  type="text" 
                  required
                  value={formData.color}
                  onChange={e => setFormData({...formData, color: e.target.value})}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Total Length (Meters)</label>
                <input 
                  type="number" 
                  required
                  value={formData.lengthMeters}
                  onChange={e => setFormData({...formData, lengthMeters: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Total Cost ($)</label>
                <input 
                  type="number" 
                  required
                  value={formData.costPrice}
                  onChange={e => setFormData({...formData, costPrice: e.target.value})}
                />
              </div>
            </div>
          </div>

          <footer className="modal-footer" style={{ justifyContent: 'flex-end', gap: '1rem' }}>
            <button className="btn-secondary" onClick={onClose} type="button">Cancel</button>
            <button className="btn-primary" type="submit">Save Stock</button>
          </footer>
        </form>
      </div>
    </div>
  );
}

export default AddReelModal;
