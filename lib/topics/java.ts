import type {
  InterviewQuestionsMap,
  InterviewResourcesMap,
} from "../interviewTypes";

export const javaQuestions: InterviewQuestionsMap["Java"] = {
  icon: "☕",
  sections: [
    {
      title: "JVM Architecture & Memory Management",
      questions: [
        {
          question: "Explain the JVM Architecture",
          answer: {
            text: "The Java Virtual Machine (JVM) is an abstract machine that provides a runtime environment for Java bytecode to be executed.",
            points: [
              "Class Loader Subsystem: Loads, links, and initializes classes",
              "Runtime Data Areas: Method Area, Heap, Stack, PC Registers, and Native Method Stacks",
              "Execution Engine: Executes bytecode using Interpreter, JIT Compiler, and Garbage Collector",
            ],
          },
        },
        {
          question: "Describe the different memory areas in the JVM",
          answer: {
            points: [
              "Heap: Stores all objects, arrays, and instance variables. Shared among threads and managed by GC",
              "Method Area: Stores class-level data like constant pool, field and method data",
              "Stack: Stores local variables, partial results, and method call frames. Each thread has its own",
              "PC Registers: Stores the address of the current JVM instruction for each thread",
              "Native Method Stacks: Stores information about native methods (non-Java code)",
            ],
          },
        },
        {
          question: "What is the role of the Garbage Collector (GC)?",
          answer: {
            text: "The GC automatically manages Heap memory by tracking all objects and removing those no longer referenced, preventing memory leaks.",
            points: [
              "Frees up memory by removing 'dead' objects",
              "Simplifies memory management for developers",
              "Common algorithms: Serial, Parallel, CMS, G1, ZGC",
            ],
          },
        },
      ],
    },
    {
      title: "Object-Oriented Programming",
      questions: [
        {
          question: "What are the four main pillars of OOP?",
          answer: {
            points: [
              "Encapsulation: Bundling data and methods into a single unit, restricting direct access",
              "Abstraction: Hiding complex implementation details, showing only essential features",
              "Inheritance: One class acquires properties and behaviors from another, promoting code reusability",
              "Polymorphism: Objects taking many forms through Method Overloading (compile-time) and Overriding (runtime)",
            ],
          },
        },
        {
          question:
            "Explain the difference between interface and abstract class",
          answer: {
            text: "Interface: Defines a contract with implicitly public and abstract methods. A class can implement multiple interfaces. Used for 100% abstraction.\n\nAbstract Class: Can have both abstract and concrete methods. A class can only extend one abstract class. Provides common base implementation for subclasses.",
          },
        },
      ],
    },
    {
      title: "Collections Framework",
      questions: [
        {
          question: "Differentiate between ArrayList and LinkedList",
          answer: {
            text: "ArrayList: Uses dynamic array, better for random access with O(1) time complexity. Insertion/deletion in middle is slow (O(n)).\n\nLinkedList: Uses doubly linked list, better for frequent insertions/deletions at beginning or end (O(1)). Random access is slow (O(n)).",
          },
        },
        {
          question: "What is the difference between HashMap and Hashtable?",
          answer: {
            text: "HashMap: Non-synchronized (not thread-safe), allows one null key and multiple null values, generally faster.\n\nHashtable: Synchronized (thread-safe), doesn't allow null keys or values, slower due to synchronization overhead.",
            note: "Hashtable is legacy; ConcurrentHashMap is the modern alternative for concurrent scenarios.",
          },
        },
      ],
    },
  ],
};

export const javaResources: InterviewResourcesMap["Java"] = {
  icon: "☕",
  resources: [
    {
      title: "GeeksforGeeks - 200+ Core Java Questions",
      description:
        "Covers JVM, JIT compiler, OOP, multithreading, exception handling, and design patterns",
      url: "https://www.geeksforgeeks.org/java-interview-questions/",
      type: "Free",
    },
    {
      title: "InterviewBit - Complete Java Guide",
      description:
        "String Handling, Java 8, multithreading, OOPs, exception handling with code examples",
      url: "https://www.interviewbit.com/java-interview-questions/",
      type: "Free",
    },
  ],
  keyTopics: [
    "JVM Architecture",
    "Collections Framework",
    "Multithreading",
    "Java 8+ Features",
    "Design Patterns",
  ],
};
