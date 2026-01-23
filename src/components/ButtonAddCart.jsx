import { addToCart, initCart } from "../utils/cart.js";
import { useEffect } from "react";

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
      <svg
        width="24"
        height="24"
        fill="#fff"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11.883 3.007 12 3a1 1 0 0 1 .993.883L13 4v7h7a1 1 0 0 1 .993.883L21 12a1 1 0 0 1-.883.993L20 13h-7v7a1 1 0 0 1-.883.993L12 21a1 1 0 0 1-.993-.883L11 20v-7H4a1 1 0 0 1-.993-.883L3 12a1 1 0 0 1 .883-.993L4 11h7V4a1 1 0 0 1 .883-.993L12 3l-.117.007Z"></path>
      </svg>
    </button>
  );
}
