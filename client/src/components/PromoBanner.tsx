/**
 * PromoBanner — Banner promocional fijo debajo del navbar
 * Diseño: Minimalismo Editorial Latinoamericano
 * - Mensaje de envío gratis
 * - Animación sutil
 * - Responsive
 */
import { Truck, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function PromoBanner() {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div className={cn(
      "fixed top-16 md:top-20 left-0 right-0 z-40 bg-gradient-to-r from-stone-900 to-stone-800",
      "border-b border-stone-700 shadow-md",
      "animate-fade-in"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 md:py-4">
          <div className="flex items-center gap-3 flex-1">
            <Truck className="w-5 h-5 text-terracotta flex-shrink-0" />
            <p className="text-sm md:text-base font-sans text-white">
              <span className="font-semibold">Envío gratis</span>
              <span className="hidden sm:inline"> en compras superiores a</span>
              <span className="font-semibold ml-1 text-terracotta">$200.000</span>
            </p>
          </div>
          <button
            onClick={() => setClosed(true)}
            className="p-1 text-stone-400 hover:text-white transition-colors duration-200"
            aria-label="Cerrar banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
