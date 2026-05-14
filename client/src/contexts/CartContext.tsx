/**
 * CartContext — Contexto global del carrito de compras
 * Persiste en localStorage. Expone acciones para agregar, quitar y vaciar el carrito.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import type { CartItem, Product } from "@/lib/types";
import { STORE_CONFIG } from "@/lib/config";
import { formatCOP } from "@/lib/utils";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product; selectedSize: string }
  | { type: "REMOVE_ITEM"; productId: string; selectedSize: string }
  | { type: "UPDATE_QUANTITY"; productId: string; selectedSize: string; delta: number }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; items: CartItem[] }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" };

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product, selectedSize: string) => void;
  removeItem: (productId: string, selectedSize: string) => void;
  updateQuantity: (productId: string, selectedSize: string, delta: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  checkoutWhatsApp: () => void;
  /** Indica si el badge del carrito debe animarse */
  cartBadgeAnimate: boolean;
}

// ─── Reducer ──────────────────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) => i.product.ID_PROD === action.product.ID_PROD && i.selectedSize === action.selectedSize
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.ID_PROD === action.product.ID_PROD && i.selectedSize === action.selectedSize
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { product: action.product, selectedSize: action.selectedSize, quantity: 1 }],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (i) => !(i.product.ID_PROD === action.productId && i.selectedSize === action.selectedSize)
        ),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.product.ID_PROD === action.productId && i.selectedSize === action.selectedSize
              ? { ...i, quantity: Math.max(1, i.quantity + action.delta) }
              : i
          )
          .filter((i) => i.quantity > 0),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "LOAD_CART":
      return { ...state, items: action.items };
    case "OPEN_CART":
      return { ...state, isOpen: true };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

// ─── Contexto ─────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "la-guaca-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });
  const [cartBadgeAnimate, setCartBadgeAnimate] = useState(false);

  // Cargar carrito desde localStorage al montar
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const items: CartItem[] = JSON.parse(saved);
        dispatch({ type: "LOAD_CART", items });
      }
    } catch {
      // Ignorar errores de localStorage
    }
  }, []);

  // Persistir carrito en localStorage al cambiar
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Ignorar errores de localStorage
    }
  }, [state.items]);

  const totalItems = useMemo(() => state.items.reduce((sum, i) => sum + i.quantity, 0), [state.items]);
  const totalPrice = useMemo(
    () => state.items.reduce((sum, i) => sum + i.product.PRECIO * i.quantity, 0),
    [state.items]
  );

  const addItem = useCallback((product: Product, selectedSize: string) => {
    dispatch({ type: "ADD_ITEM", product, selectedSize });
    // Animar badge
    setCartBadgeAnimate(true);
    setTimeout(() => setCartBadgeAnimate(false), 600);
  }, []);

  const removeItem = useCallback((productId: string, selectedSize: string) => {
    dispatch({ type: "REMOVE_ITEM", productId, selectedSize });
  }, []);

  const updateQuantity = useCallback((productId: string, selectedSize: string, delta: number) => {
    dispatch({ type: "UPDATE_QUANTITY", productId, selectedSize, delta });
  }, []);

  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);
  const openCart = useCallback(() => dispatch({ type: "OPEN_CART" }), []);
  const closeCart = useCallback(() => dispatch({ type: "CLOSE_CART" }), []);

  /** Genera el mensaje de WhatsApp y abre el enlace */
  const checkoutWhatsApp = useCallback(() => {
    if (state.items.length === 0) return;

    const lines = state.items.map(
      (i) =>
        `• ${i.product.NOMBRE_COMPLETO} | Talla: ${i.selectedSize} | Cant: ${i.quantity} | ${formatCOP(i.product.PRECIO * i.quantity)}`
    );
    const message = [
      "🛍️ *Pedido desde La Guaca Boutique*",
      "",
      ...lines,
      "",
      `*Total: ${formatCOP(totalPrice)}*`,
      "",
      "¡Hola! Quisiera realizar este pedido.",
    ].join("\n");

    const number = STORE_CONFIG.WHATSAPP_NUMBER;
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }, [state.items, totalPrice]);

  const value: CartContextValue = {
    items: state.items,
    isOpen: state.isOpen,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    checkoutWhatsApp,
    cartBadgeAnimate,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
