import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Todos los productos — JuliJo Carteras",
  description: "Explorá nuestra colección completa de marroquinería artesanal",
};

export default async function ProductosPage() {
  let products: any[] = [];
  try {
    products = await prisma.product.findMany({
      where: { isActive: true },
      include: {
        images: { where: { isPrimary: true }, take: 1 },
        variants: { where: { isActive: true }, select: { price: true, stock: true }, take: 1 },
        category: true,
        material: true,
      },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // DB not available
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm text-stone-500 mb-6">
        <Link href="/" className="hover:text-amber-700">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-stone-800">Productos</span>
      </nav>

      <h1 className="text-3xl font-bold text-stone-900 mb-2">Todos los productos</h1>
      <p className="text-stone-500 mb-8">Explorá nuestra colección completa de marroquinería artesanal</p>

      {products.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[
            { name: "Cartera Clásica", price: "$45.000", cat: "Carteras" },
            { name: "Billetera Ejecutiva", price: "$18.000", cat: "Billeteras" },
            { name: "Carterita Tote", price: "$32.000", cat: "Carteritas" },
            { name: "Mochila Artesanal", price: "$55.000", cat: "Mochilas" },
            { name: "Cinturón Cuero", price: "$12.000", cat: "Accesorios" },
            { name: "Portafolio Ejecutivo", price: "$65.000", cat: "Carteras" },
          ].map((p) => (
            <Card key={p.name} className="group hover:shadow-lg transition-all border-stone-200 overflow-hidden">
              <div className="aspect-square bg-stone-100 flex items-center justify-center text-stone-300">
                <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <CardContent className="p-4">
                <Badge variant="secondary" className="mb-2">{p.cat}</Badge>
                <h3 className="font-semibold text-stone-800">{p.name}</h3>
                <p className="text-amber-700 font-bold mt-1">{p.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/producto/${product.slug}`}>
              <Card className="group hover:shadow-lg transition-all border-stone-200 overflow-hidden h-full">
                <div className="aspect-square bg-stone-100 overflow-hidden">
                  {product.images[0] ? (
                    <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url(${product.images[0].url})` }} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-300">
                      <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  {product.category && <Badge variant="secondary" className="mb-2">{product.category.name}</Badge>}
                  <h3 className="font-semibold text-stone-800 group-hover:text-amber-700 transition">{product.name}</h3>
                  {product.material && <p className="text-xs text-stone-400 mt-0.5">{product.material.name}</p>}
                  <p className="text-amber-700 font-bold mt-2">${Number(product.variants[0]?.price || product.price).toLocaleString("es-AR")}</p>
                  <Badge variant={product.variants[0]?.stock > 0 ? "success" : "destructive"} className="mt-1">
                    {product.variants[0]?.stock > 0 ? "En stock" : "Sin stock"}
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
