import React from "react";

export const MicrosoftLogo = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 23 23" fill="none">
    <rect x="0" y="0" width="11" height="11" fill="#F25022" />
    <rect x="12" y="0" width="11" height="11" fill="#7FBA00" />
    <rect x="0" y="12" width="11" height="11" fill="#00A4EF" />
    <rect x="12" y="12" width="11" height="11" fill="#FFB900" />
  </svg>
);

export const AmazonLogo = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <text
      x="50"
      y="50"
      textAnchor="middle"
      dominantBaseline="middle"
      fill="#FF9900"
      fontSize="60"
      fontWeight="bold"
      fontFamily="Arial, sans-serif"
    >
      a
    </text>
    <path
      d="M20 70 Q50 80, 80 70"
      stroke="#FF9900"
      strokeWidth="4"
      fill="none"
    />
    <circle cx="80" cy="70" r="2" fill="#FF9900" />
  </svg>
);

export const GoogleLogo = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 48 48">
    <path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
    />
    <path
      fill="#4285F4"
      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
    />
    <path
      fill="#FBBC05"
      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
    />
    <path
      fill="#34A853"
      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
    />
  </svg>
);

export const MetaLogo = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 100 100">
    <defs>
      <linearGradient id="metaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0081FB" />
        <stop offset="50%" stopColor="#0095F6" />
        <stop offset="100%" stopColor="#00C6FF" />
      </linearGradient>
    </defs>
    <path
      d="M50 10 L30 50 L50 70 L70 50 Z M50 30 L60 50 L50 60 L40 50 Z"
      fill="url(#metaGradient)"
    />
  </svg>
);

export const FedExLogo = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 100 50">
    <text
      x="10"
      y="35"
      fill="#4D148C"
      fontSize="28"
      fontWeight="bold"
      fontFamily="Arial, sans-serif"
    >
      Fed
    </text>
    <text
      x="50"
      y="35"
      fill="#FF6600"
      fontSize="28"
      fontWeight="bold"
      fontFamily="Arial, sans-serif"
    >
      Ex
    </text>
  </svg>
);

export const QualcommLogo = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" fill="#3253DC" />
    <text
      x="50"
      y="58"
      textAnchor="middle"
      dominantBaseline="middle"
      fill="white"
      fontSize="24"
      fontWeight="bold"
      fontFamily="Arial, sans-serif"
    >
      Q
    </text>
  </svg>
);

export const AppleLogo = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </svg>
);

export const NetflixLogo = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 100 100">
    <rect x="20" y="10" width="15" height="80" fill="#E50914" rx="2" />
    <rect x="65" y="10" width="15" height="80" fill="#E50914" rx="2" />
    <path
      d="M35 10 L65 90"
      stroke="#E50914"
      strokeWidth="15"
      strokeLinecap="round"
    />
  </svg>
);

export const companyData = [
  {
    name: "Microsoft",
    logo: MicrosoftLogo,
    color: "from-blue-400 to-blue-600",
    bgHover: "group-hover:from-blue-500/20 group-hover:to-blue-700/20",
  },
  {
    name: "Amazon",
    logo: AmazonLogo,
    color: "from-orange-400 to-yellow-600",
    bgHover: "group-hover:from-orange-500/20 group-hover:to-yellow-700/20",
  },
  {
    name: "Google",
    logo: GoogleLogo,
    color: "from-blue-400 to-red-500",
    bgHover: "group-hover:from-blue-500/20 group-hover:to-red-600/20",
  },
  {
    name: "Meta",
    logo: MetaLogo,
    color: "from-blue-500 to-purple-600",
    bgHover: "group-hover:from-blue-600/20 group-hover:to-purple-700/20",
  },
  {
    name: "FedEx",
    logo: FedExLogo,
    color: "from-purple-400 to-orange-500",
    bgHover: "group-hover:from-purple-500/20 group-hover:to-orange-600/20",
  },
  {
    name: "Qualcomm",
    logo: QualcommLogo,
    color: "from-indigo-500 to-blue-600",
    bgHover: "group-hover:from-indigo-600/20 group-hover:to-blue-700/20",
  },
  {
    name: "Apple",
    logo: AppleLogo,
    color: "from-gray-300 to-gray-500",
    bgHover: "group-hover:from-gray-400/20 group-hover:to-gray-600/20",
  },
  {
    name: "Netflix",
    logo: NetflixLogo,
    color: "from-red-600 to-red-800",
    bgHover: "group-hover:from-red-700/20 group-hover:to-red-900/20",
  },
];
