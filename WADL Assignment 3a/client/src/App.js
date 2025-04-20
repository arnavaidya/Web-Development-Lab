import React, { useState } from 'react';
import './App.css';

function App() {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // State for dark mode toggle

  // Fetch data when button is clicked
  const fetchJoke = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/joke');
      const data = await response.json();
      console.log('Fetched data:', data); // Log the data returned by the backend
      setJoke(`${data.setup} ${data.punchline}`);
    } catch (error) {
      console.error('Error fetching joke:', error);
      setJoke('Failed to fetch joke');
    }
    setLoading(false);
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="navbar-brand">Random Joke Generator</h2>
        <div className="navbar-links">
          <a href="#home">Home</a>
          <a href="#jokes">Jokes</a>
          <a href="#about">About</a>
        </div>
        <button className="theme-toggle-btn" onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </nav>
      <div className="container">
        <div className="card">
          <h1 className="title">Need a laugh?</h1>
          <p className="message">{joke || 'Click the button to fetch a joke!'}</p>
          <button
            onClick={fetchJoke}
            className="fetch-button"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Get Random Joke'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;