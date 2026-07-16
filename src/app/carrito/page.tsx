"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart, ChevronRight, Trash2, Minus, Plus } from "lucide-react";
import Link from "next/link";

// Placeholder — se conectará a la DB cuando esté configurada
const CART_ITEMS: {
  id: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string | null;
}[] = [];

export default function CartPage() {
  const items = CART_ITEMS;
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-stone-900 flex items-center gap-3">
        <ShoppingCart className="w-7 h-7" />
        Carrito de compras
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingCart className="w-16 h-16 text-stone-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-stone-600 mb-2">
            Tu carrito está vacío
          </h2>
          <p className="text-stone-400 mb-6">
            Agregá productos para empezar a comprar
          </p>
          <Link href="/categoria/carteras">
            <Button className="bg-amber-700 hover:bg-amber-800">
              Ver productos
            </Button>
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 bg-white rounded-lg border border-stone-200"
            >
              <div className="w-20 h-20 bg-stone-100 rounded-lg shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-stone-800 truncate">
                  {item.name}
                </h3>
                <p className="text-sm text-stone-500">{item.variant}</p>
                <p className="text-amber-700 font-bold mt-1">
                  ${item.price.toLocaleString("es-AR")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-stone-100 rounded">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button className="p-1 hover:bg-stone-100 rounded">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          <div className="border-t border-stone-200 pt-6 mt-6">
            <div className="flex items-center justify-between text-lg">
              <span className="font-semibold text-stone-800">Total</span>
              <span className="font-bold text-amber-700 text-xl">
                ${total.toLocaleString("es-AR")}
              </span>
            </div>
            <Link href="/checkout">
              <Button className="w-full mt-4 bg-amber-700 hover:bg-amber-800 py-6 text-lg">
                Finalizar compra
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
