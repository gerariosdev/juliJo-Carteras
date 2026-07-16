import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  LogOut,
  Package,
} from "lucide-react";

export async function Header() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-700 to-amber-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">JC</span>
            </div>
            <span className="hidden sm:block font-bold text-lg tracking-tight">
              JuliJo <span className="text-primary">Carteras</span>
            </span>
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/productos"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Productos
            </Link>
            <Link
              href="/categoria/mochilas"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Mochilas
            </Link>
            <Link
              href="/categoria/carteras"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Carteras
            </Link>
            <Link
              href="/categoria/billeteras"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Billeteras
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </Link>
          </nav>

          {/* Acciones */}
          <div className="flex items-center gap-2">
            {/* Búsqueda */}
            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar productos..."
                className="w-48 lg:w-64 h-9 pl-9 text-sm rounded-full bg-stone-50 border-border"
              />
            </div>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/wishlist" aria-label="Lista de deseos">
                <Heart className="w-5 h-5" />
              </Link>
            </Button>

            {/* Carrito */}
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/carrito" aria-label="Carrito de compras">
                <ShoppingBag className="w-5 h-5" />
                {/* Badge de cantidad - se integrará con el estado del carrito */}
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                  0
                </span>
              </Link>
            </Button>

            {/* Auth */}
            {user ? (
              <div className="hidden sm:flex items-center gap-1">
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/account" aria-label="Mi cuenta">
                    <User className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/account/orders" aria-label="Mis pedidos">
                    <Package className="w-5 h-5" />
                  </Link>
                </Button>
                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                  }}
                >
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    aria-label="Cerrar sesión"
                  >
                    <LogOut className="w-5 h-5" />
                  </Button>
                </form>
              </div>
            ) : (
              <Button asChild variant="default" size="sm" className="hidden sm:flex">
                <Link href="/ingresar">Ingresar</Link>
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden border-t border-border px-4 py-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar productos..."
            className="w-full h-9 pl-9 text-sm rounded-full bg-stone-50"
          />
        </div>
      </div>
    </header>
  );
}
