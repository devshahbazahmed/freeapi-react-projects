const API_URL = 'https://api.freeapi.app/api/v1/public/youtube/videos';

const formatViews = (value) => {
  const views = Number(value || 0);

  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K`;

  return views.toLocaleString();
};

const formatDuration = (duration = '') => {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

  if (!match) return '';

  const [, hours = '0', minutes = '0', seconds = '0'] = match;
  const parts = Number(hours) > 0
    ? [hours, minutes.padStart(2, '0'), seconds.padStart(2, '0')]
    : [minutes || '0', seconds.padStart(2, '0')];

  return parts.join(':');
};

const formatPublishedDate = (date) => {
  if (!date) return 'Recently';

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
};

const normalizeVideo = (video) => {
  const item = video.items || {};
  const snippet = item.snippet || {};
  const statistics = item.statistics || {};
  const contentDetails = item.contentDetails || {};
  const thumbnails = snippet.thumbnails || {};

  return {
    id: item.id || video.id,
    title: snippet.title || 'Untitled video',
    description: snippet.description || '',
    channelName: snippet.channelTitle || 'Unknown channel',
    thumbnail:
      thumbnails.maxres?.url ||
      thumbnails.standard?.url ||
      thumbnails.high?.url ||
      thumbnails.medium?.url ||
      thumbnails.default?.url ||
      '',
    publishedAt: snippet.publishedAt,
    publishedDate: formatPublishedDate(snippet.publishedAt),
    views: Number(statistics.viewCount || 0),
    viewLabel: `${formatViews(statistics.viewCount)} views`,
    likes: Number(statistics.likeCount || 0),
    likeLabel: formatViews(statistics.likeCount),
    comments: Number(statistics.commentCount || 0),
    commentLabel: formatViews(statistics.commentCount),
    duration: formatDuration(contentDetails.duration),
    tags: snippet.tags || [],
  };
};

export const fetchVideos = async () => {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error('Unable to fetch videos. Please try again later.');
  }

  const data = await res.json();
  return (data.data?.data || []).map(normalizeVideo);
};
