export function ReactIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <path
        d="M12 8.5c3.5 0 6.5.75 6.5 1.5s-3 1.5-6.5 1.5S5.5 10.75 5.5 10s3-1.5 6.5-1.5z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="6.5"
        ry="2"
        transform="rotate(60 12 12)"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="6.5"
        ry="2"
        transform="rotate(-60 12 12)"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}
