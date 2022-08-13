import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useState } from 'react';

export default function Searchbar({ onSubmit }) {
  const [searchWord, setSearchWord] = useState('');

  const handleSearchChange = event => {
    setSearchWord(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!searchWord) {
      return Notify.info('Please enter search data.');
    }
    onSubmit(searchWord);
  };

  return (
    <header className="searchbar">
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className="form_button">
          <span className="button-label">&#128269;</span>
        </button>
        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchWord}
          onChange={handleSearchChange}
        />
      </form>
    </header>
  );
}
