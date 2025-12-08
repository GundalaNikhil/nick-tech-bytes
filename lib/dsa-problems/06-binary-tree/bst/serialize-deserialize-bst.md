# Serialize and Deserialize BST

## Problem Description

**Real-World Scenario:**
A database backup tool saves a binary search tree index to a disk file (serialization) and restores it to memory (deserialization) efficiently.

**Example Setup:** 
A network protocol transmits a hierarchical data structure over a wire as a compact string.

**What is Serialize and Deserialize BST?**
Serialization is converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment. Design an algorithm to serialize and deserialize a binary search tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary search tree can be serialized to a string and this string can be deserialized to the original tree structure. The encoded string should be as compact as possible.

**Why is it important?**
- Preorder Traversal
- Tree construction from traversal
- BST properties (Range validation)
- System Design concept

**Your Task:** 
Implement `Codec` class.

---

## Examples

### Example 1:
**Input:** `root = [2,1,3]`
**Output:** `[2,1,3]`
**Explanation:** String "2,1,3".

### Example 2:
**Input:** `root = []`
**Output:** `[]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 0 ≤ n ≤ 10⁴ |
| Values | 0 ≤ val ≤ 10⁴ |
| Data Type | BST |
| Time Complexity | O(N) |
| Space Complexity | O(N) |
| Output Format | String / TreeNode |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 MongoDB |
| 🔵 Google | 🟡 Microsoft | 🟢 Couchbase |
| 🔵 Facebook | 🟡 Apple | 🟢 Redis |

---

## Follow-up Questions

1. Why is Preorder sufficient for BST (unlike generic Binary Tree)?
2. How to use lower/upper bounds to reconstruct the tree?
3. How to handle delimiters?
4. Can you use 4 bytes per integer (binary format) instead of string?
