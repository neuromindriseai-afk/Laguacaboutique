/**
 * ProductCard — Tarjeta de producto para el catálogo
 * Diseño: Minimalismo Editorial Latinoamericano
 * - Carrusel de imágenes con miniaturas abajo
 * - Imagen principal con flechas laterales
 * - Lazy loading y zoom en hover
 * - Nombre en Playfair Display
 * - Precio formateado en COP
 * - Chips de tallas disponibles (resaltadas si stock bajo)
 * - Botón de favoritos
 * - Notificación de stock bajo
 * - Botón de WhatsApp individual
 */
import { memo, useState, useMemo } from "react";
import { Link } from "wouter";
import { MessageCircle, ShoppingBag, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatCOP, getAvailableSizes, parseSizes } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

function ProductCard({ product, className }: ProductCardProps) {
  const { addItem, openCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const availableSizes = getAvailableSizes(product.TALLAS_STOCK);
  const allSizes = parseSizes(product.TALLAS_STOCK);
  const lowStockCount = allSizes.filter((s) => s.stock > 0 && s.stock <= 2).length;

  // Construir array de imágenes disponibles
  const images = useMemo(() => {
    const imgs = [product.IMAGEN_PRINCIPAL].filter(Boolean);
    if (product.IMAGEN_2) imgs.push(product.IMAGEN_2);
    if (product.IMAGEN_3) imgs.push(product.IMAGEN_3);
    if (product.IMAGEN_4) imgs.push(product.IMAGEN_4);
    return imgs;
  }, [product.IMAGEN_PRINCIPAL, product.IMAGEN_2, product.IMAGEN_3, product.IMAGEN_4]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (availableSizes.length > 0) {
      addItem(product, availableSizes[0].size);
      openCart();
    }
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.WHATSAPP_PEDIDO) {
      window.open(product.WHATSAPP_PEDIDO, "_blank");
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.ID_PROD);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  return (
    <Link href={`/producto/${product.ID_PROD}`}>
      <article
        className={cn(
          "group relative bg-white rounded-sm overflow-hidden cursor-pointer",
          "transition-all duration-300 ease-out",
          "hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1",
          className
        )}
      >
        {/* Contenedor principal de imagen */}
        <div className="flex flex-col">
          {/* Imagen principal */}
          <div className="relative aspect-[3/4] overflow-hidden bg-stone-50">
            <img
              src={images[currentImageIndex]}
              alt={`${product.NOMBRE_COMPLETO} - vista ${currentImageIndex + 1}`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=60";
              }}
            />

            {/* Flechas de navegación (siempre visibles si hay más de 1 imagen) */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-md flex items-center justify-center text-stone-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white hover:scale-105 active:scale-95"
                  aria-label="Imagen anterior"
                  title="Anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-md flex items-center justify-center text-stone-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white hover:scale-105 active:scale-95"
                  aria-label="Siguiente imagen"
                  title="Siguiente"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

          {/* Overlay de acciones */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

          {/* Badge de stock bajo */}
          {lowStockCount > 0 && (
            <div className="absolute top-3 left-3 bg-terracotta text-white text-[10px] font-bold px-2 py-1 rounded-sm">
              ¡Últimas!
            </div>
          )}

          {/* Botón favorito (esquina superior derecha) */}
          <button
            onClick={handleToggleFavorite}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-200 active:scale-95 hover:scale-110"
            aria-label={isFavorite(product.ID_PROD) ? "Quitar de favoritos" : "Agregar a favoritos"}
            title={isFavorite(product.ID_PROD) ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            <Heart
              className={cn(
                "w-4 h-4 transition-all duration-200",
                isFavorite(product.ID_PROD)
                  ? "fill-terracotta text-terracotta"
                  : "text-stone-400 hover:text-terracotta"
              )}
            />
          </button>


        {/* Miniaturas del carrusel (abajo de la imagen principal) */}
        {images.length > 1 && (
          <div className="flex gap-2 p-3 bg-white border-t border-stone-100 overflow-x-auto">
            {images.map((imgSrc, idx) => (
              <button
                key={idx}
                onClick={(e) => goToImage(e, idx)}
                className={cn(
                  "flex-shrink-0 w-14 h-14 rounded-sm overflow-hidden border-2 transition-all duration-200",
                  currentImageIndex === idx
                    ? "border-stone-900 ring-1 ring-stone-900"
                    : "border-stone-200 hover:border-stone-400"
                )}
                aria-label={`Ver imagen ${idx + 1}`}
                title={`Imagen ${idx + 1}`}
              >
                <img
                  src={imgSrc}
                  alt={`Miniatura ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}

          {/* Botones de acción rápida */}
          <div className="absolute bottom-3 right-3 flex flex-col gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            {/* Agregar al carrito */}
            <button
              onClick={handleAddToCart}
              className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-stone-700 hover:bg-stone-900 hover:text-white transition-all duration-200 active:scale-95"
              aria-label="Agregar al carrito"
              title="Agregar al carrito"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>

            {/* WhatsApp individual */}
            {product.WHATSAPP_PEDIDO && (
              <button
                onClick={handleWhatsApp}
                className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-green-600 hover:bg-green-500 hover:text-white transition-all duration-200 active:scale-95"
                aria-label="Pedir por WhatsApp"
                title="Pedir por WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Info del producto */}
        <div className="p-3 md:p-4">
          {/* Categoría */}
          <p className="text-[10px] text-stone-400 font-sans tracking-widest uppercase mb-1">
            {product.CATEGORIA}
          </p>

          {/* Nombre */}
          <h3 className="font-display text-sm md:text-base font-semibold text-stone-900 leading-snug mb-2 line-clamp-2">
            {product.NOMBRE_COMPLETO}
          </h3>

          {/* Precio */}
          <p className="text-base font-semibold text-stone-900 font-sans mb-3">
            {formatCOP(product.PRECIO)}
          </p>
        </div>
      </article>
    </Link>
  );
}

export default memo(ProductCard);
