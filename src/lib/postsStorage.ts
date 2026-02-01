export type Post = {
  id: string;
  name: string;
  breed: string;
  age: string;
  type: "dog" | "cat" | "other";
  description: string;
  location: string;
  image: string;
  createdAt: number;
};

export type MyPet = {
  id: string;
  name: string;
  breed: string;
  age: string;
  type: "dog" | "cat" | "other";
  image: string;
  vaccines: { vaccine: string; date: string; nextDue: string }[];
  history: { event: string; date: string; petId: string }[];
  createdAt: number;
};

const STORAGE_KEY = "user-posts";
const MYPETS_STORAGE_KEY = "user-my-pets";

export function loadPosts(): Post[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function savePosts(posts: Post[]): boolean {
  if (typeof window === "undefined") return false;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return true;
  } catch (e) {
    console.error("Failed to save posts:", e);
    return false;
  }
}

export function loadMyPets(): MyPet[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(MYPETS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveMyPets(pets: MyPet[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(MYPETS_STORAGE_KEY, JSON.stringify(pets));
  } catch (e) {
    console.error("Failed to save my pets:", e);
  }
}

export function clearPostsStorage() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
}
