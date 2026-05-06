import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/lib/api"
import { getCategoryStyle } from "@/lib/categoryIcons"
import { cn } from "@/lib/utils"
import type { Category } from "@/types"

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    api
      .getCategories()
      .then((data) => {
        if (!cancelled) setCategories(data)
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
        All categories
      </h1>
      <p className="text-sm text-muted-foreground mt-1 mb-8">
        Browse products by category.
      </p>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-36 w-full rounded-xl" />
          ))}
        </div>
      ) : (
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
                style={{ animationDelay: `${Math.min(i, 12) * 40}ms` }}
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
                      Explore{" "}
                      <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
