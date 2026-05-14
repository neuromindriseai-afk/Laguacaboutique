/**
 * ProductSkeleton — Skeleton loader para tarjetas de producto
 */
import { cn } from "@/lib/utils";

interface ProductSkeletonProps {
  className?: string;
}

export default function ProductSkeleton({ className }: ProductSkeletonProps) {
  return (
    <div className={cn("bg-white rounded-sm overflow-hidden", className)}>
      {/* Imagen skeleton */}
      <div className="aspect-[3/4] bg-stone-100 animate-pulse" />
      {/* Info skeleton */}
      <div className="p-3 md:p-4 space-y-2">
        <div className="h-2 w-16 bg-stone-100 rounded animate-pulse" />
        <div className="h-4 w-3/4 bg-stone-100 rounded animate-pulse" />
        <div className="h-4 w-1/2 bg-stone-100 rounded animate-pulse" />
        <div className="h-5 w-1/3 bg-stone-100 rounded animate-pulse" />
        <div className="flex gap-1 mt-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-5 w-8 bg-stone-100 rounded animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
