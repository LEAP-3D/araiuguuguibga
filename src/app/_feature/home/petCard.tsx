export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  type: "dog" | "cat" | "other";
  description: string;
  location: string;
  image: string;
  featured?: boolean;
  distance?: string;
}

export interface Veterinary {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  distance: string;
  address: string;
  city: string;
  state: string;
  services: string[];
  hours?: string;
  isOpen: boolean;
  emergency?: boolean;
  phone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface FilterCategory {
  id: string;
  label: string;
  value: "all" | "dog" | "cat" | "other";
  icon: string;
}

export interface Stats {
  value: string;
  label: string;
  icon: string;
}
