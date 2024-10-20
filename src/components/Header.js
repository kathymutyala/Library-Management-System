import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Header.css"; // Import the CSS file for the header

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false); // Track login status
  const [age, setAge] = useState(null); // Track user's age
  const navigate = useNavigate(); // For navigation
  const location = useLocation(); // To listen for route changes

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userAge = localStorage.getItem("age");

    setLoggedIn(!!token); // Set login status based on token
    setAge(userAge ? parseInt(userAge, 10) : null); // Parse age as integer
  }, [location]); // Re-run when location changes

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token on logout
    localStorage.removeItem("age"); // Clear age on logout
    setLoggedIn(false); // Update login status
    setAge(null); // Reset age
    navigate("/logout"); // Redirect to logout page
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>Library</h1>
      </div>
      <nav>
        <ul className="nav-links">
          {age && age < 18 ? (
            // If user is under 18
            <>
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : age >= 18 ? (
            // If user is 18 or older
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/adult-books">Adults Books</Link>
              </li>
              <li>
                <Link to="/kids-books">Kids Books</Link>
              </li>
              <li>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            // Default case when not logged in
            <>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
