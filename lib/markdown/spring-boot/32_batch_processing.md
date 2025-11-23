# Tutorial 32: Batch Processing in Spring Boot

## Understanding the Question

**Why can't we just loop through data and save it?**

Simple loop approach:

```
for (int i = 0; i < 1000000; i++) {
  repository.save(data[i]);  // 1 million SQL INSERT statements!
}
```

Problems:

- **One INSERT per item** = 1 million database round trips (extremely slow)
- **Memory explosion** = All 1 million objects loaded in RAM simultaneously
- **Transaction size** = One giant transaction locks resources for minutes
- **No progress tracking** = No way to know how many processed, how many failed

**Batch processing solves this** by:

- Grouping operations into batches (e.g., 1000 at a time)
- Committing periodically (many inserts in one batch, low latency)
- Loading data incrementally (constant memory, not 1 million objects)
- Tracking progress (100% processed: 950,000/1,000,000)
- Recovering from failures (skip bad batch, continue)

## Core Concepts

### The Problem with Simple Loops

```java
// ❌ WRONG: Processing 1 million records
@Service
public class DataImportService {

  @Autowired
  private UserRepository repository;

  public void importUsers(List<UserDTO> users) {
    for (UserDTO dto : users) {  // 1 million iterations
      User entity = new User(dto.getName(), dto.getEmail());
      repository.save(entity);    // 1 million SQL calls!
    }
    // Result: 1000x slower than batch processing
  }
}

// Problems:
// 1. Time: 1 million saves = hours
// 2. Memory: All 1 million objects in memory at once
// 3. Transactions: One transaction holds locks for entire duration
// 4. Recovery: Fails at item 999,999 = total loss
```

### Batch Processing Architecture

```
Batch Processing Flow:

Input Data (1 million records)
    ↓
┌──────────────────────────────────┐
│ Batch 1: Items 1-1,000           │ Load
├──────────────────────────────────┤
│ Process (transform, validate)    │
├──────────────────────────────────┤
│ Save to database in one batch    │ Commit TX
└──────────────────────────────────┘
    ↓
┌──────────────────────────────────┐
│ Batch 2: Items 1,001-2,000       │ Load
├──────────────────────────────────┤
│ Process & Save                   │ Commit TX
└──────────────────────────────────┘
    ↓
...repeat...
    ↓
┌──────────────────────────────────┐
│ Batch N: Items 999,001-1,000,000 │
├──────────────────────────────────┤
│ Process & Save                   │ Commit TX
└──────────────────────────────────┘

Benefits:
✅ Constant memory usage (always 1,000 items)
✅ Many inserts per commit (efficient)
✅ Quick transactions (short lock time)
✅ Progress tracking (items processed/total)
✅ Partial failure recovery (skip failed batch, continue)
```

### JPA Batch Processing Configuration

```yaml
# application.properties
# Tell Hibernate to batch database operations

spring.jpa.properties.hibernate.jdbc.batch_size=1000
spring.jpa.properties.hibernate.order_inserts=true
spring.jpa.properties.hibernate.order_updates=true
spring.jpa.properties.hibernate.jdbc.batch_versioned_data=true
# Batch size: How many items before executing batch
# order_inserts: Group similar INSERT statements
# order_updates: Group similar UPDATE statements
# batch_versioned_data: Include version column in batching

# Example impact:
# Without batching: 1000 INSERT statements
# With batching: 1 batch of 1000 INSERTs = 10x-50x faster
```

### Manual Batch Processing Pattern

```java
@Service
public class BatchProcessingService {

  @Autowired
  private UserRepository repository;

  @Autowired
  private EntityManager entityManager;

  public void importUsersInBatches(Stream<UserDTO> users) {
    final int BATCH_SIZE = 1000;
    List<User> batch = new ArrayList<>();

    users.forEach(dto -> {
      // Transform to entity
      User user = new User(dto.getName(), dto.getEmail());
      batch.add(user);

      // When batch full: commit and clear
      if (batch.size() >= BATCH_SIZE) {
        repository.saveAll(batch);

        // CRITICAL: Clear persistence context
        // Prevents memory leak (entities remain in memory)
        entityManager.flush();
        entityManager.clear();

        batch.clear();
      }
    });

    // Save remaining items
    if (!batch.isEmpty()) {
      repository.saveAll(batch);
      entityManager.flush();
      entityManager.clear();
    }
  }
}

// Key insight: entityManager.clear() removes entities from memory
// Without it: all entities stay in memory regardless of batch size
```

### Chunking Large Datasets

```java
@Service
public class ChunkProcessingService {

  @Autowired
  private DataRepository repository;

  public void processLargeDataset() {
    // Pagination approach: avoid loading everything at once
    int pageNumber = 0;
    int pageSize = 1000;
    Page<Data> currentPage;

    do {
      currentPage = repository.findAll(
        PageRequest.of(pageNumber, pageSize)
      );

      // Process current chunk
      currentPage.getContent().forEach(item -> {
        processItem(item);
      });

      pageNumber++;
    } while (currentPage.hasNext());
  }

  // Alternative: Stream-based chunking
  @Transactional(readOnly = true)
  public void processWithStream() {
    // Spring Data provides streams for large datasets
    try (Stream<Data> stream = repository.stream()) {
      stream
        .peek(this::processItem)
        .collect(Collectors.groupingBy(
          item -> item.getId() / 1000,  // Group by 1000-item chunks
          Collectors.toList()
        ))
        .forEach(this::processBatch);
    }
  }
}
```

## Complete Implementation Examples

### Example 1: CSV Import with Batch Processing

```java
@Service
@RequiredArgsConstructor
public class CsvImportService {

  private final UserRepository userRepository;
  private final EntityManager entityManager;
  private final CsvParser csvParser;

  private static final int BATCH_SIZE = 2000;
  private static final Logger logger = LoggerFactory.getLogger(CsvImportService.class);

  @Transactional
  public ImportResult importCsv(File csvFile) {
    long startTime = System.currentTimeMillis();
    long processedCount = 0;
    long errorCount = 0;

    try (BufferedReader reader = new BufferedReader(new FileReader(csvFile))) {
      List<User> batch = new ArrayList<>();
      String line;
      int lineNumber = 0;

      while ((line = reader.readLine()) != null) {
        lineNumber++;

        try {
          // Parse CSV line
          UserCsvRecord record = csvParser.parseLine(line);

          // Validate
          if (!record.isValid()) {
            logger.warn("Invalid record at line {}", lineNumber);
            errorCount++;
            continue;
          }

          // Convert to entity
          User user = new User(
            record.getEmail(),
            record.getName(),
            record.getAge()
          );

          batch.add(user);
          processedCount++;

          // Batch processing: save and clear
          if (batch.size() >= BATCH_SIZE) {
            userRepository.saveAll(batch);

            // Flush & clear to free memory
            entityManager.flush();
            entityManager.clear();

            logger.info("Processed {} records", processedCount);
            batch.clear();
          }

        } catch (ParseException e) {
          logger.error("Error parsing line {}: {}", lineNumber, e.getMessage());
          errorCount++;
        }
      }

      // Save remaining
      if (!batch.isEmpty()) {
        userRepository.saveAll(batch);
        entityManager.flush();
      }

      long duration = System.currentTimeMillis() - startTime;
      return new ImportResult(processedCount, errorCount, duration);

    } catch (IOException e) {
      logger.error("Failed to read CSV file", e);
      throw new ImportException("CSV file read failed", e);
    }
  }
}

@Data
public class ImportResult {
  private long processedCount;
  private long errorCount;
  private long durationMs;

  public double getRecordsPerSecond() {
    return (processedCount * 1000.0) / durationMs;
  }
}
```

### Example 2: Database-to-Database Migration with Batching

```java
@Service
@RequiredArgsConstructor
public class DataMigrationService {

  private final SourceRepository sourceRepository;
  private final DestinationRepository destRepository;
  private final EntityManager entityManager;

  private static final int PAGE_SIZE = 1000;

  @Transactional
  public MigrationReport migrateData() {
    int page = 0;
    long totalMigrated = 0;
    long totalErrors = 0;

    while (true) {
      // Fetch one page from source
      Page<SourceEntity> sourcePage = sourceRepository.findAll(
        PageRequest.of(page, PAGE_SIZE)
      );

      if (sourcePage.isEmpty()) {
        break;
      }

      // Transform and save
      List<DestinationEntity> batch = sourcePage.getContent()
        .stream()
        .map(this::transform)
        .collect(Collectors.toList());

      try {
        destRepository.saveAll(batch);
        totalMigrated += batch.size();

        // Clear context to free memory
        entityManager.flush();
        entityManager.clear();

      } catch (Exception e) {
        totalErrors += batch.size();
        logger.error("Error migrating batch at page {}", page);
      }

      page++;

      if (!sourcePage.hasNext()) {
        break;
      }
    }

    return new MigrationReport(totalMigrated, totalErrors);
  }

  private DestinationEntity transform(SourceEntity source) {
    return new DestinationEntity(
      source.getId(),
      source.getName(),
      source.getCreatedDate()
    );
  }
}
```

### Example 3: Spring Batch Framework Integration

```java
// Dependency
// <dependency>
//   <groupId>org.springframework.boot</groupId>
//   <artifactId>spring-boot-starter-batch</artifactId>
// </dependency>

@Configuration
@EnableBatchProcessing
public class BatchConfiguration {

  @Bean
  public Job importUserJob(
    JobBuilderFactory jobBuilderFactory,
    Step step1) {

    return jobBuilderFactory.get("importUserJob")
      .start(step1)
      .build();
  }

  @Bean
  public Step step1(
    StepBuilderFactory stepBuilderFactory,
    ItemReader<UserDTO> reader,
    ItemProcessor<UserDTO, User> processor,
    ItemWriter<User> writer) {

    return stepBuilderFactory.get("step1")
      .<UserDTO, User>chunk(2000)  // Batch size
      .reader(reader)
      .processor(processor)
      .writer(writer)
      .faultTolerant()             // Continue on errors
      .skip(UserException.class)    // Skip bad records
      .skipLimit(100)               // Max skipped
      .build();
  }

  @Bean
  @StepScope
  public ItemReader<UserDTO> csvFileReader(
    @Value("#{jobParameters['file']}") String filePath) {

    FlatFileItemReader<UserDTO> reader = new FlatFileItemReader<>();
    reader.setResource(new FileSystemResource(filePath));
    reader.setLineMapper(new DefaultLineMapper<UserDTO>() {
      {
        setLineTokenizer(new DelimitedLineTokenizer());
        setFieldSetMapper(new FieldSetMapper<UserDTO>() {
          @Override
          public UserDTO mapFieldSet(FieldSet fieldSet) {
            return new UserDTO(
              fieldSet.readString(0),  // email
              fieldSet.readString(1)   // name
            );
          }
        });
      }
    });

    return reader;
  }

  @Bean
  public ItemProcessor<UserDTO, User> userProcessor() {
    return dto -> {
      // Validate
      if (!dto.isValid()) {
        throw new UserException("Invalid user data");
      }

      // Transform
      return new User(dto.getEmail(), dto.getName());
    };
  }

  @Bean
  public ItemWriter<User> databaseWriter(UserRepository repository) {
    return items -> repository.saveAll(items);
  }
}

// Run batch job
@RestController
public class BatchController {

  @Autowired
  private JobLauncher jobLauncher;

  @Autowired
  private Job importUserJob;

  @PostMapping("/batch/import")
  public ResponseEntity<Long> runBatch(
    @RequestParam String filePath) throws Exception {

    JobParameters jobParameters = new JobParametersBuilder()
      .addString("file", filePath)
      .addLong("time", System.currentTimeMillis())
      .toJobParameters();

    JobExecution execution = jobLauncher.run(importUserJob, jobParameters);

    return ResponseEntity.ok(execution.getId());
  }
}
```

## Best Practices

### ✅ DO

```java
// 1. Use batch processing for large datasets
public void importLargeDataset(Stream<Item> items) {
  items
    .collect(Collectors.groupingByConcurrent(
      item -> item.getId() / BATCH_SIZE,
      Collectors.toList()
    ))
    .forEach(batch -> {
      repository.saveAll(batch);
      entityManager.flush();
      entityManager.clear();
    });
}

// 2. Clear EntityManager context after each batch
entityManager.flush();      // Write to database
entityManager.clear();      // Remove from memory

// 3. Enable Hibernate batch settings
spring.jpa.properties.hibernate.jdbc.batch_size=1000
spring.jpa.properties.hibernate.order_inserts=true

// 4. Track progress for monitoring
BatchProgress progress = new BatchProgress(totalItems);
while (hasMore) {
  processBatch(nextBatch);
  progress.increment(batchSize);
  publishProgress(progress);
}

// 5. Handle errors gracefully
try {
  repository.saveAll(batch);
} catch (Exception e) {
  logger.error("Batch failed, skipping");
  errorCount++;
  continue;  // Process next batch
}

// 6. Use pagination for large queries
Page<Item> page = repository.findAll(
  PageRequest.of(pageNum, BATCH_SIZE)
);

// 7. Use Spring Batch for complex scenarios
@EnableBatchProcessing
public class BatchConfig { }
```

### ❌ DON'T

```java
// 1. Don't load entire dataset into memory
List<Item> allItems = repository.findAll();  // WRONG!
allItems.forEach(repository::save);

// 2. Don't forget entityManager.clear()
for (Item item : items) {
  repository.save(item);
  // Memory keeps growing - entities stay in persistence context
}

// 3. Don't put batch processing in controller
@PostMapping
public void importData() {
  for (Item item : items) {
    processItem(item);  // Blocks HTTP response!
  }
}

// 4. Don't process batches synchronously in single thread
// For multi-hour jobs, use async or messaging

// 5. Don't ignore batch processing settings
// Default Hibernate batch_size=15 - too small!
// Set to 1000+ for performance

// 6. Don't mix batch and individual saves
batchRepository.saveAll(batch);
repository.save(singleItem);  // Inconsistent!

// 7. Don't process without error handling
processBatch(batch);  // If fails, entire job fails
```

## Advanced Topics

### Parallel Batch Processing

```java
@Service
public class ParallelBatchService {

  @Autowired
  private TaskExecutor taskExecutor;

  public void processInParallel(List<Item> items) {
    List<List<Item>> batches = items.stream()
      .collect(Collectors.groupingBy(
        item -> item.getId() % 4  // 4 parallel threads
      ))
      .values()
      .stream()
      .toList();

    // Process 4 batches in parallel
    CompletableFuture.allOf(
      batches.stream()
        .map(batch -> CompletableFuture.runAsync(
          () -> processBatch(batch),
          taskExecutor
        ))
        .toArray(CompletableFuture[]::new)
    ).join();
  }
}
```

### Monitoring & Metrics

```java
@Service
public class MonitoredBatchService {

  @Autowired
  private MeterRegistry meterRegistry;

  public void processBatch(List<Item> items) {
    AtomicInteger processed = new AtomicInteger(0);
    AtomicInteger errors = new AtomicInteger(0);

    items.forEach(item -> {
      try {
        processItem(item);
        processed.incrementAndGet();
      } catch (Exception e) {
        errors.incrementAndGet();
      }
    });

    meterRegistry.counter("batch.items.processed")
      .increment(processed.get());
    meterRegistry.counter("batch.items.failed")
      .increment(errors.get());
  }
}
```

## Practice Questions & Answers

**Q1: Why do we need to call entityManager.clear() after each batch?**

A: Without it, all processed entities remain in the persistence context (memory). For 1 million items with 1,000-item batches, all 1 million entities stay in RAM, causing out-of-memory errors.

**Q2: What's the optimal batch size?**

A: Typically 500-2000, depending on entity size and available memory. Larger batches are faster but use more memory. Monitor and test for your specific use case.

**Q3: When should you use Spring Batch vs manual batching?**

A: Use Spring Batch for complex scenarios (multi-step, retries, skips, monitoring). Use manual batching for simple loops where you just need batching logic.

**Q4: How do you handle failures in batch processing?**

A: Catch exceptions per batch, skip bad batches with logging, continue processing. For critical data, use Spring Batch's skip/retry mechanisms.

## Key Takeaways

1. **Batch processing**: Group operations into chunks, commit periodically
2. **Memory management**: Always clear EntityManager after each batch
3. **Hibernate batching**: Configure jdbc.batch_size for automatic batching
4. **Pagination**: Use PageRequest to load data incrementally
5. **Transaction scope**: Keep batch transactions short (not 1 million items)
6. **Error handling**: Handle batch-level failures, continue processing
7. **Progress tracking**: Monitor how many items processed vs total
8. **entityManager.clear()**: Critical to free memory between batches
9. **Spring Batch**: Use for complex scenarios with retries/skips
10. **Performance**: 100x+ faster than item-by-item processing
