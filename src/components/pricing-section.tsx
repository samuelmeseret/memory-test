"use client"

import { useRef, useEffect, useState } from "react"
import { PropertyBookingCard } from "./property-booking-card"

const properties = [
  {
    propertyName: "Eleanor Smith",
    location: "Relationship: Grandmother",
    duration: "Age 78",
    availableDate: "Added Mar 2023",
    image: "https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?w=800&q=80",
    pricePerNight: 99,
    propertyType: "Family Member",
    features: ["Loves Gardening", "Bakes Cookies", "Lives in Florida"],
    amenities: ["Mother of 3", "Retired Teacher"],
    rating: 5.0,
  },
  {
    propertyName: "David Johnson",
    location: "Relationship: Uncle",
    duration: "Age 52",
    availableDate: "Added Jan 2024",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80",
    pricePerNight: 98,
    propertyType: "Family Member",
    features: ["Avid Fisher", "Tells Jokes", "BBQ Master"],
    amenities: ["Brother", "Engineer"],
    rating: 4.8,
  },
  {
    propertyName: "Sarah Williams",
    location: "Relationship: Sister",
    duration: "Age 28",
    availableDate: "Added Nov 2023",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
    pricePerNight: 99,
    propertyType: "Family Member",
    features: ["Artist", "Plays Piano", "Loves Cats"],
    amenities: ["Sister", "Aunt"],
    rating: 4.9,
  },
  {
    propertyName: "Michael Brown",
    location: "Relationship: Cousin",
    duration: "Age 34",
    availableDate: "Added Sep 2023",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
    pricePerNight: 95,
    propertyType: "Family Member",
    features: ["Runs Marathons", "Traveler", "Photographer"],
    amenities: ["Cousin", "Godfather"],
    rating: 4.7,
  },
  {
    propertyName: "Olivia Davis",
    location: "Relationship: Niece",
    duration: "Age 12",
    availableDate: "Added May 2024",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
    pricePerNight: 97,
    propertyType: "Family Member",
    features: ["Soccer Player", "Loves Reading", "Honor Roll"],
    amenities: ["Niece", "Student"],
    rating: 4.9,
  },
  {
    propertyName: "James Wilson",
    location: "Relationship: Grandfather",
    duration: "Age 82",
    availableDate: "Added Dec 2022",
    image: "https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?w=800&q=80",
    pricePerNight: 99,
    propertyType: "Family Member",
    features: ["War Veteran", "Woodworking", "Chess Champion"],
    amenities: ["Father of 4", "Retired"],
    rating: 5.0,
  },
]

export function PricingSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const positionRef = useRef(0)
  const animationRef = useRef<number>(0)

  const duplicatedProperties = [...properties, ...properties, ...properties]

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const speed = isHovered ? 0.3 : 1 // Slow down on hover instead of changing animation duration
    let lastTime = performance.now()

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime
      lastTime = currentTime

      positionRef.current += speed * (deltaTime / 16)

      const totalWidth = scrollContainer.scrollWidth / 3

      if (positionRef.current >= totalWidth) {
        positionRef.current = 0
      }

      scrollContainer.style.transform = `translateX(-${positionRef.current}px)`
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isHovered])

  return (
    <section id="pricing" className="py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-normal mb-6 text-balance font-serif">Family Member Profiles</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Easily recognize and remember your loved ones with high confidence.
        </p>
      </div>

      <div className="relative w-full" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div ref={scrollRef} className="flex gap-6" style={{ width: "fit-content" }}>
          {duplicatedProperties.map((property, index) => (
            <div key={index} className="flex-shrink-0 w-[85vw] sm:w-[60vw] lg:w-[400px]">
              <PropertyBookingCard {...property} onBook={() => console.log(`Viewing ${property.propertyName}`)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
