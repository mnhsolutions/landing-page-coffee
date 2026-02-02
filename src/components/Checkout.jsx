import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const paymentMethods = [
  "Tarjeta de crédito",
  "Tarjeta de débito",
  "Mercado Pago",
  "Transferencia bancaria",
];

function generateTransactionId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";

  for (let i = 0; i < 16; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return id.match(/.{1,4}/g).join("-");
}

function formatDate(date) {
  return date.toLocaleDateString("es-AR", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Confirmar compra");
  const [transactionId, setTransactionId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const merchant = "Café Moderno — Tienda Oficial";

  useEffect(() => {
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

  // PROTECCIÓN CHECKOUT
  if (storedCart.length === 0) {
    window.location.href = "/";
    return;
  }

  setCart(storedCart);

  const calcTotal = storedCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  setTotal(calcTotal);

  setTransactionId(generateTransactionId());
  setPaymentMethod(
    paymentMethods[Math.floor(Math.random() * paymentMethods.length)]
  );
  setPurchaseDate(formatDate(new Date()));
}, []);

  // Handle que guarda todo y redirige a /success
  function handleConfirmPurchase() {
  if (isProcessing) return;

  setIsProcessing(true);
  setProgress(0);
  setStatusText("Procesando pago...");

  let current = 0;

  const interval = setInterval(() => {
    const increment = Math.random() * 12 + 5;
    current += increment;

    if (current >= 80) {
      setStatusText("Confirmando compra...");
    }

    if (current >= 100) {
      current = 100;
      clearInterval(interval);

      setTimeout(() => {
        const summary = {
          total: total.toFixed(2),
          transactionId,
          paymentMethod,
          purchaseDate,
          merchant,
        };

        localStorage.setItem(
          "purchase_summary",
          JSON.stringify(summary)
        );

        window.location.href = "/success";
      }, 600);
    }

    setProgress(current);
  }, 180);
}

  return (
    <div className="min-h-screen grid grid-rows-[150px_4fr] bg-gray-50">
      <header className="flex items-center px-10">
        <h1 className="font-bold text-black text-3xl">
          Resumen de compra
        </h1>
      </header>

      <div className="grid grid-cols-1 
        md:grid-cols-[3fr_1fr] gap-6 px-4 md:px-10 pb-10">
        <section className="bg-white rounded-xl shadow p-4 grid grid-rows-[60px_1fr] min-h-0">
          <h2 className="font-bold mb-3">Productos</h2>

          {/* Lista que renderiza todos los productos de la compra */}
          {cart.length === 0 ? (
            <p className="text-gray-500">
              No hay productos en el carrito
            </p>
          ) : (
            <ul className="flex flex-col overflow-y-auto min-h-0 gap-4 pr-2">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="rounded-xl h-24 p-4 grid grid-cols-[80px_1fr_auto] gap-4 items-center"
                  style={{boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",}}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-16 w-16 object-contain"
                  />

                  <div>
                    <p className="font-bold text-black">{item.title}</p>
                    <p className="text-sm text-gray-600">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>

                  <p className="font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Seccion detalle de compra de usuario */}
        <aside className="h-fit py-10 bg-white rounded-xl shadow p-6 grid grid-rows-[auto_1fr_auto] gap-2">
          <h2 className="font-bold mb-3">Detalle de compra</h2>

          <div className="flex flex-col gap-3 text-sm">
            <p>
              <span className="font-bold">Total:</span>{" "}
              ${total.toFixed(2)}
            </p>

            <p>
              <span className="font-bold">ID Transacción:</span>{" "}
              {transactionId}
            </p>

            <p>
              <span className="font-bold">Método de pago:</span>{" "}
              {paymentMethod}
            </p>

            <p>
              <span className="font-bold">Fecha:</span>{" "}
              {purchaseDate}
            </p>

            <p>
              <span className="font-bold">Comerciante:</span>{" "}
              {merchant}
            </p>
          </div>

          {/* Boton de confirmacion de compra */}

          <motion.button
            onClick={handleConfirmPurchase}
            disabled={isProcessing || cart.length === 0}
            whileTap={!isProcessing ? { scale: 0.97 } : {}}
            className={`relative w-full overflow-hidden rounded-xl py-3 font-semibold text-white
          ${ isProcessing || cart.length === 0
            ? "bg-amber-400 cursor-not-allowed"
            : "bg-amber-500 hover:bg-amber-700"
            }`}
          >
            {/* Barra */}
            <motion.span
              className="absolute left-0 top-0 h-full bg-amber-700"
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.3 }}
            />

            {/* Texto */}
            <span className="relative z-10 flex items-center justify-center gap-2">
              <AnimatePresence mode="wait">
                {progress < 100 ? (
                  <motion.span
                    key={statusText}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2"
                  >
                    {isProcessing && (
                      <motion.span
                        className="h-4 w-4 rounded-full border-2 border-white border-t-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      />
                    )}
                    {statusText}
                  </motion.span>
                ) : (
                  <motion.span
                    key="success"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    ✔ Pago confirmado
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </motion.button>

          <button
            onClick={() => (window.location.href = "/")}
            className="w-full bg-gray-800 text-white py-3 rounded-xl cursor-pointer hover:opacity-90">
              Volver a inicio
          </button>
        </aside>
      </div>
    </div>
  );
}
