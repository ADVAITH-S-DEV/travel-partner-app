"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"

const Signup = ({ onLogin }) => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
    bio: "",
    pastExperience: "",
    avatar: null,
    avatarPreview: null,
    socialMedia: {
      instagram: "",
      facebook: "",
      twitter: "",
    },
    travelPreferences: [],
  })
  const [error, setError] = useState("")

  const travelPreferenceOptions = [
    "Beach",
    "Mountains",
    "City",
    "Cultural",
    "Adventure",
    "Relaxation",
    "Food Tourism",
    "Backpacking",
    "Luxury",
    "Budget",
    "Solo",
    "Group",
    "Photography",
    "Hiking",
    "Wildlife",
    "Historical",
    "Nightlife",
    "Trekking",
  ]

  const [customPreference, setCustomPreference] = useState("")

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target

    if (type === "file") {
      const file = files[0]
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setFormData((prevData) => ({
            ...prevData,
            avatar: file,
            avatarPreview: reader.result,
          }))
        }
        reader.readAsDataURL(file)
      }
    } else if (name.startsWith("social-")) {
      const socialPlatform = name.replace("social-", "")
      setFormData((prevData) => ({
        ...prevData,
        socialMedia: {
          ...prevData.socialMedia,
          [socialPlatform]: value,
        },
      }))
    } else if (type === "checkbox") {
      if (checked) {
        setFormData((prevData) => ({
          ...prevData,
          travelPreferences: [...prevData.travelPreferences, value],
        }))
      } else {
        setFormData((prevData) => ({
          ...prevData,
          travelPreferences: prevData.travelPreferences.filter((pref) => pref !== value),
        }))
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  }

  const addCustomPreference = () => {
    if (customPreference.trim() && !formData.travelPreferences.includes(customPreference.trim())) {
      setFormData((prevData) => ({
        ...prevData,
        travelPreferences: [...prevData.travelPreferences, customPreference.trim()],
      }))
      setCustomPreference("")
    }
  }

  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all required fields")
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return false
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      return false
    }

    return true
  }

  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setError("")
      setStep(2)
    }
  }

  const prevStep = () => {
    setStep(1)
    setError("")
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // In a real app, you would send this data to your backend
    // For demo purposes, we'll just simulate a successful registration
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: formData.name,
        email: formData.email,
      }),
    )

    onLogin()
  }

  return (
    <div className="signup-page">
      <Header isAuthenticated={false} />

      <div className="auth-container">
        <div className="auth-form-container">
          <h1>Create Your Account</h1>
          <p>Join our community of travelers</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            {step === 1 ? (
              <>
                <div className="form-group">
                  <label htmlFor="name">Full Name*</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email*</label>
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
                  <label htmlFor="password">Password*</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password*</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                  />
                </div>

                <button type="button" className="btn btn-primary btn-block" onClick={nextStep}>
                  Next
                </button>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="avatar">Profile Picture</label>
                  <input type="file" id="avatar" name="avatar" onChange={handleChange} accept="image/*" />
                  {formData.avatarPreview && (
                    <div className="avatar-preview">
                      <img src={formData.avatarPreview || "/placeholder.svg"} alt="Avatar preview" />
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us about yourself"
                    rows="3"
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="pastExperience">Past Travel Experience</label>
                  <textarea
                    id="pastExperience"
                    name="pastExperience"
                    value={formData.pastExperience}
                    onChange={handleChange}
                    placeholder="Share your travel experiences"
                    rows="3"
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Social Media (Optional)</label>
                  <div className="social-inputs">
                    <input
                      type="text"
                      name="social-instagram"
                      value={formData.socialMedia.instagram}
                      onChange={handleChange}
                      placeholder="Instagram username"
                    />
                    <input
                      type="text"
                      name="social-facebook"
                      value={formData.socialMedia.facebook}
                      onChange={handleChange}
                      placeholder="Facebook profile"
                    />
                    <input
                      type="text"
                      name="social-twitter"
                      value={formData.socialMedia.twitter}
                      onChange={handleChange}
                      placeholder="Twitter handle"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Travel Preferences</label>
                  <div className="preferences-grid">
                    {travelPreferenceOptions.map((preference) => (
                      <div key={preference} className="preference-option">
                        <input
                          type="checkbox"
                          id={`pref-${preference}`}
                          name="travelPreferences"
                          value={preference}
                          checked={formData.travelPreferences.includes(preference)}
                          onChange={handleChange}
                        />
                        <label htmlFor={`pref-${preference}`}>{preference}</label>
                      </div>
                    ))}
                  </div>

                  <div className="custom-preference">
                    <input
                      type="text"
                      value={customPreference}
                      onChange={(e) => setCustomPreference(e.target.value)}
                      placeholder="Add custom preference"
                    />
                    <button type="button" onClick={addCustomPreference}>
                      Add
                    </button>
                  </div>

                  {formData.travelPreferences.length > 0 && (
                    <div className="selected-preferences">
                      <p>Selected preferences:</p>
                      <div className="preference-tags">
                        {formData.travelPreferences.map((pref) => (
                          <span key={pref} className="preference-tag">
                            {pref}
                            <button
                              type="button"
                              onClick={() => {
                                setFormData((prevData) => ({
                                  ...prevData,
                                  travelPreferences: prevData.travelPreferences.filter((p) => p !== pref),
                                }))
                              }}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="form-buttons">
                  <button type="button" className="btn btn-secondary" onClick={prevStep}>
                    Back
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Create Account
                  </button>
                </div>
              </>
            )}
          </form>

          <div className="auth-footer">
            <p>
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup

