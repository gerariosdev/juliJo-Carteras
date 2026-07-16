import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";

async function getFeaturedProducts() {
  try {
    return await prisma.product.findMany({
      where: { isFeatured: true, isActive: true },
      include: {
        images: { where: { isPrimary: true }, take: 1 },
        category: true,
        variants: { where: { isActive: true }, select: { price: true, stock: true }, take: 1 },
      },
      take: 4,
    });
  } catch {
    return [];
  }
}

async function getCategories() {
  try {
    return await prisma.category.findMany({ orderBy: { order: "asc" } });
  } catch {
    return [];
  }
}

export default async function Home() {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 via-amber-100 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-amber-700 text-white text-sm px-3 py-1">
              Artesanía argentina
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-stone-900 leading-tight">
              Carteras de cuero{" "}
              <span className="text-amber-700">hechas a mano</span>
            </h1>
            <p className="mt-4 text-lg text-stone-600 max-w-lg">
              Descubrí nuestra colección de marroquinería artesanal. Cada pieza
              es única, trabajada con cueros seleccionados y mucho amor.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/categoria/carteras">
                <Button className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-6 text-lg">
                  Ver colección
                </Button>
              </Link>
              <Link href="/categoria/billeteras">
                <Button
                  variant="outline"
                  className="border-amber-700 text-amber-700 hover:bg-amber-50 px-8 py-6 text-lg"
                >
                  Billeteras
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative element */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block">
          <div className="w-full h-full bg-gradient-to-l from-amber-200/50 to-transparent" />
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900">
              Categorías
            </h2>
            <p className="mt-2 text-stone-500">
              Explorá nuestros productos por categoría
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categoria/${cat.slug}`}
                  className="group relative h-40 md:h-52 rounded-xl overflow-hidden bg-gradient-to-br from-amber-100 to-amber-200 hover:from-amber-200 hover:to-amber-300 transition-all duration-300"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-stone-800 group-hover:text-amber-800 transition">
                        {cat.name}
                      </h3>
                      {cat.description && (
                        <p className="text-sm text-stone-600 mt-1 px-4 line-clamp-2">
                          {cat.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <>
                {["Carteras", "Carteritas", "Billeteras", "Accesorios"].map(
                  (name) => (
                    <Link
                      key={name}
                      href={`/categoria/${name.toLowerCase()}`}
                      className="group relative h-40 md:h-52 rounded-xl overflow-hidden bg-gradient-to-br from-amber-100 to-amber-200 hover:from-amber-200 hover:to-amber-300 transition-all duration-300"
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <h3 className="text-xl font-bold text-stone-800 group-hover:text-amber-800 transition">
                          {name}
                        </h3>
                      </div>
                    </Link>
                  )
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-stone-900">
                Productos destacados
              </h2>
              <p className="mt-2 text-stone-500">
                Lo más elegido por nuestros clientes
              </p>
            </div>
            <Link href="/categoria/carteras">
              <Button
                variant="outline"
                className="hidden sm:flex border-amber-700 text-amber-700"
              >
                Ver todos
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <Link key={product.id} href={`/producto/${product.slug}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 border-stone-200 overflow-hidden">
                    <div className="aspect-square bg-stone-100 relative overflow-hidden">
                      {product.images[0] ? (
                        <div
                          className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                          style={{
                            backgroundImage: `url(${product.images[0].url})`,
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-300">
                          <svg
                            className="w-16 h-16"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                      {product.category && (
                        <Badge className="absolute top-2 left-2 bg-white/90 text-stone-700 border-0">
                          {product.category.name}
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-stone-800 group-hover:text-amber-700 transition">
                        {product.name}
                      </h3>
                      <p className="text-amber-700 font-bold mt-1">
                        ${Number(product.variants[0]?.price || product.price).toLocaleString("es-AR")}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <>
                {[
                  { name: "Cartera Clásica", price: "$45.000" },
                  { name: "Billetera Ejecutiva", price: "$18.000" },
                  { name: "Carterita Tote", price: "$32.000" },
                  { name: "Mochila Artesanal", price: "$55.000" },
                ].map((p) => (
                  <Card
                    key={p.name}
                    className="group hover:shadow-lg transition-all duration-300 border-stone-200 overflow-hidden"
                  >
                    <div className="aspect-square bg-stone-100 flex items-center justify-center text-stone-300">
                      <svg
                        className="w-16 h-16"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-stone-800">{p.name}</h3>
                      <p className="text-amber-700 font-bold mt-1">{p.price}</p>
                    </CardContent>
                  </Card>
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-amber-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-stone-800">
                Cuero seleccionado
              </h3>
              <p className="mt-2 text-sm text-stone-500">
                Trabajamos con los mejores cueros del país, seleccionados a mano
              </p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-amber-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-stone-800">
                Hecho a mano
              </h3>
              <p className="mt-2 text-sm text-stone-500">
                Cada pieza es única, trabajada artesanalmente con dedicación
              </p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-amber-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-stone-800">
                Pagá como quieras
              </h3>
              <p className="mt-2 text-sm text-stone-500">
                Aceptamos Mercado Pago, transferencia y todas las tarjetas
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
