import React from 'react';

const NewsCard = ({ article }) => {
  const { title, description, url, urlToImage, source, publishedAt } = article;
  
  // Format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Default image if none is provided
  const imageUrl = urlToImage || 'https://via.placeholder.com/300x200?text=No+Image+Available';

  return (
    <div className="news-card">
      <img 
        src={imageUrl} 
        alt={title} 
        className="news-image"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
        }}
      />
      <div className="news-content">
        <h3 className="news-title">{title}</h3>
        <p className="news-description">
          {description ? 
            (description.length > 100 ? description.substring(0, 100) + '...' : description) 
            : 'No description available.'}
        </p>
        <p className="news-source">Source: {source.name || 'Unknown'}</p>
        <p className="news-date">Published: {formatDate(publishedAt)}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="read-more">
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsCard; 