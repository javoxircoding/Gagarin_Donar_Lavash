import type { MenuItem } from "./cart-context"

export const categories = [
  { id: "all", label: "All" },
  { id: "burgers", label: "Burgers" },
  { id: "sides", label: "Sides" },
  { id: "chicken", label: "Chicken" },
  { id: "pizza", label: "Pizza" },
  { id: "drinks", label: "Drinks" },
]

export const menuItems: MenuItem[] = [
  {
    id: "classic-burger",
    name: "lavash",
    description: "Tandirda yangi yopilgan issiq lavash, sersharbat go'sht, qarsillagan chipslar va bizning maxsus sousimiz.",
    price: 20.000,
    image: "/lavash.jpg",
    category: "burgers",
  },
  {
    id: "crispy-fries",
    name: "Hot Dog",
    description: "Yumshoq bulochka, sifatli sosiska va yangi uzilgan bodring-pomidorlardan tayyorlangan sevimli hot-dogingiz.",
    price: 20.000,
    image: "/hotDog.png",
    category: "sides",
  },
  {
    id: "chicken-wings",
    name: "Shovurma",
    description: "Haqiqiy go'sht ishqibozlari uchun: ziravorlar bilan pishirilgan mol go'shti, sershira salat va o'zimizning maxsus sousimiz uyg'unligi.",
    price: 15.000,
    image: "/shovurma.png",
    category: "chicken",
  },
  {
    id: "pepperoni-pizza",
    name: "Somsa",
    description: "Tandirda yangi yopilgan issiq somsa, sersharbat go'sht, qarsillagan chipslar va bizning maxsus sousimiz.",
    price: 12.000,
    image: "/somsa.png",
    category: "pizza",
  },
  {
    id: "hot-dog",
    name: "Loaded Hot Dog",
    description: "All-beef frank in a soft bun with mustard, ketchup, relish, and crispy onions",
    price: 25.000,
    image: "/LoadedHotDog.jpg",
    category: "sides",
  },
  {
    id: "milkshake",
    name: "Chocolate Milkshake",
    description: "Thick and creamy chocolate shake topped with whipped cream and a cherry",
    price: 5.000,
    image: "/ChocolateMilkshake.webp",
    category: "drinks",
  },
  {
    id: "chicken-nuggets",
    name: "Chicken Nuggets",
    description: "10 crispy golden nuggets with your choice of dipping sauce",
    price: 7.000,
    image: "/ChickenNuggets.jpg",
    category: "chicken",
  },
  {
    id: "soda",
    name: "Ice Cold Cola",
    description: "Refreshing cola served over ice in a tall glass",
    price: 15.000,
    image: "/iseCold.jpg",
    category: "drinks",
  },
]
