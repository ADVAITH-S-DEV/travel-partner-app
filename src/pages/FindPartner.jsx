"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"

const FindPartner = ({ onLogout }) => {
  const [travelers, setTravelers] = useState([])
  const [filteredTravelers, setFilteredTravelers] = useState([])
  const [filters, setFilters] = useState({
    destination: "",
    dateRange: "",
    interests: [],
  })

  useEffect(() => {
    // Mock data - in a real app, you would fetch this from your API
    const mockTravelers = [
      {
        id: 1,
        name: "Alex Johnson",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        destination: "Bali, Indonesia",
        dateRange: "Dec 15-28, 2023",
        interests: ["Beach", "Cultural", "Photography"],
        bio: "Adventure seeker and photography enthusiast. Love exploring new cultures and meeting locals.",
      },
      {
        id: 2,
        name: "Sarah Williams",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        destination: "Bali, Indonesia",
        dateRange: "Dec 18-30, 2023",
        interests: ["Beach", "Relaxation", "Food Tourism"],
        bio: "Foodie and beach lover. Looking for a laid-back travel partner to explore Bali's cuisine and beaches.",
      },
      {
        id: 3,
        name: "Michael Chen",
        avatar: "https://randomuser.me/api/portraits/men/67.jpg",
        destination: "Tokyo, Japan",
        dateRange: "Mar 10-22, 2024",
        interests: ["City", "Cultural", "Food Tourism"],
        bio: "First time in Tokyo! Excited to explore the city, try authentic Japanese food, and visit cultural sites.",
      },
      {
        id: 4,
        name: "Emma Rodriguez",
        avatar: "https://randomuser.me/api/portraits/women/23.jpg",
        destination: "Paris, France",
        dateRange: "Feb 5-15, 2024",
        interests: ["City", "Cultural", "Photography"],
        bio: "Art lover and aspiring photographer. Looking forward to capturing the beauty of Paris.",
      },
      {
        id: 5,
        name: "David Kim",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        destination: "Bangkok, Thailand",
        dateRange: "Jan 8-20, 2024",
        interests: ["Cultural", "Food Tourism", "Nightlife"],
        bio: "Experienced traveler looking to explore Bangkok's vibrant culture, food scene, and nightlife.",
      },
    ]

    setTravelers(mockTravelers)
    setFilteredTravelers(mockTravelers)
  }, [])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }))
  }

  const handleInterestFilter = (interest) => {
    setFilters((prevFilters) => {
      if (prevFilters.interests.includes(interest)) {
        return {
          ...prevFilters,
          interests: prevFilters.interests.filter((i) => i !== interest),
        }
      } else {
        return {
          ...prevFilters,
          interests: [...prevFilters.interests, interest],
        }
      }
    })
  }

  const applyFilters = () => {
    let filtered = [...travelers]

    if (filters.destination) {
      filtered = filtered.filter((traveler) =>
        traveler.destination.toLowerCase().includes(filters.destination.toLowerCase()),
      )
    }

    if (filters.dateRange) {
      filtered = filtered.filter((traveler) =>
        traveler.dateRange.toLowerCase().includes(filters.dateRange.toLowerCase()),
      )
    }

    if (filters.interests.length > 0) {
      filtered = filtered.filter((traveler) =>
        filters.interests.some((interest) => traveler.interests.includes(interest)),
      )
    }

    setFilteredTravelers(filtered)
  }

  const resetFilters = () => {
    setFilters({
      destination: "",
      dateRange: "",
      interests: [],
    })
    setFilteredTravelers(travelers)
  }

  const sendBuddyRequest = (travelerId) => {
    // In a real app, you would call your API to send a buddy request
    alert(`Buddy request sent to traveler #${travelerId}`)
  }

  const interestOptions = [
    "Beach",
    "Mountains",
    "City",
    "Cultural",
    "Adventure",
    "Relaxation",
    "Food Tourism",
    "Photography",
    "Nightlife",
  ]

  return (
    <div className="find-partner-page">
      <Header isAuthenticated={true} onLogout={onLogout} />

      <div className="find-partner-container">
        <div className="page-header">
          <h1>Find Travel Partners</h1>
          <p>Connect with travelers who share your destination and interests</p>
        </div>

        <div className="filter-section">
          <div className="filter-controls">
            <div className="filter-group">
              <label htmlFor="destination">Destination</label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={filters.destination}
                onChange={handleFilterChange}
                placeholder="Enter destination"
              />
            </div>

            <div className="filter-group">
              <label htmlFor="dateRange">Travel Dates</label>
              <input
                type="text"
                id="dateRange"
                name="dateRange"
                value={filters.dateRange}
                onChange={handleFilterChange}
                placeholder="e.g., Dec 2023"
              />
            </div>

            <div className="filter-group filter-interests">
              <label>Interests</label>
              <div className="interest-options">
                {interestOptions.map((interest) => (
                  <button
                    key={interest}
                    className={`interest-tag ${filters.interests.includes(interest) ? "active" : ""}`}
                    onClick={() => handleInterestFilter(interest)}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-actions">
              <button className="btn btn-primary" onClick={applyFilters}>
                Apply Filters
              </button>
              <button className="btn btn-secondary" onClick={resetFilters}>
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="travelers-section">
          <h2>Potential Travel Partners ({filteredTravelers.length})</h2>

          {filteredTravelers.length > 0 ? (
            <div className="travelers-grid">
              {filteredTravelers.map((traveler) => (
                <div key={traveler.id} className="traveler-card">
                  <div className="traveler-header">
                    <img src={traveler.avatar || "/placeholder.svg"} alt={traveler.name} className="traveler-avatar" />
                    <div className="traveler-info">
                      <h3>{traveler.name}</h3>
                      <p className="traveler-destination">{traveler.destination}</p>
                      <p className="traveler-dates">{traveler.dateRange}</p>
                    </div>
                  </div>

                  <div className="traveler-bio">
                    <p>{traveler.bio}</p>
                  </div>

                  <div className="traveler-interests">
                    {traveler.interests.map((interest) => (
                      <span key={interest} className="interest-badge">
                        {interest}
                      </span>
                    ))}
                  </div>

                  <div className="traveler-actions">
                    <button className="btn btn-primary" onClick={() => sendBuddyRequest(traveler.id)}>
                      Send Buddy Request
                    </button>
                    <button className="btn btn-secondary">View Profile</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No travelers match your filters. Try adjusting your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FindPartner

