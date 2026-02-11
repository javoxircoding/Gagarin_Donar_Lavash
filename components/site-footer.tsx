import { Flame } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-8 text-center md:flex-row md:justify-between md:px-6 md:text-left">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
            <Flame className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold text-card-foreground">
            BiteBurner
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Fast food, fast delivery. Built with Next.js.
        </p>
      </div>
    </footer>
  )
}
