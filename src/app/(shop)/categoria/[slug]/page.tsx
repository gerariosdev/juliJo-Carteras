import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) return { title: "Categoría no encontrada" };
  return {
    title: `${category.name} — JuliJo Carteras`,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let category;
  try {
    category = await prisma.category.findUnique({
      where: { slug },
      include: {
        products: {
          where: { isActive: true },
          include: {
            images: { where: { isPrimary: true }, take: 1 },
            variants: {
              where: { isActive: true },
              select: { price: true, stock: true },
              take: 1,
            },
            material: true,
          },
        },
      },
    });
  } catch {
    // DB not available
  }

  if (!category) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-stone-500 mb-6">
        <Link href="/" className="hover:text-amber-700">
          Inicio
        </Link>
        <span className="mx-2">/</span>
        <span className="text-stone-800">{category.name}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">{category.name}</h1>
        {category.description && (
          <p className="mt-2 text-stone-500">{category.description}</p>
        )}
      </div>

      {category.products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-stone-400 text-lg">
            Próximamente nuevos productos en esta categoría
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {category.products.map((product) => (
            <Link key={product.id} href={`/producto/${product.slug}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 border-stone-200 overflow-hidden">
                <div className="aspect-square bg-stone-100 overflow-hidden">
                  {product.images[0] ? (
                    <div
                      className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url(${product.images[0].url})` }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-300">
                      <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-stone-800 group-hover:text-amber-700 transition">
                        {product.name}
                      </h3>
                      {product.material && (
                        <p className="text-xs text-stone-400 mt-0.5">
                          {product.material.name}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-amber-700 font-bold mt-2">
                    ${Number(product.variants[0]?.price || product.price).toLocaleString("es-AR")}
                  </p>
                  <Badge
                    variant={product.variants[0]?.stock > 0 ? "success" : "destructive"}
                    className="mt-1"
                  >
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
