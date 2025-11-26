# Second Highest Salary - Interview Question

## 🎯 Question & Objective

**Question:** Write a query to get the 2nd highest salary from Employee table

**Aim:** Learn multiple approaches to find the second highest value from a table, understand their performance implications, and handle edge cases.

---

## 📚 Simple Explanation (ELI10)

### Real-Life Analogy

Imagine you're organizing a race 🏃:

1. **First place** = Fastest runner (highest salary)
2. **Second place** = Second fastest runner (2nd highest salary)

But what if:
- Only ONE person ran? (No second place exists)
- Two people tied for first? (Who is second?)

We need to write a query that handles all these scenarios!

**Think of it like finding the silver medal winner in a competition.**

---

## 🎨 Visual Representation

<div style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(251, 191, 36, 0.15)); border: 1px solid #F59E0B50; padding: 24px; border-radius: 12px; margin: 20px 0;">

### Sample Employee Table

<table style="width: 100%; border-collapse: separate; border-spacing: 0; border-radius: 12px; overflow: hidden; margin: 20px 0;">
  <thead>
    <tr style="background: linear-gradient(135deg, #F59E0B, #F97316);">
      <th style="color: white; padding: 16px; text-align: left;">id</th>
      <th style="color: white; padding: 16px; text-align: left;">name</th>
      <th style="color: white; padding: 16px; text-align: left;">salary</th>
      <th style="color: white; padding: 16px; text-align: left;">Ranking</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background-color: rgba(253, 224, 71, 0.2);">
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">1</td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">Alice</td>
      <td style="padding: 16px; color: #FCD34D; border-bottom: 1px solid rgba(75, 85, 99, 0.3);"><strong>100000</strong> 🥇 (1st)</td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">Highest</td>
    </tr>
    <tr style="background-color: rgba(251, 191, 36, 0.15);">
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">2</td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">Bob</td>
      <td style="padding: 16px; color: #FB923C; border-bottom: 1px solid rgba(75, 85, 99, 0.3);"><strong>80000</strong> 🥈 (2nd)</td>
      <td style="padding: 16px; color: #34D399; border-bottom: 1px solid rgba(75, 85, 99, 0.3);"><strong>← TARGET!</strong></td>
    </tr>
    <tr style="background-color: rgba(17, 24, 39, 0.3);">
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">3</td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">Charlie</td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">70000 🥉 (3rd)</td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">Third</td>
    </tr>
    <tr style="background-color: rgba(31, 41, 55, 0.3);">
      <td style="padding: 16px; color: #D1D5DB;">4</td>
      <td style="padding: 16px; color: #D1D5DB;">David</td>
      <td style="padding: 16px; color: #D1D5DB;">60000</td>
      <td style="padding: 16px; color: #D1D5DB;">Fourth</td>
    </tr>
  </tbody>
</table>

</div>

---

## 📋 Solution Approaches

<div style="background: rgba(31, 41, 55, 0.5); padding: 24px; border-radius: 12px; margin: 20px 0;">

### We'll Learn 5 Different Methods:

1. **LIMIT with OFFSET** - Simple and intuitive
2. **Subquery with MAX** - Handles edge cases
3. **DENSE_RANK()** - Window function approach
4. **Self JOIN** - Classic SQL approach
5. **Common Table Expression (CTE)** - Modern readable approach

</div>

---

## 💻 Setup: Create Sample Data

```sql
-- Create employee table
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    salary DECIMAL(10, 2)
);

-- Insert sample data
INSERT INTO employees VALUES
(1, 'Alice', 100000),
(2, 'Bob', 80000),
(3, 'Charlie', 80000),  -- Note: Duplicate salary
(4, 'David', 70000),
(5, 'Eve', 60000);
```

---

## 🎯 Method 1: LIMIT with OFFSET (Simple)

### Approach
Sort salaries in descending order, skip the first (highest), and get the next one.

```sql
SELECT DISTINCT salary AS second_highest_salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;
```

### Step-by-Step Breakdown

```sql
-- Step 1: Get distinct salaries
SELECT DISTINCT salary
FROM employees;
-- Result: 100000, 80000, 70000, 60000

-- Step 2: Sort in descending order
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC;
-- Result: 100000, 80000, 70000, 60000

-- Step 3: Skip first (OFFSET 1) and take one (LIMIT 1)
SELECT DISTINCT salary AS second_highest_salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;
```

### Output

```
+------------------------+
| second_highest_salary  |
+------------------------+
|               80000.00 |
+------------------------+
```

### ⚠️ Limitation
Returns empty set if only one salary exists (should return NULL instead).

---

## 🎯 Method 2: Subquery with MAX (Handles NULL)

### Approach
Find the maximum salary that is less than the overall maximum.

```sql
SELECT MAX(salary) AS second_highest_salary
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);
```

### Step-by-Step Breakdown

```sql
-- Step 1: Find the highest salary
SELECT MAX(salary) FROM employees;
-- Result: 100000

-- Step 2: Find all salaries less than highest
SELECT salary 
FROM employees
WHERE salary < 100000;
-- Result: 80000, 80000, 70000, 60000

-- Step 3: Get MAX from remaining salaries
SELECT MAX(salary) AS second_highest_salary
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);
```

### Output

```
+------------------------+
| second_highest_salary  |
+------------------------+
|               80000.00 |
+------------------------+
```

### ✅ Advantage
Returns NULL if only one salary exists (more correct).

---

## 🎯 Method 3: DENSE_RANK() Window Function

### Approach
Use window function to rank salaries, then filter for rank = 2.

```sql
SELECT salary AS second_highest_salary
FROM (
    SELECT 
        salary,
        DENSE_RANK() OVER (ORDER BY salary DESC) AS salary_rank
    FROM employees
) ranked
WHERE salary_rank = 2;
```

### Step-by-Step Breakdown

```sql
-- Step 1: Add rank to each salary
SELECT 
    name,
    salary,
    DENSE_RANK() OVER (ORDER BY salary DESC) AS salary_rank
FROM employees;
```

**Result:**
```
+---------+----------+--------------+
| name    | salary   | salary_rank  |
+---------+----------+--------------+
| Alice   | 100000   | 1            |
| Bob     | 80000    | 2            | ← These are rank 2
| Charlie | 80000    | 2            | ←
| David   | 70000    | 3            |
| Eve     | 60000    | 4            |
+---------+----------+--------------+
```

```sql
-- Step 2: Filter only rank 2 and get distinct
SELECT DISTINCT salary AS second_highest_salary
FROM (
    SELECT 
        salary,
        DENSE_RANK() OVER (ORDER BY salary DESC) AS salary_rank
    FROM employees
) ranked
WHERE salary_rank = 2;
```

### Output

```
+------------------------+
| second_highest_salary  |
+------------------------+
|               80000.00 |
+------------------------+
```

### ✅ Advantage
Handles duplicate salaries correctly using DENSE_RANK.

---

## 🎯 Method 4: Self JOIN

### Approach
Join table to itself where salary is less than, then find the minimum of those.

```sql
SELECT MIN(e1.salary) AS second_highest_salary
FROM employees e1
WHERE e1.salary < (SELECT MAX(e2.salary) FROM employees e2);
```

Or with JOIN:

```sql
SELECT MAX(e1.salary) AS second_highest_salary
FROM employees e1
JOIN employees e2 ON e1.salary < e2.salary;
```

---

## 🎯 Method 5: Common Table Expression (CTE)

### Approach
Use CTE for better readability.

```sql
WITH RankedSalaries AS (
    SELECT 
        DISTINCT salary,
        DENSE_RANK() OVER (ORDER BY salary DESC) AS salary_rank
    FROM employees
)
SELECT salary AS second_highest_salary
FROM RankedSalaries
WHERE salary_rank = 2;
```

### ✅ Advantage
Most readable and maintainable approach!

---

## 🔥 Handling Edge Cases

### Case 1: Only One Employee

```sql
-- Data: Only one employee
DELETE FROM employees WHERE id > 1;

-- Method 2 returns NULL ✅
SELECT MAX(salary) AS second_highest_salary
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);
-- Result: NULL

-- Method 1 returns empty ❌
SELECT DISTINCT salary AS second_highest_salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;
-- Result: Empty set
```

### Case 2: All Same Salary

```sql
-- Update all to same salary
UPDATE employees SET salary = 80000;

-- All methods should return NULL
-- No second highest exists!
```

### Case 3: Exactly Two Unique Salaries

```sql
-- This should work perfectly with all methods
DELETE FROM employees WHERE salary NOT IN (100000, 80000);
```


---

## 🔍 Performance Comparison

<table style="width: 100%; border-collapse: separate; border-spacing: 0; border-radius: 12px; overflow: hidden; margin: 20px 0;">
  <thead>
    <tr style="background: linear-gradient(135deg, #0EA5E9, #6366F1);">
      <th style="color: white; padding: 16px; text-align: left;">Method</th>
      <th style="color: white; padding: 16px; text-align: left;">Performance</th>
      <th style="color: white; padding: 16px; text-align: left;">Handles NULL</th>
      <th style="color: white; padding: 16px; text-align: left;">Best For</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background-color: rgba(31, 41, 55, 0.3);">
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        <strong>LIMIT OFFSET</strong>
      </td>
      <td style="padding: 16px; color: #34D399; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">Fast ⚡</td>
      <td style="padding: 16px; color: #EF4444; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">❌ No</td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">Simple queries</td>
    </tr>
    <tr style="background-color: rgba(17, 24, 39, 0.3);">
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        <strong>MAX Subquery</strong>
      </td>
      <td style="padding: 16px; color: #34D399; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">Fast ⚡</td>
      <td style="padding: 16px; color: #34D399; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">✅ Yes</td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">Production use</td>
    </tr>
    <tr style="background-color: rgba(31, 41, 55, 0.3);">
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        <strong>DENSE_RANK()</strong>
      </td>
      <td style="padding: 16px; color: #FBBF24; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">Medium 🔶</td>
      <td style="padding: 16px; color: #34D399; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">✅ Yes</td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">Complex ranking</td>
    </tr>
    <tr style="background-color: rgba(17, 24, 39, 0.3);">
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        <strong>CTE</strong>
      </td>
      <td style="padding: 16px; color: #FBBF24; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">Medium 🔶</td>
      <td style="padding: 16px; color: #34D399; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">✅ Yes</td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">Readability</td>
    </tr>
  </tbody>
</table>

---

## ⚠️ Common Mistakes

<div style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid #EF4444; padding: 20px; border-radius: 8px; margin: 20px 0;">

### What to Avoid

❌ **Don't:** Forget DISTINCT when using LIMIT OFFSET
```sql
-- This might return duplicate salary if two employees have it
SELECT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1;
```

❌ **Don't:** Ignore the case when there's no second highest
```sql
-- This returns empty set instead of NULL
SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1;
```

✅ **Do:** Use MAX with subquery for production
```sql
-- Returns NULL when appropriate
SELECT MAX(salary) AS second_highest_salary
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);
```

✅ **Do:** Use IFNULL/COALESCE for guaranteed result
```sql
SELECT IFNULL(
    (SELECT DISTINCT salary 
     FROM employees 
     ORDER BY salary DESC 
     LIMIT 1 OFFSET 1),
    NULL
) AS second_highest_salary;
```

</div>

---

## ✅ Key Takeaways

<div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(74, 222, 128, 0.15)); border: 1px solid rgba(34, 197, 94, 0.3); padding: 24px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #22C55E;">

1. **Multiple Solutions Exist:** LIMIT OFFSET, MAX subquery, DENSE_RANK(), CTE
2. **Handle Edge Cases:** Always consider when no second highest exists (return NULL)
3. **Use DISTINCT:** Avoid duplicate salary values in result
4. **Best Method for Interviews:** MAX with subquery (simple, handles NULL)
5. **Best Method for Production:** DENSE_RANK() or CTE (more flexible)
6. **Performance:** For simple cases, LIMIT OFFSET is fastest

</div>

---

## 🎓 Interview Tips

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3B82F6; padding: 20px; border-radius: 8px; margin: 20px 0;">

### How to Answer in an Interview

**Good Answer:**
> "I would use a subquery with MAX to find the second highest salary: `SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees)`. This approach is simple, efficient, and correctly returns NULL when there's no second highest value. Alternatively, I could use DENSE_RANK() window function for more complex scenarios or if I need to extend it to find the Nth highest value."

**Points to Mention:**
- Always mention you need to handle the case where no second highest exists
- Discuss DISTINCT to avoid returning duplicate values
- If they ask for the Nth highest, mention you'd use DENSE_RANK() or LIMIT with dynamic OFFSET
- Know the difference between RANK, DENSE_RANK, and ROW_NUMBER

**What NOT to say:**
- ❌ "I'll just use LIMIT 1 OFFSET 1" (doesn't handle edge cases)
- ❌ "I don't know how to handle duplicates" (always use DISTINCT or DENSE_RANK)
- ❌ Not mentioning NULL handling

**Follow-up Questions You Might Get:**
1. "How would you find the Nth highest salary?" → Use LIMIT N-1, 1 or DENSE_RANK
2. "What if there are duplicate salaries?" → Use DISTINCT or DENSE_RANK
3. "Which method is fastest?" → Depends on table size, but LIMIT OFFSET is generally fastest for simple cases

</div>

---

## 🧪 Practice Exercise

Try solving these variations yourself:

```sql
-- Exercise 1: Find 3rd highest salary
-- Exercise 2: Find 2nd highest salary per department
-- Exercise 3: Find 2nd lowest salary
-- Exercise 4: Find top 3 distinct salaries
```

<details>
<summary>Click to see solutions</summary>

```sql
-- Exercise 1: 3rd highest salary
SELECT MAX(salary) AS third_highest
FROM employees
WHERE salary < (
    SELECT MAX(salary) 
    FROM employees 
    WHERE salary < (SELECT MAX(salary) FROM employees)
);

-- OR using DENSE_RANK
SELECT DISTINCT salary AS third_highest
FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
    FROM employees
) ranked
WHERE rnk = 3;

-- Exercise 2: 2nd highest per department
SELECT 
    department,
    salary AS second_highest_salary
FROM (
    SELECT 
        department,
        salary,
        DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk
    FROM employees
) ranked
WHERE rnk = 2;

-- Exercise 3: 2nd lowest salary
SELECT MIN(salary) AS second_lowest
FROM employees
WHERE salary > (SELECT MIN(salary) FROM employees);

-- Exercise 4: Top 3 distinct salaries
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 3;
```

</details>

---

## 📚 Related Topics

- [Nth Highest Salary](/mysql-tutorials/intermediate-04-nth-highest-salary)
- [Window Functions - RANK, DENSE_RANK, ROW_NUMBER](/mysql-tutorials/intermediate-06-window-functions-rank-dense-rank-row-number)
- [Common Table Expressions (CTE)](/mysql-tutorials/intermediate-10-common-table-expressions-cte)
- [Aggregation Functions](/mysql-tutorials/beginner-aggregate-functions)

---

## 📖 Further Reading

- [MySQL Window Functions Documentation](https://dev.mysql.com/doc/refman/8.0/en/window-functions.html)
- [Ranking Functions](https://dev.mysql.com/doc/refman/8.0/en/window-function-descriptions.html#function_dense-rank)
- [Subquery Optimization](https://dev.mysql.com/doc/refman/8.0/en/subquery-optimization.html)


