import type { ImageMetadata } from "astro";

import solarisPrime from "../assets/images/solaris-prime.avif";
import korvath from "../assets/images/korvath.avif";
import meridianCrest from "../assets/images/meridian-crest.avif";

export interface World {
  name: string;
  coords: string;
  image: ImageMetadata;
}

export const WORLDS: World[] = [
  { name: "Solaris Prime", coords: "12.47°S  103.29°W", image: solarisPrime },
  { name: "Korvath", coords: "4.1°S  62.7°E", image: korvath },
  { name: "Meridian Crest", coords: "6.19°N  88.51°E", image: meridianCrest },
];
