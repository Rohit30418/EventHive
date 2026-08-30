export interface Organizer {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  dob?: string;
  isApproved: boolean;
  role?: string;
  subscriptionStatus?: string;
  paymentMethod?: string;
  paymentAmount?: number;
  createdAt?: string;
}
