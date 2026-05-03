import { useEffect, useState } from 'react';
import { fetchVideos } from '../services/api';
import VideoCard from '../components/VideoCard';
import Skeleton from '../components/Skeleton';

const Home = ({ searchQuery }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVideos()
      .then((data) => setVideos(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredVideos = videos.filter((video) => {
    const search = searchQuery.trim().toLowerCase();

    if (!search) return true;

    return [video.title, video.channelName, video.description]
      .join(' ')
      .toLowerCase()
      .includes(search);
  });

  if (loading) {
    return (
      <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
        <Skeleton />
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto flex min-h-[60vh] w-full max-w-3xl items-center justify-center px-4 text-center">
        <div>
          <p className="text-lg font-semibold text-white">Videos could not be loaded.</p>
          <p className="mt-2 text-sm text-neutral-400">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-red-400">
            Fresh picks
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-white">
            Explore videos
          </h1>
        </div>

        <p className="text-sm text-neutral-400">
          {filteredVideos.length} {filteredVideos.length === 1 ? 'video' : 'videos'}
        </p>
      </div>

      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-white/10 bg-neutral-900 p-10 text-center">
          <p className="text-lg font-semibold text-white">No videos found</p>
          <p className="mt-2 text-sm text-neutral-400">
            Try a different title, topic, or channel name.
          </p>
        </div>
      )}
    </section>
  );
};

export default Home;
