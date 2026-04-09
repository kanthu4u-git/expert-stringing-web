import { jsPDF } from 'jspdf';

export const generateInvoice = (job) => {
  const doc = new jsPDF();
  
  // Expert Stringing Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(40, 40, 40);
  doc.text('Expert Stringing', 20, 30);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text('Professional Racket Service Invoice', 20, 40);
  
  // Divider
  doc.setLineWidth(0.5);
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 45, 190, 45);
  
  // Job Details
  doc.setFontSize(14);
  doc.setTextColor(20, 20, 20);
  doc.text('Customer Details', 20, 60);
  
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text(`Name: ${job.customerName || 'Walk-in Customer'}`, 20, 70);
  doc.text(`Sport: ${job.sport || 'Tennis'}`, 20, 78);
  doc.text(`Racket Model: ${job.racketModel || 'Unknown Registration'}`, 20, 86);
  
  // Technical Specs
  doc.setFontSize(14);
  doc.setTextColor(20, 20, 20);
  doc.text('Service Specifications', 20, 106);
  
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text(`Mains Tension: ${job.mainsTension || 'N/A'} lbs`, 20, 116);
  doc.text(`Crosses Tension: ${job.crossesTension || 'N/A'} lbs`, 20, 124);
  
  if (job.addons && job.addons.length > 0) {
    doc.text(`Add-ons: ${job.addons.join(', ')}`, 20, 132);
  }

  // Price (Mock rule: Base $15 + $2 per add-on)
  const basePrice = 15;
  const addonsPrice = (job.addons?.length || 0) * 2;
  const totalPrice = basePrice + addonsPrice;

  doc.setLineWidth(1);
  doc.setDrawColor(0, 0, 0);
  doc.line(20, 150, 190, 150);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(0, 150, 0);
  doc.text(`Total Due: $${totalPrice.toFixed(2)}`, 140, 165);

  // Footer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text('Thank you for choosing Expert Stringing!', 20, 280);

  doc.save(`Invoice_${job.customerName?.replace(/\s+/g, '_') || 'Customer'}.pdf`);
};
