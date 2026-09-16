import type { ImageMetadata } from "astro";
import vsa217b from "../assets/images/vsa-217b.avif";
import vsa3011d from "../assets/images/vsa-3011d.avif";

export interface World {
  name: string;
  coords: string;
  image: ImageMetadata;
}

export const WORLDS: World[] = [
  { name: "VSA-217B", coords: "31.62°N  74.88°E", image: vsa217b },
  { name: "VSA-3011D", coords: "19.07°N  72.87°E", image: vsa3011d },
];
