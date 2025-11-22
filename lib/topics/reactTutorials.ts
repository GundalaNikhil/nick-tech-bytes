// React Tutorials Topics Configuration
export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export interface ReactTutorial {
  title: string;
  slug: string;
  difficulty: DifficultyLevel;
  description: string;
  tags: string[];
  estimatedTime: string;
  rating: number;
  companies: string[];
}

export const reactTutorials: ReactTutorial[] = [
  {
    title: "Counter Component",
    slug: "react_counter_tutorial",
    difficulty: "beginner",
    description:
      "Build an interactive counter with increment, decrement, and reset functionality using useState hook.",
    tags: ["useState", "Event Handling", "Basics"],
    estimatedTime: "15 min",
    rating: 4.5,
    companies: ["Google", "Meta", "Amazon", "Microsoft"],
  },
  {
    title: "Toggle Component",
    slug: "react_toggle_tutorial",
    difficulty: "beginner",
    description:
      "Create a toggle switch component with smooth animations and state management.",
    tags: ["useState", "Conditional Rendering"],
    estimatedTime: "10 min",
    rating: 4.2,
    companies: ["Meta", "Netflix", "Airbnb"],
  },
  {
    title: "Like Button",
    slug: "react_like_button_tutorial",
    difficulty: "beginner",
    description:
      "Implement an interactive like button with animation effects and state tracking.",
    tags: ["useState", "Animation", "UI"],
    estimatedTime: "12 min",
    rating: 4.3,
    companies: ["Instagram", "Twitter", "LinkedIn"],
  },
  {
    title: "Show/Hide Component",
    slug: "react_showhide_tutorial",
    difficulty: "beginner",
    description:
      "Build a component that toggles visibility of content with smooth transitions.",
    tags: ["useState", "Conditional Rendering"],
    estimatedTime: "10 min",
    rating: 4.1,
    companies: ["Google", "Amazon"],
  },
  {
    title: "Character Counter",
    slug: "react_char_counter_tutorial",
    difficulty: "beginner",
    description:
      "Create a text input with real-time character counting and limit validation.",
    tags: ["useState", "Forms", "Validation"],
    estimatedTime: "15 min",
    rating: 4.4,
    companies: ["Twitter", "LinkedIn", "Slack"],
  },
  {
    title: "Simple Form",
    slug: "react_simple_form_tutorial",
    difficulty: "intermediate",
    description:
      "Build a form with multiple inputs, validation, and submission handling.",
    tags: ["useState", "Forms", "Validation"],
    estimatedTime: "25 min",
    rating: 4.6,
    companies: ["Meta", "Google", "Amazon"],
  },
  {
    title: "Contact Form",
    slug: "react_contact_form_tutorial",
    difficulty: "intermediate",
    description:
      "Create a complete contact form with validation, error handling, and submission.",
    tags: ["Forms", "Validation", "Error Handling"],
    estimatedTime: "30 min",
    rating: 4.7,
    companies: ["Salesforce", "HubSpot", "Zendesk"],
  },
  {
    title: "Color Picker",
    slug: "react_colorpicker_tutorial",
    difficulty: "intermediate",
    description:
      "Build an interactive color picker with RGB/HEX conversion and preview.",
    tags: ["useState", "Custom Hooks", "UI"],
    estimatedTime: "35 min",
    rating: 4.5,
    companies: ["Adobe", "Figma", "Canva"],
  },
  {
    title: "Calculator",
    slug: "react_calculator_tutorial",
    difficulty: "intermediate",
    description:
      "Implement a fully functional calculator with basic arithmetic operations.",
    tags: ["State Management", "Complex Logic"],
    estimatedTime: "40 min",
    rating: 4.8,
    companies: ["Google", "Apple", "Microsoft"],
  },
  {
    title: "Avatar Uploader",
    slug: "react_avatar_uploader_tutorial",
    difficulty: "advanced",
    description:
      "Create an avatar upload component with image preview, crop, and file handling.",
    tags: ["File Upload", "Image Processing", "Advanced"],
    estimatedTime: "45 min",
    rating: 4.9,
    companies: ["Meta", "LinkedIn", "Instagram"],
  },
];
