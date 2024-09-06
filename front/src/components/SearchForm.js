import React, { useState } from 'react';
import '../styles/SearchForm.css'; // Ensure you have styling

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(keyword);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search for a movie"
        required
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;