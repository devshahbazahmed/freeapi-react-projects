import { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          'https://api.freeapi.app/api/v1/public/randomproducts'
        );
        const data = await res.json();

        setProducts(data.data.data); // important
      } catch (err) {
        setError('Failed to fetch products', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (error) return <h1 className="text-center mt-10">{error}</h1>;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-5">
        <h1 className="text-3xl font-bold text-center mb-6">Product Listing</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-60 bg-gray-300 animate-pulse rounded"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-center mb-6">Product Listing</h1>

      <input
        type="text"
        placeholder="Search products..."
        className="w-full mb-5 p-2 border rounded"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 hover:cursor-pointer transition"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <h2 className="font-semibold text-lg mb-2">{product.title}</h2>

              <p className="text-gray-600 text-sm line-clamp-2">
                {product.description}
              </p>

              <div className="mt-3 flex justify-between items-center">
                <span className="text-xl font-bold text-green-600">
                  ${product.price}
                </span>

                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:cursor-pointer">
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
