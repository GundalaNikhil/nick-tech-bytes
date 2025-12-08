# Level Order Traversal (BFS)

## Problem Description

**Real-World Scenario:**
In an organization chart, you want to list all employees level by level - first the CEO, then VPs, then Directors, and so on. This is level-order traversal!

**Example Setup:** 
A school website shows the administration hierarchy. First the Principal, then Headmasters, then Teachers. Display this organizational tree level by level.

**What is Level Order Traversal?**
Visit all nodes of a tree level by level, from left to right. Uses BFS with a queue.

**Why is it important?**
- BFS on trees
- Queue data structure usage
- Serialization/deserialization
- Foundation for zigzag, right view, etc.

**Your Task:** 
Return the level order traversal of a binary tree.

**Difficulty:** Medium
**Tags:** Binary Tree, Traversal, Bfs On Trees, Queue Data Structure Usage, Serialization/Deserialization, Foundation For Zigzag, Right View, Etc., O(n), Interview

---

## Examples

### Example 1:
**Input:** 
```
    3
   / \
  9  20
    /  \
   15   7
```
**Output:** `[[3], [9, 20], [15, 7]]`
**Explanation:** Level 0: [3], Level 1: [9, 20], Level 2: [15, 7]

### Example 2:
**Input:** 
```
  1
```
**Output:** `[[1]]`
**Explanation:** Single node, single level.

### Example 3:
**Input:** Empty tree
**Output:** `[]`
**Explanation:** No nodes.

### Example 4:
**Input:** 
```
    1
   /
  2
 /
3
```
**Output:** `[[1], [2], [3]]`
**Explanation:** Left-skewed tree.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 0 ≤ n ≤ 2000 |
| Node Value | -1000 ≤ val ≤ 1000 |
| Data Type | Binary tree |
| Special Conditions | Can be empty |
| Time Complexity | O(n) |
| Space Complexity | O(n) for queue |
| Output Format | 2D array - levels |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 LinkedIn | 🟢 Atlassian |
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Salesforce |
| 🔵 Microsoft | 🟡 Adobe | 🟢 VMware |

---

## Follow-up Questions

1. How would you do zigzag level order?
2. How would you return bottom-up level order?
3. Can you do this recursively?
4. How would you find the width of each level?
