import React, { useRef } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Header = () => {

  const { setInput, input } = useAppContext();
  const inputRef = useRef();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };

  const onClear = () => {
    setInput('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="relative mx-4 sm:mx-8 lg:mx-16 xl:mx-24">
      {/* Decorative gradient background */}
      <img
        src={assets.gradientBackground}
        alt="Decorative gradient background"
        className="pointer-events-none absolute inset-x-0 -top-16 mx-auto w-[900px] max-w-[92%] -z-10 opacity-50"
      />

      <div className="text-center mt-16 sm:mt-20 mb-8">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 mb-4 rounded-full border border-primary/40 bg-primary/10 text-xs sm:text-sm text-primary">
          <p className="leading-none">New: AI feature integrated</p>
          <img src={assets.star_icon} className="w-3 h-3" alt="star" />
        </div>

            <h1 className="text-3xl sm:text-6xl font-semibold tracking-tight text-gray-800">
          Hello! Welcome to
          <br />
          <span className="bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">BlogKaro</span>
        </h1>

        <p className="my-6 sm:my-8 max-w-2xl mx-auto max-sm:text-xs text-gray-600">
          This is your space to think out loud, to share what matters, and to write without filters. Whether it's one word or a thousand, your story starts right here.
        </p>

        {/* Search bar */}
            <form onSubmit={onSubmitHandler} role="search" className="mx-auto max-w-2xl">
              <div className="flex flex-col sm:flex-row items-stretch gap-2">
                <div className="group relative flex-1 rounded-full bg-white/80 ring-1 ring-gray-200 backdrop-blur transition hover:shadow-sm focus-within:ring-2 focus-within:ring-primary">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 inline-flex items-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
                      <circle cx="11" cy="11" r="7" strokeWidth="2" />
                      <path d="M21 21l-3.6-3.6" strokeWidth="2" />
                    </svg>
                  </span>
                  <label htmlFor="home-search" className="sr-only">
                    Search for blogs
                  </label>
                  <input
                    id="home-search"
                    ref={inputRef}
                    type="text"
                    placeholder="Search for blogs"
                    required
                    defaultValue={input}
                    className="w-full rounded-full bg-transparent py-3 pl-12 pr-4 text-gray-800 placeholder:text-gray-400 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-primary px-6 py-3 text-white shadow-sm transition hover:brightness-110 active:scale-95"
                >
                  Search
                </button>
              </div>
            </form>
      </div>

      {/* Clear search */}
      <div className="text-center">
        {input && (
          <button
            onClick={onClear}
            className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600 shadow-sm transition hover:border-gray-300 hover:text-gray-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-3.5 w-3.5">
              <path strokeWidth="2" strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear search
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
