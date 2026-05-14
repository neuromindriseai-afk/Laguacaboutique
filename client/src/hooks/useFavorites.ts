/**
 * Hook useFavorites — Gestiona favoritos con persistencia en localStorage
 */
import { useCallback, useEffect, useState } from "react";

const FAVORITES_KEY = "la-guaca-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Cargar favoritos desde localStorage al montar
  useEffect(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY);
      if (saved) {
        setFavorites(new Set(JSON.parse(saved)));
      }
    } catch {
      // Ignorar errores
    }
  }, []);

  // Persistir favoritos en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
    } catch {
      // Ignorar errores
    }
  }, [favorites]);

  const isFavorite = useCallback((productId: string): boolean => {
    return favorites.has(productId);
  }, [favorites]);

  const toggleFavorite = useCallback((productId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  }, []);

  const addFavorite = useCallback((productId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.add(productId);
      return next;
    });
  }, []);

  const removeFavorite = useCallback((productId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.delete(productId);
      return next;
    });
  }, []);

  const clearFavorites = useCallback(() => {
    setFavorites(new Set());
  }, []);

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    clearFavorites,
  };
}
