/**
 * MySQL Tutorial Catalog
 * Auto-generated list of all MySQL interview tutorials
 * 
 * Usage: Import this in your mysqlTutorials.ts file
 */

export interface MySQLTutorial {
  id: string;
  title: string;
  slug: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  readTime: string;
  description: string;
  tags: string[];
  hasFullContent?: boolean; // Indicates if tutorial is fully completed
}

export const mysqlTutorialsCatalog: MySQLTutorial[] = [
  // ========================================
  // BEGINNER LEVEL - Fundamentals
  // ========================================
  {
    id: 'beginner-01',
    title: 'What is MySQL and Why is it Popular?',
    slug: 'beginner-01-what-is-mysql',
    category: 'Fundamentals',
    level: 'beginner',
    readTime: '8 min',
    description: 'Understand what MySQL is, its core purpose, and the reasons behind its widespread adoption in the software industry.',
    tags: ['MySQL', 'Database', 'RDBMS', 'Introduction'],
    hasFullContent: true
  },
  {
    id: 'beginner-02',
    title: 'Difference between SQL and MySQL',
    slug: '02-sql-vs-mysql',
    category: 'Fundamentals',
    level: 'beginner',
    readTime: '10 min',
    description: 'Learn the fundamental difference between SQL (the language) and MySQL (the database system).',
    tags: ['SQL', 'MySQL', 'Comparison'],
    hasFullContent: true
  },
  {
    id: 'beginner-03',
    title: 'Different Tablespaces in MySQL',
    slug: 'beginner-03-tablespaces',
    category: 'Storage',
    level: 'beginner',
    readTime: '12 min',
    description: 'Explore MySQL tablespace types including System, File-per-Table, General, Undo, and Temporary tablespaces.',
    tags: ['Tablespace', 'InnoDB', 'Storage'],
    hasFullContent: true
  },
  {
    id: 'beginner-04',
    title: 'MyISAM vs InnoDB Storage Engines',
    slug: '03-storage-engines',
    category: 'Storage',
    level: 'beginner',
    readTime: '10 min',
    description: 'Compare MyISAM and InnoDB storage engines and understand when to use each.',
    tags: ['Storage Engine', 'MyISAM', 'InnoDB'],
    hasFullContent: true
  },
  {
    id: 'beginner-05',
    title: 'ACID Properties in MySQL',
    slug: '04-acid-properties',
    category: 'Fundamentals',
    level: 'beginner',
    readTime: '10 min',
    description: 'Learn about Atomicity, Consistency, Isolation, and Durability in database transactions.',
    tags: ['ACID', 'Transactions', 'Database Theory'],
    hasFullContent: true
  },
  {
    id: 'beginner-07',
    title: 'What is a Primary Key?',
    slug: 'beginner-07-primary-key',
    category: 'Constraints',
    level: 'beginner',
    readTime: '10 min',
    description: 'Understand primary keys, their rules, types (simple, composite, auto-increment), and best practices.',
    tags: ['Primary Key', 'Constraints', 'Keys'],
    hasFullContent: true
  },
  {
    id: 'beginner-08',
    title: 'What is a Foreign Key?',
    slug: 'beginner-08-foreign-key',
    category: 'Constraints',
    level: 'beginner',
    readTime: '10 min',
    description: 'Learn about foreign keys, referential integrity, cascade actions, and table relationships.',
    tags: ['Foreign Key', 'Constraints', 'Relationships'],
    hasFullContent: false
  },
  {
    id: 'beginner-09',
    title: 'CHAR vs VARCHAR Data Types',
    slug: 'beginner-09-char-vs-varchar',
    category: 'Data Types',
    level: 'beginner',
    readTime: '8 min',
    description: 'Compare CHAR and VARCHAR data types, their storage mechanisms, and when to use each.',
    tags: ['Data Types', 'CHAR', 'VARCHAR', 'Storage'],
    hasFullContent: false
  },
  {
    id: 'beginner-10',
    title: 'DELETE vs TRUNCATE',
    slug: 'beginner-10-delete-vs-truncate',
    category: 'DML',
    level: 'beginner',
    readTime: '8 min',
    description: 'Understand the difference between DELETE and TRUNCATE commands, their performance and use cases.',
    tags: ['DELETE', 'TRUNCATE', 'DML', 'Performance'],
    hasFullContent: false
  },
  {
    id: 'beginner-11',
    title: 'DROP vs TRUNCATE',
    slug: 'beginner-11-drop-vs-truncate-in-mysql',
    category: 'DDL',
    level: 'beginner',
    readTime: '7 min',
    description: 'Learn the difference between DROP and TRUNCATE statements in MySQL.',
    tags: ['DROP', 'TRUNCATE', 'DDL'],
    hasFullContent: false
  },
  {
    id: 'beginner-12',
    title: 'Views in MySQL',
    slug: 'beginner-12-views-in-mysql',
    category: 'Database Objects',
    level: 'beginner',
    readTime: '10 min',
    description: 'Understand what views are, how to create them, and their benefits for security and simplification.',
    tags: ['Views', 'Virtual Tables', 'Security'],
    hasFullContent: false
  },
  {
    id: 'beginner-13',
    title: 'Stored Procedures',
    slug: 'beginner-13-stored-procedures-in-mysql',
    category: 'Database Objects',
    level: 'beginner',
    readTime: '12 min',
    description: 'Learn how to create and use stored procedures for code reusability and performance.',
    tags: ['Stored Procedures', 'Optimization', 'Reusability'],
    hasFullContent: false
  },
  {
    id: 'beginner-14',
    title: 'Triggers in MySQL',
    slug: 'beginner-14-triggers-in-mysql',
    category: 'Database Objects',
    level: 'beginner',
    readTime: '10 min',
    description: 'Understand triggers, their types (BEFORE/AFTER, INSERT/UPDATE/DELETE), and use cases.',
    tags: ['Triggers', 'Automation', 'Event Handling'],
    hasFullContent: false
  },
  {
    id: 'beginner-15',
    title: 'WHERE vs HAVING Clause',
    slug: 'beginner-15-where-vs-having-clause',
    category: 'Queries',
    level: 'beginner',
    readTime: '8 min',
    description: 'Learn when to use WHERE vs HAVING clause in SQL queries.',
    tags: ['WHERE', 'HAVING', 'Filtering', 'GROUP BY'],
    hasFullContent: false
  },
  {
    id: 'beginner-16',
    title: 'SQL Joins Explained',
    slug: 'beginner-16-sql-joins-explained',
    category: 'Joins',
    level: 'beginner',
    readTime: '15 min',
    description: 'Master INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN with examples.',
    tags: ['Joins', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN'],
    hasFullContent: false
  },
  {
    id: 'beginner-17',
    title: 'Self Join in MySQL',
    slug: 'beginner-17-self-join-in-mysql',
    category: 'Joins',
    level: 'beginner',
    readTime: '10 min',
    description: 'Learn how to join a table to itself for hierarchical data and comparisons.',
    tags: ['Self Join', 'Hierarchical Data', 'Joins'],
    hasFullContent: false
  },
  {
    id: 'beginner-18',
    title: 'Normalization (1NF, 2NF, 3NF, BCNF)',
    slug: 'beginner-18-normalization-in-databases',
    category: 'Database Design',
    level: 'beginner',
    readTime: '15 min',
    description: 'Understand database normalization and its normal forms to reduce redundancy.',
    tags: ['Normalization', 'Database Design', '1NF', '2NF', '3NF', 'BCNF'],
    hasFullContent: false
  },
  {
    id: 'beginner-19',
    title: 'Denormalization',
    slug: 'beginner-19-denormalization-in-databases',
    category: 'Database Design',
    level: 'beginner',
    readTime: '10 min',
    description: 'Learn when and why to denormalize databases for performance optimization.',
    tags: ['Denormalization', 'Performance', 'Database Design'],
    hasFullContent: false
  },
  {
    id: 'beginner-20',
    title: 'Indexes in MySQL',
    slug: 'beginner-20-indexes-in-mysql',
    category: 'Indexing',
    level: 'beginner',
    readTime: '12 min',
    description: 'Understand what indexes are and the different types: Primary, Unique, Full-text, Composite.',
    tags: ['Indexes', 'Performance', 'Optimization'],
    hasFullContent: false
  },
  {
    id: 'beginner-21',
    title: 'Clustered vs Non-Clustered Index',
    slug: 'beginner-21-clustered-vs-non-clustered-index',
    category: 'Indexing',
    level: 'beginner',
    readTime: '10 min',
    description: 'Learn the difference between clustered and non-clustered indexes.',
    tags: ['Clustered Index', 'Non-Clustered Index', 'Indexing'],
    hasFullContent: false
  },
  {
    id: 'beginner-22',
    title: 'Composite Index',
    slug: 'beginner-22-composite-index',
    category: 'Indexing',
    level: 'beginner',
    readTime: '10 min',
    description: 'Understand composite indexes and the leftmost prefix rule.',
    tags: ['Composite Index', 'Multi-Column Index', 'Indexing'],
    hasFullContent: false
  },
  {
    id: 'beginner-23',
    title: 'Covering Index',
    slug: 'beginner-23-covering-index',
    category: 'Indexing',
    level: 'beginner',
    readTime: '9 min',
    description: 'Learn what covering indexes are and how they improve query performance.',
    tags: ['Covering Index', 'Performance', 'Index Optimization'],
    hasFullContent: false
  },
  {
    id: 'beginner-24',
    title: 'When to Avoid Indexes',
    slug: 'beginner-24-when-to-avoid-indexes',
    category: 'Indexing',
    level: 'beginner',
    readTime: '8 min',
    description: 'Understand scenarios where indexes can hurt performance.',
    tags: ['Indexes', 'Performance', 'Best Practices'],
    hasFullContent: false
  },
  {
    id: 'beginner-25',
    title: 'EXPLAIN Statement',
    slug: 'beginner-25-explain-statement',
    category: 'Performance',
    level: 'beginner',
    readTime: '12 min',
    description: 'Learn how to use EXPLAIN to analyze and optimize SQL queries.',
    tags: ['EXPLAIN', 'Query Optimization', 'Performance'],
    hasFullContent: false
  },

  // ========================================
  // INTERMEDIATE LEVEL - Practical Problems
  // ========================================
  {
    id: 'intermediate-01',
    title: 'Find Duplicate Records',
    slug: 'intermediate-01-find-duplicate-records',
    category: 'Query Problems',
    level: 'intermediate',
    readTime: '10 min',
    description: 'Learn multiple approaches to identify duplicate rows using GROUP BY, self-joins, and window functions.',
    tags: ['Duplicates', 'GROUP BY', 'HAVING', 'Window Functions'],
    hasFullContent: true
  },
  {
    id: 'intermediate-02',
    title: 'Delete Duplicate Rows',
    slug: 'intermediate-02-delete-duplicate-rows',
    category: 'Query Problems',
    level: 'intermediate',
    readTime: '12 min',
    description: 'Master techniques to delete duplicate rows while keeping one using ROW_NUMBER and CTEs.',
    tags: ['Duplicates', 'DELETE', 'ROW_NUMBER', 'CTE'],
    hasFullContent: false
  },
  {
    id: 'intermediate-03',
    title: 'Second Highest Salary',
    slug: 'intermediate-03-second-highest-salary',
    category: 'Query Problems',
    level: 'intermediate',
    readTime: '10 min',
    description: 'Find the second highest value using LIMIT, MAX, DENSE_RANK, and subqueries.',
    tags: ['Ranking', 'Subquery', 'LIMIT', 'DENSE_RANK'],
    hasFullContent: true
  },
  {
    id: 'intermediate-04',
    title: 'Nth Highest Salary',
    slug: 'intermediate-04-nth-highest-salary',
    category: 'Query Problems',
    level: 'intermediate',
    readTime: '10 min',
    description: 'Generalize the solution to find any Nth highest value.',
    tags: ['Ranking', 'DENSE_RANK', 'Dynamic Queries'],
    hasFullContent: false
  },
  {
    id: 'intermediate-05',
    title: 'UNION vs UNION ALL',
    slug: 'intermediate-05-union-vs-union-all',
    category: 'Set Operations',
    level: 'intermediate',
    readTime: '8 min',
    description: 'Understand the difference between UNION and UNION ALL and their performance implications.',
    tags: ['UNION', 'UNION ALL', 'Set Operations', 'Performance'],
    hasFullContent: false
  },
  {
    id: 'intermediate-06',
    title: 'RANK, DENSE_RANK, ROW_NUMBER',
    slug: 'intermediate-06-window-functions-rank-dense-rank-row-number',
    category: 'Window Functions',
    level: 'intermediate',
    readTime: '12 min',
    description: 'Compare the three ranking window functions and learn when to use each.',
    tags: ['Window Functions', 'RANK', 'DENSE_RANK', 'ROW_NUMBER'],
    hasFullContent: true
  },
  {
    id: 'intermediate-07',
    title: 'Employees Earning More Than Manager',
    slug: 'intermediate-07-employees-earning-more-than-manager',
    category: 'Query Problems',
    level: 'intermediate',
    readTime: '8 min',
    description: 'Use self-join to compare employee and manager salaries.',
    tags: ['Self Join', 'Comparisons', 'Practical Problems'],
    hasFullContent: false
  },
  {
    id: 'intermediate-08',
    title: 'Window Functions Explained',
    slug: 'intermediate-08-window-functions-explained',
    category: 'Window Functions',
    level: 'intermediate',
    readTime: '15 min',
    description: 'Comprehensive guide to window functions: LAG, LEAD, FIRST_VALUE, LAST_VALUE, and more.',
    tags: ['Window Functions', 'Analytics', 'Advanced Queries'],
    hasFullContent: false
  },
  {
    id: 'intermediate-09',
    title: 'Pivot Rows to Columns',
    slug: 'intermediate-09-pivot-rows-to-columns',
    category: 'Data Transformation',
    level: 'intermediate',
    readTime: '12 min',
    description: 'Learn how to pivot data using CASE statements and conditional aggregation.',
    tags: ['Pivot', 'CASE', 'Data Transformation'],
    hasFullContent: false
  },
  {
    id: 'intermediate-10',
    title: 'Common Table Expressions (CTE)',
    slug: 'intermediate-10-common-table-expressions-cte',
    category: 'Advanced Queries',
    level: 'intermediate',
    readTime: '12 min',
    description: 'Master CTEs for better query readability and complex logic.',
    tags: ['CTE', 'WITH Clause', 'Query Organization'],
    hasFullContent: false
  },
  {
    id: 'intermediate-11',
    title: 'Recursive CTE',
    slug: 'intermediate-11-recursive-cte',
    category: 'Advanced Queries',
    level: 'intermediate',
    readTime: '15 min',
    description: 'Use recursive CTEs for hierarchical data and tree structures.',
    tags: ['Recursive CTE', 'Hierarchical Data', 'Tree Traversal'],
    hasFullContent: false
  },
  {
    id: 'intermediate-12',
    title: 'Handling NULL in Aggregates',
    slug: 'intermediate-12-handling-null-in-aggregates',
    category: 'Functions',
    level: 'intermediate',
    readTime: '8 min',
    description: 'Learn how aggregate functions treat NULL values.',
    tags: ['NULL', 'Aggregate Functions', 'Data Quality'],
    hasFullContent: false
  },
  {
    id: 'intermediate-13',
    title: 'COALESCE and NULLIF',
    slug: 'intermediate-13-coalesce-and-nullif',
    category: 'Functions',
    level: 'intermediate',
    readTime: '8 min',
    description: 'Master NULL handling functions COALESCE and NULLIF.',
    tags: ['COALESCE', 'NULLIF', 'NULL Handling'],
    hasFullContent: false
  },
  {
    id: 'intermediate-14',
    title: 'Full-Text Search Index',
    slug: 'intermediate-14-full-text-search-index',
    category: 'Search',
    level: 'intermediate',
    readTime: '12 min',
    description: 'Implement full-text search using FULLTEXT indexes and MATCH AGAINST.',
    tags: ['Full-Text Search', 'FULLTEXT', 'Search Optimization'],
    hasFullContent: false
  },
  {
    id: 'intermediate-15',
    title: 'DATETIME vs TIMESTAMP',
    slug: 'intermediate-15-datetime-vs-timestamp',
    category: 'Data Types',
    level: 'intermediate',
    readTime: '8 min',
    description: 'Understand differences between DATETIME and TIMESTAMP data types.',
    tags: ['DATETIME', 'TIMESTAMP', 'Date Types', 'Time Zones'],
    hasFullContent: false
  },
  {
    id: 'intermediate-16',
    title: 'JSON Data in MySQL 8+',
    slug: 'intermediate-16-json-data-in-mysql-8',
    category: 'Data Types',
    level: 'intermediate',
    readTime: '15 min',
    description: 'Work with JSON data type and JSON functions in MySQL 8.',
    tags: ['JSON', 'MySQL 8', 'NoSQL Features'],
    hasFullContent: false
  },
  {
    id: 'intermediate-17',
    title: 'Generated Columns',
    slug: 'intermediate-17-generated-columns',
    category: 'Advanced Features',
    level: 'intermediate',
    readTime: '10 min',
    description: 'Use VIRTUAL and STORED generated columns for computed values.',
    tags: ['Generated Columns', 'Computed Columns', 'MySQL 5.7+'],
    hasFullContent: false
  },
  {
    id: 'intermediate-18',
    title: 'Data Encryption in MySQL',
    slug: 'intermediate-18-data-encryption-in-mysql',
    category: 'Security',
    level: 'intermediate',
    readTime: '12 min',
    description: 'Implement data encryption using AES_ENCRYPT and AES_DECRYPT.',
    tags: ['Encryption', 'Security', 'AES'],
    hasFullContent: false
  },
  {
    id: 'intermediate-19',
    title: 'Optimize Slow Queries',
    slug: 'intermediate-19-optimize-slow-queries',
    category: 'Performance',
    level: 'intermediate',
    readTime: '15 min',
    description: 'Learn techniques to identify and optimize slow queries.',
    tags: ['Performance', 'Optimization', 'EXPLAIN', 'Indexing'],
    hasFullContent: false
  },
  {
    id: 'intermediate-20',
    title: 'Slow Query Log',
    slug: 'intermediate-20-slow-query-log',
    category: 'Performance',
    level: 'intermediate',
    readTime: '10 min',
    description: 'Configure and analyze slow query log for performance monitoring.',
    tags: ['Slow Query Log', 'Monitoring', 'Performance'],
    hasFullContent: false
  },

  // ========================================
  // ADVANCED LEVEL - Architecture & Scaling
  // ========================================
  {
    id: 'advanced-01',
    title: 'InnoDB Buffer Pool',
    slug: 'advanced-01-innodb-buffer-pool',
    category: 'InnoDB Internals',
    level: 'advanced',
    readTime: '15 min',
    description: 'Deep dive into InnoDB buffer pool architecture and tuning.',
    tags: ['InnoDB', 'Buffer Pool', 'Memory Management', 'Performance'],
    hasFullContent: false
  },
  {
    id: 'advanced-02',
    title: 'Redo and Undo Logs',
    slug: 'advanced-02-redo-and-undo-logs',
    category: 'InnoDB Internals',
    level: 'advanced',
    readTime: '15 min',
    description: 'Understand redo logs for crash recovery and undo logs for MVCC.',
    tags: ['Redo Log', 'Undo Log', 'Crash Recovery', 'MVCC'],
    hasFullContent: false
  },
  {
    id: 'advanced-03',
    title: 'InnoDB Crash Recovery',
    slug: 'advanced-03-innodb-crash-recovery',
    category: 'InnoDB Internals',
    level: 'advanced',
    readTime: '12 min',
    description: 'Learn how InnoDB recovers from crashes using WAL.',
    tags: ['Crash Recovery', 'Durability', 'InnoDB'],
    hasFullContent: false
  },
  {
    id: 'advanced-04',
    title: 'Doublewrite Buffer',
    slug: 'advanced-04-doublewrite-buffer',
    category: 'InnoDB Internals',
    level: 'advanced',
    readTime: '10 min',
    description: 'Understand the doublewrite buffer and partial page writes.',
    tags: ['Doublewrite Buffer', 'Data Integrity', 'InnoDB'],
    hasFullContent: false
  },
  {
    id: 'advanced-05',
    title: 'Binlog vs Redo Log',
    slug: 'advanced-05-binlog-vs-redo-log',
    category: 'Logging',
    level: 'advanced',
    readTime: '12 min',
    description: 'Compare binary log and redo log purposes and use cases.',
    tags: ['Binary Log', 'Redo Log', 'Replication', 'Recovery'],
    hasFullContent: false
  },
  {
    id: 'advanced-06',
    title: 'MySQL Replication',
    slug: 'advanced-06-mysql-replication',
    category: 'Replication',
    level: 'advanced',
    readTime: '20 min',
    description: 'Master MySQL replication: asynchronous, semi-synchronous, and GTID-based.',
    tags: ['Replication', 'Master-Slave', 'GTID', 'High Availability'],
    hasFullContent: false
  },
  {
    id: 'advanced-07',
    title: 'Group Replication',
    slug: 'advanced-07-group-replication',
    category: 'Replication',
    level: 'advanced',
    readTime: '18 min',
    description: 'Implement multi-master replication with MySQL Group Replication.',
    tags: ['Group Replication', 'Multi-Master', 'Consensus', 'Paxos'],
    hasFullContent: false
  },
  {
    id: 'advanced-08',
    title: 'MySQL Router',
    slug: 'advanced-08-mysql-router',
    category: 'High Availability',
    level: 'advanced',
    readTime: '12 min',
    description: 'Use MySQL Router for connection routing and load balancing.',
    tags: ['MySQL Router', 'Load Balancing', 'HA', 'Proxy'],
    hasFullContent: false
  },
  {
    id: 'advanced-09',
    title: 'Read-Write Splitting',
    slug: 'advanced-09-read-write-splitting',
    category: 'Scaling',
    level: 'advanced',
    readTime: '15 min',
    description: 'Implement read-write splitting for horizontal scaling.',
    tags: ['Read-Write Splitting', 'Scaling', 'Load Balancing'],
    hasFullContent: false
  },
  {
    id: 'advanced-10',
    title: 'Sharding in MySQL',
    slug: 'advanced-10-sharding-in-mysql',
    category: 'Scaling',
    level: 'advanced',
    readTime: '20 min',
    description: 'Implement database sharding for massive scale applications.',
    tags: ['Sharding', 'Horizontal Partitioning', 'Scaling', 'Distributed'],
    hasFullContent: false
  },
];

// Helper functions
export const getTutorialsByLevel = (level: 'beginner' | 'intermediate' | 'advanced') => {
  return mysqlTutorialsCatalog.filter(t => t.level === level);
};

export const getTutorialsByCategory = (category: string) => {
  return mysqlTutorialsCatalog.filter(t => t.category === category);
};

export const getFullyCompletedTutorials = () => {
  return mysqlTutorialsCatalog.filter(t => t.hasFullContent === true);
};

export const getAllCategories = () => {
  return Array.from(new Set(mysqlTutorialsCatalog.map(t => t.category)));
};

export const getTutorialStats = () => {
  const total = mysqlTutorialsCatalog.length;
  const completed = mysqlTutorialsCatalog.filter(t => t.hasFullContent).length;
  const byLevel = {
    beginner: getTutorialsByLevel('beginner').length,
    intermediate: getTutorialsByLevel('intermediate').length,
    advanced: getTutorialsByLevel('advanced').length,
  };
  
  return {
    total,
    completed,
    pending: total - completed,
    completionPercentage: Math.round((completed / total) * 100),
    byLevel,
  };
};
