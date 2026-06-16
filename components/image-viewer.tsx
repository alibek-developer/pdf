"use client";

import { useState, useCallback, useEffect } from "react";

interface ImageViewerProps {
  imageIndex: number | null;
  readingIndex: number;
}

export default function ImageViewer({ imageIndex, readingIndex }: ImageViewerProps) {
  const [open, setOpen] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false);
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [open, handleKeyDown]);

  if (!imageIndex) return null;

  const imageSrc = `/images/${imageIndex.toString().padStart(2, '0')}.png`;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-sm rounded-xl transition-all"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        View Original Page
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-neutral-800/80 hover:bg-neutral-700 rounded-full text-white transition-all z-10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative max-w-3xl w-full max-h-[90vh] overflow-auto rounded-lg" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt={`Original page ${imageIndex}`}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </>
  );
}
