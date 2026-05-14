/**
 * Tipos de datos para La Guaca Boutique
 */

/** Producto tal como viene del CSV de Google Sheets */
export interface Product {
  ID_PROD: string;
  NOMBRE_COMPLETO: string;
  CATEGORIA: string;
  PRECIO: number;
  TALLAS_STOCK: string; // Ej: "S(2), M(5), 40Z(1)"
  IMAGEN_PRINCIPAL: string;
  MOSTRAR: "SÍ" | "SI" | "NO" | string;
  WHATSAPP_PEDIDO: string;
}

/** Talla individual con su stock */
export interface SizeStock {
  size: string;
  stock: number;
}

/** Ítem en el carrito */
export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

/** Estado del hook de productos */
export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}
