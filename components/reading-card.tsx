"use client";

import { useMemo } from "react";
import { formatContent, type Reading } from "@/lib/utils";
import ImageViewer from "./image-viewer";

interface ReadingCardProps {
  reading: Reading;
  index: number;
  animationDirection: "left" | "right";
  imageIndex: number | null;
}

export default function ReadingCard({ reading, index, animationDirection, imageIndex }: ReadingCardProps) {
  const contentHtml = useMemo(() => formatContent(reading.content), [reading.content]);

  return (
    <div className={`reading-card px-5 pt-20 pb-28 ${animationDirection === "left" ? "slide-left" : "slide-right"}`}>
      <header className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
            Science
          </span>
          <span className="text-[10px] font-medium text-neutral-600">#{index + 1}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold leading-tight title-gradient mb-2">
          {reading.title}
        </h1>
        <p className="text-sm text-neutral-400 font-medium">
          {reading.author && reading.author !== "Unknown" ? `By ${reading.author}` : ""}
        </p>
      </header>

      <div
        className="reading-content reading-scroll"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      <ImageViewer imageIndex={imageIndex} readingIndex={index} />
    </div>
  );
}
