import classNames from "classnames";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string to prevent duplicate class names in the final output.
 *
 * @param inputs - An array of class names.
 * @returns A string containing all the class names combined.
 */
export function cn(...inputs: classNames.ArgumentArray) {
  return twMerge(classNames(inputs));
}

export function getInitialsFromFullName(name: string) {
  const nameParts = name.split(" ");
  return nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0);
}

export function generateBrightColorFromString(text: string): string {
  const hashCode = (s: string): number => {
    let hash: number = 0;

    for (let i = 0; i < s.length; i++) {
      const charCode = s.charCodeAt(i);
      // Update the hash value by shifting it 5 bits to the left, subtracting the current hash value, and adding the Unicode value of the current character
      hash = (hash << 5) - hash + charCode;
    }

    return hash;
  };

  // Calculate a hash value from the text and take its absolute value
  const hash: number = Math.abs(hashCode(text));
  // Bitwise AND the hash value with 0x00ffffff to ensure only the lower 24 bits are used
  const color: string = (hash & 0x00ffffff).toString(16).toUpperCase();
  // Pad the resulting color code with zeros at the start if necessary to ensure it has 6 digits
  const paddedColor: string = color.padStart(6, "0");

  return `#${paddedColor}`;
}
