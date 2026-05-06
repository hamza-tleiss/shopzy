import {
  Bike,
  Cable,
  Car,
  ChefHat,
  Droplets,
  Dumbbell,
  Flower2,
  Footprints,
  Gem,
  Glasses,
  Lamp,
  Laptop,
  Package,
  ShoppingBag,
  ShoppingBasket,
  Shirt,
  Smartphone,
  Sofa,
  Sparkles,
  Tablet,
  Watch,
  type LucideIcon,
} from "lucide-react"

export interface CategoryStyle {
  Icon: LucideIcon
  /** Full Tailwind class for the icon foreground color (literal string for JIT). */
  iconClass: string
  /** Full Tailwind class for the icon tile background. */
  bgClass: string
  /** Full Tailwind classes for the soft background gradient on hover. */
  glowClass: string
}

const FALLBACK: CategoryStyle = {
  Icon: Package,
  iconClass: "text-primary",
  bgClass: "bg-primary/10",
  glowClass: "from-primary/10 via-transparent to-transparent",
}

const MAP: Record<string, CategoryStyle> = {
  beauty: {
    Icon: Sparkles,
    iconClass: "text-pink-600 dark:text-pink-400",
    bgClass: "bg-pink-500/10",
    glowClass: "from-pink-500/15 via-transparent to-transparent",
  },
  fragrances: {
    Icon: Flower2,
    iconClass: "text-fuchsia-600 dark:text-fuchsia-400",
    bgClass: "bg-fuchsia-500/10",
    glowClass: "from-fuchsia-500/15 via-transparent to-transparent",
  },
  furniture: {
    Icon: Sofa,
    iconClass: "text-amber-600 dark:text-amber-400",
    bgClass: "bg-amber-500/10",
    glowClass: "from-amber-500/15 via-transparent to-transparent",
  },
  groceries: {
    Icon: ShoppingBasket,
    iconClass: "text-emerald-600 dark:text-emerald-400",
    bgClass: "bg-emerald-500/10",
    glowClass: "from-emerald-500/15 via-transparent to-transparent",
  },
  "home-decoration": {
    Icon: Lamp,
    iconClass: "text-orange-600 dark:text-orange-400",
    bgClass: "bg-orange-500/10",
    glowClass: "from-orange-500/15 via-transparent to-transparent",
  },
  "kitchen-accessories": {
    Icon: ChefHat,
    iconClass: "text-red-600 dark:text-red-400",
    bgClass: "bg-red-500/10",
    glowClass: "from-red-500/15 via-transparent to-transparent",
  },
  laptops: {
    Icon: Laptop,
    iconClass: "text-slate-700 dark:text-slate-300",
    bgClass: "bg-slate-500/10",
    glowClass: "from-slate-500/15 via-transparent to-transparent",
  },
  "mens-shirts": {
    Icon: Shirt,
    iconClass: "text-blue-600 dark:text-blue-400",
    bgClass: "bg-blue-500/10",
    glowClass: "from-blue-500/15 via-transparent to-transparent",
  },
  "mens-shoes": {
    Icon: Footprints,
    iconClass: "text-stone-700 dark:text-stone-300",
    bgClass: "bg-stone-500/10",
    glowClass: "from-stone-500/15 via-transparent to-transparent",
  },
  "mens-watches": {
    Icon: Watch,
    iconClass: "text-indigo-600 dark:text-indigo-400",
    bgClass: "bg-indigo-500/10",
    glowClass: "from-indigo-500/15 via-transparent to-transparent",
  },
  "mobile-accessories": {
    Icon: Cable,
    iconClass: "text-cyan-600 dark:text-cyan-400",
    bgClass: "bg-cyan-500/10",
    glowClass: "from-cyan-500/15 via-transparent to-transparent",
  },
  motorcycle: {
    Icon: Bike,
    iconClass: "text-red-600 dark:text-red-400",
    bgClass: "bg-red-500/10",
    glowClass: "from-red-500/15 via-transparent to-transparent",
  },
  "skin-care": {
    Icon: Droplets,
    iconClass: "text-rose-600 dark:text-rose-400",
    bgClass: "bg-rose-500/10",
    glowClass: "from-rose-500/15 via-transparent to-transparent",
  },
  smartphones: {
    Icon: Smartphone,
    iconClass: "text-sky-600 dark:text-sky-400",
    bgClass: "bg-sky-500/10",
    glowClass: "from-sky-500/15 via-transparent to-transparent",
  },
  "sports-accessories": {
    Icon: Dumbbell,
    iconClass: "text-emerald-600 dark:text-emerald-400",
    bgClass: "bg-emerald-500/10",
    glowClass: "from-emerald-500/15 via-transparent to-transparent",
  },
  sunglasses: {
    Icon: Glasses,
    iconClass: "text-yellow-600 dark:text-yellow-400",
    bgClass: "bg-yellow-500/10",
    glowClass: "from-yellow-500/15 via-transparent to-transparent",
  },
  tablets: {
    Icon: Tablet,
    iconClass: "text-blue-600 dark:text-blue-400",
    bgClass: "bg-blue-500/10",
    glowClass: "from-blue-500/15 via-transparent to-transparent",
  },
  tops: {
    Icon: Shirt,
    iconClass: "text-sky-600 dark:text-sky-400",
    bgClass: "bg-sky-500/10",
    glowClass: "from-sky-500/15 via-transparent to-transparent",
  },
  vehicle: {
    Icon: Car,
    iconClass: "text-red-600 dark:text-red-400",
    bgClass: "bg-red-500/10",
    glowClass: "from-red-500/15 via-transparent to-transparent",
  },
  "womens-bags": {
    Icon: ShoppingBag,
    iconClass: "text-rose-600 dark:text-rose-400",
    bgClass: "bg-rose-500/10",
    glowClass: "from-rose-500/15 via-transparent to-transparent",
  },
  "womens-dresses": {
    Icon: Shirt,
    iconClass: "text-pink-600 dark:text-pink-400",
    bgClass: "bg-pink-500/10",
    glowClass: "from-pink-500/15 via-transparent to-transparent",
  },
  "womens-jewellery": {
    Icon: Gem,
    iconClass: "text-amber-600 dark:text-amber-400",
    bgClass: "bg-amber-500/10",
    glowClass: "from-amber-500/15 via-transparent to-transparent",
  },
  "womens-shoes": {
    Icon: Footprints,
    iconClass: "text-rose-600 dark:text-rose-400",
    bgClass: "bg-rose-500/10",
    glowClass: "from-rose-500/15 via-transparent to-transparent",
  },
  "womens-watches": {
    Icon: Watch,
    iconClass: "text-violet-600 dark:text-violet-400",
    bgClass: "bg-violet-500/10",
    glowClass: "from-violet-500/15 via-transparent to-transparent",
  },
}

export function getCategoryStyle(slug: string): CategoryStyle {
  return MAP[slug] ?? FALLBACK
}
