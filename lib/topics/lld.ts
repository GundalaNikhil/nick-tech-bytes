import type {
  InterviewQuestionsMap,
  InterviewResourcesMap,
} from "../interviewTypes";

export const lldQuestions: InterviewQuestionsMap["LLD"] = {
  icon: "🔧",
  sections: [
    {
      title: "Design Principles",
      questions: [
        {
          question: "What are the SOLID Principles?",
          answer: {
            points: [
              "Single Responsibility Principle (SRP): A class should have only one reason to change",
              "Open/Closed Principle (OCP): Open for extension, closed for modification",
              "Liskov Substitution Principle (LSP): Superclass objects replaceable with subclass objects",
              "Interface Segregation Principle (ISP): Clients shouldn't depend on unused interfaces",
              "Dependency Inversion Principle (DIP): Depend on abstractions, not concrete implementations",
            ],
          },
        },
        {
          question:
            "Explain the difference between Composition and Inheritance",
          answer: {
            text: "Inheritance (Is-A): Subclass inherits from superclass. Strong coupling, can lead to fragile base class problem.\n\nComposition (Has-A): Class contains instance of another class. More flexible, allows runtime behavior composition.",
            note: "Favor Composition over Inheritance for loose coupling and better adherence to Open/Closed Principle.",
          },
        },
      ],
    },
    {
      title: "Design Patterns",
      questions: [
        {
          question: "Describe the Singleton Design Pattern",
          answer: {
            text: "Ensures a class has only one instance and provides global access point. Used for logging, configuration managers, or thread pools.",
            points: [
              "Private constructor prevents external instantiation",
              "Private static instance of the class",
              "Public static method returns the instance",
              "Use lazy initialization and double-checked locking for thread safety",
            ],
            code: `public class Singleton {\n    private static volatile Singleton instance;\n    \n    private Singleton() {}\n    \n    public static Singleton getInstance() {\n        if (instance == null) {\n            synchronized (Singleton.class) {\n                if (instance == null) {\n                    instance = new Singleton();\n                }\n            }\n        }\n        return instance;\n    }\n}`,
            language: "java",
          },
        },
        {
          question: "Describe the Factory Design Pattern",
          answer: {
            text: "Provides interface for creating objects in superclass, allowing subclasses to alter the type of objects created.",
            points: [
              "Delegates object instantiation to factory method",
              "Decouples client code from concrete classes",
              "Adheres to Open/Closed and Dependency Inversion Principles",
            ],
          },
        },
      ],
    },
  ],
};

export const lldResources: InterviewResourcesMap["LLD"] = {
  icon: "🔧",
  resources: [
    {
      title: "InterviewBit - LLD Interview Prep",
      description:
        "OOP principles, class diagrams, use case diagrams, design patterns for maintainable code",
      url: "https://www.interviewbit.com/low-level-design-interview-questions/",
      type: "Free",
    },
  ],
  keyTopics: [
    "SOLID Principles",
    "Design Patterns",
    "UML Diagrams",
    "OOP Concepts",
    "Code Organization",
  ],
};
