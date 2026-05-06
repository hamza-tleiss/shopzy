import { Link } from "react-router-dom"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useCartStore } from "@/store/useCartStore"
import { useWishlistStore } from "@/store/useWishlistStore"
import { cn, formatPrice } from "@/lib/utils"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem)
  const wishlistIds = useWishlistStore((s) => s.ids)
  const toggleWishlist = useWishlistStore((s) => s.toggle)

  const inWishlist = wishlistIds.includes(product.id)
  const discounted =
    product.price * (1 - (product.discountPercentage ?? 0) / 100)

  return (
    <Card className="group relative overflow-hidden p-0 border-border/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/40">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Link to={`/product/${product.id}`} className="block size-full">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
          {/* hover gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Link>

        {product.discountPercentage > 0 && (
          <Badge
            variant="destructive"
            className="absolute left-2 top-2 shadow-md"
          >
            -{Math.round(product.discountPercentage)}%
          </Badge>
        )}

        <button
          onClick={(e) => {
            e.preventDefault()
            toggleWishlist(product.id)
          }}
          className={cn(
            "absolute right-2 top-2 grid place-items-center size-9 rounded-full bg-background/90 backdrop-blur-sm shadow-sm transition-all duration-300",
            "hover:bg-background hover:scale-110 active:scale-95",
            inWishlist
              ? "opacity-100"
              : "opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0",
          )}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={cn(
              "size-4 transition-all",
              inWishlist
                ? "fill-red-500 text-red-500 scale-110"
                : "text-foreground",
            )}
          />
        </button>

        {product.stock <= 5 && product.stock > 0 && (
          <Badge
            variant="secondary"
            className="absolute bottom-2 left-2 shadow-sm"
          >
            Only {product.stock} left
          </Badge>
        )}
        {product.stock === 0 && (
          <Badge variant="destructive" className="absolute bottom-2 left-2">
            Out of stock
          </Badge>
        )}

        {/* Quick add — slides up on hover (desktop only) */}
        <div
          className={cn(
            "hidden sm:block absolute inset-x-2 bottom-2",
            "translate-y-3 opacity-0 transition-all duration-300",
            "group-hover:translate-y-0 group-hover:opacity-100",
          )}
        >
          <Button
            onClick={(e) => {
              e.preventDefault()
              addItem(product)
            }}
            disabled={product.stock === 0}
            size="sm"
            className="w-full shadow-lg backdrop-blur-sm"
          >
            <ShoppingCart className="size-4" />
            Quick add
          </Button>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <div className="text-xs text-muted-foreground capitalize tracking-wide">
          {product.category}
        </div>
        <Link
          to={`/product/${product.id}`}
          className="font-medium leading-tight line-clamp-2 transition-colors group-hover:text-primary"
        >
          {product.title}
        </Link>

        <div className="flex items-center gap-1 text-xs">
          <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{product.rating?.toFixed(1)}</span>
          <span className="text-muted-foreground">
            ({product.reviews?.length ?? 0})
          </span>
        </div>

        <div className="mt-1 flex items-end gap-2">
          <span className="text-lg font-bold tracking-tight">
            {formatPrice(discounted)}
          </span>
          {product.discountPercentage > 0 && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        <Button
          onClick={() => addItem(product)}
          disabled={product.stock === 0}
          className="mt-2 w-full sm:hidden"
          size="sm"
        >
          <ShoppingCart className="size-4" />
          Add to cart
        </Button>
      </div>
    </Card>
  )
}
