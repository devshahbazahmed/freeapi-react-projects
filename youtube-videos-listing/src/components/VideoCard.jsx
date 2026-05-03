import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => {
  return (
    <Link to={`/video/${video.id}`} className="group block min-w-0">
      <div className="relative overflow-hidden rounded-xl bg-neutral-900">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="aspect-video w-full object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {video.duration && (
          <span className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs font-semibold text-white">
            {video.duration}
          </span>
        )}
      </div>

      <div className="mt-3 flex gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-red-500 to-zinc-700 text-sm font-bold text-white">
          {video.channelName.charAt(0)}
        </div>

        <div className="min-w-0">
          <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-white group-hover:text-red-200">
            {video.title}
          </h3>

          <p className="mt-1 truncate text-sm text-neutral-400">{video.channelName}</p>

          <p className="text-sm text-neutral-500">
            {video.viewLabel} <span aria-hidden="true">-</span> {video.publishedDate}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
