"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react";
import { engine, type EngineStatus, type Frame } from "./audio";

/** Llama a `cb` en cada frame del motor sin volver a renderizar el componente. */
export function useFrame(cb: (f: Frame) => void) {
  const ref = useRef(cb);
  ref.current = cb;
  useEffect(() => engine.subscribe((f) => ref.current(f)), []);
}

const SERVER_STATUS: EngineStatus = { mode: "sim", error: null, pending: false };

export function useEngineStatus(): EngineStatus {
  return useSyncExternalStore(engine.subscribeStatus, engine.getStatus, () => SERVER_STATUS);
}

export function useInView<T extends Element>(ref: RefObject<T | null>, threshold = 0.25, once = true) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) setInView(false);
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold, once]);
  return inView;
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}
