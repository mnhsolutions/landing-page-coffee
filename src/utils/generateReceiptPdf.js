import { jsPDF } from "jspdf";

export function generateReceiptPDF(summary) {
  // Instanciamos un objeto que va a generar el PDF
  const doc = new jsPDF();

  // ---- ESTILOS ----
  doc.setFontSize(18);
  doc.text("¡Compra exitosa!", 20, 20);

  doc.setFontSize(12);
  doc.text("Tu pago fue procesado correctamente", 20, 30);

  doc.text("----------------------------------------", 20, 40);

  doc.text(`Comerciante: ${summary.merchant}`, 20, 50);
  doc.text(`Fecha: ${summary.purchaseDate}`, 20, 60);
  doc.text(`Método de pago: ${summary.paymentMethod}`, 20, 70);

  doc.text("----------------------------------------", 20, 80);

  doc.text(`ID Transacción: ${summary.transactionId}`, 20, 90);

  doc.text("----------------------------------------", 20, 100);

  doc.setFontSize(14);
  doc.text(`Total pagado: $${summary.total}`, 20, 115);

  // Nombre del archivo dinámico
  doc.save(`comprobante-${summary.transactionId}.pdf`);
}
