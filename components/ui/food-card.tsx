"use client"

import { useState, useEffect } from "react"
import { motion, type PanInfo, useMotionValue, useTransform, type MotionValue } from "framer-motion"
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
}: FoodCardProps) {
  const [exitX, setExitX] = useState(0)
  const [exitY, setExitY] = useState(0)
  const [exitRotation, setExitRotation] = useState(0)

  // Motion values for interactive dragging
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useMotionValue(initialRotation)

  // Transform values based on drag position - memoize these calculations
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5])
  const scale = useTransform(x, [-300, -100, 0, 100, 300], [0.8, 0.9, 1, 0.9, 0.8])

  // Like/dislike indicators
  const likeOpacity = useTransform(x, [0, 100], [0, 1])
  const dislikeOpacity = useTransform(x, [-100, 0], [1, 0])

  // Update the parent's swipeX value when this card moves - use useEffect for better performance
  useEffect(() => {
    if (!swipeX || !isTop) return

    const unsubscribe = x.onChange((latest) => {
      swipeX.set(latest)
    })

    return () => unsubscribe()
  }, [x, swipeX, isTop])

  // Handle drag end - optimized for performance
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isTop) return

    const swipeThreshold = 100
    const velocity = info.velocity.x
    const offset = info.offset.x

    // Determine if the card was swiped far enough
    if (Math.abs(offset) > swipeThreshold || Math.abs(velocity) > 800) {
      const direction = offset > 0 ? 1 : -1
      const liked = direction > 0

      // Set exit values for animation
      setExitX(direction * window.innerWidth)
      setExitY(info.offset.y)
      setExitRotation(direction * (Math.random() * 20 + 10))

      // Notify parent component
      requestAnimationFrame(() => {
        onSwiped(item.id, liked)
      })
    } else {
      // Reset swipeX to 0 if not swiped far enough
      if (swipeX) {
        // Use spring animation for smoother return
        x.set(0)
        y.set(0)
        rotate.set(initialRotation)
        swipeX.set(0)
      }
    }
  }

  // Calculate 3D stack effect
  const stackScale = isInteractive ? 1 - stackPosition * 0.05 : 0.8
  const stackY = isInteractive ? stackPosition * 10 : 30
  const stackOpacity = isInteractive ? 1 - stackPosition * 0.2 : 0

  return (
    <motion.div
      className={`absolute left-0 top-0 h-full w-full ${isTop ? "cursor-grab active:cursor-grabbing" : ""}`}
      style={{
        x,
        y,
        rotate,
        zIndex,
        opacity: isInteractive ? opacity : stackOpacity,
        scale,
        willChange: "transform", // Hardware acceleration hint
      }}
      drag={isTop}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      initial={{
        scale: stackScale,
        y: stackY,
        rotate: initialRotation,
      }}
      animate={{
        scale: stackScale,
        y: stackY,
        rotate: initialRotation,
      }}
      exit={{
        x: exitX,
        y: exitY,
        rotate: exitRotation,
        opacity: 0,
        transition: {
          duration: 0.3,
          ease: [0.32, 0.72, 0, 1], // Custom easing for smoother animation
        },
      }}
      transition={{
        type: "spring",
        stiffness: 500, // Higher stiffness for faster response
        damping: 30, // Adjusted damping for less oscillation
        mass: 0.5, // Lower mass for faster movement
      }}
      whileTap={{ scale: 1.05 }}
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-3xl shadow-xl"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glass card effect */}
        <div className="absolute inset-0 z-10 rounded-3xl bg-gradient-to-br from-white/10 to-white/5" />

        {/* Card content */}
        <div className="relative z-20 flex h-full flex-col justify-between p-6 select-none">
          {/* Like/Dislike indicators */}
          {isTop && (
            <>
              <motion.div
                className="absolute left-6 top-6 rotate-[-20deg] rounded-lg border-4 border-green-500 px-4 py-2 z-20 "
                style={{ opacity: likeOpacity }}
              >
                <span className="text-2xl font-bold text-green-500">LIKE</span>
              </motion.div>
              <motion.div
                className="absolute right-6 top-6 rotate-[20deg] rounded-lg border-4 border-red-500 px-4 py-2 z-20 "
                style={{ opacity: dislikeOpacity }}
              >
                <span className="text-2xl font-bold text-red-500">NOPE</span>
              </motion.div>
            </>
          )}

          {/* Food image */}
          <div className="absolute inset-0 z-0">
            <Image width={400} height={200} src={item.image || "/placeholder.svg"} alt={item.name} className="h-full w-full object-cover z-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>

          {/* Food info */}
          <div className="mt-auto z-20 ">
            <div className="mb-1 flex items-center">
              <span className="mr-1 rounded-full bg-yellow-400 px-2 py-0.5 text-xs font-semibold text-black">
                {item.cuisine}
              </span>
              <div className="ml-2 flex items-center">
                <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-white">{item.rating}</span>
              </div>
            </div>
            <h2 className="mb-1 text-3xl font-bold text-white">{item.name}</h2>
            <p className="text-sm text-gray-300">{item.description}</p>
          </div>
        </div>

        {/* Futuristic border glow */}
        <div className="absolute inset-0 rounded-3xl border border-white/20 shadow-[0_0_15px_rgba(149,128,255,0.5)]" />
      </div>
    </motion.div>
  )
}
