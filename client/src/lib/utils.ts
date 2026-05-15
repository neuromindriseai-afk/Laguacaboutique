import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { SizeStock } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formatea un número como precio colombiano.
 * Ej: 190000 → "$190.000"
 */
export function formatCOP(price: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Parsea el string de tallas y stock.
 * Ej: "S(2), M(5), 40Z(1)" → [{size:"S",stock:2},{size:"M",stock:5},{size:"40Z",stock:1}]
 */
export function parseSizes(tallasStock: string): SizeStock[] {
  if (!tallasStock) return [];
  
  // Primero intentamos el formato con stock: "S(2), M(5)"
  const regexWithStock = /([^,()]+)\((\d+)\)/g;
  const result: SizeStock[] = [];
  let match;
  
  while ((match = regexWithStock.exec(tallasStock)) !== null) {
    const size = match[1].trim();
    const stock = parseInt(match[2], 10);
    if (size) result.push({ size, stock });
  }

  // Si no encontró nada con el formato anterior, intentamos formato simple: "S, M, L"
  if (result.length === 0) {
    const simpleSizes = tallasStock.split(",").map(s => s.trim()).filter(Boolean);
    return simpleSizes.map(size => ({
      size,
      stock: 10 // Stock por defecto si no se especifica
    }));
  }
  
  return result;
}

/**
 * Devuelve solo las tallas con stock > 0.
 */
export function getAvailableSizes(tallasStock: string): SizeStock[] {
  return parseSizes(tallasStock).filter((s) => s.stock > 0);
}

/**
 * Verifica si un producto contiene una talla específica.
 */
export function hasSizeInStock(tallasStock: string, sizeQuery: string): boolean {
  const q = sizeQuery.trim().toUpperCase();
  if (!q) return true;
  
  return parseSizes(tallasStock).some((s) => {
    const size = s.size.toUpperCase();
    // Coincidencia exacta o que la consulta esté contenida (ej: "M" coincide con "M" y "XL" no coincide con "M")
    return (size === q || size.split("/").includes(q) || size.split("-").includes(q)) && s.stock > 0;
  });
}

/**
 * Normaliza el campo MOSTRAR para comparación.
 */
export function shouldShow(mostrar: string): boolean {
  return mostrar?.trim().toUpperCase() === "SÍ" || mostrar?.trim().toUpperCase() === "SI";
}
