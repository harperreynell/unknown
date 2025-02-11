import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db, doc, getDoc } from "../../backend/server";

const Quest = () => {
  const { id } = useParams();
  const [quest, setQuest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestData = async () => {
      try {
        const questRef = doc(db, "history", id);
        const questSnap = await getDoc(questRef); 

        if (questSnap.exists()) {
          setQuest(questSnap.data());
        } else {
          setError("Quest not found");
        }
      } catch (error) {
        console.error("Error fetching quest:", error);
        setError("Failed to fetch quest data");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!quest) {
    return <div>Quest not found</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>{quest.name}</h1>
      <p>{quest.description}</p>
    </div>
  );
};

export default Quest;
