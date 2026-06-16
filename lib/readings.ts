import { type Reading } from "./utils";
import readingsData from "@/data/readings.json";

export const readings = readingsData as Reading[];

export function getImageIndex(readingIndex: number, totalImages = 50): number | null {
  const imageIdx = readingIndex + 1;
  if (imageIdx <= totalImages) return imageIdx;
  return null;
}
