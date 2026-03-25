import React, { useState } from "react";
import "./Dashboard.css";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [score, setScore] = useState("");
  const [scores, setScores] = useState([]);
  const [charity, setCharity] = useState("");
  const [draw, setDraw] = useState([]);
  const [result, setResult] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const addScore = () => {
    if (!score) return;

    if (score < 1 || score > 45) return; // 🔥 validation

    let newScores = [...scores, Number(score)];
    if (newScores.length > 5) newScores.shift();

    setScores(newScores);
    setScore("");
  };

  const generateDraw = () => {
    let numbers = [];

    while (numbers.length < 5) {
      let num = Math.floor(Math.random() * 45) + 1;
      if (!numbers.includes(num)) numbers.push(num);
    }

    numbers.sort((a, b) => a - b);
    setDraw(numbers);

    let match = scores.filter(s => numbers.includes(s)).length;

    if (match === 5) setResult("Jackpot 🎉");
    else if (match === 4) setResult("Great 🔥");
    else if (match === 3) setResult("Good 👍");
    else setResult("No win ❌");
  };

  return (
    <div className="dashboard">

      <Navbar />

      <h2 className="dash-title">Welcome, {user?.name}</h2>

      <div className="dash-grid">

        {/* SCORE */}
        <div className="dash-card">
          <h3>Add Score</h3>

          <input
            type="number"
            placeholder="Enter score (1-45)"
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />

          <button onClick={addScore}>Add Score</button>

          <div className="score-grid">
            {scores.map((s, i) => (
              <div key={i} className="score-card">
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* CHARITY */}
        <div className="dash-card">
          <h3>Charity</h3>

          <select onChange={(e) => setCharity(e.target.value)}>
            <option>Select Charity</option>
            <option>Save Earth 🌍</option>
            <option>Child Care 👶</option>
          </select>

          <p className="info">Selected: {charity}</p>
        </div>

        {/* DRAW */}
        <div className="dash-card">
          <h3>Monthly Draw</h3>

          <button onClick={generateDraw}>Run Draw</button>

          <div className="draw-grid">
            {draw.map((n, i) => (
              <div key={i} className="draw-ball">{n}</div>
            ))}
          </div>

        
          {scores.length === 0 && (
            <p className="info">No scores yet</p>
          )}

          <p className={`result ${result.includes("Jackpot") ? "win" : "lose"}`}>
            {result}
          </p>
          <p className="info">
  Subscription: {isSubscribed ? "Active" : "Inactive"}
</p>

<button onClick={() => setIsSubscribed(true)}>
  Activate Subscription
</button>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;