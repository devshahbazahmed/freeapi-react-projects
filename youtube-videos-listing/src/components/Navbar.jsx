import { Link } from 'react-router-dom';

const Navbar = ({ searchQuery, onSearchChange }) => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/95 px-4 py-3 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3">
        <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="Go to home">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-red-600 shadow-lg shadow-red-950/30">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden="true">
              <path d="M9.5 7.6v8.8l7-4.4-7-4.4Z" />
            </svg>
          </span>
          <span className="hidden text-lg font-bold tracking-tight sm:block">
            YouTube Listing
          </span>
        </Link>

        <label className="relative mx-auto w-full max-w-2xl">
          <span className="sr-only">Search videos</span>
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 fill-none stroke-neutral-400 stroke-2"
            aria-hidden="true"
          >
            <path d="m21 21-4.35-4.35" />
            <circle cx="11" cy="11" r="7" />
          </svg>
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search videos"
            className="h-11 w-full rounded-full border border-white/10 bg-neutral-900 px-12 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
          />
        </label>

        <button
          type="button"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-neutral-900 text-sm font-semibold text-neutral-200 transition hover:bg-neutral-800"
          aria-label="User profile"
        >
          U
        </button>
      </div>
    </header>
  );
};

export default Navbar;
