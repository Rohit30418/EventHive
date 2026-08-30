export interface Registration {
  regId: string;
  eventId: string;
  id?: string;
  fullName?: string;
  email?: string;
  mobile?: string;
  designation?: string;
  dob?: string;
  gender?: string;
  photo?: string;
  interests?: string[];
  consent?: boolean;
  timestamp?: string;
}
