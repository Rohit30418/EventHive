export interface Speaker {
  speakerName: string;
  speakerDesignation: string;
  speakerImage?: string;
}

export interface EventType {
  id: string;
  EventName: string;
  eventName?: string;
  title?: string;
  banner?: string;
  eventType?: string;
  category?: string;
  location?: string;
  eventDate: string;
  description?: string;
  ShortDesc?: string;
  BannerTagLine?: string;
  AboutArea?: string;
  PrimaryColor?: string;
  SecondaryColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  userId?: string;
  organizerName?: string;
  organizerEmail?: string;
  organizerPhone?: string;
  logo?: string;
  logoUrl?: string;
  color?: string;
  createdAt?: string;
  speakers?: Speaker[];
}

export type MicrositeEvent = Omit<EventType, "id"> & {
  id?: string;
  eventId?: string;
};
