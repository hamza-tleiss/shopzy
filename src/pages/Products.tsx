import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductGrid } from "@/components/ProductGrid"
import { api } from "@/lib/api"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Product, SortField, SortOrder } from "@/types"

interface SortOption {
  id: string
  label: string
  sortBy?: SortField
  order?: SortOrder
}

const SORTS: SortOption[] = [
  { id: "default", label: "Featured" },
  { id: "price-asc", label: "Price: Low to high", sortBy: "price", order: "asc" },
  { id: "price-desc", label: "Price: High to low", sortBy: "price", order: "desc" },
  { id: "rating-desc", label: "Top rated", sortBy: "rating", order: "desc" },
  { id: "title-asc", label: "Name: A → Z", sortBy: "title", order: "asc" },
]

const PAGE_SIZE = 20

export function Products() {
  const [params, setParams] = useSearchParams()
  const query = params.get("q") || ""
  const sortId = params.get("sort") || "default"
  const page = parseInt(params.get("page") || "1", 10)

  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const sort = SORTS.find((s) => s.id === sortId) ?? SORTS[0]

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    const skip = (page - 1) * PAGE_SIZE
    const promise = query
      ? api.searchProducts(query, { limit: PAGE_SIZE, skip })
      : api.getProducts({
          limit: PAGE_SIZE,
          skip,
          sortBy: sort.sortBy,
          order: sort.order,
        })

    promise
      .then((data) => {
        if (cancelled) return
        setProducts(data.products)
        setTotal(data.total)
      })
      .catch(console.error)
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [query, sortId, page, sort.sortBy, sort.order])

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  const setSort = (id: string) => {
    const next = new URLSearchParams(params)
    if (id === "default") next.delete("sort")
    else next.set("sort", id)
    next.delete("page")
    setParams(next)
  }

  const goPage = (p: number) => {
    const next = new URLSearchParams(params)
    next.set("page", String(p))
    setParams(next)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            {query ? `Search: "${query}"` : "All products"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {loading ? "Loading…" : `${total} products`}
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Sort: {sort.label} <ChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {SORTS.map((s) => (
              <DropdownMenuItem key={s.id} onSelect={() => setSort(s.id)}>
                {s.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ProductGrid products={products} loading={loading} />

      {totalPages > 1 && !loading && (
        <div className="mt-10 flex justify-center items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => goPage(page - 1)}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground px-3">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => goPage(page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
