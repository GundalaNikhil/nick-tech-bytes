import type {
  InterviewQuestionsMap,
  InterviewResourcesMap,
} from "../interviewTypes";
import { java8Sections } from "./java8";

export const javaQuestions: InterviewQuestionsMap["Java"] = {
  icon: "☕",
  sections: [
    {
      title: "JVM Architecture & Memory Management",
      icon: "🏗️",
      questions: [
        {
          question: "Explain the JVM Architecture",
          difficulty: "intermediate",
          answer: {
            text: "The Java Virtual Machine (JVM) is an abstract machine that provides a runtime environment for Java bytecode to be executed.",
            points: [
              "Class Loader Subsystem: Loads, links, and initializes classes",
              "Runtime Data Areas: Method Area, Heap, Stack, PC Registers, and Native Method Stacks",
              "Execution Engine: Executes bytecode using Interpreter, JIT Compiler, and Garbage Collector",
            ],
            memoryTechnique:
              "Remember: **CRE** - **C**lass Loader, **R**untime Data Areas, **E**xecution Engine",
            simpleExplanation:
              "Think of JVM as a **translator at a conference**. The translator (JVM) takes your speech (Java code) and converts it into a language everyone understands (machine code), using a script (bytecode) to remember what to say next.",
            visualHtml: `<div style="background: linear-gradient(135deg, #1e3a8a 0%, #1e293b 100%); padding: 2rem; border-radius: 12px; border: 1px solid #3b82f6; margin: 1.5rem 0;">
  <div style="display: flex; flex-direction: column; gap: 1.5rem;">
    <div style="background: #1e293b; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #60a5fa;">
      <div style="color: #60a5fa; font-weight: bold; margin-bottom: 0.5rem;">1️⃣ Class Loader</div>
      <div style="color: #94a3b8; font-size: 0.875rem;">Loads .class files into memory</div>
    </div>
    <div style="text-align: center; color: #60a5fa; font-size: 1.5rem;">⬇️</div>
    <div style="background: #1e293b; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #34d399;">
      <div style="color: #34d399; font-weight: bold; margin-bottom: 0.5rem;">2️⃣ Runtime Data Areas</div>
      <div style="color: #94a3b8; font-size: 0.875rem;">Heap, Stack, Method Area, PC Registers</div>
    </div>
    <div style="text-align: center; color: #34d399; font-size: 1.5rem;">⬇️</div>
    <div style="background: #1e293b; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #f59e0b;">
      <div style="color: #f59e0b; font-weight: bold; margin-bottom: 0.5rem;">3️⃣ Execution Engine</div>
      <div style="color: #94a3b8; font-size: 0.875rem;">Interpreter + JIT Compiler + GC</div>
    </div>
  </div>
</div>`,
          },
        },
        {
          question: "Describe the different memory areas in the JVM",
          difficulty: "intermediate",
          answer: {
            points: [
              "**Heap**: Stores all objects, arrays, and instance variables. Shared among threads and managed by GC",
              "**Method Area**: Stores class-level data like constant pool, field and method data",
              "**Stack**: Stores local variables, partial results, and method call frames. Each thread has its own",
              "**PC Registers**: Stores the address of the current JVM instruction for each thread",
              "**Native Method Stacks**: Stores information about native methods (non-Java code)",
            ],
            memoryTechnique:
              '**HMSPC** = **H**eap **M**ethod **S**tack **P**C **C**(Native) - "**H**oney **M**akes **S**weet **P**an**C**akes"',
            simpleExplanation:
              "Think of JVM memory like a **restaurant kitchen**: **Heap** is the main dining area (shared space), **Stack** is each chef's personal workstation (private), **Method Area** is the recipe book (shared instructions), **PC Register** is the order ticket (current task), and **Native Stack** is the delivery area (external orders).",
            visualHtml: `<div style="background: #0f172a; padding: 2rem; border-radius: 12px; border: 1px solid #334155; margin: 1.5rem 0;">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
    <div style="background: linear-gradient(135deg, #dc2626 20%, #991b1b); padding: 1.5rem; border-radius: 8px; text-align: center;">
      <div style="font-size: 2rem; margin-bottom: 0.5rem;">🏢</div>
      <div style="color: #fca5a5; font-weight: bold; margin-bottom: 0.5rem;">HEAP</div>
      <div style="color: #e5e7eb; font-size: 0.75rem;">Objects & Arrays<br/>Shared, GC Managed</div>
    </div>
    <div style="background: linear-gradient(135deg, #2563eb 20%, #1e40af); padding: 1.5rem; border-radius: 8px; text-align: center;">
      <div style="font-size: 2rem; margin-bottom: 0.5rem;">📚</div>
      <div style="color: #93c5fd; font-weight: bold; margin-bottom: 0.5rem;">METHOD AREA</div>
      <div style="color: #e5e7eb; font-size: 0.75rem;">Class Data<br/>Shared</div>
    </div>
    <div style="background: linear-gradient(135deg, #059669 20%, #047857); padding: 1.5rem; border-radius: 8px; text-align: center;">
      <div style="font-size: 2rem; margin-bottom: 0.5rem;">📚</div>
      <div style="color: #6ee7b7; font-weight: bold; margin-bottom: 0.5rem;">STACK</div>
      <div style="color: #e5e7eb; font-size: 0.75rem;">Local Variables<br/>Per Thread</div>
    </div>
    <div style="background: linear-gradient(135deg, #7c3aed 20%, #5b21b6); padding: 1.5rem; border-radius: 8px; text-align: center;">
      <div style="font-size: 2rem; margin-bottom: 0.5rem;">📍</div>
      <div style="color: #c4b5fd; font-weight: bold; margin-bottom: 0.5rem;">PC REGISTER</div>
      <div style="color: #e5e7eb; font-size: 0.75rem;">Current Instruction<br/>Per Thread</div>
    </div>
    <div style="background: linear-gradient(135deg, #d97706 20%, #b45309); padding: 1.5rem; border-radius: 8px; text-align: center;">
      <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔧</div>
      <div style="color: #fde047; font-weight: bold; margin-bottom: 0.5rem;">NATIVE STACK</div>
      <div style="color: #e5e7eb; font-size: 0.75rem;">Native Methods<br/>Per Thread</div>
    </div>
  </div>
</div>`,
          },
        },
        {
          question: "What is the role of the Garbage Collector (GC)?",
          difficulty: "beginner",
          answer: {
            text: "The GC automatically manages Heap memory by tracking all objects and removing those no longer referenced, preventing memory leaks.",
            points: [
              "Frees up memory by removing 'dead' objects",
              "Simplifies memory management for developers",
              "Common algorithms: Serial, Parallel, CMS, G1, ZGC",
            ],
            memoryTechnique:
              "GC = **G**arbage **C**leaner = Your code's **automatic janitor** 🧹",
            simpleExplanation:
              "GC is like a **self-cleaning oven**. You cook (create objects), and when you're done, the oven automatically cleans up the mess (unused objects) without you having to scrub it manually. You just keep cooking!",
          },
        },
        {
          question: "What is the difference between Stack and Heap memory?",
          difficulty: "beginner",
          answer: {
            text: "Stack memory is used for static memory allocation (local variables, method calls) and follows LIFO order. Heap is used for dynamic memory allocation (objects) and allows random access.",
            points: [
              "**Stack**: Fast, small, thread-specific, automatically managed, stores primitives and references",
              "**Heap**: Slower, large, shared, GC managed, stores actual objects",
              "**Stack**: Throws StackOverflowError when full",
              "**Heap**: Throws OutOfMemoryError when full",
            ],
            memoryTechnique:
              "**STACK** = **S**mall **T**emporary **A**uto-managed **C**lean **K**eeper vs **HEAP** = **H**uge **E**veryone **A**ccesses **P**ermanent-ish",
            simpleExplanation:
              "**Stack** is like your **desk drawer** - small, organized, quick access, only you use it. **Heap** is like a **warehouse** - huge, shared by everyone, takes longer to find things, needs someone to clean it up (GC).",
            visualHtml: `<div style="background: #1e293b; padding: 2rem; border-radius: 12px; margin: 1.5rem 0; border: 1px solid #334155;">
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
    <div style="background: linear-gradient(180deg, #1e40af 0%, #1e293b 100%); padding: 1.5rem; border-radius: 8px; border: 2px solid #3b82f6;">
      <div style="text-align: center; color: #60a5fa; font-weight: bold; font-size: 1.25rem; margin-bottom: 1rem;">📚 STACK</div>
      <div style="color: #94a3b8; font-size: 0.875rem; line-height: 1.6;">
        <div style="margin-bottom: 0.5rem;">⚡ <strong>Fast</strong> access</div>
        <div style="margin-bottom: 0.5rem;">📏 <strong>Small</strong> size</div>
        <div style="margin-bottom: 0.5rem;">🔒 <strong>Thread-specific</strong></div>
        <div style="margin-bottom: 0.5rem;">🤖 <strong>Auto-managed</strong></div>
        <div style="margin-bottom: 0.5rem;">📦 <strong>LIFO</strong> order</div>
        <div style="margin-top: 1rem; padding: 0.75rem; background: #0f172a; border-radius: 4px; color: #fca5a5; text-align: center; font-size: 0.75rem;">❌ StackOverflowError</div>
      </div>
    </div>
    <div style="background: linear-gradient(180deg, #dc2626 0%, #1e293b 100%); padding: 1.5rem; border-radius: 8px; border: 2px solid #ef4444;">
      <div style="text-align: center; color: #fca5a5; font-weight: bold; font-size: 1.25rem; margin-bottom: 1rem;">🏢 HEAP</div>
      <div style="color: #94a3b8; font-size: 0.875rem; line-height: 1.6;">
        <div style="margin-bottom: 0.5rem;">🐢 <strong>Slower</strong> access</div>
        <div style="margin-bottom: 0.5rem;">🌐 <strong>Large</strong> size</div>
        <div style="margin-bottom: 0.5rem;">🤝 <strong>Shared</strong> by threads</div>
        <div style="margin-bottom: 0.5rem;">🧹 <strong>GC managed</strong></div>
        <div style="margin-bottom: 0.5rem;">🎲 <strong>Random</strong> access</div>
        <div style="margin-top: 1rem; padding: 0.75rem; background: #0f172a; border-radius: 4px; color: #fca5a5; text-align: center; font-size: 0.75rem;">❌ OutOfMemoryError</div>
      </div>
    </div>
  </div>
</div>`,
          },
        },
        {
          question: "Explain ClassLoader in Java",
          difficulty: "intermediate",
          answer: {
            text: "ClassLoader is a subsystem of JVM responsible for loading class files. When a Java program runs, it's loaded by ClassLoaders, not all at once but on demand.",
            points: [
              "**Bootstrap ClassLoader**: Loads core Java classes (rt.jar) - highest priority",
              "**Extension ClassLoader**: Loads classes from extension directories (jre/lib/ext)",
              "**Application ClassLoader**: Loads classes from application classpath",
            ],
            memoryTechnique:
              '**BEA** = **B**ootstrap **E**xtension **A**pplication - "**B**e **E**xtra **A**lert!"',
            simpleExplanation:
              "ClassLoaders are like **security checkpoints at an airport**. **Bootstrap** (TSA Pre-check) - trusted, fast track. **Extension** (regular security) - standard check. **Application** (customs) - checks your personal baggage. Each level has different trust and speed!",
          },
        },
      ],
    },
    {
      title: "Object-Oriented Programming",
      icon: "🎯",
      questions: [
        {
          question: "What are the four main pillars of OOP?",
          difficulty: "beginner",
          answer: {
            points: [
              "**Encapsulation**: Bundling data and methods into a single unit, restricting direct access",
              "**Abstraction**: Hiding complex implementation details, showing only essential features",
              "**Inheritance**: One class acquires properties and behaviors from another, promoting code reusability",
              "**Polymorphism**: Objects taking many forms through Method Overloading (compile-time) and Overriding (runtime)",
            ],
            memoryTechnique:
              '**APIE** = **A**bstraction **P**olymorphism **I**nheritance **E**ncapsulation - "A **PIE** is better when all ingredients are together!" 🥧',
            simpleExplanation:
              "Think of a **car**: **Encapsulation** = all parts sealed in the body, **Abstraction** = you just press gas/brake (don't need to know engine details), **Inheritance** = electric cars inherit from regular cars, **Polymorphism** = same steering wheel works differently in different cars!",
            visualHtml: `<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 2rem; border-radius: 12px; border: 1px solid #334155; margin: 1.5rem 0;">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem;">
    <div style="background: #1e293b; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #3b82f6;">
      <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔒</div>
      <div style="color: #60a5fa; font-weight: bold; font-size: 1.125rem; margin-bottom: 0.75rem;">Encapsulation</div>
      <div style="color: #94a3b8; font-size: 0.875rem; margin-bottom: 0.5rem;">Bundle data + methods</div>
      <div style="background: #0f172a; padding: 0.75rem; border-radius: 4px; margin-top: 0.75rem;">
        <code style="color: #34d399; font-size: 0.75rem;">private int age;<br/>public int getAge()</code>
      </div>
    </div>
    <div style="background: #1e293b; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #8b5cf6;">
      <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎭</div>
      <div style="color: #a78bfa; font-weight: bold; font-size: 1.125rem; margin-bottom: 0.75rem;">Abstraction</div>
      <div style="color: #94a3b8; font-size: 0.875rem; margin-bottom: 0.5rem;">Hide complexity</div>
      <div style="background: #0f172a; padding: 0.75rem; border-radius: 4px; margin-top: 0.75rem;">
        <code style="color: #34d399; font-size: 0.75rem;">interface Animal {<br/>  void makeSound();<br/>}</code>
      </div>
    </div>
    <div style="background: #1e293b; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #10b981;">
      <div style="font-size: 2rem; margin-bottom: 0.5rem;">🧬</div>
      <div style="color: #34d399; font-weight: bold; font-size: 1.125rem; margin-bottom: 0.75rem;">Inheritance</div>
      <div style="color: #94a3b8; font-size: 0.875rem; margin-bottom: 0.5rem;">Reuse code</div>
      <div style="background: #0f172a; padding: 0.75rem; border-radius: 4px; margin-top: 0.75rem;">
        <code style="color: #34d399; font-size: 0.75rem;">class Dog extends<br/>Animal { }</code>
      </div>
    </div>
    <div style="background: #1e293b; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #f59e0b;">
      <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔄</div>
      <div style="color: #fbbf24; font-weight: bold; font-size: 1.125rem; margin-bottom: 0.75rem;">Polymorphism</div>
      <div style="color: #94a3b8; font-size: 0.875rem; margin-bottom: 0.5rem;">Many forms</div>
      <div style="background: #0f172a; padding: 0.75rem; border-radius: 4px; margin-top: 0.75rem;">
        <code style="color: #34d399; font-size: 0.75rem;">add(int a, int b)<br/>add(double a, double b)</code>
      </div>
    </div>
  </div>
</div>`,
          },
        },
        {
          question:
            "Explain the difference between interface and abstract class",
          difficulty: "intermediate",
          answer: {
            text: "**Interface**: Defines a contract with implicitly public and abstract methods. A class can implement multiple interfaces. Used for 100% abstraction.\n\n**Abstract Class**: Can have both abstract and concrete methods. A class can only extend one abstract class. Provides common base implementation for subclasses.",
            points: [
              "Interface: Multiple inheritance possible, no state (variables)",
              "Abstract Class: Single inheritance, can have state and constructors",
              "Interface: All methods public by default (Java 8+ allows default methods)",
              "Abstract Class: Can have any access modifier",
            ],
            memoryTechnique:
              "**Interface** = **I** can **INTERACT** with **MANY**, **Abstract** = **A** parent **ALONE** (single inheritance)",
            simpleExplanation:
              '**Interface** is like a **contract** - "I promise to do these things" (e.g., all birds must fly, but they fly differently). **Abstract Class** is like a **family recipe** with some steps written down and some you figure out yourself (e.g., "Make pasta" is defined, but "Add your sauce" is abstract).',
            visualHtml: `<div style="background: #0f172a; padding: 2rem; border-radius: 12px; margin: 1.5rem 0; border: 1px solid #334155;">
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
    <div style="background: linear-gradient(180deg, #6366f1 0%, #1e293b 100%); padding: 1.5rem; border-radius: 8px; border: 2px solid #818cf8;">
      <div style="text-align: center; color: #c7d2fe; font-weight: bold; font-size: 1.25rem; margin-bottom: 1rem;">📜 INTERFACE</div>
      <div style="color: #e0e7ff; font-size: 0.875rem; line-height: 1.6;">
        <div style="margin-bottom: 0.75rem;">✅ Multiple implementation</div>
        <div style="margin-bottom: 0.75rem;">✅ 100% abstraction</div>
        <div style="margin-bottom: 0.75rem;">✅ Only constants (final)</div>
        <div style="margin-bottom: 0.75rem;">✅ Default/Static methods (Java 8+)</div>
        <div style="margin-top: 1rem; padding: 0.75rem; background: #0f172a; border-radius: 4px;">
          <code style="color: #34d399; font-size: 0.75rem;">interface Flyable {<br/>  void fly();<br/>}</code>
        </div>
      </div>
    </div>
    <div style="background: linear-gradient(180deg, #ec4899 0%, #1e293b 100%); padding: 1.5rem; border-radius: 8px; border: 2px solid #f472b6;">
      <div style="text-align: center; color: #fbcfe8; font-weight: bold; font-size: 1.25rem; margin-bottom: 1rem;">🏛️ ABSTRACT CLASS</div>
      <div style="color: #fce7f3; font-size: 0.875rem; line-height: 1.6;">
        <div style="margin-bottom: 0.75rem;">❌ Single inheritance only</div>
        <div style="margin-bottom: 0.75rem;">✅ Partial abstraction</div>
        <div style="margin-bottom: 0.75rem;">✅ Can have state (variables)</div>
        <div style="margin-bottom: 0.75rem;">✅ Constructor allowed</div>
        <div style="margin-top: 1rem; padding: 0.75rem; background: #0f172a; border-radius: 4px;">
          <code style="color: #34d399; font-size: 0.75rem;">abstract class Animal {<br/>  abstract void sound();<br/>  void sleep() {...}<br/>}</code>
        </div>
      </div>
    </div>
  </div>
</div>`,
          },
        },
        {
          question: "What is Method Overloading vs Method Overriding?",
          difficulty: "beginner",
          answer: {
            text: "**Method Overloading** (Compile-time Polymorphism): Same method name with different parameters in the same class.\n\n**Method Overriding** (Runtime Polymorphism): Subclass provides specific implementation of a method already defined in parent class.",
            points: [
              "Overloading: Same class, different signature, resolved at compile time",
              "Overriding: Parent-child relationship, same signature, resolved at runtime",
              "Overloading: Return type can be different",
              "Overriding: Return type must be same or covariant",
            ],
            memoryTechnique:
              "**LOAD**ing = **L**ocal **O**perations **A**llow **D**ifferent parameters (Overloading in same class). **RIDE**ing = **R**eplace **I**mplementation **D**uring **E**xecution (Overriding in child class)",
            simpleExplanation:
              "**Overloading** = Having multiple **tools with the same name** but for different jobs (hammer for nails, hammer for tent pegs). **Overriding** = Your **teenager learns to drive** - they replace your driving style with their own version when they get the car!",
          },
        },
      ],
    },
    {
      title: "Collections Framework",
      icon: "📚",
      questions: [
        {
          question: "Differentiate between ArrayList and LinkedList",
          difficulty: "beginner",
          answer: {
            text: "**ArrayList**: Uses dynamic array, better for random access with O(1) time complexity. Insertion/deletion in middle is slow (O(n)).\n\n**LinkedList**: Uses doubly linked list, better for frequent insertions/deletions at beginning or end (O(1)). Random access is slow (O(n)).",
            points: [
              "ArrayList: Fast retrieval (get), slow insertion/deletion",
              "LinkedList: Fast insertion/deletion, slow retrieval",
              "ArrayList: Better memory locality (cache-friendly)",
              "LinkedList: More memory overhead (stores node references)",
            ],
            memoryTechnique:
              "**Array** = **A**ccess **R**eally **R**apidly **A**nywhere **Y**ou want. **Linked** = **L**ightning **I**nserts **N**o **K**eep **E**lements **D**ensely",
            simpleExplanation:
              "**ArrayList** is like a **row of houses** - easy to find house #42, but hard to squeeze a new house in the middle. **LinkedList** is like a **train** - easy to add/remove cars, but you have to walk through all cars to reach the end.",
            visualHtml: `<div style="background: #1e293b; padding: 2rem; border-radius: 12px; margin: 1.5rem 0; border: 1px solid #334155;">
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
    <div style="background: linear-gradient(135deg, #059669 0%, #047857 100%); padding: 1.5rem; border-radius: 8px; border: 2px solid #10b981;">
      <div style="text-align: center; font-size: 2rem; margin-bottom: 0.5rem;">📦 📦 📦</div>
      <div style="text-align: center; color: #6ee7b7; font-weight: bold; font-size: 1.125rem; margin-bottom: 1rem;">ArrayList</div>
      <div style="color: #d1fae5; font-size: 0.875rem; line-height: 1.6;">
        <div style="margin-bottom: 0.5rem;">⚡ get(i): O(1)</div>
        <div style="margin-bottom: 0.5rem;">🐢 add(i, item): O(n)</div>
        <div style="margin-bottom: 0.5rem;">🐢 remove(i): O(n)</div>
        <div style="margin-bottom: 0.5rem;">💾 Less memory</div>
        <div style="margin-bottom: 0.5rem;">🎯 Cache-friendly</div>
      </div>
    </div>
    <div style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 1.5rem; border-radius: 8px; border: 2px solid #ef4444;">
      <div style="text-align: center; font-size: 2rem; margin-bottom: 0.5rem;">🔗 🔗 🔗</div>
      <div style="text-align: center; color: #fca5a5; font-weight: bold; font-size: 1.125rem; margin-bottom: 1rem;">LinkedList</div>
      <div style="color: #fecaca; font-size: 0.875rem; line-height: 1.6;">
        <div style="margin-bottom: 0.5rem;">🐢 get(i): O(n)</div>
        <div style="margin-bottom: 0.5rem;">⚡ addFirst(): O(1)</div>
        <div style="margin-bottom: 0.5rem;">⚡ removeFirst(): O(1)</div>
        <div style="margin-bottom: 0.5rem;">💾 More memory</div>
        <div style="margin-bottom: 0.5rem;">🔀 Not cache-friendly</div>
      </div>
    </div>
  </div>
</div>`,
          },
        },
        {
          question: "What is the difference between HashMap and Hashtable?",
          difficulty: "intermediate",
          answer: {
            text: "**HashMap**: Non-synchronized (not thread-safe), allows one null key and multiple null values, generally faster.\n\n**Hashtable**: Synchronized (thread-safe), doesn't allow null keys or values, slower due to synchronization overhead.",
            points: [
              "HashMap: Better for single-threaded applications",
              "Hashtable: Legacy class, prefer ConcurrentHashMap for multithreading",
              "HashMap: Inherits from AbstractMap",
              "Hashtable: Inherits from Dictionary (obsolete)",
            ],
            note: "Hashtable is legacy; ConcurrentHashMap is the modern alternative for concurrent scenarios.",
            memoryTechnique:
              "**HashMap** = **H**appy **A**llows **S**peed **H**as nulls **M**odern **A**pproach **P**references. **Hashtable** = **H**eavy **A**ncient **S**ynchronized **H**ates nulls **T**hread-safe **A**lways **B**locks **L**egacy **E**ra",
            simpleExplanation:
              "**HashMap** is like a **self-service restaurant** - fast, no lines, but can get messy if multiple people grab the same dish. **Hashtable** is like a **waiter-served restaurant** - slower, orderly, but everyone waits their turn. **ConcurrentHashMap** is like **multiple self-service stations** - fast AND organized!",
          },
        },
        {
          question: "Explain HashSet, LinkedHashSet, and TreeSet",
          difficulty: "intermediate",
          answer: {
            text: "All three are Set implementations (no duplicates), but differ in ordering and performance.",
            points: [
              "**HashSet**: No ordering, O(1) operations, uses HashMap internally",
              "**LinkedHashSet**: Maintains insertion order, O(1) operations, uses LinkedHashMap",
              "**TreeSet**: Sorted order (natural/comparator), O(log n) operations, uses Red-Black Tree",
            ],
            memoryTechnique:
              "**Hash** = **H**urry **A**nywhere **S**crambled **H**eap. **LinkedHash** = **L**ine **I**n **N**ice **K**eeping **E**ntry **D**irection. **Tree** = **T**idy **R**ows **E**verything **E**levated (sorted)",
            simpleExplanation:
              "**HashSet** = Random **parking lot** (park anywhere). **LinkedHashSet** = **Queue** (first come, first position remembered). **TreeSet** = **Library shelf** (books sorted alphabetically).",
            visualHtml: `<div style="background: #0f172a; padding: 2rem; border-radius: 12px; margin: 1.5rem 0; border: 1px solid #334155;">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem;">
    <div style="background: #1e293b; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #3b82f6;">
      <div style="font-size: 2rem; text-align: center; margin-bottom: 0.5rem;">🎲</div>
      <div style="color: #60a5fa; font-weight: bold; text-align: center; margin-bottom: 1rem;">HashSet</div>
      <div style="color: #94a3b8; font-size: 0.875rem;">
        <div>❌ No order</div>
        <div>⚡ O(1) ops</div>
        <div>🎯 Fastest</div>
        <div style="margin-top: 0.75rem; padding: 0.5rem; background: #0f172a; border-radius: 4px; text-align: center; color: #60a5fa; font-size: 0.75rem;">[5, 2, 9, 1]</div>
      </div>
    </div>
    <div style="background: #1e293b; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #10b981;">
      <div style="font-size: 2rem; text-align: center; margin-bottom: 0.5rem;">🔗</div>
      <div style="color: #34d399; font-weight: bold; text-align: center; margin-bottom: 1rem;">LinkedHashSet</div>
      <div style="color: #94a3b8; font-size: 0.875rem;">
        <div>✅ Insertion order</div>
        <div>⚡ O(1) ops</div>
        <div>💾 More memory</div>
        <div style="margin-top: 0.75rem; padding: 0.5rem; background: #0f172a; border-radius: 4px; text-align: center; color: #34d399; font-size: 0.75rem;">[5, 2, 9, 1]</div>
      </div>
    </div>
    <div style="background: #1e293b; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #8b5cf6;">
      <div style="font-size: 2rem; text-align: center; margin-bottom: 0.5rem;">🌲</div>
      <div style="color: #a78bfa; font-weight: bold; text-align: center; margin-bottom: 1rem;">TreeSet</div>
      <div style="color: #94a3b8; font-size: 0.875rem;">
        <div>✅ Sorted order</div>
        <div>🐢 O(log n) ops</div>
        <div>📊 Red-Black Tree</div>
        <div style="margin-top: 0.75rem; padding: 0.5rem; background: #0f172a; border-radius: 4px; text-align: center; color: #a78bfa; font-size: 0.75rem;">[1, 2, 5, 9]</div>
      </div>
    </div>
  </div>
</div>`,
          },
        },
      ],
    },
    ...java8Sections,
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
    {
      title: "Javatpoint - Java Interview Questions",
      description:
        "Core Java, Servlets, JSP, Spring, Hibernate with code examples and explanations",
      url: "https://www.javatpoint.com/corejava-interview-questions",
      type: "Free",
    },
  ],
  keyTopics: [
    "JVM Architecture",
    "Collections Framework",
    "Multithreading",
    "Java 8+ Features",
    "Design Patterns",
    "Exception Handling",
    "SOLID Principles",
  ],
};
