"use client"

import { motion } from "framer-motion"
import { X, Clock, ChefHat, Star } from 'lucide-react'
import Image from "next/image"
import { Button } from "./button"

type Recipe = {
  id: number
  name: string
  description: string
  image: string
  cuisine: string
  rating: number
  ingredients: string[]
  preparationTime: string
  difficulty: string
}

interface RecommendationModalProps {
  recipe: Recipe
  onClose: () => void
  isMobile?: boolean
}

export function RecommendationModal({ recipe, onClose, isMobile = false }: RecommendationModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm !z-[99999]"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative max-h-[90vh] w-full max-w-md overflow-auto rounded-xl sm:rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-4 sm:p-6 shadow-2xl"
      >
        <Button
          onClick={onClose}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 z-10 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-black/20 p-0 text-white backdrop-blur-sm transition-transform hover:scale-110"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>

        <div className="mb-3 sm:mb-4 flex items-center justify-center">
          <div className="flex items-center gap-1 sm:gap-2 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 px-3 py-1.5 sm:px-4 sm:py-2 text-white">
            <ChefHat className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base font-medium">Perfect Recipe for You!</span>
          </div>
        </div>

        <div className="relative mb-3 sm:mb-4 h-48 sm:h-64 w-full overflow-hidden rounded-xl sm:rounded-2xl">
          <Image src={recipe.image || "/placeholder.svg"} alt={recipe.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-3 sm:p-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">{recipe.name}</h2>
            <div className="mt-0.5 sm:mt-1 flex items-center gap-1">
              <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-amber-400 text-amber-400" />
              <span className="text-xs sm:text-sm font-medium text-white">{recipe.rating.toFixed(1)}</span>
              <span className="ml-1 sm:ml-2 rounded-full bg-white/20 px-1.5 py-0.5 text-xs text-white">
                {recipe.cuisine}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-3 sm:mb-4 flex items-center justify-between rounded-lg bg-black/10 p-2 sm:p-3">
          <div className="flex items-center gap-1 sm:gap-2">
            <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-300" />
            <span className="text-xs sm:text-sm text-gray-300">{recipe.preparationTime}</span>
          </div>
          <div className="rounded-full bg-black/20 px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm text-white">
            {recipe.difficulty}
          </div>
        </div>

        <p className="mb-4 sm:mb-6 text-xs sm:text-sm text-gray-300">{recipe.description}</p>

        <h3 className="mb-2 sm:mb-3 text-base sm:text-lg font-semibold text-white">Ingredients</h3>
        <ul className="mb-4 sm:mb-6 space-y-1 sm:space-y-2">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-300">
              <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-amber-400" />
              {ingredient}
            </li>
          ))}
        </ul>

        <Button
          className="w-full bg-gradient-to-r from-amber-500 to-pink-500 text-white text-sm sm:text-base"
          onClick={onClose}
        >
          Try Another Recipe
        </Button>
      </motion.div>
    </motion.div>
  )
}
