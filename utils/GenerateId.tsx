import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

let counter = 0;

export function generateId(): string {
  const timestamp = Date.now().toString(36);
  counter = (counter + 1) % 1000;
  const paddedCounter = counter.toString().padStart(3, '0');
  return `${timestamp}-${paddedCounter}`;
}