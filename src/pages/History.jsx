import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../backend/server.jsx";
import { getDocs, collection, doc, getDoc, setDoc } from "firebase/firestore";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShareLink, setShowShareLink] = useState(null); 
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const userRef = doc(db, "users", user.uid); 
        const questsCollection = collection(userRef, "quests");
        const querySnapshot = await getDocs(questsCollection);
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

    if (user) {
      fetchHistory();
    } else {
      setError("User not logged in");
      setLoading(false);
    }
  }, [user]);

  const handleShareClickLink = async (questId) => {
    const shareLink = `${window.location.origin}/shared-quest/${questId}`;
    setShowShareLink(shareLink); 

    const userRef = doc(db, "users", user.uid);
    const questRef = doc(userRef, "quests", questId);
    const sharedQuestRef = doc(db, "sharedquests", questId);

    try {
        const questSnap = await getDoc(questRef);

        if (questSnap.exists()) {
            const questData = questSnap.data();
            const sharedQuestData = {
                ...questData,
                status: "shared",
                sharedAt: new Date(),
            };

            await setDoc(sharedQuestRef, sharedQuestData, { merge: true });
            copyLinkToClipboard(shareLink)

            console.log("Quest shared successfully to 'sharedquests' collection!");
        } else {
            console.log("No quest found with the provided ID: ", questId);
        }
    } catch (error) {
        console.error("Error sharing quest: ", error); 
    }    
  }

  const handleShareClickID = async (questId) => {
    const shareLink = `${window.location.origin}/shared-quest/${questId}`;
    setShowShareLink(shareLink); 

    const userRef = doc(db, "users", user.uid); 
    const questRef = doc(userRef, "quests", questId); 
    const sharedQuestRef = doc(db, "sharedquests", questId);

    try {
        const questSnap = await getDoc(questRef);

        if (questSnap.exists()) {
            const questData = questSnap.data();
            const sharedQuestData = {
                ...questData,
                status: "shared",
                sharedAt: new Date(), 
            };

            await setDoc(sharedQuestRef, sharedQuestData, { merge: true });
            copyLinkToClipboard(questId)

            console.log("Quest shared successfully to 'sharedquests' collection!"); 
        } else {
            console.log("No quest found with the provided ID: ", questId);
        }
    } catch (error) {
        console.error("Error sharing quest: ", error); 
    }

    
  }

  const copyLinkToClipboard = (link) => {
    navigator.clipboard.writeText(link).then(
      () => {
        alert("Link copied to clipboard!"); 
      },
      (err) => {
        console.error("Error copying link: ", err);
      }
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>My History</h1>
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
              <button
                className="button"
                onClick={() => handleShareClickLink(quest.id)}
              >
                Share Link
              </button>
              <button
                className="button"
                onClick={() => handleShareClickID(quest.id)}
              >
                Share ID
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
