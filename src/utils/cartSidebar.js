import { initCart, isCartEmpty } from "./cart.js";
import { showToast } from "./toast.js";

document.addEventListener("DOMContentLoaded", () => {
  initCart(); //  sincroniza con localStorage

  const cartOverlay = document.getElementById("cart-overlay");
  const cartSidebar = document.getElementById("cart-sidebar");
  const closeCartBtn = document.getElementById("close-cart");
  const cartIcon = document.getElementById("cart-icon");
  const checkoutBtn = document.getElementById("go-checkout");
  const html = document.documentElement;

  // =====================
  // ABRIR / CERRAR
  // =====================
  function openCart() {
    cartOverlay.classList.remove("hidden");
    html.style.overflow = "hidden";
    cartSidebar.classList.remove("translate-x-full");
    cartSidebar.classList.add("translate-x-0");
  }

  function closeCart() {
    cartSidebar.classList.remove("translate-x-0");
    cartSidebar.classList.add("translate-x-full");

    setTimeout(() => {
      cartOverlay.classList.add("hidden");
      html.style.overflow = "";
    }, 300);
  }

  cartIcon?.addEventListener("click", openCart);
  closeCartBtn?.addEventListener("click", closeCart);

  cartOverlay?.addEventListener("click", (e) => {
    if (e.target === cartOverlay) closeCart();
  });

  // =====================
  // BOTÓN PAGAR
  // =====================
  if (!checkoutBtn) return;

  function updateCheckoutButton() {
    if (isCartEmpty()) {
      checkoutBtn.disabled = true;
      checkoutBtn.classList.add("opacity-100", "cursor-not-allowed");
    } else {
      checkoutBtn.disabled = false;
      checkoutBtn.classList.remove("opacity-50", "cursor-not-allowed");
    }
  }

  // estado inicial
  updateCheckoutButton();

  checkoutBtn.addEventListener("click", () => {
    if (isCartEmpty()) {
      showToast("El carrito está vacío", "error");
      return;
    }

    window.location.href = "/checkout";
  });

  // 🔥 ESCUCHA CAMBIOS DEL CARRITO
  window.addEventListener("cart:updated", updateCheckoutButton);
});
