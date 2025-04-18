import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Home, 
  Plane, 
  Package, 
  Car, 
  Briefcase 
} from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
    
    // Add scroll event listener
    const handleScroll = () => {
      // When scrolled below hero section (using 100px as threshold)
      const scrolled = window.scrollY > 100;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Call once to set initial state
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = isMobileMenuOpen ? 'auto' : 'hidden';
  };

  const handleLogin = () => {
    window.location.href = '/login';
  };

  const handleProfile = () => {
    window.location.href = '/profiledashboard';
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    setIsMobileMenuOpen(false);
    window.location.href = '/login';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : 'transparent'}`}>
      <div className="navbar-left-20">
        <div className="logo">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M2 12h20"></path>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          <span>JETSETTERS</span>
        </div>
      </div>

      {/* Desktop navigation */}
      <div className="navbar-center">
        <Link to="/" className="nav-link">
          Cruise
        </Link>
        <Link to="/flights" className="nav-link">
          Flight
        </Link>
        <Link to="/packages" className="nav-link">
          Packages
        </Link>
        <Link to="/rental" className="nav-link">
          Rental
        </Link>
        <Link to="/my-trips" className="nav-link">
          My Trips
        </Link>
      </div>

      <div className="navbar-right">
        {isAuthenticated ? (
          <div className="profile-container">
            <button 
              className="profile-button" 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="profile-icon">
                <User size={24} />
              </div>
            </button>
            {isDropdownOpen && (
              <div className="profile-dropdown">
                <button onClick={handleProfile}>
                  <User size={18} />
                  Profile
                </button>
                <button onClick={handleLogout}>
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="login-button" onClick={handleLogin}>
            Login/Signup
          </button>
        )}

        {/* Mobile menu button */}
        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-links">
          <Link to="/" className="mobile-nav-link" onClick={closeMobileMenu}>
            <Home size={20} />
            Cruise
          </Link>
          <Link to="/flights" className="mobile-nav-link" onClick={closeMobileMenu}>
            <Plane size={20} />
            Flight
          </Link>
          <Link to="/packages" className="mobile-nav-link" onClick={closeMobileMenu}>
            <Package size={20} />
            Packages
          </Link>
          <Link to="/rental" className="mobile-nav-link" onClick={closeMobileMenu}>
            <Car size={20} />
            Rental
          </Link>
          <Link to="/my-trips" className="mobile-nav-link" onClick={closeMobileMenu}>
            <Briefcase size={20} />
            My Trips
          </Link>
          
          {!isAuthenticated && (
            <button className="mobile-login-button" onClick={handleLogin}>
              Login/Signup
            </button>
          )}
          
          {isAuthenticated && (
            <>
              <button onClick={handleProfile} className="mobile-profile-button">
                <User size={20} className="mr-2" />
                Profile
              </button>
              <button onClick={handleLogout} className="mobile-logout-button">
                <LogOut size={20} className="mr-2" />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

