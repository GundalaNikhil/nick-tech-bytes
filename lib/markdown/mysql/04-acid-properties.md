# ACID Properties in MySQL - Database Transactions Explained

## Overview

ACID (Atomicity, Consistency, Isolation, Durability) is a set of properties that guarantee database transactions are processed reliably. Understanding ACID is essential for building robust, production-ready applications.

---

## What is ACID?

**ACID** is an acronym representing four key properties that ensure database transactions maintain data integrity even in the event of errors, power failures, or other unexpected issues.

### ACID Components

| Property            | Description                                                                                        |
| ------------------- | -------------------------------------------------------------------------------------------------- |
| **A - Atomicity**   | All or nothing. Either the entire transaction succeeds, or it all fails and rolls back.            |
| **C - Consistency** | Database remains in a valid state before and after the transaction. All constraints are satisfied. |
| **I - Isolation**   | Concurrent transactions don't interfere with each other. Each transaction runs independently.      |
| **D - Durability**  | Once committed, data persists even if the system crashes. Changes are permanent.                   |

---

## 1. Atomicity (A)

### All or Nothing Principle

**Atomicity** ensures that a transaction is treated as a single, indivisible unit. Either all operations succeed, or none of them do.

#### 💸 Bank Transfer Example

**Before Transaction:**
| Account | Balance |
|---------|---------|
| Account A | $1000 |
| Account B | $500 |

**Transaction:** Transfer $200 from A → B

**After Transaction:**
| Account | Balance | Change |
|---------|---------|--------|
| Account A | $800 | -$200 ✓ |
| Account B | $700 | +$200 ✓ |

> **Atomicity Guarantee:** If deducting from Account A succeeds but adding to Account B fails, the entire transaction rolls back. Money never disappears!

### Real-World Example

```sql
-- Banking transaction with atomicity
START TRANSACTION;

-- Step 1: Deduct from sender
UPDATE accounts
SET balance = balance - 200
WHERE account_id = 'A' AND balance >= 200;

-- Step 2: Add to receiver
UPDATE accounts
SET balance = balance + 200
WHERE account_id = 'B';

-- If both succeed, commit
COMMIT;

-- If any step fails, rollback
-- ROLLBACK;
```

**Without Atomicity:**

- Money could be deducted from Account A but never reach Account B
- Database would be in an inconsistent state
- Financial loss and data corruption

**With Atomicity (InnoDB):**

- Both operations succeed together, or both fail
- Database remains consistent
- No partial updates possible

---

## 2. Consistency (C)

### Data Integrity Rules

**Consistency** ensures that a transaction brings the database from one valid state to another valid state, maintaining all defined rules, constraints, and triggers.

### Consistency Enforcement

<table style="width: 100%; border-collapse: separate; border-spacing: 0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin: 20px 0;">
  <thead>
    <tr style="background: linear-gradient(135deg, #22C55E, #16A34A);">
      <th style="color: white; padding: 16px; text-align: left; font-weight: 600;">Constraint Type</th>
      <th style="color: white; padding: 16px; text-align: left; font-weight: 600;">Purpose</th>
      <th style="color: white; padding: 16px; text-align: left; font-weight: 600;">Example</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background-color: rgba(31, 41, 55, 0.3);">
      <td style="padding: 14px; font-weight: 600; color: #E5E7EB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">PRIMARY KEY</td>
      <td style="padding: 14px; color: #D1D5DB; font-size: 14px; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        Ensures unique identification
      </td>
      <td style="padding: 14px; font-size: 13px; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        <code style="background: rgba(71, 85, 105, 0.2); color: #D1D5DB; padding: 4px 8px; border-radius: 4px;">id INT PRIMARY KEY</code>
      </td>
    </tr>
    <tr style="background-color: rgba(17, 24, 39, 0.3);">
      <td style="padding: 14px; font-weight: 600; color: #E5E7EB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">FOREIGN KEY</td>
      <td style="padding: 14px; color: #D1D5DB; font-size: 14px; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        Maintains referential integrity
      </td>
      <td style="padding: 14px; font-size: 13px; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        <code style="background: rgba(71, 85, 105, 0.2); color: #D1D5DB; padding: 4px 8px; border-radius: 4px;">REFERENCES users(id)</code>
      </td>
    </tr>
    <tr style="background-color: rgba(31, 41, 55, 0.3);">
      <td style="padding: 14px; font-weight: 600; color: #E5E7EB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">UNIQUE</td>
      <td style="padding: 14px; color: #D1D5DB; font-size: 14px; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        Prevents duplicate values
      </td>
      <td style="padding: 14px; font-size: 13px; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        <code style="background: rgba(71, 85, 105, 0.2); color: #D1D5DB; padding: 4px 8px; border-radius: 4px;">email VARCHAR(100) UNIQUE</code>
      </td>
    </tr>
    <tr style="background-color: rgba(17, 24, 39, 0.3);">
      <td style="padding: 14px; font-weight: 600; color: #E5E7EB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">CHECK</td>
      <td style="padding: 14px; color: #D1D5DB; font-size: 14px; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        Validates data values
      </td>
      <td style="padding: 14px; font-size: 13px; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        <code style="background: rgba(71, 85, 105, 0.2); color: #D1D5DB; padding: 4px 8px; border-radius: 4px;">CHECK (age >= 18)</code>
      </td>
    </tr>
    <tr style="background-color: rgba(31, 41, 55, 0.3);">
      <td style="padding: 14px; font-weight: 600; color: #E5E7EB;">NOT NULL</td>
      <td style="padding: 14px; color: #D1D5DB; font-size: 14px;">
        Requires a value
      </td>
      <td style="padding: 14px; font-size: 13px;">
        <code style="background: rgba(71, 85, 105, 0.2); color: #D1D5DB; padding: 4px 8px; border-radius: 4px;">username VARCHAR(50) NOT NULL</code>
      </td>
    </tr>
  </tbody>
</table>

### Example: Consistency in Action

```sql
-- Create table with constraints
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT CHECK (age >= 18),
    balance DECIMAL(10,2) DEFAULT 0.00 CHECK (balance >= 0)
) ENGINE=InnoDB;

-- This transaction will FAIL (violates CHECK constraint)
START TRANSACTION;
UPDATE users SET balance = -100 WHERE id = 1;
-- Error: Check constraint violated
ROLLBACK;

-- This transaction will SUCCEED
START TRANSACTION;
UPDATE users SET balance = balance + 100 WHERE id = 1;
COMMIT;
```

---

## 3. Isolation (I)

### Concurrent Transaction Independence

**Isolation** ensures that concurrent execution of transactions leaves the database in the same state as if the transactions were executed sequentially.

### Isolation Levels

#### 🔒 MySQL Isolation Levels (Weakest → Strongest)

| Level | Name                                   | Description                                                        | Issues                                          |
| ----- | -------------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------- |
| **1** | **READ UNCOMMITTED**                   | Can read uncommitted changes from other transactions. Rarely used. | ⚠️ Dirty reads possible                         |
| **2** | **READ COMMITTED**                     | Only reads committed data.                                         | ⚠️ Non-repeatable reads possible                |
| **3** | **REPEATABLE READ** ⭐ (MySQL Default) | Consistent reads within transaction. Recommended.                  | ✓ Prevents dirty & non-repeatable reads         |
| **4** | **SERIALIZABLE**                       | Complete isolation. Transactions executed as if serial.            | ✓ Prevents all anomalies but lowest concurrency |

### Isolation Level Comparison

| Isolation Level        | Dirty Read  | Non-Repeatable Read | Phantom Read      | Performance |
| ---------------------- | ----------- | ------------------- | ----------------- | ----------- |
| **READ UNCOMMITTED**   | ✗ Possible  | ✗ Possible          | ✗ Possible        | Fastest     |
| **READ COMMITTED**     | ✓ Prevented | ✗ Possible          | ✗ Possible        | Fast        |
| **REPEATABLE READ** ⭐ | ✓ Prevented | ✓ Prevented         | ✓ InnoDB Prevents | Good        |
| **SERIALIZABLE**       | ✓ Prevented | ✓ Prevented         | ✓ Prevented       | Slowest     |

      </td>
      <td style="padding: 14px; text-align: center; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        <span style="background-color: #FED7AA; color: #FCD34D; padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: 600;">Good</span>
      </td>
    </tr>
    <tr style="background-color: rgba(17, 24, 39, 0.3);">
      <td style="padding: 14px; font-weight: 600; color: #E5E7EB;">SERIALIZABLE</td>
      <td style="padding: 14px; text-align: center;">
        <span style="background-color: #D1FAE5; color: #86EFAC; padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: 600;">✓ Prevented</span>
      </td>
      <td style="padding: 14px; text-align: center;">
        <span style="background-color: #D1FAE5; color: #86EFAC; padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: 600;">✓ Prevented</span>
      </td>
      <td style="padding: 14px; text-align: center;">
        <span style="background-color: #D1FAE5; color: #86EFAC; padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: 600;">✓ Prevented</span>
      </td>
      <td style="padding: 14px; text-align: center;">
        <span style="background-color: rgba(239, 68, 68, 0.2); color: #FCA5A5; padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: 600;">Slowest</span>
      </td>
    </tr>

  </tbody>
</table>

### Setting Isolation Level

```sql
-- Global level (affects all new sessions)
SET GLOBAL transaction_isolation = 'REPEATABLE-READ';

-- Session level (affects current session only)
SET SESSION transaction_isolation = 'READ-COMMITTED';

-- Check current isolation level
SELECT @@transaction_isolation;
SELECT @@global.transaction_isolation;
```

---

## 4. Durability (D)

### Permanent Data Persistence

**Durability** guarantees that once a transaction is committed, it remains committed even in the event of system crashes, power failures, or errors.

### InnoDB Durability Mechanisms

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 30px 0;">
  
  <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(168, 85, 247, 0.15)); border: 1px solid rgba(139, 92, 246, 0.3); padding: 24px; border-radius: 12px; border-left: 4px solid #8B5CF6; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <h4 style="color: #C4B5FD; margin: 0 0 12px 0;">📝 Redo Logs</h4>
    <p style="color: #D1D5DB; margin: 0 0 12px 0; font-size: 14px; line-height: 1.6;">
      Records all changes before they're written to data files. Used for crash recovery to replay committed transactions.
    </p>
    <code style="background: rgba(139, 92, 246, 0.15); color: #C4B5FD; padding: 6px 10px; border-radius: 4px; font-size: 12px;">ib_logfile0, ib_logfile1</code>
  </div>

  <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(96, 165, 250, 0.15)); border: 1px solid rgba(59, 130, 246, 0.3); padding: 24px; border-radius: 12px; border-left: 4px solid #3B82F6; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <h4 style="color: #93C5FD; margin: 0 0 12px 0;">↩️ Undo Logs</h4>
    <p style="color: #D1D5DB; margin: 0 0 12px 0; font-size: 14px; line-height: 1.6;">
      Stores old versions of modified rows. Enables ROLLBACK and MVCC for consistent reads during transactions.
    </p>
    <code style="background: rgba(59, 130, 246, 0.15); color: #93C5FD; padding: 6px 10px; border-radius: 4px; font-size: 12px;">Stored in tablespace</code>
  </div>

  <div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(74, 222, 128, 0.15)); border: 1px solid rgba(34, 197, 94, 0.3); padding: 24px; border-radius: 12px; border-left: 4px solid #22C55E; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <h4 style="color: #86EFAC; margin: 0 0 12px 0;">💾 Doublewrite Buffer</h4>
    <p style="color: #D1D5DB; margin: 0 0 12px 0; font-size: 14px; line-height: 1.6;">
      Writes pages to doublewrite buffer before writing to actual data files. Prevents partial page writes.
    </p>
    <code style="background: rgba(34, 197, 94, 0.15); color: #86EFAC; padding: 6px 10px; border-radius: 4px; font-size: 12px;">innodb_doublewrite = ON</code>
  </div>

</div>

### Durability Flow Diagram

#### 💾 Write Path: COMMIT → Permanent Storage

1. **Transaction COMMIT issued** - Application calls COMMIT
2. **Redo log written to disk** - Write-ahead logging (WAL)
3. **Transaction committed** - Return success to application
4. **Dirty pages flushed (background)** - Written from buffer pool to .ibd files

> **🔑 Key Point:** COMMIT returns immediately after redo log is written (step 2-3). Actual data file writes happen asynchronously in the background. This provides both durability and performance!

---

## ACID in InnoDB - Putting It All Together

### Transaction Example

```sql
-- Enable autocommit (default in MySQL)
SET autocommit = 1;

-- Start an explicit transaction
START TRANSACTION;

-- Atomicity: All or nothing
UPDATE inventory SET quantity = quantity - 1 WHERE product_id = 101;
INSERT INTO orders (user_id, product_id, quantity) VALUES (1, 101, 1);
UPDATE users SET balance = balance - 99.99 WHERE user_id = 1;

-- Consistency: All constraints checked
-- - inventory.quantity won't go negative (CHECK constraint)
-- - orders.user_id references valid user (FOREIGN KEY)
-- - users.balance won't go negative (CHECK constraint)

-- Isolation: Other transactions don't see uncommitted changes
-- (unless READ UNCOMMITTED level)

-- Commit the transaction
COMMIT;

-- Durability: Changes persisted even if server crashes now
-- Redo logs ensure recovery
```

### Transaction Rollback Example

```sql
START TRANSACTION;

UPDATE accounts SET balance = balance - 500 WHERE id = 1;

-- Oh no! Check if sufficient balance
SELECT balance FROM accounts WHERE id = 1;
-- Result: -100 (went negative!)

-- Rollback to undo all changes in this transaction
ROLLBACK;

-- Balance restored to original value
SELECT balance FROM accounts WHERE id = 1;
```

---

## Common Transaction Patterns

### Pattern 1: Safe Money Transfer

```sql
DELIMITER $$

CREATE PROCEDURE transfer_money(
    IN from_account INT,
    IN to_account INT,
    IN amount DECIMAL(10,2)
)
BEGIN
    DECLARE sender_balance DECIMAL(10,2);

    -- Start transaction
    START TRANSACTION;

    -- Check sender balance
    SELECT balance INTO sender_balance
    FROM accounts
    WHERE id = from_account
    FOR UPDATE; -- Lock the row

    -- Validate sufficient funds
    IF sender_balance < amount THEN
        ROLLBACK;
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Insufficient funds';
    ELSE
        -- Deduct from sender
        UPDATE accounts
        SET balance = balance - amount
        WHERE id = from_account;

        -- Add to receiver
        UPDATE accounts
        SET balance = balance + amount
        WHERE id = to_account;

        -- All good, commit
        COMMIT;
    END IF;
END$$

DELIMITER ;

-- Usage
CALL transfer_money(1, 2, 100.00);
```

### Pattern 2: Order Processing

```sql
START TRANSACTION;

-- 1. Check inventory
SELECT quantity INTO @stock
FROM inventory
WHERE product_id = 101
FOR UPDATE;

IF @stock < 1 THEN
    ROLLBACK;
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Out of stock';
ELSE
    -- 2. Reduce inventory
    UPDATE inventory
    SET quantity = quantity - 1
    WHERE product_id = 101;

    -- 3. Create order
    INSERT INTO orders (user_id, product_id, price)
    VALUES (1, 101, 99.99);

    -- 4. Update user spending
    UPDATE users
    SET total_spent = total_spent + 99.99
    WHERE id = 1;

    COMMIT;
END IF;
```

---

## Best Practices

### DO's and DON'Ts

<div style="display: grid; grid-template-columns: 1fr; gap: 16px; margin: 30px 0;">
  
  <div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(74, 222, 128, 0.15)); border: 1px solid rgba(34, 197, 94, 0.3); padding: 20px; border-radius: 10px; border-left: 4px solid #22C55E;">
    <h4 style="color: #86EFAC; margin: 0 0 8px 0;">✅ DO: Keep Transactions Short</h4>
    <p style="color: #D1D5DB; margin: 0; font-size: 14px; line-height: 1.6;">
      Long-running transactions hold locks and prevent other transactions from proceeding. Keep them as short as possible.
    </p>
  </div>

  <div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(74, 222, 128, 0.15)); border: 1px solid rgba(34, 197, 94, 0.3); padding: 20px; border-radius: 10px; border-left: 4px solid #22C55E;">
    <h4 style="color: #86EFAC; margin: 0 0 8px 0;">✅ DO: Use REPEATABLE READ (Default)</h4>
    <p style="color: #D1D5DB; margin: 0; font-size: 14px; line-height: 1.6;">
      MySQL's default isolation level provides excellent balance between consistency and performance for most applications.
    </p>
  </div>

  <div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(74, 222, 128, 0.15)); border: 1px solid rgba(34, 197, 94, 0.3); padding: 20px; border-radius: 10px; border-left: 4px solid #22C55E;">
    <h4 style="color: #86EFAC; margin: 0 0 8px 0;">✅ DO: Handle Rollback in Error Cases</h4>
    <p style="color: #D1D5DB; margin: 0; font-size: 14px; line-height: 1.6;">
      Always include error handling to ROLLBACK transactions when operations fail. Don't leave transactions hanging.
    </p>
  </div>

  <div style="background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(248, 113, 113, 0.15)); border: 1px solid rgba(239, 68, 68, 0.3); padding: 20px; border-radius: 10px; border-left: 4px solid #EF4444;">
    <h4 style="color: #FCA5A5; margin: 0 0 8px 0;">❌ DON'T: Include User Interaction in Transactions</h4>
    <p style="color: #D1D5DB; margin: 0; font-size: 14px; line-height: 1.6;">
      Never wait for user input while a transaction is active. This causes long-held locks and poor performance.
    </p>
  </div>

  <div style="background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(248, 113, 113, 0.15)); border: 1px solid rgba(239, 68, 68, 0.3); padding: 20px; border-radius: 10px; border-left: 4px solid #EF4444;">
    <h4 style="color: #FCA5A5; margin: 0 0 8px 0;">❌ DON'T: Use SERIALIZABLE Unless Necessary</h4>
    <p style="color: #D1D5DB; margin: 0; font-size: 14px; line-height: 1.6;">
      SERIALIZABLE isolation level severely reduces concurrency. Only use it when absolutely required for data consistency.
    </p>
  </div>

  <div style="background: linear-gradient(135deg, #FED7AA, #FDBA74); padding: 20px; border-radius: 10px; border-left: 4px solid #F97316;">
    <h4 style="color: #EA580C; margin: 0 0 8px 0;">⚠️ WARNING: Deadlocks Can Happen</h4>
    <p style="color: #D1D5DB; margin: 0; font-size: 14px; line-height: 1.6;">
      InnoDB automatically detects deadlocks and rolls back one transaction. Always retry failed transactions in your application logic.
    </p>
  </div>

</div>

---

## Summary

### Quick Reference

<div style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(79, 70, 229, 0.1)); padding: 24px; border-radius: 12px; margin: 30px 0; border-left: 4px solid rgba(99, 102, 241, 0.5);">
  <h4 style="color: #A5B4FC; margin: 0 0 16px 0;">📌 ACID Quick Summary</h4>
  <ul style="color: #D1D5DB; margin: 0; font-size: 14px; line-height: 2;">
    <li><strong style="color: #F3F4F6;">Atomicity:</strong> All or nothing - complete success or complete rollback</li>
    <li><strong style="color: #F3F4F6;">Consistency:</strong> Database moves from one valid state to another</li>
    <li><strong style="color: #F3F4F6;">Isolation:</strong> Concurrent transactions don't interfere (4 levels available)</li>
    <li><strong style="color: #F3F4F6;">Durability:</strong> Committed data persists even after crashes (redo logs)</li>
    <li><strong style="color: #F3F4F6;">InnoDB</strong> is fully ACID-compliant (MyISAM is NOT)</li>
    <li><strong style="color: #F3F4F6;">Default isolation:</strong> REPEATABLE READ (excellent for most use cases)</li>
    <li><strong style="color: #F3F4F6;">Transaction commands:</strong> START TRANSACTION, COMMIT, ROLLBACK</li>
    <li><strong style="color: #F3F4F6;">Always use transactions</strong> for operations that must complete together</li>
  </ul>
</div>

---

## Next Steps

In the next tutorial, we'll explore **MySQL Data Types** and learn how to choose the right type for optimal storage and performance.

**Related Topics:**

- Transaction Management
- InnoDB Locking Mechanisms
- Deadlock Detection
- Performance Optimization
