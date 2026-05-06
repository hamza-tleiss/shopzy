import { Store, Mail, MessageCircle, Globe } from "lucide-react"
import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-12 sm:mt-16">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Brand block — full width on mobile, left column on desktop */}
        <div className="grid gap-8 sm:gap-10 md:grid-cols-4 md:gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-bold text-base sm:text-lg mb-2">
              <Store className="size-5 sm:size-6 text-primary" />
              Shopzy
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">
              Your one-stop online shop for quality products at great prices.
            </p>
            <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
              <a
                href="#"
                className="grid place-items-center size-9 rounded-full border bg-background/50 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                aria-label="Email"
              >
                <Mail className="size-4" />
              </a>
              <a
                href="#"
                className="grid place-items-center size-9 rounded-full border bg-background/50 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                aria-label="Chat"
              >
                <MessageCircle className="size-4" />
              </a>
              <a
                href="#"
                className="grid place-items-center size-9 rounded-full border bg-background/50 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                aria-label="Website"
              >
                <Globe className="size-4" />
              </a>
            </div>
          </div>

          {/* Link columns — 2-up on mobile, 1-each on desktop */}
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:col-span-2 md:grid-cols-2">
            <div className="text-center">
              <h4 className="font-semibold mb-2 sm:mb-3 text-sm">Shop</h4>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li>
                  <Link to="/products" className="hover:text-foreground">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="hover:text-foreground">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products?sort=price-asc"
                    className="hover:text-foreground"
                  >
                    Best Deals
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <h4 className="font-semibold mb-2 sm:mb-3 text-sm">Account</h4>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li>
                  <Link to="/cart" className="hover:text-foreground">
                    Cart
                  </Link>
                </li>
                <li>
                  <Link to="/wishlist" className="hover:text-foreground">
                    Wishlist
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Orders
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 border-t pt-5 sm:pt-6 flex flex-col sm:flex-row justify-between items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-muted-foreground text-center sm:text-left">
          <p>© {new Date().getFullYear()} Shopzy. All rights reserved.</p>
          <p>
            Powered by{" "}
            <span className="font-semibold text-foreground">Hamza Tleiss</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
