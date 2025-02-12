import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import History from "./pages/History";
import Profile from "./pages/Profile";
import SignUp from "./pages/Signup";
import Quest from "./pages/Quest";
import CreateQuest from "./pages/CreateQuest";
import SharedQuest from "./pages/QuestShared";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ name: "", surname: "" });

  const handleLogin = (status, name = "", surname = "") => {
    setIsLoggedIn(status);
    setUserData({ name, surname });
  };

  return (
    <>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
        {isLoggedIn ? (
          <>
            | <Link to="/profile">Profile</Link> | <Link to="/history">History</Link> |{" "}
            <Link to="/" onClick={() => handleLogin(false)}>
              Log Out
            </Link>
          </>
        ) : (
          <>| <Link to="/login">Log In</Link> | <Link to="/signup">Sign Up</Link></>
        )}
      </nav>
      <div className="card" style={{ paddingTop: "5rem" }}>
        <Routes>
          {/* Passing isLoggedIn state correctly to Home */}
          <Route path="/" element={<Home userData={userData} isLoggedIn={isLoggedIn} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp onLogin={handleLogin} />} />
          <Route path="/profile" element={<Profile userData={userData} />} />
          <Route path="/history" element={<History />} />
          <Route path="/create-quest" element={<CreateQuest />} />
          <Route path="/shared-quest/:id" element={<SharedQuest />} />
          <Route path="/quest/:id" element={<Quest />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
