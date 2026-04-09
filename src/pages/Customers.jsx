import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { Search, MessageCircle, UserPlus, Phone } from 'lucide-react';
import './Customers.css';

function Customers() {
  const [searchTerm, setSearchTerm] = useState('');
  const customers = useLiveQuery(() => db.customers.toArray()) || [];

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDummyCustomer = async () => {
    await db.customers.add({
      name: 'Roger Federer',
      phone: '+1 123-456-7890',
      email: 'roger@tennis.com',
      sport: 'Tennis'
    });
    await db.customers.add({
      name: 'Lin Dan',
      phone: '+1 987-654-3210',
      email: 'lindan@badminton.com',
      sport: 'Badminton'
    });
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
        <button className="btn-primary" onClick={handleAddDummyCustomer}>
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
                <th>Phone / Email</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Customers;
