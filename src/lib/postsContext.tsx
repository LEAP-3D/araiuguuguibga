"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const STORAGE_KEY = "user-posts";
const MYPETS_STORAGE_KEY = "user-my-pets";

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

export type VaccineRecord = {
  vaccine: string;
  date: string;
  nextDue: string;
};

export type HistoryEvent = {
  event: string;
  date: string;
  petId: string;
};

export type MyPet = {
  id: string;
  name: string;
  breed: string;
  age: string;
  type: "dog" | "cat" | "other";
  image: string;
  vaccines: VaccineRecord[];
  history: HistoryEvent[];
  createdAt: number;
};

type PostsContextType = {
  posts: Post[];
  addPost: (post: Omit<Post, "id" | "createdAt">) => boolean;
  clearPosts: () => void;
  myPets: MyPet[];
  addMyPet: (pet: Omit<MyPet, "id" | "vaccines" | "history" | "createdAt">) => void;
  addVaccine: (petId: string, vaccine: VaccineRecord) => void;
  addHistoryEvent: (petId: string, event: Omit<HistoryEvent, "petId">) => void;
};

const PostsContext = createContext<PostsContextType | null>(null);

function loadPosts(): Post[] {
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

function savePosts(posts: Post[]): boolean {
  if (typeof window === "undefined") return false;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return true;
  } catch (e) {
    console.error("Failed to save posts:", e);
    return false;
  }
}

function generateId() {
  return `post_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function loadMyPets(): MyPet[] {
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

function saveMyPets(pets: MyPet[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(MYPETS_STORAGE_KEY, JSON.stringify(pets));
  } catch (e) {
    console.error("Failed to save my pets:", e);
  }
}

function generatePetId() {
  return `pet_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function PostsProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [myPets, setMyPets] = useState<MyPet[]>([]);

  useEffect(() => {
    setPosts(loadPosts());
    setMyPets(loadMyPets());
  }, []);

  const addPost = useCallback((post: Omit<Post, "id" | "createdAt">): boolean => {
    const newPost: Post = {
      ...post,
      id: generateId(),
      createdAt: Date.now(),
    };
    let success = false;
    setPosts((prev) => {
      const next = [newPost, ...prev];
      success = savePosts(next);
      return success ? next : prev;
    });
    return success;
  }, []);

  const clearPosts = useCallback(() => {
    setPosts([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const addMyPet = useCallback(
    (pet: Omit<MyPet, "id" | "vaccines" | "history" | "createdAt">) => {
      const newPet: MyPet = {
        ...pet,
        id: generatePetId(),
        vaccines: [],
        history: [],
        createdAt: Date.now(),
      };
      setMyPets((prev) => {
        const next = [newPet, ...prev];
        saveMyPets(next);
        return next;
      });
    },
    []
  );

  const addVaccine = useCallback((petId: string, vaccine: VaccineRecord) => {
    setMyPets((prev) => {
      const next = prev.map((p) =>
        p.id === petId ? { ...p, vaccines: [...p.vaccines, vaccine] } : p
      );
      saveMyPets(next);
      return next;
    });
  }, []);

  const addHistoryEvent = useCallback(
    (petId: string, event: Omit<HistoryEvent, "petId">) => {
      setMyPets((prev) => {
        const next = prev.map((p) =>
          p.id === petId
            ? { ...p, history: [...p.history, { ...event, petId }] } : p
        );
        saveMyPets(next);
        return next;
      });
    },
    []
  );

  return (
    <PostsContext.Provider
      value={{
        posts,
        addPost,
        clearPosts,
        myPets,
        addMyPet,
        addVaccine,
        addHistoryEvent,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const ctx = useContext(PostsContext);
  if (!ctx) {
    throw new Error("usePosts must be used within PostsProvider");
  }
  return ctx;
}
