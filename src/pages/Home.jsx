import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../utils/Alert";

const Home = ({ userData, isLoggedIn }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [showLinkPopup, setShowLinkPopup] = useState(false); // Manage pop-up visibility
  const [sharedQuestLink, setSharedQuestLink] = useState(""); // Store the quest link
  const navigate = useNavigate();

  const handleCreateQuest = () => {
    if (!isLoggedIn) {
      setShowAlert(true);
      setTimeout(() => {
        navigate("/login"); // Redirect to login
        setShowAlert(false); // Hide the alert after 2 seconds
      }, 2000);
    } else {
      navigate("/create-quest"); 
    }
  };

  const handleDoQuest = () => {
    navigate("/history");
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleDoSharedQuest = () => {
    setShowLinkPopup(true); // Show the input popup to enter link
  };

  const handleSubmitLink = () => {
    // Check if the shared quest link is valid (you can customize this check)
    if (sharedQuestLink) {
      navigate(`/shared-quest/${sharedQuestLink}`);  // Navigate to the shared quest page with the link
      setShowLinkPopup(false); // Close the pop-up after navigating
    } else {
      alert("Please enter a valid quest ID.");
    }
  };

  const handleClosePopup = () => {
    setShowLinkPopup(false); // Close the popup without doing anything
  };

  return (
    <div className="home-container">
      <h1 className="welcome-text">
        {userData.name ? `${userData.name} ${userData.surname}, Welcome!` : "Welcome, Guest!"}
      </h1>
      <div className="button-group">
        <button className="button quest-button" onClick={handleDoQuest}>
          🎯 Do a Quest
        </button>
        <button className="button create-button" onClick={handleCreateQuest}>
          📝 Make a Quest
        </button>
        <button className="button shared-quest-button" onClick={handleDoSharedQuest}>
          🌍 Do a Shared Quest
        </button>
      </div>
  
      {showAlert && <Alert message="Please log in to create a quest." onClose={handleCloseAlert} />}
      
      {showLinkPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Enter Shared Quest Link</h2>
            <input 
              type="text" 
              value={sharedQuestLink} 
              onChange={(e) => setSharedQuestLink(e.target.value)} 
              placeholder="Enter Quest ID"
              className="input"
            />
            <div className="popup-buttons">
              <button className="button" onClick={handleSubmitLink}>
                Go to Quest
              </button>
              <button className="button" onClick={handleClosePopup}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
