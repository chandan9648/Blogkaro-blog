import React from 'react';

const Newsletter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-24 space-y-4">
      {/* Title */}
      <h1 className="text-2xl md:text-4xl font-bold text-black">
        Never Miss a <span className='text-primary'>New</span> Blog!
      </h1>

      {/* Subtitle */}
      <p className="text-sm md:text-base text-gray-500">
        Subscribe to get the latest blog, new tech, and exclusive news.
      </p>

      {/* Email form */}
      <form className="flex w-full max-w-xl mt-4">
        <input
          type="email"
          placeholder="Enter your email id"
          className="flex-grow h-12 px-4 border border-gray-300 rounded-l-md outline-none text-sm text-gray-700"
          required
        />
        <button
          type="submit"
          className="bg-[#7B61FF] hover:bg-[#6846ff] text-white px-6 md:px-10 rounded-r-md text-sm font-medium"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
