let toastTimeout = null;

export function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  if (!toast) return;

  // Limpiar timeout anterior
  if (toastTimeout) clearTimeout(toastTimeout);

  // Reset de estado visual (NO borramos className)
  toast.classList.remove(
    "opacity-100",
    "translate-y-0",
    "bg-green-600",
    "bg-orange-700",
    "bg-red-600"
  );

  // Colores según tipo
  const colors = {
    success: "bg-green-600",
    warning: "bg-orange-700",
    error: "bg-red-600"
  };

  toast.classList.add(colors[type] || colors.success);
  toast.textContent = message;

  // Forzamos repaint antes de mostrar
  requestAnimationFrame(() => {
    toast.classList.remove("opacity-0", "-translate-y-6");
    toast.classList.add("opacity-100", "translate-y-0");
  });

  // Ocultar automáticamente
  toastTimeout = setTimeout(() => {
    toast.classList.remove("opacity-100", "translate-y-0");
    toast.classList.add("opacity-0", "-translate-y-6");
  }, 2200);
}
