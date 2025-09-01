import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import BlogList from '../components/BlogList';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const Home = () => {
  return (
  <div className="relative min-h-dvh overflow-x-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-800 antialiased">
      {/* Ambient background accents (hidden on very small screens to avoid overflow) */}
      <div aria-hidden className="pointer-events-none absolute -top-28 -left-20 hidden h-80 w-80 rounded-full bg-gradient-to-tr from-indigo-300/50 to-fuchsia-300/50 blur-3xl -z-10 sm:block" />
      <div aria-hidden className="pointer-events-none absolute top-1/4 -right-16 hidden h-72 w-72 rounded-full bg-gradient-to-tr from-emerald-300/40 to-cyan-300/40 blur-3xl -z-10 sm:block" />

      <Navbar />

      {/* Hero */}
      <Header />

      {/* Decorative divider */}
      <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      <main className="mt-10">
        {/* Latest Posts Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 sm:mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">Latest stories</h2>
              <p className="mt-1 text-xs sm:text-sm text-gray-500">Fresh perspectives from the community—curated for you.</p>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white/70 p-1.5 sm:p-2 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/50">
            <div className="rounded-xl p-2 sm:p-3 lg:p-4 overflow-x-hidden">
              <BlogList />
            </div>
          </div>
        </section>

        {/* Newsletter Section with subtle highlight */}
        <section className="mx-auto mt-10 sm:mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-tr from-indigo-50 via-white to-emerald-50 p-1 shadow">
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-indigo-200/40 blur-2xl" aria-hidden />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-emerald-200/40 blur-2xl" aria-hidden />
            <div className="relative rounded-[22px] bg-white/60 p-6 backdrop-blur supports-[backdrop-filter]:bg-white/40 sm:p-8">
              <div className="mb-6 text-center">
                <h3 className="text-lg sm:text-2xl font-semibold text-gray-900">Stay in the loop</h3>
                <p className="mt-1 text-xs sm:text-sm text-gray-600">Subscribe for new posts, tips, and featured creators.</p>
              </div>
              <Newsletter />
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Scroll to top action */}
      <button
        type="button"
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="group fixed bottom-5 right-5 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 sm:bottom-8 sm:right-8 sm:h-11 sm:w-11"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="h-5 w-5 text-gray-600 transition  group-hover:text-gray-900"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Home;
