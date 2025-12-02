"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";

const navigationMessages = [
  "Loading page...",
  "Preparing content...",
  "Almost there...",
  "Getting things ready...",
  "Loading awesome stuff...",
];

export default function NavigationLoader() {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [message, setMessage] = useState("");
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    // Pick a random message
    const randomMessage =
      navigationMessages[Math.floor(Math.random() * navigationMessages.length)];
    setMessage(randomMessage);

    // Mark the start time
    const start = Date.now();
    setStartTime(start);
    setIsNavigating(true);

    // Wait for page to load
    const handleComplete = () => {
      const elapsed = Date.now() - start;
      const minDisplayTime = 300; // Minimum 300ms to avoid flash

      // If less than min time has passed, wait the remainder
      if (elapsed < minDisplayTime) {
        setTimeout(() => {
          setIsNavigating(false);
        }, minDisplayTime - elapsed);
      } else {
        // Page took longer than min time, hide immediately
        setIsNavigating(false);
      }
    };

    // Use requestAnimationFrame to wait for next paint (page rendered)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        handleComplete();
      });
    });
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {isNavigating && (
        <LoadingSpinner fullScreen message={message} size="lg" />
      )}
    </AnimatePresence>
  );
}
