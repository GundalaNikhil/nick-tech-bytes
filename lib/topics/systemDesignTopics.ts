export interface SystemDesignTopic {
  title: string;
  category: "High-Level Design" | "Low-Level Design";
  difficulty: "beginner" | "intermediate" | "advanced";
  companies: string[];
  rating: number;
  slug: string;
}

export const hldTopics: SystemDesignTopic[] = [
  {
    title: "URL Shortener",
    category: "High-Level Design",
    difficulty: "intermediate",
    companies: ["Google", "Amazon", "Microsoft", "Meta"],
    rating: 4.5,
    slug: "url-shortener",
  },
  {
    title: "E-Commerce Platform",
    category: "High-Level Design",
    difficulty: "advanced",
    companies: ["Amazon", "Flipkart", "Shopify", "Walmart"],
    rating: 4.8,
    slug: "e-commerce-platform",
  },
  {
    title: "Chat Application",
    category: "High-Level Design",
    difficulty: "intermediate",
    companies: ["WhatsApp", "Slack", "Discord", "Microsoft"],
    rating: 4.6,
    slug: "chat-application",
  },
  {
    title: "Video Streaming (Netflix/YouTube)",
    category: "High-Level Design",
    difficulty: "advanced",
    companies: ["Netflix", "YouTube", "Amazon Prime", "Disney+", "Hotstar"],
    rating: 4.9,
    slug: "video-streaming",
  },
  {
    title: "Ride Sharing (Uber/Ola)",
    category: "High-Level Design",
    difficulty: "advanced",
    companies: ["Uber", "Ola", "Lyft", "Grab"],
    rating: 4.7,
    slug: "ride-sharing",
  },
  {
    title: "Twitter Feed",
    category: "High-Level Design",
    difficulty: "intermediate",
    companies: ["Twitter", "Meta", "Instagram", "LinkedIn"],
    rating: 4.5,
    slug: "twitter-feed",
  },
  {
    title: "WhatsApp Backend",
    category: "High-Level Design",
    difficulty: "advanced",
    companies: ["WhatsApp", "Meta", "Telegram", "Signal"],
    rating: 4.8,
    slug: "whatsapp-backend",
  },
  {
    title: "Netflix Recommendations",
    category: "High-Level Design",
    difficulty: "advanced",
    companies: ["Netflix", "Amazon", "Spotify", "YouTube"],
    rating: 4.9,
    slug: "netflix-recommendations",
  },
];

export const lldTopics: SystemDesignTopic[] = [
  {
    title: "Elevator System",
    category: "Low-Level Design",
    difficulty: "intermediate",
    companies: ["Google", "Amazon", "Microsoft", "Apple"],
    rating: 4.3,
    slug: "elevator-system",
  },
  {
    title: "Parking Lot",
    category: "Low-Level Design",
    difficulty: "beginner",
    companies: ["Amazon", "Walmart", "Microsoft", "Oracle"],
    rating: 4.0,
    slug: "parking-lot",
  },
  {
    title: "Library Management",
    category: "Low-Level Design",
    difficulty: "beginner",
    companies: ["Amazon", "Google", "Microsoft"],
    rating: 3.8,
    slug: "library-management",
  },
  {
    title: "ATM Machine",
    category: "Low-Level Design",
    difficulty: "intermediate",
    companies: ["Banks", "Fintech", "PayPal", "Stripe"],
    rating: 4.2,
    slug: "atm-machine",
  },
  {
    title: "Shopping Cart",
    category: "Low-Level Design",
    difficulty: "beginner",
    companies: ["Amazon", "Flipkart", "Shopify", "eBay"],
    rating: 4.1,
    slug: "shopping-cart",
  },
  {
    title: "Cab Booking System",
    category: "Low-Level Design",
    difficulty: "intermediate",
    companies: ["Uber", "Ola", "Lyft", "Grab"],
    rating: 4.5,
    slug: "cab-booking-system",
  },
  {
    title: "LRU Cache",
    category: "Low-Level Design",
    difficulty: "intermediate",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Netflix"],
    rating: 4.7,
    slug: "lru-cache",
  },
  {
    title: "Rate Limiter",
    category: "Low-Level Design",
    difficulty: "intermediate",
    companies: ["Google", "Amazon", "Stripe", "Twitter", "Meta"],
    rating: 4.6,
    slug: "rate-limiter",
  },
  {
    title: "Thread Pool",
    category: "Low-Level Design",
    difficulty: "advanced",
    companies: ["Google", "Amazon", "Microsoft", "Oracle", "IBM"],
    rating: 4.8,
    slug: "thread-pool",
  },
];
