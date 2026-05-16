/**
 * Home — Página principal de La Guaca Boutique
 * Secciones:
 * 1. Hero con banner y eslogan
 * 2. Categorías en grid horizontal (miniaturas circulares)
 * 3. Productos recomendados (primeros 6 con MOSTRAR = "SÍ")
 */
import { useMemo, useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, RefreshCw } from "lucide-react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import { STORE_CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";

// Imágenes del banner principal (se pueden personalizar con PostImage links)
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80", // Moda editorial
  "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80", // Tienda elegante
  "https://images.unsplash.com/photo-1445205170230-053b830c6050?w=1600&q=80"  // Colección nueva
];

export default function Home() {
  const [currentHero, setCurrentHero] = useState(0);

  // Auto-cambio de banner cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  const { products, loading, error, refresh } = useProducts();

  // Extraer categorías únicas con conteo
  const categories = useMemo(() => {
    const map = new Map<string, number>();
    products.forEach((p) => {
      map.set(p.CATEGORIA, (map.get(p.CATEGORIA) || 0) + 1);
    });
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  }, [products]);

  // Primeros 6 productos como recomendados
  const featured = useMemo(() => products.slice(0, 6), [products]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>{STORE_CONFIG.STORE_NAME} — {STORE_CONFIG.STORE_TAGLINE}</title>
        <meta name="description" content={`${STORE_CONFIG.STORE_NAME}: ${STORE_CONFIG.STORE_TAGLINE}. Boutique de moda en ${STORE_CONFIG.STORE_CITY}.`} />
      </Helmet>

      <main>
        {/* ── Hero (Carrusel de Banners) ─────────────────────────────────────── */}
        <section className="relative h-[75vh] min-h-[500px] max-h-[800px] overflow-hidden">
          {/* Imágenes de fondo con transición */}
          {HERO_IMAGES.map((img, idx) => (
            <div
              key={idx}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                currentHero === idx ? "opacity-100 z-0" : "opacity-0 -z-10"
              )}
            >
              <img
                src={img}
                alt={`Banner ${idx + 1}`}
                className="w-full h-full object-cover object-center scale-105 animate-slow-zoom"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          ))}

          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

          {/* Contenido */}
          <div className="relative h-full flex items-center z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
              <div className="max-w-2xl mx-auto">
                {/* Eyebrow */}
                <p className="text-stone-300 text-xs font-sans tracking-[0.4em] uppercase mb-6 animate-fade-in">
                  {STORE_CONFIG.STORE_CITY}
                </p>

                {/* Título */}
                <h1 className="font-display text-6xl sm:text-7xl md:text-8xl font-bold text-white leading-none mb-6 animate-fade-in-up drop-shadow-2xl">
                  La Guaca
                </h1>

                {/* Eslogan */}
                <p className="text-stone-100 text-xl sm:text-2xl font-sans font-light leading-relaxed mb-10 animate-fade-in-up delay-100">
                  {STORE_CONFIG.STORE_TAGLINE}
                </p>

                {/* CTA */}
                <div className="flex flex-wrap justify-center gap-5 animate-fade-in-up delay-200">
                  <Link href="/catalogo">
                    <button className="flex items-center gap-3 px-8 py-4 bg-white text-stone-900 font-sans font-bold text-sm tracking-widest uppercase hover:bg-stone-100 transition-all duration-300 active:scale-95 rounded-sm shadow-xl">
                      Ver Catálogo
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <Link href="/contacto">
                    <button className="flex items-center gap-3 px-8 py-4 border-2 border-white/80 text-white font-sans font-bold text-sm tracking-widest uppercase hover:bg-white/10 transition-all duration-300 active:scale-95 rounded-sm">
                      Ubicación
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Indicadores de Carrusel */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
            {HERO_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentHero(idx)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-500",
                  currentHero === idx ? "bg-white w-10" : "bg-white/40 hover:bg-white/60"
                )}
              />
            ))}
          </div>
        </section>

        {/* ── Categorías ───────────────────────────────────────────────────── */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Encabezado de sección */}
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[11px] text-stone-400 font-sans tracking-[0.3em] uppercase mb-2">
                  Explorar
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900">
                  Categorías
                </h2>
              </div>
              <Link href="/catalogo">
                <button className="hidden sm:flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 font-sans transition-colors duration-200">
                  Ver todo
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>

            {/* Grid de categorías */}
            {loading ? (
              <div className="flex gap-8 overflow-x-auto pb-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex flex-col items-center gap-3 flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-stone-100 animate-pulse" />
                    <div className="h-3 w-16 bg-stone-100 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            ) : categories.length > 0 ? (
              <div className="flex gap-6 md:gap-10 overflow-x-auto pb-4 scrollbar-hide">
                {categories.map(({ name, count }) => (
                  <div key={name} className="flex-shrink-0">
                    <CategoryCard name={name} productCount={count} />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        {/* Separador decorativo */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-stone-100" />
        </div>

        {/* ── Recomendados ─────────────────────────────────────────────────── */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Encabezado */}
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[11px] text-stone-400 font-sans tracking-[0.3em] uppercase mb-2">
                  Selección especial
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900">
                  Recomendados
                </h2>
              </div>
              <div className="flex items-center gap-4">
                {/* Botón refresh */}
                <button
                  onClick={refresh}
                  className="p-2 text-stone-400 hover:text-stone-900 transition-colors duration-200"
                  aria-label="Actualizar catálogo"
                  title="Actualizar catálogo"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <Link href="/catalogo">
                  <button className="hidden sm:flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 font-sans transition-colors duration-200">
                    Ver todo
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="text-center py-12">
                <p className="text-stone-500 font-sans mb-4">{error}</p>
                <button
                  onClick={refresh}
                  className="px-6 py-2.5 border border-stone-300 text-stone-700 font-sans text-sm hover:bg-stone-50 transition-colors rounded-sm"
                >
                  Reintentar
                </button>
              </div>
            )}

            {/* Grid de productos */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
                {featured.map((product) => (
                  <ProductCard key={product.ID_PROD} product={product} />
                ))}
              </div>
            )}

            {/* Ver más en móvil */}
            <div className="mt-10 text-center sm:hidden">
              <Link href="/catalogo">
                <button className="flex items-center gap-2 mx-auto px-6 py-3 border border-stone-300 text-stone-700 font-sans text-sm hover:bg-stone-50 transition-colors rounded-sm">
                  Ver catálogo completo
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Banner inferior ───────────────────────────────────────────────── */}
        <section className="bg-stone-900 py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-stone-400 text-xs font-sans tracking-[0.3em] uppercase mb-4">
              Visítanos en
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              {STORE_CONFIG.STORE_CITY}
            </h2>
            <p className="text-stone-400 font-sans text-base mb-8 max-w-md mx-auto">
              Ven a conocer nuestra colección en persona. Te esperamos con los mejores estilos de la temporada.
            </p>
            <Link href="/contacto">
              <button className="px-8 py-3.5 border border-white/40 text-white font-sans font-semibold text-sm tracking-wide hover:bg-white hover:text-stone-900 transition-all duration-300 rounded-sm">
                Ver ubicación
              </button>
            </Link>
          </div>
        </section>
      </main>
    </HelmetProvider>
  );
}
