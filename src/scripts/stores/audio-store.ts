import { TRACKS } from "../../data/tracks";

interface AudioState {
  i: number;
  time: number;
  dur: number;
  vol: number;
  muted: boolean;
  playing: boolean;
  started: boolean;
  missing: Record<number, boolean>;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

const state: AudioState = {
  i: 0,
  time: 0,
  dur: 0,
  vol: 0.7,
  muted: false,
  playing: false,
  started: false,
  missing: {},
};

const audio = new Audio();
audio.preload = "metadata";
audio.volume = state.vol;

const listeners = new Set<(state: AudioState) => void>();

function notify() {
  listeners.forEach((listener) => listener(state));
}

export function subscribeAudio(listener: (state: AudioState) => void) {
  listeners.add(listener);
  listener(state);
  return () => listeners.delete(listener);
}

export function currentTrack() {
  return TRACKS[state.i];
}

export function trackCount() {
  return TRACKS.length;
}

function load(index: number, autoplay: boolean) {
  const track = TRACKS[index];
  state.i = index;
  state.time = 0;
  state.dur = 0;
  notify();

  if (!track || !track.src) {
    audio.pause();
    state.playing = false;
    notify();
    return;
  }

  audio.src = track.src;
  if (autoplay) {
    audio.play().catch(() => {
      state.missing[index] = true;
      notify();
    });
  }
}

export function playTrack(index: number) {
  load(index, true);
}

export function goToTrack(direction: 1 | -1) {
  const count = trackCount();
  load((state.i + direction + count) % count, true);
}

export function togglePlayback() {
  if (!audio.src) {
    load(state.i, true);
    return;
  }
  if (audio.paused) {
    audio.play().catch(() => {
      state.missing[state.i] = true;
      notify();
    });
  } else {
    audio.pause();
  }
}

export function seekToFraction(fraction: number) {
  if (!state.dur) return;
  audio.currentTime = clamp(fraction, 0, 1) * state.dur;
}

export function setVolume(value: number) {
  const clamped = clamp(value, 0, 1);
  audio.volume = clamped;
  audio.muted = false;
  state.vol = clamped;
  state.muted = false;
  notify();
}

export function toggleMute() {
  state.muted = !state.muted;
  audio.muted = state.muted;
  notify();
}

audio.addEventListener("timeupdate", () => {
  state.time = audio.currentTime;
  notify();
});
audio.addEventListener("loadedmetadata", () => {
  state.dur = audio.duration;
  notify();
});
audio.addEventListener("ended", () => goToTrack(1));
audio.addEventListener("play", () => {
  state.playing = true;
  state.started = true;
  notify();
});
audio.addEventListener("pause", () => {
  state.playing = false;
  notify();
});
audio.addEventListener("error", () => {
  state.playing = false;
  state.missing[state.i] = true;
  notify();
});
