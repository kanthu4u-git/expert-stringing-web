import Dexie from 'dexie';

export const db = new Dexie('ExpertStringingDB');

db.version(1).stores({
  jobs: '++id, customerId, customerName, racketModel, status, expectedPickup, createdAt', // Statuses: Pending, Ready, Paid
  customers: '++id, name, phone, email, sport', // sport: Tennis | Badminton
  inventory: '++id, brand, model, gauge, color, lengthMeters, costPrice',
});
