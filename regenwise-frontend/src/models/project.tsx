export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  author: string;
  minutes: number,
  likes: number,
  read: number,
  date: string;
  readTime: string;
  tags: string[];
  views: number;
  categories: string[];
}
