import { FoodSwiper } from "@/components/ui/food-swiper";

export default async function Page() {

    return(
        <main className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        <div className="container relative mx-auto flex min-h-screen flex-col items-center justify-center px-4">
          <header className="mb-8 text-center">
            <h1 className="mb-2 text-4xl font-bold tracking-tight text-white md:text-5xl">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                FoodSwipe
              </span>
            </h1>
            <p className="text-lg text-gray-300">Discover your next favorite meal</p>
          </header>
          <FoodSwiper />
        </div>
      </main>
    )
    
}