"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { useInView } from "@/lib/hooks";

export default function Reveal({
  children,
  delay = 0,
  className = "",
  style,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "li" | "article" | "header" | "blockquote";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.15);
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${inView ? "in" : ""} ${className}`}
      style={{ ...style, transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
