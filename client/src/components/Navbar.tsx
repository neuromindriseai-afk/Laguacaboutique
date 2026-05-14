/**
 * Navbar — Barra de navegación principal de La Guaca Boutique
 * Diseño: Minimalismo Editorial Latinoamericano
 * - Logo en Playfair Display
 * - Links de navegación en Inter
 * - Badge animado del carrito
 * - Sticky con blur al hacer scroll
 */
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { STORE_CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const { totalItems, openCart, cartBadgeAnimate } = useCart();
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-100"
            : "bg-white/80 backdrop-blur-sm"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo + Nombre */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <img
                src={STORE_CONFIG.LOGO_URL}
                alt="La Guaca Logo"
                className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-200 group-hover:scale-110"
              />
              <div className="flex flex-col">
                <span className="font-display text-lg md:text-2xl font-bold tracking-tight text-stone-900 group-hover:text-terracotta transition-colors duration-200 leading-none">
                  La Guaca
                </span>
                <span className="hidden sm:block text-[10px] text-stone-400 font-sans tracking-widest uppercase">
                  Boutique
                </span>
              </div>
            </Link>

            {/* Nav desktop */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-sans tracking-wide transition-colors duration-200 relative py-1",
                    "after:absolute after:bottom-0 after:left-0 after:h-px after:bg-stone-900",
                    "after:transition-all after:duration-300",
                    location === link.href
                      ? "text-stone-900 font-medium after:w-full"
                      : "text-stone-500 hover:text-stone-900 after:w-0 hover:after:w-full"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Acciones */}
            <div className="flex items-center gap-3">
              {/* Botón carrito */}
              <button
                onClick={openCart}
                className="relative p-2 text-stone-700 hover:text-stone-900 transition-colors duration-200 group"
                aria-label={`Carrito (${totalItems} artículos)`}
              >
                <ShoppingBag
                  className={cn(
                    "w-6 h-6 transition-transform duration-200 group-hover:scale-110",
                    cartBadgeAnimate && "animate-cart-bounce"
                  )}
                />
                {totalItems > 0 && (
                  <span
                    className={cn(
                      "absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full",
                      "bg-terracotta text-white text-[10px] font-bold flex items-center justify-center px-1",
                      "transition-transform duration-200",
                      cartBadgeAnimate && "scale-125"
                    )}
                  >
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </button>

              {/* Hamburger móvil */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-stone-700 hover:text-stone-900 transition-colors"
                aria-label="Menú"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Menú móvil */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-out",
            mobileOpen ? "max-h-64 border-t border-stone-100" : "max-h-0"
          )}
        >
          <nav className="bg-white px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "py-3 px-2 text-sm font-sans tracking-wide border-b border-stone-50 last:border-0",
                  "transition-colors duration-200",
                  location === link.href
                    ? "text-stone-900 font-medium"
                    : "text-stone-500 hover:text-stone-900"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Espaciador para el contenido debajo del navbar fijo */}
      <div className="h-16 md:h-20 md:h-28" />
    </>
  );
}
