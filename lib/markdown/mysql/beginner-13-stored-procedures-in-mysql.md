# Stored Procedures in MySQL

## 🎯 Question & Objective

**Question:** What is a stored procedure?

**Aim:** A stored procedure is a prepared SQL code that you can save and reuse. It improves performance and reduces code duplication.

---

## 📚 Simple Explanation (ELI10)

### Real-Life Analogy

**Think of a coffee machine with preset buttons:**

**Without Stored Procedures** = **Making coffee manually every time:**
- Grind beans → measure water → heat water → brew → add milk → add sugar
- You repeat these steps every single time you want coffee

**With Stored Procedures** = **Pressing the "Latte" button:**
- All the steps are programmed into the machine
- Press one button → get perfect latte every time
- Faster, consistent, no mistakes

### In Database Terms:
**Stored Procedure** = A saved SQL recipe that:
- Contains multiple SQL statements bundled together
- Accepts parameters (like "large" or "small" coffee)
- Executes with a single command: `CALL make_latte('large')`
- Reduces network traffic (one call instead of multiple queries)
- Improves performance (pre-compiled and cached)

**Example:**
Instead of writing 10 lines of SQL every time you want to give an employee a raise, you call:
```sql
CALL give_raise('Alice', 10.5);  -- Give Alice a 10.5% raise
```

---

## 🎨 Visual Representation

<div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(96, 165, 250, 0.15)); border: 1px solid #3B82F650; padding: 24px; border-radius: 12px; margin: 20px 0;">

### How Stored Procedures Work

<div style="background: rgba(31, 41, 55, 0.5); padding: 20px; border-radius: 10px; margin: 10px 0;">
  <h4 style="color: #60A5FA; margin-top: 0;">📋 Traditional Approach (Without Stored Procedure)</h4>
  <p style="color: #D1D5DB; line-height: 1.8; font-family: monospace;">
    <strong>Application sends multiple queries:</strong><br/>
    1. SELECT salary FROM employees WHERE name = 'Alice';<br/>
    2. Calculate new salary in application code<br/>
    3. UPDATE employees SET salary = 77000 WHERE name = 'Alice';<br/>
    4. INSERT INTO audit_log VALUES (...);<br/>
    5. SELECT * FROM employees WHERE name = 'Alice';<br/>
    <br/>
    ❌ <strong>5 round trips</strong> between app and database<br/>
    ❌ <strong>Logic scattered</strong> across multiple places<br/>
    ❌ <strong>No reusability</strong>
  </p>
</div>

<div style="background: rgba(16, 185, 129, 0.2); padding: 20px; border-radius: 10px; margin: 10px 0;">
  <h4 style="color: #34D399; margin-top: 0;">⚡ With Stored Procedure</h4>
  <p style="color: #D1D5DB; line-height: 1.8; font-family: monospace;">
    <strong>Application sends one call:</strong><br/>
    CALL give_raise('Alice', 10.0);<br/>
    <br/>
    <strong>Database executes internally:</strong><br/>
    - SELECT current salary<br/>
    - Calculate increase<br/>
    - UPDATE salary<br/>
    - INSERT audit log<br/>
    - RETURN updated employee<br/>
    <br/>
    ✅ <strong>1 round trip</strong> only<br/>
    ✅ <strong>Logic centralized</strong> in database<br/>
    ✅ <strong>Reusable</strong> across all applications
  </p>
</div>

</div>

---

## 📋 Key Concepts to Understand

<div style="background: rgba(31, 41, 55, 0.5); padding: 24px; border-radius: 12px; margin: 20px 0;">

### Core Understanding

**1. What is a Stored Procedure?**
- A set of SQL statements stored in the database
- Can accept input parameters and return output
- Pre-compiled and optimized for better performance
- Executed with a single `CALL` command

**2. Key Benefits**
- **Performance**: Pre-compiled, cached execution plan
- **Network Efficiency**: One call instead of multiple queries
- **Security**: Users can execute procedures without direct table access
- **Maintainability**: Update logic once, affects all applications
- **Code Reusability**: Write once, use everywhere

**3. Components**
- **Parameters**: IN (input), OUT (output), INOUT (both)
- **Variables**: Local storage within procedure
- **Control Flow**: IF/ELSE, CASE, LOOP, WHILE
- **Error Handling**: DECLARE handlers for exceptions

**4. Use Cases**
- Complex business logic (multi-step operations)
- Data validation before INSERT/UPDATE
- Batch processing (bulk updates)
- Audit logging and security checks

</div>

---

## 💻 Practical Examples

### Example 1: Simple Stored Procedure (No Parameters)

```sql
-- Create a procedure to display all employees
DELIMITER $$

CREATE PROCEDURE get_all_employees()
BEGIN
    SELECT emp_id, emp_name, department, salary
    FROM employees
    ORDER BY emp_name;
END$$

DELIMITER ;

-- Call the procedure
CALL get_all_employees();
```

**Output:**
```
+--------+----------------+------------+----------+
| emp_id | emp_name       | department | salary   |
+--------+----------------+------------+----------+
|      1 | Alice Johnson  | IT         | 75000.00 |
|      2 | Bob Smith      | HR         | 65000.00 |
|      3 | Charlie Brown  | IT         | 80000.00 |
+--------+----------------+------------+----------+
```

---

### Example 2: Procedure with IN Parameters

```sql
-- Create procedure to get employees by department
DELIMITER $$

CREATE PROCEDURE get_employees_by_dept(IN dept_name VARCHAR(50))
BEGIN
    SELECT emp_id, emp_name, salary
    FROM employees
    WHERE department = dept_name
    ORDER BY salary DESC;
END$$

DELIMITER ;

-- Call with parameter
CALL get_employees_by_dept('IT');
```

**Output:**
```
+--------+---------------+----------+
| emp_id | emp_name      | salary   |
+--------+---------------+----------+
|      3 | Charlie Brown | 80000.00 |
|      1 | Alice Johnson | 75000.00 |
+--------+---------------+----------+
```

---

### Example 3: Procedure with OUT Parameters

```sql
-- Create procedure to count employees in a department
DELIMITER $$

CREATE PROCEDURE count_dept_employees(
    IN dept_name VARCHAR(50),
    OUT emp_count INT
)
BEGIN
    SELECT COUNT(*) INTO emp_count
    FROM employees
    WHERE department = dept_name;
END$$

DELIMITER ;

-- Call and get output parameter
CALL count_dept_employees('IT', @total);
SELECT @total AS total_it_employees;
```

**Output:**
```
+---------------------+
| total_it_employees  |
+---------------------+
|                   2 |
+---------------------+
```

---

### Example 4: Complex Procedure with Business Logic

```sql
-- Procedure to give employee a raise with audit logging
DELIMITER $$

CREATE PROCEDURE give_employee_raise(
    IN employee_id INT,
    IN raise_percent DECIMAL(5,2),
    OUT old_salary DECIMAL(10,2),
    OUT new_salary DECIMAL(10,2)
)
BEGIN
    DECLARE current_salary DECIMAL(10,2);
    
    -- Start transaction
    START TRANSACTION;
    
    -- Get current salary
    SELECT salary INTO current_salary
    FROM employees
    WHERE emp_id = employee_id;
    
    -- Calculate new salary
    SET old_salary = current_salary;
    SET new_salary = current_salary * (1 + raise_percent / 100);
    
    -- Update employee salary
    UPDATE employees
    SET salary = new_salary
    WHERE emp_id = employee_id;
    
    -- Insert audit log
    INSERT INTO salary_audit (emp_id, old_salary, new_salary, change_date)
    VALUES (employee_id, old_salary, new_salary, NOW());
    
    -- Commit transaction
    COMMIT;
END$$

DELIMITER ;

-- Usage
CALL give_employee_raise(1, 10.0, @old, @new);
SELECT @old AS old_salary, @new AS new_salary;
```

**Output:**
```
+------------+------------+
| old_salary | new_salary |
+------------+------------+
|   75000.00 |   82500.00 |
+------------+------------+
```

---

### Example 5: Procedure with Control Flow (IF-ELSE)

```sql
-- Procedure to categorize employees by salary
DELIMITER $$

CREATE PROCEDURE categorize_employee_salary(
    IN employee_id INT,
    OUT category VARCHAR(20)
)
BEGIN
    DECLARE emp_salary DECIMAL(10,2);
    
    SELECT salary INTO emp_salary
    FROM employees
    WHERE emp_id = employee_id;
    
    IF emp_salary >= 80000 THEN
        SET category = 'High';
    ELSEIF emp_salary >= 60000 THEN
        SET category = 'Medium';
    ELSE
        SET category = 'Low';
    END IF;
END$$

DELIMITER ;

-- Test
CALL categorize_employee_salary(3, @cat);
SELECT @cat AS salary_category;
-- Output: 'High' (Charlie earns 80000)
```

---

### Example 6: Procedure with LOOP and Cursor

```sql
-- Procedure to give raises to all employees in a department
DELIMITER $$

CREATE PROCEDURE give_dept_raises(
    IN dept_name VARCHAR(50),
    IN raise_percent DECIMAL(5,2)
)
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE v_emp_id INT;
    
    -- Declare cursor for employee IDs
    DECLARE emp_cursor CURSOR FOR
        SELECT emp_id FROM employees WHERE department = dept_name;
    
    -- Declare handler for end of cursor
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
    
    -- Open cursor
    OPEN emp_cursor;
    
    -- Loop through employees
    read_loop: LOOP
        FETCH emp_cursor INTO v_emp_id;
        
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        -- Give raise
        UPDATE employees
        SET salary = salary * (1 + raise_percent / 100)
        WHERE emp_id = v_emp_id;
    END LOOP;
    
    -- Close cursor
    CLOSE emp_cursor;
END$$

DELIMITER ;

-- Usage
CALL give_dept_raises('IT', 5.0);  -- Give 5% raise to all IT employees
```

---

### Example 7: Error Handling in Stored Procedure

```sql
-- Procedure with error handling
DELIMITER $$

CREATE PROCEDURE safe_delete_employee(
    IN employee_id INT,
    OUT result_msg VARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SET result_msg = 'Error: Could not delete employee';
        ROLLBACK;
    END;
    
    START TRANSACTION;
    
    -- Check if employee exists
    IF NOT EXISTS (SELECT 1 FROM employees WHERE emp_id = employee_id) THEN
        SET result_msg = 'Error: Employee not found';
    ELSE
        -- Delete employee
        DELETE FROM employees WHERE emp_id = employee_id;
        SET result_msg = 'Success: Employee deleted';
        COMMIT;
    END IF;
END$$

DELIMITER ;

-- Test
CALL safe_delete_employee(999, @msg);
SELECT @msg;
-- Output: 'Error: Employee not found'
```

---

### Example 8: Managing Stored Procedures

```sql
-- View all stored procedures
SHOW PROCEDURE STATUS WHERE Db = 'your_database';

-- View procedure definition
SHOW CREATE PROCEDURE get_all_employees;

-- Drop a procedure
DROP PROCEDURE IF EXISTS get_all_employees;

-- Modify a procedure (must drop and recreate)
DROP PROCEDURE IF EXISTS get_employees_by_dept;

DELIMITER $$
CREATE PROCEDURE get_employees_by_dept(IN dept_name VARCHAR(50))
BEGIN
    -- Updated logic here
    SELECT emp_id, emp_name, salary, hire_date
    FROM employees
    WHERE department = dept_name;
END$$
DELIMITER ;
```



---

## 🔍 Things to Consider

<div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid #8B5CF6; padding: 20px; border-radius: 8px; margin: 20px 0;">

### Important Points

**Performance Implications:**
- ✓ Pre-compiled execution plans improve performance
- ✓ Reduced network traffic (one call vs multiple queries)
- ✓ Cached in memory after first execution
- ✓ Can be slower than inline SQL for simple queries

**Best Practices:**
- ✓ Use descriptive names (e.g., `sp_get_employee_by_id`)
- ✓ Always use DELIMITER when creating procedures
- ✓ Include error handling with DECLARE HANDLER
- ✓ Document parameters and purpose in comments
- ✓ Use transactions for multi-statement operations

**When to Use Stored Procedures:**
- ✓ Complex business logic involving multiple tables
- ✓ Batch operations (bulk updates/deletes)
- ✓ Repeated operations called from multiple applications
- ✓ Security-sensitive operations requiring abstraction
- ✓ Audit logging and data validation

**Alternatives to Consider:**
- ✓ **Views**: For read-only complex queries
- ✓ **Triggers**: For automatic actions on INSERT/UPDATE/DELETE
- ✓ **Functions**: For computed values that return a single result
- ✓ **Application Layer**: For logic that changes frequently

</div>

---

## ⚠️ Common Mistakes

<div style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid #EF4444; padding: 20px; border-radius: 8px; margin: 20px 0;">

### What to Avoid

❌ **Don't:** Forget to change DELIMITER
```sql
-- ❌ This will fail
CREATE PROCEDURE test()
BEGIN
    SELECT * FROM employees;
END;  -- Semicolon conflicts with statement terminator
```

❌ **Don't:** Ignore error handling
```sql
-- ❌ No error handling
CREATE PROCEDURE delete_emp(IN emp_id INT)
BEGIN
    DELETE FROM employees WHERE emp_id = emp_id;
    -- What if foreign key constraint fails?
END;
```

❌ **Don't:** Use dynamic SQL without sanitization
```sql
-- ❌ SQL injection risk
CREATE PROCEDURE search_employees(IN search_term VARCHAR(100))
BEGIN
    SET @sql = CONCAT('SELECT * FROM employees WHERE name = "', search_term, '"');
    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END;
```

✅ **Do:** Always use DELIMITER
```sql
DELIMITER $$
CREATE PROCEDURE test()
BEGIN
    SELECT * FROM employees;
END$$
DELIMITER ;
```

✅ **Do:** Include error handling
```sql
DELIMITER $$
CREATE PROCEDURE delete_emp(IN emp_id INT, OUT result VARCHAR(100))
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SET result = 'Error: Cannot delete employee';
        ROLLBACK;
    END;
    
    START TRANSACTION;
    DELETE FROM employees WHERE emp_id = emp_id;
    SET result = 'Success';
    COMMIT;
END$$
DELIMITER ;
```

✅ **Do:** Use parameters safely
```sql
DELIMITER $$
CREATE PROCEDURE search_employees(IN search_term VARCHAR(100))
BEGIN
    -- ✅ Safe parameterized query
    SELECT * FROM employees WHERE name = search_term;
END$$
DELIMITER ;
```

</div>

---

## ✅ Key Takeaways

<div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(74, 222, 128, 0.15)); border: 1px solid rgba(34, 197, 94, 0.3); padding: 24px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #22C55E;">

1. **Reusable SQL Code:** Stored procedures encapsulate SQL logic that can be called multiple times
2. **Performance:** Pre-compiled and cached execution plans improve performance
3. **Network Efficiency:** One procedure call replaces multiple query round trips
4. **Parameters:** Support IN (input), OUT (output), and INOUT (both) parameters
5. **Security:** Users can execute procedures without direct table access
6. **Maintainability:** Update logic once in database, affects all calling applications

</div>

---

## 🎓 Interview Tips

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3B82F6; padding: 20px; border-radius: 8px; margin: 20px 0;">

### How to Answer in an Interview

**Good Answer:**
"A stored procedure is a pre-compiled set of SQL statements stored in the database that can be executed with a single CALL command. It's like a function in programming - you write it once and reuse it multiple times.

**Key benefits include:**
1. **Performance** - Pre-compiled execution plans and caching
2. **Network Efficiency** - One call instead of multiple queries reduces round trips
3. **Security** - Users can execute procedures without direct table access
4. **Maintainability** - Update business logic once, affects all applications
5. **Reusability** - Write once, use everywhere

**For example**, instead of writing 10 lines of SQL every time we need to give an employee a raise, update audit logs, and send notifications, we create a procedure:
```sql
CALL give_employee_raise(emp_id, 10.0);  -- One line!
```

Stored procedures support parameters (IN, OUT, INOUT), variables, control flow (IF/ELSE, LOOPS), and error handling."

**Follow-up Questions to Expect:**

**Q: What's the difference between stored procedures and functions?**
*Answer:*
- **Stored Procedure**: Can return multiple result sets, use OUT parameters, modify data (INSERT/UPDATE/DELETE)
- **Function**: Returns a single value, can be used in SELECT statements, typically read-only

**Q: How do you handle errors in stored procedures?**
*Answer:*
```sql
DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
    -- Error handling logic
    ROLLBACK;
    SET error_msg = 'Operation failed';
END;
```

**Q: Can stored procedures improve performance?**
*Answer:* Yes, but it depends:
- **Improved**: Pre-compiled, cached, reduced network traffic
- **Not Always**: Simple queries may be slower due to procedure overhead
- **Best For**: Complex multi-statement operations, batch processing

**Q: When would you NOT use a stored procedure?**
*Answer:*
- Logic that changes frequently (easier to update in application)
- Simple one-time queries (overhead not worth it)
- When you need database portability (procedures vary by DBMS)
- Complex business logic better suited for application layer

</div>

---

## 🧪 Practice Exercises

<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #F59E0B; padding: 20px; border-radius: 8px; margin: 20px 0;">

### Exercise 1: Create Employee Onboarding Procedure
Create a procedure that adds a new employee, assigns them to a department, and creates an initial salary record.

```sql
-- Your solution here
```

<details>
<summary>💡 Solution</summary>

```sql
DELIMITER $$

CREATE PROCEDURE onboard_employee(
    IN p_name VARCHAR(100),
    IN p_dept VARCHAR(50),
    IN p_salary DECIMAL(10,2),
    OUT p_emp_id INT,
    OUT p_message VARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SET p_message = 'Error: Onboarding failed';
        ROLLBACK;
    END;
    
    START TRANSACTION;
    
    -- Insert employee
    INSERT INTO employees (emp_name, department, salary, hire_date)
    VALUES (p_name, p_dept, p_salary, CURDATE());
    
    SET p_emp_id = LAST_INSERT_ID();
    
    -- Create salary history
    INSERT INTO salary_history (emp_id, salary, effective_date)
    VALUES (p_emp_id, p_salary, CURDATE());
    
    -- Send welcome notification (simulated)
    INSERT INTO notifications (emp_id, message, created_at)
    VALUES (p_emp_id, CONCAT('Welcome ', p_name, '!'), NOW());
    
    SET p_message = 'Success: Employee onboarded';
    COMMIT;
END$$

DELIMITER ;

-- Usage
CALL onboard_employee('John Doe', 'IT', 75000, @new_id, @msg);
SELECT @new_id AS employee_id, @msg AS message;
```

</details>

---

### Exercise 2: Salary Statistics Procedure
Create a procedure that calculates department salary statistics (count, avg, min, max).

```sql
-- Your solution here
```

<details>
<summary>💡 Solution</summary>

```sql
DELIMITER $$

CREATE PROCEDURE get_dept_salary_stats(
    IN p_dept VARCHAR(50),
    OUT p_emp_count INT,
    OUT p_avg_salary DECIMAL(10,2),
    OUT p_min_salary DECIMAL(10,2),
    OUT p_max_salary DECIMAL(10,2)
)
BEGIN
    SELECT 
        COUNT(*),
        ROUND(AVG(salary), 2),
        MIN(salary),
        MAX(salary)
    INTO 
        p_emp_count,
        p_avg_salary,
        p_min_salary,
        p_max_salary
    FROM employees
    WHERE department = p_dept;
END$$

DELIMITER ;

-- Usage
CALL get_dept_salary_stats('IT', @count, @avg, @min, @max);
SELECT @count AS employees, @avg AS avg_salary, @min AS min_sal, @max AS max_sal;
```

</details>

---

### Exercise 3: Bulk Salary Update with Validation
Create a procedure that gives raises to all employees in a department, but only if they've been employed for at least 1 year.

```sql
-- Your solution here
```

<details>
<summary>💡 Solution</summary>

```sql
DELIMITER $$

CREATE PROCEDURE give_annual_raises(
    IN p_dept VARCHAR(50),
    IN p_raise_percent DECIMAL(5,2),
    OUT p_updated_count INT
)
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE v_emp_id INT;
    DECLARE v_hire_date DATE;
    
    DECLARE emp_cursor CURSOR FOR
        SELECT emp_id, hire_date 
        FROM employees 
        WHERE department = p_dept;
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
    
    SET p_updated_count = 0;
    
    OPEN emp_cursor;
    
    read_loop: LOOP
        FETCH emp_cursor INTO v_emp_id, v_hire_date;
        
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        -- Check if employed for at least 1 year
        IF DATEDIFF(CURDATE(), v_hire_date) >= 365 THEN
            UPDATE employees
            SET salary = salary * (1 + p_raise_percent / 100)
            WHERE emp_id = v_emp_id;
            
            SET p_updated_count = p_updated_count + 1;
        END IF;
    END LOOP;
    
    CLOSE emp_cursor;
END$$

DELIMITER ;

-- Usage
CALL give_annual_raises('IT', 5.0, @updated);
SELECT @updated AS employees_updated;
```

</details>

</div>

---

## 📚 Related Topics

- [Views in MySQL](./beginner-12-views-in-mysql.md) - Virtual tables for query simplification
- [Triggers in MySQL](./beginner-14-triggers-in-mysql.md) - Automatic actions on data changes
- [Functions in MySQL](./intermediate-mysql-functions.md) - Return single values
- [Transactions in MySQL](./intermediate-transactions.md) - ACID properties
- [Cursors in MySQL](./advanced-cursors.md) - Row-by-row processing

---

## 🏷️ Tags
`MySQL` `SQL` `Stored Procedures` `Database Programming` `Performance` `Code Reusability` `Interview Questions`

