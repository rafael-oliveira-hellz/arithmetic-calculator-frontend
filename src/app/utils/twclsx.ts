import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines Tailwind classes while merging any conflicting ones
 * @param args - The class values to be merged
 * @returns A single merged class string
 */
export const twclsx = (...args: ClassValue[]): string => {
  return twMerge(clsx(...args));
};
