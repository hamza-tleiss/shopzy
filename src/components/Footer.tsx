import { Store, Mail, MessageCircle, Globe } from "lucide-react"
import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 font-bold text-lg mb-3">
              <Store className="size-6 text-primary" />
              Shopzy
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Your one-stop online shop for quality products at great prices.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
                aria-label="Email"
              >
                <Mail className="size-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
                aria-label="Chat"
              >
                <MessageCircle className="size-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
                aria-label="Website"
              >
                <Globe className="size-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
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

          <div>
            <h4 className="font-semibold mb-3 text-sm">Account</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
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

        <div className="mt-10 border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Shopzy.</p>
          <p>
            Powered by{" "}
            <span className="font-semibold text-foreground">Hamza Tleiss</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
