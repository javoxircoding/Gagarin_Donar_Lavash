import Image from "next/image"
import { ArrowDown } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden md:min-h-[70vh]">
      <Image
        src="/macdonalds.jpg"
        alt="Delicious fast food spread"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-foreground/70" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
          Tezkor yetkazib berish, unutilmas lazzat!
        </p>
        <h1 className="text-balance text-4xl font-extrabold leading-tight text-card md:text-6xl lg:text-7xl">
          Tanlang va<br />
          <span className="text-primary">buyurtma bering!</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-card/80 md:text-lg">
          Mazzali lavashlar, sersharbat burgerlar va muzdek ichimliklar — bir necha daqiqada manzilingizga yetkazib beramiz.
        </p>
        <a
          href="#menu"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
        >
          Menyuni ko'rish
          <ArrowDown className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}
