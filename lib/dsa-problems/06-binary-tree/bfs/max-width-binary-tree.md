# Maximum Width of Binary Tree

## Problem Description

**Real-World Scenario:**
A hierarchical organization chart analyzer finds the management level with the widest span of control (distance between leftmost and rightmost employee), including empty positions.

**Example Setup:** 
A heap memory visualizer calculates the maximum memory address range used at any depth of a binary heap structure.

**What is Maximum Width of Binary Tree?**
Given the `root` of a binary tree, return the maximum width of the given tree. The maximum width of a tree is the maximum width among all levels. The width of one level is defined as the length between the end-nodes (the leftmost and rightmost non-null nodes), where the null nodes between the end-nodes that would be present in a complete binary tree extending down to that level are also counted into the length calculation.

**Why is it important?**
- BFS / DFS
- Indexing nodes (Heap indexing: 2*i, 2*i+1)
- Handling large numbers (Overflow)
- Tree properties

**Your Task:** 
Return max width.

**Difficulty:** Medium
**Tags:** Binary Tree, Bfs, Bfs / Dfs, Indexing Nodes, Handling Large Numbers, Tree Properties, O(N), Interview

---

## Examples

### Example 1:
**Input:** `root = [1,3,2,5,3,null,9]`
**Output:** `4`
**Explanation:** 
Level 3: 5, 3, null, 9.
Indices: 5->4, 3->5, null->6, 9->7.
Width: 7 - 4 + 1 = 4.

### Example 2:
**Input:** `root = [1,3,null,5,3]`
**Output:** `2`
**Explanation:** Level 3: 5, 3. Indices 4, 5. Width 2.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ n ≤ 3000 |
| Data Type | Binary Tree |
| Time Complexity | O(N) |
| Space Complexity | O(N) |
| Output Format | Integer width |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Amazon |
| 🔵 Facebook | 🟡 Microsoft | 🟢 Apple |
| 🔵 LinkedIn | 🟡 Uber | 🟢 Twitter |

---

## Follow-up Questions

1. Why assign index `i` to root, `2*i` to left, `2*i+1` to right?
2. How to prevent integer overflow for deep skewed trees?
3. Why normalize indices at each level (subtract first index)?
4. Can you use DFS?
