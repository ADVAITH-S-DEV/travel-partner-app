"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"

const MyTrips = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [trips, setTrips] = useState({
    upcoming: [],
    past: [],
    saved: [],
  })

  useEffect(() => {
    // Mock data - in a real app, you would fetch this from your API
    setTrips({
      upcoming: [
        {
          id: 1,
          destination: "Bali, Indonesia",
          image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
          startDate: "2023-12-15",
          endDate: "2023-12-28",
          partners: [{ id: 101, name: "Alex Johnson", avatar: "https://randomuser.me/api/portraits/men/32.jpg" }],
          activities: ["Beach hopping", "Temple visits", "Surfing lessons"],
        },
        {
          id: 2,
          destination: "Tokyo, Japan",
          image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
          startDate: "2024-03-10",
          endDate: "2024-03-20",
          partners: [],
          activities: ["Cherry blossom viewing", "Food tour", "Mt. Fuji day trip"],
        },
      ],
      past: [
        {
          id: 3,
          destination: "Barcelona, Spain",
          image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4",
          startDate: "2023-06-05",
          endDate: "2023-06-15",
          partners: [{ id: 102, name: "Emma Rodriguez", avatar: "https://randomuser.me/api/portraits/women/23.jpg" }],
          activities: ["Sagrada Familia", "Park Güell", "Beach day", "Tapas tour"],
        },
      ],
      saved: [
        {
          id: 4,
          destination: "Santorini, Greece",
          image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
          startDate: "2024-06-10",
          endDate: "2024-06-20",
          partners: [],
          activities: ["Sunset in Oia", "Wine tasting", "Boat tour"],
        },
      ],
    })
  }, [])

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="my-trips-page">
      <Header isAuthenticated={true} onLogout={onLogout} />

      <div className="my-trips-container">
        <div className="page-header">
          <h1>My Trips</h1>
          <button className="btn btn-primary">Create New Trip</button>
        </div>

        <div className="trips-tabs">
          <button
            className={`tab-button ${activeTab === "upcoming" ? "active" : ""}`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </button>
          <button className={`tab-button ${activeTab === "past" ? "active" : ""}`} onClick={() => setActiveTab("past")}>
            Past
          </button>
          <button
            className={`tab-button ${activeTab === "saved" ? "active" : ""}`}
            onClick={() => setActiveTab("saved")}
          >
            Saved
          </button>
        </div>

        <div className="trips-content">
          {trips[activeTab].length > 0 ? (
            <div className="trips-grid">
              {trips[activeTab].map((trip) => (
                <div key={trip.id} className="trip-card">
                  <div className="trip-image">
                    <img src={trip.image || "/placeholder.svg"} alt={trip.destination} />
                  </div>
                  <div className="trip-content">
                    <h2>{trip.destination}</h2>
                    <p className="trip-dates">
                      {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                    </p>

                    <div className="trip-details">
                      <div className="trip-partners">
                        <h3>Travel Partners</h3>
                        {trip.partners.length > 0 ? (
                          <div className="partners-list">
                            {trip.partners.map((partner) => (
                              <div key={partner.id} className="partner-item">
                                <img
                                  src={partner.avatar || "/placeholder.svg"}
                                  alt={partner.name}
                                  className="partner-avatar"
                                />
                                <span>{partner.name}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p>No travel partners yet</p>
                        )}
                      </div>

                      <div className="trip-activities">
                        <h3>Planned Activities</h3>
                        <ul>
                          {trip.activities.map((activity, index) => (
                            <li key={index}>{activity}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="trip-actions">
                      {activeTab === "upcoming" && (
                        <>
                          <button className="btn btn-primary">Edit Trip</button>
                          <button className="btn btn-secondary">Find Partners</button>
                        </>
                      )}
                      {activeTab === "past" && (
                        <>
                          <button className="btn btn-primary">View Details</button>
                          <button className="btn btn-secondary">Add Review</button>
                        </>
                      )}
                      {activeTab === "saved" && (
                        <>
                          <button className="btn btn-primary">Book Now</button>
                          <button className="btn btn-secondary">Edit Plan</button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-trips">
              <p>You don't have any {activeTab} trips.</p>
              {activeTab === "upcoming" && <button className="btn btn-primary">Plan a Trip</button>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyTrips

