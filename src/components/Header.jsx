"use client"

import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { FaUser, FaSignOutAlt } from "react-icons/fa"

const Header = ({ isAuthenticated, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  const handleLogout = () => {
    onLogout()
    navigate("/")
  }

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">TravelBuddy</Link>
      </div>

      <nav className="nav">
        {isAuthenticated ? (
          <>
            <ul className="nav-links">
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <Link to="/find-partner">Find Partner</Link>
              </li>
              <li>
                <Link to="/my-trips">My Trips</Link>
              </li>
              <li>
                <Link to="/messages">Messages</Link>
              </li>
            </ul>

            <div className="profile-menu">
              <button className="profile-btn" onClick={toggleDropdown}>
                <FaUser />
              </button>

              {showDropdown && (
                <div className="dropdown-menu">
                  <Link to="/profile">My Profile</Link>
                  <button onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="btn btn-login">
              Login
            </Link>
            <Link to="/signup" className="btn btn-signup">
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header

