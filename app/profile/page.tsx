"use client"
import Image from "next/image"
import Link from "next/link"
import { Settings, LogOut, ChevronRight, Star, Edit, ArrowLeft, Utensils, Heart, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut } from "@/lib/Api/Auth"

// Dati di esempio per il profilo
const profileData = {
  name: "Marco Rossi",
  username: "@marco_foodie",
  bio: "Food enthusiast and amateur chef. Always looking for new flavors to try!",
  avatar: "https://via.placeholder.com/150/333/fff?text=MR",
  stats: {
    swipes: 248,
    likes: 86,
    saved: 12,
  },
  preferences: ["Italian", "Japanese", "Indian", "Thai"],
  dietaryRestrictions: ["Vegetarian options", "No peanuts"],
  recentLikes: [
    {
      id: 1,
      name: "Truffle Pasta",
      cuisine: "Italian",
      rating: 4.8,
      image: "https://via.placeholder.com/100/333/fff?text=Pasta",
    },
    {
      id: 2,
      name: "Sushi Platter",
      cuisine: "Japanese",
      rating: 4.9,
      image: "https://via.placeholder.com/100/333/fff?text=Sushi",
    },
    {
      id: 3,
      name: "Butter Chicken",
      cuisine: "Indian",
      rating: 4.6,
      image: "https://via.placeholder.com/100/333/fff?text=Chicken",
    },
  ],
  savedRecipes: [
    {
      id: 101,
      name: "Fusion Truffle Burger",
      cuisine: "Fusion",
      rating: 5.0,
      image: "https://via.placeholder.com/100/333/fff?text=Burger",
    },
    {
      id: 102,
      name: "Spicy Seafood Ramen",
      cuisine: "Fusion",
      rating: 4.9,
      image: "https://via.placeholder.com/100/333/fff?text=Ramen",
    },
  ],
}

export default function ProfilePage() {

  return (
    <div className="relative w-full h-full max-w-full sm:max-w-4xl mx-auto bg-background text-foreground overflow-auto">
      {/* Header with back button */}
      <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-background/80 backdrop-blur-sm border-b">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">Profile</h1>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      <div className="container mx-auto p-4 sm:p-6 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile info - Left column on desktop */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <Avatar className="h-24 w-24 border-2 border-primary/20">
                      <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt={profileData.name} />
                      <AvatarFallback>MR</AvatarFallback>
                    </Avatar>
                    <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 h-7 w-7 rounded-full">
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <CardTitle className="text-xl">{profileData.name}</CardTitle>
                  <CardDescription>{profileData.username}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center mb-4">{profileData.bio}</p>

                <Button className="w-full" variant="outline">
                  Edit Profile
                </Button>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 my-4 py-3 border-y">
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-lg font-bold">{profileData.stats.swipes}</span>
                    <span className="text-xs text-muted-foreground">Swipes</span>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-lg font-bold">{profileData.stats.likes}</span>
                    <span className="text-xs text-muted-foreground">Likes</span>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-lg font-bold">{profileData.stats.saved}</span>
                    <span className="text-xs text-muted-foreground">Saved</span>
                  </div>
                </div>

                {/* Preferences */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold flex items-center gap-2 mb-2">
                    <Utensils className="h-4 w-4" />
                    Cuisine Preferences
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profileData.preferences.map((pref, index) => (
                      <Badge key={index} variant="secondary">
                        {pref}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Dietary Restrictions */}
                <div>
                  <h3 className="text-sm font-semibold mb-2">Dietary Restrictions</h3>
                  <div className="flex flex-wrap gap-2">
                    {profileData.dietaryRestrictions.map((restriction, index) => (
                      <Badge key={index} variant="outline">
                        {restriction}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Logout button - Only visible on desktop */}
                <div className="hidden md:block mt-6">
                  <Button onClick={signOut} variant="destructive" className="w-full flex items-center justify-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content - Right column on desktop */}
          <div className="md:col-span-2">
            <Tabs defaultValue="likes" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="likes" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Recent Likes
                </TabsTrigger>
                <TabsTrigger value="saved" className="flex items-center gap-2">
                  <Bookmark className="h-4 w-4" />
                  Saved Recipes
                </TabsTrigger>
              </TabsList>

              <TabsContent value="likes">
                <div className="space-y-3">
                  {profileData.recentLikes.map((item) => (
                    <FoodItem key={item.id} item={item} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="saved">
                <div className="space-y-3">
                  {profileData.savedRecipes.map((item) => (
                    <FoodItem key={item.id} item={item} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Logout button - Only visible on mobile */}
        <div className="md:hidden mt-6">
          <Button variant="destructive" className="w-full flex items-center justify-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}

// Componente per mostrare un elemento cibo (like o salvato)
interface FoodItemProps {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  image: string;
}

function FoodItem({ item }: { item: FoodItemProps }) {
  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
            <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" sizes="64px" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm">{item.name}</h4>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge variant="secondary" className="text-xs">
                {item.cuisine}
              </Badge>
              <div className="flex items-center">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span className="text-xs ml-0.5 text-muted-foreground">{item.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
