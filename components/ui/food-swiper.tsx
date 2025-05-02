"use client"

import { useCallback, useState, useEffect } from "react"
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion"
import { Check, X, ThumbsUp } from "lucide-react"

import { FoodCard } from "./food-card"
import { Button } from "./button"
import { RecommendationModal } from "./recommendation-modal"

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
    image: "/Meal Photo 44775.jpg",
    cuisine: "Japanese",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Butter Chicken",
    description: "Tender chicken in a rich, creamy tomato sauce",
    image: "/Meal Photo 2641886.jpg",
    cuisine: "Indian",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Paella",
    description: "Saffron rice with seafood, chicken, and chorizo",
    image: "/Meal Photo Flodahm.jpg",
    cuisine: "Spanish",
    rating: 4.5,
  },
  {
    id: 6,
    name: "Ramen",
    description: "Rich tonkotsu broth with chashu pork and soft-boiled egg",
    image: "/Meal Photo from Pexels.jpg",
    cuisine: "Japanese",
    rating: 4.7,
  },
  {
    id: 7,
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and basil",
    image: "/Meal Photo Rajesh.jpg",
    cuisine: "Italian",
    rating: 4.5,
  },
  {
    id: 8,
    name: "Pad Thai",
    description: "Stir-fried rice noodles with eggs, tofu, and peanuts",
    image: "/Meal Photo 1766934996.jpg",
    cuisine: "Thai",
    rating: 4.6,
  },
  {
    id: 9,
    name: "Beef Tacos",
    description: "Corn tortillas with seasoned beef, salsa, and guacamole",
    image: "/Meal Photo Valeriya (1).jpg",
    cuisine: "Mexican",
    rating: 4.4,
  },
  {
    id: 10,
    name: "Chicken Tikka Masala",
    description: "Grilled chicken in a creamy spiced tomato sauce",
    image: "/Meal Photo Yente Van Eynde.jpg",
    cuisine: "Indian",
    rating: 4.8,
  },
]

// Recommended recipes that will be shown after 8 swipes
const recommendedRecipes = [
  {
    id: 101,
    name: "Fusion Truffle Burger",
    description: "A perfect blend of Italian and American flavors with truffle aioli and premium beef patty",
    image: "/Meal Photo Valeriya.jpg",
    cuisine: "Fusion",
    rating: 5.0,
    ingredients: [
      "Premium ground beef",
      "Black truffle paste",
      "Brioche buns",
      "Caramelized onions",
      "Aged cheddar cheese",
      "Arugula",
      "Garlic aioli",
    ],
    preparationTime: "30 minutes",
    difficulty: "Medium",
  },
  {
    id: 102,
    name: "Spicy Seafood Ramen",
    description: "Japanese-inspired ramen with an Indian twist of spices and seafood",
    image: "",
    cuisine: "Fusion",
    rating: 4.9,
    ingredients: [
      "Fresh ramen noodles",
      "Shrimp and calamari",
      "Tonkotsu broth",
      "Garam masala",
      "Soft-boiled egg",
      "Green onions",
      "Nori seaweed",
    ],
    preparationTime: "45 minutes",
    difficulty: "Hard",
  },
  {
    id: 103,
    name: "Mediterranean Paella Tacos",
    description: "Spanish paella flavors wrapped in Mexican-style soft corn tortillas",
    image: "",
    cuisine: "Fusion",
    rating: 4.8,
    ingredients: [
      "Corn tortillas",
      "Saffron rice",
      "Chorizo",
      "Shrimp and mussels",
      "Bell peppers",
      "Lime wedges",
      "Cilantro",
    ],
    preparationTime: "40 minutes",
    difficulty: "Medium",
  },
]

export function FoodSwiper() {
  const [cards, setCards] = useState(foodItems)
  const [history, setHistory] = useState<Array<{ item: (typeof foodItems)[0]; liked: boolean }>>([])
  const [swipeCount, setSwipeCount] = useState(0)
  const [showRecommendation, setShowRecommendation] = useState(false)
  const [recommendedRecipe, setRecommendedRecipe] = useState<(typeof recommendedRecipes)[0] | null>(null)

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
      setSwipeCount((prev) => prev + 1)

      // Reset swipeX after animation starts
      requestAnimationFrame(() => {
        swipeX.set(0)
      })
    },
    [cards, swipeX],
  )

  // Generate a recommendation based on liked items
  useEffect(() => {
    if (swipeCount === 8) {
      // Get all liked items
      const likedItems = history.filter((item) => item.liked).map((item) => item.item)

      // If no items were liked, pick a random recommendation
      if (likedItems.length === 0) {
        const randomIndex = Math.floor(Math.random() * recommendedRecipes.length)
        setRecommendedRecipe(recommendedRecipes[randomIndex])
      } else {
        // Count cuisines to find the most liked
        const cuisineCounts: Record<string, number> = {}
        likedItems.forEach((item) => {
          cuisineCounts[item.cuisine] = (cuisineCounts[item.cuisine] || 0) + 1
        })

        // Find the most liked cuisine
        let maxCount = 0
        let favoriteCuisine = ""
        Object.entries(cuisineCounts).forEach(([cuisine, count]) => {
          if (count > maxCount) {
            maxCount = count
            favoriteCuisine = cuisine
          }
        })

        // Find a recommendation that matches or pick a random one if no match
        const matchingRecommendations = recommendedRecipes.filter(
          (recipe) =>
            recipe.cuisine.includes(favoriteCuisine) ||
            recipe.description.toLowerCase().includes(favoriteCuisine.toLowerCase()),
        )

        if (matchingRecommendations.length > 0) {
          const randomIndex = Math.floor(Math.random() * matchingRecommendations.length)
          setRecommendedRecipe(matchingRecommendations[randomIndex])
        } else {
          const randomIndex = Math.floor(Math.random() * recommendedRecipes.length)
          setRecommendedRecipe(recommendedRecipes[randomIndex])
        }
      }

      setShowRecommendation(true)
    }
  }, [swipeCount, history])

  // Reset cards when all are swiped
  if (cards.length === 0 && history.length > 0 && !showRecommendation) {
    setTimeout(() => {
      setCards(foodItems)
      setHistory([])
    }, 1000)
  }

  const handleCloseRecommendation = () => {
    setShowRecommendation(false)
    setSwipeCount(0)
    // Reset cards if needed
    if (cards.length === 0) {
      setCards(foodItems)
      setHistory([])
    }
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

      {/* Swipe counter */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-2 rounded-full bg-black/20 px-3 py-1.5 backdrop-blur-sm">
        <ThumbsUp className="h-4 w-4 text-white" />
        <span className="text-sm font-medium text-white">{swipeCount}/8</span>
      </div>

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
      {cards.length === 0 && !showRecommendation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <h3 className="mb-2 text-2xl font-bold text-white">No more dishes!</h3>
          <p className="text-gray-300">Check back soon for more delicious options</p>
        </motion.div>
      )}

      {/* Recommendation modal */}
      <AnimatePresence>
        {showRecommendation && recommendedRecipe && (
          <RecommendationModal recipe={recommendedRecipe} onClose={handleCloseRecommendation} />
        )}
      </AnimatePresence>
    </div>
  )
}
