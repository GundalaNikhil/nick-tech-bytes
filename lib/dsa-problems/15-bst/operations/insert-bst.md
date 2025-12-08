# Insert into BST

## Problem Description

**Real-World Scenario:**
A social network maintains a BST of user IDs for quick lookup. When a new user signs up, their ID must be inserted while maintaining BST property.

**Example Setup:** 
A stock exchange maintains a sorted trading book as a BST. New orders are inserted at the correct position for efficient matching.

**What is Insert into BST?**
Insert a value into a BST while maintaining the BST property. Return the root of the modified tree.

**Why is it important?**
- BST fundamental operation
- Maintaining sorted structure
- O(log n) insertion average
- Database indexing

**Your Task:** 
Insert the value and return the root.

**Difficulty:** Medium
**Tags:** Bst, Operations, Bst Fundamental Operation, Maintaining Sorted Structure, O Insertion Average, Database Indexing, O(h), Interview

---

## Examples

### Example 1:
**Input:** 
```
    4
   / \
  2   7
 / \
1   3
val = 5
```
**Output:** 
```
    4
   / \
  2   7
 / \ /
1  3 5
```
**Explanation:** 5 goes left of 7 (5 < 7).

### Example 2:
**Input:** Same tree, val = 0
**Output:** Insert 0 as left child of 1.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 0 ≤ n ≤ 10⁴ |
| Node Value | 0 ≤ val ≤ 10⁸ |
| Data Type | Valid BST |
| Special Conditions | Value not in tree |
| Time Complexity | O(h) |
| Space Complexity | O(h) recursive, O(1) iterative |
| Output Format | Root of modified tree |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Robinhood |
| 🔵 Microsoft | 🟡 Uber | 🟢 Fidelity |
| 🔵 Apple | 🟡 Goldman Sachs | 🟢 Schwab |

---

## Follow-up Questions

1. Can you insert iteratively?
2. What if duplicates were allowed?
3. How does insertion affect tree balance?
4. What's the connection to AVL/Red-Black trees?
