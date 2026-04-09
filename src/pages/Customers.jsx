import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { Search, MessageCircle, UserPlus, Phone, Edit, Trash } from 'lucide-react';
import AddCustomerModal from '../components/AddCustomerModal';
import './Customers.css';

function Customers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState(null);
  const customers = useLiveQuery(() => db.customers.toArray()) || [];

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openCreateModal = () => {
    setCustomerToEdit(null);
    setIsModalOpen(true);
  };

  const openEditModal = (c) => {
    setCustomerToEdit(c);
    setIsModalOpen(true);
  };

  return (
    <div className="page-container animate-fade-in">
      <header className="page-header">
        <h1>Customers</h1>
        <p className="text-muted">Manage your tennis and badminton clients.</p>
      </header>

      <div className="glass-panel customer-toolbar">
        <div className="search-bar">
          <Search size={18} className="text-muted" />
          <input 
            type="text" 
            placeholder="Search by name..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn-primary" onClick={openCreateModal}>
          <UserPlus size={18} /> Add Customer
        </button>
      </div>

      <div className="glass-panel main-table-container">
        {filteredCustomers.length === 0 ? (
          <div className="empty-state">
            <p className="text-muted">No customers found. Try adding some.</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Sport</th>
                <th>Contact</th>
                <th>Reach Out</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map(customer => (
                <tr key={customer.id}>
                  <td className="fw-600">{customer.name}</td>
                  <td>
                    <span className={`badge ${customer.sport === 'Tennis' ? 'badge-tennis' : 'badge-badminton'}`}>
                      {customer.sport}
                    </span>
                  </td>
                  <td>
                    <div className="contact-info">
                      <span className="text-muted"><Phone size={14} /> {customer.phone}</span>
                    </div>
                  </td>
                  <td>
                    <a className="btn-link" href={`https://wa.me/${customer.phone?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer">
                      <MessageCircle size={18} color="#10b981" /> WhatsApp
                    </a>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn-icon" onClick={() => openEditModal(customer)} title="Edit Customer">
                        <Edit size={16} />
                      </button>
                      <button className="btn-icon" onClick={async () => await db.customers.delete(customer.id)} title="Delete Customer">
                        <Trash size={16} color="#ef4444" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AddCustomerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        customerToEdit={customerToEdit}
      />
    </div>
  );
}

export default Customers;
