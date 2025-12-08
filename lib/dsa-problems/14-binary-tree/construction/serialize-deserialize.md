# Serialize and Deserialize Binary Tree

## Problem Description

**Real-World Scenario:**
A distributed database stores tree-structured data. To send a tree between servers, you must convert it to a string (serialize) and reconstruct it on the other end (deserialize).

**Example Setup:** 
A game saves its skill tree to disk when the player quits. When they return, the tree must be perfectly reconstructed from the saved data.

**What is Serialize/Deserialize?**
Design an algorithm to convert a binary tree to a string and back, such that the original tree structure is preserved exactly.

**Why is it important?**
- Data persistence
- Network transmission
- Database storage
- Tree reconstruction

**Your Task:** 
Implement serialize and deserialize functions.

**Difficulty:** Medium
**Tags:** Binary Tree, Construction, Data Persistence, Network Transmission, Database Storage, Tree Reconstruction, O(n), Interview

---

## Examples

### Example 1:
**Input Tree:** 
```
    1
   / \
  2   3
     / \
    4   5
```
**Serialized:** `"1,2,null,null,3,4,null,null,5,null,null"` (one possible format)
**Deserialize:** Original tree reconstructed

### Example 2:
**Input Tree:** Empty (null)
**Serialized:** `"null"` or `""`
**Deserialize:** null

### Example 3:
**Input Tree:** Single node `[1]`
**Serialized:** `"1,null,null"`
**Deserialize:** Single node tree

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 0 ≤ n ≤ 10⁴ |
| Node Value | -1000 ≤ val ≤ 1000 |
| Data Type | Binary tree |
| Special Conditions | Must handle null nodes |
| Time Complexity | O(n) for both operations |
| Space Complexity | O(n) for string/queue |
| Output Format | Same tree after round-trip |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 LinkedIn | 🟢 Spotify |
| 🔵 Amazon | 🟡 Uber | 🟢 Dropbox |
| 🔵 Microsoft | 🟡 Bloomberg | 🟢 MongoDB |

---

## Follow-up Questions

1. Can you use BFS (level order) approach?
2. Can you use DFS (preorder) approach?
3. How do you handle null nodes?
4. What separator and null marker do you use?
