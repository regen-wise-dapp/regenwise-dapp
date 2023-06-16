import { Project } from './project';

export interface User {
  accountType: AccountType;
  date: Date;
  email: string;
  id: string;
  name: string;
  nftCids?: string[];
  image: string;
  points?: string;
  projects?: string[];
  projectObjects?: Project[];
  publicKeyH?: string;
  role: string;
  surname: string;
  userName?: string;
}

export type AccountType = 'free' | 'paid';
