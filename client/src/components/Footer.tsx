/**
 * Footer — Pie de página de La Guaca Boutique
 * Diseño: Minimalismo Editorial Latinoamericano
 */
import { Link } from "wouter";
import { Instagram, Facebook, MapPin, MessageCircle } from "lucide-react";
import { STORE_CONFIG } from "@/lib/config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-300 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Marca */}
          <div>
            <h2 className="font-display text-3xl font-bold text-white mb-3">La Guaca</h2>
            <p className="text-stone-400 text-sm leading-relaxed font-sans">
              {STORE_CONFIG.STORE_TAGLINE}
            </p>
            <p className="text-stone-500 text-xs mt-2 font-sans">{STORE_CONFIG.STORE_CITY}</p>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-widest uppercase mb-6 font-sans">
              Tienda
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Inicio" },
                { href: "/catalogo", label: "Catálogo" },
                { href: "/contacto", label: "Contacto" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-stone-400 hover:text-white text-sm font-sans transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes y contacto */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-widest uppercase mb-6 font-sans">
              Síguenos
            </h3>
            <div className="flex gap-4 mb-6">
              <a
                href={STORE_CONFIG.INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center text-stone-400 hover:text-white hover:border-white transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={STORE_CONFIG.FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center text-stone-400 hover:text-white hover:border-white transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${STORE_CONFIG.WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center text-stone-400 hover:text-white hover:border-white transition-all duration-200"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
            <div className="space-y-3">
              <a
                href={STORE_CONFIG.GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-stone-400 hover:text-white text-sm font-sans transition-colors duration-200"
              >
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>Ver en Google Maps</span>
              </a>
              <p className="text-stone-500 text-xs font-sans">{STORE_CONFIG.STORE_ADDRESS}</p>
              <p className="text-stone-500 text-xs font-sans">{STORE_CONFIG.STORE_PHONE}</p>
              <p className="text-stone-500 text-xs font-sans">{STORE_CONFIG.STORE_HOURS}</p>
            </div>
          </div>
        </div>

        {/* Línea divisoria y copyright */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-stone-600 text-xs font-sans">
            © {year} La Guaca Boutique · Montería, Colombia
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-2 text-xs font-sans">
            <p className="text-stone-500">
              Desarrollado por <a href="https://solaris.ai" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-colors">@solaris.ai</a>
            </p>
            <span className="hidden sm:inline text-stone-700">•</span>
            <a
              href="https://wa.me/573126582360"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-white transition-colors flex items-center gap-1"
            >
              <MessageCircle className="w-3 h-3" />
              +57 312 658 2360
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
