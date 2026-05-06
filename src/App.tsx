import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { Layout } from "@/components/Layout"
import { Home } from "@/pages/Home"
import { Products } from "@/pages/Products"
import { ProductDetail } from "@/pages/ProductDetail"
import { Categories } from "@/pages/Categories"
import { CategoryPage } from "@/pages/CategoryPage"
import { Cart } from "@/pages/Cart"
import { Wishlist } from "@/pages/Wishlist"
import { NotFound } from "@/pages/NotFound"
import { applyTheme, useThemeStore } from "@/store/useThemeStore"

function useThemeSync() {
  const theme = useThemeStore((s) => s.theme)
  useEffect(() => {
    applyTheme(theme)
    if (theme !== "system") return
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => applyTheme("system")
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [theme])
}

function App() {
  useThemeSync()
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
