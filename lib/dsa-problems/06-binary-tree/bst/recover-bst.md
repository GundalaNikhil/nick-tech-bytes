# Recover Binary Search Tree

## Problem Description

**Real-World Scenario:**
A database index integrity checker fixes a corrupted B-Tree where exactly two keys were swapped by mistake.

**Example Setup:** 
A sorted file system catalog has two entries swapped. Identify and swap them back to restore sorted order.

**What is Recover Binary Search Tree?**
You are given the `root` of a binary search tree (BST), where the values of exactly two nodes of the tree were swapped by mistake. Recover the tree without changing its structure.

**Why is it important?**
- Morris Traversal (O(1) Space)
- Inorder Traversal properties
- Tree manipulation
- Pointer manipulation

**Your Task:** 
Recover the tree in-place.

---

## Examples

### Example 1:
**Input:** `root = [1,3,null,null,2]`
**Output:** `[3,1,null,null,2]`
**Explanation:** 3 cannot be left child of 1. Swapped 1 and 3.

### Example 2:
**Input:** `root = [3,1,4,null,null,2]`
**Output:** `[2,1,4,null,null,3]`
**Explanation:** 2 cannot be right child of 4? Wait.
Inorder: 1, 3, 2, 4. Sorted: 1, 2, 3, 4.
Swapped 3 and 2.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 2 ≤ n ≤ 1000 |
| Values | -2³¹ ≤ val ≤ 2³¹-1 |
| Data Type | BST |
| Time Complexity | O(N) |
| Space Complexity | O(1) (Morris) or O(H) |
| Output Format | Modified tree |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 VMware |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Citrix |
| 🔵 Facebook | 🟡 Apple | 🟢 Nutanix |

---

## Follow-up Questions

1. Why does Inorder Traversal reveal the swapped nodes?
2. How to identify the two nodes (first occurrence where `prev > curr`, second occurrence)?
3. What is Morris Traversal and how does it achieve O(1) space?
4. Why do we need to thread the tree?
