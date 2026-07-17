"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Search, ShoppingBag, Heart, User, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const user = session?.user;
  const isAdmin = (user as any)?.roles?.some(
    (r: { name: string }) =>
      ["super_admin", "ventas", "inventario", "contenido"].includes(r.name)
  );

  return (
    <header className="sticky top-0 z-50 bg-white/98 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Hamburger (mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 -ml-2 text-stone-600 hover:text-stone-900 transition"
            aria-label="Menú"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm tracking-wider">JC</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-serif text-2xl text-stone-900 tracking-wide">JuliJo</span>
              <span className="text-xs text-stone-400 block -mt-0.5">Carteras</span>
            </div>
          </Link>

          {/* Nav Desktop */}
          <nav className="hidden lg:flex items-center gap-10 text-sm">
            <Link href="/productos" className="text-stone-600 hover:text-stone-900 transition font-medium tracking-wide uppercase text-xs">
              Productos
            </Link>
            <Link href="/categoria/carteras" className="text-stone-600 hover:text-stone-900 transition font-medium tracking-wide uppercase text-xs">
              Carteras
            </Link>
            <Link href="/categoria/billeteras" className="text-stone-600 hover:text-stone-900 transition font-medium tracking-wide uppercase text-xs">
              Billeteras
            </Link>
            <Link href="/categoria/mochilas" className="text-stone-600 hover:text-stone-900 transition font-medium tracking-wide uppercase text-xs">
              Mochilas
            </Link>
            <Link href="/blog" className="text-stone-600 hover:text-stone-900 transition font-medium tracking-wide uppercase text-xs">
              Blog
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 text-stone-500 hover:text-stone-900 hover:bg-stone-50 rounded-full transition"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/wishlist"
              className="p-2.5 text-stone-500 hover:text-stone-900 hover:bg-stone-50 rounded-full transition hidden sm:block"
              aria-label="Favoritos"
            >
              <Heart className="w-5 h-5" />
            </Link>

            <Link
              href="/carrito"
              className="p-2.5 text-stone-500 hover:text-stone-900 hover:bg-stone-50 rounded-full transition relative"
              aria-label="Carrito"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-primary text-white text-[8px] font-bold flex items-center justify-center">
                0
              </span>
            </Link>

            {user ? (
              <div className="relative group ml-1">
                <button className="p-2.5 text-stone-500 hover:text-stone-900 hover:bg-stone-50 rounded-full transition">
                  <User className="w-5 h-5" />
                </button>
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-stone-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-4 border-b border-stone-100">
                    <p className="text-sm font-medium text-stone-900 truncate">
                      {user.name || user.email}
                    </p>
                    <p className="text-xs text-stone-400 mt-0.5 truncate">
                      {user.email}
                    </p>
                  </div>
                  <div className="p-2">
                    <Link
                      href="/account"
                      className="flex items-center gap-3 px-3 py-2.5 text-sm text-stone-700 hover:bg-stone-50 rounded-lg transition"
                    >
                      <User className="w-4 h-4 text-stone-400" />
                      Mi cuenta
                    </Link>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-primary hover:bg-primary-light rounded-lg transition"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Panel Admin
                      </Link>
                    )}
                    <button
                      onClick={() => signOut()}
                      className="flex items-center gap-3 w-full text-left px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-lg transition"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/ingresar"
                className="text-sm font-medium text-primary hover:text-primary-hover ml-2 px-4 py-2 border border-primary/30 hover:border-primary rounded-full transition hidden sm:block"
              >
                Ingresar
              </Link>
            )}
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="pb-6 -mt-2">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="¿Qué estás buscando?"
                className="w-full h-12 pl-11 pr-4 rounded-full border border-stone-200 bg-stone-50 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="lg:hidden border-t border-stone-100 bg-white">
          <nav className="max-w-7xl mx-auto px-6 py-6 space-y-1">
            <Link
              href="/productos"
              className="block px-4 py-3 text-stone-700 hover:bg-stone-50 rounded-lg text-sm font-medium transition"
              onClick={() => setMenuOpen(false)}
            >
              Todos los productos
            </Link>
            <Link
              href="/categoria/carteras"
              className="block px-4 py-3 text-stone-700 hover:bg-stone-50 rounded-lg text-sm font-medium transition"
              onClick={() => setMenuOpen(false)}
            >
              Carteras
            </Link>
            <Link
              href="/categoria/carteritas"
              className="block px-4 py-3 text-stone-700 hover:bg-stone-50 rounded-lg text-sm font-medium transition"
              onClick={() => setMenuOpen(false)}
            >
              Carteritas
            </Link>
            <Link
              href="/categoria/billeteras"
              className="block px-4 py-3 text-stone-700 hover:bg-stone-50 rounded-lg text-sm font-medium transition"
              onClick={() => setMenuOpen(false)}
            >
              Billeteras
            </Link>
            <Link
              href="/categoria/mochilas"
              className="block px-4 py-3 text-stone-700 hover:bg-stone-50 rounded-lg text-sm font-medium transition"
              onClick={() => setMenuOpen(false)}
            >
              Mochilas
            </Link>
            <Link
              href="/categoria/accesorios"
              className="block px-4 py-3 text-stone-700 hover:bg-stone-50 rounded-lg text-sm font-medium transition"
              onClick={() => setMenuOpen(false)}
            >
              Accesorios
            </Link>
            <Link
              href="/blog"
              className="block px-4 py-3 text-stone-700 hover:bg-stone-50 rounded-lg text-sm font-medium transition"
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </Link>
            {!user && (
              <Link
                href="/ingresar"
                className="block px-4 py-3 mt-2 text-primary font-medium text-sm border border-primary/30 rounded-lg text-center transition"
                onClick={() => setMenuOpen(false)}
              >
                Ingresar
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
