import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckIcon } from "src/icons/CheckIcon";
import { generateReceiptPDF } from "src/utils/generateReceiptPdf";

export default function SuccessClient() {
  const [summary, setSummary] = useState(null);
  const [isClosing, setIsClosing] = useState(false);


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("purchase_summary"));
    setSummary(data);
  }, []);

  if (!summary)
    return <p className="p-10 text-center">Cargando comprobante...</p>;

  // Handle que se encarga de generar el pdf del ticket
  function handleDownloadReceipt() {
    generateReceiptPDF(summary);
  }

  // Handle del boton volver al inicio
  function handleClose() {
  setIsClosing(true);

  setTimeout(() => {
    localStorage.removeItem("cart");
    window.location.href = "/";
  }, 350); // espera a que termine la animación
}


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isClosing ? 0 : 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gray-100 flex items-center justify-center p-6"
    >

      {/* TICKET PRINCIPAL */}
      <motion.div
        animate={{
          opacity: isClosing ? 0 : 1,
          scale: isClosing ? 0.95 : 1,
          y: isClosing ? 20 : 0,
        }}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-lg h-[80vh] flex flex-col overflow-hidden"
      >

        {/* HEADER VERDE CON CHECK PEQUEÑO */}
        <div className="bg-green-100 text-green-800 text-center p-6 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
          >
            <CheckIcon />
          </motion.div>

          <h1 className="text-xl font-bold">¡Compra exitosa!</h1>
          <p className="text-sm opacity-80">
            Tu pago fue procesado correctamente
          </p>
        </div>

        {/* CUERPO DEL TICKET */}
        <div className="flex-1 p-6 space-y-4 text-sm text-gray-800">
          <div className="flex justify-between">
            <span className="font-semibold">Comerciante</span>
            <span>{summary.merchant}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Fecha</span>
            <span>{summary.purchaseDate}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Método de pago</span>
            <span>{summary.paymentMethod}</span>
          </div>

          <div className="border-t border-dashed my-2"></div>

          <div className="flex justify-between">
            <span className="font-semibold">ID Transacción</span>
            <span className="font-mono">{summary.transactionId}</span>
          </div>

          <div className="border-t border-dashed my-2"></div>

          <div className="flex justify-between text-lg">
            <span className="font-bold">Total pagado</span>
            <span className="font-bold text-green-600">
              ${summary.total}
            </span>
          </div>
        </div>

        {/* Botones */}
        <div className="flex flex-col p-6 border-t bg-gray-50 gap-2">
          <button
            onClick={handleDownloadReceipt}     
            className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-black transition cursor-pointer">
              Descargar comprobante
          </button>
          <button
            onClick={handleClose}
            className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-black transition cursor-pointer"
          >
            Volver al inicio
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
