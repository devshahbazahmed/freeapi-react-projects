import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://api.freeapi.app/api/v1/public/cats/cat/random';

function App() {
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [viewCount, setViewCount] = useState(0);

  const fetchCat = async () => {
    try {
      setLoading(true);
      setError('');

      const res = await axios.get(API_URL);

      setCat(res.data.data);
      setViewCount((count) => count + 1);
    } catch (err) {
      setError('Failed to load a new image. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCat();
  }, []);

  return (
    <main className="cat-shell">
      <section className="cat-layout">
        <div className="cat-copy">
          <p className="cat-kicker">Random image viewer</p>
          <h1>Fresh cat portrait, every click.</h1>
          <p>
            A cleaner image-focused viewer with a larger preview, graceful
            loading state, and a simple refresh action.
          </p>
        </div>

        <article className="cat-card">
          <div className="cat-frame">
            {loading && <div className="cat-loader" aria-label="Loading image" />}
            {error && <p className="cat-error">{error}</p>}
            {cat && !loading && !error && (
              <img key={cat.image} src={cat.image} alt="Random cat" />
            )}
          </div>

          <div className="cat-controls">
            <div>
              <span>Images viewed</span>
              <strong>{viewCount || '--'}</strong>
            </div>
            <button type="button" onClick={fetchCat} disabled={loading}>
              {loading ? 'Loading...' : 'Load New Cat'}
            </button>
          </div>
        </article>
      </section>
    </main>
  );
}

export default App;
