# Library Management System - Low-Level Design

## Overview

Design a library management system that handles book inventory, member management, book borrowing/returning, fines calculation, and reservation system.

## Requirements

### Functional Requirements

- Add/remove/update books
- Register members
- Issue books to members
- Return books
- Calculate fines for late returns
- Reserve books
- Search books by title, author, ISBN
- Track book availability
- Generate reports

### Non-Functional Requirements

- Support 1000+ concurrent users
- Fast search (<100ms)
- Reliable fine calculation
- Data persistence
- Audit logging

## Class Diagram

<div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 2rem; border-radius: 12px; border: 1px solid #334155; margin: 2rem 0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
    <div style="background: #0f172a; padding: 1.5rem; border-radius: 8px; border: 1px solid #1e40af;">
      <div style="color: #60a5fa; font-weight: bold; font-size: 1.125rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #1e40af;">Main Class</div>
      <div style="color: #94a3b8; font-size: 0.875rem; margin-bottom: 0.75rem;">
        <div style="margin-bottom: 0.5rem;">+ properties</div>
        <div style="margin-bottom: 0.5rem;">+ attributes</div>
      </div>
      <div style="border-top: 1px solid #334155; padding-top: 0.75rem; margin-top: 0.75rem; color: #94a3b8; font-size: 0.875rem;">
        <div style="margin-bottom: 0.5rem;">+ methods()</div>
        <div style="margin-bottom: 0.5rem;">+ operations()</div>
      </div>
    </div>
    <div style="background: #0f172a; padding: 1.5rem; border-radius: 8px; border: 1px solid #059669;">
      <div style="color: #34d399; font-weight: bold; font-size: 1.125rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #059669;">Helper Class</div>
      <div style="color: #94a3b8; font-size: 0.875rem; margin-bottom: 0.75rem;">
        <div style="margin-bottom: 0.5rem;">+ fields</div>
        <div style="margin-bottom: 0.5rem;">+ data</div>
      </div>
      <div style="border-top: 1px solid #334155; padding-top: 0.75rem; margin-top: 0.75rem; color: #94a3b8; font-size: 0.875rem;">
        <div style="margin-bottom: 0.5rem;">+ helpers()</div>
        <div style="margin-bottom: 0.5rem;">+ utilities()</div>
      </div>
    </div>
    <div style="background: #0f172a; padding: 1.5rem; border-radius: 8px; border: 1px solid #7c3aed;">
      <div style="color: #a78bfa; font-weight: bold; font-size: 1.125rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #7c3aed;">Interface</div>
      <div style="color: #94a3b8; font-size: 0.875rem; margin-bottom: 0.75rem;">
        <div style="margin-bottom: 0.5rem; font-style: italic;">«interface»</div>
      </div>
      <div style="border-top: 1px solid #334155; padding-top: 0.75rem; margin-top: 0.75rem; color: #94a3b8; font-size: 0.875rem;">
        <div style="margin-bottom: 0.5rem;">+ abstract methods()</div>
      </div>
    </div>
  </div>
  <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #334155; display: flex; justify-content: center; align-items: center; gap: 2rem; flex-wrap: wrap;">
    <div style="display: flex; align-items: center; gap: 0.5rem; color: #94a3b8; font-size: 0.875rem;">
      <span style="color: #60a5fa;">━━━▶</span>
      <span>Dependency</span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem; color: #94a3b8; font-size: 0.875rem;">
      <span style="color: #34d399;">◆━━━</span>
      <span>Composition</span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem; color: #94a3b8; font-size: 0.875rem;">
      <span style="color: #a78bfa;">△━━━</span>
      <span>Inheritance</span>
    </div>
  </div>
</div>

## Implementation

### Book Class

```java
public enum BookStatus {
    AVAILABLE, ISSUED, RESERVED, LOST
}

public class Book {
    private String ISBN;
    private String title;
    private String author;
    private String publisher;
    private int publicationYear;
    private String category;
    private BookStatus status;
    private String rackNumber;

    public Book(String ISBN, String title, String author) {
        this.ISBN = ISBN;
        this.title = title;
        this.author = author;
        this.status = BookStatus.AVAILABLE;
    }

    public boolean isAvailable() {
        return status == BookStatus.AVAILABLE;
    }

    public void markIssued() {
        if (!isAvailable()) {
            throw new IllegalStateException("Book is not available");
        }
        this.status = BookStatus.ISSUED;
    }

    public void markReturned() {
        this.status = BookStatus.AVAILABLE;
    }

    public void markLost() {
        this.status = BookStatus.LOST;
    }

    // Getters and setters
    public String getISBN() { return ISBN; }
    public String getTitle() { return title; }
    public String getAuthor() { return author; }
    public BookStatus getStatus() { return status; }
}
```

### Member Class

```java
public enum MembershipType {
    BASIC(2, 14),      // max 2 books, 14 days
    PREMIUM(5, 30),    // max 5 books, 30 days
    GOLD(10, 60);      // max 10 books, 60 days

    private final int maxBooks;
    private final int borrowDays;

    MembershipType(int maxBooks, int borrowDays) {
        this.maxBooks = maxBooks;
        this.borrowDays = borrowDays;
    }

    public int getMaxBooks() { return maxBooks; }
    public int getBorrowDays() { return borrowDays; }
}

public class Member {
    private String memberId;
    private String name;
    private String email;
    private String phone;
    private LocalDate registrationDate;
    private MembershipType membershipType;
    private Set<String> issuedBookISBNs;
    private double outstandingFine;

    public Member(String memberId, String name, String email,
                  MembershipType type) {
        this.memberId = memberId;
        this.name = name;
        this.email = email;
        this.membershipType = type;
        this.registrationDate = LocalDate.now();
        this.issuedBookISBNs = new HashSet<>();
        this.outstandingFine = 0.0;
    }

    public boolean canBorrowMoreBooks() {
        return issuedBookISBNs.size() < membershipType.getMaxBooks()
               && outstandingFine == 0;
    }

    public void borrowBook(String ISBN) {
        if (!canBorrowMoreBooks()) {
            throw new IllegalStateException("Cannot borrow more books");
        }
        issuedBookISBNs.add(ISBN);
    }

    public void returnBook(String ISBN) {
        issuedBookISBNs.remove(ISBN);
    }

    public void addFine(double amount) {
        this.outstandingFine += amount;
    }

    public void payFine(double amount) {
        this.outstandingFine = Math.max(0, outstandingFine - amount);
    }

    // Getters
    public String getMemberId() { return memberId; }
    public int getIssuedBooksCount() { return issuedBookISBNs.size(); }
    public double getOutstandingFine() { return outstandingFine; }
    public MembershipType getMembershipType() { return membershipType; }
}
```

### BookIssue Class

```java
public class BookIssue {
    private String issueId;
    private String memberId;
    private String ISBN;
    private LocalDate issueDate;
    private LocalDate dueDate;
    private LocalDate returnDate;
    private double fine;

    public BookIssue(String memberId, String ISBN, int borrowDays) {
        this.issueId = UUID.randomUUID().toString();
        this.memberId = memberId;
        this.ISBN = ISBN;
        this.issueDate = LocalDate.now();
        this.dueDate = issueDate.plusDays(borrowDays);
        this.fine = 0.0;
    }

    public double calculateFine(double finePerDay) {
        if (returnDate == null) {
            returnDate = LocalDate.now();
        }

        if (returnDate.isAfter(dueDate)) {
            long daysLate = ChronoUnit.DAYS.between(dueDate, returnDate);
            fine = daysLate * finePerDay;
        }

        return fine;
    }

    public void markReturned() {
        this.returnDate = LocalDate.now();
    }

    public boolean isOverdue() {
        return LocalDate.now().isAfter(dueDate) && returnDate == null;
    }

    // Getters
    public String getIssueId() { return issueId; }
    public String getMemberId() { return memberId; }
    public String getISBN() { return ISBN; }
    public LocalDate getDueDate() { return dueDate; }
    public double getFine() { return fine; }
}
```

### BookReservation Class

```java
public class BookReservation {
    private String reservationId;
    private String memberId;
    private String ISBN;
    private LocalDate reservationDate;
    private LocalDate expiryDate;
    private boolean isActive;

    public BookReservation(String memberId, String ISBN) {
        this.reservationId = UUID.randomUUID().toString();
        this.memberId = memberId;
        this.ISBN = ISBN;
        this.reservationDate = LocalDate.now();
        this.expiryDate = reservationDate.plusDays(3); // 3-day hold
        this.isActive = true;
    }

    public boolean isExpired() {
        return LocalDate.now().isAfter(expiryDate);
    }

    public void cancel() {
        this.isActive = false;
    }

    // Getters
    public String getReservationId() { return reservationId; }
    public String getMemberId() { return memberId; }
    public String getISBN() { return ISBN; }
    public boolean isActive() { return isActive && !isExpired(); }
}
```

### Library Class (Main Service)

```java
public class Library {
    private static final double FINE_PER_DAY = 1.0;

    private Map<String, Book> catalog; // ISBN -> Book
    private Map<String, Member> members; // memberId -> Member
    private Map<String, BookIssue> activeIssues; // issueId -> BookIssue
    private Map<String, List<BookReservation>> reservations; // ISBN -> List
    private SearchIndex searchIndex;

    public Library() {
        this.catalog = new HashMap<>();
        this.members = new HashMap<>();
        this.activeIssues = new HashMap<>();
        this.reservations = new HashMap<>();
        this.searchIndex = new SearchIndex();
    }

    // Book Management
    public void addBook(Book book) {
        if (catalog.containsKey(book.getISBN())) {
            throw new IllegalArgumentException("Book already exists");
        }
        catalog.put(book.getISBN(), book);
        searchIndex.indexBook(book);
    }

    public void removeBook(String ISBN) {
        Book book = catalog.get(ISBN);
        if (book != null && book.getStatus() != BookStatus.ISSUED) {
            catalog.remove(ISBN);
            searchIndex.removeBook(ISBN);
        } else {
            throw new IllegalStateException("Cannot remove issued book");
        }
    }

    // Member Management
    public void registerMember(Member member) {
        if (members.containsKey(member.getMemberId())) {
            throw new IllegalArgumentException("Member already exists");
        }
        members.put(member.getMemberId(), member);
    }

    public void removeMember(String memberId) {
        Member member = members.get(memberId);
        if (member != null && member.getIssuedBooksCount() == 0
            && member.getOutstandingFine() == 0) {
            members.remove(memberId);
        } else {
            throw new IllegalStateException(
                "Cannot remove member with issued books or pending fines");
        }
    }

    // Issue Book
    public BookIssue issueBook(String memberId, String ISBN) {
        Member member = members.get(memberId);
        Book book = catalog.get(ISBN);

        if (member == null) {
            throw new IllegalArgumentException("Member not found");
        }
        if (book == null) {
            throw new IllegalArgumentException("Book not found");
        }
        if (!member.canBorrowMoreBooks()) {
            throw new IllegalStateException(
                "Member cannot borrow more books");
        }

        // Check if book is reserved for someone else
        if (hasActiveReservation(ISBN)
            && !isReservedForMember(ISBN, memberId)) {
            throw new IllegalStateException(
                "Book is reserved for another member");
        }

        if (!book.isAvailable()) {
            throw new IllegalStateException("Book is not available");
        }

        // Issue the book
        book.markIssued();
        member.borrowBook(ISBN);

        int borrowDays = member.getMembershipType().getBorrowDays();
        BookIssue issue = new BookIssue(memberId, ISBN, borrowDays);
        activeIssues.put(issue.getIssueId(), issue);

        // Cancel reservation if exists
        cancelReservation(ISBN, memberId);

        return issue;
    }

    // Return Book
    public double returnBook(String issueId) {
        BookIssue issue = activeIssues.get(issueId);
        if (issue == null) {
            throw new IllegalArgumentException("Issue not found");
        }

        Member member = members.get(issue.getMemberId());
        Book book = catalog.get(issue.getISBN());

        // Mark return and calculate fine
        issue.markReturned();
        double fine = issue.calculateFine(FINE_PER_DAY);

        if (fine > 0) {
            member.addFine(fine);
        }

        // Update states
        member.returnBook(issue.getISBN());
        book.markReturned();
        activeIssues.remove(issueId);

        return fine;
    }

    // Reserve Book
    public BookReservation reserveBook(String memberId, String ISBN) {
        Member member = members.get(memberId);
        Book book = catalog.get(ISBN);

        if (member == null || book == null) {
            throw new IllegalArgumentException("Invalid member or book");
        }

        if (book.isAvailable()) {
            throw new IllegalStateException(
                "Book is available, no need to reserve");
        }

        BookReservation reservation = new BookReservation(memberId, ISBN);
        reservations.computeIfAbsent(ISBN, k -> new ArrayList<>())
                   .add(reservation);

        return reservation;
    }

    // Search Books
    public List<Book> searchBooks(String query) {
        List<String> ISBNs = searchIndex.search(query);
        return ISBNs.stream()
                   .map(catalog::get)
                   .filter(Objects::nonNull)
                   .collect(Collectors.toList());
    }

    // Helper methods
    private boolean hasActiveReservation(String ISBN) {
        List<BookReservation> bookReservations = reservations.get(ISBN);
        return bookReservations != null &&
               bookReservations.stream().anyMatch(BookReservation::isActive);
    }

    private boolean isReservedForMember(String ISBN, String memberId) {
        List<BookReservation> bookReservations = reservations.get(ISBN);
        if (bookReservations == null) return false;

        return bookReservations.stream()
            .filter(BookReservation::isActive)
            .findFirst()
            .map(r -> r.getMemberId().equals(memberId))
            .orElse(false);
    }

    private void cancelReservation(String ISBN, String memberId) {
        List<BookReservation> bookReservations = reservations.get(ISBN);
        if (bookReservations != null) {
            bookReservations.stream()
                .filter(r -> r.getMemberId().equals(memberId) && r.isActive())
                .forEach(BookReservation::cancel);
        }
    }

    // Get overdue books
    public List<BookIssue> getOverdueIssues() {
        return activeIssues.values().stream()
                .filter(BookIssue::isOverdue)
                .collect(Collectors.toList());
    }
}
```

### Search Index

```java
public class SearchIndex {
    private Map<String, Set<String>> titleIndex;
    private Map<String, Set<String>> authorIndex;
    private Map<String, String> isbnIndex;

    public SearchIndex() {
        this.titleIndex = new HashMap<>();
        this.authorIndex = new HashMap<>();
        this.isbnIndex = new HashMap<>();
    }

    public void indexBook(Book book) {
        // Index by title words
        String[] titleWords = book.getTitle().toLowerCase().split("\\s+");
        for (String word : titleWords) {
            titleIndex.computeIfAbsent(word, k -> new HashSet<>())
                     .add(book.getISBN());
        }

        // Index by author
        String author = book.getAuthor().toLowerCase();
        authorIndex.computeIfAbsent(author, k -> new HashSet<>())
                  .add(book.getISBN());

        // Index by ISBN
        isbnIndex.put(book.getISBN(), book.getISBN());
    }

    public void removeBook(String ISBN) {
        // Remove from all indices
        titleIndex.values().forEach(set -> set.remove(ISBN));
        authorIndex.values().forEach(set -> set.remove(ISBN));
        isbnIndex.remove(ISBN);
    }

    public List<String> search(String query) {
        Set<String> results = new HashSet<>();
        String lowerQuery = query.toLowerCase();

        // Search in ISBN
        if (isbnIndex.containsKey(query)) {
            results.add(query);
        }

        // Search in title
        titleIndex.entrySet().stream()
            .filter(e -> e.getKey().contains(lowerQuery))
            .flatMap(e -> e.getValue().stream())
            .forEach(results::add);

        // Search in author
        authorIndex.entrySet().stream()
            .filter(e -> e.getKey().contains(lowerQuery))
            .flatMap(e -> e.getValue().stream())
            .forEach(results::add);

        return new ArrayList<>(results);
    }
}
```

## Usage Example

```java
public class LibraryDemo {
    public static void main(String[] args) {
        Library library = new Library();

        // Add books
        Book book1 = new Book("978-0134685991",
                             "Effective Java",
                             "Joshua Bloch");
        library.addBook(book1);

        // Register member
        Member member = new Member("M001",
                                  "John Doe",
                                  "john@example.com",
                                  MembershipType.BASIC);
        library.registerMember(member);

        // Issue book
        try {
            BookIssue issue = library.issueBook("M001", "978-0134685991");
            System.out.println("Book issued. Due date: " + issue.getDueDate());

            // Simulate late return
            Thread.sleep(1000);
            double fine = library.returnBook(issue.getIssueId());
            System.out.println("Fine: $" + fine);

        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Search books
        List<Book> results = library.searchBooks("Java");
        System.out.println("Found " + results.size() + " books");
    }
}
```

## Design Patterns Used

1. **Factory Pattern:** Creating different membership types
2. **Strategy Pattern:** Different fine calculation strategies
3. **Observer Pattern:** Notify members about due dates
4. **State Pattern:** Book status transitions

## Trade-offs

| Aspect           | Choice          | Trade-off                   |
| ---------------- | --------------- | --------------------------- |
| Search           | In-memory index | Speed vs memory             |
| Storage          | HashMap         | Fast access vs ordered data |
| Fine calculation | On return       | Simplicity vs real-time     |
| Reservation      | Queue           | Fair vs complex             |

## 💡 Interview Tips & Out-of-the-Box Thinking

### Common Pitfalls

- **Not handling multiple copies**: One ISBN can have multiple physical copies - need copy ID
- **No reservation queue**: Popular books should have waitlist system
- **Hardcoded fine calculation**: Should be configurable strategy (daily rate, grace period)
- **Missing transaction history**: Need audit trail for disputes

### Design Pattern Recognition

- **Singleton**: Single Library instance per branch
- **Strategy**: Different fine calculation strategies (fixed, progressive, waiver for students)
- **Observer**: Notify members when reserved book becomes available
- **State**: Book states (Available → Issued → Overdue → Returned)
- **Factory**: Create different member types (Student, Faculty, Guest)

### Advanced Considerations

- **Concurrent borrowing**: Two members try to issue last copy - need distributed locks
- **Batch operations**: Process returns/fines overnight instead of real-time
- **Search optimization**: Elasticsearch for full-text search across titles/authors/descriptions
- **Multi-branch support**: Transfer books between branches, unified catalog
- **Historical data**: Archive old transactions for analytics without bloating active DB

### Creative Solutions

- **Smart recommendations**: ML-based "users who borrowed this also borrowed..."
- **Dynamic due dates**: Extend for books with no reservations, stricter for popular books
- **Fine amnesty periods**: Waive fines during exam periods to encourage returns
- **E-book integration**: Seamlessly handle both physical and digital books
- **RFID tagging**: Self-checkout kiosks with RFID scanners

### Trade-off Discussions

- **In-memory vs Database**: Fast but volatile vs Persistent but slower
- **Real-time fines vs Batch**: Immediate feedback vs Lower compute overhead
- **Strict limits vs Flexible**: Max 3 books (fair) vs Dynamic based on return history (optimized)
- **Reservation expiry**: Hold book for 24 hours (turn around) vs 7 days (member convenience)

### Edge Cases

- **Book lost before return**: How to handle fine + replacement cost? (Answer: Mark as LOST, charge replacement + processing fee)
- **Member with overdue fines**: Can they borrow more? (Answer: Block until fines paid)
- **Book damaged on return**: Who assesses damage? (Answer: Librarian inspection + damage codes)
- **Reservation conflicts**: Two members reserved at same time (Answer: Timestamp-based priority queue)
- **Renewal limits**: How many times can member renew? (Answer: Max 2 renewals if no reservations)
- **Bulk return**: Member returns 20 books at once (Answer: Batch process to avoid blocking)

## Follow-up Questions

1. How to handle multiple copies of the same book?
2. How to implement a waitlist for popular books?
3. How to send automated reminders for due dates?
4. How to implement damage/loss handling?
5. How to generate monthly reports?
