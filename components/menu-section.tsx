"use client"

import { useState } from "react"
import { categories, menuItems } from "@/lib/menu-data"
import { MenuCard } from "@/components/menu-card"
import { cn } from "@/lib/utils"

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory)

  return (
    <section id="menu" className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
          Our Menu
        </h2>
        <p className="mt-2 text-muted-foreground">
          Pick your favorites and build the perfect order
        </p>
      </div>

      <div
        className="mb-8 flex flex-wrap items-center justify-center gap-2"
        role="tablist"
        aria-label="Menu categories"
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            role="tab"
            aria-selected={activeCategory === cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-colors",
              activeCategory === cat.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredItems.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
