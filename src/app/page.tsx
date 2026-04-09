'use client'
import { useCartStore } from "store/useCartStore"; 
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const addToCart = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart);
  const [mounted, setMounted] = useState(false);

  // Hydration Fix para Next.js 15
  useEffect(() => { setMounted(true); }, []);

  const pecas = [
    { id: 1, title: "Kit de Embreagem Heavy Duty", price: 1250.00, categoria: "Transmissão" },
    { id: 2, title: "Amortecedor Esportivo Bilstein", price: 850.50, categoria: "Suspensão" },
    { id: 3, title: "Filtro de Ar de Performance K&N", price: 320.00, categoria: "Admissão" },
    { id: 4, title: "Jogo de Pastilhas de Freio Cerâmica", price: 450.00, categoria: "Freios" },
  ];

  if (!mounted) return null;

  return (
    <main className="min-h-screen p-6 md:p-12 bg-gray-950 text-white font-sans">
      <header className="flex justify-between items-center mb-12 border-b-2 border-yellow-400 pb-6">
        <h1 className="text-5xl font-extrabold text-yellow-400 tracking-tighter">
          TURBINA <span className="text-white">2026</span>
        </h1>
        <Link href="/checkout" className="relative group">
          <div className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-lg group-hover:bg-blue-500 transition-all flex items-center gap-2 shadow-lg shadow-blue-900/50">
            🔧 Meu Carrinho
            <span className="bg-yellow-400 text-black rounded-full w-7 h-7 flex items-center justify-center text-sm font-black">
              {cart.length}
            </span>
          </div>
        </Link>
      </header>

      <section>
        <h2 className="text-3xl font-bold mb-8 text-emerald-400">Peças em Destaque</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pecas.map(peca => (
            <div key={peca.id} className="bg-gray-900 border-2 border-gray-800 p-6 rounded-3xl flex flex-col justify-between hover:border-emerald-500 transition-all group shadow-xl">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-800 px-3 py-1 rounded-full">
                  {peca.categoria}
                </span>
                <h3 className="text-2xl font-black mt-4 mb-2 group-hover:text-emerald-400 transition-colors">
                  {peca.title}
                </h3>
                <p className="text-3xl font-extrabold text-yellow-400 mb-6">
                  R$ {peca.price.toFixed(2)}
                </p>
              </div>
              
              <button 
                onClick={() => addToCart(peca)}
                className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-500 active:scale-95 transition-all text-lg shadow-lg shadow-emerald-900/50"
              >
                Adicionar à Compra
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-20 text-center text-gray-600 border-t border-gray-800 pt-10">
        <p>&copy; 2026 Turbina Peças Automotivas Ltda. O melhor para o seu motor.</p>
      </footer>
    </main>
  );
}