"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import FindPartner from "./pages/FindPartner"
import MyTrips from "./pages/MyTrips"
import Messages from "./pages/Messages"
import Profile from "./pages/Profile"
import "./App.css"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true")

  const handleLogin = () => {
    localStorage.setItem("isAuthenticated", "true")
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")
    setIsAuthenticated(false)
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage isAuthenticated={isAuthenticated} />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup onLogin={handleLogin} />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route
          path="/find-partner"
          element={isAuthenticated ? <FindPartner onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route
          path="/my-trips"
          element={isAuthenticated ? <MyTrips onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route
          path="/messages"
          element={isAuthenticated ? <Messages onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  )
}

export default App


