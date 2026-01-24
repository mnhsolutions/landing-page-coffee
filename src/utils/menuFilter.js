document.addEventListener("DOMContentLoaded", () => {
  const menuGrid = document.getElementById("menu-products");
  if (!menuGrid) return;

  const buttons = document.querySelectorAll("[data-filter]");
  const items = menuGrid.querySelectorAll("li");

  function applyFilter(category, activeButton) {
    // reset visual
    buttons.forEach((btn) => {
      btn.classList.remove("active", "border-amber-600", "bg-rose-100");
    });

    // estado activo
    activeButton.classList.add("active", "border-amber-600", "bg-rose-100");

    // filtrado
    items.forEach((item) => {
      const card = item.querySelector(".menu-card");
      const match = category === "all" || card.dataset.category === category;

      item.classList.toggle("is-hidden", !match);
    });

    // Funcionamiento para mobile (horizontal)
    const isMobile = () => window.matchMedia("(max-width: 639px)").matches;

    if (isMobile()) {
      menuGrid.scrollTo({ left: 0, behavior: "smooth" });
    }
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
