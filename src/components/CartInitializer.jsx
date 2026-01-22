import { useEffect } from 'react';
import { initCart } from '../utils/cart.js';

export default function CartInitializer() {
  useEffect(() => {
    initCart(); // Inicializa el carrito desde localStorage
    console.log("Carrito cargado:", JSON.parse(localStorage.getItem('cart')));
  }, []);

  return null; // No renderiza nada visible
}
