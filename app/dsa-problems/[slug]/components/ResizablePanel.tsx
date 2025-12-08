"use client";

import { useState, useCallback, useEffect } from "react";
import { GripVertical, GripHorizontal } from "lucide-react";

type SplitDirection = "horizontal" | "vertical";

interface ResizableDividerProps {
  direction: SplitDirection;
  onMouseDown: () => void;
  theme: "dark" | "light";
}

export default function ResizableDivider({
  direction,
  onMouseDown,
  theme,
}: ResizableDividerProps) {
  const borderColor = theme === "dark" ? "border-gray-800" : "border-gray-200";

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    onMouseDown();
  };

  return (
    <div
      className={`${
        direction === "vertical"
          ? "w-4 cursor-col-resize hover:bg-orange-500/30"
          : "h-4 cursor-row-resize hover:bg-orange-500/30"
      } ${borderColor} bg-gray-800/50 transition-colors flex items-center justify-center group relative z-50 shrink-0`}
      onMouseDown={handleMouseDown}
      style={{ touchAction: "none" }}
    >
      <div
        className={`${
          direction === "vertical" ? "h-12 w-1" : "w-12 h-1"
        } bg-gray-700 group-hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors`}
      >
        {direction === "vertical" ? (
          <GripVertical className="w-4 h-4 text-gray-400 group-hover:text-orange-300" />
        ) : (
          <GripHorizontal className="w-4 h-4 text-gray-400 group-hover:text-orange-300" />
        )}
      </div>
    </div>
  );
}

interface UseResizablePanelProps {
  splitDirection: SplitDirection;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function useResizablePanel({
  splitDirection,
  containerRef,
}: UseResizablePanelProps) {
  const [splitSize, setSplitSize] = useState(45);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current) return;

      const container = containerRef.current.getBoundingClientRect();
      let newSize: number;

      if (splitDirection === "vertical") {
        newSize = ((e.clientX - container.left) / container.width) * 100;
      } else {
        newSize = ((e.clientY - container.top) / container.height) * 100;
      }

      // Limit between 20% and 80%
      newSize = Math.max(20, Math.min(80, newSize));
      setSplitSize(newSize);
    },
    [splitDirection, containerRef]
  );

  useEffect(() => {
    if (isDragging) {
      const handleMove = (e: MouseEvent) => {
        e.preventDefault();
        handleMouseMove(e);
      };

      const handleUp = () => {
        handleMouseUp();
      };

      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleUp);

      return () => {
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return {
    splitSize,
    isDragging,
    handleMouseDown,
  };
}
