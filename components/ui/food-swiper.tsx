"use client"

import { useCallback, useState } from "react"
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion"
import { Check, X } from "lucide-react"

import { FoodCard } from "./food-card"
import { Button } from "./button"

// Sample food data
const foodItems = [
  {
    id: 1,
    name: "Truffle Pasta",
    description: "Handmade pasta with black truffle cream sauce",
    image: "/Lasagna.jpg",
    cuisine: "Italian",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Wagyu Burger",
    description: "Premium Wagyu beef with caramelized onions and special sauce",
    image: "/Pasta.jpg",
    cuisine: "American",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Sushi Platter",
    description: "Assortment of fresh nigiri and specialty rolls",
    image: "/placeholder.svg?height=600&width=400",
    cuisine: "Japanese",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Butter Chicken",
    description: "Tender chicken in a rich, creamy tomato sauce",
    image: "/placeholder.svg?height=600&width=400",
    cuisine: "Indian",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Paella",
    description: "Saffron rice with seafood, chicken, and chorizo",
    image: "/placeholder.svg?height=600&width=400",
    cuisine: "Spanish",
    rating: 4.5,
  },
]
export function FoodSwiper() {
    const [cards, setCards] = useState(foodItems)
    const [history, setHistory] = useState<Array<{ item: (typeof foodItems)[0]; liked: boolean }>>([])
  
    // Motion value for tracking the swipe position of the top card
    const swipeX = useMotionValue(0)
  
    // Transform swipe position to background colors - optimize with fewer color stops
    const bgColor = useTransform(
      swipeX,
      [-150, 0, 150],
      [
        "rgba(239, 68, 68, 0.15)", // Red with low opacity
        "rgba(0, 0, 0, 0)", // Transparent for center
        "rgba(34, 197, 94, 0.15)", // Green with low opacity
      ],
    )
  
    // Memoize the handleSwiped function to prevent unnecessary re-renders
    const handleSwiped = useCallback(
      (id: number, liked: boolean) => {
        const swipedItem = cards.find((item) => item.id === id)
        if (swipedItem) {
          setHistory((prev) => [...prev, { item: swipedItem, liked }])
        }
        setCards((prev) => prev.filter((item) => item.id !== id))
  
        // Reset swipeX after animation starts
        requestAnimationFrame(() => {
          swipeX.set(0)
        })
      },
      [cards, swipeX],
    )
  
    // Reset cards when all are swiped
    if (cards.length === 0 && history.length > 0) {
      setTimeout(() => {
        setCards(foodItems)
        setHistory([])
      }, 1000)
    }
  
    return (
      <div className="relative h-[600px] w-full max-w-md">
        {/* Color changing background with hardware acceleration */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            backgroundColor: bgColor,
            willChange: "background-color", // Hardware acceleration hint
          }}
        />
  
        {/* Action buttons */}
        <div className="absolute bottom-0 left-0 z-50 flex w-full justify-center gap-8 pb-8">
          <Button
            className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg transition-transform hover:scale-110 z-50" 
            onClick={() => {
              if (cards.length > 0) {
                handleSwiped(cards[0].id, false)
              }
            }}
          >
            <X className="h-8 w-8" />
          </Button>
          <Button
            className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-cyan-500 text-white shadow-lg transition-transform hover:scale-110 z-50"
            onClick={() => {
              if (cards.length > 0) {
                handleSwiped(cards[0].id, true)
              }
            }}
          >
            <Check className="h-8 w-8" />
          </Button>
        </div>
  
        {/* Card stack */}
        <div className="relative h-full w-full">
          <AnimatePresence mode="popLayout">
            {cards.map((item, index) => {
              // Generate random initial rotation between -5 and 5 degrees
              const initialRotation = Math.random() * 10 - 5
  
              // Only make the top 3 cards interactive
              const isInteractive = index < 3
  
              return (
                <FoodCard
                  key={item.id}
                  item={item}
                  onSwiped={handleSwiped}
                  isTop={index === 0}
                  zIndex={1000 - index}
                  isInteractive={isInteractive}
                  initialRotation={initialRotation}
                  stackPosition={index + 1}
                  // Pass the swipeX motion value to the top card only
                  swipeX={index === 0 ? swipeX : undefined}
                />
              )
            })}
          </AnimatePresence>
        </div>
  
        {/* Empty state */}
        {cards.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
          >
            <h3 className="mb-2 text-2xl font-bold text-white">No more dishes!</h3>
            <p className="text-gray-300">Check back soon for more delicious options</p>
          </motion.div>
        )}
      </div>
    )
  }
  