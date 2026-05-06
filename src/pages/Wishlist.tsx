import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductGrid } from "@/components/ProductGrid"
import { api } from "@/lib/api"
import { useWishlistStore } from "@/store/useWishlistStore"
import type { Product } from "@/types"

export function Wishlist() {
  const ids = useWishlistStore((s) => s.ids)
  const clear = useWishlistStore((s) => s.clear)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    if (ids.length === 0) {
      setProducts([])
      setLoading(false)
      return
    }
    Promise.all(
      ids.map((id) => api.getProduct(id).catch((): Product | null => null)),
    )
      .then((res) => {
        if (!cancelled) {
          setProducts(res.filter((p): p is Product => p !== null))
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [ids])

  if (!loading && ids.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="grid place-items-center size-20 rounded-full bg-muted mx-auto mb-4">
            <Heart className="size-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Your wishlist is empty</h1>
          <p className="text-muted-foreground mb-6">
            Save items you love to find them here later.
          </p>
          <Button asChild size="lg">
            <Link to="/products">Browse products</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">My wishlist</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {ids.length} saved items
          </p>
        </div>
        {ids.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clear}>
            Clear all
          </Button>
        )}
      </div>

      <ProductGrid products={products} loading={loading} />
    </div>
  )
}
