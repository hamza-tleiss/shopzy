import { Link } from "react-router-dom"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { useCartStore } from "@/store/useCartStore"
import { formatPrice } from "@/lib/utils"

export function Cart() {
  const items = useCartStore((s) => s.items)
  const increment = useCartStore((s) => s.increment)
  const decrement = useCartStore((s) => s.decrement)
  const removeItem = useCartStore((s) => s.removeItem)
  const clearCart = useCartStore((s) => s.clearCart)
  const subtotal = useCartStore((s) => s.getSubtotal())
  const discount = useCartStore((s) => s.getDiscountTotal())
  const total = useCartStore((s) => s.getTotal())

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="grid place-items-center size-20 rounded-full bg-muted mx-auto mb-4">
            <ShoppingBag className="size-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added anything yet.
          </p>
          <Button asChild size="lg">
            <Link to="/products">Start shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  const shipping = total > 50 || total === 0 ? 0 : 4.99
  const tax = total * 0.08
  const grandTotal = total + shipping + tax

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
          Shopping cart
        </h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearCart}
          className="shrink-0"
        >
          <Trash2 className="size-4" />
          <span className="hidden sm:inline">Clear cart</span>
          <span className="sm:hidden">Clear</span>
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 space-y-3 sm:space-y-4">
          {items.map((item) => {
            const linePrice =
              item.price * (1 - item.discountPercentage / 100)
            const lineTotal = linePrice * item.quantity
            return (
              <div
                key={item.id}
                className="flex gap-3 sm:gap-4 rounded-lg border bg-card p-3 sm:p-4"
              >
                <Link to={`/product/${item.id}`} className="shrink-0">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="size-20 sm:size-28 rounded-md border object-cover bg-muted"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/product/${item.id}`}
                    className="text-sm sm:text-base font-medium line-clamp-2 hover:underline"
                  >
                    {item.title}
                  </Link>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1 flex flex-wrap gap-x-2">
                    <span>{formatPrice(linePrice)} each</span>
                    {item.discountPercentage > 0 && (
                      <span className="line-through">
                        {formatPrice(item.price)}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 sm:mt-3 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 rounded-none"
                        onClick={() => decrement(item.id)}
                        aria-label="Decrease"
                      >
                        <Minus className="size-3.5" />
                      </Button>
                      <span className="w-8 sm:w-10 text-center text-sm">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 rounded-none"
                        onClick={() => increment(item.id)}
                        disabled={item.quantity >= item.stock}
                        aria-label="Increase"
                      >
                        <Plus className="size-3.5" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="font-semibold text-sm sm:text-base">
                        {formatPrice(lineTotal)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive size-8 sm:size-9"
                        aria-label="Remove"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <aside className="lg:col-span-1">
          <div className="rounded-lg border bg-card p-4 sm:p-6 lg:sticky lg:top-20">
            <h2 className="font-semibold text-lg mb-4">Order summary</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (est.)</span>
                <span>{formatPrice(tax)}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between text-base font-bold">
              <span>Total</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>

            <div className="mt-5 space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Promo code
              </label>
              <div className="flex gap-2">
                <Input placeholder="Enter code" />
                <Button variant="outline">Apply</Button>
              </div>
            </div>

            <Button size="lg" className="w-full mt-6">
              Proceed to checkout
            </Button>
            <Button asChild variant="outline" className="w-full mt-2">
              <Link to="/products">Continue shopping</Link>
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Free shipping on orders over $50
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
