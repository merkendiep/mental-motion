"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  
  return (
    <button
      onClick={() => router.back()}
      className="btn btn-outline btn-primary rounded-full px-6 py-2 hover:scale-105 transition-transform flex items-center gap-2 shadow-sm"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      Terug
    </button>
  );
}
