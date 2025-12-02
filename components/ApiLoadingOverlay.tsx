"use client";

import { AnimatePresence } from "framer-motion";
import { useLoadingStore } from "@/lib/loading-store";
import LoadingSpinner from "./LoadingSpinner";

export default function ApiLoadingOverlay() {
  const { isLoading, message } = useLoadingStore();

  return (
    <AnimatePresence>
      {isLoading && <LoadingSpinner fullScreen message={message} size="lg" />}
    </AnimatePresence>
  );
}
