import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import History from "./pages/History";
import Profile from "./pages/Profile";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> 
        {isLoggedIn ? (
          <>
            | <Link to="/profile">Profile</Link> | <Link to="/history">History</Link> |{" "}
            <Link to="/" onClick={() => setIsLoggedIn(false)}>
              Log Out
            </Link>
          </>
        ) : (
          <>| <Link to="/login">Log In</Link></>
        )}
      </nav>
      <div className="card" style={{ paddingTop: "5rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/login"
            element={<Login onLogin={() => handleLogin(true)} />}
          />
          <Route
            path="/profile" element={<Profile />}
          />
          <Route 
            path="/history" element={<History />}
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
