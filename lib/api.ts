// lib/api.ts
import fs from 'fs';
import path from 'path';

export async function getPages() {
  // Read the pages.json file from the public directory
  const filePath = path.join(process.cwd(), 'public', 'pages.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const pages = JSON.parse(fileContents);
  return pages;
}