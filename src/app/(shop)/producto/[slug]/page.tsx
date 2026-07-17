import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/AddToCartButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: `${product.name} — JuliJo Carteras`,
    description: product.seoDesc || product.description.slice(0, 160),
    openGraph: {
      title: product.seoTitle || product.name,
      description: product.seoDesc || product.description.slice(0, 160),
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let product;
  try {
    product = await prisma.product.findUnique({
      where: { slug },
      include: {
        images: { orderBy: { order: "asc" } },
        variants: { where: { isActive: true } },
        category: true,
        material: true,
        tags: { include: { tag: true } },
      },
    });
  } catch {
    // DB unavailable
  }

  if (!product || !product.isActive) notFound();

  const hasStock = product.variants.some((v) => v.stock > 0);
  const minPrice = Math.min(
    ...product.variants.map((v) => Number(v.price || product.price))
  );
  const maxPrice = Math.max(
    ...product.variants.map((v) => Number(v.price || product.price))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-stone-500 mb-6">
        <Link href="/" className="hover:text-amber-700">
          Inicio
        </Link>
        <span className="mx-2">/</span>
        {product.category && (
          <>
            <Link
              href={`/categoria/${product.category.slug}`}
              className="hover:text-amber-700"
            >
              {product.category.name}
            </Link>
            <span className="mx-2">/</span>
          </>
        )}
        <span className="text-stone-800">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Gallery */}
        <div>
          <div className="aspect-square bg-stone-100 rounded-xl overflow-hidden mb-4">
            {product.images[0] ? (
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${product.images[0].url})` }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-stone-300">
                <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1, 5).map((img) => (
                <div
                  key={img.id}
                  className="aspect-square bg-stone-100 rounded-lg overflow-hidden cursor-pointer"
                >
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${img.url})` }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            {product.category && (
              <Badge variant="secondary">{product.category.name}</Badge>
            )}
            {product.material && (
              <Badge variant="outline">{product.material.name}</Badge>
            )}
          </div>

          <h1 className="text-3xl font-bold text-stone-900">{product.name}</h1>

          <div className="mt-4">
            <span className="text-3xl font-bold text-amber-700">
              ${minPrice.toLocaleString("es-AR")}
            </span>
            {maxPrice > minPrice && (
              <span className="text-xl text-stone-400 ml-2">
                — ${maxPrice.toLocaleString("es-AR")}
              </span>
            )}
          </div>

          <Badge
            variant={hasStock ? "success" : "destructive"}
            className="mt-3"
          >
            {hasStock ? "En stock" : "Sin stock"}
          </Badge>

          {/* Variants */}
          {product.variants.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-stone-700 mb-2">
                Variantes disponibles
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {product.variants.map((variant) => (
                  <div
                    key={variant.id}
                    className={`p-3 rounded-lg border text-sm ${
                      variant.stock > 0
                        ? "border-stone-200 hover:border-amber-300 cursor-pointer"
                        : "border-stone-200 opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {variant.color && (
                        <span className="font-medium text-stone-700">
                          {variant.color}
                        </span>
                      )}
                      {variant.size && (
                        <span className="text-stone-400">{variant.size}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-amber-700 font-semibold">
                        ${Number(variant.price || product.price).toLocaleString("es-AR")}
                      </span>
                      <span
                        className={`text-xs ${
                          variant.stock > 0 ? "text-emerald-600" : "text-red-500"
                        }`}
                      >
                        {variant.stock > 0 ? `${variant.stock} uds.` : "agotado"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-stone-700 mb-2">
              Descripción
            </h3>
            <p className="text-stone-600 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {product.tags.map((pt) => (
                <Badge key={pt.tagId} variant="outline" className="text-xs">
                  #{pt.tag.name}
                </Badge>
              ))}
            </div>
          )}

          {/* Add to cart */}
          <div className="mt-8">
            <AddToCartButton
              productId={product.id}
              hasStock={hasStock}
              variants={product.variants.map((v) => ({
                id: v.id,
                label: [v.color, v.size].filter(Boolean).join(" - ") || v.sku,
                stock: v.stock,
                price: Number(v.price || product.price),
              }))}
            />
          </div>

          {/* Payment info */}
          <div className="mt-6 p-4 bg-amber-50 rounded-lg">
            <p className="text-sm text-stone-600">
              💳 Pagá con Mercado Pago, transferencia o todas las tarjetas
            </p>
            <p className="text-sm text-stone-500 mt-1">
              🚚 Envíos a todo el país
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
