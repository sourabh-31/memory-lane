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
  { title: "Let Go", artist: "Ark Patrol", videoId: "Ts5ZiojkOe4" },
  { title: "drowning", artist: "vague003", videoId: "plffo_TlTYQ" },
  {
    title: "Sweet Dreams (Chainsaw Man Original Soundtrack)",
    artist: "Kensuke Ushio",
    videoId: "_U4FQmeYXwc",
  },
  { title: "closer (slowed down)", artist: "nuages", videoId: "ETkLGGxMEgU" },
  { title: "drifting", artist: "blut own", videoId: "-RO4OChykaA" },
  { title: "Comfort Chain", artist: "Instupendo", videoId: "8b-WwN4H7lE" },
  {
    title: "if it's real, then i'll stay",
    artist: "bonjr",
    videoId: "ZzarAeToKdo",
  },
  { title: "sleepless", artist: "ødyzon", videoId: "n9E7tOAvmKg" },
  {
    title: "snowfall",
    artist: "øneheart x reidenshi",
    videoId: "LlN8MPS7KQs",
  },
  {
    title: "i was only temporary (Slowed + Reverb)",
    artist: "my head is empty",
    videoId: "HndF_Abg0sI",
  },
  { title: "apathy", artist: "øneheart", videoId: "FgjA9EuxIlY" },
  {
    title: "hope to see you again",
    artist: "antent",
    videoId: "r9k74AGYZoU",
  },
  { title: "school rooftop", artist: "hisohkah", videoId: "Og6Yu54arDE" },
  {
    title: "never see you again",
    artist: "antent",
    videoId: "5TIGttuaLvI",
  },
  { title: "Idea 10", artist: "Gibran Alcocer", videoId: "5OIeIaAhQOg" },
  {
    title: "Fourth Of July",
    artist: "Sufjan Stevens",
    videoId: "JTeKpWp8Psw",
  },
  { title: "Dramamine", artist: "Flawed Mangoes", videoId: "UeSDvg5xsWI" },
  { title: "Numbers", artist: "TEMPOREX", videoId: "C87YnB58sKE" },
  {
    title: "Moog City 2 (Minecraft Volume Beta)",
    artist: "C418",
    videoId: "C8df2pbOX6g",
  },
  { title: "you not the same", artist: "tilekid", videoId: "i77S8l-7-3Y" },
  {
    title: "stellar",
    artist: ".diedlonely, énouement",
    videoId: "R1vx49mTtD0",
  },
  {
    title: "stuck inside my thoughts",
    artist: "futureville",
    videoId: "0d-btH4e14g",
  },
];
