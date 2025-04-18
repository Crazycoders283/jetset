import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';
import { FaSearch, FaCalendarAlt, FaUsers, FaArrowRight, FaCompass } from 'react-icons/fa';

const HeroSection = () => {
  const [scrolled, setScrolled] = useState(false);

  // Add scroll event listener
  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <div className="hero-wrapper">
      <section 
        className={`hero-section ${scrolled ? 'scrolled' : ''}`}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), 
            url('https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=2064&auto=format&fit=crop')`,
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content container">
          <span className="brand-tag">JETSET CRUISE LINE</span>
          <h1 className="hero-title">Set Sail to Paradise</h1>
          <p className="hero-subtitle">Embark on a journey of luxury and adventure across the world's most breathtaking destinations</p>
          
          <div className="search-container">
            <div className="search-bar">
              <div className="search-field">
                <label>Destination</label>
                <input 
                  type="text" 
                  placeholder="Caribbean, Mediterranean, Alaska..."
                  className="search-input"
                />
              </div>

              <div className="search-field">
                <label>Experience</label>
                <select className="search-input">
                  <option value="">Select Experience</option>
                  <option value="luxury">Luxury Escape</option>
                  <option value="family">Family Adventure</option>
                  <option value="romantic">Romantic Getaway</option>
                  <option value="expedition">Expedition Cruise</option>
                </select>
              </div>

              <div className="search-field">
                <label>Departure</label>
                <div className="date-input">
                  <FaCalendarAlt className="field-icon" />
                  <input 
                    type="text" 
                    placeholder="Choose your dates"
                    className="search-input"
                  />
                </div>
              </div>

              <div className="search-field">
                <label>Guests</label>
                <div className="travelers-input">
                  <FaUsers className="field-icon" />
                  <select className="search-input">
                    <option value="2">2 Guests</option>
                    <option value="1">1 Guest</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5+ Guests</option>
                  </select>
                </div>
              </div>

              <button className="search-button">
                <FaCompass className="search-icon" />
                Find Your Cruise
              </button>
            </div>
          </div>

          <Link to="/cruises" className="explore-button">
            EXPLORE DESTINATIONS <FaArrowRight className="arrow-icon" />
          </Link>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">DREAM VOYAGES</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">20+</div>
              <div className="stat-label">LUXURY VESSELS</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">GUEST SATISFACTION</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;