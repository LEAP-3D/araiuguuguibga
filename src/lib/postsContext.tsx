"use client";

import { createContext, useCallback, useContext, useState, useEffect } from "react";
import type { Post, MyPet } from "./postsStorage";
import {
  loadMyPets,
  saveMyPets,
  clearPostsStorage,
} from "./postsStorage";

export type { Post, MyPet } from "./postsStorage";
export type { VaccineRecord, HistoryEvent } from "./postsContextTypes";
import type { VaccineRecord, HistoryEvent } from "./postsContextTypes";

type PostsContextType = {
  posts: Post[];
  postsLoading: boolean;
  refetchPosts: () => Promise<void>;
  addPost: (post: Omit<Post, "id" | "createdAt">) => Promise<boolean>;
  clearPosts: () => void;
  myPets: MyPet[];
  addMyPet: (pet: Omit<MyPet, "id" | "vaccines" | "history" | "createdAt">) => void;
  addVaccine: (petId: string, vaccine: VaccineRecord) => void;
  addHistoryEvent: (petId: string, event: Omit<HistoryEvent, "petId">) => void;
};

const PostsContext = createContext<PostsContextType | null>(null);

function generatePetId() {
  return `pet_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function mapApiPostToPost(p: {
  id: string;
  name: string;
  breed: string | null;
  age: string | null;
  type: string;
  description: string | null;
  location: string;
  image: string | null;
  createdAt: number;
}): Post {
  return {
    id: p.id,
    name: p.name,
    breed: p.breed ?? "",
    age: p.age ?? "",
    type: p.type as Post["type"],
    description: p.description ?? "",
    location: p.location,
    image: p.image ?? "",
    createdAt: p.createdAt,
  };
}

export function PostsProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [myPets, setMyPets] = useState<MyPet[]>([]);

  const refetchPosts = useCallback(async () => {
    setPostsLoading(true);
    try {
      const res = await fetch("/api/rescue-posts");
      const data = res.ok ? await res.json() : [];
      setPosts(Array.isArray(data) ? data.map(mapApiPostToPost) : []);
    } catch {
      setPosts([]);
    } finally {
      setPostsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetchPosts();
  }, [refetchPosts]);

  useEffect(() => {
    const id = setTimeout(() => {
      setMyPets(loadMyPets());
    }, 0);
    return () => clearTimeout(id);
  }, []);

  const addPost = useCallback(async (post: Omit<Post, "id" | "createdAt">): Promise<boolean> => {
    try {
      const res = await fetch("/api/rescue-posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: post.name,
          breed: post.breed || null,
          age: post.age || null,
          type: post.type,
          description: post.description || null,
          location: post.location,
          image: post.image || null,
        }),
      });
      if (!res.ok) return false;
      const saved = await res.json();
      setPosts((prev) => [mapApiPostToPost(saved), ...prev]);
      return true;
    } catch {
      return false;
    }
  }, []);

  const clearPosts = useCallback(() => {
    setPosts([]);
    clearPostsStorage();
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
        postsLoading,
        refetchPosts,
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
