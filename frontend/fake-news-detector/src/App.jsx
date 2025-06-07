import React, { useState } from 'react';
import './App.css';

function App() {
  const [newsText, setNewsText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: newsText })
      });
      const data = await res.json();
      setResult(data.prediction);
    } catch (err) {
      alert("Failed to fetch prediction.");
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1 className='bg-slate-700'>📰 Fake News Detector</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Paste news content here..."
          value={newsText}
          onChange={(e) => setNewsText(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>{loading ? "Checking..." : "Check"}</button>
      </form>
      {result && <div className="result">Prediction: <strong>{result}</strong></div>}
    </div>
  );
}

export default App;