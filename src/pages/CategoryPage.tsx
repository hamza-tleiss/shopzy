import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { ProductGrid } from "@/components/ProductGrid"
import { api } from "@/lib/api"
import type { Product } from "@/types"

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    setLoading(true)
    api
      .getByCategory(slug, { limit: 30 })
      .then((data) => {
        if (!cancelled) setProducts(data.products)
      })
      .catch(console.error)
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [slug])

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/categories"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="size-4" /> All categories
      </Link>
      <h1 className="text-2xl md:text-3xl font-bold capitalize">
        {slug?.replace(/-/g, " ")}
      </h1>
      <p className="text-sm text-muted-foreground mt-1 mb-6">
        {loading ? "Loading…" : `${products.length} products`}
      </p>

      <ProductGrid products={products} loading={loading} />
    </div>
  )
}
