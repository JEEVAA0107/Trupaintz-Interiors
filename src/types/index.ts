export type ProjectCategory = 'all' | 'living' | 'kitchen' | 'texture' | 'bedroom' | 'commercial';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  location: string;
  scope: string;
  duration: string;
  sqft: number;
  featured: boolean;
  image: string;
  beforeImage?: string;
  gallery: string[];
  materials: string[];
  clientReview?: {
    quote: string;
    author: string;
    rating: number;
  };
  description: string;
  palette: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  priceRange: string;
  image: string;
  highlightTag: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedDate: string;
  image: string;
  content: string[];
  keyTakeaways: string[];
}

export interface BookingSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  propertyType: string;
  serviceRequired: string;
  tier: string;
  estimatedBudget: number;
  approxSqFt: number;
  preferredDate: string;
  preferredTime: string;
  address: string;
  notes?: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'project' | 'booking' | 'system' | 'email';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'manager' | 'guest';
  avatar?: string;
  projectAssigned?: string;
}

export type MilestoneStatus = 
  | 'In Progress' 
  | 'Material Sourcing' 
  | 'Execution Phase' 
  | 'Completed' 
  | 'Pending';

export interface MilestoneSubtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface ProjectMilestone {
  id?: string;
  stage: string;
  phaseCategory?: string;
  status: MilestoneStatus | 'completed' | 'in_progress' | 'pending';
  completionPercent: number;
  startDate?: string;
  targetDate: string;
  notes: string;
  leadArtisan?: string;
  subtasks?: MilestoneSubtask[];
  photos?: string[];
}

export interface ClientProject {
  id: string;
  projectName: string;
  clientName: string;
  location: string;
  managerName: string;
  startDate: string;
  estimatedFinish: string;
  overallProgress: number;
  contractValue: number;
  amountPaid: number;
  milestones: ProjectMilestone[];
  selectedColors: { name: string; hex: string; room: string }[];
  liveUpdates: {
    id: string;
    date: string;
    text: string;
    image?: string;
  }[];
}

export interface ClientReviewItem {
  id: string;
  clientName: string;
  projectName: string;
  milestoneReviewed: string;
  rating: number; // 1 to 5
  title: string;
  comment: string;
  location: string;
  createdAt: string;
  verified: boolean;
  aspects?: {
    craftsmanship: number;
    punctuality: number;
    cleanliness: number;
  };
}

export interface ServiceCostLineItem {
  code: string;
  category: string;
  description: string;
  unit: string;
  rate: number;
  quantity: number;
  total: number;
}

export interface LoyaltyReward {
  id: string;
  title: string;
  category: string;
  pointsCost: number;
  valueINR: number;
  description: string;
  tag: string;
}

export interface LoyaltyTransaction {
  id: string;
  title: string;
  type: 'earned' | 'redeemed';
  points: number;
  date: string;
  voucherCode?: string;
}

export interface ClientReferral {
  id: string;
  name: string;
  phone: string;
  property: string;
  status: 'Invited' | 'Site Visit Booked' | 'Project Commenced';
  pointsPending: number;
  date: string;
}

export interface PhaseBudgetBreakdown {
  id: string;
  phaseName: string;
  phaseCode: string;
  category: string;
  allocatedAmount: number;
  spentAmount: number;
  status: 'Reconciled' | 'In Execution' | 'Material Procured' | 'Initial Stage' | 'Pending';
  description: string;
  materialSpent: number;
  laborSpent: number;
}

export interface ProjectDocumentItem {
  id: string;
  title: string;
  category: 'Contracts & Warranties' | 'Architectural Drawings' | 'Audit Reports' | 'Invoices & Receipts';
  documentType: string;
  size: string;
  dateUploaded: string;
  referenceNumber: string;
  issuer: string;
  status: 'Verified' | 'Signed' | 'Active' | 'Paid';
  description: string;
  fileUrl?: string;
  previewContent?: string;
}

export interface ProjectProgressPhoto {
  id: string;
  title: string;
  url: string;
  stage: string;
  room: string;
  uploadedAt: string;
  uploadedBy: string;
  pmNote: string;
  tags: string[];
  inspectionVerified: boolean;
}




