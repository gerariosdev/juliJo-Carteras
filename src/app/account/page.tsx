import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Package, Heart, MapPin, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/ingresar?callbackUrl=/account");

  const userId = session.user.id;
  let orderCount = 0;
  let wishlistCount = 0;

  try {
    const [orders, wishlist] = await Promise.all([
      prisma.order.count({ where: { userId } }),
      prisma.wishlistItem.count({ where: { userId } }),
    ]);
    orderCount = orders;
    wishlistCount = wishlist;
  } catch {
    // DB not connected
  }

  const sections = [
    {
      title: "Mis datos",
      icon: User,
      href: "/account/profile",
      desc: session.user.name || session.user.email || "",
    },
    {
      title: "Mis órdenes",
      icon: Package,
      href: "/account/orders",
      desc: `${orderCount} órdenes`,
    },
    {
      title: "Favoritos",
      icon: Heart,
      href: "/wishlist",
      desc: `${wishlistCount} productos`,
    },
    {
      title: "Direcciones",
      icon: MapPin,
      href: "/account/direcciones",
      desc: "Gestionar direcciones de envío",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-stone-900 mb-2">Mi cuenta</h1>
      <p className="text-stone-500 mb-8">
        Bienvenido, {session.user.name || session.user.email}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sections.map((section) => (
          <Link key={section.href} href={section.href}>
            <Card className="group hover:shadow-lg hover:border-amber-300 transition-all cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <section.icon className="w-6 h-6 text-amber-700" />
                  <div>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                    <p className="text-sm text-stone-500">{section.desc}</p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      {/* Admin link */}
      {/* @ts-expect-error - custom roles */}
      {session.user.roles?.some((r) => ["super_admin", "ventas", "inventario", "contenido"].includes(r.name)) && (
        <div className="mt-6">
          <Link href="/admin">
            <Card className="group hover:shadow-lg hover:border-amber-300 transition-all cursor-pointer border-amber-200 bg-amber-50/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <CardTitle className="text-lg">Panel Admin</CardTitle>
                    <p className="text-sm text-amber-600">Acceder al panel de administración</p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
        </div>
      )}
    </div>
  );
}
