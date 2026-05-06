import { Link, NavLink, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState, type FormEvent } from "react"
import { ShoppingCart, Search, Heart, Menu, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/store/useCartStore"
import { useWishlistStore } from "@/store/useWishlistStore"
import { ThemeToggle } from "./ThemeToggle"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/products", label: "Shop", end: false },
  { to: "/categories", label: "Categories", end: false },
]

function DesktopNavLink({
  to,
  end,
  children,
}: {
  to: string
  end?: boolean
  children: React.ReactNode
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          "group relative py-1.5 text-sm font-medium transition-colors",
          isActive
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground",
        )
      }
    >
      {({ isActive }) => (
        <>
          {children}
          <span
            className={cn(
              "pointer-events-none absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-linear-to-r from-primary via-primary to-primary origin-left transition-transform duration-300",
              isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50",
            )}
          />
        </>
      )}
    </NavLink>
  )
}

function MobileNavLink({
  to,
  end,
  onClick,
  children,
}: {
  to: string
  end?: boolean
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-primary/10 text-primary font-semibold"
            : "text-foreground/80 hover:bg-accent hover:text-foreground",
        )
      }
    >
      {({ isActive }) => (
        <span className="flex items-center gap-2">
          {isActive && (
            <span className="size-1.5 rounded-full bg-primary animate-pop" />
          )}
          {children}
        </span>
      )}
    </NavLink>
  )
}

function CartBadge({ count }: { count: number }) {
  const prev = useRef(count)
  const [pulse, setPulse] = useState(false)
  useEffect(() => {
    if (count > prev.current) {
      setPulse(true)
      const t = setTimeout(() => setPulse(false), 400)
      return () => clearTimeout(t)
    }
    prev.current = count
  }, [count])
  if (count <= 0) return null
  return (
    <Badge
      variant="default"
      className={cn(
        "absolute -right-1 -top-1 h-5 min-w-5 justify-center px-1 text-[10px]",
        pulse && "animate-pop",
      )}
    >
      {count}
    </Badge>
  )
}

export function Navbar() {
  const totalItems = useCartStore((s) => s.getTotalItems())
  const openCart = useCartStore((s) => s.openCart)
  const wishlistCount = useWishlistStore((s) => s.ids.length)

  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/products?q=${encodeURIComponent(query.trim())}`)
      setMobileOpen(false)
    }
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-lg shadow-sm border-border"
          : "bg-background/60 backdrop-blur-md border-transparent",
      )}
    >
      <div className="container mx-auto flex h-16 items-center gap-4 px-4">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Store className="size-5 text-primary" /> Shopzy
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-1">
              {navLinks.map((l) => (
                <MobileNavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </MobileNavLink>
              ))}
            </nav>
            <form onSubmit={handleSearch} className="mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-9"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </form>
          </SheetContent>
        </Sheet>

        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="grid place-items-center size-8 rounded-lg bg-linear-to-br from-primary to-primary/70 text-primary-foreground shadow-sm">
            <Store className="size-4" />
          </span>
          <span className="hidden sm:inline tracking-tight">Shopzy</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 ml-6">
          {navLinks.map((l) => (
            <DesktopNavLink key={l.to} to={l.to} end={l.end}>
              {l.label}
            </DesktopNavLink>
          ))}
        </nav>

        <form
          onSubmit={handleSearch}
          className="hidden md:block ml-auto w-full max-w-sm"
        >
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              placeholder="Search products..."
              className="pl-9 transition-shadow focus-visible:shadow-md"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </form>

        <div className="ml-auto md:ml-0 flex items-center gap-1">
          <ThemeToggle />

          <Button variant="ghost" size="icon" asChild className="relative">
            <Link to="/wishlist" aria-label="Wishlist" className="group">
              <Heart className="size-5 transition-transform group-hover:scale-110" />
              {wishlistCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-1 -top-1 h-5 min-w-5 justify-center px-1 text-[10px]"
                >
                  {wishlistCount}
                </Badge>
              )}
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={openCart}
            className="relative group"
            aria-label="Open cart"
          >
            <ShoppingCart className="size-5 transition-transform group-hover:scale-110" />
            <CartBadge count={totalItems} />
          </Button>
        </div>
      </div>
    </header>
  )
}
