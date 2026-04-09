'use client'
import { useCartStore } from "store/useCartStore"; 
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Checkout() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="min-h-screen bg-gray-950 text-white p-12 font-bold">Carregando Pedido...</div>;

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <main className="min-h-screen p-6 md:p-12 bg-gray-950 text-white font-sans">
      <Link href="/" className="text-blue-400 font-bold hover:text-blue-300 transition-colors text-lg flex items-center gap-2 mb-10">
        ← Voltar para a Loja
      </Link>
      
      <h1 className="text-5xl font-black mb-12 tracking-tighter text-white">Confirmar Pedido</h1>

      {cart.length === 0 ? (
        <div className="bg-gray-900 p-12 rounded-3xl text-center border-2 border-dashed border-gray-700">
          <p className="text-2xl text-gray-500 font-bold">Seu carrinho está vazio. Adicione peças para turbinar seu carro!</p>
          <Link href="/" className="inline-block mt-8 bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold text-lg">
            Ver Peças
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="bg-gray-900 border border-gray-800 p-6 rounded-2xl flex justify-between items-center shadow-lg hover:border-blue-500 transition-all">
                <div>
                  <h2 className="text-xl font-bold text-white">{item.title}</h2>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{item.categoria}</p>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-2xl font-extrabold text-yellow-400">
                    R$ {item.price.toFixed(2)}
                  </span>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 font-bold hover:text-red-400 hover:underline transition-colors"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-900 p-8 rounded-3xl border-2 border-gray-800 h-fit shadow-2xl shadow-gray-950">
            <h2 className="text-2xl font-bold mb-6 text-gray-400">Resumo do Pedido</h2>
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-800">
              <span className="text-xl font-bold text-white">Total à vista:</span>
              <span className="text-4xl font-black text-yellow-400 tracking-tight">
                R$ {total.toFixed(2)}
              </span>
            </div>
            
            <button className="w-full bg-yellow-400 text-gray-950 py-5 rounded-2xl font-black text-2xl hover:bg-yellow-300 active:scale-95 transition-all shadow-lg shadow-yellow-900/30">
              FINALIZAR COMPRA 🚀
            </button>
            <p className="text-xs text-gray-600 text-center mt-4">Processamento seguro e envio imediato.</p>
          </div>
        </div>
      )}
    </main>
  );
}