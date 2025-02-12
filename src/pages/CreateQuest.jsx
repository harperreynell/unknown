import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, addDoc, collection, auth } from "../backend/server";

const CreateQuest = () => {
  const [quest, setQuest] = useState({ name: "", description: "" });
  const [questions, setQuestions] = useState([{ question: "", type: "single", options: [], correctAnswer: "" }]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangeQuest = (e) => {
    setQuest({ ...quest, [e.target.name]: e.target.value });
  };

  const handleChangeQuestion = (index, e) => {
    const newQuestions = [...questions];
    newQuestions[index][e.target.name] = e.target.value;
    setQuestions(newQuestions);
  };

  const handleChangeOption = (index, optionIndex, e) => {
    const newQuestions = [...questions];
    newQuestions[index].options[optionIndex].text = e.target.value; 
    setQuestions(newQuestions);
  };

  const handleToggleCorrectAnswer = (index, optionIndex) => {
    const newQuestions = [...questions];
    const updatedOptions = newQuestions[index].options.map((opt, idx) => ({
      ...opt,
      isCorrect: idx === optionIndex ? !opt.isCorrect : opt.isCorrect,
    }));
    newQuestions[index].options = updatedOptions;

    const correctAnswer = updatedOptions
      .filter(opt => opt.isCorrect)
      .map(opt => opt.text);
    newQuestions[index].correctAnswer = correctAnswer.length === 1 ? correctAnswer[0] : correctAnswer;

    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", type: "single", options: [], correctAnswer: "" }]);
  };

  const handleAddOption = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].options.push({ text: "", isCorrect: false });
    setQuestions(newQuestions);
  };

  const handleRemoveOption = (index, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[index].options.splice(optionIndex, 1);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quest.name || !quest.description || questions.some(q => !q.question || (q.type !== "input" && q.options.length === 0))) {
      alert("Please fill in all fields.");
      return;
    }
  
    try {
      setLoading(true);
  
      const userId = auth.currentUser.uid;
  
      await addDoc(collection(db, "users", userId, "quests"), {
        name: quest.name,
        description: quest.description,
        questions: questions,
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
          onChange={handleChangeQuest}
          placeholder="Quest Name"
          style={{ padding: "8px", fontSize: "16px" }}
        />
        <textarea
          className="input"
          name="description"
          value={quest.description}
          onChange={handleChangeQuest}
          placeholder="Quest Description"
          style={{ padding: "8px", fontSize: "16px", height: "100px" }}
        />

        {questions.map((q, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <input
              className="input"
              type="text"
              name="question"
              value={q.question}
              onChange={(e) => handleChangeQuestion(index, e)}
              placeholder="Enter Question"
              style={{ padding: "8px", fontSize: "16px" }}
            />

            <select
              className="input"
              name="type"
              value={q.type}
              onChange={(e) => handleChangeQuestion(index, e)}
              style={{ padding: "8px", fontSize: "16px" }}
            >
              <option value="single">Single Answer (Radio)</option>
              <option value="multiple">Multiple Answers (Checkboxes)</option>
              <option value="input">Free Input</option>
            </select>

            {q.type !== "input" && (
              <div style={{ marginTop: "10px" }}>
                {q.options.map((opt, optionIndex) => (
                  <div key={optionIndex} style={{ display: "flex", marginBottom: "5px" }}>
                    <input
                      className="input"
                      type="text"
                      value={opt.text}
                      onChange={(e) => handleChangeOption(index, optionIndex, e)}
                      placeholder={`Option ${optionIndex + 1}`}
                      style={{ flex: 1, marginRight: "10px" }}
                    />
                    <button
                      type="button"
                      className="button"
                      onClick={() => handleRemoveOption(index, optionIndex)}
                      style={{ cursor: "pointer", padding: "5px", fontSize: "14px" }}
                    >
                      ❌
                    </button>
                    <input
                      type="checkbox"
                      className="button"
                      checked={opt.isCorrect}
                      onChange={() => handleToggleCorrectAnswer(index, optionIndex)}
                      style={{ marginLeft: "10px" }}
                    />
                    <label>Correct Answer</label>
                  </div>
                ))}
                <button
                  type="button"
                  className="button"
                  onClick={() => handleAddOption(index)}
                >
                  + Add Option
                </button>
              </div>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddQuestion}
          className="button"
          style={{ padding: "10px", fontSize: "16px" }}
        >
          + Add Question
        </button>

        <button
          className="button"
          type="submit"
          style={{ padding: "10px", fontSize: "16px", cursor: "pointer" }}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Quest"}
        </button>
      </form>
    </div>
  );
};

export default CreateQuest;
