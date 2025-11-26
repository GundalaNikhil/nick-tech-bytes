const fs = require('fs');
const path = require('path');

// Template for tutorial markdown files
const generateTemplate = (config) => {
  const {
    title,
    question,
    aim,
    analogy,
    analogyEmoji,
    visualTitle,
    sections,
    codeExample,
    keyTakeaways,
    interviewAnswer,
    nextSteps,
    level = 'beginner'
  } = config;

  return `# ${title}

## 🎯 Question & Objective

**Question:** ${question}

**Aim:** ${aim}

---

## 📚 Simple Explanation (ELI10 - Explain Like I'm 10)

### Real-Life Analogy

${analogy}

---

## 🎨 Visual Representation

<div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(96, 165, 250, 0.15)); border: 1px solid rgba(59, 130, 246, 0.3); padding: 24px; border-radius: 12px; margin: 20px 0;">

### ${visualTitle}

${sections.visual || '<!-- Add visual content here -->'}

</div>

---

## 📋 Key Concepts

<div style="background: rgba(31, 41, 55, 0.5); padding: 24px; border-radius: 12px; margin: 20px 0;">

${sections.concepts || '<!-- Add key concepts here -->'}

</div>

---

## 💻 Code Examples

\`\`\`sql
${codeExample}
\`\`\`

---

## ✅ Key Takeaways

<div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(74, 222, 128, 0.15)); border: 1px solid rgba(34, 197, 94, 0.3); padding: 24px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #22C55E;">

${keyTakeaways.map((item, i) => `${i + 1}. **${item}**`).join('\n')}

</div>

---

## 🎓 Interview Tips

<div style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid #EF4444; padding: 20px; border-radius: 8px; margin: 20px 0;">

### How to Answer in an Interview

**Good Answer:**
> "${interviewAnswer}"

</div>

---

## 📚 Next Steps

${nextSteps.map(step => `- [${step.title}](${step.link})`).join('\n')}

`;
};

// Tutorial configurations
const tutorials = [
  {
    filename: 'beginner-08-foreign-key.md',
    title: 'Foreign Key in MySQL',
    question: 'What is a foreign key?',
    aim: 'Understand foreign keys, their purpose in establishing relationships between tables, and how to implement referential integrity.',
    analogy: 'Think of a library system 📚 where each borrowed book has a **borrower ID** that must match a valid student ID from the students list. You can\'t lend a book to a non-existent student! A **foreign key** is like that borrower ID - it links one table to another and ensures the connection is valid.',
    analogyEmoji: '🔗',
    visualTitle: 'Foreign Key Relationship',
    sections: {
      concepts: `### What is a Foreign Key?

A **foreign key** is a column (or set of columns) in one table that references the **primary key** in another table.

**Purpose:**
- Establish relationships between tables
- Maintain referential integrity
- Prevent orphaned records`,
      visual: ''
    },
    codeExample: `-- Parent table (referenced)
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

-- Child table (referencing)
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    total_amount DECIMAL(10, 2),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Insert data
INSERT INTO customers (name, email) VALUES ('Alice', 'alice@email.com');
INSERT INTO orders (customer_id, order_date, total_amount) 
VALUES (1, '2024-01-15', 150.00);

-- This will fail - customer_id 99 doesn't exist!
INSERT INTO orders (customer_id, order_date, total_amount) 
VALUES (99, '2024-01-15', 200.00);`,
    keyTakeaways: [
      'Foreign Key establishes relationships between tables',
      'References primary key in another table (parent table)',
      'Enforces referential integrity - prevents invalid data',
      'ON DELETE and ON UPDATE define cascade behavior',
      'Can have multiple foreign keys in one table'
    ],
    interviewAnswer: 'A foreign key is a column or set of columns in a child table that references the primary key of a parent table. It establishes and enforces a link between the data in two tables, ensuring referential integrity. Foreign keys prevent orphaned records and maintain data consistency through cascade actions like ON DELETE CASCADE or ON UPDATE CASCADE.',
    nextSteps: [
      { title: 'Primary Key', link: '/mysql-tutorials/beginner-07-primary-key' },
      { title: 'Joins in MySQL', link: '/mysql-tutorials/beginner-16-joins' },
      { title: 'Normalization', link: '/mysql-tutorials/beginner-18-normalization' }
    ]
  },
  {
    filename: 'beginner-09-char-vs-varchar.md',
    title: 'Difference Between CHAR and VARCHAR',
    question: 'What is the difference between CHAR and VARCHAR?',
    aim: 'Understand the differences between CHAR and VARCHAR data types, their storage mechanisms, performance implications, and when to use each.',
    analogy: 'Imagine parking spaces 🚗:\n\n- **CHAR** is like a **reserved parking spot** - always takes the same space (e.g., 10 meters) whether you park a small car or big SUV. Empty space is wasted.\n- **VARCHAR** is like a **flexible parking space** - takes only as much space as your vehicle needs. A small car uses less space, saving room for others!',
    analogyEmoji: '🚗',
    visualTitle: 'CHAR vs VARCHAR Storage',
    sections: {
      concepts: `### Storage Mechanism

**CHAR:**
- Fixed-length storage
- Always uses allocated space
- Pads with spaces if value is shorter

**VARCHAR:**
- Variable-length storage  
- Uses only needed space + 1-2 bytes for length
- No padding`
    },
    codeExample: `-- CHAR example
CREATE TABLE users_char (
    country_code CHAR(2),        -- Always 2 bytes: 'US', 'IN'
    postal_code CHAR(6),         -- Always 6 bytes: '560001'
    status CHAR(1)               -- Always 1 byte: 'A', 'I'
);

-- VARCHAR example
CREATE TABLE users_varchar (
    email VARCHAR(100),          -- Uses actual length + 1-2 bytes
    username VARCHAR(50),
    bio VARCHAR(500)
);

-- Comparison
INSERT INTO users_char VALUES ('US', '123456', 'A');
-- Stores exactly: 'US' (2 bytes) + '123456' (6 bytes) + 'A' (1 byte) = 9 bytes

INSERT INTO users_varchar (email) VALUES ('john@email.com');
-- Stores: 'john@email.com' (14 bytes) + length byte = 15 bytes
-- Not 100 bytes!`,
    keyTakeaways: [
      'CHAR = Fixed length, VARCHAR = Variable length',
      'CHAR faster for fixed-size data (country codes, status flags)',
      'VARCHAR saves space for variable-length data (names, emails)',
      'CHAR pads with spaces, VARCHAR stores actual length',
      'Use CHAR when all values are same length'
    ],
    interviewAnswer: 'CHAR is a fixed-length data type that always uses the allocated space regardless of actual string length, padding with spaces if needed. VARCHAR is variable-length and uses only the space required plus 1-2 bytes for storing length. CHAR is faster for fixed-size data like country codes or status flags, while VARCHAR is better for variable-length data like names or emails as it saves storage space.',
    nextSteps: [
      { title: 'Data Types in MySQL', link: '/mysql-tutorials/05-data-types' },
      { title: 'Storage Engines', link: '/mysql-tutorials/03-storage-engines' },
      { title: 'Indexing', link: '/mysql-tutorials/beginner-20-indexes' }
    ]
  },
  {
    filename: 'beginner-10-delete-vs-truncate.md',
    title: 'DELETE vs TRUNCATE in MySQL',
    question: 'What is the difference between DELETE and TRUNCATE?',
    aim: 'Understand the differences between DELETE and TRUNCATE commands, their performance characteristics, transaction behavior, and appropriate use cases.',
    analogy: 'Imagine clearing a whiteboard 🖊️:\n\n- **DELETE** = Using an eraser to carefully remove specific words or sentences. You can erase just what you want, and you can undo if you make a mistake. Slower but precise.\n- **TRUNCATE** = Wiping the entire board clean in one swift motion. Super fast, but wipes everything and can\'t undo!',
    analogyEmoji: '🗑️',
    visualTitle: 'DELETE vs TRUNCATE Comparison',
    sections: {
      concepts: `### Core Differences

**DELETE:**
- DML (Data Manipulation Language) command
- Can delete specific rows with WHERE clause
- Slower - logs each row deletion
- Can be rolled back
- Triggers are fired
- Doesn't reset AUTO_INCREMENT

**TRUNCATE:**
- DDL (Data Definition Language) command  
- Deletes all rows only
- Very fast - drops and recreates table
- Cannot be rolled back (in most cases)
- Triggers are NOT fired
- Resets AUTO_INCREMENT to 1`
    },
    codeExample: `-- DELETE - Remove specific rows
DELETE FROM employees WHERE department = 'Sales';

-- DELETE - Remove all rows (slow)
DELETE FROM employees;

-- TRUNCATE - Remove all rows (fast)
TRUNCATE TABLE employees;

-- DELETE with WHERE - Flexible
DELETE FROM orders WHERE order_date < '2020-01-01';

-- TRUNCATE - No WHERE clause allowed
TRUNCATE TABLE orders;  -- Removes ALL rows

-- DELETE is transactional
START TRANSACTION;
DELETE FROM products WHERE price < 10;
ROLLBACK;  -- Can undo!

-- TRUNCATE with AUTO_INCREMENT
CREATE TABLE test (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50)
);

INSERT INTO test (name) VALUES ('A'), ('B'), ('C');
DELETE FROM test;  -- id continues: next insert is id=4

INSERT INTO test (name) VALUES ('A'), ('B'), ('C');
TRUNCATE TABLE test;  -- id resets: next insert is id=1`,
    keyTakeaways: [
      'DELETE removes specific rows, TRUNCATE removes all rows',
      'TRUNCATE is much faster than DELETE for large tables',
      'DELETE can be rolled back, TRUNCATE cannot (usually)',
      'TRUNCATE resets AUTO_INCREMENT, DELETE does not',
      'DELETE fires triggers, TRUNCATE does not',
      'Use DELETE for selective removal, TRUNCATE to empty table quickly'
    ],
    interviewAnswer: 'DELETE is a DML command that removes specific rows based on a WHERE clause, logs each deletion, can be rolled back, and fires triggers. TRUNCATE is a DDL command that removes all rows by dropping and recreating the table, is much faster, cannot be rolled back, doesn\'t fire triggers, and resets AUTO_INCREMENT counters. Use DELETE for selective row removal and TRUNCATE to quickly empty an entire table.',
    nextSteps: [
      { title: 'DROP vs TRUNCATE', link: '/mysql-tutorials/beginner-11-drop-vs-truncate' },
      { title: 'Transactions in MySQL', link: '/mysql-tutorials/intermediate-acid' },
      { title: 'Triggers', link: '/mysql-tutorials/beginner-14-triggers' }
    ]
  }
];

// Generate files
const outputDir = path.join(__dirname, '../lib/markdown/mysql');

tutorials.forEach(config => {
  const content = generateTemplate(config);
  const filePath = path.join(outputDir, config.filename);
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Created: ${config.filename}`);
});

console.log(`\n🎉 Generated ${tutorials.length} tutorial files!`);
