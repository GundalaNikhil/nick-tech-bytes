# Find Duplicate Records - Interview Question

## 🎯 Question & Objective

**Question:** How do you find duplicate records in a table?

**Aim:** Learn multiple approaches to identify duplicate rows in a MySQL table, understand GROUP BY with HAVING, and handle various duplicate detection scenarios.

---

## 📚 Simple Explanation (ELI10)

### Real-Life Analogy

Imagine you're a teacher checking attendance sheets 📋:

- Students accidentally signed the attendance twice
- You need to find which students signed **more than once**
- You count each student's signatures: Alice (1), Bob (2✅), Charlie (1), David (3✅)
- Bob and David are duplicates!

**Finding duplicates in a database is like finding students who signed in multiple times!**

---

## 🎨 Visual Representation

<div style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(251, 191, 36, 0.15)); border: 1px solid #F59E0B50; padding: 24px; border-radius: 12px; margin: 20px 0;">

### Sample Data with Duplicates

<table style="width: 100%; border-collapse: separate; border-spacing: 0; border-radius: 12px; overflow: hidden; margin: 20px 0;">
  <thead>
    <tr style="background: linear-gradient(135deg, #F59E0B, #F97316);">
      <th style="color: white; padding: 16px; text-align: left;">id</th>
      <th style="color: white; padding: 16px; text-align: left;">email</th>
      <th style="color: white; padding: 16px; text-align: left;">name</th>
      <th style="color: white; padding: 16px; text-align: left;">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background-color: rgba(31, 41, 55, 0.3);">
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">1</td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">alice@email.com</td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">Alice</td>
      <td style="padding: 16px; color: #34D399; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">✓ Unique</td>
    </tr>
    <tr style="background-color: rgba(239, 68, 68, 0.2);">
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">2</td>
      <td style="padding: 16px; color: #FCA5A5; border-bottom: 1px solid rgba(75, 85, 99, 0.3);"><strong>bob@email.com</strong></td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">Bob</td>
      <td style="padding: 16px; color: #EF4444; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">⚠️ Duplicate!</td>
    </tr>
    <tr style="background-color: rgba(17, 24, 39, 0.3);">
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">3</td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">charlie@email.com</td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">Charlie</td>
      <td style="padding: 16px; color: #34D399; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">✓ Unique</td>
    </tr>
    <tr style="background-color: rgba(239, 68, 68, 0.2);">
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">4</td>
      <td style="padding: 16px; color: #FCA5A5; border-bottom: 1px solid rgba(75, 85, 99, 0.3);"><strong>bob@email.com</strong></td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">Robert</td>
      <td style="padding: 16px; color: #EF4444; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">⚠️ Duplicate!</td>
    </tr>
    <tr style="background-color: rgba(239, 68, 68, 0.2);">
      <td style="padding: 16px; color: #D1D5DB;">5</td>
      <td style="padding: 16px; color: #FCA5A5;"><strong>david@email.com</strong></td>
      <td style="padding: 16px; color: #D1D5DB;">David</td>
      <td style="padding: 16px; color: #EF4444;">⚠️ Duplicate!</td>
    </tr>
    <tr style="background-color: rgba(239, 68, 68, 0.2);">
      <td style="padding: 16px; color: #D1D5DB;">6</td>
      <td style="padding: 16px; color: #FCA5A5;"><strong>david@email.com</strong></td>
      <td style="padding: 16px; color: #D1D5DB;">Dave</td>
      <td style="padding: 16px; color: #EF4444;">⚠️ Duplicate!</td>
    </tr>
  </tbody>
</table>

<div style="background: rgba(239, 68, 68, 0.2); padding: 16px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #EF4444;">
  <p style="color: #FCA5A5; margin: 0; font-size: 14px;">
    <strong>Duplicates Found:</strong> bob@email.com (2 times), david@email.com (2 times)
  </p>
</div>

</div>

---

## 📋 Problem Scenarios

<div style="background: rgba(31, 41, 55, 0.5); padding: 24px; border-radius: 12px; margin: 20px 0;">

### We'll Cover These Cases:

1. **Find duplicate emails** (single column)
2. **Find duplicates with count** (how many times each appears)
3. **Find ALL duplicate rows** (including the duplicates themselves)
4. **Find duplicates based on multiple columns** (composite duplicates)
5. **Find only the duplicate values** (not the original)

</div>

---

## 💻 Setup: Create Sample Data

```sql
-- Create users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100),
    name VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data with duplicates
INSERT INTO users (email, name) VALUES
('alice@email.com', 'Alice'),
('bob@email.com', 'Bob'),
('charlie@email.com', 'Charlie'),
('bob@email.com', 'Robert'),      -- Duplicate email
('david@email.com', 'David'),
('david@email.com', 'Dave'),       -- Duplicate email
('eve@email.com', 'Eve');

-- View the data
SELECT * FROM users;
```

**Output:**

```
+----+-------------------+---------+
| id | email             | name    |
+----+-------------------+---------+
|  1 | alice@email.com   | Alice   |
|  2 | bob@email.com     | Bob     |
|  3 | charlie@email.com | Charlie |
|  4 | bob@email.com     | Robert  |  ← Duplicate
|  5 | david@email.com   | David   |
|  6 | david@email.com   | Dave    |  ← Duplicate
|  7 | eve@email.com     | Eve     |
+----+-------------------+---------+
```

---

## 🎯 Solution 1: Find Duplicate Values Only

### Goal

Show which email addresses appear more than once.

```sql
SELECT email, COUNT(*) as count
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
```

### Step-by-Step Breakdown

```sql
-- Step 1: Group by email and count
SELECT email, COUNT(*) as count
FROM users
GROUP BY email;
```

**Intermediate Result:**

```
+-------------------+-------+
| email             | count |
+-------------------+-------+
| alice@email.com   |     1 |
| bob@email.com     |     2 | ← Duplicate
| charlie@email.com |     1 |
| david@email.com   |     2 | ← Duplicate
| eve@email.com     |     1 |
+-------------------+-------+
```

```sql
-- Step 2: Filter only counts > 1
SELECT email, COUNT(*) as count
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
```

### Final Output

```
+-----------------+-------+
| email           | count |
+-----------------+-------+
| bob@email.com   |     2 |
| david@email.com |     2 |
+-----------------+-------+
```

✅ **This shows WHICH values are duplicated and HOW MANY times**

---

## 🎯 Solution 2: Get All Duplicate Rows

### Goal

Show ALL rows that have duplicate emails (not just the email itself).

```sql
SELECT *
FROM users
WHERE email IN (
    SELECT email
    FROM users
    GROUP BY email
    HAVING COUNT(*) > 1
);
```

### Step-by-Step Breakdown

```sql
-- Step 1: Find duplicate emails (subquery)
SELECT email
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
-- Result: bob@email.com, david@email.com

-- Step 2: Get all rows with those emails
SELECT *
FROM users
WHERE email IN ('bob@email.com', 'david@email.com');
```

### Output

```
+----+-----------------+---------+
| id | email           | name    |
+----+-----------------+---------+
|  2 | bob@email.com   | Bob     |
|  4 | bob@email.com   | Robert  |
|  5 | david@email.com | David   |
|  6 | david@email.com | Dave    |
+----+-----------------+---------+
```

✅ **This shows ALL rows that are part of a duplicate group**

---

## 🎯 Solution 3: Using JOIN (Alternative)

### Approach

Self-join the table to find duplicates.

```sql
SELECT DISTINCT u1.*
FROM users u1
JOIN users u2
    ON u1.email = u2.email
    AND u1.id != u2.id
ORDER BY u1.email, u1.id;
```

### How It Works

```
For each row in u1, find rows in u2 with:
- Same email
- Different id

This identifies rows that have a "twin" with the same email.
```

### Output

```
+----+-----------------+---------+
| id | email           | name    |
+----+-----------------+---------+
|  2 | bob@email.com   | Bob     |
|  4 | bob@email.com   | Robert  |
|  5 | david@email.com | David   |
|  6 | david@email.com | Dave    |
+----+-----------------+---------+
```

---

## 🎯 Solution 4: Find Duplicates with Details

### Goal

Show duplicate emails with additional statistics.

```sql
SELECT
    email,
    COUNT(*) as duplicate_count,
    GROUP_CONCAT(id ORDER BY id) as duplicate_ids,
    GROUP_CONCAT(name ORDER BY id SEPARATOR ', ') as duplicate_names,
    MIN(created_at) as first_created,
    MAX(created_at) as last_created
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
```

### Output

```
+-----------------+-----------------+----------------+------------------+
| email           | duplicate_count | duplicate_ids  | duplicate_names  |
+-----------------+-----------------+----------------+------------------+
| bob@email.com   |               2 | 2,4            | Bob, Robert      |
| david@email.com |               2 | 5,6            | David, Dave      |
+-----------------+-----------------+----------------+------------------+
```

✅ **This provides comprehensive duplicate analysis**

---

## 🎯 Solution 5: Composite Duplicates (Multiple Columns)

### Goal

Find duplicates based on BOTH email AND name.

```sql
SELECT email, name, COUNT(*) as count
FROM users
GROUP BY email, name
HAVING COUNT(*) > 1;
```

### Example with Composite Data

```sql
-- Insert data with same email + name
INSERT INTO users (email, name) VALUES
('test@email.com', 'John'),
('test@email.com', 'John'),  -- Exact duplicate
('test@email.com', 'Jane');  -- Same email, different name

-- Find exact duplicates
SELECT email, name, COUNT(*) as count
FROM users
GROUP BY email, name
HAVING COUNT(*) > 1;
```

**Output:**

```
+-----------------+------+-------+
| email           | name | count |
+-----------------+------+-------+
| test@email.com  | John |     2 |
+-----------------+------+-------+
```

---

## 🎯 Solution 6: Using Window Functions (MySQL 8+)

### Approach

Use ROW_NUMBER() to identify duplicates.

```sql
SELECT
    id,
    email,
    name,
    ROW_NUMBER() OVER (PARTITION BY email ORDER BY id) as row_num
FROM users;
```

**Output:**

```
+----+-----------------+---------+---------+
| id | email           | name    | row_num |
+----+-----------------+---------+---------+
|  1 | alice@email.com | Alice   |       1 |
|  2 | bob@email.com   | Bob     |       1 |
|  4 | bob@email.com   | Robert  |       2 | ← Duplicate
|  3 | charlie@...     | Charlie |       1 |
|  5 | david@email.com | David   |       1 |
|  6 | david@email.com | Dave    |       2 | ← Duplicate
|  7 | eve@email.com   | Eve     |       1 |
+----+-----------------+---------+---------+
```

```sql
-- Get only duplicates (row_num > 1)
SELECT *
FROM (
    SELECT
        id, email, name,
        ROW_NUMBER() OVER (PARTITION BY email ORDER BY id) as row_num
    FROM users
) ranked
WHERE row_num > 1;
```

---

## 🔍 Performance Comparison

<table style="width: 100%; border-collapse: separate; border-spacing: 0; border-radius: 12px; overflow: hidden; margin: 20px 0;">
  <thead>
    <tr style="background: linear-gradient(135deg, #0EA5E9, #6366F1);">
      <th style="color: white; padding: 16px; text-align: left;">Method</th>
      <th style="color: white; padding: 16px; text-align: left;">Performance</th>
      <th style="color: white; padding: 16px; text-align: left;">Use Case</th>
      <th style="color: white; padding: 16px; text-align: left;">Complexity</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background-color: rgba(31, 41, 55, 0.3);">
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        <strong>GROUP BY + HAVING</strong>
      </td>
      <td style="padding: 16px; color: #34D399; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">Fast ⚡</td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">Most common</td>
      <td style="padding: 16px; color: #34D399; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">Simple</td>
    </tr>
    <tr style="background-color: rgba(17, 24, 39, 0.3);">
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        <strong>Self JOIN</strong>
      </td>
      <td style="padding: 16px; color: #FBBF24; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">Medium 🔶</td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">Get all duplicate rows</td>
      <td style="padding: 16px; color: #FBBF24; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">Medium</td>
    </tr>
    <tr style="background-color: rgba(31, 41, 55, 0.3);">
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        <strong>Window Function</strong>
      </td>
      <td style="padding: 16px; color: #34D399; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">Fast ⚡</td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">MySQL 8+ / Complex logic</td>
      <td style="padding: 16px; color: #EF4444; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">Advanced</td>
    </tr>
    <tr style="background-color: rgba(17, 24, 39, 0.3);">
      <td style="padding: 16px; color: #D1D5DB;">
        <strong>Subquery with IN</strong>
      </td>
      <td style="padding: 16px; color: #EF4444;">Slow 🐌</td>
      <td style="padding: 16px; color: #D1D5DB;">Small datasets</td>
      <td style="padding: 16px; color: #34D399;">Simple</td>
    </tr>
  </tbody>
</table>

---

## ⚠️ Common Mistakes

<div style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid #EF4444; padding: 20px; border-radius: 8px; margin: 20px 0;">

### What to Avoid

❌ **Don't:** Use WHERE instead of HAVING for aggregated conditions

```sql
-- WRONG!
SELECT email, COUNT(*)
FROM users
WHERE COUNT(*) > 1  -- Error: Can't use aggregate in WHERE
GROUP BY email;
```

❌ **Don't:** Forget to specify which column(s) to check

```sql
-- Ambiguous - duplicates based on what?
SELECT * FROM users GROUP BY email;  -- Missing HAVING clause
```

✅ **Do:** Use HAVING for aggregate filtering

```sql
-- CORRECT!
SELECT email, COUNT(*)
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
```

✅ **Do:** Be explicit about duplicate criteria

```sql
-- Clear: Finding email duplicates
SELECT email, COUNT(*) as occurrences
FROM users
GROUP BY email
HAVING COUNT(*) > 1
ORDER BY occurrences DESC;
```

</div>

---

## ✅ Key Takeaways

<div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(74, 222, 128, 0.15)); border: 1px solid rgba(34, 197, 94, 0.3); padding: 24px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #22C55E;">

1. **Use GROUP BY + HAVING** for finding duplicate values (most common method)
2. **Use IN subquery** to get all rows with duplicate values
3. **Use self JOIN** as an alternative approach
4. **Use window functions** for more complex duplicate analysis (MySQL 8+)
5. **Use GROUP_CONCAT** to see all duplicate IDs/values together
6. **Remember:** WHERE filters rows BEFORE grouping, HAVING filters AFTER grouping
7. **Composite duplicates:** Group by multiple columns to find exact duplicates

</div>

---

## 🎓 Interview Tips

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3B82F6; padding: 20px; border-radius: 8px; margin: 20px 0;">

### How to Answer in an Interview

**Good Answer:**

> "To find duplicate records, I'd use GROUP BY with HAVING COUNT(_) > 1. For example: `SELECT email, COUNT(_) FROM users GROUP BY email HAVING COUNT(\*) > 1`. This groups rows by the column we're checking for duplicates and filters to show only groups with more than one occurrence. If I need to see all the duplicate rows themselves, not just the duplicate values, I'd use a subquery or JOIN."

**Points to Mention:**

- GROUP BY groups the rows by the column(s) you specify
- HAVING filters the grouped results (WHERE won't work for aggregates)
- COUNT(\*) counts rows in each group
- Can extend to multiple columns for composite duplicates
- Mention performance: add index on the grouped column(s)

**What NOT to say:**

- ❌ "I'd just look at the table" (not scalable)
- ❌ "Use WHERE COUNT(\*) > 1" (syntax error)
- ❌ Not explaining GROUP BY vs HAVING

**Follow-up Questions You Might Get:**

1. **"How would you delete duplicates?"**
   → Use window functions with DELETE, or keep minimum ID

2. **"What if you need to find duplicates across multiple columns?"**
   → GROUP BY column1, column2 HAVING COUNT(\*) > 1

3. **"How would you optimize this for a large table?"**
   → Add indexes on grouped columns, consider partitioning

4. **"Show all duplicate rows, not just the values"**
   → Use IN with subquery or self JOIN

</div>

---

## 🧪 Practice Exercises

Try solving these yourself:

```sql
-- Exercise 1: Find duplicate phone numbers
-- Table: contacts (id, name, phone, email)

-- Exercise 2: Find users with same first_name AND last_name

-- Exercise 3: Find products with duplicate SKU codes and show all details

-- Exercise 4: Count how many times each duplicate appears

-- Exercise 5: Find emails that appear more than 3 times
```

<details>
<summary>Click to see solutions</summary>

```sql
-- Exercise 1: Find duplicate phone numbers
SELECT phone, COUNT(*) as count
FROM contacts
GROUP BY phone
HAVING COUNT(*) > 1;

-- Exercise 2: Find users with same first_name AND last_name
SELECT first_name, last_name, COUNT(*) as count
FROM users
GROUP BY first_name, last_name
HAVING COUNT(*) > 1;

-- Exercise 3: Find products with duplicate SKU and show all details
SELECT *
FROM products
WHERE sku IN (
    SELECT sku
    FROM products
    GROUP BY sku
    HAVING COUNT(*) > 1
)
ORDER BY sku;

-- Exercise 4: Count how many times each duplicate appears
SELECT
    email,
    COUNT(*) as occurrences,
    GROUP_CONCAT(id ORDER BY id) as all_ids
FROM users
GROUP BY email
HAVING COUNT(*) > 1
ORDER BY occurrences DESC;

-- Exercise 5: Find emails appearing more than 3 times
SELECT email, COUNT(*) as count
FROM users
GROUP BY email
HAVING COUNT(*) > 3;
```

</details>

---

## 💡 Real-World Scenarios

### Scenario 1: Data Quality Check

```sql
-- Find duplicate customer emails before migration
SELECT
    email,
    COUNT(*) as duplicate_count,
    MIN(created_at) as oldest_record,
    MAX(created_at) as newest_record
FROM customers
GROUP BY email
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC;
```

### Scenario 2: Fraud Detection

```sql
-- Find multiple accounts from same IP within 24 hours
SELECT
    ip_address,
    DATE(created_at) as signup_date,
    COUNT(*) as account_count,
    GROUP_CONCAT(user_id) as suspicious_users
FROM user_signups
GROUP BY ip_address, DATE(created_at)
HAVING COUNT(*) > 5
ORDER BY account_count DESC;
```

### Scenario 3: Inventory Check

```sql
-- Find duplicate product entries (same name, brand, size)
SELECT
    product_name,
    brand,
    size,
    COUNT(*) as duplicate_count
FROM products
GROUP BY product_name, brand, size
HAVING COUNT(*) > 1;
```

---

## 📚 Related Topics

- [Delete Duplicate Rows](/mysql-tutorials/intermediate-02-delete-duplicate-rows)
- [Window Functions](/mysql-tutorials/intermediate-08-window-functions-explained)
- [GROUP BY and Aggregations](/mysql-tutorials/beginner-group-by)
- [WHERE vs HAVING](/mysql-tutorials/beginner-15-where-vs-having-clause)

---

## 📖 Further Reading

- [MySQL GROUP BY Documentation](https://dev.mysql.com/doc/refman/8.0/en/group-by-handling.html)
- [MySQL Aggregate Functions](https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html)
- [Window Functions vs GROUP BY](https://dev.mysql.com/doc/refman/8.0/en/window-functions-usage.html)
