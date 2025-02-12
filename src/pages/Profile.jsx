import React from "react";

const Profile = ({ userData }) => {
  return (
    <div>
        <img src="src/assets/react.svg" className="center" alt="Profile Image" height="150" width="100" />
        <h1>{userData.name} {userData.surname}</h1>
        <p className="read-the-docs">add rating</p>
    </div>
  )
};

export default Profile;
