import type {
  InterviewQuestionsMap,
  InterviewResourcesMap,
} from "../interviewTypes";

export const reactQuestions: InterviewQuestionsMap["ReactJS"] = {
  icon: "⚛️",
  sections: [
    {
      title: "React Core Concepts",
      icon: "🎯",
      questions: [
        {
          question: "Explain the Virtual DOM and Reconciliation",
          difficulty: "intermediate",
          answer: {
            text: "The Virtual DOM (VDOM) is a lightweight copy of the actual DOM kept in memory.",
            points: [
              "React compares new VDOM tree with previous VDOM tree (diffing)",
              "Finds minimal set of changes required to update real DOM",
              "Significantly improves performance by minimizing direct DOM manipulation",
              "The comparison process is called Reconciliation",
            ],
            memoryTechnique:
              "Think: VDR - Virtual DOM → Diffing → Real DOM (Virtual Detective Reviews changes)",
            simpleExplanation:
              "Imagine you're editing a draft document (Virtual DOM) before printing the final version (Real DOM). Instead of reprinting the entire document every time you make a change, you only print the pages that were modified. React does the same - it checks what changed in the draft and only updates those specific parts in the browser.",
            visualHtml: `<div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 2rem; border-radius: 12px; margin: 1.5rem 0;">
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
    <div style="background: rgba(59, 130, 246, 0.1); border: 2px solid #3b82f6; border-radius: 8px; padding: 1.5rem; text-align: center;">
      <div style="font-size: 2rem; margin-bottom: 0.5rem;">📄</div>
      <div style="color: #60a5fa; font-weight: bold; margin-bottom: 0.5rem;">1. Virtual DOM</div>
      <div style="color: #94a3b8; font-size: 0.875rem;">JavaScript copy of DOM</div>
    </div>
    <div style="background: rgba(168, 85, 247, 0.1); border: 2px solid #a855f7; border-radius: 8px; padding: 1.5rem; text-align: center;">
      <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔍</div>
      <div style="color: #c084fc; font-weight: bold; margin-bottom: 0.5rem;">2. Diffing</div>
      <div style="color: #94a3b8; font-size: 0.875rem;">Compare old vs new</div>
    </div>
    <div style="background: rgba(34, 197, 94, 0.1); border: 2px solid #22c55e; border-radius: 8px; padding: 1.5rem; text-align: center;">
      <div style="font-size: 2rem; margin-bottom: 0.5rem;">🌐</div>
      <div style="color: #4ade80; font-weight: bold; margin-bottom: 0.5rem;">3. Real DOM</div>
      <div style="color: #94a3b8; font-size: 0.875rem;">Update only changed parts</div>
    </div>
  </div>
  <div style="margin-top: 1.5rem; text-align: center; color: #94a3b8; font-size: 0.875rem;">
    ➡️ Fast & Efficient Updates ⚡
  </div>
</div>`,
          },
        },
        {
          question: "What is JSX?",
          difficulty: "beginner",
          answer: {
            text: "JSX (JavaScript XML) is a syntax extension for JavaScript that allows writing HTML-like structures directly in JavaScript code.",
            points: [
              "Not mandatory but highly recommended",
              "Makes component structure clearer and more readable",
              "Transpiled to React.createElement() by tools like Babel",
            ],
            code: `const element = <h1>Hello, World!</h1>;\n// Transpiles to:\nconst element = React.createElement('h1', null, 'Hello, World!');`,
            memoryTechnique:
              "JSX = JavaScript + XML (J+S+X). Think: JavaScript with Sugar-coated XML",
            simpleExplanation:
              "JSX is like writing a recipe in plain language instead of technical chef jargon. Instead of saying 'React.createElement with these specific parameters...', you just write '<h1>Hello</h1>' which is much easier to read and understand, like saying 'add 2 cups of flour' instead of 'introduce 473ml of wheat-based powder'.",
          },
        },
        {
          question: "Differentiate between Functional and Class Components",
          difficulty: "beginner",
          answer: {
            text: "Functional Components: Simple JavaScript functions that accept props and return JSX. Can manage state using Hooks. Generally preferred for simplicity and performance.\n\nClass Components: ES6 classes extending React.Component. Manage state using this.state and lifecycle methods like componentDidMount. More verbose but were necessary before Hooks.",
            memoryTechnique:
              "F=Fast & Fresh (Functional), C=Classic & Complex (Class)",
            simpleExplanation:
              "Functional components are like modern electric cars - simple, efficient, and eco-friendly. Class components are like traditional gas cars - they work great but have more parts (like lifecycle methods) and are more complex to maintain. Both get you to your destination, but one is sleeker and easier to handle.",
            visualHtml: `<div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 2rem; border-radius: 12px; margin: 1.5rem 0;">
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
    <div style="background: rgba(34, 197, 94, 0.1); border: 2px solid #22c55e; border-radius: 8px; padding: 1.5rem;">
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
        <span style="font-size: 1.5rem;">⚡</span>
        <span style="color: #4ade80; font-weight: bold; font-size: 1.125rem;">Functional</span>
      </div>
      <div style="color: #94a3b8; font-size: 0.875rem; line-height: 1.6;">
        ✅ Simpler syntax<br/>
        ✅ Use Hooks for state<br/>
        ✅ Better performance<br/>
        ✅ Easier to test<br/>
        ✅ Preferred in modern React
      </div>
    </div>
    <div style="background: rgba(249, 115, 22, 0.1); border: 2px solid #f97316; border-radius: 8px; padding: 1.5rem;">
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
        <span style="font-size: 1.5rem;">🏛️</span>
        <span style="color: #fb923c; font-weight: bold; font-size: 1.125rem;">Class</span>
      </div>
      <div style="color: #94a3b8; font-size: 0.875rem; line-height: 1.6;">
        📌 More verbose<br/>
        📌 Use this.state<br/>
        📌 Lifecycle methods<br/>
        📌 Legacy code<br/>
        📌 Still supported
      </div>
    </div>
  </div>
</div>`,
          },
        },
        {
          question: "What is React Fiber?",
          difficulty: "advanced",
          answer: {
            text: "React Fiber is the reconciliation engine introduced in React 16. It's a complete rewrite of React's core algorithm that makes rendering more flexible and enables incremental rendering.",
            points: [
              "Breaks rendering work into chunks that can be paused and resumed",
              "Enables prioritization of updates (high-priority UI updates first)",
              "Improves perceived performance for complex UIs",
              "Foundation for features like Suspense and Concurrent Mode",
            ],
            memoryTechnique:
              "FIBER = Flexible, Incremental, Better, Efficient Rendering",
            simpleExplanation:
              "Think of React Fiber like a chef who can pause preparing one dish to handle an urgent order, then resume the first dish later. Before Fiber, React was like a chef who had to finish one entire dish before starting another - no interruptions allowed. Fiber allows React to prioritize urgent updates (like user clicks) while pausing less important work.",
          },
        },
      ],
    },
    {
      title: "State & Props",
      icon: "📦",
      questions: [
        {
          question: "What are State and Props?",
          difficulty: "beginner",
          answer: {
            text: "Props: Read-only inputs passed from parent to child component. Immutable and allow component communication.\n\nState: Mutable data structure that holds component-specific data and can change over time. Managed within the component using useState or this.state.",
            memoryTechnique:
              "Props = Permanent (read-only), State = Changeable. Think: P for Passed down, S for Self-managed",
            simpleExplanation:
              "Props are like birthday gifts - someone gives them to you (parent), you can't change them, and you just use them as they are. State is like your closet - you own it, you can add or remove clothes whenever you want, and it belongs specifically to you. Your sibling's closet (state) is completely separate from yours.",
            visualHtml: `<div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 2rem; border-radius: 12px; margin: 1.5rem 0;">
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
    <div style="background: rgba(59, 130, 246, 0.1); border: 2px solid #3b82f6; border-radius: 8px; padding: 1.5rem;">
      <div style="text-align: center; margin-bottom: 1rem;">
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎁</div>
        <div style="color: #60a5fa; font-weight: bold; font-size: 1.25rem;">Props</div>
      </div>
      <div style="color: #94a3b8; font-size: 0.875rem; line-height: 1.8;">
        <div style="margin-bottom: 0.5rem;">🔒 <strong style="color: #60a5fa;">Read-only</strong></div>
        <div style="margin-bottom: 0.5rem;">⬇️ <strong style="color: #60a5fa;">Parent → Child</strong></div>
        <div style="margin-bottom: 0.5rem;">📤 <strong style="color: #60a5fa;">External data</strong></div>
        <div>❌ <strong style="color: #60a5fa;">Cannot modify</strong></div>
      </div>
    </div>
    <div style="background: rgba(168, 85, 247, 0.1); border: 2px solid #a855f7; border-radius: 8px; padding: 1.5rem;">
      <div style="text-align: center; margin-bottom: 1rem;">
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔄</div>
        <div style="color: #c084fc; font-weight: bold; font-size: 1.25rem;">State</div>
      </div>
      <div style="color: #94a3b8; font-size: 0.875rem; line-height: 1.8;">
        <div style="margin-bottom: 0.5rem;">🔓 <strong style="color: #c084fc;">Mutable</strong></div>
        <div style="margin-bottom: 0.5rem;">📍 <strong style="color: #c084fc;">Internal only</strong></div>
        <div style="margin-bottom: 0.5rem;">🏠 <strong style="color: #c084fc;">Component-owned</strong></div>
        <div>✅ <strong style="color: #c084fc;">Can update</strong></div>
      </div>
    </div>
  </div>
</div>`,
          },
        },
        {
          question: "Explain the purpose of the useEffect Hook",
          difficulty: "intermediate",
          answer: {
            text: "useEffect handles side effects in functional components: data fetching, subscriptions, DOM changes, and event listeners.",
            points: [
              "Empty array []: Runs only once after initial render (like componentDidMount)",
              "Array with values [prop1, state2]: Runs on initial render and when values change",
              "No array: Runs after every render",
            ],
            code: `useEffect(() => {\n  // Side effect code here\n  fetchData();\n  \n  return () => {\n    // Cleanup function\n    cleanup();\n  };\n}, [dependency]); // Dependency array`,
            memoryTechnique:
              "USE = Used for Side Effects. Think: Empty[], Every time (no array), or Exact dependencies [deps]",
            simpleExplanation:
              "useEffect is like setting up automatic tasks. Imagine you have a smart home: [] = 'do this once when I move in', [dependency] = 'do this when the temperature changes', no array = 'do this every single time anything happens'. The cleanup function is like 'when I leave the room, turn off the lights'.",
            visualHtml: `<div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 2rem; border-radius: 12px; margin: 1.5rem 0;">
  <div style="text-align: center; margin-bottom: 1.5rem;">
    <div style="color: #60a5fa; font-weight: bold; font-size: 1.25rem;">useEffect Dependency Patterns</div>
  </div>
  <div style="display: grid; gap: 1rem;">
    <div style="background: rgba(34, 197, 94, 0.1); border-left: 4px solid #22c55e; padding: 1rem; border-radius: 4px;">
      <div style="color: #4ade80; font-weight: bold; margin-bottom: 0.5rem;">[] - Empty Array</div>
      <div style="color: #94a3b8; font-size: 0.875rem;">Runs once on mount (like componentDidMount)</div>
      <div style="color: #64748b; font-family: monospace; font-size: 0.75rem; margin-top: 0.5rem;">useEffect(() => { ... }, [])</div>
    </div>
    <div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1rem; border-radius: 4px;">
      <div style="color: #60a5fa; font-weight: bold; margin-bottom: 0.5rem;">[deps] - With Dependencies</div>
      <div style="color: #94a3b8; font-size: 0.875rem;">Runs on mount + when dependencies change</div>
      <div style="color: #64748b; font-family: monospace; font-size: 0.75rem; margin-top: 0.5rem;">useEffect(() => { ... }, [count, user])</div>
    </div>
    <div style="background: rgba(249, 115, 22, 0.1); border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px;">
      <div style="color: #fb923c; font-weight: bold; margin-bottom: 0.5rem;">No Array</div>
      <div style="color: #94a3b8; font-size: 0.875rem;">Runs after every render (use with caution!)</div>
      <div style="color: #64748b; font-family: monospace; font-size: 0.75rem; margin-top: 0.5rem;">useEffect(() => { ... })</div>
    </div>
  </div>
</div>`,
          },
        },
        {
          question: "What is useState and how does it work?",
          difficulty: "beginner",
          answer: {
            text: "useState is a Hook that allows functional components to manage state. It returns an array with the current state value and a function to update it.",
            points: [
              "Takes initial state as argument",
              "Returns array: [currentState, setStateFunction]",
              "Triggers re-render when state changes",
              "State updates are asynchronous",
            ],
            code: `const [count, setCount] = useState(0);\n\n// Update state\nsetCount(count + 1);\n\n// Functional update (recommended for computed values)\nsetCount(prevCount => prevCount + 1);`,
            memoryTechnique:
              "useState: U-S-E = Update, State, Easy. Array destructuring: [value, setValue]",
            simpleExplanation:
              "useState is like a sticky note on your fridge. The first part (count) is what's currently written on the note. The second part (setCount) is the pen you use to change what's written. When you change it, React replaces the old note with a new one showing the updated value.",
          },
        },
        {
          question: "What is useContext and when would you use it?",
          difficulty: "intermediate",
          answer: {
            text: "useContext provides a way to pass data through the component tree without having to pass props down manually at every level. It's used for global data like theme, user authentication, or language preferences.",
            points: [
              "Avoids prop drilling (passing props through many levels)",
              "Provides and consumes values using Context API",
              "All consumers re-render when context value changes",
              "Should be used for truly global data, not all state",
            ],
            code: `const ThemeContext = React.createContext('light');\n\nfunction App() {\n  return (\n    <ThemeContext.Provider value="dark">\n      <ChildComponent />\n    </ThemeContext.Provider>\n  );\n}\n\nfunction ChildComponent() {\n  const theme = useContext(ThemeContext);\n  return <div className={theme}>Content</div>;\n}`,
            memoryTechnique:
              "Context = Container for Shared Data. Think: Broadcasting station (Provider) → Radio (Consumer)",
            simpleExplanation:
              "useContext is like a TV broadcast. Instead of physically passing a message person-to-person through a chain (prop drilling), you broadcast it (Provider), and anyone with a TV (useContext) can tune in and receive it directly, no matter how far away they are.",
          },
        },
      ],
    },
    {
      title: "React Hooks",
      icon: "🪝",
      questions: [
        {
          question: "What is useReducer and when to use it over useState?",
          difficulty: "intermediate",
          answer: {
            text: "useReducer is a Hook for managing complex state logic. It's similar to Redux's reducer pattern and is preferred when state logic involves multiple sub-values or when the next state depends on the previous one.",
            points: [
              "Takes reducer function and initial state",
              "Returns current state and dispatch function",
              "Better for complex state with multiple actions",
              "Easier to test state transitions",
            ],
            code: `const [state, dispatch] = useReducer(reducer, initialState);\n\nfunction reducer(state, action) {\n  switch (action.type) {\n    case 'increment':\n      return { count: state.count + 1 };\n    case 'decrement':\n      return { count: state.count - 1 };\n    default:\n      return state;\n  }\n}\n\n// Usage\ndispatch({ type: 'increment' });`,
            memoryTechnique:
              "useReducer = USE when state is COMPLEX, REDUCED to actions. Think: State + Action → New State",
            simpleExplanation:
              "useState is like ordering from a simple menu (just pick one item). useReducer is like a restaurant with a complex order system - you send a ticket (dispatch) to the kitchen (reducer) describing what you want (action type), and the kitchen decides how to prepare your meal (new state) based on your order and their rules.",
            visualHtml: `<div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 2rem; border-radius: 12px; margin: 1.5rem 0;">
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
    <div style="background: rgba(34, 197, 94, 0.1); border: 2px solid #22c55e; border-radius: 8px; padding: 1.5rem;">
      <div style="color: #4ade80; font-weight: bold; margin-bottom: 1rem; font-size: 1.125rem;">useState</div>
      <div style="color: #94a3b8; font-size: 0.875rem; line-height: 1.8;">
        ✅ Simple state<br/>
        ✅ Single value<br/>
        ✅ Independent updates<br/>
        ✅ Quick to implement
      </div>
    </div>
    <div style="background: rgba(168, 85, 247, 0.1); border: 2px solid #a855f7; border-radius: 8px; padding: 1.5rem;">
      <div style="color: #c084fc; font-weight: bold; margin-bottom: 1rem; font-size: 1.125rem;">useReducer</div>
      <div style="color: #94a3b8; font-size: 0.875rem; line-height: 1.8;">
        ✅ Complex state logic<br/>
        ✅ Multiple sub-values<br/>
        ✅ Related updates<br/>
        ✅ Predictable transitions
      </div>
    </div>
  </div>
</div>`,
          },
        },
        {
          question: "What is useMemo and when should you use it?",
          difficulty: "intermediate",
          answer: {
            text: "useMemo is a Hook that memoizes (caches) the result of an expensive computation, recomputing only when dependencies change. It optimizes performance by avoiding unnecessary recalculations.",
            points: [
              "Caches computed values between renders",
              "Recalculates only when dependencies change",
              "Should be used for expensive calculations",
              "Don't use for simple operations (overhead not worth it)",
            ],
            code: `const expensiveValue = useMemo(() => {\n  return computeExpensiveValue(a, b);\n}, [a, b]); // Only recalculates if a or b change\n\n// Without useMemo: Recalculates on every render\nconst expensiveValue = computeExpensiveValue(a, b);`,
            memoryTechnique:
              "useMemo = MEMO-rize expensive calculations. Think: Cache & Reuse",
            simpleExplanation:
              "useMemo is like doing meal prep on Sunday. Instead of cooking the same complicated dish every single day (expensive calculation on every render), you cook it once and reheat it throughout the week. You only cook again when ingredients change (dependencies update).",
          },
        },
        {
          question: "What is useCallback and how is it different from useMemo?",
          difficulty: "intermediate",
          answer: {
            text: "useCallback memoizes a function definition, while useMemo memoizes a computed value. useCallback is useful for preventing unnecessary re-renders of child components that depend on callback functions.",
            points: [
              "Returns memoized callback function",
              "Prevents function recreation on every render",
              "Useful for passing callbacks to optimized child components",
              "Dependencies determine when callback is recreated",
            ],
            code: `const memoizedCallback = useCallback(\n  () => {\n    doSomething(a, b);\n  },\n  [a, b]\n);\n\n// Equivalent to:\nconst memoizedValue = useMemo(\n  () => () => doSomething(a, b),\n  [a, b]\n);`,
            memoryTechnique:
              "useCallback = Callback memoization, useMemo = Value memoization. Both CACHE things!",
            simpleExplanation:
              "useMemo saves the result of cooking (the actual meal). useCallback saves the recipe itself. If you have the same recipe (callback), you don't need to print a new copy every time - just keep using the same one until the ingredients (dependencies) change.",
            visualHtml: `<div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 2rem; border-radius: 12px; margin: 1.5rem 0;">
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
    <div style="background: rgba(59, 130, 246, 0.1); border: 2px solid #3b82f6; border-radius: 8px; padding: 1.5rem;">
      <div style="text-align: center; margin-bottom: 1rem;">
        <div style="font-size: 2rem;">📝</div>
        <div style="color: #60a5fa; font-weight: bold; font-size: 1.125rem;">useCallback</div>
      </div>
      <div style="color: #94a3b8; font-size: 0.875rem; text-align: center;">
        <div style="margin-bottom: 1rem;">Memoizes the <strong style="color: #60a5fa;">function</strong></div>
        <div style="background: rgba(59, 130, 246, 0.2); padding: 0.75rem; border-radius: 4px; font-family: monospace; font-size: 0.75rem;">
          () => doSomething()
        </div>
      </div>
    </div>
    <div style="background: rgba(168, 85, 247, 0.1); border: 2px solid #a855f7; border-radius: 8px; padding: 1.5rem;">
      <div style="text-align: center; margin-bottom: 1rem;">
        <div style="font-size: 2rem;">💎</div>
        <div style="color: #c084fc; font-weight: bold; font-size: 1.125rem;">useMemo</div>
      </div>
      <div style="color: #94a3b8; font-size: 0.875rem; text-align: center;">
        <div style="margin-bottom: 1rem;">Memoizes the <strong style="color: #c084fc;">result</strong></div>
        <div style="background: rgba(168, 85, 247, 0.2); padding: 0.75rem; border-radius: 4px; font-family: monospace; font-size: 0.75rem;">
          computed value
        </div>
      </div>
    </div>
  </div>
</div>`,
          },
        },
        {
          question: "What is useRef and its common use cases?",
          difficulty: "intermediate",
          answer: {
            text: "useRef returns a mutable ref object whose .current property persists across renders without causing re-renders when changed. It's commonly used for accessing DOM elements and storing mutable values.",
            points: [
              "Persists value across renders without causing re-render",
              "Used to access DOM elements directly",
              "Can store previous values or timers",
              "Changes to .current don't trigger component updates",
            ],
            code: `const inputRef = useRef(null);\n\nfunction focusInput() {\n  inputRef.current.focus();\n}\n\nreturn <input ref={inputRef} />;\n\n// Storing previous value\nconst prevCountRef = useRef();\nuseEffect(() => {\n  prevCountRef.current = count;\n});`,
            memoryTechnique:
              "useRef = REFerence that persists. Think: Sticky note that doesn't trigger re-renders",
            simpleExplanation:
              "useRef is like a secret pocket in your jacket. You can put things in it, take things out, and change what's inside without anyone noticing (no re-render). It's perfect for keeping track of things privately or grabbing physical objects (DOM elements) directly.",
          },
        },
        {
          question:
            "What is useLayoutEffect and how is it different from useEffect?",
          difficulty: "advanced",
          answer: {
            text: "useLayoutEffect fires synchronously after all DOM mutations but before the browser paints. useEffect fires asynchronously after paint.",
            points: [
              "useLayoutEffect blocks visual updates until completed",
              "Use for measuring DOM layout or preventing visual flicker",
              "useEffect is preferred for most side effects (non-blocking)",
              "useLayoutEffect signature identical to useEffect",
            ],
            code: `// useLayoutEffect - runs before paint\nuseLayoutEffect(() => {\n  const height = divRef.current.offsetHeight;\n  setTooltipPosition(height); // No flicker\n}, []);\n\n// useEffect - runs after paint\nuseEffect(() => {\n  fetchData(); // Async, non-blocking\n}, []);`,
            memoryTechnique:
              "useLayoutEffect = Layout measurements before PAINT. useEffect = After PAINT. Think: Layout before show, Effect after show",
            simpleExplanation:
              "useLayoutEffect is like adjusting your clothes in front of a mirror before walking out (measurements before showing). useEffect is like checking your phone after you've already left the house (updates after showing). Use Layout when visual consistency matters immediately.",
          },
        },
        {
          question: "Explain Custom Hooks and when to create them",
          difficulty: "intermediate",
          answer: {
            text: "Custom Hooks are JavaScript functions whose names start with 'use' and may call other Hooks. They let you extract component logic into reusable functions.",
            points: [
              "Must start with 'use' prefix",
              "Can use other Hooks inside",
              "Share stateful logic, not state itself",
              "Each call to a custom Hook has independent state",
            ],
            code: `// Custom Hook for fetching data\nfunction useFetch(url) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    fetch(url)\n      .then(res => res.json())\n      .then(setData)\n      .catch(setError)\n      .finally(() => setLoading(false));\n  }, [url]);\n\n  return { data, loading, error };\n}\n\n// Usage\nconst { data, loading, error } = useFetch('/api/users');`,
            memoryTechnique:
              "Custom Hooks = Reusable Logic. Think: Your own tool in the toolbox",
            simpleExplanation:
              "Custom Hooks are like creating your own power tool. Instead of using a screwdriver (useState) and hammer (useEffect) separately every time, you build a power drill (custom Hook) that does both. Now you can use this drill anywhere in your workshop!",
          },
        },
      ],
    },
    {
      title: "Performance & Optimization",
      icon: "⚡",
      questions: [
        {
          question: "What is React.memo and when should you use it?",
          difficulty: "intermediate",
          answer: {
            text: "React.memo is a higher-order component that memoizes a component, preventing re-renders if props haven't changed. It performs a shallow comparison of props.",
            points: [
              "Wraps functional components to prevent unnecessary re-renders",
              "Does shallow comparison of props by default",
              "Can provide custom comparison function",
              "Use for expensive components with same props",
            ],
            code: `const MyComponent = React.memo(({ data }) => {\n  return <div>{data}</div>;\n});\n\n// Custom comparison\nconst MyComponent = React.memo(\n  ({ data }) => <div>{data}</div>,\n  (prevProps, nextProps) => {\n    return prevProps.data === nextProps.data;\n  }\n);`,
            memoryTechnique:
              "React.memo = MEMOrize component renders. Think: Skip re-render if props unchanged",
            simpleExplanation:
              "React.memo is like a bouncer at a club checking IDs. If your ID (props) hasn't changed since last time, the bouncer says 'You already came in, no need to go through the line again' (skip re-render). Only new IDs (changed props) have to go through the entry process.",
          },
        },
        {
          question: "What is code splitting and lazy loading in React?",
          difficulty: "advanced",
          answer: {
            text: "Code splitting divides your bundle into smaller chunks that are loaded on demand. React.lazy and Suspense enable component-level code splitting.",
            points: [
              "Reduces initial bundle size",
              "Loads components only when needed",
              "Improves initial page load time",
              "React.lazy for dynamic imports",
            ],
            code: `const OtherComponent = React.lazy(() => import('./OtherComponent'));\n\nfunction MyComponent() {\n  return (\n    <Suspense fallback={<div>Loading...</div>}>\n      <OtherComponent />\n    </Suspense>\n  );\n}`,
            memoryTechnique:
              "Lazy = Load As You need, Zig-zag through app. Suspense = Suspend until ready",
            simpleExplanation:
              "Code splitting is like ordering food only when you're hungry, instead of buying an entire week's worth of groceries upfront. React.lazy says 'I'll order this dish (component) when I need it', and Suspense is the 'Please wait' sign while your food is being prepared.",
          },
        },
        {
          question: "How do you prevent unnecessary re-renders in React?",
          difficulty: "intermediate",
          answer: {
            text: "Multiple strategies exist to prevent unnecessary re-renders and optimize React applications.",
            points: [
              "Use React.memo for functional components",
              "Use PureComponent for class components",
              "Optimize with useMemo and useCallback hooks",
              "Proper key usage in lists",
              "Component composition and state colocation",
              "Avoid inline function definitions in render",
            ],
            memoryTechnique:
              "PPCKC = PureComponent, Props comparison, useCallback, Keys, Composition",
            simpleExplanation:
              "Preventing re-renders is like being a smart shopper. Don't buy new clothes (re-render) if the ones you have (current render) are still perfectly fine. Check what changed before making a purchase (React.memo checks props), keep shopping lists organized (proper keys), and don't browse every store every time (component composition).",
          },
        },
        {
          question: "What is React Profiler and how do you use it?",
          difficulty: "advanced",
          answer: {
            text: "React Profiler measures how often a React app renders and what the 'cost' of rendering is. It's built into React DevTools.",
            points: [
              "Identifies performance bottlenecks",
              "Measures render phase duration",
              "Shows which components caused re-renders",
              "Can be used programmatically with <Profiler> component",
            ],
            code: `import { Profiler } from 'react';\n\nfunction onRenderCallback(\n  id, // unique identifier\n  phase, // "mount" or "update"\n  actualDuration, // time spent rendering\n  baseDuration, // estimated time without memoization\n  startTime, // when render started\n  commitTime, // when committed\n  interactions // set of interactions\n) {\n  console.log(\`\${id} took \${actualDuration}ms\`);\n}\n\n<Profiler id="Navigation" onRender={onRenderCallback}>\n  <Navigation />\n</Profiler>`,
            memoryTechnique:
              "Profiler = Performance Inspector. Think: Stopwatch for components",
            simpleExplanation:
              "React Profiler is like a fitness tracker for your app. It tells you which components are 'exercising' (rendering) too much, how long they take, and helps you optimize their workout routine (reduce unnecessary renders).",
          },
        },
        {
          question: "What is tree shaking and how does it work with React?",
          difficulty: "advanced",
          answer: {
            text: "Tree shaking eliminates dead code from your bundle by analyzing import/export statements and removing unused code.",
            points: [
              "Works with ES6 modules (import/export)",
              "Enabled by default in production builds",
              "Import only what you need from libraries",
              "Use named imports instead of default for better tree shaking",
            ],
            code: `// Good - tree shakeable\nimport { Button, Input } from 'components';\n\n// Bad - imports everything\nimport * as Components from 'components';\n\n// Good - specific import\nimport Button from 'components/Button';\n\n// Configure in webpack\nmodule.exports = {\n  mode: 'production',\n  optimization: {\n    usedExports: true, // Enable tree shaking\n  }\n};`,
            memoryTechnique:
              "Tree Shaking = Trim Extra Branches. Think: Pruning dead branches from a tree",
            simpleExplanation:
              "Tree shaking is like packing for a trip. Instead of bringing your entire closet (whole library), you only pack the clothes you'll actually wear (used imports). The bundler 'shakes the tree' and dead leaves (unused code) fall off, making your suitcase (bundle) lighter.",
          },
        },
      ],
    },
    {
      title: "Advanced Patterns",
      icon: "🎨",
      questions: [
        {
          question: "What are Higher-Order Components (HOC)?",
          difficulty: "advanced",
          answer: {
            text: "A Higher-Order Component is a function that takes a component and returns a new component with additional props or behavior. It's a pattern for reusing component logic.",
            points: [
              "HOC is a function: Component => Enhanced Component",
              "Used for cross-cutting concerns (auth, logging, etc.)",
              "Don't modify original component, compose it",
              "Largely replaced by Hooks in modern React",
            ],
            code: `function withAuth(Component) {\n  return function AuthenticatedComponent(props) {\n    const { isAuthenticated } = useAuth();\n    \n    if (!isAuthenticated) {\n      return <Redirect to="/login" />;\n    }\n    \n    return <Component {...props} />;\n  };\n}\n\nconst ProtectedPage = withAuth(Dashboard);`,
            memoryTechnique:
              "HOC = Higher Order, Component wrapper. Think: Gift wrapping a present (component) with extra features",
            simpleExplanation:
              "An HOC is like adding toppings to ice cream. You start with vanilla ice cream (basic component), and the HOC adds chocolate sauce, sprinkles, and a cherry (enhanced props/behavior). The ice cream is still ice cream, just better.",
          },
        },
        {
          question: "What is the Render Props pattern?",
          difficulty: "advanced",
          answer: {
            text: "Render Props is a technique for sharing code between components using a prop whose value is a function. The component with the render prop calls this function instead of implementing its own render logic.",
            points: [
              "Passes a function as a prop to share logic",
              "More flexible than HOCs in some cases",
              "Enables dynamic composition",
              "Can lead to callback hell if overused",
            ],
            code: `function Mouse({ render }) {\n  const [position, setPosition] = useState({ x: 0, y: 0 });\n  \n  useEffect(() => {\n    const handleMove = (e) => {\n      setPosition({ x: e.clientX, y: e.clientY });\n    };\n    window.addEventListener('mousemove', handleMove);\n    return () => window.removeEventListener('mousemove', handleMove);\n  }, []);\n  \n  return render(position);\n}\n\n<Mouse render={({ x, y }) => (\n  <div>Mouse at {x}, {y}</div>\n)} />`,
            memoryTechnique:
              "Render Props = Render function Passed as prop. Think: Delegate rendering to caller",
            simpleExplanation:
              "Render Props is like hiring a personal chef who asks you 'How do you want me to plate this dish?' You provide the plating instructions (render function), and the chef handles the cooking (shared logic). Same chef, different plating styles for different customers.",
          },
        },
        {
          question: "What is the Context API and when should you use it?",
          difficulty: "intermediate",
          answer: {
            text: "Context API provides a way to share values between components without explicitly passing props through every level of the tree.",
            points: [
              "Solves prop drilling problem",
              "Global state management for small to medium apps",
              "Provider component supplies value",
              "Consumer components access value",
              "All consumers re-render when value changes",
            ],
            code: `const ThemeContext = React.createContext('light');\n\nfunction App() {\n  const [theme, setTheme] = useState('dark');\n  \n  return (\n    <ThemeContext.Provider value={{ theme, setTheme }}>\n      <Toolbar />\n    </ThemeContext.Provider>\n  );\n}\n\nfunction ThemedButton() {\n  const { theme } = useContext(ThemeContext);\n  return <button className={theme}>Click</button>;\n}`,
            memoryTechnique:
              "Context = Central broadcasting station. Provider = Broadcaster, Consumer = Radio receiver",
            simpleExplanation:
              "Context is like a company-wide announcement system. Instead of playing telephone (prop drilling) where messages get passed person to person, you broadcast once (Provider) and everyone who needs to know (Consumers) can hear it directly through their speakers (useContext).",
          },
        },
        {
          question: "What is Error Boundary and how does it work?",
          difficulty: "intermediate",
          answer: {
            text: "Error Boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI.",
            points: [
              "Only works with class components (no hook equivalent yet)",
              "Catches errors during rendering, lifecycle methods, and constructors",
              "Does NOT catch errors in event handlers, async code, or server-side rendering",
              "Use componentDidCatch for logging and getDerivedStateFromError for UI",
            ],
            code: `class ErrorBoundary extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = { hasError: false };\n  }\n\n  static getDerivedStateFromError(error) {\n    return { hasError: true };\n  }\n\n  componentDidCatch(error, errorInfo) {\n    console.error('Error caught:', error, errorInfo);\n  }\n\n  render() {\n    if (this.state.hasError) {\n      return <h1>Something went wrong.</h1>;\n    }\n    return this.props.children;\n  }\n}\n\n// Usage\n<ErrorBoundary>\n  <MyComponent />\n</ErrorBoundary>`,
            memoryTechnique:
              "Error Boundary = Safety Net. Think: Catch errors before they crash the whole app",
            simpleExplanation:
              "Error Boundaries are like safety nets under a trapeze. If a performer (component) falls (throws error), the net catches them and the show continues with a substitute act (fallback UI). Without the net, the entire circus (app) would shut down.",
          },
        },
        {
          question: "What is Portals in React and when to use them?",
          difficulty: "advanced",
          answer: {
            text: "Portals provide a way to render children into a DOM node that exists outside the parent component's DOM hierarchy.",
            points: [
              "Created using ReactDOM.createPortal(child, container)",
              "Common for modals, tooltips, popovers",
              "Events still bubble up through React tree",
              "Useful for z-index and overflow issues",
            ],
            code: `function Modal({ children }) {\n  return ReactDOM.createPortal(\n    <div className="modal">\n      {children}\n    </div>,\n    document.getElementById('modal-root')\n  );\n}\n\n// In HTML\n<div id="root"></div>\n<div id="modal-root"></div>\n\n// Usage\nfunction App() {\n  return (\n    <div>\n      <h1>My App</h1>\n      <Modal>\n        <p>This renders outside the root div!</p>\n      </Modal>\n    </div>\n  );\n}`,
            memoryTechnique:
              "Portal = Teleport Outside. Think: Wormhole to another DOM location",
            simpleExplanation:
              "Portals are like having a secret tunnel from your house to your neighbor's backyard. Your child (component) lives with you but can play in their yard (different DOM node). They're still your child (events bubble up), but they're physically somewhere else.",
          },
        },
        {
          question: "What is Controlled vs Uncontrolled Components?",
          difficulty: "beginner",
          answer: {
            text: "Controlled Components: React state is the 'single source of truth'. Form data handled by React component.\n\nUncontrolled Components: Form data handled by the DOM itself. Use refs to get values.",
            points: [
              "Controlled: value prop + onChange handler, React controls state",
              "Uncontrolled: defaultValue prop, DOM handles state via ref",
              "Controlled: Better for validation and conditional UI",
              "Uncontrolled: Simpler, less code, useful for simple forms",
            ],
            code: `// Controlled Component\nfunction ControlledInput() {\n  const [value, setValue] = useState('');\n  return (\n    <input \n      value={value} \n      onChange={e => setValue(e.target.value)} \n    />\n  );\n}\n\n// Uncontrolled Component\nfunction UncontrolledInput() {\n  const inputRef = useRef();\n  const handleSubmit = () => {\n    alert(inputRef.current.value);\n  };\n  return <input ref={inputRef} defaultValue="Hello" />;\n}`,
            memoryTechnique:
              "Controlled = React Controls, Uncontrolled = DOM Controls. Think: Who's the boss?",
            simpleExplanation:
              "Controlled components are like a puppet on strings - React (puppeteer) controls every move. Uncontrolled components are like a dog on a leash - it does its own thing, and you just check in occasionally (ref) to see where it went.",
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
