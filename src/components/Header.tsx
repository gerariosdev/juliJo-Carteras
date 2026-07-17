"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
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

export function Header() {
  const { data: session } = useSession();
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

          {/* Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/productos" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Productos
            </Link>
            <Link href="/categoria/carteras" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Carteras
            </Link>
            <Link href="/categoria/billeteras" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Billeteras
            </Link>
            <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Blog
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar productos..."
                className="w-48 lg:w-64 h-9 pl-9 text-sm rounded-full bg-stone-50 border-border"
              />
            </div>

            {/* Wishlist */}
            <Link href="/wishlist" aria-label="Lista de deseos" className="p-2 hover:bg-primary-light hover:text-primary rounded-full transition relative">
              <Heart className="w-5 h-5" />
            </Link>

            {/* Cart */}
            <Link href="/carrito" aria-label="Carrito de compras" className="p-2 hover:bg-primary-light hover:text-primary rounded-full transition relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Auth */}
            {user ? (
              <div className="relative group">
                <button className="p-2 hover:bg-primary-light hover:text-primary rounded-full transition">
                  <User className="w-5 h-5" />
                </button>
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-3 border-b border-border">
                    <p className="text-sm font-medium truncate">{user.name || user.email}</p>
                  </div>
                  <div className="p-1">
                    <Link href="/account" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-stone-50 rounded">
                      <User className="w-4 h-4" /> Mi cuenta
                    </Link>
                    <Link href="/account/orders" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-stone-50 rounded">
                      <Package className="w-4 h-4" /> Mis órdenes
                    </Link>
                    {/* @ts-expect-error - custom field */}
                    {user?.roles?.some(r => ["super_admin","ventas","inventario","contenido"].includes(r.name)) && (
                      <Link href="/admin" className="flex items-center gap-2 px-3 py-2 text-sm text-amber-700 hover:bg-amber-50 rounded">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Admin
                      </Link>
                    )}
                    <button onClick={() => signOut()} className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded">
                      <LogOut className="w-4 h-4" /> Cerrar sesión
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/ingresar">
                <Button className="bg-primary text-white shadow-sm hover:bg-primary-hover h-9 rounded-md px-3 text-xs hidden sm:flex">
                  Ingresar
                </Button>
              </Link>
            )}

            {/* Mobile menu */}
            <button className="lg:hidden p-2 hover:bg-primary-light hover:text-primary rounded-full transition">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
