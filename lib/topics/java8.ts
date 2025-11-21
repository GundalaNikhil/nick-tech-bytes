import type { Section } from "../interviewTypes";

export const java8Sections: Section[] = [
  {
    title: "Lambda Expressions",
    icon: "⚡",
    questions: [
      {
        question: "What are Lambda Expressions in Java 8?",
        difficulty: "beginner",
        answer: {
          text: "Lambda expressions are anonymous functions that provide a clear and concise way to represent a method interface using an expression. They enable functional programming in Java.",
          points: [
            "Syntax: (parameters) -> expression or (parameters) -> { statements; }",
            "Enable you to treat functionality as a method argument",
            "Can be used wherever functional interfaces are expected",
            "Reduce boilerplate code significantly",
          ],
          code: `// Traditional approach
Runnable r1 = new Runnable() {
    @Override
    public void run() {
        System.out.println("Hello World");
    }
};

// Lambda expression
Runnable r2 = () -> System.out.println("Hello World");

// Lambda with parameters
Comparator<Integer> comparator = (a, b) -> a.compareTo(b);`,
          language: "java",
          memoryTechnique:
            "Lambda = Less And More Brief, Descriptive Action. Think: Arrow (→) points to what you want to do",
          simpleExplanation:
            "Lambda expressions are like giving someone quick verbal instructions instead of writing a detailed manual. Instead of writing 'Create a new Runnable class, override run method, write the code' (traditional), you just say 'Do this!' (lambda). It's the same action, just way shorter.",
        },
      },
      {
        question: "What is a Functional Interface?",
        difficulty: "beginner",
        answer: {
          text: "A functional interface is an interface that contains exactly one abstract method. It can have multiple default or static methods.",
          points: [
            "Annotated with @FunctionalInterface (optional but recommended)",
            "Can be used as the assignment target for a lambda expression",
            "Examples: Runnable, Callable, Comparator, Predicate, Function, Consumer, Supplier",
          ],
          code: `@FunctionalInterface
public interface MyFunctionalInterface {
    void myMethod(); // Single abstract method
    
    default void defaultMethod() {
        System.out.println("Default method");
    }
    
    static void staticMethod() {
        System.out.println("Static method");
    }
}

// Usage
MyFunctionalInterface func = () -> System.out.println("Executing myMethod");
func.myMethod();`,
          language: "java",
          memoryTechnique:
            "Functional Interface = ONE abstract method only. Think: F-ONE (F-unctional = ONE method)",
          simpleExplanation:
            "A functional interface is like a vending machine with ONE button. You can have decorations (default methods) and instructions (static methods), but only ONE main button (abstract method) that does the actual work. Lambda expressions are like pressing that button.",
        },
      },
      {
        question: "Explain the different types of Lambda Expressions",
        difficulty: "intermediate",
        answer: {
          points: [
            "No parameters: () -> expression",
            "Single parameter: (x) -> expression or x -> expression",
            "Multiple parameters: (x, y) -> expression",
            "With code block: (x, y) -> { statements; return value; }",
            "Method reference: Class::method",
          ],
          code: `// No parameters
Runnable r = () -> System.out.println("Hello");

// Single parameter
Consumer<String> c = s -> System.out.println(s);
// or with parentheses
Consumer<String> c2 = (s) -> System.out.println(s);

// Multiple parameters
BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;

// Code block
BiFunction<Integer, Integer, Integer> multiply = (a, b) -> {
    int result = a * b;
    System.out.println("Result: " + result);
    return result;
};`,
          language: "java",
        },
      },
    ],
  },
  {
    title: "Stream API",
    icon: "🌊",
    questions: [
      {
        question: "What is the Stream API in Java 8?",
        difficulty: "beginner",
        answer: {
          text: "Stream API is used to process collections of objects. It provides a functional approach to processing collections of objects with various operations like filter, map, reduce, etc.",
          points: [
            "Streams are not data structures; they take input from Collections, Arrays, or I/O channels",
            "Streams don't change the original data structure",
            "Operations are either intermediate (return Stream) or terminal (return result)",
            "Lazy evaluation - intermediate operations are not executed until a terminal operation is invoked",
          ],
          code: `List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// Filter even numbers and sum them
int sum = numbers.stream()
    .filter(n -> n % 2 == 0)
    .mapToInt(Integer::intValue)
    .sum();

System.out.println("Sum of even numbers: " + sum); // Output: 30`,
          language: "java",
          memoryTechnique:
            "Stream = Source → Intermediate → Terminal. Think: SIT (like sitting in a pipeline)",
          simpleExplanation:
            "Stream API is like a factory assembly line for data. Items (data) come in from a source (collection), pass through various stations (filter, map), and finally produce a result (sum, collect). The original items aren't changed - you're just processing copies through the line.",
        },
      },
      {
        question: "What are intermediate and terminal operations in Stream?",
        difficulty: "intermediate",
        answer: {
          text: "Intermediate operations return a new stream and are lazy (not executed until a terminal operation is called). Terminal operations produce a result or side-effect and mark the stream as consumed.",
          points: [
            "Intermediate: filter(), map(), flatMap(), distinct(), sorted(), peek(), limit(), skip()",
            "Terminal: forEach(), collect(), reduce(), count(), anyMatch(), allMatch(), noneMatch(), findFirst(), findAny()",
            "Intermediate operations can be chained together",
            "After terminal operation, stream cannot be reused",
          ],
          code: `List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");

// Intermediate operations: filter, map
// Terminal operation: collect
List<String> result = names.stream()
    .filter(name -> name.length() > 3)      // Intermediate
    .map(String::toUpperCase)                // Intermediate
    .sorted()                                 // Intermediate
    .collect(Collectors.toList());           // Terminal

System.out.println(result); // [ALICE, CHARLIE, DAVID]`,
          language: "java",
        },
      },
      {
        question: "Explain the difference between map() and flatMap()",
        difficulty: "intermediate",
        answer: {
          text: "map() transforms each element into another object, while flatMap() transforms each element into a stream and then flattens all streams into a single stream.",
          points: [
            "map(): One-to-one mapping. Stream<T> -> Stream<R>",
            "flatMap(): One-to-many mapping. Stream<T> -> Stream<R> (flattened)",
            "Use map() when each element maps to exactly one element",
            "Use flatMap() when each element can map to multiple elements or when dealing with nested structures",
          ],
          memoryTechnique:
            "map = M-A-P = 1:1 Mapping, flatMap = F-L-A-T = Flatten Lists After Transformation",
          simpleExplanation:
            "map() is like translating words (one word becomes one translated word). flatMap() is like unpacking boxes - each box contains multiple items, and you flatten all items into one pile. If you have [[1,2],[3,4]], flatMap gives you [1,2,3,4].",
          code: `// map() example
List<String> words = Arrays.asList("hello", "world");
List<Integer> lengths = words.stream()
    .map(String::length)
    .collect(Collectors.toList());
System.out.println(lengths); // [5, 5]

// flatMap() example
List<List<Integer>> listOfLists = Arrays.asList(
    Arrays.asList(1, 2, 3),
    Arrays.asList(4, 5),
    Arrays.asList(6, 7, 8, 9)
);

List<Integer> flatList = listOfLists.stream()
    .flatMap(List::stream)
    .collect(Collectors.toList());
System.out.println(flatList); // [1, 2, 3, 4, 5, 6, 7, 8, 9]`,
          language: "java",
        },
      },
      {
        question: "What is the reduce() operation in Stream?",
        difficulty: "advanced",
        answer: {
          text: "reduce() is a terminal operation that combines all elements of a stream into a single result. It performs a reduction on the elements using an associative accumulation function.",
          points: [
            "Three variants: reduce(BinaryOperator), reduce(identity, BinaryOperator), reduce(identity, BiFunction, BinaryOperator)",
            "Returns Optional<T> or T depending on the variant",
            "Useful for sum, product, min, max, concatenation operations",
            "Can perform parallel reductions efficiently",
          ],
          memoryTechnique:
            "reduce = Repeatedly Executing Delivery Until Complete Everywhere. Think: 'Combining all into ONE'",
          simpleExplanation:
            "reduce() is like a snowball rolling down a hill - it starts small (identity value) and keeps accumulating snow (elements) using the same process (accumulation function) until it becomes one big snowball (final result). Examples: adding all numbers, finding the maximum, or concatenating strings.",
          code: `List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

// Sum using reduce
int sum = numbers.stream()
    .reduce(0, (a, b) -> a + b);
System.out.println("Sum: " + sum); // 15

// Product using reduce
int product = numbers.stream()
    .reduce(1, (a, b) -> a * b);
System.out.println("Product: " + product); // 120

// Find max
Optional<Integer> max = numbers.stream()
    .reduce((a, b) -> a > b ? a : b);
max.ifPresent(System.out::println); // 5

// String concatenation
List<String> words = Arrays.asList("Hello", "World");
String sentence = words.stream()
    .reduce("", (s1, s2) -> s1 + " " + s2);
System.out.println(sentence.trim()); // "Hello World"`,
          language: "java",
        },
      },
    ],
  },
  {
    title: "Optional Class",
    icon: "🔒",
    questions: [
      {
        question: "What is Optional in Java 8 and why is it used?",
        difficulty: "beginner",
        answer: {
          text: "Optional is a container object used to represent the presence or absence of a value. It helps avoid NullPointerException and makes the code more readable and explicit about nullable values.",
          points: [
            "Prevents NullPointerException",
            "Makes null-checks more elegant and functional",
            "Provides methods like isPresent(), ifPresent(), orElse(), orElseGet(), orElseThrow()",
            "Should not be used for fields, method parameters, or collections",
          ],
          code: `// Creating Optional
Optional<String> empty = Optional.empty();
Optional<String> value = Optional.of("Hello");
Optional<String> nullable = Optional.ofNullable(null);

// Checking if value is present
if (value.isPresent()) {
    System.out.println(value.get());
}

// Better approach with ifPresent
value.ifPresent(System.out::println);

// Providing default value
String result = nullable.orElse("Default Value");
String result2 = nullable.orElseGet(() -> "Computed Default");

// Throwing exception if absent
String result3 = value.orElseThrow(() -> new RuntimeException("Value not found"));`,
          language: "java",
          memoryTechnique:
            "Optional = Or Provide This Instead Of Null And Loss. Think: A gift box that might be empty",
          simpleExplanation:
            "Optional is like Schrödinger's cat box - you don't know if there's something inside until you check. Instead of potentially getting 'null' (empty hand) which crashes your program, you get a box (Optional) that safely tells you if it's empty or has a value. You can also say 'if empty, give me this default gift instead'.",
        },
      },
      {
        question: "Explain the difference between orElse() and orElseGet()",
        difficulty: "intermediate",
        answer: {
          text: "Both methods provide a default value when Optional is empty, but orElse() always evaluates its argument while orElseGet() only evaluates when Optional is empty.",
          points: [
            "orElse(T value): The value is always evaluated, even if Optional has a value",
            "orElseGet(Supplier<T>): The Supplier is only invoked if Optional is empty",
            "orElseGet() is more efficient when creating the default value is expensive",
            "Use orElse() for simple values, orElseGet() for computed values",
          ],
          code: `// orElse - always evaluates
Optional<String> opt = Optional.of("Hello");
String result1 = opt.orElse(createDefaultValue()); // createDefaultValue() is called

// orElseGet - lazy evaluation
String result2 = opt.orElseGet(() -> createDefaultValue()); // Not called

// Example with expensive operation
Optional<String> empty = Optional.empty();
String r1 = empty.orElse(expensiveOperation()); // Always executed
String r2 = empty.orElseGet(() -> expensiveOperation()); // Only executed when empty

private static String createDefaultValue() {
    System.out.println("Creating default value");
    return "Default";
}`,
          language: "java",
          memoryTechnique:
            "orElse = Always Evaluates, orElseGet = Gets only when Empty. Think: 'Else Eager, ElseGet Lazy'",
          simpleExplanation:
            "orElse() is like making a backup sandwich even if you already have lunch (wasteful). orElseGet() is like only making a backup sandwich if you forgot your lunch (smart and efficient). If making the backup is expensive (cooking a steak), use orElseGet()!",
        },
      },
    ],
  },
  {
    title: "Method References",
    icon: "🔗",
    questions: [
      {
        question: "What are Method References in Java 8?",
        difficulty: "intermediate",
        answer: {
          text: "Method references are a shorthand notation of a lambda expression to call a method. They make the code more readable and concise when a lambda expression only calls an existing method.",
          points: [
            "Four types: Static method, Instance method of object, Instance method of arbitrary object, Constructor",
            "Syntax: ClassName::methodName or object::methodName",
            "More readable than lambda expressions when simply calling a method",
            "Can only be used when lambda expression directly calls a method",
          ],
          code: `List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

// Lambda expression
names.forEach(name -> System.out.println(name));

// Method reference (more concise)
names.forEach(System.out::println);

// Static method reference
Function<String, Integer> parser = Integer::parseInt;

// Instance method reference
String str = "Hello";
Supplier<String> supplier = str::toUpperCase;

// Constructor reference
Supplier<List<String>> listSupplier = ArrayList::new;`,
          language: "java",
        },
      },
      {
        question: "Explain the different types of Method References",
        difficulty: "advanced",
        answer: {
          points: [
            "Static Method Reference: ClassName::staticMethod",
            "Instance Method Reference (specific object): object::instanceMethod",
            "Instance Method Reference (arbitrary object): ClassName::instanceMethod",
            "Constructor Reference: ClassName::new",
          ],
          code: `// 1. Static method reference
BiFunction<Integer, Integer, Integer> max = Math::max;
Integer result = max.apply(10, 20);

// 2. Instance method of a particular object
String str = "Hello";
Supplier<Integer> lengthSupplier = str::length;
Integer length = lengthSupplier.get();

// 3. Instance method of an arbitrary object of a particular type
List<String> words = Arrays.asList("apple", "banana", "cherry");
words.sort(String::compareToIgnoreCase);

// 4. Constructor reference
Supplier<List<String>> listFactory = ArrayList::new;
Function<Integer, List<String>> listFactory2 = ArrayList::new;

// Using constructor reference with Stream
List<Person> persons = names.stream()
    .map(Person::new)  // Calls new Person(name)
    .collect(Collectors.toList());`,
          language: "java",
        },
      },
    ],
  },
  {
    title: "Default and Static Methods in Interfaces",
    icon: "⚙️",
    questions: [
      {
        question: "What are default methods in interfaces?",
        difficulty: "intermediate",
        answer: {
          text: "Default methods allow you to add new methods to interfaces without breaking existing implementations. They provide a default implementation that can be overridden by implementing classes.",
          points: [
            "Declared using 'default' keyword",
            "Can be overridden by implementing classes",
            "Enable backward compatibility when evolving APIs",
            "Multiple inheritance of behavior becomes possible",
          ],
          code: `interface Vehicle {
    // Abstract method
    void start();
    
    // Default method
    default void honk() {
        System.out.println("Honk! Honk!");
    }
    
    // Another default method
    default void stop() {
        System.out.println("Vehicle stopped");
    }
}

class Car implements Vehicle {
    @Override
    public void start() {
        System.out.println("Car started");
    }
    
    // Optionally override default method
    @Override
    public void honk() {
        System.out.println("Car horn!");
    }
}`,
          language: "java",
        },
      },
      {
        question: "What are static methods in interfaces?",
        difficulty: "intermediate",
        answer: {
          text: "Static methods in interfaces are utility methods that belong to the interface itself, not to instances. They cannot be overridden by implementing classes.",
          points: [
            "Called using InterfaceName.methodName()",
            "Cannot be overridden by implementing classes",
            "Useful for utility or helper methods related to the interface",
            "Not inherited by implementing classes",
          ],
          code: `interface Calculator {
    // Static method
    static int add(int a, int b) {
        return a + b;
    }
    
    static int multiply(int a, int b) {
        return a * b;
    }
    
    // Abstract method
    int calculate(int a, int b);
}

class SimpleCalculator implements Calculator {
    @Override
    public int calculate(int a, int b) {
        // Can call interface static method
        return Calculator.add(a, b);
    }
}

// Usage
int sum = Calculator.add(5, 3); // Calling static method
SimpleCalculator calc = new SimpleCalculator();
int result = calc.calculate(10, 20);`,
          language: "java",
        },
      },
      {
        question: "How does Java resolve diamond problem with default methods?",
        difficulty: "advanced",
        answer: {
          text: "When a class implements multiple interfaces with the same default method, Java requires the class to explicitly override the method to resolve the ambiguity.",
          points: [
            "Class must override the conflicting default method",
            "Can use InterfaceName.super.methodName() to call specific interface's default implementation",
            "Most specific default method wins (class > interface)",
            "Compiler error if ambiguity is not resolved",
          ],
          code: `interface A {
    default void print() {
        System.out.println("A");
    }
}

interface B {
    default void print() {
        System.out.println("B");
    }
}

class C implements A, B {
    // Must override to resolve conflict
    @Override
    public void print() {
        // Can call specific interface method
        A.super.print();
        B.super.print();
        System.out.println("C");
    }
}

// Usage
C obj = new C();
obj.print();
// Output:
// A
// B
// C`,
          language: "java",
        },
      },
    ],
  },
  {
    title: "Date and Time API",
    icon: "📅",
    questions: [
      {
        question: "What improvements does Java 8 Date and Time API provide?",
        difficulty: "beginner",
        answer: {
          text: "Java 8 introduced a new Date and Time API (java.time package) to overcome the drawbacks of the old java.util.Date and java.util.Calendar classes.",
          points: [
            "Immutable and thread-safe classes",
            "Clear separation between human time and machine time",
            "Better method names and functionality",
            "Support for time zones and different calendar systems",
            "Main classes: LocalDate, LocalTime, LocalDateTime, ZonedDateTime, Instant, Duration, Period",
          ],
          code: `// Current date and time
LocalDate date = LocalDate.now();
LocalTime time = LocalTime.now();
LocalDateTime dateTime = LocalDateTime.now();

// Specific date
LocalDate specificDate = LocalDate.of(2024, Month.JANUARY, 15);

// Date arithmetic
LocalDate tomorrow = date.plusDays(1);
LocalDate nextWeek = date.plusWeeks(1);
LocalDate nextMonth = date.plusMonths(1);

// Formatting
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
String formattedDate = date.format(formatter);

// Parsing
LocalDate parsedDate = LocalDate.parse("15-01-2024", formatter);`,
          language: "java",
        },
      },
      {
        question:
          "Explain the difference between LocalDateTime, ZonedDateTime, and Instant",
        difficulty: "intermediate",
        answer: {
          points: [
            "LocalDateTime: Date and time without timezone information. Best for birthdays, appointments",
            "ZonedDateTime: Date and time with timezone. Best for meetings across timezones",
            "Instant: Point in time in UTC. Best for timestamps, logging",
            "Duration: Time-based amount (hours, minutes, seconds)",
            "Period: Date-based amount (years, months, days)",
          ],
          code: `// LocalDateTime - no timezone
LocalDateTime local = LocalDateTime.now();
System.out.println(local); // 2024-01-15T10:30:45

// ZonedDateTime - with timezone
ZonedDateTime zoned = ZonedDateTime.now(ZoneId.of("America/New_York"));
System.out.println(zoned); // 2024-01-15T10:30:45-05:00[America/New_York]

// Instant - UTC timestamp
Instant instant = Instant.now();
System.out.println(instant); // 2024-01-15T15:30:45.123Z

// Duration - time difference
Duration duration = Duration.between(local, local.plusHours(2));
System.out.println(duration.toHours()); // 2

// Period - date difference
Period period = Period.between(
    LocalDate.of(2024, 1, 1),
    LocalDate.of(2024, 12, 31)
);
System.out.println(period.getMonths()); // 11`,
          language: "java",
        },
      },
    ],
  },
  {
    title: "Collectors and Grouping",
    icon: "📦",
    questions: [
      {
        question: "What is the Collectors utility class in Java 8?",
        difficulty: "intermediate",
        answer: {
          text: "Collectors is a utility class that provides reduction operations like accumulating elements into collections, summarizing elements, grouping, partitioning, etc.",
          points: [
            "Used with Stream's collect() terminal operation",
            "Provides factory methods for common collectors",
            "Common methods: toList(), toSet(), toMap(), groupingBy(), partitioningBy(), joining()",
            "Can create custom collectors for specialized requirements",
          ],
          code: `List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");

// Collect to List
List<String> list = names.stream()
    .filter(n -> n.length() > 3)
    .collect(Collectors.toList());

// Collect to Set
Set<String> set = names.stream()
    .collect(Collectors.toSet());

// Joining strings
String joined = names.stream()
    .collect(Collectors.joining(", "));
System.out.println(joined); // "Alice, Bob, Charlie, David"

// Counting
long count = names.stream()
    .collect(Collectors.counting());

// Statistics
IntSummaryStatistics stats = names.stream()
    .collect(Collectors.summarizingInt(String::length));
System.out.println("Average length: " + stats.getAverage());`,
          language: "java",
        },
      },
      {
        question: "Explain groupingBy() and partitioningBy() collectors",
        difficulty: "advanced",
        answer: {
          text: "groupingBy() groups elements based on a classifier function, while partitioningBy() is a special case that partitions elements into two groups based on a predicate.",
          points: [
            "groupingBy(): Returns Map<K, List<T>> by default",
            "partitioningBy(): Returns Map<Boolean, List<T>>",
            "Can provide downstream collectors for further processing",
            "Useful for creating complex data structures from streams",
          ],
          code: `class Person {
    String name;
    int age;
    String city;
    // Constructor, getters
}

List<Person> people = Arrays.asList(
    new Person("Alice", 25, "NYC"),
    new Person("Bob", 30, "LA"),
    new Person("Charlie", 25, "NYC"),
    new Person("David", 30, "LA")
);

// Group by age
Map<Integer, List<Person>> byAge = people.stream()
    .collect(Collectors.groupingBy(Person::getAge));

// Group by city and count
Map<String, Long> cityCount = people.stream()
    .collect(Collectors.groupingBy(
        Person::getCity,
        Collectors.counting()
    ));

// Partition by age > 25
Map<Boolean, List<Person>> partitioned = people.stream()
    .collect(Collectors.partitioningBy(p -> p.getAge() > 25));

List<Person> above25 = partitioned.get(true);
List<Person> belowOrEqual25 = partitioned.get(false);`,
          language: "java",
        },
      },
    ],
  },
];
