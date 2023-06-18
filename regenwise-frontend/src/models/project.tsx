import { Concept } from "./concept";

export interface Project {
  adderPublicKeyH: string;
  address: string;
  approvalStatus: ApprovalStatus;
  cid: string;
  city: string;
  concepts: string[];
  contactEmail: string;
  country: string;
  date: number | string | Date;
  description: string[];
  ghgPuller: string;
  id: string;
  implementers: string;
  isInstutional: boolean;
  likes: number;
  link: string;
  name: string;
  state: string;
  status: string;
  conceptsObjects: Concept[];
}

export type ApprovalStatus = 'Pending' | 'Approved' | 'Rejected';
