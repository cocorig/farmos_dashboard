import React from "react";

export default function LinkIcon({ className }: { className?: string }) {
  return (
    <svg
      focusable="false"
      className={className}
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m9 18 6-6-6-6"></path>
    </svg>
  );
}
