import Link from "next/link";
import { prisma } from "@/lib/prisma";

async function getCategories() {
  try {
    return await prisma.category.findMany({ orderBy: { order: "asc" } });
  } catch {
    return [];
  }
}

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

const fallbackCategories = [
  { id: "1", name: "Carteras", slug: "carteras", description: null },
  { id: "2", name: "Carteritas", slug: "carteritas", description: null },
  { id: "3", name: "Billeteras", slug: "billeteras", description: null },
  { id: "4", name: "Mochilas", slug: "mochilas", description: null },
  { id: "5", name: "Accesorios", slug: "accesorios", description: null },
];

const fallbackProducts = [
  { name: "Cartera Clásica", price: 45000, cat: "Carteras" },
  { name: "Billetera Ejecutiva", price: 18000, cat: "Billeteras" },
  { name: "Carterita Tote", price: 32000, cat: "Carteritas" },
  { name: "Mochila Artesanal", price: 55000, cat: "Mochilas" },
];

export default async function Home() {
  const [categories, featuredProducts] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
  ]);

  const cats = categories.length > 0 ? categories : fallbackCategories;

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-stone-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 py-16 lg:py-24">
            <div className="flex-1 max-w-xl">
              <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-4">
                Marroquinería Artesanal
              </p>
              <h1 className="font-serif text-5xl lg:text-6xl text-stone-900 leading-tight">
                Carteras de cuero<br />
                <span className="text-primary">hechas a mano</span>
              </h1>
              <p className="mt-6 text-base text-stone-500 leading-relaxed max-w-md">
                Descubrí nuestra colección de marroquinería artesanal. Cada pieza es única, trabajada con cueros seleccionados y mucho amor.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/productos"
                  className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-hover transition shadow-sm"
                >
                  Ver colección
                </Link>
                <Link
                  href="/categoria/carteras"
                  className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-stone-300 text-stone-700 text-sm font-medium hover:border-primary hover:text-primary transition"
                >
                  Carteras
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full max-w-lg lg:max-w-none">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary-light to-stone-100 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-full bg-white/60 flex items-center justify-center mb-4">
                    <span className="font-serif text-4xl text-primary">JC</span>
                  </div>
                  <p className="text-primary/60 text-sm font-medium">Cuero genuino argentino</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">
              Categorías
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl text-stone-900">
              Explorá nuestros productos
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {cats.map((cat) => (
              <Link
                key={cat.id}
                href={`/categoria/${cat.slug}`}
                className="group relative aspect-square rounded-xl overflow-hidden bg-stone-100 hover:shadow-lg transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-light to-stone-200 group-hover:from-primary-light group-hover:to-primary/10 transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <h3 className="text-base font-semibold text-stone-800 group-hover:text-primary transition text-center">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">
                    Destacados
              </p>
              <h2 className="font-serif text-3xl lg:text-4xl text-stone-900">
                Productos destacados
              </h2>
            </div>
            <Link
              href="/productos"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover transition"
            >
              Ver todos
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(featuredProducts.length > 0 ? featuredProducts : fallbackProducts).map((product, i) => (
              <Link
                key={i}
                href={"/slug" in product ? `/producto/${(product as any).slug}` : "#"}
                className="group"
              >
                <div className="aspect-[3/4] bg-stone-50 rounded-xl overflow-hidden mb-4">
                  {"images" in product && (product as any).images?.[0] ? (
                    <div
                      className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                      style={{ backgroundImage: `url(${(product as any).images[0].url})` }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-200 group-hover:text-stone-300 transition">
                      <svg className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">
                  {"category" in product && (product as any).category?.name || (product as any).cat || ""}
                </p>
                <h3 className="font-medium text-stone-900 group-hover:text-primary transition">
                  {product.name}
                </h3>
                <p className="text-sm text-stone-500 mt-1">
                  ${(product as any).price.toLocaleString("es-AR")}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: "✦", title: "Cuero seleccionado", desc: "Los mejores cueros del país, seleccionados a mano uno por uno" },
              { icon: "🜁", title: "Hecho a mano", desc: "Cada pieza es única, trabajada artesanalmente con dedicación" },
              { icon: "◈", title: "Envíos a todo el país", desc: "Recibí tu pedido cómodamente en tu casa" },
            ].map((f) => (
              <div key={f.title} className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-5">
                  <span className="text-xl text-primary">{f.icon}</span>
                </div>
                <h3 className="font-serif text-lg text-stone-900 mb-2">{f.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed max-w-xs mx-auto">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
