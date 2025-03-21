"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import { FaEdit, FaSave, FaCamera } from "react-icons/fa"

const Profile = ({ onLogout }) => {
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(null)

  useEffect(() => {
    // In a real app, you would fetch user data from your API
    // For demo purposes, we'll use mock data
    const mockUser = {
      name: "Demo User",
      email: "demo@example.com",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      address: "123 Main St, Anytown, USA",
      phone: "(555) 123-4567",
      bio: "Passionate traveler and adventure seeker. Love exploring new cultures and meeting people from around the world.",
      pastExperience: "Backpacked through Europe, hiked in the Himalayas, and explored the beaches of Thailand.",
      socialMedia: {
        instagram: "traveler_demo",
        facebook: "demo.traveler",
        twitter: "@demo_traveler",
      },
      travelPreferences: ["Beach", "Mountains", "Cultural", "Adventure", "Photography"],
    }

    setUser(mockUser)
    setEditedUser(mockUser)
  }, [])

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setUser(editedUser)
    }
    setIsEditing(!isEditing)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }))
  }

  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target
    const platform = name.replace("social-", "")
    setEditedUser((prevUser) => ({
      ...prevUser,
      socialMedia: {
        ...prevUser.socialMedia,
        [platform]: value,
      },
    }))
  }

  const handlePreferenceToggle = (preference) => {
    setEditedUser((prevUser) => {
      if (prevUser.travelPreferences.includes(preference)) {
        return {
          ...prevUser,
          travelPreferences: prevUser.travelPreferences.filter((pref) => pref !== preference),
        }
      } else {
        return {
          ...prevUser,
          travelPreferences: [...prevUser.travelPreferences, preference],
        }
      }
    })
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setEditedUser((prevUser) => ({
          ...prevUser,
          avatar: reader.result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="profile-page">
      <Header isAuthenticated={true} onLogout={onLogout} />

      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <button className="btn btn-primary" onClick={handleEditToggle}>
            {isEditing ? (
              <>
                <FaSave /> Save Changes
              </>
            ) : (
              <>
                <FaEdit /> Edit Profile
              </>
            )}
          </button>
        </div>

        <div className="profile-content">
          <div className="profile-sidebar">
            <div className="profile-avatar-container">
              <img src={isEditing ? editedUser.avatar : user.avatar} alt="Profile" className="profile-avatar" />
              {isEditing && (
                <label htmlFor="avatar-upload" className="avatar-upload-label">
                  <FaCamera />
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    style={{ display: "none" }}
                  />
                </label>
              )}
            </div>

            <div className="profile-info">
              <h2>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editedUser.name}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                ) : (
                  user.name
                )}
              </h2>

              <div className="info-item">
                <strong>Email:</strong>
                <span>{user.email}</span>
              </div>

              <div className="info-item">
                <strong>Phone:</strong>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={editedUser.phone}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                ) : (
                  <span>{user.phone}</span>
                )}
              </div>

              <div className="info-item">
                <strong>Address:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={editedUser.address}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                ) : (
                  <span>{user.address}</span>
                )}
              </div>

              <div className="info-item">
                <strong>Social Media:</strong>
                <div className="social-links">
                  {isEditing ? (
                    <>
                      <div className="social-edit">
                        <label>Instagram:</label>
                        <input
                          type="text"
                          name="social-instagram"
                          value={editedUser.socialMedia.instagram}
                          onChange={handleSocialMediaChange}
                          className="edit-input"
                        />
                      </div>
                      <div className="social-edit">
                        <label>Facebook:</label>
                        <input
                          type="text"
                          name="social-facebook"
                          value={editedUser.socialMedia.facebook}
                          onChange={handleSocialMediaChange}
                          className="edit-input"
                        />
                      </div>
                      <div className="social-edit">
                        <label>Twitter:</label>
                        <input
                          type="text"
                          name="social-twitter"
                          value={editedUser.socialMedia.twitter}
                          onChange={handleSocialMediaChange}
                          className="edit-input"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {user.socialMedia.instagram && (
                        <a
                          href={`https://instagram.com/${user.socialMedia.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Instagram
                        </a>
                      )}
                      {user.socialMedia.facebook && (
                        <a
                          href={`https://facebook.com/${user.socialMedia.facebook}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Facebook
                        </a>
                      )}
                      {user.socialMedia.twitter && (
                        <a
                          href={`https://twitter.com/${user.socialMedia.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Twitter
                        </a>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="profile-details">
            <div className="profile-section">
              <h3>About Me</h3>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={editedUser.bio}
                  onChange={handleInputChange}
                  className="edit-textarea"
                  rows="4"
                ></textarea>
              ) : (
                <p>{user.bio}</p>
              )}
            </div>

            <div className="profile-section">
              <h3>Past Travel Experience</h3>
              {isEditing ? (
                <textarea
                  name="pastExperience"
                  value={editedUser.pastExperience}
                  onChange={handleInputChange}
                  className="edit-textarea"
                  rows="4"
                ></textarea>
              ) : (
                <p>{user.pastExperience}</p>
              )}
            </div>

            <div className="profile-section">
              <h3>Travel Preferences</h3>
              <div className="preferences-container">
                {isEditing ? (
                  <div className="preferences-edit">
                    {[
                      "Beach",
                      "Mountains",
                      "City",
                      "Cultural",
                      "Adventure",
                      "Relaxation",
                      "Food Tourism",
                      "Photography",
                      "Nightlife",
                      "Trekking",
                      "Wildlife",
                      "Historical",
                    ].map((preference) => (
                      <button
                        key={preference}
                        className={`preference-tag ${editedUser.travelPreferences.includes(preference) ? "active" : ""}`}
                        onClick={() => handlePreferenceToggle(preference)}
                        type="button"
                      >
                        {preference}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="preferences-display">
                    {user.travelPreferences.map((preference) => (
                      <span key={preference} className="preference-tag">
                        {preference}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

