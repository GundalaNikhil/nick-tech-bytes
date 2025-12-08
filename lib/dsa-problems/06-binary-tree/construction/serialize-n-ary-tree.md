# Serialize and Deserialize N-ary Tree

## Problem Description

**Real-World Scenario:**
A file system serializer converts a directory structure (where each folder can have N subfolders) into a string for storage and restores it later.

**Example Setup:** 
A DOM tree serializer converts an HTML document structure into a compact string format for transmission.

**What is Serialize and Deserialize N-ary Tree?**
Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment. Design an algorithm to serialize and deserialize an N-ary tree. An N-ary tree is a rooted tree in which each node has no more than N children.

**Why is it important?**
- Tree Traversal (Preorder/Level Order)
- String Parsing
- Recursion
- System Design concept

**Your Task:** 
Implement `Codec` class.

**Difficulty:** Medium
**Tags:** Binary Tree, Construction, Tree Traversal, String Parsing, Recursion, System Design Concept, O(N), Interview

---

## Examples

### Example 1:
**Input:** `root = [1,null,3,2,4,null,5,6]`
**Output:** `[1,null,3,2,4,null,5,6]`
**Explanation:** Standard N-ary tree format.

### Example 2:
**Input:** `root = []`
**Output:** `[]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 0 ≤ n ≤ 10⁴ |
| Height | 0 ≤ h ≤ 1000 |
| Data Type | N-ary Tree |
| Time Complexity | O(N) |
| Space Complexity | O(N) |
| Output Format | String / Node |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Dropbox |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Box |
| 🔵 Facebook | 🟡 Apple | 🟢 Evernote |

---

## Follow-up Questions

1. How to represent children count or end-of-children marker?
2. Why use Preorder traversal?
3. Format: `val [child1 child2 ...]` or `val size child1 child2 ...`?
4. Can you use Level Order traversal?
