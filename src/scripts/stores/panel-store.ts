export type Panel = "queue" | "about" | null;

let panel: Panel = null;
const listeners = new Set<(panel: Panel) => void>();

function notify() {
  listeners.forEach((listener) => listener(panel));
}

export function subscribePanel(listener: (panel: Panel) => void) {
  listeners.add(listener);
  listener(panel);
  return () => listeners.delete(listener);
}

export function togglePanel(next: Exclude<Panel, null>) {
  panel = panel === next ? null : next;
  notify();
}

export function closePanel() {
  panel = null;
  notify();
}
