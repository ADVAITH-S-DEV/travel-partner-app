import { Link } from "react-router-dom"
import Header from "../components/Header"
import Map from "../components/Map"
import PopularDestinations from "../components/PopularDestinations"

const LandingPage = ({ isAuthenticated }) => {
  return (
    <div className="landing-page">
      <Header isAuthenticated={isAuthenticated} />

      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Perfect Travel Partner</h1>
          <p>Connect with like-minded travelers, plan amazing trips, and create unforgettable memories together.</p>
          {!isAuthenticated && (
            <div className="cta-buttons">
              <Link to="/signup" className="btn btn-primary">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-secondary">
                I Already Have an Account
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="map-section">
        <h2>Explore the World</h2>
        <p>Discover popular destinations and find travel partners around the globe</p>
        <Map />
      </section>

      <PopularDestinations />

      <section className="features">
        <h2>Why Choose TravelBuddy?</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>Find Compatible Partners</h3>
            <p>Match with travelers who share your interests, destinations, and travel dates.</p>
          </div>
          <div className="feature">
            <h3>Plan Together</h3>
            <p>Collaborate on trip planning, activities, and budgeting with your travel buddies.</p>
          </div>
          <div className="feature">
            <h3>Stay Safe</h3>
            <p>Our verification system and privacy features ensure a safe experience.</p>
          </div>
          <div className="feature">
            <h3>Build Connections</h3>
            <p>Make lasting friendships with fellow travelers from around the world.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">TravelBuddy</div>
          <div className="footer-links">
            <a href="#">About Us</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact</a>
          </div>
          <div className="footer-social">
            <a href="#" className="social-icon">
              Facebook
            </a>
            <a href="#" className="social-icon">
              Instagram
            </a>
            <a href="#" className="social-icon">
              Twitter
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} TravelBuddy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

