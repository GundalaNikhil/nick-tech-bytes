# Foreign Key in MySQL

## 🎯 Question & Objective

**Question:** What is a foreign key?

**Aim:** Understand foreign keys, their purpose in establishing relationships between tables, and how to implement referential integrity.

---

## 📚 Simple Explanation (ELI10 - Explain Like I'm 10)

### Real-Life Analogy

Think of a library system 📚 where each borrowed book has a **borrower ID** that must match a valid student ID from the students list. You can't lend a book to a non-existent student! A **foreign key** is like that borrower ID - it links one table to another and ensures the connection is valid.

---

## 🎨 Visual Representation

<div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(96, 165, 250, 0.15)); border: 1px solid rgba(59, 130, 246, 0.3); padding: 24px; border-radius: 12px; margin: 20px 0;">

### Foreign Key Relationship

<!-- Add visual content here -->

</div>

---

## 📋 Key Concepts

<div style="background: rgba(31, 41, 55, 0.5); padding: 24px; border-radius: 12px; margin: 20px 0;">

### What is a Foreign Key?

A **foreign key** is a column (or set of columns) in one table that references the **primary key** in another table.

**Purpose:**
- Establish relationships between tables
- Maintain referential integrity
- Prevent orphaned records

</div>

---

## 💻 Code Examples

```sql
-- Parent table (referenced)
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
VALUES (99, '2024-01-15', 200.00);
```

---

## ✅ Key Takeaways

<div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(74, 222, 128, 0.15)); border: 1px solid rgba(34, 197, 94, 0.3); padding: 24px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #22C55E;">

1. **Foreign Key establishes relationships between tables**
2. **References primary key in another table (parent table)**
3. **Enforces referential integrity - prevents invalid data**
4. **ON DELETE and ON UPDATE define cascade behavior**
5. **Can have multiple foreign keys in one table**

</div>

---

## 🎓 Interview Tips

<div style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid #EF4444; padding: 20px; border-radius: 8px; margin: 20px 0;">

### How to Answer in an Interview

**Good Answer:**
> "A foreign key is a column or set of columns in a child table that references the primary key of a parent table. It establishes and enforces a link between the data in two tables, ensuring referential integrity. Foreign keys prevent orphaned records and maintain data consistency through cascade actions like ON DELETE CASCADE or ON UPDATE CASCADE."

</div>

---

## 📚 Next Steps

- [Primary Key](/mysql-tutorials/beginner-07-primary-key)
- [Joins in MySQL](/mysql-tutorials/beginner-16-joins)
- [Normalization](/mysql-tutorials/beginner-18-normalization)

