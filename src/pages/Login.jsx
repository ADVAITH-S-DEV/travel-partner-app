"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields")
      return
    }

    // Mock login - in a real app, you would call an API
    // For demo purposes, we'll just simulate a successful login
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: formData.email,
        name: "Demo User",
      }),
    )

    onLogin()
  }

  return (
    <div className="login-page">
      <Header isAuthenticated={false} />

      <div className="auth-container">
        <div className="auth-form-container">
          <h1>Welcome Back</h1>
          <p>Sign in to continue your journey</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Sign In
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

