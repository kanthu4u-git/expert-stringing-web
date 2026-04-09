import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { PlusCircle, AlertTriangle } from 'lucide-react';
import './Inventory.css';

function Inventory() {
  const inventory = useLiveQuery(() => db.inventory.toArray()) || [];
  
  const handleAddDummyReel = async () => {
    await db.inventory.add({
      brand: 'Luxilon',
      model: 'ALU Power',
      gauge: '1.25',
      color: 'Silver',
      lengthMeters: 200,
      costPrice: 220
    });
    // Low stock example
    await db.inventory.add({
      brand: 'Yonex',
      model: 'BG80',
      gauge: '0.68',
      color: 'Yellow',
      lengthMeters: 8, // Low stock, since < 10m is insufficient for Badminton
      costPrice: 150
    });
  };

  return (
    <div className="page-container animate-fade-in">
      <header className="page-header">
        <h1>String Inventory</h1>
        <p className="text-muted">Manage your reels and tracking.</p>
      </header>

      <div className="glass-panel inventory-toolbar">
        <button className="btn-primary" onClick={handleAddDummyReel}>
          <PlusCircle size={18} /> Add New Reel
        </button>
      </div>

      <div className="glass-panel main-table-container">
        {inventory.length === 0 ? (
          <div className="empty-state">
            <p className="text-muted">No inventory found. Add a reel to start tracking stock.</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Brand / Model</th>
                <th>Specs</th>
                <th>Stock (Meters)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map(reel => {
                const isLowStock = reel.lengthMeters < 12; // Generic threshold
                return (
                  <tr key={reel.id}>
                    <td>
                      <div className="reel-info">
                        <strong>{reel.brand}</strong>
                        <span className="text-muted">{reel.model}</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-specs">{reel.gauge}mm • {reel.color}</span>
                    </td>
                    <td>
                      <div className={`stock-meter ${isLowStock ? 'low-stock' : ''}`}>
                        <div className="stock-fill" style={{ width: `${Math.min(100, (reel.lengthMeters / 200) * 100)}%`, background: isLowStock ? '#ef4444' : '#10b981' }}></div>
                        <span>{reel.lengthMeters}m</span>
                      </div>
                    </td>
                    <td>
                      {isLowStock ? (
                        <span className="badge badge-danger"><AlertTriangle size={12} /> Low Stock</span>
                      ) : (
                        <span className="badge badge-ready">In Stock</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Inventory;
