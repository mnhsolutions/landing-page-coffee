import { useState, useEffect } from "react";

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

  const [transactionId, setTransactionId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const merchant = "Café Moderno — Tienda Oficial";

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const calcTotal = storedCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    setTotal(calcTotal);

    // Simulaciones una sola vez al cargar la página
    setTransactionId(generateTransactionId());
    setPaymentMethod(
      paymentMethods[Math.floor(Math.random() * paymentMethods.length)]
    );
    setPurchaseDate(formatDate(new Date()));
  }, []);

  // ✅ NUEVA FUNCIÓN CLAVE — guarda todo y redirige a /success
  function handleConfirmPurchase() {
    const summary = {
      total: total.toFixed(2),
      transactionId,
      paymentMethod,
      purchaseDate,
      merchant,
    };

    localStorage.setItem("purchase_summary", JSON.stringify(summary));

    window.location.href = "/success";
  }

  return (
    <div className="min-h-screen grid grid-rows-[1fr_4fr] bg-gray-50">
      <header className="flex items-center px-10">
        <h1 className="font-bold text-black text-3xl">
          Resumen de compra
        </h1>
      </header>

      <div className="grid grid-cols-[3fr_1fr] gap-6 px-10 pb-10">
        <section className="bg-white rounded-xl shadow p-4 grid grid-rows-[auto_1fr] min-h-0">
          <h2 className="font-semibold mb-3">Productos</h2>

          {cart.length === 0 ? (
            <p className="text-gray-500">
              No hay productos en el carrito
            </p>
          ) : (
            <ul className="overflow-y-auto min-h-0 grid gap-4 pr-2">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="rounded-xl p-4 grid grid-cols-[80px_1fr_auto] gap-4 items-center"
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-16 w-16 object-contain"
                  />

                  <div>
                    <p className="font-semibold">{item.title}</p>
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

        <aside className="bg-white rounded-xl shadow p-6 grid grid-rows-[auto_1fr_auto] gap-2">
          <h2 className="font-semibold mb-3">Detalle</h2>

          <div className="flex flex-col gap-3 text-sm">
            <p>
              <span className="font-semibold">Total:</span>{" "}
              ${total.toFixed(2)}
            </p>

            <p>
              <span className="font-semibold">ID Transacción:</span>{" "}
              {transactionId}
            </p>

            <p>
              <span className="font-semibold">Método de pago:</span>{" "}
              {paymentMethod}
            </p>

            <p>
              <span className="font-semibold">Fecha:</span>{" "}
              {purchaseDate}
            </p>

            <p>
              <span className="font-semibold">Comerciante:</span>{" "}
              {merchant}
            </p>
          </div>

          {/* ✅ BOTÓN CLAVE */}
          <button
            onClick={handleConfirmPurchase}
            className="w-full bg-amber-500 text-white py-3 rounded-xl"
          >
            Confirmar compra
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="w-full bg-gray-800 text-white py-3 rounded-xl"
          >
            Volver a inicio
          </button>
        </aside>
      </div>
    </div>
  );
}
