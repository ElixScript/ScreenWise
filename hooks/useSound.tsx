"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { playSound, type SoundName } from "@/lib/audio";

interface SoundContextValue {
  play: (name: SoundName) => void;
  muted: boolean;
  toggleMute: () => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const ctxRef = useRef<AudioContext | null>(null);
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(muted);

  const play = useCallback((name: SoundName) => {
    if (mutedRef.current || typeof window === "undefined") return;
    try {
      ctxRef.current ??= new AudioContext();
      if (ctxRef.current.state === "suspended") {
        void ctxRef.current.resume();
      }
      playSound(ctxRef.current, name);
    } catch {
      // Browser tanpa Web Audio: presentasi tetap berjalan tanpa suara.
    }
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      mutedRef.current = !prev;
      return !prev;
    });
  }, []);

  const value = useMemo(
    () => ({ play, muted, toggleMute }),
    [play, muted, toggleMute],
  );

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSound(): SoundContextValue {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    throw new Error("useSound harus dipakai di dalam <SoundProvider>");
  }
  return ctx;
}
