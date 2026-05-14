/**
 * CategoryCard — Miniatura de categoría con imágenes hiperrealistas
 * Diseño: Minimalismo Editorial Latinoamericano
 * - Círculo con imagen de alta calidad
 * - Nombre de la categoría debajo
 * - Hover con escala y sombra
 */
import { Link } from "wouter";
import { cn } from "@/lib/utils";

// Mapa de imágenes hiperrealistas por categoría
const CATEGORY_IMAGES: Record<string, string> = {
  Vestidos: "https://d2xsxph8kpxj0f.cloudfront.net/310519663655771615/3fkX8eW2HZmRY4XUxmMmsm/category-vestidos-NaD5Biusmszc5crTcChsHi.webp",
  Jeans: "https://d2xsxph8kpxj0f.cloudfront.net/310519663655771615/3fkX8eW2HZmRY4XUxmMmsm/category-jeans-3iKoC9ovXcjB8x9KtEJYyZ.webp",
  Blusas: "https://d2xsxph8kpxj0f.cloudfront.net/310519663655771615/3fkX8eW2HZmRY4XUxmMmsm/category-blusas-BMT7CX6CqqPWbr6y83qtHo.webp",
  Tenis: "https://d2xsxph8kpxj0f.cloudfront.net/310519663655771615/3fkX8eW2HZmRY4XUxmMmsm/category-tenis-d3nwKq8BM7RxuFHbAZYRZo.webp",
  Faldas: "https://d2xsxph8kpxj0f.cloudfront.net/310519663655771615/3fkX8eW2HZmRY4XUxmMmsm/category-faldas-EoQwgFefkBVyCzsLYhwkNF.webp",
  Conjuntos: "https://d2xsxph8kpxj0f.cloudfront.net/310519663655771615/3fkX8eW2HZmRY4XUxmMmsm/category-conjuntos-5wvqcBZMQPnmUvB3qtMwxD.webp",
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
