/**
 * ProductoDetalle — Página de detalle de un producto
 * - Imagen grande
 * - Nombre, categoría, precio
 * - Selector de talla con stock
 * - Botón "Agregar al Carrito"
 * - Sección "Pedir por WhatsApp"
 * - Recomendaciones de la misma categoría
 */
import { useMemo, useState } from "react";
import { useRoute, Link } from "wouter";
import { ArrowLeft, ShoppingBag, MessageCircle, Check, Share2 } from "lucide-react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import { useCart } from "@/contexts/CartContext";
import { formatCOP, getAvailableSizes, parseSizes } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { STORE_CONFIG } from "@/lib/config";

export default function ProductoDetalle() {
  const [, params] = useRoute("/producto/:id");
  const productId = params?.id || "";

  const { products, loading } = useProducts();
  const { addItem, openCart } = useCart();

  const product = useMemo(
    () => products.find((p) => p.ID_PROD === productId),
    [products, productId]
  );

  const allSizes = useMemo(() => (product ? parseSizes(product.TALLAS_STOCK) : []), [product]);
  const availableSizes = useMemo(() => getAvailableSizes(product?.TALLAS_STOCK || ""), [product]);

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [added, setAdded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const productImages = useMemo(() => {
    if (!product) return [];
    return [
      product.IMAGEN_PRINCIPAL,
      product.IMAGEN_2,
      product.IMAGEN_3,
      product.IMAGEN_4
    ].filter(Boolean) as string[];
  }, [product]);

  // Recomendaciones: misma categoría, excluyendo el producto actual
  const recommendations = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.CATEGORIA === product.CATEGORIA && p.ID_PROD !== product.ID_PROD)
      .slice(0, 6);
  }, [products, product]);

  const handleAddToCart = () => {
    if (!product || !selectedSize) return;
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    openCart();
  };

  // Estado de carga
  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="aspect-[3/4] bg-stone-100 animate-pulse rounded-sm" />
            <div className="space-y-4 pt-4">
              <div className="h-3 w-20 bg-stone-100 rounded animate-pulse" />
              <div className="h-8 w-3/4 bg-stone-100 rounded animate-pulse" />
              <div className="h-6 w-1/3 bg-stone-100 rounded animate-pulse" />
              <div className="flex gap-2 mt-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 w-14 bg-stone-100 rounded animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Producto no encontrado
  if (!product && !loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-4">
          <p className="font-display text-2xl text-stone-700 mb-3">Producto no encontrado</p>
          <p className="text-stone-400 font-sans mb-6">
            El producto que buscas no existe o fue retirado del catálogo.
          </p>
          <Link href="/catalogo">
            <button className="px-6 py-3 bg-stone-900 text-white font-sans text-sm hover:bg-stone-700 transition-colors rounded-sm">
              Ver catálogo
            </button>
          </Link>
        </div>
      </main>
    );
  }

  if (!product) return null;

  return (
    <HelmetProvider>
      <Helmet>
        <title>{product.NOMBRE_COMPLETO} — {STORE_CONFIG.STORE_NAME}</title>
        <meta name="description" content={`${product.NOMBRE_COMPLETO} en ${product.CATEGORIA}. ${formatCOP(product.PRECIO)}. Disponible en La Guaca Boutique, ${STORE_CONFIG.STORE_CITY}.`} />
      </Helmet>

      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

          {/* Breadcrumb / Volver */}
          <nav className="flex items-center gap-2 mb-8 text-sm font-sans text-stone-400">
            <Link href="/" className="hover:text-stone-700 transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/catalogo" className="hover:text-stone-700 transition-colors">Catálogo</Link>
            <span>/</span>
            <Link href={`/categoria/${encodeURIComponent(product.CATEGORIA)}`} className="hover:text-stone-700 transition-colors">
              {product.CATEGORIA}
            </Link>
            <span>/</span>
            <span className="text-stone-600 truncate max-w-[150px]">{product.NOMBRE_COMPLETO}</span>
          </nav>

          {/* Layout principal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">

            {/* Imagen y Galería */}
            <div className="relative space-y-4">
              {/* Imagen principal */}
              <div className="aspect-[3/4] rounded-sm overflow-hidden bg-stone-50 sticky top-24">
                <img
                  src={productImages[activeImageIndex]}
                  alt={product.NOMBRE_COMPLETO}
                  className="w-full h-full object-cover transition-all duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80";
                  }}
                />
              </div>

              {/* Carrusel de miniaturas debajo de la imagen principal */}
              {productImages.length > 1 && (
                <div className="relative">
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {productImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={cn(
                          "flex-shrink-0 aspect-square rounded-sm overflow-hidden border-2 transition-all",
                          "hover:opacity-80",
                          activeImageIndex === idx ? "border-stone-900" : "border-transparent opacity-60"
                        )}
                      >
                        <img 
                          src={img} 
                          alt={`Vista ${idx + 1}`} 
                          className="w-full h-full object-cover" 
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Info del producto */}
            <div className="py-2">
              {/* Categoría */}
              <p className="text-[11px] text-stone-400 font-sans tracking-[0.3em] uppercase mb-3">
                {product.CATEGORIA}
              </p>

              {/* Nombre */}
              <h1 className="font-display text-3xl md:text-4xl font-bold text-stone-900 leading-tight mb-4">
                {product.NOMBRE_COMPLETO}
              </h1>

              {/* Precio */}
              <p className="text-2xl font-semibold text-stone-900 font-sans mb-8">
                {formatCOP(product.PRECIO)}
              </p>

              {/* Separador */}
              <div className="h-px bg-stone-100 mb-8" />

              {/* Selector de talla */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold text-stone-900 font-sans tracking-wide">
                    Talla
                    {selectedSize && (
                      <span className="ml-2 font-normal text-stone-500">— {selectedSize}</span>
                    )}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {allSizes.map(({ size, stock }) => {
                    const inStock = stock > 0;
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => inStock && setSelectedSize(size)}
                        disabled={!inStock}
                        className={cn(
                          "min-w-[48px] h-11 px-3 border font-sans text-sm font-medium rounded-sm",
                          "transition-all duration-200",
                          isSelected
                            ? "bg-stone-900 text-white border-stone-900"
                            : inStock
                            ? "bg-white text-stone-700 border-stone-200 hover:border-stone-700 hover:text-stone-900"
                            : "bg-stone-50 text-stone-300 border-stone-100 cursor-not-allowed line-through"
                        )}
                      >
                        {size}
                        {inStock && stock <= 2 && (
                          <span className="block text-[9px] text-terracotta leading-none mt-0.5">
                            ¡Últimas!
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Botones de acción */}
              <div className="space-y-3 mb-8">
                {/* Agregar al carrito */}
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize || availableSizes.length === 0}
                  className={cn(
                    "w-full flex items-center justify-center gap-3 py-4 px-6",
                    "font-sans font-semibold text-sm tracking-wide rounded-sm",
                    "transition-all duration-200 active:scale-[0.98]",
                    added
                      ? "bg-green-500 text-white"
                      : selectedSize
                      ? "bg-stone-900 text-white hover:bg-stone-700"
                      : "bg-stone-100 text-stone-400 cursor-not-allowed"
                  )}
                >
                  {added ? (
                    <>
                      <Check className="w-5 h-5" />
                      ¡Agregado al carrito!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      {selectedSize ? "Agregar al Carrito" : "Selecciona una talla"}
                    </>
                  )}
                </button>

                {/* WhatsApp directo */}
                {product.WHATSAPP_PEDIDO && (
                  <a
                    href={product.WHATSAPP_PEDIDO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "w-full flex items-center justify-center gap-3 py-4 px-6",
                      "border border-green-500 text-green-600 font-sans font-semibold text-sm tracking-wide rounded-sm",
                      "hover:bg-green-50 transition-all duration-200 active:scale-[0.98]"
                    )}
                  >
                    <MessageCircle className="w-5 h-5" />
                    Pedir por WhatsApp
                  </a>
                )}

                {/* Botón de compartir por WhatsApp */}
                <button
                  onClick={() => {
                    const message = `Hola, me interesa este producto: ${product.NOMBRE_COMPLETO} - ${formatCOP(product.PRECIO)} 👗\n\n${window.location.href}`;
                    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, "_blank");
                  }}
                  className={cn(
                    "w-full flex items-center justify-center gap-3 py-4 px-6",
                    "border border-stone-200 text-stone-700 font-sans font-semibold text-sm tracking-wide rounded-sm",
                    "hover:bg-stone-50 transition-all duration-200 active:scale-[0.98]"
                  )}
                >
                  <Share2 className="w-5 h-5" />
                  Compartir por WhatsApp
                </button>
              </div>

              {/* Info adicional */}
              <div className="border border-stone-100 rounded-sm p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-stone-500 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                  Envíos a toda Colombia
                </div>
                <div className="flex items-center gap-2 text-sm text-stone-500 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                  Pago contra entrega disponible
                </div>
                <div className="flex items-center gap-2 text-sm text-stone-500 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                  Atención personalizada por WhatsApp
                </div>
              </div>
            </div>
          </div>

          {/* ── Recomendaciones ─────────────────────────────────────────────── */}
          {recommendations.length > 0 && (
            <section className="mt-20 pt-12 border-t border-stone-100">
              <div className="mb-8">
                <p className="text-[11px] text-stone-400 font-sans tracking-[0.3em] uppercase mb-2">
                  También podría gustarte
                </p>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-stone-900">
                  Más en {product.CATEGORIA}
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                {recommendations.map((rec) => (
                  <ProductCard key={rec.ID_PROD} product={rec} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </HelmetProvider>
  );
}
