import React from "react";

const Home = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <img src="src/assets/react.svg" alt="Profile Image" height="150" width="150" />
      <h1 style={{ marginTop: "1rem" }}>John Doe</h1>
    </div>
  );
};

export default Home;
