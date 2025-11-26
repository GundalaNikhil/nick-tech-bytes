# Different Tablespaces in MySQL

## 🎯 Question & Objective

**Question:** What are the different tablespaces in MySQL?

**Aim:** Understand what tablespaces are, their types, and how MySQL uses them to organize and store data physically on disk.

---

## 📚 Simple Explanation (ELI10 - Explain Like I'm 10)

### Real-Life Analogy

Imagine your school has different **storage buildings** 🏢:

1. **Main Building Storage** - Shared storage where all classes keep common supplies
2. **Individual Class Storage** - Each classroom has its own small storage cabinet
3. **Temporary Storage** - A temporary shed for items that will be thrown away soon
4. **Undo Storage** - A lost-and-found room where you can retrieve items you accidentally threw away

**Tablespaces are like these storage buildings for your database data!**

Each tablespace is a physical storage location where MySQL keeps your tables' data and indexes.

---

## 🎨 Visual Representation

<div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(96, 165, 250, 0.15)); border: 1px solid rgba(59, 130, 246, 0.3); padding: 24px; border-radius: 12px; margin: 20px 0;">

### MySQL Tablespace Architecture

<div style="display: flex; flex-direction: column; gap: 20px; margin: 20px 0;">
  
  <div style="background: rgba(139, 92, 246, 0.2); padding: 20px; border-radius: 10px; border-left: 4px solid #8B5CF6;">
    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
      <div style="font-size: 30px;">🌐</div>
      <strong style="color: #C4B5FD; font-size: 18px;">System Tablespace</strong>
    </div>
    <p style="color: #D1D5DB; margin: 0; font-size: 13px;">Shared storage for system data, data dictionary, undo logs</p>
    <code style="background: rgba(31, 41, 55, 0.5); color: #93C5FD; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-top: 8px; display: block;">ibdata1</code>
  </div>

  <div style="background: rgba(34, 197, 94, 0.2); padding: 20px; border-radius: 10px; border-left: 4px solid #22C55E;">
    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
      <div style="font-size: 30px;">📁</div>
      <strong style="color: #86EFAC; font-size: 18px;">File-per-Table Tablespace</strong>
    </div>
    <p style="color: #D1D5DB; margin: 0; font-size: 13px;">Each InnoDB table gets its own .ibd file</p>
    <code style="background: rgba(31, 41, 55, 0.5); color: #86EFAC; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-top: 8px; display: block;">tablename.ibd</code>
  </div>

  <div style="background: rgba(251, 146, 60, 0.2); padding: 20px; border-radius: 10px; border-left: 4px solid #FB923C;">
    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
      <div style="font-size: 30px;">🔄</div>
      <strong style="color: #FDBA74; font-size: 18px;">General Tablespace</strong>
    </div>
    <p style="color: #D1D5DB; margin: 0; font-size: 13px;">Shared custom tablespace for multiple tables</p>
    <code style="background: rgba(31, 41, 55, 0.5); color: #FB923C; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-top: 8px; display: block;">CREATE TABLESPACE ts1</code>
  </div>

  <div style="background: rgba(236, 72, 153, 0.2); padding: 20px; border-radius: 10px; border-left: 4px solid #EC4899;">
    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
      <div style="font-size: 30px;">↩️</div>
      <strong style="color: #F9A8D4; font-size: 18px;">Undo Tablespace</strong>
    </div>
    <p style="color: #D1D5DB; margin: 0; font-size: 13px;">Stores undo logs for transaction rollback</p>
    <code style="background: rgba(31, 41, 55, 0.5); color: #F472B6; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-top: 8px; display: block;">undo_001, undo_002</code>
  </div>

  <div style="background: rgba(245, 158, 11, 0.2); padding: 20px; border-radius: 10px; border-left: 4px solid #F59E0B;">
    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
      <div style="font-size: 30px;">⏱️</div>
      <strong style="color: #FCD34D; font-size: 18px;">Temporary Tablespace</strong>
    </div>
    <p style="color: #D1D5DB; margin: 0; font-size: 13px;">For temporary tables and internal operations</p>
    <code style="background: rgba(31, 41, 55, 0.5); color: #FBBF24; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-top: 8px; display: block;">ibtmp1</code>
  </div>

</div>

</div>

---

## 📋 Types of Tablespaces in Detail

<div style="background: rgba(31, 41, 55, 0.5); padding: 24px; border-radius: 12px; margin: 20px 0;">

### 1️⃣ System Tablespace (ibdata1)

<div style="background: rgba(139, 92, 246, 0.1); padding: 16px; border-radius: 8px; margin: 10px 0;">

**What it stores:**
- InnoDB data dictionary
- Double-write buffer
- Change buffer
- Undo logs (in older MySQL versions)

**File:** `ibdata1` (and `ibdata2`, `ibdata3` if configured)

**Characteristics:**
- ✓ Shared across all InnoDB tables
- ✓ Never shrinks automatically
- ✓ Critical for MySQL operation

</div>

### 2️⃣ File-per-Table Tablespace (.ibd)

<div style="background: rgba(34, 197, 94, 0.1); padding: 16px; border-radius: 8px; margin: 10px 0;">

**What it stores:**
- Data and indexes for a single InnoDB table

**File:** `database_name/table_name.ibd`

**Characteristics:**
- ✓ **Default since MySQL 5.6**
- ✓ Each table has its own file
- ✓ Easier to manage disk space
- ✓ Can reclaim space when table is dropped
- ✓ Easier backup and restore per table

**Enable/Disable:**
```sql
SET GLOBAL innodb_file_per_table = ON;  -- Enable (default)
SET GLOBAL innodb_file_per_table = OFF; -- Disable
```

</div>

### 3️⃣ General Tablespace

<div style="background: rgba(251, 146, 60, 0.1); padding: 16px; border-radius: 8px; margin: 10px 0;">

**What it stores:**
- Multiple InnoDB tables in a custom shared tablespace

**Use case:**
- Group related tables together
- Better control over data placement

**Create and use:**
```sql
-- Create a general tablespace
CREATE TABLESPACE ts_data
ADD DATAFILE 'ts_data.ibd'
ENGINE=InnoDB;

-- Create table in the tablespace
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(100)
) TABLESPACE ts_data;
```

</div>

### 4️⃣ Undo Tablespace

<div style="background: rgba(236, 72, 153, 0.1); padding: 16px; border-radius: 8px; margin: 10px 0;">

**What it stores:**
- Undo logs for transaction rollback
- Old versions of modified rows (for MVCC)

**Files:** `undo_001`, `undo_002`

**Characteristics:**
- ✓ Supports transaction rollback
- ✓ Enables consistent reads
- ✓ Can be dynamically resized in MySQL 8.0+

**Configuration:**
```sql
-- View undo tablespaces
SELECT * FROM INFORMATION_SCHEMA.INNODB_TABLESPACES 
WHERE NAME LIKE 'undo%';
```

</div>

### 5️⃣ Temporary Tablespace

<div style="background: rgba(245, 158, 11, 0.1); padding: 16px; border-radius: 8px; margin: 10px 0;">

**What it stores:**
- Temporary tables created during query execution
- Internal temporary tables for sorting, grouping

**Files:**
- `ibtmp1` (session temporary tablespace)
- `temp_*.ibt` (global temporary tablespace in MySQL 8.0+)

**Characteristics:**
- ✓ Automatically managed
- ✓ Recreated on server restart
- ✓ Used for complex queries requiring temporary storage

</div>

</div>

---

## 🔍 Comparison Table

<table style="width: 100%; border-collapse: separate; border-spacing: 0; border-radius: 12px; overflow: hidden; margin: 20px 0;">
  <thead>
    <tr style="background: linear-gradient(135deg, #0EA5E9, #6366F1);">
      <th style="color: white; padding: 16px; text-align: left;">Tablespace Type</th>
      <th style="color: white; padding: 16px; text-align: left;">File Name</th>
      <th style="color: white; padding: 16px; text-align: left;">Purpose</th>
      <th style="color: white; padding: 16px; text-align: left;">Shared/Dedicated</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background-color: rgba(31, 41, 55, 0.3);">
      <td style="padding: 16px; color: #C4B5FD; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        <strong>System</strong>
      </td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        <code style="background: rgba(55, 65, 81, 0.5); padding: 2px 6px; border-radius: 4px;">ibdata1</code>
      </td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        System data, dictionary
      </td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        Shared
      </td>
    </tr>
    <tr style="background-color: rgba(17, 24, 39, 0.3);">
      <td style="padding: 16px; color: #86EFAC; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        <strong>File-per-Table</strong>
      </td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        <code style="background: rgba(55, 65, 81, 0.5); padding: 2px 6px; border-radius: 4px;">table.ibd</code>
      </td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        Single table data
      </td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        Dedicated
      </td>
    </tr>
    <tr style="background-color: rgba(31, 41, 55, 0.3);">
      <td style="padding: 16px; color: #FDBA74; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        <strong>General</strong>
      </td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        <code style="background: rgba(55, 65, 81, 0.5); padding: 2px 6px; border-radius: 4px;">custom.ibd</code>
      </td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        Multiple tables
      </td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        Shared (custom)
      </td>
    </tr>
    <tr style="background-color: rgba(17, 24, 39, 0.3);">
      <td style="padding: 16px; color: #F9A8D4; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        <strong>Undo</strong>
      </td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        <code style="background: rgba(55, 65, 81, 0.5); padding: 2px 6px; border-radius: 4px;">undo_001</code>
      </td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        Transaction rollback
      </td>
      <td style="padding: 16px; color: #D1D5DB; border-bottom: 1px solid rgba(75, 85, 99, 0.3);">
        Shared
      </td>
    </tr>
    <tr style="background-color: rgba(31, 41, 55, 0.3);">
      <td style="padding: 16px; color: #FCD34D;">
        <strong>Temporary</strong>
      </td>
      <td style="padding: 16px; color: #D1D5DB;">
        <code style="background: rgba(55, 65, 81, 0.5); padding: 2px 6px; border-radius: 4px;">ibtmp1</code>
      </td>
      <td style="padding: 16px; color: #D1D5DB;">
        Temp tables, sorting
      </td>
      <td style="padding: 16px; color: #D1D5DB;">
        Shared
      </td>
    </tr>
  </tbody>
</table>

---

## 💻 Practical Examples

### Check Current Tablespace Configuration

```sql
-- Check file-per-table setting
SHOW VARIABLES LIKE 'innodb_file_per_table';

-- View all tablespaces
SELECT * FROM INFORMATION_SCHEMA.INNODB_TABLESPACES;

-- Check tablespace for a specific table
SELECT 
    NAME, 
    SPACE_TYPE, 
    FILE_SIZE/1024/1024 AS size_mb
FROM INFORMATION_SCHEMA.INNODB_TABLESPACES
WHERE NAME LIKE '%users%';
```

### Create Table in Different Tablespaces

```sql
-- 1. Create in default file-per-table
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(100)
);
-- File: database_name/products.ibd

-- 2. Create general tablespace
CREATE TABLESPACE ecommerce_ts
ADD DATAFILE 'ecommerce_ts.ibd'
ENGINE=InnoDB;

-- 3. Create table in general tablespace
CREATE TABLE orders (
    id INT PRIMARY KEY,
    product_id INT,
    quantity INT
) TABLESPACE ecommerce_ts;

-- 4. Move existing table to general tablespace
ALTER TABLE products TABLESPACE ecommerce_ts;
```

### Monitor Tablespace Usage

```sql
-- Check system tablespace size
SELECT 
    FILE_NAME, 
    TABLESPACE_NAME,
    FILE_SIZE/1024/1024 AS size_mb
FROM INFORMATION_SCHEMA.FILES
WHERE TABLESPACE_NAME = 'innodb_system';

-- Check all table file sizes
SELECT 
    TABLE_SCHEMA,
    TABLE_NAME,
    ROUND((DATA_LENGTH + INDEX_LENGTH)/1024/1024, 2) AS size_mb,
    TABLESPACE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE ENGINE = 'InnoDB'
ORDER BY (DATA_LENGTH + INDEX_LENGTH) DESC
LIMIT 10;
```

---

## ⚙️ Configuration Parameters

<div style="background: rgba(59, 130, 246, 0.1); padding: 20px; border-radius: 10px; margin: 20px 0;">

### Important Settings

```sql
-- Enable file-per-table (default in MySQL 5.6+)
innodb_file_per_table = ON

-- System tablespace files
innodb_data_file_path = ibdata1:12M:autoextend

-- Undo tablespaces (MySQL 8.0+)
innodb_undo_tablespaces = 2

-- Temporary tablespace
innodb_temp_tablespaces_dir = ./ibtmp/
```

</div>

---

## ✅ Key Takeaways

<div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(74, 222, 128, 0.15)); border: 1px solid rgba(34, 197, 94, 0.3); padding: 24px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #22C55E;">

1. **Tablespace** = Physical storage location for database data
2. **Five main types**: System, File-per-Table, General, Undo, Temporary
3. **File-per-table** is the default and recommended for most use cases
4. **System tablespace** never shrinks - plan capacity carefully
5. **General tablespaces** useful for grouping related tables
6. **Undo tablespaces** critical for transaction management

</div>

---

## 🎓 Interview Tips

<div style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid #EF4444; padding: 20px; border-radius: 8px; margin: 20px 0;">

### How to Answer in an Interview

**Good Answer:**
> "MySQL uses tablespaces to organize data storage physically. The main types are: System tablespace (ibdata1) for shared data, File-per-table tablespaces where each table gets its own .ibd file (default since MySQL 5.6), General tablespaces for grouping multiple tables, Undo tablespaces for transaction rollback data, and Temporary tablespaces for query processing. File-per-table is preferred as it allows better space management and easier backups."

**Follow-up Points:**
- Mention file-per-table is enabled by default
- Explain the advantage of file-per-table for space reclamation
- Know that system tablespace never shrinks

</div>

---

## 📚 Next Steps

- [Storage Engines (MyISAM vs InnoDB)](/mysql-tutorials/03-storage-engines)
- [ACID Properties](/mysql-tutorials/04-acid-properties)
- [Primary Key vs Foreign Key](/mysql-tutorials/beginner-07-primary-key)

