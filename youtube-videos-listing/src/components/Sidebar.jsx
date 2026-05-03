const Sidebar = () => {
  const links = [
    { label: 'Home', icon: 'M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3V10.5Z', active: true },
    { label: 'Trending', icon: 'M13 2 5 13h6l-1 9 8-12h-6l1-8Z' },
    { label: 'Subscriptions', icon: 'M4 6h16v12H4V6Zm6 3.5v5l4-2.5-4-2.5Z' },
    { label: 'Library', icon: 'M5 4h14v3H5V4Zm0 5h14v11H5V9Zm4 3v5l5-2.5L9 12Z' },
  ];

  return (
    <aside className="hidden w-60 shrink-0 border-r border-white/10 bg-neutral-950 px-3 py-5 md:block">
      <ul className="sticky top-24 space-y-1">
        {links.map((link) => (
          <li key={link.label}>
            <button
              type="button"
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                link.active
                  ? 'bg-white text-neutral-950'
                  : 'text-neutral-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                <path d={link.icon} />
              </svg>
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
