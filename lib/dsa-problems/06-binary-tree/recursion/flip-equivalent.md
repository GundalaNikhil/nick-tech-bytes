# Flip Equivalent Binary Trees

## Problem Description

**Real-World Scenario:**
A file system comparator checks if two directory structures are equivalent, allowing for the order of subdirectories to be swapped (flipped) at any level.

**Example Setup:** 
A chemical isomer checker determines if two molecular structures are equivalent by rotating branches around bonds.

**What is Flip Equivalent Binary Trees?**
For a binary tree `T`, we can define a flip operation as follows: choose any node, and swap the left and right child subtrees. A binary tree `X` is flip equivalent to a binary tree `Y` if and only if we can make `X` equal to `Y` after some number of flip operations. Given the roots of two binary trees `root1` and `root2`, return `true` if the two trees are flip equivalent or `false` otherwise.

**Why is it important?**
- Recursion
- Tree Isomorphism
- Canonical Representation
- Interview classic

**Your Task:** 
Return true if equivalent.

---

## Examples

### Example 1:
**Input:** `root1 = [1,2,3,4,5,6,null,null,null,7,8], root2 = [1,3,2,null,6,4,5,null,null,null,null,8,7]`
**Output:** `true`
**Explanation:** We flipped at node 1 (swap 2 and 3), then at node 2 (swap 4 and 5), then at node 4 (swap 7 and 8)? No.
Just check recursive equivalence.

### Example 2:
**Input:** `root1 = [], root2 = []`
**Output:** `true`

### Example 3:
**Input:** `root1 = [], root2 = [1]`
**Output:** `false`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 0 ≤ n ≤ 100 |
| Values | 0 ≤ val ≤ 99 |
| Data Type | Binary Tree |
| Time Complexity | O(min(N1, N2)) |
| Space Complexity | O(min(H1, H2)) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Nutanix |
| 🔵 Amazon | 🟡 Microsoft | 🟢 VMware |
| 🔵 Facebook | 🟡 Apple | 🟢 Citrix |

---

## Follow-up Questions

1. What is the recursive condition?
2. `(equiv(L1, L2) && equiv(R1, R2)) || (equiv(L1, R2) && equiv(R1, L2))`?
3. How to handle null nodes?
4. Can you use a canonical representation (sort children by value) to compare?
