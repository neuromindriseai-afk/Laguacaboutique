/**
 * Hook useProducts
 * Carga y parsea el CSV público de Google Sheets (CATALOGO_GLIDE).
 * Usa PapaParse para el parseo y expone estado de carga, error y función de refresh.
 * Maneja redirecciones de Google y nombres de columnas flexibles.
 */
import Papa from "papaparse";
import { useCallback, useEffect, useRef, useState } from "react";
import { STORE_CONFIG } from "@/lib/config";
import type { Product, ProductsState } from "@/lib/types";
import { shouldShow } from "@/lib/utils";

export function useProducts(): ProductsState {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const url = STORE_CONFIG.CSV_URL;

      if (url === "URL_DEL_CSV_AQUI") {
        // Datos de demostración cuando no hay CSV configurado
        setProducts(DEMO_PRODUCTS);
        setLoading(false);
        return;
      }

      // Añadir timestamp para evitar caché del navegador
      const cacheBuster = `${url}${url.includes("?") ? "&" : "?"}_t=${Date.now()}`;

      const response = await fetch(cacheBuster, {
        method: "GET",
        headers: {
          "Accept": "text/csv",
        },
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const text = await response.text();

      // Si Google redirige, el texto contendrá HTML. Detectar y reintentar
      if (text.includes("<HTML>") || text.includes("Temporary Redirect")) {
        throw new Error("Google redirigió la solicitud. Intenta de nuevo.");
      }

      Papa.parse<Record<string, string>>(text, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const parsed: Product[] = results.data
            .map((row) => {
              // Mapeo flexible de columnas (busca variaciones de nombres)
              const getColumn = (aliases: string[]): string => {
                for (const alias of aliases) {
                  if (row[alias]) return row[alias];
                }
                return "";
              };

              return {
                ID_PROD: getColumn(["ID_PROD", "id_prod", "ID"]),
                NOMBRE_COMPLETO: getColumn(["NOMBRE_COMPLETO", "NOMBRE_COM CATEGORIA", "NOMBRE", "nombre"]),
                CATEGORIA: getColumn(["CATEGORIA", "categoria", "CATEGORY"]),
                PRECIO: parseInt(getColumn(["PRECIO", "precio", "PRICE"]) || "0", 10),
                TALLAS_STOCK: getColumn(["TALLAS_STOCK", "TALLAS_STOCK", "tallas_stock", "STOCK"]),
                IMAGEN_PRINCIPAL: getColumn(["IMAGEN_PRINCIPAL", "IMAGEN_PRIM", "imagen_principal", "IMAGE"]),
                MOSTRAR: getColumn(["MOSTRAR", "mostrar", "SHOW"]) || "NO",
                WHATSAPP_PEDIDO: getColumn(["WHATSAPP_PEDIDO", "WHATSAPP_PE", "whatsapp_pedido", "WHATSAPP"]),
              };
            })
            .filter((p) => shouldShow(p.MOSTRAR) && p.ID_PROD && p.NOMBRE_COMPLETO);

          if (parsed.length === 0) {
            setError("El catálogo está vacío o no se pudieron parsear los productos.");
            setProducts(DEMO_PRODUCTS);
          } else {
            setProducts(parsed);
          }
          setLoading(false);
        },
        error: (err: Error) => {
          setError(`Error al parsear el catálogo: ${err.message}`);
          setProducts(DEMO_PRODUCTS);
          setLoading(false);
        },
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error desconocido";
      setError(`No se pudo cargar el catálogo: ${msg}`);
      setProducts(DEMO_PRODUCTS);
      setLoading(false);
    }
  }, []);

  // Cargar productos al montar
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Sincronización automática cada 5 minutos (solo se configura una vez)
  useEffect(() => {
    // Limpiar intervalo anterior si existe
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Configurar nuevo intervalo
    intervalRef.current = setInterval(() => {
      loadProducts();
    }, 5 * 60 * 1000); // 5 minutos

    // Limpiar intervalo al desmontar
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [loadProducts]);

  return { products, loading, error, refresh: loadProducts };
}

// ─── Datos de demostración ────────────────────────────────────────────────────
const DEMO_PRODUCTS: Product[] = [
  {
    ID_PROD: "BOU-001",
    NOMBRE_COMPLETO: "Vestido Lino Blanco",
    CATEGORIA: "Vestidos",
    PRECIO: 190000,
    TALLAS_STOCK: "S(2), M(5), L(3)",
    IMAGEN_PRINCIPAL: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80",
    MOSTRAR: "SÍ",
    WHATSAPP_PEDIDO: "",
  },
  {
    ID_PROD: "BOU-002",
    NOMBRE_COMPLETO: "Jean Skinny Azul Oscuro",
    CATEGORIA: "Jeans",
    PRECIO: 145000,
    TALLAS_STOCK: "28(1), 30(4), 32(2)",
    IMAGEN_PRINCIPAL: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
    MOSTRAR: "SÍ",
    WHATSAPP_PEDIDO: "",
  },
  {
    ID_PROD: "BOU-003",
    NOMBRE_COMPLETO: "Blusa Floral Manga Corta",
    CATEGORIA: "Blusas",
    PRECIO: 89000,
    TALLAS_STOCK: "S(3), M(2), L(1), XL(2)",
    IMAGEN_PRINCIPAL: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80",
    MOSTRAR: "SÍ",
    WHATSAPP_PEDIDO: "",
  },
  {
    ID_PROD: "BOU-004",
    NOMBRE_COMPLETO: "Tenis Blancos Casuales",
    CATEGORIA: "Tenis",
    PRECIO: 220000,
    TALLAS_STOCK: "36(1), 37(2), 38(3), 39(1), 40(2)",
    IMAGEN_PRINCIPAL: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    MOSTRAR: "SÍ",
    WHATSAPP_PEDIDO: "",
  },
  {
    ID_PROD: "BOU-005",
    NOMBRE_COMPLETO: "Falda Midi Terracota",
    CATEGORIA: "Faldas",
    PRECIO: 115000,
    TALLAS_STOCK: "S(2), M(4), L(2)",
    IMAGEN_PRINCIPAL: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80",
    MOSTRAR: "SÍ",
    WHATSAPP_PEDIDO: "",
  },
  {
    ID_PROD: "BOU-006",
    NOMBRE_COMPLETO: "Conjunto Lino Beige",
    CATEGORIA: "Conjuntos",
    PRECIO: 265000,
    TALLAS_STOCK: "S(1), M(3), L(2)",
    IMAGEN_PRINCIPAL: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
    MOSTRAR: "SÍ",
    WHATSAPP_PEDIDO: "",
  },
  {
    ID_PROD: "BOU-007",
    NOMBRE_COMPLETO: "Vestido Floral Verano",
    CATEGORIA: "Vestidos",
    PRECIO: 175000,
    TALLAS_STOCK: "XS(1), S(3), M(2)",
    IMAGEN_PRINCIPAL: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
    MOSTRAR: "SÍ",
    WHATSAPP_PEDIDO: "",
  },
  {
    ID_PROD: "BOU-008",
    NOMBRE_COMPLETO: "Jean Mom Fit Claro",
    CATEGORIA: "Jeans",
    PRECIO: 160000,
    TALLAS_STOCK: "28(2), 30(3), 32(1), 34(2)",
    IMAGEN_PRINCIPAL: "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=600&q=80",
    MOSTRAR: "SÍ",
    WHATSAPP_PEDIDO: "",
  },
  {
    ID_PROD: "BOU-009",
    NOMBRE_COMPLETO: "Top Crochet Blanco",
    CATEGORIA: "Blusas",
    PRECIO: 75000,
    TALLAS_STOCK: "S(4), M(3), L(1)",
    IMAGEN_PRINCIPAL: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=80",
    MOSTRAR: "SÍ",
    WHATSAPP_PEDIDO: "",
  },
  {
    ID_PROD: "BOU-010",
    NOMBRE_COMPLETO: "Sandalias Planas Nude",
    CATEGORIA: "Tenis",
    PRECIO: 130000,
    TALLAS_STOCK: "36(2), 37(3), 38(2), 39(1)",
    IMAGEN_PRINCIPAL: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80",
    MOSTRAR: "SÍ",
    WHATSAPP_PEDIDO: "",
  },
  {
    ID_PROD: "BOU-011",
    NOMBRE_COMPLETO: "Vestido Negro Elegante",
    CATEGORIA: "Vestidos",
    PRECIO: 210000,
    TALLAS_STOCK: "S(1), M(2), L(3), XL(1)",
    IMAGEN_PRINCIPAL: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80",
    MOSTRAR: "SÍ",
    WHATSAPP_PEDIDO: "",
  },
  {
    ID_PROD: "BOU-012",
    NOMBRE_COMPLETO: "Camisa Oversize Rayas",
    CATEGORIA: "Blusas",
    PRECIO: 98000,
    TALLAS_STOCK: "S(2), M(5), L(3), XL(2)",
    IMAGEN_PRINCIPAL: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80",
    MOSTRAR: "SÍ",
    WHATSAPP_PEDIDO: "",
  },
];
