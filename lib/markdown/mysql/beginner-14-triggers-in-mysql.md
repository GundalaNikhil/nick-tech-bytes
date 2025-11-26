# Triggers in MySQL

## 🎯 Question & Objective

**Question:** What is a trigger?

**Aim:** A trigger is a database object that automatically executes in response to INSERT, UPDATE, or DELETE events on a table.

---

## 📚 Simple Explanation (ELI10)

### Real-Life Analogy

**Think of a motion-sensor light:**

**Regular Code** = **Manual light switch** - You have to remember to turn on/off the lights yourself.

**Trigger** = **Motion sensor** - The light turns on **automatically** when it detects motion. You don't do anything; it just happens!

### In Database Terms:

**Trigger** = Automatic action that fires when data changes:

- **BEFORE INSERT**: Check data before adding (like a security guard checking ID)
- **AFTER INSERT**: Log who entered (like a visitor log book)
- **BEFORE UPDATE**: Validate changes (like spell-check before sending email)
- **AFTER UPDATE**: Audit trail (like tracking who edited a document)
- **BEFORE DELETE**: Prevent deletion (like "Are you sure?" confirmation)
- **AFTER DELETE**: Archive data (like moving to trash folder)

**Example:**
Every time someone updates an employee salary, a trigger automatically logs the change - who changed it, when, old value, new value. You don't write code to log it; the trigger does it automatically!

---

## 🎨 Visual Representation

<div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(96, 165, 250, 0.15)); border: 1px solid #3B82F650; padding: 24px; border-radius: 12px; margin: 20px 0;">

### How Triggers Work

<div style="background: rgba(31, 41, 55, 0.5); padding: 20px; border-radius: 10px; margin: 10px 0;">
  <h4 style="color: #60A5FA; margin-top: 0;">⏱️ Trigger Timing</h4>
  <p style="color: #D1D5DB; line-height: 1.8; font-family: monospace;">
    <strong>BEFORE Triggers:</strong> Execute validation/modification before data change<br/>
    User: UPDATE employees SET salary = 50000 WHERE id = 1;<br/>
    ↓<br/>
    Trigger: Check if salary < minimum_wage → Reject if true<br/>
    ↓<br/>
    Database: Proceed with UPDATE (if validated)<br/>
    <br/>
    <strong>AFTER Triggers:</strong> Execute logging/notifications after data change<br/>
    User: UPDATE employees SET salary = 75000 WHERE id = 1;<br/>
    ↓<br/>
    Database: UPDATE completed<br/>
    ↓<br/>
    Trigger: INSERT INTO salary_audit (old_sal, new_sal, date)
  </p>
</div>

<div style="background: rgba(139, 92, 246, 0.2); padding: 20px; border-radius: 10px; margin: 10px 0;">
  <h4 style="color: #A78BFA; margin-top: 0;">📊 Trigger Events</h4>
  <p style="color: #D1D5DB; line-height: 1.8;">
    <strong>INSERT Trigger:</strong> Fires when new row is added<br/>
    <strong>UPDATE Trigger:</strong> Fires when row is modified<br/>
    <strong>DELETE Trigger:</strong> Fires when row is removed<br/>
    <br/>
    <strong>OLD vs NEW:</strong><br/>
    • INSERT: Only NEW (new row data)<br/>
    • UPDATE: OLD (before) + NEW (after)<br/>
    • DELETE: Only OLD (deleted row data)
  </p>
</div>

</div>

---

## 📋 Key Concepts to Understand

<div style="background: rgba(31, 41, 55, 0.5); padding: 24px; border-radius: 12px; margin: 20px 0;">

### Core Understanding

**1. What is a Trigger?**

- Automatic SQL code that executes on INSERT, UPDATE, or DELETE
- Cannot be called manually (unlike stored procedures)
- Associated with a specific table
- Fires automatically when the triggering event occurs

**2. Trigger Types (6 combinations)**

- **BEFORE INSERT**: Validate/modify data before inserting
- **AFTER INSERT**: Log/notify after inserting
- **BEFORE UPDATE**: Validate/modify data before updating
- **AFTER UPDATE**: Log/audit after updating
- **BEFORE DELETE**: Prevent deletion or archive data
- **AFTER DELETE**: Clean up related data or log deletion

**3. OLD and NEW Keywords**

- **NEW**: Access new row values (INSERT, UPDATE)
- **OLD**: Access old row values (UPDATE, DELETE)
- Example: `NEW.salary` (new salary), `OLD.salary` (old salary)

**4. Use Cases**

- Audit logging (track all changes)
- Data validation (enforce business rules)
- Automatic calculations (update derived values)
- Maintain referential integrity
- Archive deleted data

</div>

---

## 💻 Practical Examples

### Example 1: AFTER INSERT Trigger - Auto Logging

```sql
-- Create audit table
CREATE TABLE salary_audit (
    audit_id INT PRIMARY KEY AUTO_INCREMENT,
    emp_id INT,
    old_salary DECIMAL(10,2),
    new_salary DECIMAL(10,2),
    change_type VARCHAR(10),
    changed_by VARCHAR(50),
    change_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create trigger to log salary changes
DELIMITER $$

CREATE TRIGGER after_employee_insert
AFTER INSERT ON employees
FOR EACH ROW
BEGIN
    INSERT INTO salary_audit (emp_id, old_salary, new_salary, change_type, changed_by)
    VALUES (NEW.emp_id, 0, NEW.salary, 'INSERT', USER());
END$$

DELIMITER ;

-- Test the trigger
INSERT INTO employees (emp_id, emp_name, department, salary)
VALUES (101, 'Alice Johnson', 'IT', 75000);

-- Check audit log (automatically created!)
SELECT * FROM salary_audit;
```

**Output:**

```
+----------+--------+------------+------------+-------------+------------------+---------------------+
| audit_id | emp_id | old_salary | new_salary | change_type | changed_by       | change_date         |
+----------+--------+------------+------------+-------------+------------------+---------------------+
|        1 |    101 |       0.00 |   75000.00 | INSERT      | root@localhost   | 2025-11-26 10:30:00 |
+----------+--------+------------+------------+-------------+------------------+---------------------+
```

---

### Example 2: BEFORE UPDATE Trigger - Data Validation

```sql
-- Create trigger to validate salary updates
DELIMITER $$

CREATE TRIGGER before_salary_update
BEFORE UPDATE ON employees
FOR EACH ROW
BEGIN
    -- Prevent salary decrease
    IF NEW.salary < OLD.salary THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error: Salary cannot be decreased!';
    END IF;

    -- Prevent salary increase > 50%
    IF NEW.salary > OLD.salary * 1.5 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error: Salary increase cannot exceed 50%!';
    END IF;

    -- Automatically update last_modified timestamp
    SET NEW.last_modified = NOW();
END$$

DELIMITER ;

-- Test valid update (✅ Works)
UPDATE employees SET salary = 80000 WHERE emp_id = 101;  -- 6.7% increase

-- Test invalid update (❌ Fails)
UPDATE employees SET salary = 50000 WHERE emp_id = 101;
-- Error: Salary cannot be decreased!

UPDATE employees SET salary = 150000 WHERE emp_id = 101;
-- Error: Salary increase cannot exceed 50%!
```

---

### Example 3: AFTER UPDATE Trigger - Audit Trail

```sql
-- Trigger to log all salary changes
DELIMITER $$

CREATE TRIGGER after_salary_update
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
    -- Only log if salary actually changed
    IF OLD.salary != NEW.salary THEN
        INSERT INTO salary_audit (
            emp_id,
            old_salary,
            new_salary,
            change_type,
            changed_by
        )
        VALUES (
            NEW.emp_id,
            OLD.salary,
            NEW.salary,
            'UPDATE',
            USER()
        );
    END IF;
END$$

DELIMITER ;

-- Test
UPDATE employees SET salary = 82000 WHERE emp_id = 101;

-- Check audit log
SELECT
    emp_id,
    old_salary,
    new_salary,
    new_salary - old_salary AS increase,
    ROUND((new_salary - old_salary) / old_salary * 100, 2) AS percent_increase,
    changed_by,
    change_date
FROM salary_audit
WHERE emp_id = 101
ORDER BY change_date DESC;
```

---

### Example 4: BEFORE DELETE Trigger - Archive Data

```sql
-- Create archive table
CREATE TABLE employees_archive (
    archive_id INT PRIMARY KEY AUTO_INCREMENT,
    emp_id INT,
    emp_name VARCHAR(100),
    department VARCHAR(50),
    salary DECIMAL(10,2),
    hire_date DATE,
    deleted_by VARCHAR(50),
    deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger to archive before deletion
DELIMITER $$

CREATE TRIGGER before_employee_delete
BEFORE DELETE ON employees
FOR EACH ROW
BEGIN
    INSERT INTO employees_archive (
        emp_id, emp_name, department, salary, hire_date, deleted_by
    )
    VALUES (
        OLD.emp_id,
        OLD.emp_name,
        OLD.department,
        OLD.salary,
        OLD.hire_date,
        USER()
    );
END$$

DELIMITER ;

-- Test deletion
DELETE FROM employees WHERE emp_id = 101;

-- Check archive (data preserved!)
SELECT * FROM employees_archive;
```

---

### Example 5: BEFORE INSERT Trigger - Auto-Generate Values

```sql
-- Trigger to auto-generate employee code
DELIMITER $$

CREATE TRIGGER before_employee_insert
BEFORE INSERT ON employees
FOR EACH ROW
BEGIN
    DECLARE dept_code VARCHAR(3);
    DECLARE emp_count INT;

    -- Get department code
    SET dept_code = CASE NEW.department
        WHEN 'IT' THEN 'IT'
        WHEN 'HR' THEN 'HR'
        WHEN 'Finance' THEN 'FIN'
        ELSE 'GEN'
    END;

    -- Count existing employees in department
    SELECT COUNT(*) + 1 INTO emp_count
    FROM employees
    WHERE department = NEW.department;

    -- Generate employee code (e.g., IT-001, HR-002)
    SET NEW.emp_code = CONCAT(dept_code, '-', LPAD(emp_count, 3, '0'));
END$$

DELIMITER ;

-- Test
INSERT INTO employees (emp_name, department, salary)
VALUES ('Bob Smith', 'IT', 70000);

SELECT emp_id, emp_name, emp_code, department FROM employees;
```

**Output:**

```
+--------+-----------+----------+------------+
| emp_id | emp_name  | emp_code | department |
+--------+-----------+----------+------------+
|    102 | Bob Smith | IT-001   | IT         |
+--------+-----------+----------+------------+
```

---

### Example 6: Multiple Triggers on Same Table

```sql
-- You can have multiple triggers for the same event
-- Execution order: Alphabetical by trigger name

DELIMITER $$

-- First trigger (alphabetically)
CREATE TRIGGER a_validate_employee
BEFORE INSERT ON employees
FOR EACH ROW
BEGIN
    IF NEW.salary < 30000 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Salary must be at least $30,000';
    END IF;
END$$

-- Second trigger (alphabetically after 'a_')
CREATE TRIGGER b_set_defaults
BEFORE INSERT ON employees
FOR EACH ROW
BEGIN
    IF NEW.hire_date IS NULL THEN
        SET NEW.hire_date = CURDATE();
    END IF;
END$$

DELIMITER ;
```

---

### Example 7: Managing Triggers

```sql
-- Show all triggers in database
SHOW TRIGGERS;

-- Show triggers for specific table
SHOW TRIGGERS WHERE `Table` = 'employees';

-- View trigger definition
SHOW CREATE TRIGGER after_employee_insert;

-- Drop a trigger
DROP TRIGGER IF EXISTS after_employee_insert;

-- Check trigger details in information_schema
SELECT
    TRIGGER_NAME,
    EVENT_MANIPULATION,
    EVENT_OBJECT_TABLE,
    ACTION_TIMING,
    ACTION_STATEMENT
FROM information_schema.TRIGGERS
WHERE TRIGGER_SCHEMA = 'your_database';
```

---

## 🔍 Things to Consider

<div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid #8B5CF6; padding: 20px; border-radius: 8px; margin: 20px 0;">

### Important Points

**Performance Implications:**

- ✓ Triggers add overhead to INSERT/UPDATE/DELETE operations
- ✓ Complex triggers can significantly slow down data modifications
- ✓ Cascading triggers (trigger calling trigger) can cause performance issues
- ✓ Use BEFORE triggers for validation, AFTER triggers for logging

**Best Practices:**

- ✓ Keep trigger logic simple and fast
- ✓ Avoid complex calculations or external calls in triggers
- ✓ Use naming convention: `[timing]_[table]_[event]` (e.g., `after_employees_insert`)
- ✓ Document what each trigger does
- ✓ Test trigger behavior thoroughly

**When to Use Triggers:**

- ✓ Audit logging (track all data changes)
- ✓ Data validation (enforce business rules)
- ✓ Automatic calculations (derived columns)
- ✓ Maintain denormalized data
- ✓ Archive deleted data

**Alternatives to Consider:**

- ✓ **Application layer**: For complex business logic
- ✓ **Stored procedures**: For manual execution control
- ✓ **Check constraints**: For simple validation
- ✓ **Foreign keys with CASCADE**: For referential integrity

</div>

---

## ⚠️ Common Mistakes

<div style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid #EF4444; padding: 20px; border-radius: 8px; margin: 20px 0;">

### What to Avoid

❌ **Don't:** Modify the same table in trigger (causes recursion)

```sql
-- ❌ Infinite loop!
CREATE TRIGGER bad_trigger
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
    UPDATE employees SET salary = salary * 1.1;  -- Triggers itself again!
END;
```

❌ **Don't:** Use COMMIT/ROLLBACK in triggers

```sql
-- ❌ Not allowed in triggers
CREATE TRIGGER bad_commit
AFTER INSERT ON employees
FOR EACH ROW
BEGIN
    INSERT INTO audit_log VALUES (...);
    COMMIT;  -- Error: Explicit or implicit commit not allowed
END;
```

❌ **Don't:** Create overly complex triggers

```sql
-- ❌ Too complex, hard to debug
CREATE TRIGGER complex_trigger
BEFORE UPDATE ON employees
FOR EACH ROW
BEGIN
    -- 50 lines of complex business logic
    -- Multiple nested IF statements
    -- Calling other procedures
    -- This should be in application layer or stored procedure
END;
```

✅ **Do:** Keep triggers focused and simple

```sql
-- ✅ Simple, clear purpose
CREATE TRIGGER log_salary_change
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
    IF OLD.salary != NEW.salary THEN
        INSERT INTO salary_audit (emp_id, old_sal, new_sal)
        VALUES (NEW.emp_id, OLD.salary, NEW.salary);
    END IF;
END;
```

✅ **Do:** Use SIGNAL for validation errors

```sql
-- ✅ Clear error messages
CREATE TRIGGER validate_salary
BEFORE INSERT ON employees
FOR EACH ROW
BEGIN
    IF NEW.salary < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Salary cannot be negative';
    END IF;
END;
```

✅ **Do:** Document trigger purpose

```sql
-- ✅ Well-documented
-- Purpose: Prevent salary decreases and log all changes
-- Created: 2025-11-26
-- Author: Team Lead
CREATE TRIGGER protect_salary_decrease
BEFORE UPDATE ON employees
FOR EACH ROW
BEGIN
    -- Business rule: Salaries can only increase
    IF NEW.salary < OLD.salary THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Salary decrease not allowed';
    END IF;
END;
```

</div>

---

## ✅ Key Takeaways

<div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(74, 222, 128, 0.15)); border: 1px solid rgba(34, 197, 94, 0.3); padding: 24px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #22C55E;">

1. **Automatic Execution:** Triggers fire automatically on INSERT/UPDATE/DELETE - cannot be called manually
2. **Timing:** BEFORE triggers for validation/modification, AFTER triggers for logging/notifications
3. **OLD and NEW:** Access previous (OLD) and new (NEW) row values in triggers
4. **Six Types:** BEFORE/AFTER combined with INSERT/UPDATE/DELETE = 6 trigger types
5. **Performance:** Triggers add overhead to DML operations - keep them simple and fast
6. **Use Cases:** Best for audit logging, data validation, automatic calculations, archiving data

</div>

---

## 🎓 Interview Tips

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3B82F6; padding: 20px; border-radius: 8px; margin: 20px 0;">

### How to Answer in an Interview

**Good Answer:**
"A trigger is a database object that automatically executes SQL code in response to INSERT, UPDATE, or DELETE events on a table. Unlike stored procedures which are called manually, triggers fire automatically when the triggering event occurs.

**Key characteristics:**

1. **Timing**: BEFORE (for validation) or AFTER (for logging)
2. **Events**: INSERT, UPDATE, or DELETE
3. **Access to data**:
   - NEW keyword for new row values (INSERT, UPDATE)
   - OLD keyword for old row values (UPDATE, DELETE)

**Common use cases:**

- **Audit logging**: Track all salary changes automatically
- **Data validation**: Prevent negative salaries or unauthorized changes
- **Automatic calculations**: Update derived fields like `total_price`
- **Archive deleted data**: Move deleted records to archive table

**Example**: When an employee's salary is updated, an AFTER UPDATE trigger automatically logs the change to an audit table without any manual code:

```sql
CREATE TRIGGER log_salary_changes
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
    IF OLD.salary != NEW.salary THEN
        INSERT INTO salary_audit VALUES (NEW.emp_id, OLD.salary, NEW.salary, NOW());
    END IF;
END;
```

**Important considerations:**

- Triggers add performance overhead
- Keep trigger logic simple
- Cannot use COMMIT/ROLLBACK inside triggers
- Avoid modifying the same table (causes recursion)"

**Follow-up Questions to Expect:**

**Q: What's the difference between BEFORE and AFTER triggers?**
_Answer:_

- **BEFORE**: Executes before the data change, can modify NEW values or prevent the operation using SIGNAL
- **AFTER**: Executes after the data change, used for logging and notifications, cannot modify NEW values

**Q: Can you call a trigger manually like a stored procedure?**
_Answer:_ No, triggers are automatic. They only fire when their associated event (INSERT/UPDATE/DELETE) occurs. You cannot CALL a trigger directly.

**Q: What are OLD and NEW in triggers?**
_Answer:_

- **NEW**: New row values (available in INSERT and UPDATE triggers)
- **OLD**: Old row values (available in UPDATE and DELETE triggers)
- **INSERT**: Only NEW available
- **UPDATE**: Both OLD and NEW available
- **DELETE**: Only OLD available

**Q: What happens if you have multiple triggers on the same table?**
_Answer:_ MySQL executes triggers in alphabetical order by trigger name. For example, `a_validate_data` executes before `b_log_changes`. It's good practice to use prefixes to control execution order.

**Q: When should you NOT use triggers?**
_Answer:_

- Complex business logic (use stored procedures or application layer)
- When you need explicit transaction control
- When debugging is difficult (triggers are "invisible" to applications)
- When performance is critical (triggers add overhead)

</div>

---

## 🧪 Practice Exercises

<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #F59E0B; padding: 20px; border-radius: 8px; margin: 20px 0;">

### Exercise 1: Email Change Notification

Create a trigger that logs email changes and prevents empty emails.

```sql
-- Your solution here
```

<details>
<summary>💡 Solution</summary>

```sql
-- Create email change log table
CREATE TABLE email_change_log (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    emp_id INT,
    old_email VARCHAR(100),
    new_email VARCHAR(100),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create trigger
DELIMITER $$

CREATE TRIGGER track_email_changes
BEFORE UPDATE ON employees
FOR EACH ROW
BEGIN
    -- Prevent empty emails
    IF NEW.email IS NULL OR NEW.email = '' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Email cannot be empty';
    END IF;

    -- Log email changes
    IF OLD.email != NEW.email THEN
        INSERT INTO email_change_log (emp_id, old_email, new_email)
        VALUES (NEW.emp_id, OLD.email, NEW.email);
    END IF;
END$$

DELIMITER ;
```

</details>

---

### Exercise 2: Inventory Stock Management

Create triggers to prevent negative stock and log all inventory changes.

```sql
-- Your solution here
```

<details>
<summary>💡 Solution</summary>

```sql
-- Create inventory table
CREATE TABLE inventory (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100),
    stock_quantity INT,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create inventory log
CREATE TABLE inventory_log (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    old_quantity INT,
    new_quantity INT,
    change_amount INT,
    action_type VARCHAR(20),
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BEFORE UPDATE trigger: Prevent negative stock
DELIMITER $$

CREATE TRIGGER prevent_negative_stock
BEFORE UPDATE ON inventory
FOR EACH ROW
BEGIN
    IF NEW.stock_quantity < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Stock quantity cannot be negative';
    END IF;

    SET NEW.last_updated = NOW();
END$$

-- AFTER UPDATE trigger: Log changes
CREATE TRIGGER log_inventory_changes
AFTER UPDATE ON inventory
FOR EACH ROW
BEGIN
    IF OLD.stock_quantity != NEW.stock_quantity THEN
        INSERT INTO inventory_log (
            product_id,
            old_quantity,
            new_quantity,
            change_amount,
            action_type
        )
        VALUES (
            NEW.product_id,
            OLD.stock_quantity,
            NEW.stock_quantity,
            NEW.stock_quantity - OLD.stock_quantity,
            IF(NEW.stock_quantity > OLD.stock_quantity, 'RESTOCK', 'SALE')
        );
    END IF;
END$$

DELIMITER ;
```

</details>

---

### Exercise 3: Auto-Calculate Age

Create a trigger that automatically calculates and updates employee age based on birth_date.

```sql
-- Your solution here
```

<details>
<summary>💡 Solution</summary>

```sql
-- Add birth_date and age columns
ALTER TABLE employees
ADD COLUMN birth_date DATE,
ADD COLUMN age INT;

-- BEFORE INSERT trigger
DELIMITER $$

CREATE TRIGGER calculate_age_on_insert
BEFORE INSERT ON employees
FOR EACH ROW
BEGIN
    IF NEW.birth_date IS NOT NULL THEN
        SET NEW.age = TIMESTAMPDIFF(YEAR, NEW.birth_date, CURDATE());
    END IF;
END$$

-- BEFORE UPDATE trigger
CREATE TRIGGER calculate_age_on_update
BEFORE UPDATE ON employees
FOR EACH ROW
BEGIN
    IF NEW.birth_date IS NOT NULL THEN
        SET NEW.age = TIMESTAMPDIFF(YEAR, NEW.birth_date, CURDATE());
    END IF;
END$$

DELIMITER ;

-- Test
INSERT INTO employees (emp_name, department, salary, birth_date)
VALUES ('John Doe', 'IT', 75000, '1990-05-15');

SELECT emp_name, birth_date, age FROM employees WHERE emp_name = 'John Doe';
-- Output: John Doe, 1990-05-15, 35
```

</details>

</div>

---

## 📚 Related Topics

- [Stored Procedures in MySQL](./beginner-13-stored-procedures-in-mysql.md) - Callable SQL code
- [Views in MySQL](./beginner-12-views-in-mysql.md) - Virtual tables
- [Constraints in MySQL](./beginner-constraints.md) - CHECK, FOREIGN KEY
- [Transactions in MySQL](./intermediate-transactions.md) - ACID properties
- [Event Scheduler](./advanced-event-scheduler.md) - Scheduled tasks

---

## 🏷️ Tags

`MySQL` `SQL` `Triggers` `Database Automation` `Audit Logging` `Data Validation` `Interview Questions`

<div style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid #EF4444; padding: 20px; border-radius: 8px; margin: 20px 0;">

### What to Avoid

❌ **Don't:** [Common mistake 1]

❌ **Don't:** [Common mistake 2]

✅ **Do:** [Correct approach]

</div>

---

## ✅ Key Takeaways

<div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(74, 222, 128, 0.15)); border: 1px solid rgba(34, 197, 94, 0.3); padding: 24px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #22C55E;">

1. **Main Concept:** A trigger is a database object that automatically executes in response to INSERT, UPDATE, or DELETE events on a table.
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

> "A trigger is a database object that automatically executes in response to INSERT, UPDATE, or DELETE events on a table."

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

```sql
-- Practice Problem:
-- [Add a related practice problem]
```

<details>
<summary>Click to see solution</summary>

```sql
-- Solution:
-- [Add solution]
```

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
