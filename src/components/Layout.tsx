import { Outlet, useLocation } from "react-router-dom"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { CartDrawer } from "./CartDrawer"

export function Layout() {
  const location = useLocation()
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <div
          key={location.pathname}
          className="animate-in fade-in slide-in-from-bottom-2 duration-500"
        >
          <Outlet />
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  )
}
