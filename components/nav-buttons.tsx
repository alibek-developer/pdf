"use client";

interface NavButtonsProps {
  onPrev: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function NavButtons({ onPrev, onNext, isFirst, isLast }: NavButtonsProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass-bar border-t border-neutral-800/60 px-4 py-4">
      <div className="max-w-2xl mx-auto flex items-center gap-3">
        <button
          onClick={onPrev}
          disabled={isFirst}
          className="btn-nav flex-1 flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-3.5 px-4 rounded-xl text-sm"
          style={{ opacity: isFirst ? 0.25 : 1 }}
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={isLast}
          className="btn-nav flex-1 flex items-center justify-center gap-2 bg-white hover:bg-neutral-200 text-black font-semibold py-3.5 px-4 rounded-xl text-sm"
          style={{ opacity: isLast ? 0.25 : 1 }}
        >
          Next
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
