import { Project } from './project';

export interface User {
  date: Date;
  email: string;
  id: string;
  name: string;
  nftCids?: string[];
  image: string;
  points?: string;
  projects?: string[];
  projectsObjects?: Project[];
  publicKeyH?: string;
  role: string;
  surname: string;
  userName?: string;
}