export interface Track {
  title: string;
  artist: string;
  videoId: string;
}

export function trackThumbnail(track: Track): string {
  // mqdefault is true 16:9 — hqdefault is a legacy 4:3 frame with
  // black letterbox bars baked into the image itself.
  return `https://i.ytimg.com/vi/${track.videoId}/mqdefault.jpg`;
}

export function startCase(text: string): string {
  return text.replace(
    /\w\S*/g,
    (word) => word.charAt(0).toUpperCase() + word.slice(1),
  );
}

export function trackLabel(track: Track): string {
  return `${startCase(track.title)} · ${track.artist}`;
}

export const TRACKS: Track[] = [
  { title: "drowning", artist: "vague003", videoId: "plffo_TlTYQ" },
  { title: "drifting", artist: "blut own", videoId: "-RO4OChykaA" },
  {
    title: "if it's real, then i'll stay",
    artist: "bonjr",
    videoId: "ZzarAeToKdo",
  },
  {
    title: "Let Go",
    artist: "Ark Patrol",
    videoId: "Ts5ZiojkOe4",
  },
];
