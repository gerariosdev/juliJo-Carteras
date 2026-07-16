import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package,
  ShoppingBag,
  Users,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) redirect("/ingresar?callbackUrl=/admin");

  // @ts-expect-error - custom roles
  const roles = session.user.roles || [];
  const isAdmin = roles.some(
    (r: { name: string }) =>
      ["super_admin", "ventas", "inventario", "contenido"].includes(r.name)
  );
  if (!isAdmin) redirect("/?error=unauthorized");

  // Stats
  let stats = { products: 0, orders: 0, users: 0, revenue: 0 };
  try {
    const [products, orders, users] = await Promise.all([
      prisma.product.count({ where: { isActive: true } }),
      prisma.order.count(),
      prisma.user.count(),
    ]);
    const revenueAgg = await prisma.order.aggregate({
      _sum: { total: true },
      where: { status: "DELIVERED" },
    });
    stats = {
      products,
      orders,
      users,
      revenue: Number(revenueAgg._sum.total || 0),
    };
  } catch {
    // DB not connected yet
  }

  const menuItems = [
    {
      title: "Productos",
      icon: ShoppingBag,
      href: "/admin/productos",
      desc: "Gestionar catálogo",
      roles: ["super_admin", "ventas", "inventario"],
    },
    {
      title: "Órdenes",
      icon: Package,
      href: "/admin/ordenes",
      desc: "Ver y gestionar pedidos",
      roles: ["super_admin", "ventas"],
    },
    {
      title: "Usuarios",
      icon: Users,
      href: "/admin/usuarios",
      desc: "Gestionar usuarios y roles",
      roles: ["super_admin"],
    },
    {
      title: "Blog",
      icon: TrendingUp,
      href: "/admin/blog",
      desc: "Publicar artículos",
      roles: ["super_admin", "contenido"],
    },
  ];

  const userRoles = roles.map((r: { name: string }) => r.name);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-stone-900 mb-8">
        Panel de Administración
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-stone-500">Productos</p>
            <p className="text-3xl font-bold text-stone-900 mt-1">
              {stats.products}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-stone-500">Órdenes</p>
            <p className="text-3xl font-bold text-stone-900 mt-1">
              {stats.orders}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-stone-500">Usuarios</p>
            <p className="text-3xl font-bold text-stone-900 mt-1">
              {stats.users}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-stone-500">Ingresos</p>
            <p className="text-3xl font-bold text-amber-700 mt-1">
              ${stats.revenue.toLocaleString("es-AR")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Menu */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {menuItems
          .filter((item) =>
            item.roles.some((r) => userRoles.includes(r))
          )
          .map((item) => (
            <Link key={item.href} href={item.href}>
              <Card className="group hover:shadow-lg hover:border-amber-300 transition-all cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <item.icon className="w-8 h-8 text-amber-700" />
                    <ArrowRight className="w-5 h-5 text-stone-300 group-hover:text-amber-700 transition" />
                  </div>
                  <CardTitle className="mt-4">{item.title}</CardTitle>
                  <p className="text-sm text-stone-500">{item.desc}</p>
                </CardHeader>
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
}
