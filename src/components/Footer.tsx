import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Mail,
  MapPin,
  Phone,
  Heart,
  ArrowRight,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-300">
      {/* Newsletter */}
      <div className="bg-gradient-to-r from-amber-900 to-amber-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-white">
                Enterate de las novedades
              </h3>
              <p className="text-amber-200/80 text-sm mt-1">
                Suscribite para recibir ofertas exclusivas y nuevos lanzamientos
              </p>
            </div>
            <form className="flex w-full md:w-auto gap-2">
              <Input
                type="email"
                placeholder="Tu correo electrónico"
                className="min-w-[250px] bg-amber-950/50 border-amber-700/50 text-white placeholder:text-amber-300/50 focus:ring-amber-400"
                required
              />
              <Button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-amber-950 font-semibold"
              >
                Suscribirme
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Marca */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-amber-400 flex items-center justify-center">
                <span className="text-white font-bold text-sm">JC</span>
              </div>
              <span className="font-bold text-lg text-white">
                JuliJo <span className="text-amber-400">Carteras</span>
              </span>
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed">
              Marroquinería artesanal argentina. Cada pieza es única, diseñada y
              confeccionada a mano con cuero genuino de la mejor calidad.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-700 transition-colors"
                aria-label="Instagram"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-700 transition-colors"
                aria-label="Facebook"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="mailto:info@julijocarteras.com"
                className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-700 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tienda */}
          <div>
            <h4 className="font-semibold text-white mb-4">Tienda</h4>
            <ul className="space-y-3">
              {[
                { label: "Todos los productos", href: "/productos" },
                { label: "Carteras", href: "/categoria/carteras" },
                { label: "Mochilas", href: "/categoria/mochilas" },
                { label: "Billeteras", href: "/categoria/billeteras" },
                { label: "Accesorios", href: "/categoria/accesorios" },
                { label: "Ofertas", href: "/productos?oferta=true" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-400 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h4 className="font-semibold text-white mb-4">Ayuda</h4>
            <ul className="space-y-3">
              {[
                { label: "Preguntas frecuentes", href: "/faq" },
                { label: "Envíos y entregas", href: "/envios" },
                { label: "Cambios y devoluciones", href: "/cambios" },
                { label: "Cuidado del cuero", href: "/blog/cuidado-del-cuero" },
                { label: "Medidas y talles", href: "/guia-de-talles" },
                { label: "Contacto", href: "/contacto" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-400 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-amber-400 shrink-0" />
                <span className="text-sm text-stone-400">
                  Buenos Aires, Argentina
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-amber-400 shrink-0" />
                <a
                  href="tel:+5491123456789"
                  className="text-sm text-stone-400 hover:text-amber-400 transition-colors"
                >
                  +54 9 11 2345-6789
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-amber-400 shrink-0" />
                <a
                  href="mailto:info@julijocarteras.com"
                  className="text-sm text-stone-400 hover:text-amber-400 transition-colors"
                >
                  info@julijocarteras.com
                </a>
              </li>
            </ul>
            <div className="mt-6 p-4 rounded-lg bg-stone-900 border border-stone-800">
              <div className="flex items-center gap-2 text-sm">
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-stone-400">
                  Hecho con amor en Argentina
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-stone-500">
              &copy; {new Date().getFullYear()} JuliJo Carteras. Todos los
              derechos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="/privacidad"
                className="text-stone-500 hover:text-stone-300 transition-colors"
              >
                Política de privacidad
              </Link>
              <Link
                href="/terminos"
                className="text-stone-500 hover:text-stone-300 transition-colors"
              >
                Términos y condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
