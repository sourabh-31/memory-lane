import type { ImageMetadata } from "astro";

import solarisPrime from "../assets/images/solaris-prime.avif";
import solarisMinor from "../assets/images/solaris-minor.avif";

export interface World {
  name: string;
  coords: string;
  image: ImageMetadata;
}

export const WORLDS: World[] = [
  { name: "Solaris Prime", coords: "31.62°N  74.88°E", image: solarisPrime },
  { name: "Solaris Minor", coords: "19.07°N  72.87°E", image: solarisMinor },
];
