import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../backend/server"; 
import { doc, getDoc } from "firebase/firestore";

const SharedQuest = () => {
  const { id } = useParams();
  const [quest, setQuest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestData = async () => {
      try {
        const questRef = doc(db, "sharedquests", id); 
        const questSnap = await getDoc(questRef);

        if (questSnap.exists()) {
          setQuest(questSnap.data());
        } else {
          setError("Quest not found.");
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      } catch (error) {
        setError("Failed to fetch quest data.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestData();
  }, [id, navigate]);

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: answer,
    });
  };

  const handleSubmitAnswers = () => {
    let correctAnswers = 0;

    quest.questions.forEach((question) => {
      const userAnswer = userAnswers[question.id];

      if (question.type === "input") {
        if (userAnswer && userAnswer.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase()) {
          correctAnswers++;
        }
      } else if (question.type === "single") {
        if (userAnswer === question.correctAnswer) {
          correctAnswers++;
        }
      } else if (question.type === "multiple") {
        if (Array.isArray(userAnswer) && userAnswer.sort().join(",") === question.correctAnswer.sort().join(",")) {
          correctAnswers++;
        }
      }
    });

    setFeedback(`${correctAnswers} out of ${quest.questions.length} questions are correct.`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!quest) {
    return <div>Quest not found.</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>{quest.name}</h1>
      <p>{quest.description}</p>

      <form>
        {quest.questions.map((question, index) => (
          <div key={question.id} style={{ marginBottom: "20px" }}>
            <h3>{index + 1}. {question.question}</h3>

            {question.type === "input" ? (
              <input
                type="text"
                value={userAnswers[question.id] || ""}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                placeholder="Your answer"
                style={{ padding: "8px", fontSize: "16px" }}
              />
            ) : question.type === "single" ? (
              question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <input
                    type="radio"
                    id={`${question.id}-option-${optionIndex}`}
                    name={question.id}
                    value={option.text}
                    checked={userAnswers[question.id] === option.text}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  />
                  <label htmlFor={`${question.id}-option-${optionIndex}`} style={{ marginLeft: "8px" }}>
                    {option.text}
                  </label>
                </div>
              ))
            ) : question.type === "multiple" ? (
              question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <input
                    type="checkbox"
                    id={`${question.id}-option-${optionIndex}`}
                    value={option.text}
                    checked={userAnswers[question.id] && userAnswers[question.id].includes(option.text)}
                    onChange={(e) => {
                      const updatedAnswer = [...(userAnswers[question.id] || [])];
                      if (e.target.checked) {
                        updatedAnswer.push(option.text);
                      } else {
                        const index = updatedAnswer.indexOf(option.text);
                        if (index > -1) {
                          updatedAnswer.splice(index, 1);
                        }
                      }
                      handleAnswerChange(question.id, updatedAnswer);
                    }}
                  />
                  <label htmlFor={`${question.id}-option-${optionIndex}`} style={{ marginLeft: "8px" }}>
                    {option.text}
                  </label>
                </div>
              ))
            ) : null}
          </div>
        ))}

        <button
          type="button"
          onClick={handleSubmitAnswers}
          style={{ padding: "10px", fontSize: "16px" }}
        >
          Submit Answers
        </button>
      </form>

      {feedback && <div style={{ marginTop: "20px", fontSize: "18px" }}>{feedback}</div>}
    </div>
  );
};

export default SharedQuest;
