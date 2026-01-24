import { showToast } from "./toast.js";

let cart = [];

// Inicializa el carrito desde localStorage
export function initCart() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  renderCart(); // Actualiza overlay si existe
}

// Devuelve el carrito actual
export function getCart() {
  return cart;
}

// Guardar carrito en localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Agregar producto
export function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);

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

// Corregir esta funcion, de decremento de producto, si es igual a 1 y borramos (borrar producto)
// Eliminar producto
export function removeFromCart(productId) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  if (item.quantity > 1) {
    item.quantity--; // decrementamos
    showToast(`-1 ${item.title}`, "warning");
  } else {
    // si es 1, lo eliminamos
    cart = cart.filter(i => i.id !== productId);
    showToast(`${item.title} eliminado`, "error");
  }

  saveCart();
  renderCart();
}

// Actualizar cantidad
export function updateQuantity(productId, quantity) {
  const item = cart.find(item => item.id === productId);
  if (item) item.quantity = quantity;

  saveCart();
  renderCart();
}

export function renderCart() {
  const cartContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  if (!cartContainer || !cartTotal) return;

  cartContainer.innerHTML = ''; // limpiar
  cartTotal.textContent = '0.00';

  let total = 0;

  // Carrito vacío
  if (cart.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.className = 'text-center text-gray-500 py-4';
    emptyMsg.textContent = 'No hay productos en el carrito...';
    cartContainer.appendChild(emptyMsg);
    return;
  }

  cart.forEach(item => {
    const li = document.createElement('li');
    li.className = 'flex items-center justify-between gap-4 mb-2 p-2 border rounded shadow-sm';

    li.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="h-16 w-16 object-contain rounded"/>
      <div class="flex-1 flex flex-col justify-center">
        <p class="font-semibold">${item.title}</p>
        <p class="text-sm text-gray-600">$${item.price} x <span class="quantity">${item.quantity}</span></p>
      </div>
      <div class="flex flex-col gap-1">
        <button data-id="${item.id}" class="increment cursor-pointer bg-amber-500 hover:bg-amber-700 text-white rounded px-2">+</button>
        <button data-id="${item.id}" class="decrement cursor-pointer bg-amber-500 hover:bg-amber-700 text-white rounded px-2">-</button>
      </div>
    `;

    // Incrementar cantidad
    li.querySelector('.increment').addEventListener('click', () => {
      updateQuantity(item.id, item.quantity + 1);
      showToast(`+1 ${item.title}`, "success");
    });

    // Decrementar cantidad o eliminar si es 1
    li.querySelector('.decrement').addEventListener('click', () => {
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
}
