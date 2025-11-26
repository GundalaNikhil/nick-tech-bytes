import {
  mysqlTutorialsCatalog,
  type MySQLTutorial as CatalogTutorial,
} from "./mysqlTutorialsCatalog";

export interface MySQLTutorial {
  id: number;
  title: string;
  slug: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  category:
    | "fundamentals"
    | "queries"
    | "optimization"
    | "architecture"
    | "practice";
  readTime: string;
  tags: string[];
}

// Map catalog tutorials to the format expected by the page
const mapCatalogToTutorial = (
  catalogTutorial: CatalogTutorial
): MySQLTutorial => {
  return {
    id: parseInt(catalogTutorial.id.replace(/\D/g, "")),
    title: catalogTutorial.title,
    slug: catalogTutorial.slug,
    description: catalogTutorial.description,
    difficulty: catalogTutorial.level,
    category: catalogTutorial.category as any,
    readTime: catalogTutorial.readTime,
    tags: catalogTutorial.tags,
  };
};

// Export all tutorials from the catalog
export const mysqlTutorials: MySQLTutorial[] =
  mysqlTutorialsCatalog.map(mapCatalogToTutorial);

// Legacy tutorials (kept for reference, but catalog is the source of truth)
export const legacyMysqlTutorials: MySQLTutorial[] = [
  // BEGINNER LEVEL - Fundamentals
  {
    id: 1,
    title: "What is MySQL and Why is it Popular?",
    slug: "01-what-is-mysql",
    description:
      "Introduction to MySQL, its architecture, and why it's the world's most popular open-source database.",
    difficulty: "beginner",
    category: "fundamentals",
    readTime: "8 min",
    tags: ["mysql", "introduction", "rdbms", "database"],
  },
  {
    id: 2,
    title: "SQL vs MySQL - Understanding the Difference",
    slug: "02-sql-vs-mysql",
    description:
      "Learn the key differences between SQL (the language) and MySQL (the database system).",
    difficulty: "beginner",
    category: "fundamentals",
    readTime: "10 min",
    tags: ["sql", "mysql", "comparison", "basics"],
  },
  {
    id: 3,
    title: "Storage Engines: MyISAM vs InnoDB",
    slug: "03-storage-engines",
    description:
      "Compare MySQL storage engines and understand why InnoDB is the default choice.",
    difficulty: "beginner",
    category: "fundamentals",
    readTime: "12 min",
    tags: ["innodb", "myisam", "storage-engines", "performance"],
  },
  {
    id: 4,
    title: "ACID Properties in MySQL",
    slug: "04-acid-properties",
    description:
      "Master Atomicity, Consistency, Isolation, and Durability with practical examples.",
    difficulty: "beginner",
    category: "fundamentals",
    readTime: "10 min",
    tags: ["acid", "transactions", "consistency", "isolation"],
  },
  {
    id: 5,
    title: "Data Types in MySQL",
    slug: "05-data-types",
    description:
      "Complete guide to MySQL data types: CHAR vs VARCHAR, INT, DATETIME, JSON, and more.",
    difficulty: "beginner",
    category: "fundamentals",
    readTime: "15 min",
    tags: ["data-types", "varchar", "datetime", "json"],
  },
  {
    id: 6,
    title: "Primary Keys and Foreign Keys",
    slug: "06-primary-foreign-keys",
    description:
      "Understanding keys, constraints, and referential integrity in MySQL.",
    difficulty: "beginner",
    category: "fundamentals",
    readTime: "12 min",
    tags: ["primary-key", "foreign-key", "constraints", "relationships"],
  },
  {
    id: 7,
    title: "DELETE vs TRUNCATE vs DROP",
    slug: "07-delete-truncate-drop",
    description:
      "Learn when to use DELETE, TRUNCATE, or DROP with performance implications.",
    difficulty: "beginner",
    category: "queries",
    readTime: "8 min",
    tags: ["delete", "truncate", "drop", "dml"],
  },
  {
    id: 8,
    title: "Working with Views",
    slug: "08-views",
    description: "Create and manage views for data abstraction and security.",
    difficulty: "beginner",
    category: "queries",
    readTime: "10 min",
    tags: ["views", "virtual-tables", "security"],
  },
  {
    id: 9,
    title: "Stored Procedures",
    slug: "09-stored-procedures",
    description: "Write reusable stored procedures with parameters and logic.",
    difficulty: "beginner",
    category: "queries",
    readTime: "14 min",
    tags: ["stored-procedures", "functions", "pl-sql"],
  },
  {
    id: 10,
    title: "Database Triggers",
    slug: "10-triggers",
    description: "Automate actions with BEFORE and AFTER triggers.",
    difficulty: "beginner",
    category: "queries",
    readTime: "12 min",
    tags: ["triggers", "automation", "events"],
  },
  {
    id: 11,
    title: "WHERE vs HAVING Clause",
    slug: "11-where-vs-having",
    description: "Understanding when to use WHERE vs HAVING in your queries.",
    difficulty: "beginner",
    category: "queries",
    readTime: "8 min",
    tags: ["where", "having", "filtering", "grouping"],
  },
  {
    id: 12,
    title: "MySQL Joins Explained",
    slug: "12-joins",
    description:
      "Master INNER, LEFT, RIGHT, FULL, and CROSS joins with visual examples.",
    difficulty: "beginner",
    category: "queries",
    readTime: "16 min",
    tags: ["joins", "inner-join", "left-join", "relationships"],
  },
  {
    id: 13,
    title: "Database Normalization",
    slug: "13-normalization",
    description: "Learn 1NF, 2NF, 3NF, BCNF and when to denormalize.",
    difficulty: "beginner",
    category: "fundamentals",
    readTime: "18 min",
    tags: ["normalization", "1nf", "2nf", "3nf", "bcnf"],
  },
  {
    id: 14,
    title: "Indexes in MySQL",
    slug: "14-indexes",
    description:
      "Complete guide to indexes: types, creation, and when to use them.",
    difficulty: "beginner",
    category: "optimization",
    readTime: "15 min",
    tags: ["indexes", "b-tree", "performance", "optimization"],
  },
  {
    id: 15,
    title: "Understanding EXPLAIN",
    slug: "15-explain-statement",
    description: "Use EXPLAIN to analyze and optimize query performance.",
    difficulty: "intermediate",
    category: "optimization",
    readTime: "12 min",
    tags: ["explain", "query-plan", "optimization"],
  },

  // INTERMEDIATE LEVEL
  {
    id: 26,
    title: "Finding and Removing Duplicates",
    slug: "26-find-duplicates",
    description:
      "Techniques to find duplicate records and delete them efficiently.",
    difficulty: "intermediate",
    category: "queries",
    readTime: "12 min",
    tags: ["duplicates", "group-by", "having", "cleanup"],
  },
  {
    id: 27,
    title: "Nth Highest Salary Queries",
    slug: "27-nth-highest-salary",
    description: "Multiple approaches to find 2nd, 3rd, or Nth highest values.",
    difficulty: "intermediate",
    category: "queries",
    readTime: "14 min",
    tags: ["ranking", "subqueries", "window-functions"],
  },
  {
    id: 28,
    title: "UNION vs UNION ALL",
    slug: "28-union-operations",
    description:
      "Combining result sets with UNION and understanding performance.",
    difficulty: "intermediate",
    category: "queries",
    readTime: "10 min",
    tags: ["union", "union-all", "set-operations"],
  },
  {
    id: 29,
    title: "Window Functions Mastery",
    slug: "29-window-functions",
    description: "RANK, DENSE_RANK, ROW_NUMBER, LEAD, LAG, and running totals.",
    difficulty: "intermediate",
    category: "queries",
    readTime: "20 min",
    tags: ["window-functions", "analytics", "ranking"],
  },
  {
    id: 30,
    title: "Common Table Expressions (CTEs)",
    slug: "30-cte-common-table-expressions",
    description: "Write cleaner queries with CTEs and recursive queries.",
    difficulty: "intermediate",
    category: "queries",
    readTime: "16 min",
    tags: ["cte", "with-clause", "recursive", "hierarchy"],
  },

  // ADVANCED LEVEL
  {
    id: 41,
    title: "InnoDB Buffer Pool Deep Dive",
    slug: "41-innodb-buffer-pool",
    description: "Understanding InnoDB buffer pool architecture and tuning.",
    difficulty: "advanced",
    category: "architecture",
    readTime: "18 min",
    tags: ["innodb", "buffer-pool", "memory", "performance"],
  },
  {
    id: 45,
    title: "MySQL Replication",
    slug: "45-replication",
    description: "Master-Slave, GTID-based, and semi-synchronous replication.",
    difficulty: "advanced",
    category: "architecture",
    readTime: "22 min",
    tags: ["replication", "gtid", "high-availability"],
  },
  {
    id: 49,
    title: "Table Partitioning Strategies",
    slug: "49-partitioning",
    description: "RANGE, LIST, HASH, and KEY partitioning for large tables.",
    difficulty: "advanced",
    category: "optimization",
    readTime: "20 min",
    tags: ["partitioning", "scaling", "performance"],
  },
  {
    id: 52,
    title: "Deadlock Detection and Resolution",
    slug: "52-deadlock-detection",
    description: "Understanding, detecting, and preventing deadlocks.",
    difficulty: "advanced",
    category: "optimization",
    readTime: "16 min",
    tags: ["deadlock", "locking", "concurrency"],
  },

  // PRACTICE LEVEL
  {
    id: 66,
    title: "Nth Highest Value - Practice",
    slug: "66-nth-highest-value",
    description:
      "Hands-on practice: Find Nth highest salary with multiple solutions.",
    difficulty: "intermediate",
    category: "practice",
    readTime: "25 min",
    tags: ["practice", "coding", "ranking", "subqueries"],
  },
  {
    id: 71,
    title: "Login Streaks Analysis",
    slug: "71-login-streaks",
    description: "Advanced: Calculate continuous login streaks for users.",
    difficulty: "advanced",
    category: "practice",
    readTime: "30 min",
    tags: ["practice", "window-functions", "analytics"],
  },
  {
    id: 76,
    title: "E-Commerce Schema Design",
    slug: "76-ecommerce-schema",
    description: "Production-level schema design for e-commerce platforms.",
    difficulty: "advanced",
    category: "practice",
    readTime: "35 min",
    tags: ["schema-design", "production", "relationships"],
  },
];

export const getMySQLTutorialBySlug = (
  slug: string
): MySQLTutorial | undefined => {
  return mysqlTutorials.find((tutorial) => tutorial.slug === slug);
};

export const getMySQLTutorialsByDifficulty = (
  difficulty: MySQLTutorial["difficulty"]
): MySQLTutorial[] => {
  return mysqlTutorials.filter(
    (tutorial) => tutorial.difficulty === difficulty
  );
};

export const getMySQLTutorialsByCategory = (
  category: MySQLTutorial["category"]
): MySQLTutorial[] => {
  return mysqlTutorials.filter((tutorial) => tutorial.category === category);
};
