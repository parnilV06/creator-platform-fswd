// src/components/SearchBar.jsx
import { useState } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  return (
    <div>
      <label htmlFor="search">Search</label>
      <input
        id="search"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type to search..."
      />
      {query && <p>You searched for: {query}</p>}
    </div>
  );
};

export default SearchBar;