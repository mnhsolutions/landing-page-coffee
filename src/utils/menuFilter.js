document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll(".menu-card");

  // función central de filtrado
  function applyFilter(category, activeButton) {
    // estado visual
    buttons.forEach((btn) => {
      btn.classList.remove("border-amber-600", "bg-rose-100");
    });

    activeButton.classList.add("border-amber-600", "bg-rose-100");

    // filtrado
    cards.forEach((card) => {
      card.style.display =
        category === "all" || card.dataset.category === category
          ? "grid"
          : "none";
    });
  }

  // estado inicial → Todos los productos
  const defaultButton = document.querySelector('[data-filter="all"]');
  if (defaultButton) {
    applyFilter("all", defaultButton);
  }

  // clicks
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      applyFilter(btn.dataset.filter, btn);
    });
  });
});
