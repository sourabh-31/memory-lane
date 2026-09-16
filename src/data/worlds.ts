import type { ImageMetadata } from "astro";
import calix from "../assets/images/calix-7.avif";
import solaris from "../assets/images/solaris.avif";

export interface World {
  name: string;
  coords: string;
  image: ImageMetadata;
}

export const WORLDS: World[] = [
  { name: "Calix 7", coords: "31.62°N  74.88°E", image: calix },
  { name: "Solaris Epidermus", coords: "19.07°N  72.87°E", image: solaris },
];
