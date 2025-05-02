import { FoodSwiper } from "@/components/ui/food-swiper";

export default async function Page() {

    return(
        <main className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        <div className="container relative mx-auto flex min-h-screen flex-col items-center justify-center px-4">
          <FoodSwiper />
        </div>
      </main>
    )
    
}