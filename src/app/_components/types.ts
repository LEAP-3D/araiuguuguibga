export type Pet = {
  id: string;
  name: string;
  breed: string;
  age: string; // keeping string to match your input value
  weight?: string; // optional, from your form
  type: 'dog' | 'cat' | 'bird' | 'other';
  gender?: 'Em' | 'Er'; // optional, from your form
  note?: string; // optional, from your form
  allergies?: string; // optional
  microchip?: string; // optional
  description?: string; // if you use a description field
  location?: string; // optional
  image: string;
  featured?: boolean;
  distance?: string;
};

export type Veterinary = {
  id: string;
  name: string;
  rating: number;
  reviewCount?: number;
  distance?: string;
  address: string;
  city?: string;
  state?: string;
  services: string[];
  hours?: string;
  isOpen: boolean;
  emergency?: boolean;
  phone: string;
  category?: 'emneleg' | 'klinik' | 'yaaraltai' | 'emiin_san';
  lat: number;
  lng: number;
};

export type FilterCategory = {
  id: string;
  label: string;
  value: 'all' | 'dog' | 'cat' | 'other';
  icon: string;
};

export type Stats = {
  value: string;
  label: string;
  icon: string;
};
