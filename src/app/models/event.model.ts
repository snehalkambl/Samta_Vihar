export interface EventImage {
  id?: number;
  imageUrl: string;
  displayOrder?: number;
}

export interface Event {
  id: number;

  title: string;
  shortDescription?: string;
  fullDescription?: string;

  eventDate: string;
  eventTime?: string;

  location?: string;

  amount?: number;
  isPaid: boolean;

  status: string;

  organizer?: string;
  speakerName?: string;

  contactPerson?: string;
  contactMobile?: string;

  rules?: string;

  coverImageUrl?: string;

  images?: EventImage[];
}