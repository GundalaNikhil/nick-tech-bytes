import type {
  InterviewQuestionsMap,
  InterviewResourcesMap,
} from "../interviewTypes";

export const hldQuestions: InterviewQuestionsMap["HLD"] = {
  icon: "🏗️",
  sections: [
    {
      title: "System Design Fundamentals",
      questions: [
        {
          question: "What are the key components of a High-Level Design?",
          answer: {
            points: [
              "System Architecture: Monolithic, Microservices, or SOA",
              "Service Breakdown: Identifying core services and responsibilities",
              "Data Flow: How data moves between services and external systems",
              "Data Storage: Choosing appropriate databases (SQL/NoSQL) and schemas",
              "Key Technologies: Programming languages, frameworks, and protocols",
              "Non-Functional Requirements: Scalability, availability, latency, and security",
            ],
          },
        },
        {
          question: "How do you achieve Scalability in a system?",
          answer: {
            points: [
              "Vertical Scaling: Increasing capacity of a single server (more CPU, RAM)",
              "Horizontal Scaling: Adding more servers/nodes (preferred for web-scale)",
              "Load Balancing: Distributing incoming traffic across multiple servers",
              "Database Sharding/Partitioning: Splitting database into smaller pieces",
              "Caching: Storing frequently accessed data in fast-access layer",
            ],
          },
        },
        {
          question: "Explain the CAP Theorem and its trade-offs",
          answer: {
            text: "The CAP Theorem states that a distributed data store can only guarantee two out of three properties:",
            points: [
              "Consistency (C): Every read receives the most recent write or an error",
              "Availability (A): Every request receives a response (without guarantee it's most recent)",
              "Partition Tolerance (P): System continues despite network partitions",
            ],
            note: "Partition Tolerance (P) is mandatory in distributed systems, so the trade-off is always between Consistency and Availability.",
          },
        },
      ],
    },
    {
      title: "Design Patterns & Strategies",
      questions: [
        {
          question: "What is the role of a Message Queue?",
          answer: {
            text: "Message Queues (e.g., Kafka, RabbitMQ) enable asynchronous communication between services.",
            points: [
              "Decoupling: Sender and receiver don't need to be available simultaneously",
              "Buffering/Load Leveling: Handles traffic spikes by queuing requests",
              "Reliability: Messages persisted until processed",
              "Asynchronous Processing: Offloads long-running tasks from main thread",
            ],
          },
        },
        {
          question: "How would you design a Caching Strategy?",
          answer: {
            text: "Cache Placement: Client-side (Browser), CDN, Reverse Proxy (Nginx), Application Layer (in-memory), Data Layer (Redis/Memcached).",
            points: [
              "Cache Invalidation - TTL: Data expires after set time",
              "Write-Through: Data written to cache and database simultaneously",
              "Write-Back: Data written to cache first, then asynchronously to database",
              "Cache Eviction - LRU (Least Recently Used), LFU (Least Frequently Used)",
            ],
          },
        },
      ],
    },
  ],
};

export const hldResources: InterviewResourcesMap["HLD"] = {
  icon: "🏗️",
  resources: [
    {
      title: "GeeksforGeeks - HLD Questions",
      description:
        "System architecture, scalability, CAP theorem, RESTful API design, disaster recovery",
      url: "https://www.geeksforgeeks.org/high-level-design-interview-questions/",
      type: "Free",
    },
  ],
  keyTopics: [
    "Scalability",
    "Load Balancing",
    "Database Design",
    "Caching",
    "Microservices",
  ],
};
