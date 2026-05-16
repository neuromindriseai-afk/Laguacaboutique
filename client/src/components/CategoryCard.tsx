/**
 * CategoryCard — Miniatura de categoría con imágenes hiperrealistas
 * Diseño: Minimalismo Editorial Latinoamericano
 * - Círculo con imagen de alta calidad
 * - Nombre de la categoría debajo
 * - Hover con escala y sombra
 */
import { Link } from "wouter";
import { cn } from "@/lib/utils";

// Mapa de imágenes hiperrealistas por categoría (Unsplash Premium)
const CATEGORY_IMAGES: Record<string, string> = {
  Vestidos: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80",
  Jeans: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80",
  Blusas: "https://images.unsplash.com/photo-1583846783202-3c15564673bc?w=400&q=80",
  Tenis: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
  Faldas: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&q=80",
  Conjuntos: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80",
  Suéteres: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=80",
  Accesorios: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=400&q=80",
};

// Colores fallback si no hay imagen
const CATEGORY_COLORS: Record<string, string> = {
  Vestidos: "from-rose-100 to-pink-200",
  Jeans: "from-blue-100 to-indigo-200",
  Blusas: "from-amber-100 to-orange-200",
  Tenis: "from-stone-100 to-gray-200",
  Faldas: "from-purple-100 to-violet-200",
  Conjuntos: "from-teal-100 to-emerald-200",
  Accesorios: "from-yellow-100 to-amber-200",
  Ropa: "from-stone-100 to-stone-200",
};

interface CategoryCardProps {
  name: string;
  productCount?: number;
  className?: string;
}

export default function CategoryCard({ name, productCount, className }: CategoryCardProps) {
  const gradient = CATEGORY_COLORS[name] || "from-stone-100 to-stone-200";
  const imageUrl = CATEGORY_IMAGES[name];

  return (
    <Link href={`/categoria/${encodeURIComponent(name)}`}>
      <div
        className={cn(
          "flex flex-col items-center gap-3 cursor-pointer group",
          className
        )}
      >
        {/* Círculo con imagen */}
        <div
          className={cn(
            "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full",
            "bg-gradient-to-br",
            gradient,
            "flex items-center justify-center overflow-hidden",
            "transition-all duration-300 ease-out",
            "group-hover:scale-110 group-hover:shadow-lg",
            "ring-2 ring-white ring-offset-2 ring-offset-transparent"
          )}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <span className="text-2xl sm:text-3xl md:text-4xl select-none">🛍️</span>
          )}
        </div>

        {/* Nombre */}
        <div className="text-center">
          <p className="text-xs sm:text-sm font-sans font-medium text-stone-700 group-hover:text-stone-900 transition-colors duration-200 leading-tight">
            {name}
          </p>
          {productCount !== undefined && (
            <p className="text-[10px] text-stone-400 font-sans mt-0.5">
              {productCount} {productCount === 1 ? "producto" : "productos"}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
