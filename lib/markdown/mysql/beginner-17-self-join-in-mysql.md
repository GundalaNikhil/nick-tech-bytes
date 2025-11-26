# Self Join in MySQL

## 🎯 Question & Objective

**Question:** What is a self-join?

**Aim:** A self-join is joining a table to itself to compare rows within the same table, commonly used for hierarchical data.

---

## 📚 Simple Explanation (ELI10)

### Real-Life Analogy

Think of this concept like a **company org chart**. Imagine you work at a company where employees report to managers, and managers are also employees in the same company. The employee directory is ONE list containing everyone - both regular employees AND their managers.

When you want to find "who reports to whom," you're comparing people in the SAME directory. You're asking: "Match each employee with their manager" - but both pieces of information come from the same employee list!

**Real Example:**

- Alice is an employee (Employee ID: 101)
- Alice's manager is Bob (Employee ID: 102)
- Bob is ALSO in the employee list because he's an employee too!

To find Alice's manager's name, you need to look up Bob's details in the SAME employee table. This is exactly what a self-join does - it joins the table to itself to find related information within the same dataset.

---

## 🎨 Visual Representation

<div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(96, 165, 250, 0.15)); border: 1px solid #3B82F650; padding: 24px; border-radius: 12px; margin: 20px 0;">

### Self-Join Visualization

<div style="background: rgba(31, 41, 55, 0.5); padding: 20px; border-radius: 10px; margin: 10px 0;">
  <h4 style="color: #60A5FA; margin-top: 0;">Same Table, Different Roles</h4>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 15px;">
    <div style="background: linear-gradient(135deg, #3B82F6, #2563EB); padding: 15px; border-radius: 8px; text-align: center;">
      <strong style="color: white;">Employees Table (as "e")</strong>
      <div style="background: rgba(255, 255, 255, 0.1); padding: 10px; margin-top: 10px; border-radius: 5px; font-family: monospace; font-size: 0.9em;">
        employee_id | name | manager_id<br/>
        ────────────────────────<br/>
        101 | Alice | 103<br/>
        102 | Bob | 103<br/>
        103 | Carol | NULL
      </div>
    </div>
    <div style="background: linear-gradient(135deg, #8B5CF6, #7C3AED); padding: 15px; border-radius: 8px; text-align: center;">
      <strong style="color: white;">Same Table (as "m")</strong>
      <div style="background: rgba(255, 255, 255, 0.1); padding: 10px; margin-top: 10px; border-radius: 5px; font-family: monospace; font-size: 0.9em;">
        employee_id | name | manager_id<br/>
        ────────────────────────<br/>
        101 | Alice | 103<br/>
        102 | Bob | 103<br/>
        103 | Carol | NULL
      </div>
    </div>
  </div>
  <div style="text-align: center; margin-top: 15px; padding: 15px; background: rgba(34, 197, 94, 0.2); border-radius: 8px;">
    <strong style="color: #4ADE80;">Join Condition:</strong> <code style="color: #FCD34D;">e.manager_id = m.employee_id</code><br/>
    <span style="color: #D1D5DB; font-size: 0.9em;">Connect each employee to their manager using the SAME table</span>
  </div>
</div>

<div style="background: rgba(31, 41, 55, 0.5); padding: 20px; border-radius: 10px; margin: 10px 0;">
  <h4 style="color: #60A5FA; margin-top: 0;">How It Works</h4>
  <p style="color: #D1D5DB; line-height: 1.8;">
    A self-join treats the same physical table as TWO separate logical tables by giving it different aliases. You can then join these "two tables" (which are actually one) using a relationship that exists within the data itself - like employees and their managers.
  </p>
  <div style="margin-top: 15px; padding: 15px; background: rgba(59, 130, 246, 0.2); border-left: 3px solid #3B82F6; border-radius: 5px;">
    <strong style="color: #60A5FA;">Key Point:</strong> <span style="color: #D1D5DB;">The table is physically ONE, but logically treated as TWO during the join operation.</span>
  </div>
</div>

</div>

---

## 📋 Key Concepts to Understand

<div style="background: rgba(31, 41, 55, 0.5); padding: 24px; border-radius: 12px; margin: 20px 0;">

### Core Understanding

1. **Same Table, Different Aliases**

   - Self-join uses the same table twice with different aliases (e.g., `employees e1` and `employees e2`)
   - Aliases are mandatory to distinguish between the two instances
   - Each alias represents a different "role" or "perspective" of the data

2. **Hierarchical Relationships**

   - Most commonly used for parent-child relationships within the same table
   - Examples: employee-manager, category-subcategory, friend-friend
   - One column references another column in the same table (foreign key to primary key)

3. **Join Types Work the Same**

   - You can use INNER JOIN, LEFT JOIN, RIGHT JOIN, etc.
   - INNER JOIN: Only matches where relationship exists
   - LEFT JOIN: Includes all records from left table even without matches (e.g., employees without managers)

4. **Performance Considerations**

   - Self-joins can be resource-intensive on large tables
   - Proper indexing on join columns is crucial
   - Consider using WITH clauses (CTEs) for complex hierarchies

5. **Common Use Cases**
   - Organizational hierarchies (employee-manager)
   - Social networks (user-friend relationships)
   - Product categories (category-parent category)
   - Comparing rows within the same table (finding pairs, duplicates)
   - Time-series data (comparing current vs previous records)

</div>

---

## 💻 Practical Examples

### Example 1: Basic Employee-Manager Relationship

```sql
-- Create employees table
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    manager_id INT,
    department VARCHAR(50)
);

-- Insert sample data
INSERT INTO employees VALUES
(101, 'Alice Johnson', 103, 'Engineering'),
(102, 'Bob Smith', 103, 'Engineering'),
(103, 'Carol Davis', NULL, 'Engineering'),
(104, 'David Brown', 105, 'Sales'),
(105, 'Eve Wilson', NULL, 'Sales'),
(106, 'Frank Miller', 103, 'Engineering');

-- Self-join to find each employee with their manager's name
SELECT
    e.employee_id,
    e.name AS employee_name,
    e.department,
    m.name AS manager_name
FROM employees e
INNER JOIN employees m ON e.manager_id = m.employee_id;
```

**Output:**

```
employee_id | employee_name | department    | manager_name
─────────────────────────────────────────────────────────
101         | Alice Johnson | Engineering   | Carol Davis
102         | Bob Smith     | Engineering   | Carol Davis
104         | David Brown   | Sales         | Eve Wilson
106         | Frank Miller  | Engineering   | Carol Davis
```

**Explanation:** Notice Carol Davis and Eve Wilson don't appear because they have no managers (manager_id is NULL). INNER JOIN only shows matches.

---

### Example 2: Include Top-Level Managers (LEFT JOIN)

```sql
-- Show all employees, including those without managers
SELECT
    e.employee_id,
    e.name AS employee_name,
    COALESCE(m.name, 'No Manager') AS manager_name,
    e.department
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.employee_id
ORDER BY e.employee_id;
```

**Output:**

```
employee_id | employee_name | manager_name   | department
──────────────────────────────────────────────────────────
101         | Alice Johnson | Carol Davis    | Engineering
102         | Bob Smith     | Carol Davis    | Engineering
103         | Carol Davis   | No Manager     | Engineering
104         | David Brown   | Eve Wilson     | Sales
105         | Eve Wilson    | No Manager     | Sales
106         | Frank Miller  | Carol Davis    | Engineering
```

**Explanation:** LEFT JOIN includes all employees from the left table (e), even those without managers. COALESCE replaces NULL with 'No Manager'.

---

### Example 3: Find Manager's Contact Info

```sql
-- Add contact info to the table
ALTER TABLE employees ADD COLUMN email VARCHAR(100);

UPDATE employees SET email = 'alice@company.com' WHERE employee_id = 101;
UPDATE employees SET email = 'bob@company.com' WHERE employee_id = 102;
UPDATE employees SET email = 'carol@company.com' WHERE employee_id = 103;
UPDATE employees SET email = 'david@company.com' WHERE employee_id = 104;
UPDATE employees SET email = 'eve@company.com' WHERE employee_id = 105;
UPDATE employees SET email = 'frank@company.com' WHERE employee_id = 106;

-- Get employee with manager's email
SELECT
    e.name AS employee_name,
    e.email AS employee_email,
    m.name AS manager_name,
    m.email AS manager_email
FROM employees e
INNER JOIN employees m ON e.manager_id = m.employee_id;
```

**Output:**

```
employee_name | employee_email      | manager_name | manager_email
──────────────────────────────────────────────────────────────────
Alice Johnson | alice@company.com   | Carol Davis  | carol@company.com
Bob Smith     | bob@company.com     | Carol Davis  | carol@company.com
David Brown   | david@company.com   | Eve Wilson   | eve@company.com
Frank Miller  | frank@company.com   | Carol Davis  | carol@company.com
```

---

### Example 4: Count Direct Reports per Manager

```sql
-- Find how many direct reports each manager has
SELECT
    m.employee_id,
    m.name AS manager_name,
    COUNT(e.employee_id) AS direct_reports
FROM employees m
LEFT JOIN employees e ON m.employee_id = e.manager_id
GROUP BY m.employee_id, m.name
HAVING COUNT(e.employee_id) > 0
ORDER BY direct_reports DESC;
```

**Output:**

```
employee_id | manager_name | direct_reports
──────────────────────────────────────────
103         | Carol Davis  | 3
105         | Eve Wilson   | 1
```

**Explanation:** This reverses the join - managers on the left, employees on the right. COUNT shows how many employees report to each manager.

---

### Example 5: Find Employees at Same Level (Peers)

```sql
-- Find employees who share the same manager (peers/colleagues)
SELECT
    e1.name AS employee_1,
    e2.name AS employee_2,
    m.name AS common_manager,
    e1.department
FROM employees e1
INNER JOIN employees e2
    ON e1.manager_id = e2.manager_id
    AND e1.employee_id < e2.employee_id  -- Avoid duplicates and self-pairing
INNER JOIN employees m ON e1.manager_id = m.employee_id;
```

**Output:**

```
employee_1    | employee_2   | common_manager | department
────────────────────────────────────────────────────────────
Alice Johnson | Bob Smith    | Carol Davis    | Engineering
Alice Johnson | Frank Miller | Carol Davis    | Engineering
Bob Smith     | Frank Miller | Carol Davis    | Engineering
```

**Explanation:** Uses THREE instances of the same table! `e1` and `e2` are employees, `m` is their manager. Condition `e1.employee_id < e2.employee_id` prevents duplicate pairs.

---

### Example 6: Social Network - Friend Relationships

```sql
-- Create friendships table (bidirectional)
CREATE TABLE friendships (
    user_id INT,
    friend_id INT,
    friendship_date DATE
);

INSERT INTO friendships VALUES
(1, 2, '2024-01-15'),
(2, 1, '2024-01-15'),
(1, 3, '2024-02-10'),
(3, 1, '2024-02-10'),
(2, 3, '2024-03-05'),
(3, 2, '2024-03-05');

CREATE TABLE users (
    user_id INT PRIMARY KEY,
    username VARCHAR(50)
);

INSERT INTO users VALUES
(1, 'alice_tech'),
(2, 'bob_dev'),
(3, 'carol_data');

-- Find mutual friends
SELECT DISTINCT
    u1.username AS user_1,
    u2.username AS user_2,
    u3.username AS mutual_friend
FROM friendships f1
INNER JOIN friendships f2
    ON f1.friend_id = f2.user_id
INNER JOIN friendships f3
    ON f2.friend_id = f3.user_id
INNER JOIN users u1 ON f1.user_id = u1.user_id
INNER JOIN users u2 ON f2.user_id = u2.user_id
INNER JOIN users u3 ON f3.user_id = u3.user_id
WHERE f1.user_id = 1 AND f3.user_id = 1 AND f2.user_id != 1;
```

**Output:**

```
user_1     | user_2   | mutual_friend
──────────────────────────────────────
alice_tech | bob_dev  | carol_data
alice_tech | carol_data | bob_dev
```

---

### Example 7: Category Hierarchy (Multi-Level)

```sql
-- Product categories with parent-child relationship
CREATE TABLE categories (
    category_id INT PRIMARY KEY,
    category_name VARCHAR(100),
    parent_category_id INT
);

INSERT INTO categories VALUES
(1, 'Electronics', NULL),
(2, 'Computers', 1),
(3, 'Laptops', 2),
(4, 'Desktops', 2),
(5, 'Mobile Phones', 1),
(6, 'Smartphones', 5),
(7, 'Feature Phones', 5);

-- Show category with parent
SELECT
    c1.category_name AS category,
    c2.category_name AS parent_category,
    c3.category_name AS grandparent_category
FROM categories c1
LEFT JOIN categories c2 ON c1.parent_category_id = c2.category_id
LEFT JOIN categories c3 ON c2.parent_category_id = c3.category_id;
```

**Output:**

```
category        | parent_category | grandparent_category
────────────────────────────────────────────────────────
Electronics     | NULL            | NULL
Computers       | Electronics     | NULL
Laptops         | Computers       | Electronics
Desktops        | Computers       | Electronics
Mobile Phones   | Electronics     | NULL
Smartphones     | Mobile Phones   | Electronics
Feature Phones  | Mobile Phones   | Electronics
```

---

### Example 8: Find Employees Who Earn More Than Their Manager

```sql
-- Add salary column
ALTER TABLE employees ADD COLUMN salary DECIMAL(10, 2);

UPDATE employees SET salary = 75000 WHERE employee_id = 101;
UPDATE employees SET salary = 80000 WHERE employee_id = 102;
UPDATE employees SET salary = 95000 WHERE employee_id = 103;
UPDATE employees SET salary = 70000 WHERE employee_id = 104;
UPDATE employees SET salary = 90000 WHERE employee_id = 105;
UPDATE employees SET salary = 100000 WHERE employee_id = 106; -- Frank earns more than Carol!

-- Find employees earning more than their manager
SELECT
    e.name AS employee_name,
    e.salary AS employee_salary,
    m.name AS manager_name,
    m.salary AS manager_salary,
    (e.salary - m.salary) AS salary_difference
FROM employees e
INNER JOIN employees m ON e.manager_id = m.employee_id
WHERE e.salary > m.salary;
```

**Output:**

```
employee_name | employee_salary | manager_name | manager_salary | salary_difference
──────────────────────────────────────────────────────────────────────────────────
Frank Miller  | 100000.00       | Carol Davis  | 95000.00       | 5000.00
```

**Explanation:** This is a common interview question! It compares salaries between related rows in the same table.

---

## 🔍 Things to Consider

<div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid #8B5CF6; padding: 20px; border-radius: 8px; margin: 20px 0;">

### Important Points

- ✓ **Always Use Aliases:** Without aliases, MySQL cannot distinguish between the two instances of the same table. Aliases like `e1`, `e2`, or `emp`, `mgr` are mandatory.

- ✓ **Index Join Columns:** Self-joins rely heavily on the columns used in the ON clause. Index `manager_id`, `parent_id`, or similar reference columns for better performance.

- ✓ **Handle NULL Values:** Top-level records (e.g., CEO with no manager) have NULL in the reference column. Use LEFT JOIN or COALESCE to handle these gracefully.

- ✓ **Avoid Circular References:** Ensure your data doesn't have circular hierarchies (A reports to B, B reports to A) which can cause infinite loops or incorrect results.

- ✓ **Performance on Large Tables:** Self-joins can be slow on large tables. Consider:

  - Using appropriate indexes
  - Limiting results with WHERE clauses
  - Using recursive CTEs for deep hierarchies (MySQL 8.0+)

- ✓ **Choose the Right Join Type:**

  - **INNER JOIN:** Only records with matches
  - **LEFT JOIN:** Include all from left, even without matches
  - **RIGHT JOIN:** Rarely used, but includes all from right

- ✓ **Prevent Duplicate Pairs:** When finding relationships between peers, use conditions like `e1.id < e2.id` to avoid duplicates (both A→B and B→A appearing).

- ✓ **Consider Alternatives:**
  - For deep hierarchies: Use recursive CTEs
  - For simple lookups: Use subqueries
  - For frequent queries: Consider denormalized summary tables

</div>

---

## ⚠️ Common Mistakes

<div style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid #EF4444; padding: 20px; border-radius: 8px; margin: 20px 0;">

### What to Avoid

❌ **Don't:** Forget to use table aliases

```sql
-- WRONG - This will cause an error
SELECT name, manager_id
FROM employees
JOIN employees ON manager_id = employee_id;
-- Error: Column 'name' is ambiguous
```

✅ **Do:** Always use aliases to distinguish instances

```sql
-- CORRECT
SELECT e.name, m.name AS manager_name
FROM employees e
JOIN employees m ON e.manager_id = m.employee_id;
```

---

❌ **Don't:** Use INNER JOIN when you need all records

```sql
-- WRONG - Excludes top-level managers
SELECT e.name, m.name AS manager
FROM employees e
INNER JOIN employees m ON e.manager_id = m.employee_id;
-- CEO won't appear in results!
```

✅ **Do:** Use LEFT JOIN to include records without matches

```sql
-- CORRECT - Includes everyone
SELECT e.name, COALESCE(m.name, 'Top Level') AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.employee_id;
```

---

❌ **Don't:** Forget to prevent duplicate pairs

```sql
-- WRONG - Shows both Alice→Bob and Bob→Alice
SELECT e1.name, e2.name
FROM employees e1
JOIN employees e2 ON e1.manager_id = e2.manager_id;
```

✅ **Do:** Use a condition to avoid duplicates

```sql
-- CORRECT - Only unique pairs
SELECT e1.name, e2.name
FROM employees e1
JOIN employees e2
    ON e1.manager_id = e2.manager_id
    AND e1.employee_id < e2.employee_id;
```

---

❌ **Don't:** Join without proper indexes on large tables

```sql
-- SLOW on large tables
SELECT e.name, m.name
FROM employees e
JOIN employees m ON e.manager_id = m.employee_id;
-- Can be very slow if manager_id isn't indexed
```

✅ **Do:** Create indexes on join columns

```sql
-- CORRECT - Create index first
CREATE INDEX idx_manager_id ON employees(manager_id);

SELECT e.name, m.name
FROM employees e
JOIN employees m ON e.manager_id = m.employee_id;
-- Much faster with index
```

---

❌ **Don't:** Select the same column name from both instances without aliasing

```sql
-- CONFUSING - Which 'name' is which?
SELECT e.name, m.name
FROM employees e
JOIN employees m ON e.manager_id = m.employee_id;
-- Both columns will be labeled 'name' in result
```

✅ **Do:** Use clear column aliases

```sql
-- CLEAR
SELECT
    e.name AS employee_name,
    m.name AS manager_name
FROM employees e
JOIN employees m ON e.manager_id = m.employee_id;
```

</div>

---

## ✅ Key Takeaways

<div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(74, 222, 128, 0.15)); border: 1px solid rgba(34, 197, 94, 0.3); padding: 24px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #22C55E;">

1. **Main Concept:** A self-join joins a table to itself to compare or relate rows within the same table, commonly used for hierarchical data like employee-manager relationships.

2. **Aliases Are Mandatory:** You must use different aliases (e.g., `e` and `m`) to distinguish between the two instances of the same table in the query.

3. **Same Join Types Apply:** You can use INNER JOIN (only matches), LEFT JOIN (all from left), or RIGHT JOIN depending on your needs - just like regular joins.

4. **Perfect for Hierarchies:** Self-joins excel at representing parent-child, manager-employee, category-subcategory, and other hierarchical relationships stored in a single table.

5. **Performance Matters:** Always index the columns used in the join condition (like `manager_id`) to maintain good performance, especially on large tables.

6. **Handle NULLs Properly:** Use LEFT JOIN with COALESCE to include top-level records (like CEOs who have no manager) and provide meaningful default values.

7. **Prevent Duplicates:** When finding peer relationships, use conditions like `e1.id < e2.id` to avoid showing the same pair twice (A→B and B→A).

8. **Consider Alternatives:** For very deep hierarchies (more than 2-3 levels), recursive CTEs (Common Table Expressions) may be more efficient than multiple self-joins.

</div>

---

## 🎓 Interview Tips

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3B82F6; padding: 20px; border-radius: 8px; margin: 20px 0;">

### How to Answer in an Interview

**Good Answer:**

> "A self-join is a technique where we join a table to itself by treating it as two separate logical tables using different aliases. It's commonly used to query hierarchical or relational data stored within a single table, such as employee-manager relationships, product categories, or social network connections. For example, to find each employee's manager name, we'd join the employees table to itself, matching each employee's manager_id to another employee's employee_id."

**Points to Mention:**

- Self-joins require aliases to distinguish between the two instances of the same table
- They're particularly useful for hierarchical data (parent-child relationships)
- You can use any join type (INNER, LEFT, RIGHT) depending on your requirements
- Common use case: Finding relationships within the same dataset
- Performance consideration: Index the join columns for better performance

**What NOT to say:**

- ❌ "Self-join creates a copy of the table" (No, it's the same physical table referenced twice)
- ❌ "You can only use INNER JOIN for self-joins" (Any join type works)
- ❌ "Self-join always returns duplicate data" (Only if not filtered properly)

### Follow-Up Questions You Might Get:

**Q1: When would you use LEFT JOIN vs INNER JOIN in a self-join?**

**A:** Use LEFT JOIN when you want to include records that don't have a match in the self-reference. For example, in an employee-manager scenario, a LEFT JOIN would include top-level managers (CEO) who don't have a manager themselves (manager_id is NULL). Use INNER JOIN when you only want records that have a valid relationship, excluding orphaned records.

**Q2: How would you find employees who earn more than their managers using a self-join?**

**A:**

```sql
SELECT e.name AS employee, e.salary, m.name AS manager, m.salary AS manager_salary
FROM employees e
INNER JOIN employees m ON e.manager_id = m.employee_id
WHERE e.salary > m.salary;
```

This joins employees to their managers and filters for cases where employee salary exceeds manager salary.

**Q3: What's the performance impact of self-joins on large tables?**

**A:** Self-joins can be expensive on large tables because they effectively scan the table multiple times. To optimize: (1) Create indexes on the join columns (like manager_id and employee_id), (2) Use WHERE clauses to limit the result set, (3) Consider recursive CTEs for deep hierarchies instead of multiple self-joins, (4) Analyze the query with EXPLAIN to check the execution plan.

**Q4: Can you find all employees at the same organizational level (peers) using self-join?**

**A:** Yes, by joining employees who share the same manager:

```sql
SELECT e1.name, e2.name, m.name AS common_manager
FROM employees e1
INNER JOIN employees e2
    ON e1.manager_id = e2.manager_id
    AND e1.employee_id < e2.employee_id
INNER JOIN employees m ON e1.manager_id = m.employee_id;
```

The condition `e1.employee_id < e2.employee_id` prevents duplicate pairs and self-pairing.

**Q5: How is a self-join different from a recursive CTE?**

**A:** A self-join is limited to a fixed number of levels you specify in the query (one join = one level). A recursive CTE can traverse an unknown or unlimited number of levels in a hierarchy. For example, to find all descendants of an employee at any depth, a recursive CTE is more appropriate than multiple self-joins. However, for simple one or two-level relationships, self-joins are simpler and often sufficient.

</div>

---

## 🧪 Practice Exercise

Try solving these yourself before looking at the solutions!

### Exercise 1: Department Chain of Command

Given this data, find the complete chain of command (employee → manager → manager's manager) for all employees:

```sql
-- Using the employees table from earlier examples
-- Show employee, their direct manager, and their manager's manager
```

<details>
<summary>Click to see solution</summary>

```sql
-- Solution: Three-level hierarchy
SELECT
    e.name AS employee,
    m1.name AS direct_manager,
    m2.name AS managers_manager
FROM employees e
LEFT JOIN employees m1 ON e.manager_id = m1.employee_id
LEFT JOIN employees m2 ON m1.manager_id = m2.employee_id
ORDER BY e.employee_id;

-- Output will show:
-- Alice Johnson → Carol Davis → NULL
-- Bob Smith → Carol Davis → NULL
-- Carol Davis → NULL → NULL (top level)
-- etc.
```

**Key Learning:** You can chain multiple self-joins to traverse multiple levels of hierarchy.

</details>

---

### Exercise 2: Find Employees Without Subordinates

Write a query to find all employees who don't manage anyone (no direct reports).

```sql
-- Hint: Think about which employees DON'T appear
-- as managers in the manager_id column
```

<details>
<summary>Click to see solution</summary>

```sql
-- Solution 1: Using LEFT JOIN and NULL check
SELECT e.employee_id, e.name
FROM employees e
LEFT JOIN employees subordinates ON e.employee_id = subordinates.manager_id
WHERE subordinates.manager_id IS NULL;

-- Solution 2: Using NOT IN subquery
SELECT employee_id, name
FROM employees
WHERE employee_id NOT IN (
    SELECT DISTINCT manager_id
    FROM employees
    WHERE manager_id IS NOT NULL
);

-- Solution 3: Using NOT EXISTS
SELECT e.employee_id, e.name
FROM employees e
WHERE NOT EXISTS (
    SELECT 1
    FROM employees sub
    WHERE sub.manager_id = e.employee_id
);

-- All three solutions return:
-- employee_id | name
-- ─────────────────
-- 101         | Alice Johnson
-- 102         | Bob Smith
-- 104         | David Brown
-- 106         | Frank Miller
```

**Key Learning:** Self-joins can identify records that DON'T have related records by using LEFT JOIN with NULL checks or subqueries.

</details>

---

### Exercise 3: Employee Comparison

Find all pairs of employees in the same department where one earns at least 20% more than the other.

```sql
-- Hint: You need to compare employees within the same department
-- and calculate salary differences
```

<details>
<summary>Click to see solution</summary>

```sql
-- Solution:
SELECT
    e1.name AS higher_paid,
    e1.salary AS higher_salary,
    e2.name AS lower_paid,
    e2.salary AS lower_salary,
    e1.department,
    ROUND(((e1.salary - e2.salary) / e2.salary * 100), 2) AS salary_diff_percent
FROM employees e1
INNER JOIN employees e2
    ON e1.department = e2.department
    AND e1.employee_id < e2.employee_id  -- Prevent duplicates
WHERE e1.salary >= e2.salary * 1.20
ORDER BY e1.department, salary_diff_percent DESC;

-- Example output (with salary data):
-- higher_paid  | higher_salary | lower_paid    | lower_salary | department  | diff_percent
-- ──────────────────────────────────────────────────────────────────────────────────────────
-- Frank Miller | 100000.00     | Alice Johnson | 75000.00     | Engineering | 33.33
-- Frank Miller | 100000.00     | Bob Smith     | 80000.00     | Engineering | 25.00
```

**Key Learning:** Self-joins can compare any rows within the same table based on any criteria, not just hierarchical relationships. The condition `e1.employee_id < e2.employee_id` prevents showing both (A,B) and (B,A) pairs.

</details>

---

## 📚 Related Topics

- [SQL Joins Explained](/mysql-tutorials/beginner-16-sql-joins-explained) - Understanding different types of joins
- [Foreign Keys](/mysql-tutorials/beginner-08-foreign-key) - How relationships are established between tables
- [Common Table Expressions (CTE)](/mysql-tutorials/intermediate-10-common-table-expressions-cte) - Alternative for complex hierarchies
- [Recursive CTE](/mysql-tutorials/intermediate-11-recursive-cte) - Traversing unlimited hierarchy levels
- [Indexes in MySQL](/mysql-tutorials/beginner-20-indexes-in-mysql) - Optimizing self-join performance
- [Window Functions](/mysql-tutorials/intermediate-08-window-functions-explained) - Another way to analyze related rows

---

## 🏷️ Tags

`self-join` `hierarchical-data` `employee-manager` `sql-joins` `table-aliases` `recursive-queries` `performance-optimization` `interview-questions`
