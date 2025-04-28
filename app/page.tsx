"use client"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, ArrowRight, Menu, Heart, X, Utensils, ChefHat, Brain, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useState } from "react";

export default function LandingPage() {
  const [currentImage, setCurrentImage] = useState(0)
  const images = [
    "/Lasagna.jpg",
    "/Pasta.jpg"
  ]

  const changeImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  return (
    <div className="flex min-h-screen flex-col  w-full">

      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className=" flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 pl-5">
            <span className="text-xl font-bold text-orange-500">Fooder</span>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Log in
            </Link>
            <Button className="bg-orange-500 hover:bg-orange-600 cursor-pointer">Download App</Button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className=" px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block rounded-lg bg-orange-100 text-orange-500 px-3 py-1 text-sm">
                  Food Discovery Reimagined
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Discover Your Next Craving
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Swipe. Taste. Repeat. Your personal food genie is here.
                  Swipe through dishes, and our smart AI learns your taste to suggest meals you'll actually love.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="gap-1.5 bg-orange-500 hover:bg-orange-600">
                  Join the Waitlist
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-orange-500" />
                  <span>No more food disappointments</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-[300px] h-[550px] md:w-[350px] md:h-[600px] shadow-lg rounded-3xl flex flex-col gap-4 items-center justify-center">
                  <Image
                    src={images[currentImage]}
                    alt="Fooder app screenshot showing food swiping interface"
                    width={320}
                    height={600}
                    className="rounded-3xl object-cover shadow-xl"
                    priority
                  />
                  <div className="flex gap-4 w-full justify-center">
                    <div onClick={changeImage} className="bg-white rounded-full p-4 shadow-lg cursor-pointer">
                      <X className="h-8 w-8 text-gray-400" />
                    </div>
                    <div onClick={changeImage} className="bg-white rounded-full p-4 shadow-lg cursor-pointer">
                      <Heart className="h-8 w-8 text-rose-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-orange-100 text-orange-500 px-3 py-1 text-sm">How It Works</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Find Your Food Match in 3 Simple Steps
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our app makes discovering new foods you'll love as easy as swiping right.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              {[
                {
                  icon: <Utensils className="h-10 w-10 text-orange-500" />,
                  title: "Swipe on Foods",
                  description:
                    "Browse through delicious dishes and swipe right on what looks good, left on what doesn't.",
                },
                {
                  icon: <Brain className="h-10 w-10 text-orange-500" />,
                  title: "AI Learns Your Taste",
                  description: "Our machine learning algorithm understands your unique food preferences over time.",
                },
                {
                  icon: <ChefHat className="h-10 w-10 text-orange-500" />,
                  title: "Get Personalized Recommendations",
                  description: "Discover new restaurants and dishes perfectly matched to your taste profile.",
                },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-2 rounded-lg border p-6 shadow-sm text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-50">{step.icon}</div>
                  <h3 className="text-lg font-bold mt-4">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-orange-50">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-white text-orange-500 px-3 py-1 text-sm">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Discover Food You'll Actually Love
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our app is packed with features to help you find your perfect food match and never waste a meal again.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Smart Food Matching",
                  description: "Our AI learns your preferences and matches you with foods you're likely to enjoy.",
                  icon: <Brain className="h-6 w-6 text-orange-500" />,
                },
                {
                  title: "Dietary Preferences",
                  description: "Set your dietary restrictions and never see foods you can't or don't want to eat.",
                  icon: <CheckCircle className="h-6 w-6 text-orange-500" />,
                },
                {
                  title: "Restaurant Discovery",
                  description: "Find restaurants near you that serve dishes matched to your taste profile.",
                  icon: <MapPin className="h-6 w-6 text-orange-500" />,
                },
                {
                  title: "Taste Profile",
                  description: "View your evolving taste profile and see what flavors and cuisines you prefer.",
                  icon: <Heart className="h-6 w-6 text-orange-500" />,
                },
                {
                  title: "Social Sharing",
                  description: "Share your favorite dishes with friends and see what they're enjoying.",
                  icon: <Utensils className="h-6 w-6 text-orange-500" />,
                },
                {
                  title: "Offline Mode",
                  description: "Browse and swipe even when you're not connected to the internet.",
                  icon: <CheckCircle className="h-6 w-6 text-orange-500" />,
                },
              ].map((feature, i) => (
                <div key={i} className="flex flex-col items-start gap-2 rounded-lg border bg-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-orange-50">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-white text-orange-500 px-3 py-1 text-sm">Testimonials</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Food lovers are raving</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See how Fooder has transformed the way people discover food.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote:
                    "I used to waste so much money ordering food I ended up not liking. Fooder has completely changed that - I love every recommendation!",
                  author: "Sara C.",
                  role: "Foodie Explorer",
                },
                {
                  quote:
                    "As someone whose better then everyone else, obviusly, i have specific needs that the others has to offer me and this app fits perfectly for my needs.",
                  author: "Thomas F.",
                  role: "Super Vegan Food Lover",
                },
                {
                  quote:
                    "The machine learning is scary accurate. After just a week of swiping, it knew my taste better than my own family!",
                  author: "Denise S.",
                  role: "Culinary Adventurer",
                },
                {
                  quote:
                    "I've discovered so many hidden gem restaurants in my neighborhood that I never would have tried without Fooder's recommendations.",
                  author: "Catalin M.",
                  role: "Local Food Enthusiast",
                },
                {
                  quote:
                    "Dating someone with different food preferences was tough until we both got Fooder. Now we easily find restaurants we both enjoy!",
                  author: "Mr B.",
                  role: "Couple's Food Explorer",
                },
                {
                  quote:
                    "As a traveler, finding good food in new cities was always hit or miss. This app has made every trip a delicious adventure.",
                  author: "Kendrik L.",
                  role: "Traveling Food Critic",
                },
              ].map((testimonial, i) => (
                <div key={i} className="flex flex-col gap-2 rounded-lg border bg-white p-6 shadow-sm">
                  <p className="text-sm italic text-muted-foreground">"{testimonial.quote}"</p>
                  <div className="mt-auto pt-4">
                    <div className="font-medium">{testimonial.author}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-orange-100 text-orange-500 px-3 py-1 text-sm">FAQ</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Frequently asked questions</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to know about Fooder.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl space-y-4 py-12">
              {[
                {
                  question: "How does the food matching algorithm work?",
                  answer:
                    "Our machine learning algorithm analyzes your swipes to understand your preferences for flavors, ingredients, cuisines, and presentation. The more you swipe, the more accurate your recommendations become.",
                },
                {
                  question: "Can I set dietary restrictions?",
                  answer:
                    "Yes! You can set preferences for vegetarian, vegan, gluten-free, kosher, halal, and many other dietary restrictions. You'll only see foods that match your dietary needs.",
                },
                {
                  question: "How do I find restaurants that serve my matched foods?",
                  answer:
                    "Once you've swiped and matched with foods, the app will show you nearby restaurants that serve those or similar dishes. You can filter by distance, price range, and more.",
                },
                {
                  question: "Is my data shared with restaurants or third parties?",
                  answer:
                    "We never sell your personal data. We may share anonymized, aggregated taste preferences with partner restaurants to help them improve their menus, but this is never linked to your identity.",
                },
                {
                  question: "Can I use Fooder when traveling?",
                  answer:
                    "Absolutely! Fooder works worldwide and is perfect for travelers. Your taste profile travels with you, helping you find foods you'll love no matter where you are.",
                },
                {
                  question: "How do I cancel my subscription?",
                  answer:
                    "You can cancel your subscription anytime through the app settings or your app store account. Your subscription will continue until the end of your current billing period.",
                },
              ].map((faq, i) => (
                <div key={i} className="rounded-lg border bg-background p-6 shadow-sm">
                  <h3 className="text-lg font-medium">{faq.question}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        <section className="w-full py-12 md:py-24 lg:py-32 bg-orange-500 text-white">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to find your food soulmate?
                </h2>
                <p className="max-w-[600px] text-orange-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of food lovers who are discovering their perfect flavor matches every day.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="gap-1.5 bg-white text-orange-500 hover:bg-orange-100">
                  Join the waitlist
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-orange-100">
                <CheckCircle className="h-4 w-4" />
                <span>Available on iOS and Android</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      </div>

  )
}
