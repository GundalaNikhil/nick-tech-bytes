# Delete Node in BST

## Problem Description

**Real-World Scenario:**
A contacts app (sorted BST) removes a contact. The delete operation must maintain BST property while handling all cases: leaf, one child, two children.

**Example Setup:** 
An employee directory removes departed employees. The BST structure must stay valid after deletion.

**What is Delete Node in BST?**
Delete a node with given key from BST. Handle three cases: no children (just remove), one child (bypass), two children (replace with inorder successor/predecessor).

**Why is it important?**
- Complete BST operations
- Three-case handling
- Inorder successor concept
- Database deletion

**Your Task:** 
Delete the node and return the root.

---

## Examples

### Example 1:
**Input:** 
```
    5
   / \
  3   6
 / \   \
2   4   7
key = 3
```
**Output:** 
```
    5
   / \
  4   6
 /     \
2       7
```
**Explanation:** 3 has two children. Replace with successor (4).

### Example 2:
**Input:** Same tree, key = 0
**Output:** Same tree (0 not found)

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 0 ≤ n ≤ 10⁴ |
| Node Value | -10⁵ ≤ val ≤ 10⁵ |
| Data Type | Valid BST |
| Special Conditions | Key may not exist |
| Time Complexity | O(h) |
| Space Complexity | O(h) |
| Output Format | Root of modified tree |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Microsoft | 🟡 Bloomberg | 🟢 Salesforce |
| 🔵 Amazon | 🟡 Oracle | 🟢 Workday |
| 🔵 Google | 🟡 Apple | 🟢 SAP |

---

## Follow-up Questions

1. What are the three cases for deletion?
2. What's the inorder successor/predecessor?
3. Why replace with successor for two children?
4. How do balanced BSTs (AVL/RB) handle deletion?
