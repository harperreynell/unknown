import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, addDoc, collection } from "../../backend/server";

const CreateQuest = () => {
  const [quest, setQuest] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setQuest({ ...quest, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quest.name || !quest.description) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "history"), {
        name: quest.name,
        description: quest.description,
      });
      alert("Quest created successfully!");
      navigate("/history");
    } catch (error) {
      console.error("Error adding quest:", error);
      alert("Failed to create quest.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h1>Create a Quest</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          className="input"
          type="text"
          name="name"
          value={quest.name}
          onChange={handleChange}
          placeholder="Quest Name"
          style={{ padding: "8px", fontSize: "16px" }}
        />
        <textarea
          className="input"
          name="description"
          value={quest.description}
          onChange={handleChange}
          placeholder="Quest Description"
          style={{ padding: "8px", fontSize: "16px", height: "100px" }}
        />
        <button className="button" type="submit" style={{ padding: "10px", fontSize: "16px", cursor: "pointer" }} disabled={loading}>
          {loading ? "Creating..." : "Create Quest"}
        </button>
      </form>
    </div>
  );
};

export default CreateQuest;
