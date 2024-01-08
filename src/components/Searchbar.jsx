import React from 'react';
// import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {

  // const [query, setQuery] = useState('');

  // const handleSubmit = event => {
  //   event.preventDefault();
  //   onSubmit(query);
  // };

  // const handleChange = event => {
  //   setQuery(event.target.value);
  // };


  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={onSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
