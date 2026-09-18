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

interface YTPlayer {
  loadVideoById(videoId: string): void;
  cueVideoById(videoId: string): void;
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  setVolume(volume: number): void;
  mute(): void;
  unMute(): void;
  getDuration(): number;
  getCurrentTime(): number;
  getPlayerState(): number;
}

declare global {
  interface Window {
    YT?: { Player: new (host: HTMLElement, options: unknown) => YTPlayer };
    onYouTubeIframeAPIReady: () => void;
  }
}

const PROGRESS_INTERVAL_MS = 400;

const PLAYER_STATE = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
};

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

let player: YTPlayer | null = null;
let playerReady = false;
let hasLoadedTrack = false;
let pendingLoad: { index: number; autoplay: boolean } | null = null;
let pendingSeekFraction: number | null = null;
let progressTimer: number | null = null;
let scrubbing = false;

function applyPendingSeek() {
  if (pendingSeekFraction === null || !player || !state.dur) return;
  const seconds = clamp(pendingSeekFraction, 0, 1) * state.dur;
  player.seekTo(seconds, true);
  state.time = seconds;
  pendingSeekFraction = null;
}

function loadIframeApi() {
  if (document.getElementById("ml-yt-iframe-api")) return;
  const script = document.createElement("script");
  script.id = "ml-yt-iframe-api";
  script.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(script);
}

function createPlayerHost(): HTMLElement {
  const host = document.createElement("div");
  host.id = "ml-yt-host";
  Object.assign(host.style, {
    position: "fixed",
    left: "0",
    bottom: "0",
    width: "2px",
    height: "2px",
    opacity: "0",
    pointerEvents: "none",
  });
  document.body.appendChild(host);
  return host;
}

function startProgressTimer() {
  stopProgressTimer();
  progressTimer = window.setInterval(() => {
    if (!player || scrubbing) return;
    state.time = player.getCurrentTime() || 0;
    notify();
  }, PROGRESS_INTERVAL_MS);
}

function stopProgressTimer() {
  if (progressTimer !== null) {
    clearInterval(progressTimer);
    progressTimer = null;
  }
}

function initPlayer() {
  const host = createPlayerHost();
  player = new window.YT!.Player(host, {
    width: "2",
    height: "2",
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      playsinline: 1,
      modestbranding: 1,
      rel: 0,
    },
    events: {
      onReady: () => {
        playerReady = true;
        player!.setVolume(Math.round(state.vol * 100));
        if (pendingLoad) {
          const { index, autoplay } = pendingLoad;
          pendingLoad = null;
          load(index, autoplay);
        }
      },
      onStateChange: (event: { data: number }) => {
        if (event.data === PLAYER_STATE.PLAYING) {
          state.playing = true;
          state.started = true;
          state.dur = player!.getDuration() || state.dur;
          applyPendingSeek();
          startProgressTimer();
        } else if (event.data === PLAYER_STATE.PAUSED) {
          state.playing = false;
          stopProgressTimer();
        } else if (event.data === PLAYER_STATE.ENDED) {
          state.playing = false;
          stopProgressTimer();
          goToTrack(1);
          return;
        } else if (event.data === PLAYER_STATE.CUED) {
          state.dur = player!.getDuration() || 0;
          applyPendingSeek();
        }
        notify();
      },
      onError: () => {
        state.missing[state.i] = true;
        state.playing = false;
        stopProgressTimer();
        notify();
      },
    },
  });
}

if (typeof window !== "undefined") {
  window.onYouTubeIframeAPIReady = initPlayer;
  if (window.YT?.Player) {
    initPlayer();
  } else {
    loadIframeApi();
  }
}

function load(index: number, autoplay: boolean) {
  const track = TRACKS[index];
  state.i = index;
  state.time = 0;
  state.dur = 0;
  notify();

  if (!track || !track.videoId) {
    stopProgressTimer();
    state.playing = false;
    notify();
    return;
  }

  if (!playerReady || !player) {
    pendingLoad = { index, autoplay };
    return;
  }

  hasLoadedTrack = true;
  if (autoplay) {
    player.loadVideoById(track.videoId);
  } else {
    player.cueVideoById(track.videoId);
  }
}

export function playTrack(index: number) {
  load(index, true);
}

export function goToTrack(direction: 1 | -1) {
  const count = trackCount();
  load((state.i + direction + count) % count, true);
}

export function ensurePlaying() {
  if (state.playing) return;
  togglePlayback();
}

export function togglePlayback() {
  if (!playerReady || !player || !hasLoadedTrack) {
    load(state.i, true);
    return;
  }
  if (player.getPlayerState() === PLAYER_STATE.PLAYING) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
}

export function setScrubbing(value: boolean) {
  scrubbing = value;
}

export function previewSeekFraction(fraction: number) {
  if (!state.dur) return;
  state.time = clamp(fraction, 0, 1) * state.dur;
  notify();
}

export function seekToFraction(fraction: number) {
  const clamped = clamp(fraction, 0, 1);

  // Nothing has ever been loaded — start playback and remember where to
  // land once we actually know the track's duration.
  if (!hasLoadedTrack) {
    pendingSeekFraction = clamped;
    load(state.i, true);
    return;
  }

  if (!playerReady || !player || !state.dur) {
    // Loading is already in flight but metadata hasn't arrived yet.
    pendingSeekFraction = clamped;
    return;
  }

  const seconds = clamped * state.dur;
  player.seekTo(seconds, true);
  state.time = seconds;
  notify();
}

export function setVolume(value: number) {
  const clamped = clamp(value, 0, 1);
  state.vol = clamped;
  state.muted = false;
  if (playerReady && player) {
    player.setVolume(Math.round(clamped * 100));
    // unMute() at volume 0 gets treated as an invalid/ambiguous state by the
    // embedded player and it silently floors the volume back up — so a drag
    // down to silence has to go through mute() instead, same as the button.
    if (clamped <= 0) {
      player.mute();
    } else {
      player.unMute();
    }
  }
  notify();
}

export function toggleMute() {
  state.muted = !state.muted;
  if (playerReady && player) {
    if (state.muted) {
      // mute()/isMuted() alone can get out of sync with actual output on the
      // embedded player, so also drive the numeric volume down as the
      // authoritative signal.
      player.mute();
      player.setVolume(0);
    } else {
      player.unMute();
      player.setVolume(Math.round(state.vol * 100));
    }
  }
  notify();
}
