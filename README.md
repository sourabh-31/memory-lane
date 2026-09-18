# 🌌 Memory Lane

**Memory Lane** is a small, imagined world built for one specific feeling: the quiet, floating calm of sitting somewhere unfamiliar with a good song on, waiting for something you can't quite name.

There's no login, no save state, no real "app" underneath it. It's a mood, dressed up as a music player.

## 📖 The story

This is the playlist of an outsider who keeps travelling to new worlds, looking for his own.

He does not remember leaving. Only that the sky was a different colour, and someone was waiting for him. So he keeps jumping, landing somewhere new, sitting on the nearest edge and staying until the feeling passes.

Every world is almost right. The light looks familiar, the roads run the way they should, but the moons are always wrong. What he feels is not really sadness. It is the way a dream slips away the moment you wake up.

These are the songs he keeps on while he waits for the next jump. Slow, warm and dream-like. Music for looking at a sky that is not yours.

## 🎧 Why the music matters

The whole project only works because of the playlist. Every track in [`src/data/tracks.ts`](src/data/tracks.ts) was picked for the same reason: it's slow, soft, a little melancholic, and never in a hurry to go anywhere. That's not a coincidence, it's the point.

The character in the story isn't running from anything, and he isn't panicking about being lost. He's just waiting, somewhere strange, calmly. Lo-fi and ambient tracks like these create exactly that headspace, unresolved but peaceful, homesick but not desperate. The music is the emotional explanation for the story, not just a soundtrack playing over it. Without it, "a man jumping between alien worlds looking for home" could read as a sci-fi premise. With it, it reads as a feeling.

Each world (currently **Solaris Prime** and **Solaris Minor**, see [`src/data/worlds.ts`](src/data/worlds.ts)) swaps the backdrop while the playlist keeps playing underneath — the scenery changes, the calm doesn't.

## 🛠️ What it's built with

Memory Lane is a small [Astro](https://astro.build) site, styled with Tailwind CSS, deployed on Cloudflare:

- **Astro** for the pages/components (`.astro` files in [`src/components/memory-lane`](src/components/memory-lane))
- **Tailwind CSS v4** for styling
- **Cloudflare adapter** ([`@astrojs/cloudflare`](astro.config.mjs)) for deployment via Wrangler
- Small client-side stores (`src/scripts/stores`) for the player, the active world, and panel state — no framework, just tiny vanilla modules
- Tracks are embedded via YouTube video IDs; there's no audio hosting of its own

## 🚀 Running it locally

```bash
pnpm install
pnpm dev
```

Other scripts:

```bash
pnpm build      # production build
pnpm preview    # preview the Cloudflare build locally
pnpm generate-types  # regenerate Wrangler/Cloudflare types
```

Requires Node `>=22.12.0`.

## ✨ Adding to the world

- **New track:** add an entry to `TRACKS` in [`src/data/tracks.ts`](src/data/tracks.ts) — just a title, artist, and YouTube video ID.
- **New world:** drop an image into `src/assets/images`, then add it to `WORLDS` in [`src/data/worlds.ts`](src/data/worlds.ts) with a name and coordinates.

If it doesn't feel calm, it probably doesn't belong here.

## 🤝 Contributing

Right now, world images are the only thing open to contributions (tracks aren't, yet). There are specific requirements for what makes a world fit, see [CONTRIBUTING.md](CONTRIBUTING.md) to learn more before submitting one.

## ☕ Support

If you find Memory Lane useful, consider [buying me a coffee](https://www.buymeacoffee.com/sourabh0003).

## 📄 License

This project is licensed under the [MIT License](LICENSE).
