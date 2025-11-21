import type {
  InterviewQuestionsMap,
  InterviewResourcesMap,
} from "../interviewTypes";

export const reactQuestions: InterviewQuestionsMap["ReactJS"] = {
  icon: "⚛️",
  sections: [
    {
      title: "React Core Concepts",
      questions: [
        {
          question: "Explain the Virtual DOM and Reconciliation",
          answer: {
            text: "The Virtual DOM (VDOM) is a lightweight copy of the actual DOM kept in memory.",
            points: [
              "React compares new VDOM tree with previous VDOM tree (diffing)",
              "Finds minimal set of changes required to update real DOM",
              "Significantly improves performance by minimizing direct DOM manipulation",
              "The comparison process is called Reconciliation",
            ],
          },
        },
        {
          question: "What is JSX?",
          answer: {
            text: "JSX (JavaScript XML) is a syntax extension for JavaScript that allows writing HTML-like structures directly in JavaScript code.",
            points: [
              "Not mandatory but highly recommended",
              "Makes component structure clearer and more readable",
              "Transpiled to React.createElement() by tools like Babel",
            ],
            code: `const element = <h1>Hello, World!</h1>;\n// Transpiles to:\nconst element = React.createElement('h1', null, 'Hello, World!');`,
            language: "javascript",
          },
        },
        {
          question: "Differentiate between Functional and Class Components",
          answer: {
            text: "Functional Components: Simple JavaScript functions that accept props and return JSX. Can manage state using Hooks. Generally preferred for simplicity and performance.\n\nClass Components: ES6 classes extending React.Component. Manage state using this.state and lifecycle methods like componentDidMount. More verbose but were necessary before Hooks.",
          },
        },
      ],
    },
    {
      title: "State & Props",
      questions: [
        {
          question: "What are State and Props?",
          answer: {
            text: "Props: Read-only inputs passed from parent to child component. Immutable and allow component communication.\n\nState: Mutable data structure that holds component-specific data and can change over time. Managed within the component using useState or this.state.",
          },
        },
        {
          question: "Explain the purpose of the useEffect Hook",
          answer: {
            text: "useEffect handles side effects in functional components: data fetching, subscriptions, DOM changes, and event listeners.",
            points: [
              "Empty array []: Runs only once after initial render (like componentDidMount)",
              "Array with values [prop1, state2]: Runs on initial render and when values change",
              "No array: Runs after every render",
            ],
            code: `useEffect(() => {\n  // Side effect code here\n  fetchData();\n  \n  return () => {\n    // Cleanup function\n    cleanup();\n  };\n}, [dependency]); // Dependency array`,
            language: "javascript",
          },
        },
      ],
    },
  ],
};

export const reactResources: InterviewResourcesMap["ReactJS"] = {
  icon: "⚛️",
  resources: [
    {
      title: "InterviewBit - React & Hooks Questions",
      description:
        "Virtual DOM, components, state management, lifecycle methods, functional programming",
      url: "https://www.interviewbit.com/react-interview-questions/",
      type: "Free",
    },
  ],
  keyTopics: [
    "Virtual DOM",
    "React Hooks",
    "State Management",
    "Performance Optimization",
    "Context API",
  ],
};
