import { useState, useEffect } from 'react';
import { db } from '../db';
import { X, UserPlus, Edit } from 'lucide-react';

function AddCustomerModal({ isOpen, onClose, customerToEdit }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    sport: 'Tennis'
  });

  useEffect(() => {
    if (customerToEdit) {
      setFormData({
        name: customerToEdit.name,
        phone: customerToEdit.phone,
        email: customerToEdit.email,
        sport: customerToEdit.sport
      });
    } else {
      setFormData({ name: '', phone: '', email: '', sport: 'Tennis' });
    }
  }, [customerToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    if (customerToEdit) {
      await db.customers.update(customerToEdit.id, { ...formData });
    } else {
      await db.customers.add({ ...formData });
    }
    onClose();
  };

  return (
    <div className="modal-overlay animate-fade-in">
      <div className="modal-container glass-panel" style={{ maxWidth: '400px' }}>
        <header className="modal-header">
          <h2>
            {customerToEdit ? <Edit size={20} style={{ display: 'inline', marginRight: '8px' }}/> : <UserPlus size={20} style={{ display: 'inline', marginRight: '8px' }}/>}
            {customerToEdit ? 'Edit Customer' : 'Add Customer'}
          </h2>
          <button className="btn-icon" onClick={onClose} type="button"><X size={20} /></button>
        </header>
        
        <form onSubmit={handleSave}>
          <div className="modal-body">
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Phone Number (WhatsApp)</label>
              <input 
                type="tel" 
                required
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Primary Sport</label>
              <select 
                value={formData.sport}
                onChange={e => setFormData({...formData, sport: e.target.value})}
              >
                <option value="Tennis">Tennis</option>
                <option value="Badminton">Badminton</option>
              </select>
            </div>
          </div>

          <footer className="modal-footer" style={{ justifyContent: 'flex-end', gap: '1rem' }}>
            <button className="btn-secondary" onClick={onClose} type="button">Cancel</button>
            <button className="btn-primary" type="submit">Save Customer</button>
          </footer>
        </form>
      </div>
    </div>
  );
}

export default AddCustomerModal;
