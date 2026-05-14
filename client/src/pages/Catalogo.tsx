/**
 * Catálogo — Vista de galería de todos los productos
 * Filtros: por categoría (chips) y por talla (búsqueda de texto)
 * Grid responsive: 2 columnas en móvil, 3-4 en desktop
 */
import { useMemo, useState } from "react";
import { useRoute } from "wouter";
import { Search, X, RefreshCw, SlidersHorizontal, List, Grid3x3 } from "lucide-react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import { hasSizeInStock } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { STORE_CONFIG } from "@/lib/config";

export default function Catalogo() {
  const { products, loading, error, refresh } = useProducts();

  // Detectar si venimos desde /categoria/:nombre
  const [matchCategoria, paramsCategoria] = useRoute("/categoria/:nombre");
  const initialCategory = matchCategoria && paramsCategoria?.nombre
    ? decodeURIComponent(paramsCategoria.nombre)
    : "Todas";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sizeQuery, setSizeQuery] = useState("");
  const [nameQuery, setNameQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(4);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Categorías únicas
  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.CATEGORIA)));
    return ["Todas", ...cats];
  }, [products]);

  // Productos filtrados
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCategory === "Todas" || p.CATEGORIA === selectedCategory;
      const matchSize = sizeQuery.trim() === "" || hasSizeInStock(p.TALLAS_STOCK, sizeQuery.trim());
      const matchName = nameQuery.trim() === "" || p.NOMBRE_COMPLETO.toLowerCase().includes(nameQuery.toLowerCase());
      const matchPrice = p.PRECIO >= priceRange[0] && p.PRECIO <= priceRange[1];
      return matchCat && matchSize && matchName && matchPrice;
    });
  }, [products, selectedCategory, sizeQuery, nameQuery, priceRange]);

  const pageTitle = selectedCategory !== "Todas"
    ? `${selectedCategory} — ${STORE_CONFIG.STORE_NAME}`
    : `Catálogo — ${STORE_CONFIG.STORE_NAME}`;

  return (
    <HelmetProvider>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={`Explora nuestra colección de ${selectedCategory !== "Todas" ? selectedCategory.toLowerCase() : "ropa"} en La Guaca Boutique, Montería.`} />
      </Helmet>

      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">

          {/* Encabezado */}
          <div className="mb-8 md:mb-10">
            <p className="text-[11px] text-stone-400 font-sans tracking-[0.3em] uppercase mb-2">
              {STORE_CONFIG.STORE_NAME}
            </p>
            <div className="flex items-end justify-between">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-stone-900">
                {selectedCategory === "Todas" ? "Catálogo" : selectedCategory}
              </h1>
              <div className="flex items-center gap-3">
                <span className="text-sm text-stone-400 font-sans hidden sm:block">
                  {loading ? "Cargando..." : `${filtered.length} productos`}
                </span>
                <button
                  onClick={refresh}
                  className="p-2 text-stone-400 hover:text-stone-900 transition-colors duration-200"
                  aria-label="Actualizar catálogo"
                  title="Actualizar"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className="mb-8 space-y-4">
            {/* Barra de búsqueda de nombre */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="Buscar por nombre de producto"
                  value={nameQuery}
                  onChange={(e) => setNameQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 text-sm font-sans border border-stone-200 rounded-sm focus:outline-none focus:border-stone-400 bg-white text-stone-900 placeholder:text-stone-400 transition-colors"
                />
                {nameQuery && (
                  <button
                    onClick={() => setNameQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Toggle filtros en móvil */}
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className={cn(
                  "sm:hidden flex items-center gap-2 px-4 py-2.5 border rounded-sm text-sm font-sans transition-colors",
                  filtersOpen
                    ? "border-stone-900 text-stone-900 bg-stone-50"
                    : "border-stone-200 text-stone-500"
                )}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filtros
              </button>

              {/* Toggle vista grid/lista (desktop) */}
              <div className="hidden sm:flex items-center border border-stone-200 rounded-sm">
                <button
                  onClick={() => setGridCols(2)}
                  className={cn(
                    "p-2 transition-colors",
                    gridCols === 2 ? "bg-stone-900 text-white" : "text-stone-400 hover:text-stone-700"
                  )}
                  title="2 columnas"
                >
                  <List className="w-4 h-4" />
                </button>
                <div className="w-px h-6 bg-stone-200" />
                <button
                  onClick={() => setGridCols(3)}
                  className={cn(
                    "p-2 transition-colors",
                    gridCols === 3 ? "bg-stone-900 text-white" : "text-stone-400 hover:text-stone-700"
                  )}
                  title="3 columnas"
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <div className="w-px h-6 bg-stone-200" />
                <button
                  onClick={() => setGridCols(4)}
                  className={cn(
                    "p-2 transition-colors",
                    gridCols === 4 ? "bg-stone-900 text-white" : "text-stone-400 hover:text-stone-700"
                  )}
                  title="4 columnas"
                >
                  <Grid3x3 className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Filtros */}
            <div className={cn(
              "flex flex-col gap-4 transition-all duration-300 pb-4 border-b border-stone-100",
              filtersOpen ? "flex" : "hidden sm:flex"
            )}>
              {/* Chips de categorías */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "px-4 py-1.5 text-xs font-sans font-medium rounded-sm border transition-all duration-200",
                      selectedCategory === cat
                        ? "bg-stone-900 text-white border-stone-900"
                        : "bg-white text-stone-600 border-stone-200 hover:border-stone-400 hover:text-stone-900"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Búsqueda por talla */}
              <div className="relative">
                <label className="text-xs font-sans font-semibold text-stone-700 block mb-2">Filtrar por talla</label>
                <input
                  type="text"
                  placeholder="Ej: M, 38, L"
                  value={sizeQuery}
                  onChange={(e) => setSizeQuery(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-sans border border-stone-200 rounded-sm focus:outline-none focus:border-stone-400 bg-white text-stone-900 placeholder:text-stone-400 transition-colors"
                />
              </div>

              {/* Filtro de precio */}
              <div>
                <label className="text-xs font-sans font-semibold text-stone-700 block mb-3">Rango de precio</label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="0"
                      max="1000000"
                      step="10000"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Math.min(parseInt(e.target.value) || 0, priceRange[1]), priceRange[1]])}
                      placeholder="Mín"
                      className="flex-1 px-3 py-2 text-sm font-sans border border-stone-200 rounded-sm focus:outline-none focus:border-stone-400 bg-white text-stone-900 placeholder:text-stone-400"
                    />
                    <input
                      type="number"
                      min="0"
                      max="1000000"
                      step="10000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Math.max(parseInt(e.target.value) || 1000000, priceRange[0])])}
                      placeholder="Máx"
                      className="flex-1 px-3 py-2 text-sm font-sans border border-stone-200 rounded-sm focus:outline-none focus:border-stone-400 bg-white text-stone-900 placeholder:text-stone-400"
                    />
                  </div>
                  <p className="text-[11px] text-stone-400 font-sans">
                    ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Limpiar filtros */}
              {(selectedCategory !== "Todas" || sizeQuery || nameQuery || priceRange[0] > 0 || priceRange[1] < 1000000) && (
                <button
                  onClick={() => {
                    setSelectedCategory("Todas");
                    setSizeQuery("");
                    setNameQuery("");
                    setPriceRange([0, 1000000]);
                  }}
                  className="flex items-center gap-1 px-3 py-2 text-xs font-sans text-stone-400 hover:text-stone-700 transition-colors border border-stone-200 rounded-sm"
                >
                  <X className="w-3 h-3" />
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="text-center py-20">
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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length === 0 && !error ? (
            <div className="text-center py-20">
              <p className="font-display text-xl text-stone-500 mb-2">Sin resultados</p>
              <p className="text-stone-400 font-sans text-sm">
                No encontramos productos con esos filtros.
              </p>
              <button
                onClick={() => { setSelectedCategory("Todas"); setSizeQuery(""); }}
                className="mt-6 px-6 py-2.5 border border-stone-300 text-stone-700 font-sans text-sm hover:bg-stone-50 transition-colors rounded-sm"
              >
                Ver todos los productos
              </button>
            </div>
          ) : (
            <div className={cn(
              "grid gap-4 md:gap-6",
              gridCols === 2 && "grid-cols-2 sm:grid-cols-2",
              gridCols === 3 && "grid-cols-2 sm:grid-cols-3",
              gridCols === 4 && "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
            )}>
              {filtered.map((product) => (
                <ProductCard key={product.ID_PROD} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
    </HelmetProvider>
  );
}
