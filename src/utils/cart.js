import { showToast } from "./toast.js";

let cart = [];

// ==============================
// EVENTO GLOBAL (CLAVE)
// ==============================
function notifyCartChange() {
  window.dispatchEvent(new CustomEvent("cart:updated"));
}

// ==============================
// INICIALIZACIÓN
// ==============================
export function initCart() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  renderCart();
  notifyCartChange(); //  sincroniza botones al cargar
}

// ==============================
// GETTERS
// ==============================
export function getCart() {
  return cart;
}

export function isCartEmpty() {
  return cart.length === 0;
}

export function getCartTotal() {
  return cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
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
  notifyCartChange(); //  AVISA
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
  notifyCartChange(); //  AVISA
}

// ==============================
// ACTUALIZAR CANTIDAD
// ==============================
export function updateQuantity(productId, quantity) {
  const item = cart.find((item) => item.id === productId);
  if (!item) return;

  item.quantity = quantity;

  saveCart();
  renderCart();
  notifyCartChange(); //  AVISA
}

// ==============================
// RENDER DEL CARRITO
// ==============================
export function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const totalWrapper = document.getElementById("cart-total-wrapper");

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

    totalWrapper.classList.add("hidden");
    return;
  }

  // ---- ITEMS ----
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.className =
      "flex items-center justify-between gap-4 mb-2 p-2 border rounded shadow-sm";

    li.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="h-16 w-16 object-contain rounded"/>
      <div class="flex-1">
        <p class="font-semibold">${item.title}</p>
        <p class="text-sm text-gray-600">$${item.price} x ${item.quantity}</p>
      </div>
      <div class="flex flex-col gap-1">
        <button class="increment bg-amber-500 hover:bg-amber-700 text-white rounded px-2">+</button>
        <button class="decrement bg-amber-500 hover:bg-amber-700 text-white rounded px-2">-</button>
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

  cartTotal.textContent = total.toFixed(2);
  totalWrapper.classList.remove("hidden");
}
