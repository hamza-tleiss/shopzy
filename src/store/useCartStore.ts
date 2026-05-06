import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem, Product } from "@/types"

interface CartState {
  items: CartItem[]
  isOpen: boolean

  openCart: () => void
  closeCart: () => void
  toggleCart: () => void

  addItem: (product: Product, quantity?: number) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  increment: (id: number) => void
  decrement: (id: number) => void
  clearCart: () => void

  getTotalItems: () => number
  getSubtotal: () => number
  getDiscountTotal: () => number
  getTotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      addItem: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === product.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === product.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
              isOpen: true,
            }
          }
          return {
            items: [
              ...state.items,
              {
                id: product.id,
                title: product.title,
                price: product.price,
                discountPercentage: product.discountPercentage ?? 0,
                thumbnail: product.thumbnail,
                stock: product.stock ?? 99,
                quantity,
              },
            ],
            isOpen: true,
          }
        }),

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.id === id
                ? { ...i, quantity: Math.max(1, Math.min(quantity, i.stock)) }
                : i,
            )
            .filter((i) => i.quantity > 0),
        })),

      increment: (id) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id && i.quantity < i.stock
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          ),
        })),

      decrement: (id) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
            )
            .filter((i) => i.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),

      getTotalItems: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),

      getSubtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      getDiscountTotal: () =>
        get().items.reduce(
          (sum, i) =>
            sum + i.price * i.quantity * (i.discountPercentage / 100),
          0,
        ),

      getTotal: () =>
        get().items.reduce(
          (sum, i) =>
            sum + i.price * i.quantity * (1 - i.discountPercentage / 100),
          0,
        ),
    }),
    {
      name: "ecommerce-cart",
      partialize: (state) => ({ items: state.items }) as Partial<CartState>,
    },
  ),
)
