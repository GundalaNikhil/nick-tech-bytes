# Delete Nodes And Return Forest

## Problem Description

**Real-World Scenario:**
A file system cleaner deletes specific folders, potentially breaking the directory tree into multiple isolated sub-trees (a forest).

**Example Setup:** 
A dependency manager removes a core library, causing dependent modules to become independent roots.

**What is Delete Nodes And Return Forest?**
Given the `root` of a binary tree, each node in the tree has a distinct value. After deleting all nodes with a value in `to_delete`, we are left with a forest (a disjoint union of trees). Return the roots of the trees in the remaining forest.

**Why is it important?**
- Post-order Traversal
- Tree modification
- Recursion
- Forest management

**Your Task:** 
Return list of root nodes.

**Difficulty:** Medium
**Tags:** Binary Tree, Manipulation, Post-Order Traversal, Tree Modification, Recursion, Forest Management, O(N), Interview

---

## Examples

### Example 1:
**Input:** `root = [1,2,3,4,5,6,7], to_delete = [3,5]`
**Output:** `[[1,2,null,4],[6],[7]]`
**Explanation:** 
Delete 3: 6 and 7 become roots.
Delete 5: No children become roots (leaf).
1 remains root.
Roots: 1, 6, 7.

### Example 2:
**Input:** `root = [1,2,4,null,3], to_delete = [3]`
**Output:** `[[1,2,4]]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ n ≤ 1000 |
| Values | 1 ≤ val ≤ 1000 |
| To Delete | 1 ≤ len ≤ 1000 |
| Data Type | Binary Tree |
| Time Complexity | O(N) |
| Space Complexity | O(N) |
| Output Format | List of TreeNodes |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Intuit |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Oracle |
| 🔵 Facebook | 🟡 Apple | 🟢 Salesforce |

---

## Follow-up Questions

1. Why use a HashSet for `to_delete`?
2. Why Post-order traversal (process children first)?
3. When does a node become a new root (parent deleted)?
4. How to handle the original root?
