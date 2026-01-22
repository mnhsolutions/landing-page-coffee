import { addToCart, initCart, getCart} from '../utils/cart.js';
import { useEffect } from 'react';

export default function AddButton({ product }) {
  useEffect(() => {
    initCart(); // carga carrito desde localStorage al montar el componente
  }, []);

  const handleAdd = () => {
    addToCart(product);
  };

  return (
    <button
      className="flex justify-center items-center h-8 w-8 bg-amber-500 rounded-full shrink-0
      hover:cursor-pointer hover:bg-amber-800 transition-colors duration-300 ease-in-out"
      onClick={handleAdd}>
      +
    </button>
  );
}
