import { showToast } from "./toast.js";

let cart = [];

// ==============================
// INICIALIZACIÓN
// ==============================
export function initCart() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  renderCart();
}

// ==============================
// GETTER
// ==============================
export function getCart() {
  return cart;
}

// ==============================
// GUARDAR EN STORAGE
// ==============================
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ==============================
// AGREGAR PRODUCTO
// ==============================
export function addToCart(product) {
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity++;
    showToast(`+1 ${product.title}`, "success");
  } else {
    cart.push({ ...product, quantity: 1 });
    showToast(`${product.title} agregado al carrito`, "success");
  }

  saveCart();
  renderCart();
}

// ==============================
// ELIMINAR / DECREMENTAR
// ==============================
export function removeFromCart(productId) {
  const item = cart.find((i) => i.id === productId);
  if (!item) return;

  if (item.quantity > 1) {
    item.quantity--;
    showToast(`-1 ${item.title}`, "warning");
  } else {
    cart = cart.filter((i) => i.id !== productId);
    showToast(`${item.title} eliminado`, "error");
  }

  saveCart();
  renderCart();
}

// ==============================
// ACTUALIZAR CANTIDAD
// ==============================
export function updateQuantity(productId, quantity) {
  const item = cart.find((item) => item.id === productId);
  if (item) item.quantity = quantity;

  saveCart();
  renderCart();
}

// ==============================
// RENDER PRINCIPAL DEL CARRITO
// ==============================
export function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const totalWrapper = document.getElementById("cart-total-wrapper"); // <-- clave

  if (!cartContainer || !cartTotal || !totalWrapper) return;

  cartContainer.innerHTML = "";
  cartTotal.textContent = "";

  let total = 0;

  // ---- CARRITO VACÍO ----
  if (cart.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.className = "text-center text-gray-500 py-4";
    emptyMsg.textContent = "No hay productos en el carrito...";
    cartContainer.appendChild(emptyMsg);

    totalWrapper.classList.add("hidden"); // 🔥 OCULTAMOS TOTAL
    return;
  }

  // ---- RENDER DE ITEMS ----
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.className =
      "flex items-center justify-between gap-4 mb-2 p-2 border rounded shadow-sm";

    li.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="h-16 w-16 object-contain rounded"/>
      <div class="flex-1 flex flex-col justify-center">
        <p class="font-semibold">${item.title}</p>
        <p class="text-sm text-gray-600">
          $${item.price} x <span class="quantity">${item.quantity}</span>
        </p>
      </div>
      <div class="flex flex-col gap-1">
        <button data-id="${item.id}" class="increment cursor-pointer bg-amber-500 hover:bg-amber-700 text-white rounded px-2">+</button>
        <button data-id="${item.id}" class="decrement cursor-pointer bg-amber-500 hover:bg-amber-700 text-white rounded px-2">-</button>
      </div>
    `;

    li.querySelector(".increment").addEventListener("click", () => {
      updateQuantity(item.id, item.quantity + 1);
      showToast(`+1 ${item.title}`, "success");
    });

    li.querySelector(".decrement").addEventListener("click", () => {
      if (item.quantity > 1) {
        updateQuantity(item.id, item.quantity - 1);
        showToast(`-1 ${item.title}`, "warning");
      } else {
        removeFromCart(item.id);
      }
    });

    cartContainer.appendChild(li);

    total += item.price * item.quantity;
  });

  // ---- MOSTRAR TOTAL SOLO SI > 0 ----
  cartTotal.textContent = total.toFixed(2);

  if (total > 0) {
    totalWrapper.classList.remove("hidden");
  } else {
    totalWrapper.classList.add("hidden");
  }
}
