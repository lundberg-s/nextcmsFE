declare global {
  interface Page {
    id: string;
    title: string;
    slug: string;
    blocks: Block[];
  }
}

export {}; 