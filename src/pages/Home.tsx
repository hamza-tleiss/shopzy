import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  Headphones,
  RefreshCw,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductGrid } from "@/components/ProductGrid"
import { api } from "@/lib/api"
import { getCategoryStyle } from "@/lib/categoryIcons"
import { cn } from "@/lib/utils"
import type { Category, Product } from "@/types"

const features = [
  { icon: Truck, title: "Free shipping", desc: "On orders over $50" },
  { icon: ShieldCheck, title: "Secure payment", desc: "100% protected" },
  { icon: RefreshCw, title: "Easy returns", desc: "30-day money back" },
  { icon: Headphones, title: "24/7 support", desc: "Always here for you" },
]

export function Home() {
  const [featured, setFeatured] = useState<Product[]>([])
  const [topRated, setTopRated] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    Promise.all([
      api.getProducts({ limit: 8, sortBy: "rating", order: "desc" }),
      api.getProducts({ limit: 4, skip: 10 }),
      api.getCategories(),
    ])
      .then(([rated, feat, cats]) => {
        if (cancelled) return
        setTopRated(rated.products)
        setFeatured(feat.products)
        setCategories(cats.slice(0, 8))
      })
      .catch(console.error)
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div>
      {/* Hero ───────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* animated gradient blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-32 size-112 rounded-full bg-primary/15 blur-3xl animate-float-slow" />
          <div className="absolute top-32 -right-24 size-104 rounded-full bg-violet-500/15 blur-3xl animate-float-slower" />
          <div className="absolute bottom-0 left-1/3 size-80 rounded-full bg-sky-400/10 blur-3xl animate-float-slow" />
          {/* subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary px-3 py-1 text-xs font-semibold mb-4 backdrop-blur-sm">
              <Sparkles className="size-3.5" />
              New season • New deals
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-linear-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent">
              Shop the best products at unbeatable prices
            </h1>
            <p className="text-muted-foreground text-base md:text-lg mb-6 max-w-md leading-relaxed">
              Discover thousands of products across every category. Quality you
              can trust, delivered fast to your door.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="xl"
                className="shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 transition-all"
              >
                <Link to="/products">
                  Shop now <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="xl"
                className="hover:-translate-y-0.5 transition-transform"
              >
                <Link to="/categories">Browse categories</Link>
              </Button>
            </div>
          </div>
          <div
            className="hidden md:block animate-fade-up"
            style={{ animationDelay: "120ms" }}
          >
            <div className="relative">
              {featured[0] && (
                <img
                  src={featured[0].thumbnail}
                  alt="Featured product"
                  className="rounded-2xl shadow-2xl border bg-card aspect-square object-cover w-full max-w-md ml-auto rotate-1 hover:rotate-0 transition-transform duration-500"
                />
              )}
              {featured[1] && (
                <img
                  src={featured[1].thumbnail}
                  alt="Featured product"
                  className="absolute -bottom-6 -left-2 rounded-xl shadow-xl border bg-card size-40 object-cover hidden lg:block -rotate-3 hover:rotate-0 transition-transform duration-500"
                />
              )}
              {featured[2] && (
                <div className="absolute -top-4 -right-4 rounded-xl shadow-xl border bg-card/90 backdrop-blur-sm px-4 py-3 hidden lg:flex items-center gap-2 animate-fade-up" style={{ animationDelay: "400ms" }}>
                  <span className="grid place-items-center size-8 rounded-full bg-emerald-500/15 text-emerald-600">
                    <Sparkles className="size-4" />
                  </span>
                  <div className="text-xs">
                    <div className="font-semibold">Top rated this week</div>
                    <div className="text-muted-foreground">
                      {featured[2].title.slice(0, 22)}…
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features ───────────────────────────────── */}
      <section className="container mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group flex items-center gap-3 rounded-lg border bg-card p-4 transition-all duration-300 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="grid place-items-center size-10 rounded-full bg-primary/10 text-primary shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-6">
                <f.icon className="size-5" />
              </div>
              <div>
                <div className="font-semibold text-sm">{f.title}</div>
                <div className="text-xs text-muted-foreground">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories ─────────────────────────────── */}
      <section className="container mx-auto px-4 py-10 md:py-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Shop by category
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Find what you need in our curated categories.
            </p>
          </div>
          <Button asChild variant="ghost" size="sm" className="group">
            <Link to="/categories">
              See all{" "}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((c, i) => {
            const { Icon, iconClass, bgClass, glowClass } = getCategoryStyle(
              c.slug,
            )
            return (
              <Link
                key={c.slug}
                to={`/category/${c.slug}`}
                className="group relative overflow-hidden rounded-xl border bg-card p-5 hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div
                  className={cn(
                    "absolute inset-0 bg-linear-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                    glowClass,
                  )}
                />
                <div className="relative flex items-center gap-3">
                  <div
                    className={cn(
                      "grid place-items-center size-12 rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-110",
                      bgClass,
                    )}
                  >
                    <Icon className={cn("size-6", iconClass)} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold capitalize leading-tight truncate">
                      {c.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1 group-hover:text-primary transition-colors">
                      Shop now{" "}
                      <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Top rated ──────────────────────────────── */}
      <section className="container mx-auto px-4 py-10 md:py-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Top rated
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              The products our customers love the most.
            </p>
          </div>
          <Button asChild variant="ghost" size="sm" className="group">
            <Link to="/products">
              View all{" "}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
        <ProductGrid products={topRated} loading={loading} />
      </section>
    </div>
  )
}
