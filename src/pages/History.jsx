import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, collection, getDocs } from "../../backend/server";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "history"));
        const historyData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHistory(historyData);
      } catch (error) {
        console.error("Error fetching history:", error);
        setError("Failed to fetch history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>History</h1>
      {history.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {history.map((quest) => (
            <li
              key={quest.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                borderBottom: "1px solid #ccc",
              }}
            >
              <div>
                <strong>{quest.name}</strong> - {quest.description}
              </div>
              <button
                className="button"
                onClick={() => navigate(`/quest/${quest.id}`)}
              >
                View
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No history found.</p>
      )}
    </div>
  );
};

export default History;
