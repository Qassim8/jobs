import { MagnifyingGlass } from '@phosphor-icons/react';
import React, { useState } from 'react'

function SearchBar({ query, onSearch }) {
    const [word, setWord] = useState(query);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(word)
    }
  return (
    <form onSubmit={handleSubmit} className='w-full flex items-center'>
      <input
        type="search"
        className='w-full py-2 px-3 outline-none border border-slate-300 rounded-s-md'
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder='Search for job...'
      />
      <button type="submit" className="auth-btn text-white !rounded-e-md !rounded-s-none border border-emerald-400">
        <span>search</span>
        <MagnifyingGlass className='text-white' />
      </button>
    </form>
  );
}

export default SearchBar