import type {
  InterviewQuestionsMap,
  InterviewResourcesMap,
} from "../interviewTypes";

export const hldQuestions: InterviewQuestionsMap["HLD"] = {
  icon: "🏗️",
  sections: [
    {
      title: "System Design Fundamentals",
      icon: "🏗️",
      questions: [
        {
          question: "What are the key components of a High-Level Design?",
          difficulty: "beginner",
          answer: {
            points: [
              "System Architecture: Monolithic, Microservices, or SOA",
              "Service Breakdown: Identifying core services and responsibilities",
              "Data Flow: How data moves between services and external systems",
              "Data Storage: Choosing appropriate databases (SQL/NoSQL) and schemas",
              "Key Technologies: Programming languages, frameworks, and protocols",
              "Non-Functional Requirements: Scalability, availability, latency, and security",
            ],
            memoryTechnique:
              "HLD Components = SSDTKN: System, Services, Data flow, Technology, Key requirements, NFRs",
            simpleExplanation:
              "HLD is like designing a city. You decide on neighborhoods (services), roads connecting them (data flow), whether to build skyscrapers or houses (architecture), where to put water pipes and electricity (data storage), and ensure the city can grow and stay safe (scalability and security).",
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
          difficulty: "advanced",
          answer: {
            text: "The CAP Theorem states that a distributed data store can only guarantee two out of three properties:",
            points: [
              "Consistency (C): Every read receives the most recent write or an error",
              "Availability (A): Every request receives a response (without guarantee it's most recent)",
              "Partition Tolerance (P): System continues despite network partitions",
            ],
            note: "Partition Tolerance (P) is mandatory in distributed systems, so the trade-off is always between Consistency and Availability.",
            memoryTechnique:
              "CAP = Choose Any Pair (but P is mandatory). Think: Can't have it all",
            simpleExplanation:
              "CAP is like having a phone, internet, and electricity during a storm. You can have any two working, but rarely all three. If the network breaks (Partition), you must choose: wait for accurate data (Consistency) or show possibly old data (Availability). Banks choose C, social media chooses A.",
          },
        },
        {
          question: "What is the difference between SQL and NoSQL databases?",
          difficulty: "intermediate",
          answer: {
            text: "SQL databases are relational and structured, while NoSQL databases are non-relational and flexible.",
            points: [
              "SQL: ACID compliant, structured schema, vertical scaling, complex queries (JOINs)",
              "NoSQL: Eventually consistent, flexible schema, horizontal scaling, simple queries",
              "SQL: Best for complex relationships, transactions (banking, e-commerce)",
              "NoSQL: Best for large-scale data, high throughput (social media, analytics)",
            ],
            memoryTechnique:
              "SQL = Structured tables. NoSQL = Not Only SQL, flexible",
            simpleExplanation:
              "SQL is like a filing cabinet with labeled folders and strict organization - everything has its place. NoSQL is like a storage room where you can throw boxes in any arrangement - more flexible but harder to find specific combinations.",
          },
        },
        {
          question: "What is a Load Balancer and what are common algorithms?",
          difficulty: "intermediate",
          answer: {
            text: "A Load Balancer distributes incoming traffic across multiple servers to ensure no single server is overwhelmed.",
            points: [
              "Round Robin: Distributes requests sequentially",
              "Least Connections: Sends to server with fewest active connections",
              "IP Hash: Uses client IP to determine server (session affinity)",
              "Weighted Round Robin: Assigns weight based on server capacity",
            ],
            memoryTechnique:
              "Load Balancer Algorithms = RLIW: Round-robin, Least-conn, IP-hash, Weighted",
            simpleExplanation:
              "Load balancer is like a restaurant host distributing customers to tables. Round Robin is taking turns, Least Connections sends people to the emptiest table, IP Hash is 'you always sit at table 3', and Weighted sends more people to bigger tables (stronger servers).",
          },
        },
      ],
    },
    {
      title: "Design Patterns & Strategies",
      icon: "🎨",
      questions: [
        {
          question: "What is the role of a Message Queue?",
          difficulty: "intermediate",
          answer: {
            text: "Message Queues (e.g., Kafka, RabbitMQ) enable asynchronous communication between services.",
            points: [
              "Decoupling: Sender and receiver don't need to be available simultaneously",
              "Buffering/Load Leveling: Handles traffic spikes by queuing requests",
              "Reliability: Messages persisted until processed",
              "Asynchronous Processing: Offloads long-running tasks from main thread",
            ],
            memoryTechnique:
              "Message Queue = DBRA: Decouple, Buffer, Reliable, Async",
            simpleExplanation:
              "Message Queue is like a mailbox. You drop letters (messages) in the mailbox even if the recipient isn't home. The mail carrier (queue) keeps them safe until the recipient (consumer) picks them up. Both parties don't need to be present at the same time!",
          },
        },
        {
          question: "How would you design a Caching Strategy?",
          difficulty: "advanced",
          answer: {
            text: "Cache Placement: Client-side (Browser), CDN, Reverse Proxy (Nginx), Application Layer (in-memory), Data Layer (Redis/Memcached).",
            points: [
              "Cache Invalidation - TTL: Data expires after set time",
              "Write-Through: Data written to cache and database simultaneously",
              "Write-Back: Data written to cache first, then asynchronously to database",
              "Cache Eviction - LRU (Least Recently Used), LFU (Least Frequently Used)",
            ],
            memoryTechnique:
              "Cache Strategy = TWEL: TTL, Write-through, Eviction, LRU/LFU",
            simpleExplanation:
              "Caching is like keeping frequently used ingredients on your kitchen counter instead of going to the basement every time. TTL is 'this milk expires in 7 days', Write-Through is 'buy groceries and update the list immediately', LRU eviction is 'throw away what you haven't used recently'.",
          },
        },
        {
          question: "What is Database Sharding and when would you use it?",
          difficulty: "advanced",
          answer: {
            text: "Sharding is horizontally partitioning data across multiple databases, with each shard containing a subset of the total data.",
            points: [
              "Horizontal partitioning: Rows distributed across multiple databases",
              "Sharding key determines which shard holds the data",
              "Improves performance and scalability for large datasets",
              "Challenges: Cross-shard queries, rebalancing, increased complexity",
            ],
            memoryTechnique:
              "Sharding = Split Horizontally Across Resources Distributing INdividual data Groups",
            simpleExplanation:
              "Sharding is like having multiple filing cabinets instead of one huge cabinet. Cabinet A has customers A-M, Cabinet B has N-Z. You can access them in parallel (faster), but finding info across cabinets (cross-shard queries) is harder.",
          },
        },
        {
          question: "Explain Microservices vs Monolithic architecture",
          difficulty: "intermediate",
          answer: {
            text: "Monolithic: Single codebase, tightly coupled, deployed as one unit. Microservices: Multiple independent services, loosely coupled, deployed separately.",
            points: [
              "Monolithic: Simpler to develop initially, harder to scale",
              "Microservices: Complex setup, easier to scale and maintain long-term",
              "Monolithic: All-or-nothing deployment",
              "Microservices: Independent deployment, technology diversity",
            ],
            memoryTechnique:
              "Monolith = One big block. Microservices = Many small pieces",
            simpleExplanation:
              "Monolithic is like a cruise ship - everything in one vessel, hard to change direction. Microservices is like a fleet of speedboats - each independent, if one breaks others keep going, can change direction quickly. Cruise ship is simpler for small trips, fleet is better for complex missions.",
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
