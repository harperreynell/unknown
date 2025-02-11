import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../utils/Alert";

const Home = ({ userData, isLoggedIn }) => {
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleCreateQuest = () => {
    if (!isLoggedIn) {
      setShowAlert(true);
      setTimeout(() => {
        navigate("/login"); 
      }, 2000);
    } else {
      navigate("/create-quest"); 
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false); 
  };

  return (
    <div className="home-container">
      <h1 className="welcome-text">
        {userData.name ? `${userData.name} ${userData.surname}, Welcome!` : "Welcome, Guest!"}
      </h1>
      <div className="button-group">
        <button className="button quest-button">🎯 Do a Quest</button>
        <button className="button create-button" onClick={handleCreateQuest}>
          📝 Make a Quest
        </button>
      </div>
      
      {showAlert && <Alert message="Please log in to create a quest." onClose={handleCloseAlert} />}
    </div>
  );
};

export default Home;
