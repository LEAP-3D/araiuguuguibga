export type Pet = {
  id: string;
  name: string;
  breed: string;
  age: string; // keeping string to match your input value
  weight?: string; // optional, from your form
  type: 'dog' | 'cat' | 'bird' | 'other';
  gender?: 'Em' | 'Er'; // optional, from your form
  note?: string; // optional, from your form
  description?: string; // if you use a description field
  location?: string; // optional
  image: string;
  featured?: boolean;
  distance?: string;
};

export type PetAnalysisResult = {
  general: {
    breed: string;
    age: string;
    weight: string;
    foodGramsPerDay: number;
    feedingTimesPerDay: number;
    foodType: string;
    forbiddenFoods: string;
  };
  care: {
    neutering: string;
    bathing: string;
    nails: string;
  };
  recommendations: {
    vaccines: string;
    deworming: string;
    extraTips: string;
  };
};

export type Veterinary = {
  id: string;
  name: string;
  rating: number;
  distance?: string;
  address: string;
  city?: string;
  state?: string;
  services: string[];
  hours?: string;
  isOpen: boolean;
  emergency?: boolean;
  phone: string[];
  category?: string[];
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

export type PawPrint = {
  id: number;
  x: number;
  y: number;
  rotation: number;
  size: number;
  isLeft: boolean;
};

export type Trail = {
  id: number;
  prints: PawPrint[];
};

export const STEP_INTERVAL = 0.4; // Алхаа хоорондын хугацаа (секунд)
export const PAW_LIFETIME = 5;
