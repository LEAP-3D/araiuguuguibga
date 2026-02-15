// types/post.ts
// Complete Post type with all fields

export type AnimalType = 'dog' | 'cat' | 'other';
export type AnimalSize = 'small' | 'medium' | 'large' | 'extra-large';
export type PostType = 'lost' | 'found';

export type Post = {
  id: string;
  
  // Basic Info
  name: string;
  type: AnimalType;
  breed: string;
  age: string;
  
  // Physical Description
  color: string;
  size: AnimalSize;
  description: string;
  
  // Location & Images
  location: string;
  image: string; // Primary image (for backward compatibility)
  imagePreviews: string[]; // All images including primary
  
  // Contact Information
  contactName: string;
  contactPhone: string;
  contactNotes: string;
  
  // Post Metadata
  postType: PostType; // Whether this is a lost or found animal
  createdAt?: string;
  userId?: string;
}

// Form state type for AddPostForm
export type FormState  = {
  petName: string;
  breed: string;
  age: string;
  size: AnimalSize;
  color: string;
  type: AnimalType;
  description: string;
  location: { lat: number; lng: number } | null;
  imagePreviews: string[];
  contactName: string;
  contactPhone: string;
  contactNotes: string;
}