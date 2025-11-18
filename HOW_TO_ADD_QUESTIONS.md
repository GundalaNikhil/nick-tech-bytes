# How to Add More Questions - Quick Guide

## 📝 Adding Questions to Existing Topics

### Step 1: Locate the Topic File

Navigate to `lib/topics/` and find the relevant file:

- `java.ts` - Java questions
- `springBoot.ts` - Spring Boot questions
- `react.ts` - React questions
- etc.

### Step 2: Add to Existing Section

```typescript
{
  title: "Your Section Title",
  questions: [
    // ... existing questions ...
    {
      question: "Your new question here?",
      answer: {
        text: "Main explanation here",
        points: [
          "Key point 1",
          "Key point 2",
          "Key point 3"
        ],
        code: `// Your code example
public class Example {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,
        language: "java",
        note: "Optional additional note here"
      }
    }
  ]
}
```

### Step 3: Create New Section

```typescript
export const yourTopicQuestions: InterviewQuestionsMap["YourTopic"] = {
  icon: "🎯",
  sections: [
    {
      title: "New Section Name",
      questions: [
        {
          question: "First question?",
          answer: {
            text: "Answer text",
          },
        },
      ],
    },
  ],
};
```

## 🎯 Real Example: Adding a Java Multithreading Question

### 1. Open `lib/topics/java.ts`

### 2. Add New Section (or add to existing)

```typescript
{
  title: "Multithreading & Concurrency",
  questions: [
    {
      question: "What is the difference between synchronized method and synchronized block?",
      answer: {
        text: "Synchronized methods lock the entire object, while synchronized blocks allow you to lock only a specific part of code with fine-grained control.",
        points: [
          "Synchronized Method: Locks the entire method, uses 'this' as lock object",
          "Synchronized Block: Locks only the specified code block, can use any object as lock",
          "Synchronized Block provides better performance and more control",
          "Can reduce contention by locking smaller critical sections"
        ],
        code: `// Synchronized Method
public synchronized void synchronizedMethod() {
    // entire method is locked
    count++;
}

// Synchronized Block
public void synchronizedBlock() {
    // other code here (not locked)

    synchronized(this) {
        // only this block is locked
        count++;
    }

    // more code here (not locked)
}

// Custom lock object
private final Object lock = new Object();

public void customLock() {
    synchronized(lock) {
        // critical section
        sharedResource.update();
    }
}`,
        language: "java",
        note: "Always prefer synchronized blocks over methods for better performance and flexibility."
      }
    },
    {
      question: "Explain the difference between wait() and sleep()?",
      answer: {
        points: [
          "wait(): Releases the lock, must be called within synchronized context, woken by notify()/notifyAll()",
          "sleep(): Holds the lock, can be called anywhere, wakes up after specified time",
          "wait() is for inter-thread communication, sleep() is for pausing execution",
          "wait() is in Object class, sleep() is in Thread class"
        ],
        code: `// wait() example
synchronized(lock) {
    while (condition) {
        lock.wait(); // releases lock, waits for notify
    }
    // proceeds when notified
}

// sleep() example
public void process() {
    try {
        Thread.sleep(1000); // pauses for 1 second, holds lock if any
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
}`,
        language: "java"
      }
    }
  ]
}
```

### 3. Save and Test

The questions will automatically appear in the UI with search and filter support!

## 🎨 Answer Format Options

### Text Only

```typescript
answer: {
  text: "Simple explanation in paragraph form.";
}
```

### Points Only

```typescript
answer: {
  points: ["Point 1", "Point 2", "Point 3"];
}
```

### Text + Points

```typescript
answer: {
  text: "Overview explanation",
  points: [
    "Detailed point 1",
    "Detailed point 2"
  ]
}
```

### Full Answer (Text + Points + Code + Note)

```typescript
answer: {
  text: "Main explanation",
  points: [
    "Key point 1",
    "Key point 2"
  ],
  code: `// Code example`,
  language: "java",
  note: "Important note or best practice"
}
```

## 🌟 Creating a Completely New Topic

### 1. Create New File: `lib/topics/newtopic.ts`

```typescript
import type {
  InterviewQuestionsMap,
  InterviewResourcesMap,
} from "../interviewTypes";

export const newTopicQuestions: InterviewQuestionsMap["NewTopic"] = {
  icon: "🚀",
  sections: [
    {
      title: "Getting Started",
      questions: [
        {
          question: "What is NewTopic?",
          answer: {
            text: "NewTopic is...",
          },
        },
      ],
    },
  ],
};

export const newTopicResources: InterviewResourcesMap["NewTopic"] = {
  icon: "🚀",
  resources: [
    {
      title: "Official Documentation",
      description: "Complete guide to NewTopic",
      url: "https://example.com",
      type: "Free",
    },
  ],
  keyTopics: ["Basics", "Advanced Concepts", "Best Practices"],
};
```

### 2. Update `lib/interviewTypes.ts`

```typescript
export type TopicKey =
  | "Java"
  | "SpringBoot"
  | "ReactJS"
  | "HLD"
  | "LLD"
  | "Docker"
  | "NewTopic"; // Add your new topic
```

### 3. Update `lib/interviewData.ts`

```typescript
import { newTopicQuestions, newTopicResources } from "./topics/newtopic";

export const topicsList: TopicKey[] = [
  "Java",
  "SpringBoot",
  "ReactJS",
  "HLD",
  "LLD",
  "Docker",
  "NewTopic", // Add to list
];

export const interviewQuestions: InterviewQuestionsMap = {
  Java: javaQuestions,
  SpringBoot: springBootQuestions,
  ReactJS: reactQuestions,
  HLD: hldQuestions,
  LLD: lldQuestions,
  Docker: dockerQuestions,
  NewTopic: newTopicQuestions, // Add mapping
};

export const interviewResources: InterviewResourcesMap = {
  Java: javaResources,
  SpringBoot: springBootResources,
  ReactJS: reactResources,
  HLD: hldResources,
  LLD: lldResources,
  Docker: dockerResources,
  NewTopic: newTopicResources, // Add mapping
};
```

### 4. Done! 🎉

Your new topic will now appear in:

- Topic selector
- Explore page
- Navigation menu

## 💡 Best Practices

### ✅ DO

- Use clear, concise question titles
- Provide detailed explanations
- Include code examples where relevant
- Add notes for important caveats
- Use proper language tags for syntax highlighting
- Keep points focused and specific

### ❌ DON'T

- Make questions too vague
- Use overly complex code examples
- Mix multiple concepts in one question
- Forget to specify code language
- Leave out important context

## 🔍 Code Languages Supported

Common language tags:

- `java`
- `javascript`
- `typescript`
- `python`
- `sql`
- `bash`
- `yaml`
- `json`
- `xml`

## 📊 Question Complexity Levels

### Beginner

```typescript
{
  question: "What is a variable in Java?",
  answer: {
    text: "A variable is a container that holds data...",
    code: `int age = 25;
String name = "John";`
  }
}
```

### Intermediate

```typescript
{
  question: "Explain the difference between ArrayList and LinkedList",
  answer: {
    text: "Both implement List interface but have different...",
    points: [
      "ArrayList: Fast random access, slow insertion",
      "LinkedList: Fast insertion, slow random access"
    ],
    code: `// ArrayList example
List<String> arrayList = new ArrayList<>();
arrayList.get(5); // O(1)

// LinkedList example
List<String> linkedList = new LinkedList<>();
linkedList.add(0, "first"); // O(1)`
  }
}
```

### Advanced

```typescript
{
  question: "How does the Java Memory Model ensure happens-before relationships?",
  answer: {
    text: "The JMM defines happens-before relationships through...",
    points: [
      "Program order rule",
      "Monitor lock rule",
      "Volatile variable rule",
      "Thread start/join rules",
      "Transitivity"
    ],
    code: `class VolatileExample {
    private volatile boolean flag = false;
    private int value = 0;

    public void writer() {
        value = 42;        // 1
        flag = true;       // 2 (happens-before)
    }

    public void reader() {
        if (flag) {        // 3 (happens-after 2)
            assert value == 42; // 4 (guaranteed to see 1)
        }
    }
}`,
    note: "Understanding happens-before is crucial for writing correct concurrent code."
  }
}
```

---

**Happy coding!** 🚀 If you have questions, check the existing topic files for more examples.
