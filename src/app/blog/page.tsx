import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

export const metadata = {
  title: "Blog — JuliJo Carteras",
  description: "Consejos, cuidados y novedades sobre marroquinería artesanal",
};

export default async function BlogPage() {
  let posts: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    coverImage: string | null;
    category: string | null;
    publishedAt: Date | null;
  }[] = [];

  try {
    posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
      take: 12,
    });
  } catch {
    // DB not connected
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-stone-900 mb-2">Blog</h1>
      <p className="text-stone-500 mb-8">
        Consejos, cuidados y novedades sobre marroquinería artesanal
      </p>

      {posts.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Cómo cuidar tus carteras de cuero",
              category: "Cuidados",
            },
            {
              title: "Tipos de cuero: guía para principiantes",
              category: "Materiales",
            },
            {
              title: "Tendencias en marroquinería 2026",
              category: "Tendencias",
            },
          ].map((post) => (
            <Card
              key={post.title}
              className="group hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="aspect-video bg-stone-100 rounded-t-lg" />
              <CardContent className="p-4">
                <span className="text-xs text-amber-700 font-medium uppercase">
                  {post.category}
                </span>
                <h3 className="font-semibold text-stone-800 mt-1 group-hover:text-amber-700 transition">
                  {post.title}
                </h3>
                <div className="flex items-center gap-1 mt-2 text-xs text-stone-400">
                  <CalendarDays className="w-3 h-3" />
                  <span>Próximamente</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="group hover:shadow-lg transition-all h-full">
                <div
                  className="aspect-video bg-stone-100 rounded-t-lg bg-cover bg-center"
                  style={
                    post.coverImage
                      ? { backgroundImage: `url(${post.coverImage})` }
                      : undefined
                  }
                />
                <CardContent className="p-4">
                  {post.category && (
                    <span className="text-xs text-amber-700 font-medium uppercase">
                      {post.category}
                    </span>
                  )}
                  <h3 className="font-semibold text-stone-800 mt-1 group-hover:text-amber-700 transition">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-sm text-stone-500 mt-2 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  {post.publishedAt && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-stone-400">
                      <CalendarDays className="w-3 h-3" />
                      <span>
                        {post.publishedAt.toLocaleDateString("es-AR")}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
