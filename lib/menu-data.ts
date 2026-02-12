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
    name: "Classic Cheeseburger",
    description: "Juicy beef patty with melted cheddar, fresh lettuce, tomato, and our signature sauce",
    price: 8.99,
    image: "/ClassicCheeseburger.jpg",
    category: "burgers",
  },
  {
    id: "crispy-fries",
    name: "Crispy Fries",
    description: "Golden, hand-cut fries seasoned with sea salt and served piping hot",
    price: 3.99,
    image: "/CrispyFries.jpg",
    category: "sides",
  },
  {
    id: "chicken-wings",
    name: "Buffalo Wings",
    description: "Crispy fried wings tossed in spicy buffalo sauce with celery and blue cheese dip",
    price: 10.99,
    image: "/maxresdefault.jpg",
    category: "chicken",
  },
  {
    id: "pepperoni-pizza",
    name: "Pepperoni Pizza",
    description: "Hand-tossed crust with tomato sauce, mozzarella, and premium pepperoni slices",
    price: 12.99,
    image: "/pizza.jpg",
    category: "pizza",
  },
  {
    id: "hot-dog",
    name: "Loaded Hot Dog",
    description: "All-beef frank in a soft bun with mustard, ketchup, relish, and crispy onions",
    price: 5.99,
    image: "/LoadedHotDog.jpg",
    category: "sides",
  },
  {
    id: "milkshake",
    name: "Chocolate Milkshake",
    description: "Thick and creamy chocolate shake topped with whipped cream and a cherry",
    price: 5.49,
    image: "/ChocolateMilkshake.webp",
    category: "drinks",
  },
  {
    id: "chicken-nuggets",
    name: "Chicken Nuggets",
    description: "10 crispy golden nuggets with your choice of dipping sauce",
    price: 7.49,
    image: "/ChickenNuggets.jpg",
    category: "chicken",
  },
  {
    id: "soda",
    name: "Ice Cold Cola",
    description: "Refreshing cola served over ice in a tall glass",
    price: 2.49,
    image: "/iseCold.jpg",
    category: "drinks",
  },
]
