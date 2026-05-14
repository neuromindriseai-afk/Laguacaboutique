/**
 * ProductCard — Tarjeta de producto para el catálogo
 * Diseño: Minimalismo Editorial Latinoamericano
 * - Imagen con lazy loading y zoom en hover
 * - Nombre en Playfair Display
 * - Precio formateado en COP
 * - Chips de tallas disponibles (resaltadas si stock bajo)
 * - Botón de favoritos
 * - Notificación de stock bajo
 * - Botón de WhatsApp individual
 */
import { memo } from "react";
import { Link } from "wouter";
import { MessageCircle, ShoppingBag, Heart } from "lucide-react";
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
  const availableSizes = getAvailableSizes(product.TALLAS_STOCK);
  const allSizes = parseSizes(product.TALLAS_STOCK);
  const lowStockCount = allSizes.filter((s) => s.stock > 0 && s.stock <= 2).length;

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
        {/* Imagen */}
        <div className="relative aspect-[3/4] overflow-hidden bg-stone-50">
          <img
            src={product.IMAGEN_PRINCIPAL}
            alt={product.NOMBRE_COMPLETO}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=60";
            }}
          />

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

          {/* Chips de tallas */}
          {availableSizes.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {availableSizes.slice(0, 5).map(({ size, stock }) => (
                <span
                  key={size}
                  className={cn(
                    "text-[10px] px-2 py-0.5 border rounded-sm font-sans",
                    stock <= 2
                      ? "border-terracotta text-terracotta font-semibold"
                      : "border-stone-200 text-stone-500"
                  )}
                >
                  {size}
                </span>
              ))}
              {availableSizes.length > 5 && (
                <span className="text-[10px] px-2 py-0.5 text-stone-400 font-sans">
                  +{availableSizes.length - 5}
                </span>
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

export default memo(ProductCard);
