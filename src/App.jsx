import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";

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
            | <Link to="/profile">Profile</Link> |{" "}
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
            path="/profile"
            element={isLoggedIn ? <h1>Profile Page</h1> : <h1>Access Denied</h1>}
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
