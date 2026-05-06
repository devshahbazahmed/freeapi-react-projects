import { useEffect, useMemo, useState } from 'react';

const API_URL = 'https://api.freeapi.app/api/v1/public/randomproducts';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const uniqueCategories = products.map((product) => product.category);
    return ['All', ...new Set(uniqueCategories.filter(Boolean))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query);
      const matchesCategory =
        activeCategory === 'All' || product.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [activeCategory, products, search]);

  const averageRating = useMemo(() => {
    if (!products.length) return '0.0';
    const total = products.reduce((sum, product) => sum + product.rating, 0);
    return (total / products.length).toFixed(1);
  }, [products]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await fetch(API_URL);
        const data = await res.json();

        setProducts(data.data.data);
      } catch (err) {
        setError('Failed to fetch products. Please try again in a moment.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f7f3] text-slate-950">
      <section className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <div className="hero-surface relative overflow-hidden rounded-[2rem] border border-white/70 bg-slate-950 px-6 py-8 text-white shadow-2xl shadow-slate-300/50 sm:px-8 lg:px-10">
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-emerald-200">
                Product discovery
              </p>
              <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                Browse better. Choose faster.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
                A cleaner product listing interface with search, category
                filters, richer cards, and quick collection insights.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 rounded-3xl border border-white/10 bg-white/10 p-3 backdrop-blur">
              <Metric label="Products" value={products.length || '--'} />
              <Metric label="Rating" value={averageRating} />
              <Metric label="Categories" value={Math.max(categories.length - 1, 0)} />
            </div>
          </div>
        </div>

        <section className="control-panel rounded-[1.5rem] border border-white bg-white/85 p-4 shadow-xl shadow-slate-200/70 backdrop-blur sm:p-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <label className="group relative block">
              <span className="sr-only">Search products</span>
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                Search
              </span>
              <input
                type="text"
                value={search}
                placeholder="Search by product, category, or description"
                className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-20 pr-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>

            <p className="rounded-2xl bg-slate-950 px-5 py-4 text-center text-sm font-bold text-white">
              Showing {filteredProducts.length} of {products.length}
            </p>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`category-pill ${
                  activeCategory === category ? 'category-pill-active' : ''
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-center font-semibold text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <ProductSkeleton />
        ) : (
          <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </section>
        )}

        {!loading && !filteredProducts.length && (
          <section className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white/75 px-6 py-14 text-center">
            <h2 className="text-2xl font-black">No products found</h2>
            <p className="mx-auto mt-2 max-w-md text-slate-500">
              Try a different search term or choose another category.
            </p>
          </section>
        )}
      </section>
    </main>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl bg-white p-4 text-slate-950">
      <p className="text-2xl font-black tracking-tight">{value}</p>
      <p className="mt-1 text-[0.68rem] font-black uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
    </div>
  );
}

function ProductCard({ product, index }) {
  const discountPrice = product.discountPercentage
    ? product.price - (product.price * product.discountPercentage) / 100
    : product.price;

  return (
    <article
      className="product-card group"
      style={{ animationDelay: `${Math.min(index * 65, 520)}ms` }}
    >
      <div className="relative overflow-hidden rounded-[1.25rem] bg-slate-100">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-slate-700 shadow-sm backdrop-blur">
          {product.category}
        </div>
        {product.discountPercentage > 0 && (
          <div className="absolute bottom-3 right-3 rounded-full bg-emerald-500 px-3 py-1 text-xs font-black text-white shadow-lg shadow-emerald-900/20">
            {Math.round(product.discountPercentage)}% off
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h2 className="line-clamp-2 text-lg font-black leading-6 text-slate-950">
            {product.title}
          </h2>
          <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-black text-amber-700">
            {product.rating?.toFixed(1)}
          </span>
        </div>

        <p className="line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-slate-500">
          {product.description}
        </p>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
              Price
            </p>
            <div className="mt-1 flex flex-wrap items-baseline gap-2">
              <span className="text-2xl font-black text-slate-950">
                {currency.format(discountPrice)}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-sm font-bold text-slate-400 line-through">
                  {currency.format(product.price)}
                </span>
              )}
            </div>
          </div>

          <button className="buy-button" type="button">
            Buy
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-slate-400">
          <span>Stock: {product.stock}</span>
          <span>{product.brand || 'Curated'}</span>
        </div>
      </div>
    </article>
  );
}

function ProductSkeleton() {
  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="skeleton-card rounded-[1.5rem] border border-white bg-white/75 p-3 shadow-xl shadow-slate-200/60"
        >
          <div className="h-56 rounded-[1.25rem] bg-slate-200" />
          <div className="p-2 pt-4">
            <div className="h-5 w-3/4 rounded-full bg-slate-200" />
            <div className="mt-3 h-4 w-full rounded-full bg-slate-200" />
            <div className="mt-2 h-4 w-5/6 rounded-full bg-slate-200" />
            <div className="mt-6 flex items-center justify-between">
              <div className="h-7 w-24 rounded-full bg-slate-200" />
              <div className="h-11 w-20 rounded-full bg-slate-200" />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default App;
