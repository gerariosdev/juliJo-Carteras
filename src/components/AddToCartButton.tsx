"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

type Variant = {
  id: string;
  label: string;
  stock: number;
  price: number;
};

export function AddToCartButton({
  productId,
  hasStock,
  variants,
}: {
  productId: string;
  hasStock: boolean;
  variants: Variant[];
}) {
  const [selectedVariant, setSelectedVariant] = useState<string>(
    variants.find((v) => v.stock > 0)?.id || ""
  );
  const [quantity, setQuantity] = useState(1);

  const selected = variants.find((v) => v.id === selectedVariant);

  return (
    <div className="space-y-4">
      {/* Variant selector */}
      {variants.length > 1 && (
        <div>
          <label className="text-sm font-medium text-stone-700 block mb-2">
            Seleccionar variante
          </label>
          <select
            value={selectedVariant}
            onChange={(e) => setSelectedVariant(e.target.value)}
            className="w-full p-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {variants.map((v) => (
              <option key={v.id} value={v.id} disabled={v.stock === 0}>
                {v.label} — ${v.price.toLocaleString("es-AR")}
                {v.stock === 0 ? " (agotado)" : ""}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Quantity */}
      <div>
        <label className="text-sm font-medium text-stone-700 block mb-2">
          Cantidad
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-lg border border-stone-200 flex items-center justify-center hover:bg-stone-50"
          >
            -
          </button>
          <span className="w-12 text-center font-medium text-lg">{quantity}</span>
          <button
            onClick={() =>
              setQuantity(Math.min(selected?.stock || 99, quantity + 1))
            }
            className="w-10 h-10 rounded-lg border border-stone-200 flex items-center justify-center hover:bg-stone-50"
          >
            +
          </button>
        </div>
      </div>

      <Button
        disabled={!hasStock || !selectedVariant}
        className="w-full bg-amber-700 hover:bg-amber-800 py-6 text-lg"
      >
        <ShoppingCart className="w-5 h-5 mr-2" />
        Agregar al carrito
      </Button>
    </div>
  );
}
