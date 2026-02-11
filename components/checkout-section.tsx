"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, Send, CheckCircle2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"

const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(7, "Enter a valid phone number")
    .regex(/^[+\d\s()-]+$/, "Enter a valid phone number"),
  address: z.string().min(5, "Enter a complete address"),
  notes: z.string().optional(),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

export function CheckoutSection() {
  const { items, totalPrice, clearCart } = useCart()
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  })

  const onSubmit = async (data: CheckoutFormData) => {
    if (items.length === 0) return

    setStatus("loading")
    setErrorMessage("")

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          items: items.map((i) => ({
            name: i.name,
            quantity: i.quantity,
            price: i.price,
          })),
          total: totalPrice,
        }),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || "Failed to place order")
      }

      setStatus("success")
      clearCart()
      reset()
      setTimeout(() => setStatus("idle"), 5000)
    } catch (err) {
      setStatus("error")
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong"
      )
    }
  }

  if (status === "success") {
    return (
      <section
        id="checkout"
        className="mx-auto max-w-2xl px-4 py-16 text-center md:px-6"
      >
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-card-foreground">
            Order Placed!
          </h2>
          <p className="text-muted-foreground">
            Your order has been sent and you will receive a confirmation soon.
            Thank you for choosing BiteBurner!
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="checkout" className="mx-auto max-w-4xl px-4 py-16 md:px-6">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
          Checkout
        </h2>
        <p className="mt-2 text-muted-foreground">
          Fill in your details and we will deliver to your door
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Order Summary */}
        <div className="order-2 lg:order-1 lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-card-foreground">
              <ShoppingBag className="h-5 w-5" />
              Order Summary
            </h3>

            {items.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Your cart is empty. Add items from the menu above.
              </p>
            ) : (
              <>
                <div className="flex flex-col gap-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-card-foreground">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          x{item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-card-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-card-foreground">
                    Total
                  </span>
                  <span className="text-xl font-bold text-primary">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Form */}
        <div className="order-1 lg:order-2 lg:col-span-3">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name" className="text-card-foreground">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="John Doe"
                {...register("name")}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-xs text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="phone" className="text-card-foreground">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                {...register("phone")}
                aria-invalid={!!errors.phone}
              />
              {errors.phone && (
                <p className="text-xs text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="address" className="text-card-foreground">
                Delivery Address
              </Label>
              <Input
                id="address"
                placeholder="123 Main Street, Apt 4B"
                {...register("address")}
                aria-invalid={!!errors.address}
              />
              {errors.address && (
                <p className="text-xs text-destructive">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="notes" className="text-card-foreground">
                Order Notes{" "}
                <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="notes"
                placeholder="Extra napkins, ring the doorbell..."
                {...register("notes")}
              />
            </div>

            {status === "error" && (
              <p className="rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">
                {errorMessage}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              className="mt-2 w-full gap-2"
              disabled={status === "loading" || items.length === 0}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Placing Order...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Place Order
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
