# Primary Key in MySQL

## 🎯 Question & Objective

**Question:** What is a primary key?

**Aim:** Understand what a primary key is, why it's essential, how to create one, and its role in database design.

---

## 📚 Simple Explanation (ELI10 - Explain Like I'm 10)

### Real-Life Analogy

Think of your **student ID card** 🎓:

- Every student in your school has a **unique ID number**
- No two students can have the same ID
- You can't attend school without an ID
- Your ID never changes (even if your name or class changes)
- Teachers use your ID to find your records quickly

**A Primary Key is like that student ID - it uniquely identifies each record in a database table!**

---

## 🎨 Visual Representation

<div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(96, 165, 250, 0.15)); border: 1px solid rgba(59, 130, 246, 0.3); padding: 24px; border-radius: 12px; margin: 20px 0;">

### Students Table Example

<table style="width: 100%; border-collapse: separate; border-spacing: 0; border-radius: 12px; overflow: hidden; margin: 20px 0;">
  <thead>
    <tr style="background: linear-gradient(135deg, #0EA5E9, #6366F1);">
      <th style="color: white; padding: 16px; text-align: left;">
        🔑 student_id (PRIMARY KEY)
      </th>
      <th style="color: white; padding: 16px; text-align: left;">name</th>
      <th style="color: white; padding: 16px; text-align: left;">email</th>
      <th style="color: white; padding: 16px; text-align: left;">grade</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background-color: rgba(31, 41, 55, 0.3);">
      <td style="padding: 16px; color: #60A5FA; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        <strong>1</strong> ⭐
      </td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">Alice</td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">alice@school.com</td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">10th</td>
    </tr>
    <tr style="background-color: rgba(17, 24, 39, 0.3);">
      <td style="padding: 16px; color: #60A5FA; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        <strong>2</strong> ⭐
      </td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">Bob</td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">bob@school.com</td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">9th</td>
    </tr>
    <tr style="background-color: rgba(31, 41, 55, 0.3);">
      <td style="padding: 16px; color: #60A5FA; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        <strong>3</strong> ⭐
      </td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">Charlie</td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">charlie@school.com</td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">10th</td>
    </tr>
  </tbody>
</table>

<div style="background: rgba(59, 130, 246, 0.2); padding: 16px; border-radius: 8px; margin-top: 20px;">
  <p style="color: #93C5FD; margin: 0; font-size: 14px;">
    ⭐ <strong>student_id</strong> is the PRIMARY KEY - it's unique, not null, and identifies each student
  </p>
</div>

</div>

---

## 📋 What is a Primary Key?

<div style="background: rgba(31, 41, 55, 0.5); padding: 24px; border-radius: 12px; margin: 20px 0;">

### Definition

**Primary Key** is a column (or combination of columns) that **uniquely identifies** each row in a table.

### Key Characteristics

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin: 20px 0;">
  
  <div style="background: rgba(59, 130, 246, 0.1); padding: 16px; border-radius: 8px; border-left: 4px solid #3B82F6;">
    <strong style="color: #60A5FA;">✓ UNIQUE</strong>
    <p style="color: #D1D5DB; margin: 8px 0 0 0; font-size: 13px;">No two rows can have the same primary key value</p>
  </div>

  <div style="background: rgba(34, 197, 94, 0.1); padding: 16px; border-radius: 8px; border-left: 4px solid #22C55E;">
    <strong style="color: #34D399;">✓ NOT NULL</strong>
    <p style="color: #D1D5DB; margin: 8px 0 0 0; font-size: 13px;">Primary key cannot contain NULL values</p>
  </div>

  <div style="background: rgba(139, 92, 246, 0.1); padding: 16px; border-radius: 8px; border-left: 4px solid #8B5CF6;">
    <strong style="color: #A78BFA;">✓ IMMUTABLE</strong>
    <p style="color: #D1D5DB; margin: 8px 0 0 0; font-size: 13px;">Should never change once assigned</p>
  </div>

  <div style="background: rgba(251, 146, 60, 0.1); padding: 16px; border-radius: 8px; border-left: 4px solid #FB923C;">
    <strong style="color: #FB923C;">✓ ONE PER TABLE</strong>
    <p style="color: #D1D5DB; margin: 8px 0 0 0; font-size: 13px;">A table can have only one primary key</p>
  </div>

  <div style="background: rgba(236, 72, 153, 0.1); padding: 16px; border-radius: 8px; border-left: 4px solid #EC4899;">
    <strong style="color: #F472B6;">✓ INDEXED</strong>
    <p style="color: #D1D5DB; margin: 8px 0 0 0; font-size: 13px;">Automatically creates a clustered index</p>
  </div>

  <div style="background: rgba(20, 184, 166, 0.1); padding: 16px; border-radius: 8px; border-left: 4px solid #14B8A6;">
    <strong style="color: #2DD4BF;">✓ REFERENCED</strong>
    <p style="color: #D1D5DB; margin: 8px 0 0 0; font-size: 13px;">Can be referenced by foreign keys</p>
  </div>

</div>

</div>

---

## 💡 Types of Primary Keys

<div style="background: rgba(59, 130, 246, 0.1); padding: 20px; border-radius: 10px; margin: 20px 0;">

### 1️⃣ Simple Primary Key (Single Column)

<div style="background: rgba(31, 41, 55, 0.5); padding: 16px; border-radius: 8px; margin: 10px 0;">

Most common type - uses one column as the unique identifier.

```sql
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,  -- Simple primary key
    name VARCHAR(100),
    email VARCHAR(100)
);
```

</div>

### 2️⃣ Composite Primary Key (Multiple Columns)

<div style="background: rgba(31, 41, 55, 0.5); padding: 16px; border-radius: 8px; margin: 10px 0;">

Uses combination of two or more columns to uniquely identify a row.

```sql
CREATE TABLE enrollments (
    student_id INT,
    course_id INT,
    enrollment_date DATE,
    PRIMARY KEY (student_id, course_id)  -- Composite primary key
);
```

**Use case:** When no single column can uniquely identify a record.

</div>

### 3️⃣ Auto-Increment Primary Key

<div style="background: rgba(31, 41, 55, 0.5); padding: 16px; border-radius: 8px; margin: 10px 0;">

Automatically generates sequential unique values.

```sql
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,  -- Auto-generated
    name VARCHAR(100),
    price DECIMAL(10, 2)
);
```

**Benefit:** No need to manually assign IDs - MySQL does it automatically!

</div>

</div>

---

## 💻 How to Create Primary Keys

### Method 1: During Table Creation

```sql
-- Single column primary key
CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100)
);

-- Or using CONSTRAINT keyword
CREATE TABLE users (
    id INT,
    username VARCHAR(50),
    email VARCHAR(100),
    PRIMARY KEY (id)
);

-- With auto-increment
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100),
    order_date DATE
);

-- Composite primary key
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);
```

### Method 2: Adding to Existing Table

```sql
-- Add primary key to existing table
ALTER TABLE customers
ADD PRIMARY KEY (customer_id);

-- Add composite primary key
ALTER TABLE student_courses
ADD PRIMARY KEY (student_id, course_id);

-- Add auto-increment primary key
ALTER TABLE products
MODIFY product_id INT AUTO_INCREMENT PRIMARY KEY;
```

### Method 3: Named Constraint

```sql
CREATE TABLE departments (
    dept_id INT,
    dept_name VARCHAR(100),
    CONSTRAINT pk_department PRIMARY KEY (dept_id)
);
```

---

## 🔍 Primary Key vs Unique Key

<table style="width: 100%; border-collapse: separate; border-spacing: 0; border-radius: 12px; overflow: hidden; margin: 20px 0;">
  <thead>
    <tr style="background: linear-gradient(135deg, #0EA5E9, #6366F1);">
      <th style="color: white; padding: 16px; text-align: left;">Aspect</th>
      <th style="color: white; padding: 16px; text-align: left;">Primary Key</th>
      <th style="color: white; padding: 16px; text-align: left;">Unique Key</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background-color: rgba(31, 41, 55, 0.3);">
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        <strong style="color: #F3F4F6;">NULL Values</strong>
      </td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        ❌ NOT allowed
      </td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        ✅ Allowed (one NULL)
      </td>
    </tr>
    <tr style="background-color: rgba(17, 24, 39, 0.3);">
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        <strong style="color: #F3F4F6;">Count per Table</strong>
      </td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        Only ONE
      </td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        Multiple allowed
      </td>
    </tr>
    <tr style="background-color: rgba(31, 41, 55, 0.3);">
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        <strong style="color: #F3F4F6;">Index Type</strong>
      </td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        Clustered Index
      </td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        Non-clustered Index
      </td>
    </tr>
    <tr style="background-color: rgba(17, 24, 39, 0.3);">
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        <strong style="color: #F3F4F6;">Purpose</strong>
      </td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        Uniquely identify rows
      </td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        Prevent duplicate values
      </td>
    </tr>
    <tr style="background-color: rgba(31, 41, 55, 0.3);">
      <td style="padding: 16px; color: #D1D5DB;">
        <strong style="color: #F3F4F6;">Foreign Key Reference</strong>
      </td>
      <td style="padding: 16px; color: #D1D5DB;">
        ✅ Can be referenced
      </td>
      <td style="padding: 16px; color: #D1D5DB;">
        ✅ Can be referenced
      </td>
    </tr>
  </tbody>
</table>

---

## 🎯 Practical Examples

### Example 1: E-commerce System

```sql
-- Products table
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200),
    price DECIMAL(10, 2),
    stock_quantity INT
);

-- Orders table
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2)
);

-- Order Items (composite primary key)
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    unit_price DECIMAL(10, 2),
    PRIMARY KEY (order_id, product_id)
);
```

### Example 2: School Database

```sql
-- Students table
CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    enrollment_date DATE
);

-- Courses table
CREATE TABLE courses (
    course_id VARCHAR(10) PRIMARY KEY,  -- e.g., 'CS101'
    course_name VARCHAR(100),
    credits INT
);

-- Student-Course enrollment (composite key)
CREATE TABLE enrollments (
    student_id INT,
    course_id VARCHAR(10),
    semester VARCHAR(20),
    grade VARCHAR(2),
    PRIMARY KEY (student_id, course_id, semester)
);
```

### Example 3: Checking Primary Keys

```sql
-- View primary key information
SHOW KEYS FROM students WHERE Key_name = 'PRIMARY';

-- Or from INFORMATION_SCHEMA
SELECT 
    COLUMN_NAME,
    CONSTRAINT_NAME,
    ORDINAL_POSITION
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE TABLE_NAME = 'students'
  AND CONSTRAINT_NAME = 'PRIMARY';
```

---

## ⚠️ Common Mistakes to Avoid

<div style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid #EF4444; padding: 20px; border-radius: 8px; margin: 20px 0;">

### ❌ Don't Do This:

```sql
-- Using data that can change as primary key
CREATE TABLE users (
    email VARCHAR(100) PRIMARY KEY,  -- Email can change!
    name VARCHAR(100)
);

-- Not having a primary key at all
CREATE TABLE logs (
    message TEXT,
    created_at TIMESTAMP
);
-- ❌ No way to uniquely identify rows!
```

### ✅ Do This Instead:

```sql
-- Use surrogate key (auto-increment ID)
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,  -- Better!
    email VARCHAR(100) UNIQUE,
    name VARCHAR(100)
);

-- Always have a primary key
CREATE TABLE logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,  -- Good!
    message TEXT,
    created_at TIMESTAMP
);
```

</div>

---

## ✅ Key Takeaways

<div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(74, 222, 128, 0.15)); border: 1px solid rgba(34, 197, 94, 0.3); padding: 24px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #22C55E;">

1. **Primary Key** = Unique identifier for each row in a table
2. **Rules:** UNIQUE + NOT NULL + One per table
3. **Best Practice:** Use auto-increment INT for most tables
4. **Composite Keys:** Used when multiple columns needed for uniqueness
5. **Always have a primary key** - it's fundamental to relational databases
6. **Automatically indexed** for fast lookups

</div>

---

## 🎓 Interview Tips

<div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid #8B5CF6; padding: 20px; border-radius: 8px; margin: 20px 0;">

### How to Answer in an Interview

**Good Answer:**
> "A primary key is a column or set of columns that uniquely identifies each row in a table. It must be UNIQUE and NOT NULL, and each table can have only one primary key. MySQL automatically creates a clustered index on the primary key for fast data retrieval. Primary keys are essential for establishing relationships with other tables through foreign keys."

**Follow-up Points:**
- Mention AUTO_INCREMENT for automatic ID generation
- Explain the difference between simple and composite primary keys
- Discuss why you should always have a primary key
- Know that primary key creates a clustered index in InnoDB

</div>

---

## 📚 Next Steps

- [Foreign Key in MySQL](/mysql-tutorials/beginner-08-foreign-key)
- [Indexes and Types](/mysql-tutorials/beginner-20-indexes)
- [Normalization](/mysql-tutorials/beginner-18-normalization)

