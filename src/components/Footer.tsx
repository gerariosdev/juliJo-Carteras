import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-stone-50 border-t border-stone-100 mt-20">
      {/* Newsletter */}
      <div className="border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="max-w-lg mx-auto text-center">
            <h3 className="font-serif text-2xl text-stone-900 mb-2">
              Enterate de las novedades
            </h3>
            <p className="text-sm text-stone-500 mb-6">
              Suscribite para recibir ofertas exclusivas y nuevos lanzamientos
            </p>
            <form className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 h-11 px-4 rounded-full border border-stone-200 bg-white text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
              />
              <button
                type="submit"
                className="h-11 px-6 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-hover transition shadow-sm"
              >
                Suscribirme
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-xs">JC</span>
              </div>
              <span className="font-serif text-xl text-stone-900">JuliJo</span>
            </Link>
            <p className="mt-4 text-sm text-stone-500 leading-relaxed">
              Marroquinería artesanal argentina. Cada pieza es única, diseñada y confeccionada a mano con cuero genuino de la mejor calidad.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-6">
              Productos
            </h4>
            <ul className="space-y-3">
              <li><Link href="/productos" className="text-sm text-stone-500 hover:text-stone-900 transition">Todos los productos</Link></li>
              <li><Link href="/categoria/carteras" className="text-sm text-stone-500 hover:text-stone-900 transition">Carteras</Link></li>
              <li><Link href="/categoria/billeteras" className="text-sm text-stone-500 hover:text-stone-900 transition">Billeteras</Link></li>
              <li><Link href="/categoria/mochilas" className="text-sm text-stone-500 hover:text-stone-900 transition">Mochilas</Link></li>
              <li><Link href="/categoria/accesorios" className="text-sm text-stone-500 hover:text-stone-900 transition">Accesorios</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-6">
              Ayuda
            </h4>
            <ul className="space-y-3">
              <li><Link href="/faq" className="text-sm text-stone-500 hover:text-stone-900 transition">Preguntas frecuentes</Link></li>
              <li><Link href="/envios" className="text-sm text-stone-500 hover:text-stone-900 transition">Envíos y entregas</Link></li>
              <li><Link href="/cambios" className="text-sm text-stone-500 hover:text-stone-900 transition">Cambios y devoluciones</Link></li>
              <li><Link href="/contacto" className="text-sm text-stone-500 hover:text-stone-900 transition">Contacto</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-6">
              Empresa
            </h4>
            <ul className="space-y-3">
              <li><Link href="/nosotros" className="text-sm text-stone-500 hover:text-stone-900 transition">Sobre nosotros</Link></li>
              <li><Link href="/blog" className="text-sm text-stone-500 hover:text-stone-900 transition">Blog</Link></li>
              <li><Link href="/terminos" className="text-sm text-stone-500 hover:text-stone-900 transition">Términos y condiciones</Link></li>
              <li><Link href="/privacidad" className="text-sm text-stone-500 hover:text-stone-900 transition">Privacidad</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} JuliJo Carteras. Todos los derechos reservados.</p>
          <p>Hecho a mano en Argentina 🇦🇷</p>
        </div>
      </div>
    </footer>
  );
}
