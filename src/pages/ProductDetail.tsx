import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import {
  ArrowLeft,
  Heart,
  Minus,
  Package,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { ProductGrid } from "@/components/ProductGrid"
import { api } from "@/lib/api"
import { useCartStore } from "@/store/useCartStore"
import { useWishlistStore } from "@/store/useWishlistStore"
import { cn, formatPrice } from "@/lib/utils"
import type { Product } from "@/types"

export function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [related, setRelated] = useState<Product[]>([])
  const [activeImage, setActiveImage] = useState(0)
  const [qty, setQty] = useState(1)
  const [loading, setLoading] = useState(true)

  const addItem = useCartStore((s) => s.addItem)
  const wishlistIds = useWishlistStore((s) => s.ids)
  const toggleWishlist = useWishlistStore((s) => s.toggle)
  const inWishlist = product ? wishlistIds.includes(product.id) : false

  useEffect(() => {
    if (!id) return
    let cancelled = false
    setLoading(true)
    setActiveImage(0)
    setQty(1)
    api
      .getProduct(id)
      .then(async (p) => {
        if (cancelled) return
        setProduct(p)
        const cat = await api.getByCategory(p.category, { limit: 8 })
        if (cancelled) return
        setRelated(cat.products.filter((x) => x.id !== p.id).slice(0, 4))
      })
      .catch(console.error)
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [id])

  if (loading || !product) {
    return (
      <div className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
        <Skeleton className="aspect-square rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    )
  }

  const discounted = product.price * (1 - product.discountPercentage / 100)
  const images = product.images?.length ? product.images : [product.thumbnail]

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <Link
        to="/products"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 sm:mb-6"
      >
        <ArrowLeft className="size-4" /> Back to products
      </Link>

      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
        <div>
          <div className="aspect-square overflow-hidden rounded-xl border bg-muted">
            <img
              src={images[activeImage]}
              alt={product.title}
              className="size-full object-contain"
            />
          </div>
          {images.length > 1 && (
            <div className="mt-3 grid grid-cols-5 gap-1.5 sm:gap-2">
              {images.slice(0, 5).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "aspect-square rounded-md border overflow-hidden bg-muted transition",
                    activeImage === i
                      ? "ring-2 ring-primary border-primary"
                      : "hover:border-primary/50",
                  )}
                >
                  <img src={img} alt="" className="size-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Link
              to={`/category/${product.category}`}
              className="capitalize hover:text-foreground truncate"
            >
              {product.category}
            </Link>
            {product.brand && (
              <>
                <span>•</span>
                <span className="truncate">{product.brand}</span>
              </>
            )}
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight wrap-break-word">
            {product.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
            <div className="flex items-center gap-1">
              <Star className="size-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">
                {product.rating?.toFixed(1)}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviews?.length ?? 0} reviews)
            </span>
            <Separator orientation="vertical" className="h-4 hidden sm:block" />
            <span
              className={cn(
                "text-sm",
                product.stock > 0 ? "text-emerald-600" : "text-destructive",
              )}
            >
              {product.stock > 0
                ? `In stock (${product.stock})`
                : "Out of stock"}
            </span>
          </div>

          <div className="mt-4 sm:mt-5 flex flex-wrap items-end gap-x-3 gap-y-2">
            <span className="text-2xl sm:text-3xl font-bold">
              {formatPrice(discounted)}
            </span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-base sm:text-lg text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </span>
                <Badge variant="destructive">
                  Save {Math.round(product.discountPercentage)}%
                </Badge>
              </>
            )}
          </div>

          <p className="mt-4 sm:mt-5 text-sm text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 rounded-none"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                <Minus className="size-4" />
              </Button>
              <span className="w-10 sm:w-12 text-center font-medium">{qty}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 rounded-none"
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                disabled={qty >= product.stock}
                aria-label="Increase quantity"
              >
                <Plus className="size-4" />
              </Button>
            </div>
            <Button
              size="lg"
              variant="outline"
              onClick={() => toggleWishlist(product.id)}
              className="aspect-square px-0 h-10 w-10 sm:h-10 sm:w-10"
              aria-label="Toggle wishlist"
            >
              <Heart
                className={cn(
                  "size-5",
                  inWishlist && "fill-red-500 text-red-500",
                )}
              />
            </Button>
            <Button
              size="lg"
              onClick={() => addItem(product, qty)}
              disabled={product.stock === 0}
              className="flex-1 basis-full sm:basis-auto sm:min-w-45"
            >
              <ShoppingCart className="size-4" />
              Add to cart
            </Button>
          </div>

          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-start gap-2 rounded-lg border p-3">
              <Truck className="size-4 text-primary shrink-0 mt-0.5" />
              <div className="text-xs min-w-0">
                <div className="font-semibold">Free shipping</div>
                <div className="text-muted-foreground line-clamp-2">
                  {product.shippingInformation || "On orders over $50"}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2 rounded-lg border p-3">
              <ShieldCheck className="size-4 text-primary shrink-0 mt-0.5" />
              <div className="text-xs min-w-0">
                <div className="font-semibold">Warranty</div>
                <div className="text-muted-foreground line-clamp-2">
                  {product.warrantyInformation || "1 year warranty"}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2 rounded-lg border p-3">
              <Package className="size-4 text-primary shrink-0 mt-0.5" />
              <div className="text-xs min-w-0">
                <div className="font-semibold">Returns</div>
                <div className="text-muted-foreground line-clamp-2">
                  {product.returnPolicy || "30-day returns"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {product.reviews && product.reviews.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold mb-4">Reviews</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {product.reviews.slice(0, 4).map((r, i) => (
              <div key={i} className="rounded-lg border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={cn(
                          "size-3.5",
                          j < r.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground/40",
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{r.reviewerName}</span>
                </div>
                <p className="text-sm text-muted-foreground">{r.comment}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(r.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold mb-4">You may also like</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  )
}
