document.addEventListener("DOMContentLoaded", () => {
  const cartOverlay = document.getElementById("cart-overlay");
  const cartSidebar = document.getElementById("cart-sidebar");
  const closeCartBtn = document.getElementById("close-cart");
  const cartIcon = document.getElementById("cart-icon"); // ahora único botón
  const html = document.documentElement;

  function openCart() {
    if (!cartOverlay || !cartSidebar) return;

    cartOverlay.classList.remove("hidden");
    html.style.overflow = "hidden";
    cartSidebar.classList.remove("translate-x-full");
    cartSidebar.classList.add("translate-x-0");
  }

  function closeCart() {
    if (!cartOverlay || !cartSidebar) return;

    cartSidebar.classList.remove("translate-x-0");
    cartSidebar.classList.add("translate-x-full");

    setTimeout(() => {
      cartOverlay.classList.add("hidden");
      html.style.overflow = "";
    }, 300);
  }

  // Abrir carrito
  cartIcon?.addEventListener("click", openCart);

  // Cerrar carrito
  closeCartBtn?.addEventListener("click", closeCart);

  // Cerrar al hacer click fuera del sidebar
  cartOverlay?.addEventListener("click", (e) => {
    if (e.target === cartOverlay) closeCart();
  });
});
