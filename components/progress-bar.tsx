"use client";

interface ProgressBarProps {
  currentIndex: number;
  total: number;
}

export default function ProgressBar({ currentIndex, total }: ProgressBarProps) {
  const progress = ((currentIndex + 1) / total) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 glass-bar px-4 pt-3 pb-2">
      <div className="max-w-2xl mx-auto flex items-center justify-between mb-2 px-1">
        <span className="text-xs font-medium text-neutral-400 tracking-wide uppercase">
          Reading {currentIndex + 1} / {total}
        </span>
        <span className="text-xs font-medium text-neutral-600">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="progress-bar max-w-2xl mx-auto">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
