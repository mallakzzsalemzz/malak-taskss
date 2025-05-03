import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from './components/NewsCard';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);

  // API key from News API
  const API_KEY = '8a49332265e84aba93ea31a2218c76bf'; // Replace with your actual News API key
  const BASE_URL = 'https://newsapi.org/v2/everything';

  // Function to fetch news based on search term
  const fetchNews = async (sport) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: sport + ' sport',
          apiKey: API_KEY,
          language: 'en',
          sortBy: 'publishedAt',
          pageSize: 20
        }
      });
      
      setArticles(response.data.articles);
      setInitialLoad(false);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to fetch news. Please try again later.');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchNews(searchTerm.trim());
    }
  };

  // Initial fetch for default sports news
  useEffect(() => {
    fetchNews('football');
  }, []);

  return (
    <div className="app">
      <div className="header">
        <h1>Sports News</h1>
        <p>Search for news about your favorite sports</p>
      </div>
      
      <form className="search-container" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          placeholder="Enter a sport (e.g., football, basketball, tennis)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && <div className="loading">Loading news...</div>}
      
      {error && <div className="error">{error}</div>}
      
      {!loading && !error && articles.length === 0 && !initialLoad && (
        <div className="no-results">No news found for "{searchTerm}". Try another sport.</div>
      )}
      
      {!loading && !error && articles.length > 0 && (
        <div className="news-container">
          {articles.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
