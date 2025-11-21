import type {
  InterviewQuestionsMap,
  InterviewResourcesMap,
} from "../interviewTypes";

export const lldQuestions: InterviewQuestionsMap["LLD"] = {
  icon: "🔧",
  sections: [
    {
      title: "Design Principles",
      icon: "📐",
      questions: [
        {
          question: "What are the SOLID Principles?",
          difficulty: "intermediate",
          answer: {
            points: [
              "Single Responsibility Principle (SRP): A class should have only one reason to change",
              "Open/Closed Principle (OCP): Open for extension, closed for modification",
              "Liskov Substitution Principle (LSP): Superclass objects replaceable with subclass objects",
              "Interface Segregation Principle (ISP): Clients shouldn't depend on unused interfaces",
              "Dependency Inversion Principle (DIP): Depend on abstractions, not concrete implementations",
            ],
            memoryTechnique:
              "SOLID = Single responsibility, Open/closed, Liskov substitution, Interface segregation, Dependency inversion",
            simpleExplanation:
              "SOLID is like building with LEGO blocks. SRP = each block does one thing. OCP = add new blocks without breaking existing ones. LSP = any red block fits where red blocks go. ISP = don't force square pegs into round holes. DIP = depend on the connection type (abstraction), not specific block shapes (concrete).",
          },
        },
        {
          question:
            "Explain the difference between Composition and Inheritance",
          difficulty: "intermediate",
          answer: {
            text: "Inheritance (Is-A): Subclass inherits from superclass. Strong coupling, can lead to fragile base class problem.\n\nComposition (Has-A): Class contains instance of another class. More flexible, allows runtime behavior composition.",
            note: "Favor Composition over Inheritance for loose coupling and better adherence to Open/Closed Principle.",
            memoryTechnique:
              "Inheritance = Is-A relationship. Composition = Has-A relationship. Think: Be vs Have",
            simpleExplanation:
              "Inheritance is like saying 'a car IS-A vehicle' - it inherits all vehicle properties. Composition is saying 'a car HAS-AN engine' - it contains an engine object. Composition is like LEGO - swap out pieces easily. Inheritance is like genetics - you're stuck with what you inherit!",
          },
        },
        {
          question: "What is the DRY principle?",
          difficulty: "beginner",
          answer: {
            text: "DRY (Don't Repeat Yourself) principle states that every piece of knowledge should have a single, unambiguous representation in a system.",
            points: [
              "Eliminates code duplication",
              "Makes maintenance easier (change in one place)",
              "Reduces bugs from inconsistent implementations",
              "Extract common code into functions, classes, or modules",
            ],
            memoryTechnique:
              "DRY = Don't Repeat Yourself. Think: Write once, use everywhere",
            simpleExplanation:
              "DRY is like having one master recipe card instead of copying the recipe multiple times. If you want to change the recipe (code), you only update one card. If you had copies everywhere, you'd have to update each one and might miss some!",
          },
        },
        {
          question: "Explain the Law of Demeter (Principle of Least Knowledge)",
          difficulty: "advanced",
          answer: {
            text: "A method should only call methods on: its own object, objects passed as parameters, objects it creates, and its direct component objects.",
            points: [
              "Don't talk to strangers (avoid chaining: a.getB().getC().doSomething())",
              "Reduces coupling between classes",
              "Makes code more maintainable and testable",
              "Also known as 'Principle of Least Knowledge'",
            ],
            code: `// Bad - violates Law of Demeter\nclass Customer {\n  public void makePayment() {\n    Wallet wallet = getWallet();\n    wallet.getCard().charge(100);\n  }\n}\n\n// Good - follows Law of Demeter\nclass Customer {\n  public void makePayment() {\n    wallet.makePayment(100); // Wallet handles card internally\n  }\n}`,
            language: "java",
            memoryTechnique:
              "Law of Demeter = Only talk to friends. Think: Don't reach through friends to their friends",
            simpleExplanation:
              "Law of Demeter is like asking your friend to get something from their house, instead of going into their house, opening their closet, and rummaging through it yourself. You only interact with your immediate friends (direct objects), not their belongings (chained objects).",
          },
        },
      ],
    },
    {
      title: "Design Patterns",
      icon: "🎨",
      questions: [
        {
          question: "Describe the Singleton Design Pattern",
          difficulty: "intermediate",
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
            memoryTechnique:
              "Singleton = Single Instance. Think: Only one king in the kingdom",
            simpleExplanation:
              "Singleton is like having only one President. No matter how many times you ask 'who's the President?', you get the same person. The private constructor is like 'you can't just declare yourself President' - there's a controlled process (getInstance) to access the one and only instance.",
          },
        },
        {
          question: "Describe the Factory Design Pattern",
          difficulty: "intermediate",
          answer: {
            text: "Provides interface for creating objects in superclass, allowing subclasses to alter the type of objects created.",
            points: [
              "Delegates object instantiation to factory method",
              "Decouples client code from concrete classes",
              "Adheres to Open/Closed and Dependency Inversion Principles",
            ],
            code: `// Factory interface\ninterface ShapeFactory {\n  Shape createShape();\n}\n\n// Concrete factories\nclass CircleFactory implements ShapeFactory {\n  public Shape createShape() {\n    return new Circle();\n  }\n}\n\nclass SquareFactory implements ShapeFactory {\n  public Shape createShape() {\n    return new Square();\n  }\n}\n\n// Usage\nShapeFactory factory = new CircleFactory();\nShape shape = factory.createShape(); // Gets Circle`,
            language: "java",
            memoryTechnique:
              "Factory = Creates objects. Think: Assembly line that makes products",
            simpleExplanation:
              "Factory is like ordering from a menu. You say 'I want a pizza' (call factory method) and the kitchen (factory) decides whether to make thin crust or deep dish based on the restaurant type (concrete factory). You don't need to know the recipe (object creation logic).",
          },
        },
        {
          question: "What is the Observer Design Pattern?",
          difficulty: "intermediate",
          answer: {
            text: "Observer pattern defines a one-to-many dependency where multiple observers are notified when subject's state changes.",
            points: [
              "Subject maintains list of observers and notifies them of changes",
              "Observers register/unregister with subject",
              "Used in event handling systems, MVC architecture",
              "Also known as Publish-Subscribe pattern",
            ],
            code: `interface Observer {\n  void update(String message);\n}\n\nclass Subject {\n  private List<Observer> observers = new ArrayList<>();\n  \n  public void attach(Observer observer) {\n    observers.add(observer);\n  }\n  \n  public void notifyObservers(String message) {\n    for (Observer observer : observers) {\n      observer.update(message);\n    }\n  }\n}\n\nclass ConcreteObserver implements Observer {\n  public void update(String message) {\n    System.out.println("Received: " + message);\n  }\n}`,
            language: "java",
            memoryTechnique:
              "Observer = Watchers get notified. Think: Subscribers to a newsletter",
            simpleExplanation:
              "Observer is like subscribing to a YouTube channel. When the creator (Subject) uploads a video (state change), all subscribers (Observers) get notified. You can subscribe or unsubscribe anytime. The creator doesn't need to know who you are, just that you're subscribed.",
          },
        },
        {
          question: "Explain the Strategy Design Pattern",
          difficulty: "intermediate",
          answer: {
            text: "Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable at runtime.",
            points: [
              "Separates behavior from context",
              "Enables selecting algorithm at runtime",
              "Follows Open/Closed Principle",
              "Alternative to conditional statements for varying behavior",
            ],
            code: `interface PaymentStrategy {\n  void pay(int amount);\n}\n\nclass CreditCardPayment implements PaymentStrategy {\n  public void pay(int amount) {\n    System.out.println("Paid " + amount + " using Credit Card");\n  }\n}\n\nclass PayPalPayment implements PaymentStrategy {\n  public void pay(int amount) {\n    System.out.println("Paid " + amount + " using PayPal");\n  }\n}\n\nclass ShoppingCart {\n  private PaymentStrategy paymentStrategy;\n  \n  public void setPaymentStrategy(PaymentStrategy strategy) {\n    this.paymentStrategy = strategy;\n  }\n  \n  public void checkout(int amount) {\n    paymentStrategy.pay(amount);\n  }\n}`,
            language: "java",
            memoryTechnique:
              "Strategy = Choose behavior at runtime. Think: Different routes to same destination",
            simpleExplanation:
              "Strategy is like choosing how to get to work - drive, bike, or bus. The destination (goal) is the same, but you can switch strategies based on weather, time, or mood. The commute planner (context) doesn't care which strategy you pick, it just executes it.",
          },
        },
        {
          question: "What is the Decorator Design Pattern?",
          difficulty: "advanced",
          answer: {
            text: "Decorator pattern attaches additional responsibilities to an object dynamically, providing flexible alternative to subclassing.",
            points: [
              "Wraps original object and adds new behavior",
              "Can stack multiple decorators",
              "Follows Open/Closed Principle",
              "Used in Java I/O streams (BufferedReader wrapping FileReader)",
            ],
            code: `interface Coffee {\n  double cost();\n  String description();\n}\n\nclass SimpleCoffee implements Coffee {\n  public double cost() { return 2.0; }\n  public String description() { return "Simple Coffee"; }\n}\n\nabstract class CoffeeDecorator implements Coffee {\n  protected Coffee coffee;\n  public CoffeeDecorator(Coffee coffee) { this.coffee = coffee; }\n}\n\nclass MilkDecorator extends CoffeeDecorator {\n  public MilkDecorator(Coffee coffee) { super(coffee); }\n  public double cost() { return coffee.cost() + 0.5; }\n  public String description() { return coffee.description() + ", Milk"; }\n}\n\n// Usage\nCoffee coffee = new SimpleCoffee();\ncoffee = new MilkDecorator(coffee);\ncoffee = new SugarDecorator(coffee); // Can stack decorators`,
            language: "java",
            memoryTechnique:
              "Decorator = Wrap and add features. Think: Gift wrapping - add layers",
            simpleExplanation:
              "Decorator is like dressing up. You start with basic clothes (base object), then add a jacket (decorator), then a scarf (another decorator). Each layer adds something without changing what's underneath. You can mix and match decorators like accessories!",
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
