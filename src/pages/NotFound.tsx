import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24 text-center">
      <h1 className="text-5xl sm:text-6xl font-bold">404</h1>
      <p className="text-sm sm:text-base text-muted-foreground mt-2 mb-5 sm:mb-6">
        We couldn't find that page.
      </p>
      <Button asChild>
        <Link to="/">Back to home</Link>
      </Button>
    </div>
  )
}
