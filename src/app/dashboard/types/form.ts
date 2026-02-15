export type AnimalType = 'dog' | 'cat' | 'bird' | 'rabbit' | 'other';
export type AnimalSize = 'small' | 'medium' | 'large' | 'extra-large';

export type LocationType = {
  lat: number;
  lng: number;
};

export type LostPetForm = {
  petName: string;
  breed: string;
  age: string;
  size: AnimalSize;
  color: string;
  type: AnimalType;
  description: string;

  location: LocationType | null;

  imagePreviews: string[];

  contactName: string;
  contactPhone: string;
  contactNotes: string;
};
