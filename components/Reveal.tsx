"use client";

import { useRef, type ReactNode } from "react";
import { useInView } from "@/lib/hooks";

export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article" | "header";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.15);
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${inView ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
