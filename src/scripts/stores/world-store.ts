import { WORLDS } from "../../data/worlds";
import { ensurePlaying } from "./audio-store";

// Must match the fade duration used by the world text (MemoryLaneApp.astro)
// and background layers (WorldBackdrop.astro) so both transition in sync.
const JUMP_TRANSITION_MS = 550;

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

export function jumpWorld() {
  if (state.jumping) return;
  state.jumping = true;
  notify();
  ensurePlaying();

  setTimeout(() => {
    state.index = (state.index + 1) % WORLDS.length;
    state.jumping = false;
    notify();
  }, JUMP_TRANSITION_MS);
}
