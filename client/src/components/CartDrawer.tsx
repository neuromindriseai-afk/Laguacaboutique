/**
 * CartDrawer — Carrito de compras como panel deslizante desde la derecha
 * Diseño: Minimalismo Editorial Latinoamericano
 * - Lista de productos con imagen, nombre, talla, cantidad
 * - Total en tiempo real
 * - Botón "Finalizar Pedido" con WhatsApp
 */
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatCOP } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, totalPrice, clearCart, checkoutWhatsApp } =
    useCart();

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white shadow-2xl",
          "flex flex-col transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-label="Carrito de compras"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-stone-700" />
            <h2 className="font-display text-xl font-semibold text-stone-900">
              Mi Carrito
            </h2>
            {totalItems > 0 && (
              <span className="text-xs text-stone-400 font-sans">
                ({totalItems} {totalItems === 1 ? "artículo" : "artículos"})
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-stone-400 hover:text-stone-900 transition-colors duration-200 rounded-sm"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            /* Carrito vacío */
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
              <div className="w-20 h-20 rounded-full bg-stone-50 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-stone-300" />
              </div>
              <div>
                <p className="font-display text-lg text-stone-700 mb-1">Tu carrito está vacío</p>
                <p className="text-sm text-stone-400 font-sans">
                  Agrega productos desde el catálogo para comenzar tu pedido.
                </p>
              </div>
              <button
                onClick={closeCart}
                className="mt-2 text-sm text-stone-500 hover:text-stone-900 underline underline-offset-4 font-sans transition-colors"
              >
                Ver catálogo
              </button>
            </div>
          ) : (
            /* Lista de productos */
            <ul className="divide-y divide-stone-50 px-6 py-4 space-y-1">
              {items.map((item) => (
                <li key={`${item.product.ID_PROD}-${item.selectedSize}`} className="py-4 flex gap-4">
                  {/* Imagen */}
                  <div className="w-16 h-20 flex-shrink-0 rounded-sm overflow-hidden bg-stone-50">
                    <img
                      src={item.product.IMAGEN_PRINCIPAL}
                      alt={item.product.NOMBRE_COMPLETO}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&q=60";
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-sm font-semibold text-stone-900 leading-snug line-clamp-2">
                      {item.product.NOMBRE_COMPLETO}
                    </p>
                    <p className="text-xs text-stone-400 font-sans mt-0.5">
                      Talla: <span className="font-medium text-stone-600">{item.selectedSize}</span>
                    </p>
                    <p className="text-sm font-semibold text-stone-900 font-sans mt-1">
                      {formatCOP(item.product.PRECIO * item.quantity)}
                    </p>

                    {/* Controles de cantidad */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.ID_PROD, item.selectedSize, -1)}
                        className="w-6 h-6 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:border-stone-900 hover:text-stone-900 transition-all duration-200 active:scale-95"
                        aria-label="Reducir cantidad"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium text-stone-900 w-5 text-center font-sans">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.ID_PROD, item.selectedSize, 1)}
                        className="w-6 h-6 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:border-stone-900 hover:text-stone-900 transition-all duration-200 active:scale-95"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus className="w-3 h-3" />
                      </button>

                      {/* Eliminar */}
                      <button
                        onClick={() => removeItem(item.product.ID_PROD, item.selectedSize)}
                        className="ml-auto w-6 h-6 flex items-center justify-center text-stone-300 hover:text-red-400 transition-colors duration-200"
                        aria-label="Eliminar del carrito"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer con total y checkout */}
        {items.length > 0 && (
          <div className="border-t border-stone-100 px-6 py-6 space-y-4">
            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-stone-500 font-sans">Total</span>
              <span className="font-display text-xl font-bold text-stone-900">
                {formatCOP(totalPrice)}
              </span>
            </div>

            {/* Botón WhatsApp */}
            <button
              onClick={checkoutWhatsApp}
              className={cn(
                "w-full flex items-center justify-center gap-3 py-4 px-6",
                "bg-green-500 hover:bg-green-600 text-white",
                "font-sans font-semibold text-sm tracking-wide",
                "rounded-sm transition-all duration-200 active:scale-[0.98]",
                "shadow-sm hover:shadow-md"
              )}
            >
              <MessageCircle className="w-5 h-5" />
              Finalizar Pedido por WhatsApp
            </button>

            {/* Vaciar carrito */}
            <button
              onClick={clearCart}
              className="w-full text-xs text-stone-400 hover:text-stone-600 font-sans transition-colors duration-200 py-1"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
