"use client";

import { createContext, useCallback, useContext, useState, useEffect } from "react";
import type { Post, MyPet } from "./postsStorage";
import {
  loadPosts,
  savePosts,
  loadMyPets,
  saveMyPets,
  clearPostsStorage,
} from "./postsStorage";

export type { Post, MyPet } from "./postsStorage";
export type { VaccineRecord, HistoryEvent } from "./postsContextTypes";
import type { VaccineRecord, HistoryEvent } from "./postsContextTypes";

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

function generateId() {
  return `post_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
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
