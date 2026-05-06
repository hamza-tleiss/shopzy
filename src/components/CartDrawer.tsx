import { Link } from "react-router-dom"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/store/useCartStore"
import { formatPrice } from "@/lib/utils"

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen)
  const closeCart = useCartStore((s) => s.closeCart)
  const items = useCartStore((s) => s.items)
  const increment = useCartStore((s) => s.increment)
  const decrement = useCartStore((s) => s.decrement)
  const removeItem = useCartStore((s) => s.removeItem)
  const total = useCartStore((s) => s.getTotal())
  const totalItems = useCartStore((s) => s.getTotalItems())

  return (
    <Sheet open={isOpen} onOpenChange={(o) => !o && closeCart()}>
      <SheetContent className="flex w-full flex-col sm:max-w-md p-0">
        <SheetHeader className="border-b p-4 sm:p-6 pr-12">
          <SheetTitle className="flex items-center gap-2 text-base sm:text-lg">
            <ShoppingBag className="size-5" />
            Your Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <ShoppingBag className="size-12 text-muted-foreground" />
            <p className="font-medium">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">
              Add some products to get started.
            </p>
            <SheetClose asChild>
              <Button asChild className="mt-2">
                <Link to="/products">Browse products</Link>
              </Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {items.map((item) => {
                const lineTotal =
                  item.price *
                  item.quantity *
                  (1 - item.discountPercentage / 100)
                return (
                  <div key={item.id} className="flex gap-3">
                    <Link
                      to={`/product/${item.id}`}
                      onClick={closeCart}
                      className="shrink-0"
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="size-16 sm:size-20 rounded-md border object-cover bg-muted"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item.id}`}
                        onClick={closeCart}
                        className="text-sm font-medium line-clamp-2 hover:underline"
                      >
                        {item.title}
                      </Link>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {formatPrice(
                          item.price * (1 - item.discountPercentage / 100),
                        )}{" "}
                        each
                      </div>

                      <div className="mt-2 flex items-center justify-between gap-2">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7 rounded-none"
                            onClick={() => decrement(item.id)}
                            aria-label="Decrease"
                          >
                            <Minus className="size-3" />
                          </Button>
                          <span className="w-7 sm:w-8 text-center text-sm">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7 rounded-none"
                            onClick={() => increment(item.id)}
                            disabled={item.quantity >= item.stock}
                            aria-label="Increase"
                          >
                            <Plus className="size-3" />
                          </Button>
                        </div>
                        <div className="font-semibold text-sm">
                          {formatPrice(lineTotal)}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive shrink-0 size-8"
                      aria-label="Remove"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                )
              })}
            </div>

            <div className="border-t p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-muted-foreground">Free</span>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <SheetClose asChild>
                <Button asChild className="w-full" size="lg">
                  <Link to="/cart">Checkout</Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button variant="outline" className="w-full">
                  Continue shopping
                </Button>
              </SheetClose>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
