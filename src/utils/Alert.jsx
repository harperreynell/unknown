import React from "react";
import "./Alert.css"

const Alert = ({ message, onClose }) => {
  return (
    <div className="alert-container">
      <div className="alert">
        <span>{message}</span>
        <button className="alert-close-btn" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default Alert;
