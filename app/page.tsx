"use client";

import { useState, useEffect, useCallback } from "react";
import { readings, getImageIndex } from "@/lib/readings";
import ProgressBar from "@/components/progress-bar";
import ReadingCard from "@/components/reading-card";
import NavButtons from "@/components/nav-buttons";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<"left" | "right">("left");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("readingProgress");
      if (saved !== null) {
        const idx = parseInt(saved, 10);
        if (!isNaN(idx) && idx >= 0 && idx < readings.length) {
          setCurrentIndex(idx);
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem("readingProgress", currentIndex.toString());
    } catch {}
  }, [currentIndex, mounted]);

  const goToNext = useCallback(() => {
    if (currentIndex < readings.length - 1) {
      setAnimationDirection("left");
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setAnimationDirection("right");
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        goToNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const xDiff = Math.abs(touchStartX - touchEndX);
      const yDiff = Math.abs(touchStartY - touchEndY);

      if (xDiff > yDiff && xDiff > 60) {
        if (touchStartX > touchEndX) {
          goToNext();
        } else {
          goToPrev();
        }
      }
    };

    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goToNext, goToPrev]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentIndex]);

  const reading = readings[currentIndex];
  const imageIndex = getImageIndex(currentIndex);

  return (
    <div className="max-w-2xl mx-auto relative">
      <ProgressBar currentIndex={currentIndex} total={readings.length} />

      {reading && (
        <ReadingCard
          reading={reading}
          index={currentIndex}
          animationDirection={animationDirection}
          imageIndex={imageIndex}
        />
      )}

      <NavButtons
        onPrev={goToPrev}
        onNext={goToNext}
        isFirst={currentIndex === 0}
        isLast={currentIndex === readings.length - 1}
      />
    </div>
  );
}
