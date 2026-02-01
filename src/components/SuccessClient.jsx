import { useEffect, useState } from "react";

export default function SuccessClient() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("purchase_summary"));
    setSummary(data);
  }, []);

  if (!summary)
    return <p className="p-10 text-center">Cargando comprobante...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      {/* TICKET PRINCIPAL */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg h-[80vh] flex flex-col overflow-hidden">
        {/* HEADER VERDE CON CHECK PEQUEÑO */}
        <div className="bg-green-100 text-green-800 text-center p-6 flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-600 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

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

        {/* FOOTER CON BOTÓN */}
        <div className="flex flex-col p-6 border-t bg-gray-50 gap-2">
          <button           
          className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-black transition">
            Descargar comprobante
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("cart");
              window.location.href = "/";
            }}
            className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-black transition">
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
