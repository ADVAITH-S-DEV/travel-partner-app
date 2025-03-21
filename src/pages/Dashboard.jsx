"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import Map from "../components/Map"

const Dashboard = ({ onLogout }) => {
  const [user, setUser] = useState(null)
  const [upcomingTrips, setUpcomingTrips] = useState([])
  const [pendingRequests, setPendingRequests] = useState([])

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Mock data - in a real app, you would fetch this from your API
    setUpcomingTrips([
      {
        id: 1,
        destination: "Bali, Indonesia",
        startDate: "2023-12-15",
        endDate: "2023-12-28",
        partners: [{ id: 101, name: "Alex Johnson", avatar: "https://randomuser.me/api/portraits/men/32.jpg" }],
      },
      {
        id: 2,
        destination: "Tokyo, Japan",
        startDate: "2024-03-10",
        endDate: "2024-03-20",
        partners: [],
      },
    ])

    setPendingRequests([
      {
        id: 201,
        user: {
          id: 102,
          name: "Sarah Williams",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        trip: "Bali, Indonesia (Dec 15-28)",
        message: "Hi! I noticed we're both going to Bali around the same time. Would love to connect!",
      },
    ])
  }, [])

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const handleAcceptRequest = (requestId) => {
    // In a real app, you would call your API to accept the request
    setPendingRequests((prevRequests) => prevRequests.filter((request) => request.id !== requestId))

    // Update the trip with the new partner
    setUpcomingTrips((prevTrips) =>
      prevTrips.map((trip) => {
        if (trip.destination.includes("Bali")) {
          return {
            ...trip,
            partners: [
              ...trip.partners,
              {
                id: 102,
                name: "Sarah Williams",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg",
              },
            ],
          }
        }
        return trip
      }),
    )
  }

  const handleDeclineRequest = (requestId) => {
    // In a real app, you would call your API to decline the request
    setPendingRequests((prevRequests) => prevRequests.filter((request) => request.id !== requestId))
  }

  return (
    <div className="dashboard-page">
      <Header isAuthenticated={true} onLogout={onLogout} />

      <div className="dashboard-container">
        <div className="dashboard-welcome">
          <h1>Welcome back, {user?.name || "Traveler"}!</h1>
          <p>Here's what's happening with your travel plans</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-section upcoming-trips">
            <h2>Your Upcoming Trips</h2>
            {upcomingTrips.length > 0 ? (
              <div className="trips-list">
                {upcomingTrips.map((trip) => (
                  <div key={trip.id} className="trip-card">
                    <div className="trip-header">
                      <h3>{trip.destination}</h3>
                      <span className="trip-dates">
                        {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                      </span>
                    </div>
                    <div className="trip-partners">
                      <h4>Travel Partners</h4>
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
                        <p>No travel partners yet. Find some in the "Find Partner" section!</p>
                      )}
                    </div>
                    <div className="trip-actions">
                      <button className="btn btn-secondary">View Details</button>
                      <button className="btn btn-primary">Find Partners</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">You don't have any upcoming trips. Plan one now!</p>
            )}
            <button className="btn btn-primary">Plan a New Trip</button>
          </div>

          <div className="dashboard-section pending-requests">
            <h2>Pending Buddy Requests</h2>
            {pendingRequests.length > 0 ? (
              <div className="requests-list">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="request-card">
                    <div className="request-user">
                      <img
                        src={request.user.avatar || "/placeholder.svg"}
                        alt={request.user.name}
                        className="request-avatar"
                      />
                      <div className="request-user-info">
                        <h3>{request.user.name}</h3>
                        <p>For: {request.trip}</p>
                      </div>
                    </div>
                    <p className="request-message">{request.message}</p>
                    <div className="request-actions">
                      <button className="btn btn-primary" onClick={() => handleAcceptRequest(request.id)}>
                        Accept
                      </button>
                      <button className="btn btn-secondary" onClick={() => handleDeclineRequest(request.id)}>
                        Decline
                      </button>
                      <button className="btn btn-outline">View Profile</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">No pending buddy requests.</p>
            )}
          </div>

          <div className="dashboard-section explore-map">
            <h2>Explore Destinations</h2>
            <Map height="300px" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

