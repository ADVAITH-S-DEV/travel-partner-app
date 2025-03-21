"use client"

import { useState } from "react"

const PopularDestinations = () => {
  const [destinations] = useState([
    {
      id: 1,
      name: "Bali, Indonesia",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
      description: "Tropical paradise with beautiful beaches and rich culture.",
    },
    {
      id: 2,
      name: "Paris, France",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      description: "City of love, art, and incredible architecture.",
    },
    {
      id: 3,
      name: "Tokyo, Japan",
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
      description: "Blend of traditional culture and cutting-edge technology.",
    },
    {
      id: 4,
      name: "Santorini, Greece",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
      description: "Stunning white buildings and breathtaking ocean views.",
    },
  ])

  return (
    <section className="popular-destinations">
      <h2>Popular Destinations</h2>
      <div className="destinations-grid">
        {destinations.map((destination) => (
          <div key={destination.id} className="destination-card">
            <div className="destination-image">
              <img src={destination.image || "/placeholder.svg"} alt={destination.name} />
            </div>
            <div className="destination-info">
              <h3>{destination.name}</h3>
              <p>{destination.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PopularDestinations

