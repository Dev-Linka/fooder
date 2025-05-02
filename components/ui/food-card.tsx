"use client"

import { useState, useEffect } from "react"
import { motion, type PanInfo, useMotionValue, type MotionValue } from "framer-motion"
import { Star } from "lucide-react"
import Image from "next/image"

interface FoodItem {
  id: number
  name: string
  description: string
  image: string
  cuisine: string
  rating: number
}

interface FoodCardProps {
  item: FoodItem
  onSwiped: (id: number, liked: boolean) => void
  isTop: boolean
  zIndex: number
  isInteractive: boolean
  initialRotation: number
  stackPosition: number
  swipeX?: MotionValue<number>
  isMobile?: boolean
}

export function FoodCard({
  item,
  onSwiped,
  isTop,
  zIndex,
  isInteractive,
  initialRotation,
  stackPosition,
  swipeX,
  isMobile = false,
}: FoodCardProps) {
  const [exitX, setExitX] = useState(0)
  const [exitY, setExitY] = useState(0)
  const [exitRotation, setExitRotation] = useState(0)
  const [imageError, setImageError] = useState(false)

  // Semplifichiamo le motion values per migliorare le prestazioni
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Aggiorniamo il swipeX del genitore quando questa carta si muove
  useEffect(() => {
    if (!swipeX || !isTop) return

    const unsubscribe = x.onChange((latest) => {
      swipeX.set(latest)
    })

    return () => unsubscribe()
  }, [x, swipeX, isTop])

  // Ottimizziamo la gestione del drag
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isTop) return

    // Riduciamo la soglia per dispositivi mobili per facilitare lo swipe
    const swipeThreshold = isMobile ? 60 : 80
    const offset = info.offset.x

    // Determiniamo se la carta è stata trascinata abbastanza
    if (Math.abs(offset) > swipeThreshold) {
      const direction = offset > 0 ? 1 : -1
      const liked = direction > 0

      // Impostiamo i valori di uscita per l'animazione
      setExitX(direction * 1000)
      setExitY(info.offset.y)
      setExitRotation(direction * 20)

      // Notifichiamo il componente genitore
      onSwiped(item.id, liked)
    } else {
      // Resettiamo la posizione se non è stato trascinato abbastanza
      x.set(0)
      y.set(0)
      if (swipeX) swipeX.set(0)
    }
  }

  // Calcoliamo un effetto stack più semplice
  const stackScale = 1 - (stackPosition - 1) * 0.05
  const stackY = (stackPosition - 1) * 10

  // Semplifichiamo il rendering per migliorare le prestazioni
  return (
    <motion.div
      className="absolute left-0 top-0 h-full w-full"
      style={{
        x,
        y,
        zIndex,
        rotate: initialRotation,
      }}
      drag={isTop}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.6}
      onDragEnd={handleDragEnd}
      initial={{
        scale: stackScale,
        y: stackY,
      }}
      animate={{
        scale: stackScale,
        y: stackY,
      }}
      exit={{
        x: exitX,
        y: exitY,
        opacity: 0,
        rotate: exitRotation,
        transition: { duration: 0.2 },
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-xl bg-white shadow-md">
        {/* Immagine del cibo */}
        <div className="relative h-4/5 w-full overflow-hidden">
          {item.image && !imageError ? (
            <Image
              src={
                item.image.startsWith("/placeholder")
                  ? `https://via.placeholder.com/400x600/333/fff?text=${encodeURIComponent(item.name)}`
                  : item.image
              }
              alt={item.name}
              fill
              className="object-cover"
              priority={isTop}
              sizes="(max-width: 640px) 100vw, 400px"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="h-full w-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500">{item.name}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
        </div>

        {/* Indicatore di rating */}
        <div className="absolute left-3 top-3">
          <div className="flex items-center gap-1 rounded-full bg-black/30 px-2 py-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium text-white">{item.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Indicatori di Like/Nope - solo per la carta in cima e solo quando viene trascinata */}
        {isTop && x.get() > 50 && (
          <div className="absolute right-4 top-4 rounded-lg border-2 border-green-500 px-2 py-1 rotate-12">
            <span className="text-sm font-bold text-green-500">LIKE</span>
          </div>
        )}

        {isTop && x.get() < -50 && (
          <div className="absolute left-4 top-4 rounded-lg border-2 border-red-500 px-2 py-1 -rotate-12">
            <span className="text-sm font-bold text-red-500">NOPE</span>
          </div>
        )}
      </div>

      {/* Informazioni sul cibo */}
      <div className="absolute bottom-0 w-full bg-white p-3">
        <h3 className="text-lg font-bold">{item.name}</h3>
        <p className="text-xs text-gray-600">{item.cuisine} Cuisine</p>
        <p className="mt-0.5 text-xs text-gray-500 line-clamp-2">{item.description}</p>
      </div>
    </motion.div>
  )
}
