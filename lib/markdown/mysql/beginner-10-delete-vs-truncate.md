# DELETE vs TRUNCATE in MySQL

## 🎯 Question & Objective

**Question:** What is the difference between DELETE and TRUNCATE?

**Aim:** Understand the differences between DELETE and TRUNCATE commands, their performance characteristics, transaction behavior, and appropriate use cases.

---

## 📚 Simple Explanation (ELI10 - Explain Like I'm 10)

### Real-Life Analogy

Imagine clearing a whiteboard 🖊️:

- **DELETE** = Using an eraser to carefully remove specific words or sentences. You can erase just what you want, and you can undo if you make a mistake. Slower but precise.
- **TRUNCATE** = Wiping the entire board clean in one swift motion. Super fast, but wipes everything and can't undo!

---

## 🎨 Visual Representation

<div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(96, 165, 250, 0.15)); border: 1px solid rgba(59, 130, 246, 0.3); padding: 24px; border-radius: 12px; margin: 20px 0;">

### DELETE vs TRUNCATE Comparison

<!-- Add visual content here -->

</div>

---

## 📋 Key Concepts

<div style="background: rgba(31, 41, 55, 0.5); padding: 24px; border-radius: 12px; margin: 20px 0;">

### Core Differences

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
- Resets AUTO_INCREMENT to 1

</div>

---

## 💻 Code Examples

```sql
-- DELETE - Remove specific rows
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
TRUNCATE TABLE test;  -- id resets: next insert is id=1
```

---

## ✅ Key Takeaways

<div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(74, 222, 128, 0.15)); border: 1px solid rgba(34, 197, 94, 0.3); padding: 24px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #22C55E;">

1. **DELETE removes specific rows, TRUNCATE removes all rows**
2. **TRUNCATE is much faster than DELETE for large tables**
3. **DELETE can be rolled back, TRUNCATE cannot (usually)**
4. **TRUNCATE resets AUTO_INCREMENT, DELETE does not**
5. **DELETE fires triggers, TRUNCATE does not**
6. **Use DELETE for selective removal, TRUNCATE to empty table quickly**

</div>

---

## 🎓 Interview Tips

<div style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid #EF4444; padding: 20px; border-radius: 8px; margin: 20px 0;">

### How to Answer in an Interview

**Good Answer:**
> "DELETE is a DML command that removes specific rows based on a WHERE clause, logs each deletion, can be rolled back, and fires triggers. TRUNCATE is a DDL command that removes all rows by dropping and recreating the table, is much faster, cannot be rolled back, doesn't fire triggers, and resets AUTO_INCREMENT counters. Use DELETE for selective row removal and TRUNCATE to quickly empty an entire table."

</div>

---

## 📚 Next Steps

- [DROP vs TRUNCATE](/mysql-tutorials/beginner-11-drop-vs-truncate)
- [Transactions in MySQL](/mysql-tutorials/intermediate-acid)
- [Triggers](/mysql-tutorials/beginner-14-triggers)

