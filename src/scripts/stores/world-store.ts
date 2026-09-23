import { WORLDS } from "../../data/worlds";
import { ensurePlaying } from "./audio-store";

// Must match the fade duration used by the world text (MemoryLaneApp.astro)
// and background layers (WorldBackdrop.astro) so both transition in sync.
const JUMP_TRANSITION_MS = 550;
const AUTO_JUMP_INTERVAL_MS = 30000;

interface WorldState {
  index: number;
  jumping: boolean;
}

const state: WorldState = { index: 0, jumping: false };
const listeners = new Set<(state: WorldState) => void>();

function notify() {
  listeners.forEach((listener) => listener(state));
}

export function subscribeWorld(listener: (state: WorldState) => void) {
  listeners.add(listener);
  listener(state);
  return () => listeners.delete(listener);
}

export function currentWorld() {
  return WORLDS[state.index % WORLDS.length];
}

let autoJumpTimer: number | undefined;

function advanceWorld() {
  if (state.jumping) return;
  state.jumping = true;
  notify();

  setTimeout(() => {
    state.index = (state.index + 1) % WORLDS.length;
    state.jumping = false;
    notify();
  }, JUMP_TRANSITION_MS);
}

export function startAutoJump() {
  window.clearInterval(autoJumpTimer);
  autoJumpTimer = window.setInterval(advanceWorld, AUTO_JUMP_INTERVAL_MS);
}

export function jumpWorld() {
  if (state.jumping) return;
  advanceWorld();
  ensurePlaying();
  // Restart the countdown so a manual jump isn't followed by an auto one right away.
  startAutoJump();
}
