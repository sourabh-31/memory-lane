# Contributing to Memory Lane

Right now, the only thing you can contribute is a **new world**. Tracks aren't open to contributions yet, please don't submit PRs adding songs to [`src/data/tracks.ts`](src/data/tracks.ts).

A world is one image plus one entry in [`src/data/worlds.ts`](src/data/worlds.ts). That's it. But the image has to earn its place, so read the requirements below before you start generating.

## 🪐 What a world is

Each world is a backdrop the character lands on between songs: he's sitting somewhere alien, waiting, and we're looking at the view from where he's sitting. The image is the world, so it has to hold up as the only thing on screen for a while.

## ✅ Requirements

### 1. The armored knight must be front and center

Every world has the same figure in it: an armored knight, seated or standing, watching the world in front of him. He is not a small detail hidden in a corner, he is the focal point of the composition, clearly rendered, easy to pick out at a glance. Think of him as a **watcher**, not a participant. He isn't fighting anything or interacting with the world, he's just present in it, observing.

- He should be large and legible enough to read instantly, not a silhouette you have to search for.
- Keep his design consistent with a knight in armor (i.e. don't reinterpret him as some other kind of character).
- He should feel still and calm, in keeping with the mood of the project, not dynamic or mid-action.

### 2. The world must not look like Earth

Nothing about the setting should read as "a place on Earth." Every element is a chance to make it alien:

- **Sky / atmosphere**: different color, density, cloud behavior, or lighting than a normal Earth sky.
- **Moons**: the existing worlds all lean on a wrong-looking moon (or several) as a signature detail. Consider what's up there instead of one familiar moon.
- **Architecture / environment**: buildings, terrain, vegetation, and structures should feel like they belong to a different civilization or a different planet's physics, not Earth cities or Earth nature with a color filter on top.

The goal is "almost right, but the moons are always wrong," per the [README](README.md), not generic fantasy or generic sci-fi.

### 3. The image must be well-crafted, not AI slop

Submissions are expected to be generated with an AI image platform (ChatGPT/DALL·E, Midjourney, etc.), that's fine and expected. What's not fine is a result that reads as obviously broken:

- No warped anatomy, melted armor, nonsensical architecture, or garbled detail.
- Composition should clearly and coherently convey what it's supposed to: a knight, watching, in a distinct alien landscape. A viewer should be able to tell what they're looking at in a couple of seconds.
- Prefer a smaller number of clean, well-composed generations over a large batch, iterate and pick the one that actually holds up at full size.
- Export as `.avif` and drop it into [`src/assets/images`](src/assets/images).

If it looks like "AI slop", it won't be merged, quality bar comes before novelty.

### 4. Name the world and give it coordinates

Every world needs:

- **A name** that sounds like it could exist somewhere in a wider universe of worlds, not a literal Earth place name. Look at the existing set for tone: `Solaris Prime`, `Korvath`, `Meridian Crest`.
- **Coordinates**, in the same style as the existing entries (`"6.19°N  88.51°E"`), made up, but formatted like real latitude/longitude.

## 🚀 How to submit

1. Generate your image and export it as `.avif`.
2. Add it to [`src/assets/images`](src/assets/images), named after the world (e.g. `korvath.avif`).
3. Add an entry to `WORLDS` in [`src/data/worlds.ts`](src/data/worlds.ts):

```ts
{ name: "Your World Name", coords: "12.34°N  56.78°W", image: yourWorldImage },
```

(don't forget the import at the top of the file)

4. Open a PR with the image and the data change together. Include the prompt or a short description of how you generated the image, it helps if it needs a re-roll.

If it doesn't feel calm, alien, and clearly a knight watching a world that isn't ours, it probably doesn't belong here.
