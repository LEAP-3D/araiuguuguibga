import type { Pet } from "../_components/types";
export const mockPets: Pet[] = [
  {
    id: "1",
    name: "Buddy",
    breed: "Golden Retriever",
    age: "2 years",
    type: "dog",
    description:
      "A gentle and loving companion who enjoys long walks and cuddles.",
    location: "San Francisco, CA",
    image: "🐕",
    featured: true,
    distance: "2 years",
  },
  {
    id: "2",
    name: "Luna",
    breed: "Siamese",
    age: "1 year",
    type: "cat",
    description:
      "A calm and elegant lady who loves to play with feathers and pompoms.",
    location: "Oakland, CA",
    image: "🐱",
    distance: "1 year",
  },
  {
    id: "3",
    name: "Max",
    breed: "German Shepherd",
    age: "3 years",
    type: "dog",
    description: "Intelligent and loyal, great with families and children.",
    location: "San Jose, CA",
    image: "🦮",
    distance: "3 years",
  },
  {
    id: "4",
    name: "Charlie",
    breed: "Beagle",
    age: "4 years",
    type: "dog",
    description: "Curious and playful, loves to explore and sniff around.",
    location: "Palo Alto, CA",
    image: "🐶",
    distance: "4 years",
  },
  {
    id: "5",
    name: "Mochi",
    breed: "Scottish Fold",
    age: "8 months",
    type: "cat",
    description: "Sweet and affectionate, enjoys napping in sunny spots.",
    location: "Berkeley, CA",
    image: "🐱",
    distance: "8 months",
  },
  {
    id: "6",
    name: "Rocky",
    breed: "Husky",
    age: "2 years",
    type: "dog",
    description: "Gentle giant with a heart of gold, loves belly rubs.",
    location: "Fremont, CA",
    image: "🐺",
    distance: "2 years",
  },
  {
    id: "7",
    name: "Bella",
    breed: "Maine Coon",
    age: "1 year",
    type: "cat",
    description: "Majestic and friendly, gets along with other pets.",
    location: "Sunnyvale, CA",
    image: "🐈",
    distance: "1 year",
  },
  {
    id: "8",
    name: "Coco",
    breed: "Rescue Cat",
    age: "6 months",
    type: "cat",
    description: "Playful kitten looking for a loving home.",
    location: "San Mateo, CA",
    image: "🐈",
    distance: "6 months",
  },
];
export type Stats = {
  value: string;
  label: string;
  icon: string;
};

export type PetProfile = {
  id: string;
  name: string;
  breed: string;
  emoji: string;
  vetsNearby: number;
  gradient: string;
};
