import { HeroSection } from "@/components/hero-section"
import { MenuSection } from "@/components/menu-section"
import { CheckoutSection } from "@/components/checkout-section"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <>
      <HeroSection />
      <main>
        <MenuSection />
        <CheckoutSection />
      </main>
      <SiteFooter />
    </>
  )
}
