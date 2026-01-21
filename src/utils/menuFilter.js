document.addEventListener("DOMContentLoaded", () => {
  const menuGrid = document.getElementById("menu-products");
  if (!menuGrid) return;

  const buttons = document.querySelectorAll("[data-filter]");
  const cards = menuGrid.querySelectorAll(".menu-card");

  function applyFilter(category, activeButton) {
    // reset visual
    buttons.forEach((btn) => {
      btn.classList.remove("active", "border-amber-600","bg-rose-100");
    });

    // estado activo
    activeButton.classList.add("active", "border-amber-600", "bg-rose-100");

    // filtrado
    cards.forEach((card) => {
      const match = category === "all" || card.dataset.category === category;
      card.classList.toggle("is-hidden", !match);
    });
  }

  // estado inicial
  const defaultButton = document.querySelector('[data-filter="all"]');
  if (defaultButton) {
    applyFilter("all", defaultButton);
  }

  // eventos
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      applyFilter(btn.dataset.filter, btn);
    });
  });
});
