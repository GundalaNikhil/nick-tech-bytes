# Check Completeness of a Binary Tree

## Problem Description

**Real-World Scenario:**
A heap data structure validator checks if the underlying tree satisfies the completeness property (all levels filled except possibly the last, filled from left).

**Example Setup:** 
A level-order storage system verifies if data blocks are stored contiguously without gaps in the tree structure.

**What is Check Completeness...?**
Given the `root` of a binary tree, determine if it is a complete binary tree. In a complete binary tree, every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible.

**Why is it important?**
- BFS (Level Order)
- Tree properties
- Null node handling
- Interview classic

**Your Task:** 
Return true if complete.

---

## Examples

### Example 1:
**Input:** `root = [1,2,3,4,5,6]`
**Output:** `true`

### Example 2:
**Input:** `root = [1,2,3,4,5,null,7]`
**Output:** `false`
**Explanation:** Node 7 is not as far left as possible (gap at 6).

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ n ≤ 100 |
| Data Type | Binary Tree |
| Time Complexity | O(N) |
| Space Complexity | O(N) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Oracle |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Salesforce |
| 🔵 Google | 🟡 Apple | 🟢 SAP |

---

## Follow-up Questions

1. Why use BFS and track if we've seen a null node?
2. If we see a non-null node after a null node, why is it false?
3. Can you use DFS (count nodes and check indices)?
4. How is this related to Heap implementation?
