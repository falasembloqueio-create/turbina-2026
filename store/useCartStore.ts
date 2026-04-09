import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Definição do que é uma Peça de Carro para o TypeScript
interface Peca {
  id: number;
  title: string;
  price: number;
  categoria: string;
}

interface CartStore {
  cart: Peca[];
  addToCart: (peca: Peca) => void;
  removeFromCart: (id: number) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (peca) => {
        set((state) => ({
          // Geramos um ID único baseado no tempo para cada item adicionado
          cart: [...state.cart, { ...peca, id: Date.now() }]
        }));
      },
      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== id)
      })),
    }),
    { name: 'turbina-cart-storage' } // Nome da "caixinha" de memória no navegador
  )
);