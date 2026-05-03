import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchVideos } from '../services/api';

const VideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVideos()
      .then((videos) => {
        setVideo(videos.find((item) => item.id === id));
        setRelatedVideos(videos.filter((item) => item.id !== id).slice(0, 5));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="aspect-video animate-pulse rounded-2xl bg-neutral-800" />
          <div className="mt-5 h-7 w-3/4 animate-pulse rounded bg-neutral-800" />
          <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-neutral-900" />
        </div>
      </section>
    );
  }

  if (error || !video) {
    return (
      <section className="mx-auto flex min-h-[60vh] w-full max-w-3xl items-center justify-center px-4 text-center">
        <div>
          <p className="text-lg font-semibold text-white">
            {error ? 'Video could not be loaded.' : 'Video not found.'}
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex rounded-full bg-white px-5 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-red-100"
          >
            Back to videos
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="min-w-0">
        <div className="overflow-hidden rounded-2xl bg-black shadow-2xl shadow-black/40">
          <iframe
            title={video.title}
            src={`https://www.youtube.com/embed/${video.id}`}
            className="aspect-video w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <h1 className="mt-5 text-2xl font-bold leading-tight tracking-tight text-white">
          {video.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-red-500 to-zinc-700 font-bold text-white">
              {video.channelName.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-white">{video.channelName}</p>
              <p className="text-sm text-neutral-400">{video.publishedDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-neutral-900 px-4 py-2 text-sm text-neutral-200">
              {video.viewLabel}
            </span>
            <span className="rounded-full bg-neutral-900 px-4 py-2 text-sm text-neutral-200">
              {video.likeLabel} likes
            </span>
          </div>
        </div>

        <div className="mt-5 rounded-xl bg-neutral-900 p-5">
          <p className="mb-3 text-sm font-semibold text-neutral-300">
            {video.commentLabel} comments
          </p>
          <p className="whitespace-pre-line text-sm leading-6 text-neutral-300">
            {video.description || 'No description available.'}
          </p>
        </div>
      </div>

      <aside>
        <h2 className="mb-4 text-base font-semibold text-white">Up next</h2>
        <div className="space-y-4">
          {relatedVideos.map((item) => (
            <Link key={item.id} to={`/video/${item.id}`} className="group grid grid-cols-[150px_1fr] gap-3">
              <div className="relative overflow-hidden rounded-lg bg-neutral-900">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="aspect-video w-full object-cover transition group-hover:scale-105"
                  loading="lazy"
                />
                {item.duration && (
                  <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 text-[11px] font-semibold text-white">
                    {item.duration}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <p className="line-clamp-2 text-sm font-semibold leading-5 text-white group-hover:text-red-200">
                  {item.title}
                </p>
                <p className="mt-1 truncate text-xs text-neutral-400">{item.channelName}</p>
                <p className="text-xs text-neutral-500">{item.viewLabel}</p>
              </div>
            </Link>
          ))}
        </div>
      </aside>
    </section>
  );
};

export default VideoPage;
