export interface Track {
  title: string;
  artist: string;
  src: string;
}

export const TRACKS: Track[] = [
  { title: "Let Go", artist: "Ark Patrol", src: "/audio/let-go.mp3" },
  { title: "Selfless", artist: "Flawed Mangoes", src: "/audio/selfless.mp3" },
  { title: "Closer", artist: "Nuages", src: "/audio/closer.mp3" },
  { title: "Dramamine", artist: "Modest Mouse", src: "/audio/dramamine.mp3" },
  {
    title: "Sunset Lover",
    artist: "Petit Biscuit",
    src: "/audio/sunset-lover.mp3",
  },
  { title: "Nightcall", artist: "Kavinsky", src: "/audio/nightcall.mp3" },
  { title: "Wait", artist: "M83", src: "/audio/wait.mp3" },
  { title: "Vanished", artist: "Crystal Castles", src: "/audio/vanished.mp3" },
];
