import type { ImageMetadata } from "astro";

import solarisPrime from "../assets/images/solaris-prime.avif";
import korvath from "../assets/images/korvath.avif";
import meridianCrest from "../assets/images/meridian-crest.avif";
import obsidra from "../assets/images/obsidra.avif";
import selune from "../assets/images/selune.avif";
import arkanePrime from "../assets/images/arkane-prime.avif";
import veloran from "../assets/images/veloran.avif";
import meridianBay from "../assets/images/meridian-bay.avif";
import nautilon from "../assets/images/nautilon.avif";
import granmar from "../assets/images/granmar.avif";

export interface World {
  name: string;
  coords: string;
  image: ImageMetadata;
}

export const WORLDS: World[] = [
  { name: "Solaris Prime", coords: "12.47°S  103.29°W", image: solarisPrime },
  { name: "Korvath", coords: "4.1°S  62.7°E", image: korvath },
  { name: "Meridian Crest", coords: "6.19°N  88.51°E", image: meridianCrest },
  { name: "Obsidra", coords: "58.02°N  121.36°E", image: obsidra },
  { name: "Selune", coords: "9.73°N  47.15°W", image: selune },
  { name: "Arkane Prime", coords: "22.56°S  76.94°W", image: arkanePrime },
  { name: "Veloran", coords: "67.24°S  34.70°E", image: veloran },
  { name: "Meridian Bay", coords: "36.85°N  22.41°W", image: meridianBay },
  { name: "Nautilon", coords: "51.09°S  164.73°E", image: nautilon },
  { name: "Granmar", coords: "14.62°N  38.05°E", image: granmar },
];
