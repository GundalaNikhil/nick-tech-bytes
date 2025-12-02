"use client";

import { create } from "zustand";

interface LoadingState {
  isLoading: boolean;
  message: string;
  timeoutId: NodeJS.Timeout | null;
  setLoading: (loading: boolean, message?: string) => void;
}

export const useLoadingStore = create<LoadingState>((set, get) => ({
  isLoading: false,
  message: "",
  timeoutId: null,
  setLoading: (loading: boolean, message = "Loading...") => {
    const currentState = get();

    // Clear any existing timeout
    if (currentState.timeoutId) {
      clearTimeout(currentState.timeoutId);
    }

    if (loading) {
      // Set loading state with message
      set({ isLoading: true, message });

      // Safety timeout: automatically turn off loading after 10 seconds
      const timeout = setTimeout(() => {
        console.warn("Loading timeout reached - auto-clearing loading state");
        set({ isLoading: false, message: "", timeoutId: null });
      }, 10000); // 10 seconds max

      set({ timeoutId: timeout });
    } else {
      // Clear loading state
      set({ isLoading: false, message: "", timeoutId: null });
    }
  },
}));
