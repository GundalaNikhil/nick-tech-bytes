const fs = require('fs');
const path = require('path');

// Comprehensive tutorial data
const allTutorials = {
  beginner: [
    {
      id: 11,
      title: 'DROP vs TRUNCATE in MySQL',
      question: 'What is the difference between DROP and TRUNCATE?',
      shortAnswer: 'DROP removes the entire table structure and data permanently, while TRUNCATE only removes all data but keeps the table structure intact.'
    },
    {
      id: 12,
      title: 'Views in MySQL',
      question: 'What is a view in MySQL?',
      shortAnswer: 'A view is a virtual table based on a SQL query result set. It provides a way to simplify complex queries and enhance security.'
    },
    {
      id: 13,
      title: 'Stored Procedures in MySQL',
      question: 'What is a stored procedure?',
      shortAnswer: 'A stored procedure is a prepared SQL code that you can save and reuse. It improves performance and reduces code duplication.'
    },
    {
      id: 14,
      title: 'Triggers in MySQL',
      question: 'What is a trigger?',
      shortAnswer: 'A trigger is a database object that automatically executes in response to INSERT, UPDATE, or DELETE events on a table.'
    },
    {
      id: 15,
      title: 'WHERE vs HAVING Clause',
      question: 'What is the difference between WHERE and HAVING clause?',
      shortAnswer: 'WHERE filters rows before grouping, HAVING filters groups after GROUP BY aggregation.'
    },
    {
      id: 16,
      title: 'SQL Joins Explained',
      question: 'Explain INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL JOIN',
      shortAnswer: 'Joins combine rows from two or more tables based on related columns. Different join types return different result sets.'
    },
    {
      id: 17,
      title: 'Self Join in MySQL',
      question: 'What is a self-join?',
      shortAnswer: 'A self-join is joining a table to itself to compare rows within the same table, commonly used for hierarchical data.'
    },
    {
      id: 18,
      title: 'Normalization in Databases',
      question: 'What is normalization? Explain 1NF, 2NF, 3NF, BCNF',
      shortAnswer: 'Normalization is organizing data to reduce redundancy. It involves dividing tables and establishing relationships through normal forms.'
    },
    {
      id: 19,
      title: 'Denormalization in Databases',
      question: 'What is denormalization?',
      shortAnswer: 'Denormalization is intentionally introducing redundancy to improve query performance by reducing joins.'
    },
    {
      id: 20,
      title: 'Indexes in MySQL',
      question: 'What is an index? Types of indexes in MySQL',
      shortAnswer: 'An index is a data structure that improves query speed. Types include Primary, Unique, Full-text, Composite, and Spatial indexes.'
    },
    {
      id: 21,
      title: 'Clustered vs Non-Clustered Index',
      question: 'Difference between clustered and non-clustered index',
      shortAnswer: 'Clustered index determines physical order of data (one per table). Non-clustered index is separate with pointers to data (multiple allowed).'
    },
    {
      id: 22,
      title: 'Composite Index',
      question: 'What is a composite index?',
      shortAnswer: 'A composite index is an index on two or more columns, useful for queries filtering on multiple columns.'
    },
    {
      id: 23,
      title: 'Covering Index',
      question: 'What is a covering index?',
      shortAnswer: 'A covering index contains all columns needed by a query, eliminating the need to access the actual table data.'
    },
    {
      id: 24,
      title: 'When to Avoid Indexes',
      question: 'When should you avoid using indexes?',
      shortAnswer: 'Avoid indexes on small tables, columns with frequent updates, low cardinality columns, or when write performance is critical.'
    },
    {
      id: 25,
      title: 'EXPLAIN Statement',
      question: 'What is the EXPLAIN statement used for?',
      shortAnswer: 'EXPLAIN shows how MySQL executes a query, helping identify performance issues and optimize query execution plans.'
    }
  ],
  intermediate: [
    {
      id: 1,
      title: 'Find Duplicate Records',
      question: 'How do you find duplicate records in a table?',
      shortAnswer: 'Use GROUP BY with HAVING COUNT(*) > 1 to identify duplicate records based on specific columns.',
      codeTemplate: true
    },
    {
      id: 2,
      title: 'Delete Duplicate Rows',
      question: 'How to delete duplicate rows but keep one?',
      shortAnswer: 'Use ROW_NUMBER() window function or self-join with DELETE to remove duplicates while keeping one record.',
      codeTemplate: true
    },
    {
      id: 3,
      title: 'Second Highest Salary',
      question: 'Write a query to get the 2nd highest salary from Employee table',
      shortAnswer: 'Use LIMIT with OFFSET, or use subquery with MAX to find second highest value.',
      codeTemplate: true
    },
    {
      id: 4,
      title: 'Nth Highest Salary',
      question: 'Write a query to get the nth highest salary',
      shortAnswer: 'Use DENSE_RANK() or LIMIT with OFFSET (n-1) to find the nth highest value.',
      codeTemplate: true
    },
    {
      id: 5,
      title: 'UNION vs UNION ALL',
      question: 'Difference between UNION and UNION ALL',
      shortAnswer: 'UNION removes duplicates and is slower. UNION ALL keeps all rows including duplicates and is faster.'
    },
    {
      id: 6,
      title: 'Window Functions - RANK, DENSE_RANK, ROW_NUMBER',
      question: 'What is the difference between RANK(), DENSE_RANK(), and ROW_NUMBER()?',
      shortAnswer: 'ROW_NUMBER gives unique sequential numbers. RANK skips numbers after ties. DENSE_RANK doesn\'t skip numbers.'
    },
    {
      id: 7,
      title: 'Employees Earning More Than Manager',
      question: 'How to find employees who earn more than their manager?',
      shortAnswer: 'Use self-join to compare employee salary with manager salary from the same table.',
      codeTemplate: true
    },
    {
      id: 8,
      title: 'Window Functions Explained',
      question: 'What are window functions? Give examples',
      shortAnswer: 'Window functions perform calculations across rows related to current row without grouping. Examples: ROW_NUMBER, RANK, LAG, LEAD.'
    },
    {
      id: 9,
      title: 'Pivot Rows to Columns',
      question: 'How to pivot rows to columns in MySQL?',
      shortAnswer: 'Use CASE statements with aggregation or dynamic SQL to transform row values into column headers.',
      codeTemplate: true
    },
    {
      id: 10,
      title: 'Common Table Expressions (CTE)',
      question: 'What is a common table expression (CTE)?',
      shortAnswer: 'CTE is a temporary named result set defined using WITH clause, improving query readability and enabling recursion.'
    },
    {
      id: 11,
      title: 'Recursive CTE',
      question: 'Write a recursive CTE to generate hierarchy',
      shortAnswer: 'Recursive CTE has anchor and recursive member to traverse hierarchical data like org charts or category trees.',
      codeTemplate: true
    },
    {
      id: 12,
      title: 'Handling NULL in Aggregates',
      question: 'How to handle NULL values in aggregate functions?',
      shortAnswer: 'Aggregate functions ignore NULLs except COUNT(*). Use COALESCE or IFNULL to handle NULLs explicitly.'
    },
    {
      id: 13,
      title: 'COALESCE and NULLIF',
      question: 'What is COALESCE() and NULLIF()?',
      shortAnswer: 'COALESCE returns first non-NULL value. NULLIF returns NULL if two expressions are equal, otherwise first expression.'
    },
    {
      id: 14,
      title: 'Full-Text Search Index',
      question: 'How to create a full-text search index?',
      shortAnswer: 'Use FULLTEXT index type for text searching with MATCH() AGAINST() for efficient text search in large columns.',
      codeTemplate: true
    },
    {
      id: 15,
      title: 'DATETIME vs TIMESTAMP',
      question: 'What is the difference between DATETIME and TIMESTAMP?',
      shortAnswer: 'DATETIME stores absolute date-time (1000-9999). TIMESTAMP stores Unix timestamp with timezone conversion and auto-update.'
    },
    {
      id: 16,
      title: 'JSON Data in MySQL 8+',
      question: 'How to store and query JSON data in MySQL 8+?',
      shortAnswer: 'Use JSON data type with JSON functions like JSON_EXTRACT, JSON_SET, and -> operator for querying nested data.',
      codeTemplate: true
    },
    {
      id: 17,
      title: 'Generated Columns',
      question: 'What are generated columns?',
      shortAnswer: 'Generated (computed) columns automatically calculate values from other columns, can be VIRTUAL or STORED.'
    },
    {
      id: 18,
      title: 'Data Encryption in MySQL',
      question: 'How to encrypt data in MySQL?',
      shortAnswer: 'Use AES_ENCRYPT/AES_DECRYPT functions or application-level encryption for sensitive data protection.'
    },
    {
      id: 19,
      title: 'Optimize Slow Queries',
      question: 'How to optimize slow queries?',
      shortAnswer: 'Use EXPLAIN, add indexes, avoid SELECT *, optimize joins, use query cache (deprecated in 8.0), and proper indexing.'
    },
    {
      id: 20,
      title: 'Slow Query Log',
      question: 'What is the slow query log?',
      shortAnswer: 'Slow query log records queries exceeding long_query_time threshold for performance analysis and optimization.'
    }
  ],
  advanced: [
    {
      id: 1,
      title: 'InnoDB Buffer Pool',
      question: 'Explain MySQL InnoDB buffer pool and how it works',
      shortAnswer: 'Buffer pool is InnoDB\'s in-memory cache for data and indexes, using LRU algorithm for performance optimization.'
    },
    {
      id: 2,
      title: 'Redo and Undo Logs',
      question: 'What is redo log and undo log?',
      shortAnswer: 'Redo log ensures durability by recording changes for crash recovery. Undo log supports rollback and MVCC.'
    },
    {
      id: 3,
      title: 'InnoDB Crash Recovery',
      question: 'How does InnoDB handle crash recovery?',
      shortAnswer: 'Uses redo logs to replay committed transactions and undo logs to rollback uncommitted transactions after crash.'
    },
    {
      id: 4,
      title: 'Doublewrite Buffer',
      question: 'What is doublewrite buffer?',
      shortAnswer: 'Safety mechanism that writes pages to doublewrite buffer before writing to data files, preventing partial page writes.'
    },
    {
      id: 5,
      title: 'Binlog vs Redo Log',
      question: 'Difference between binlog and redo log',
      shortAnswer: 'Binlog is server-level logical log for replication. Redo log is InnoDB-level physical log for crash recovery.'
    },
    {
      id: 6,
      title: 'MySQL Replication',
      question: 'How does MySQL replication work? (Master-Slave, GTID)',
      shortAnswer: 'Master writes to binlog, slaves read and apply changes. GTID provides global unique transaction IDs for easier failover.'
    },
    {
      id: 7,
      title: 'Group Replication',
      question: 'What is Group Replication?',
      shortAnswer: 'Plugin for multi-master replication with automatic failover, conflict detection, and distributed recovery.'
    },
    {
      id: 8,
      title: 'MySQL Router',
      question: 'What is MySQL Router?',
      shortAnswer: 'Lightweight middleware for routing database traffic, providing high availability and load balancing.'
    },
    {
      id: 9,
      title: 'Read-Write Splitting',
      question: 'How to set up read-write splitting?',
      shortAnswer: 'Use MySQL Router or ProxySQL to route writes to master and reads to replicas for scaling read traffic.'
    },
    {
      id: 10,
      title: 'Sharding in MySQL',
      question: 'What is sharding? How to implement in MySQL?',
      shortAnswer: 'Horizontal partitioning distributing data across multiple databases. Implement via application logic or tools like Vitess.'
    }
  ]
};

// Template function
const generateFullTutorial = (config) => {
  const { id, title, question, shortAnswer, level = 'beginner', codeTemplate = false } = config;
  
  const levelColors = {
    beginner: { primary: '#3B82F6', secondary: '#60A5FA', gradient: 'rgba(59, 130, 246, 0.15), rgba(96, 165, 250, 0.15)' },
    intermediate: { primary: '#F59E0B', secondary: '#FBBF24', gradient: 'rgba(245, 158, 11, 0.15), rgba(251, 191, 36, 0.15)' },
    advanced: { primary: '#EF4444', secondary: '#F87171', gradient: 'rgba(239, 68, 68, 0.15), rgba(248, 113, 113, 0.15)' }
  };

  const colors = levelColors[level];

  return `# ${title}

## 🎯 Question & Objective

**Question:** ${question}

**Aim:** ${shortAnswer}

---

## 📚 Simple Explanation (ELI10)

### Real-Life Analogy

Think of this concept like... [Add your analogy here]

---

## 🎨 Visual Representation

<div style="background: linear-gradient(135deg, ${colors.gradient}); border: 1px solid ${colors.primary}50; padding: 24px; border-radius: 12px; margin: 20px 0;">

### Concept Visualization

<div style="background: rgba(31, 41, 55, 0.5); padding: 20px; border-radius: 10px; margin: 10px 0;">
  <h4 style="color: ${colors.secondary}; margin-top: 0;">Key Concept</h4>
  <p style="color: #D1D5DB; line-height: 1.8;">
    ${shortAnswer}
  </p>
</div>

</div>

---

## 📋 Key Concepts to Understand

<div style="background: rgba(31, 41, 55, 0.5); padding: 24px; border-radius: 12px; margin: 20px 0;">

### Core Understanding

${codeTemplate ? '1. Problem Statement\n2. Solution Approach\n3. Implementation Steps\n4. Edge Cases' : '1. Definition and Purpose\n2. Use Cases\n3. Best Practices\n4. Common Mistakes'}

</div>

---

## 💻 ${codeTemplate ? 'Code Solution' : 'Practical Examples'}

\`\`\`sql
-- Example code here
-- Add practical SQL examples

SELECT 'Add your code here' AS example;
\`\`\`

${codeTemplate ? `
### Step-by-Step Breakdown

\`\`\`sql
-- Step 1: [Description]
-- Code here

-- Step 2: [Description]  
-- Code here

-- Step 3: [Description]
-- Code here
\`\`\`

### Output

\`\`\`
+-------+-------+
| col1  | col2  |
+-------+-------+
| val1  | val2  |
+-------+-------+
\`\`\`
` : ''}

---

## 🔍 Things to Consider

<div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid #8B5CF6; padding: 20px; border-radius: 8px; margin: 20px 0;">

### Important Points

- ✓ Performance implications
- ✓ Best practices
- ✓ Common pitfalls to avoid
- ✓ When to use this approach
- ✓ Alternatives to consider

</div>

---

## ⚠️ Common Mistakes

<div style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid #EF4444; padding: 20px; border-radius: 8px; margin: 20px 0;">

### What to Avoid

❌ **Don't:** [Common mistake 1]

❌ **Don't:** [Common mistake 2]

✅ **Do:** [Correct approach]

</div>

---

## ✅ Key Takeaways

<div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(74, 222, 128, 0.15)); border: 1px solid rgba(34, 197, 94, 0.3); padding: 24px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #22C55E;">

1. **Main Concept:** ${shortAnswer}
2. **Key Point 2:** [Add key takeaway]
3. **Key Point 3:** [Add key takeaway]
4. **Key Point 4:** [Add key takeaway]
5. **Key Point 5:** [Add key takeaway]

</div>

---

## 🎓 Interview Tips

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3B82F6; padding: 20px; border-radius: 8px; margin: 20px 0;">

### How to Answer in an Interview

**Good Answer:**
> "${shortAnswer}"

**Points to Mention:**
- [Key point 1]
- [Key point 2]
- [Key point 3]

**What NOT to say:**
- ❌ [Common wrong answer]
- ❌ [Incomplete answer]

</div>

---

## 🧪 Practice Exercise

Try solving this yourself:

\`\`\`sql
-- Practice Problem:
-- [Add a related practice problem]
\`\`\`

<details>
<summary>Click to see solution</summary>

\`\`\`sql
-- Solution:
-- [Add solution]
\`\`\`

</details>

---

## 📚 Related Topics

- [Related Topic 1](/mysql-tutorials/related-1)
- [Related Topic 2](/mysql-tutorials/related-2)
- [Related Topic 3](/mysql-tutorials/related-3)

---

## 📖 Further Reading

- MySQL Official Documentation
- Performance Optimization Guide
- Best Practices

`;
};

// Generate all files
const outputDir = path.join(__dirname, '../lib/markdown/mysql');

let totalGenerated = 0;

Object.entries(allTutorials).forEach(([level, tutorials]) => {
  tutorials.forEach(tutorial => {
    const filename = `${level}-${String(tutorial.id).padStart(2, '0')}-${tutorial.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .substring(0, 50)}.md`;
    
    const content = generateFullTutorial({ ...tutorial, level });
    const filePath = path.join(outputDir, filename);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Created: ${filename}`);
    totalGenerated++;
  });
});

console.log(`\n🎉 Generated ${totalGenerated} tutorial files!`);
console.log(`📁 Location: ${outputDir}`);
