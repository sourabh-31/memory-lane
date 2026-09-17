import type { ImageMetadata } from "astro";

import solmarisPrime from "../assets/images/solmaris-prime.avif";
import solmarisMinor from "../assets/images/solmaris-minor.avif";

export interface World {
  name: string;
  coords: string;
  image: ImageMetadata;
}

export const WORLDS: World[] = [
  { name: "Solmaris Prime", coords: "31.62°N  74.88°E", image: solmarisPrime },
  { name: "Solmaris Minor", coords: "19.07°N  72.87°E", image: solmarisMinor },
];
