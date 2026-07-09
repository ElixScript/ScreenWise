"use client";

import { useEffect } from "react";

interface KeyboardNavHandlers {
  onNext: () => void;
  onPrev: () => void;
  onHome?: () => void;
  onEnd?: () => void;
}

/** Navigasi keyboard untuk guru: panah kiri/kanan, PageUp/PageDown, Home/End. */
export function useKeyboardNav({ onNext, onPrev, onHome, onEnd }: KeyboardNavHandlers) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
          e.preventDefault();
          onNext();
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          onPrev();
          break;
        case "Home":
          if (onHome) {
            e.preventDefault();
            onHome();
          }
          break;
        case "End":
          if (onEnd) {
            e.preventDefault();
            onEnd();
          }
          break;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onNext, onPrev, onHome, onEnd]);
}
