"use client"

import { ShoppingCart, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

export function SiteHeader() {
  const { totalItems, setIsCartOpen } = useCart()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Flame className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            BiteBurner
          </span>
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          <a
            href="#menu"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Menu
          </a>
          <a
            href="#checkout"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Checkout
          </a>
        </nav>

        <Button
          variant="outline"
          size="sm"
          className="relative gap-2 bg-transparent"
          onClick={() => setIsCartOpen(true)}
          aria-label={`Open cart with ${totalItems} items`}
        >
          <ShoppingCart className="h-4 w-4" />
          <span className="hidden sm:inline">Cart</span>
          {totalItems > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {totalItems}
            </span>
          )}
        </Button>
      </div>
    </header>
  )
}
