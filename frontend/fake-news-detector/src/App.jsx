import React, { useState } from 'react'

export default function App() {
  const [newsText, setNewsText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('https://fake-news-detection-h8wh.onrender.com/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newsText }),
      })
      const data = await res.json()
      setResult(data.prediction)
    } catch (err) {
      alert('Failed to fetch prediction.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold bg-gray-800 px-6 py-4 rounded-lg shadow">
        📰 Fake News Detector
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-6 w-full max-w-md bg-gray-900 p-6 rounded-lg shadow"
      >
        <textarea
          className="w-full p-3 rounded bg-gray-800 text-gray-100 placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Paste news content here..."
          value={newsText}
          onChange={(e) => setNewsText(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-gray-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium px-4 py-2 rounded"
        >
          {loading ? 'Checking...' : 'Check'}
        </button>
      </form>

      {result && (
        <div className="mt-4 bg-gray-900 px-6 py-3 rounded text-lg">
          Prediction: <strong>{result}</strong>
        </div>
      )}
    </div>
  )
}
