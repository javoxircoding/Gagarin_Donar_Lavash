"use client"

import Image from "next/image"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart, type MenuItem } from "@/lib/cart-context"

export function MenuCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart()

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold leading-snug text-card-foreground">
            {item.name}
          </h3>
          <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-bold text-primary">
            {item.price.toFixed(3)} so'm
          </span>
        </div>
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>
        <Button
          size="sm"
          className="mt-2 w-full gap-1.5"
          onClick={() => addItem(item)}
        >
          <Plus className="h-4 w-4" />
          Savatga qo‘shish
        </Button>
      </div>
    </article>
  )
}
