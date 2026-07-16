"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Placeholder — se conectará a la DB
const WISHLIST_ITEMS: {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}[] = [];

export default function WishlistPage() {
  const items = WISHLIST_ITEMS;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-stone-900 flex items-center gap-3">
        <Heart className="w-7 h-7 text-red-400" />
        Mis favoritos
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="w-16 h-16 text-stone-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-stone-600 mb-2">
            Todavía no tenés favoritos
          </h2>
          <p className="text-stone-400 mb-6">
            Guardá tus productos preferidos para comprarlos después
          </p>
          <Link href="/categoria/carteras">
            <Button className="bg-amber-700 hover:bg-amber-800">
              Explorar productos
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="aspect-square bg-stone-100 rounded-lg mb-3" />
                <h3 className="font-medium text-stone-800">{item.name}</h3>
                <p className="text-amber-700 font-bold mt-1">
                  ${item.price.toLocaleString("es-AR")}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
