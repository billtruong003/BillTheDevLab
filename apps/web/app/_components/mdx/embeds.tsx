import React from 'react';

// --- YouTube Embed ---
interface YouTubeProps {
  id: string; // YouTube Video ID (e.g., dQw4w9WgXcQ)
  title?: string;
}

export function YouTube({ id, title = 'YouTube video player' }: YouTubeProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-elevated)] pb-[56.25%] shadow-sm my-6">
      <iframe
        className="absolute top-0 left-0 h-full w-full"
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}

// --- TikTok Embed ---
interface TikTokProps {
  id: string; // TikTok Video ID
}

export function TikTok({ id }: TikTokProps) {
  return (
    <div className="my-6 flex justify-center">
      <blockquote
        className="tiktok-embed"
        cite={`https://www.tiktok.com/@user/video/${id}`}
        data-video-id={id}
        style={{ maxWidth: '605px', minWidth: '325px' }}
      >
        <section>
          <a
            target="_blank"
            href={`https://www.tiktok.com/@user/video/${id}`}
            rel="noopener noreferrer"
            className="text-brand-orange hover:underline"
          >
            Watch on TikTok
          </a>
        </section>
      </blockquote>
      <script async src="https://www.tiktok.com/embed.js"></script>
    </div>
  );
}

// --- Tweet (X) Embed ---
// Note: For better performance/security, consider using 'react-tweet' package in production.
// This is a simple iframe fallback or script injection approach.
interface TweetProps {
  id: string; // Tweet ID
}

export function Tweet({ id }: TweetProps) {
  return (
    <div className="my-6 flex justify-center">
       <div className="flex justify-center w-full max-w-[550px]">
        {/* Using a simple placeholder link for now, or you can integrate 'react-twitter-embed' */}
        <a 
          href={`https://twitter.com/x/status/${id}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-elevated)] hover:bg-[var(--color-surface)] transition-colors"
        >
          <span>View Tweet on X (Twitter)</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>
      </div>
    </div>
  );
}

// --- Spotify Embed ---
interface SpotifyProps {
  uri: string; // Spotify URI (spotify:track:...) or Link ID
  type?: 'track' | 'album' | 'playlist' | 'episode';
}

export function Spotify({ uri, type = 'track' }: SpotifyProps) {
  // Extract ID if full URL is provided
  const id = uri.includes('spotify:') ? uri.split(':').pop() : uri;
  
  return (
    <div className="my-6 w-full overflow-hidden rounded-xl border border-[var(--color-border)] shadow-sm">
      <iframe
        style={{ borderRadius: '12px' }}
        src={`https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`}
        width="100%"
        height="152"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}

// --- Generic Iframe (For other embeds) ---
interface IframeProps {
  src: string;
  title?: string;
  height?: number | string;
}

export function Embed({ src, title = 'Embedded content', height = 400 }: IframeProps) {
  return (
    <div className="my-6 w-full overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-elevated)] shadow-sm">
      <iframe
        src={src}
        title={title}
        width="100%"
        height={height}
        frameBorder="0"
        allowFullScreen
        loading="lazy"
        className="w-full"
      />
    </div>
  );
}