import { ProductCard } from "./ProductCard"
import { Skeleton } from "@/components/ui/skeleton"
import type { Product } from "@/types"

interface ProductGridProps {
  products?: Product[]
  loading?: boolean
  columns?: 3 | 4 | 5
}

const COLUMN_CLASSES: Record<3 | 4 | 5, string> = {
  3: "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
}

export function ProductGrid({
  products,
  loading,
  columns = 4,
}: ProductGridProps) {
  const cols = COLUMN_CLASSES[columns]

  if (loading) {
    return (
      <div className={`grid ${cols} gap-4 md:gap-6`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="space-y-2 animate-fade-up"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-9 w-full" />
          </div>
        ))}
      </div>
    )
  }

  if (!products?.length) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center animate-fade-up">
        <p className="text-muted-foreground">No products found.</p>
      </div>
    )
  }

  return (
    <div className={`grid ${cols} gap-4 md:gap-6`}>
      {products.map((p, i) => (
        <div
          key={p.id}
          className="animate-fade-up"
          style={{ animationDelay: `${Math.min(i, 12) * 40}ms` }}
        >
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  )
}
