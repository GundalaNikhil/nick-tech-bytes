import type {
  InterviewQuestionsMap,
  InterviewResourcesMap,
} from "../interviewTypes";

export const springBootQuestions: InterviewQuestionsMap["SpringBoot"] = {
  icon: "🍃",
  sections: [
    {
      title: "Spring Boot Fundamentals",
      questions: [
        {
          question:
            "What is Spring Boot and how does it differ from Spring Framework?",
          answer: {
            text: "Spring Framework requires extensive configuration (XML or Java). Spring Boot simplifies setup and development with auto-configuration, production-ready features, and rapid development capabilities.",
          },
        },
        {
          question: "Explain Spring Boot Auto-configuration",
          answer: {
            text: "Auto-configuration automatically configures your Spring application based on classpath dependencies.",
            points: [
              "Detects dependencies like spring-boot-starter-web and H2 database",
              "Automatically configures Tomcat server and in-memory H2 datasource",
              "Eliminates manual bean definitions",
              "Achieved via @EnableAutoConfiguration annotation",
            ],
          },
        },
        {
          question: "What are Spring Boot Starters?",
          answer: {
            text: "Starters are convenient dependency descriptors for specific functionality. For example, spring-boot-starter-web includes all dependencies for building web applications: Tomcat, Spring MVC, and Jackson.",
          },
        },
      ],
    },
    {
      title: "Configuration & Management",
      questions: [
        {
          question: "How do you define and use Application Profiles?",
          answer: {
            text: "Profiles map beans and configurations to different environments (dev, test, prod).",
            points: [
              "Define environment-specific properties in application-dev.properties or application-prod.yml",
              "Activate via spring.profiles.active property",
              "Use command-line: --spring.profiles.active=prod",
            ],
          },
        },
        {
          question: "What is Spring Boot Actuator?",
          answer: {
            text: "Actuator provides production-ready features to monitor and manage applications through HTTP endpoints or JMX.",
            points: [
              "/health - Application health status",
              "/info - Custom application information",
              "/metrics - Memory usage, thread count",
              "/env - Environment properties",
            ],
          },
        },
      ],
    },
  ],
};

export const springBootResources: InterviewResourcesMap["SpringBoot"] = {
  icon: "🍃",
  resources: [
    {
      title: "GeeksforGeeks - 50+ Spring Boot Questions",
      description:
        "Auto-configuration, dependency management, starters, actuator, profiles, embedded servers",
      url: "https://www.geeksforgeeks.org/spring-boot-interview-questions/",
      type: "Free",
    },
  ],
  keyTopics: [
    "Auto-configuration",
    "Spring Boot Starters",
    "REST API Development",
    "Spring Data JPA",
    "Microservices",
  ],
};
