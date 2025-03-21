"use client"

import { useEffect, useRef } from "react"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

const Map = ({ interactive = true, height = "400px" }) => {
  const mapRef = useRef(null)

  useEffect(() => {
    // Initialize map
    if (!mapRef.current) {
      const map = L.map("map").setView([20, 0], 2)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map)

      // Add popular destinations
      const destinations = [
        { name: "Bali, Indonesia", coords: [-8.4095, 115.1889] },
        { name: "Paris, France", coords: [48.8566, 2.3522] },
        { name: "Tokyo, Japan", coords: [35.6762, 139.6503] },
        { name: "New York, USA", coords: [40.7128, -74.006] },
        { name: "Cape Town, South Africa", coords: [-33.9249, 18.4241] },
        { name: "Sydney, Australia", coords: [-33.8688, 151.2093] },
      ]

      destinations.forEach((dest) => {
        L.marker(dest.coords)
          .addTo(map)
          .bindPopup(`<b>${dest.name}</b><br>Popular destination`)
          .on("mouseover", function (e) {
            this.openPopup()
          })
      })

      mapRef.current = map
    }

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  return <div id="map" style={{ height, width: "100%" }}></div>
}

export default Map

