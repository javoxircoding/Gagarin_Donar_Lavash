"use client"

import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"

export function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart()

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Your cart is empty. Browse the menu and add some items!
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="flex flex-col gap-4 py-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium leading-snug text-foreground">
                          {item.name}
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="flex h-6 w-6 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-muted"
                            aria-label={`Decrease ${item.name} quantity`}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-medium text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="flex h-6 w-6 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-muted"
                            aria-label={`Increase ${item.name} quantity`}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-foreground">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <Separator />

            <div className="flex flex-col gap-3 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-foreground">
                  Total
                </span>
                <span className="text-lg font-bold text-primary">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <Button
                className="w-full"
                size="lg"
                onClick={() => {
                  setIsCartOpen(false)
                  document
                    .getElementById("checkout")
                    ?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
