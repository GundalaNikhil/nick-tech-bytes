# Right Side View of Binary Tree

## Problem Description

**Real-World Scenario:**
A city planning tool shows building outlines from the right side. Only the rightmost building at each height level is visible.

**Example Setup:** 
An org chart viewer shows the "right-side perspective" - for each level, show only the rightmost person (often the newest hire in each department).

**What is Right Side View?**
Return the values of the nodes you can see from the right side of the tree - the rightmost node at each level.

**Why is it important?**
- Level order traversal variant
- Tree perspective problems
- BFS application
- Last-at-each-level pattern

**Your Task:** 
Return the right side view as a list.

**Difficulty:** Medium
**Tags:** Binary Tree, Traversal, Level Order Traversal Variant, Tree Perspective Problems, Bfs Application, Last-At-Each-Level Pattern, O(n), Interview

---

## Examples

### Example 1:
**Input:** 
```
    1
   / \
  2   3
   \   \
    5   4
```
**Output:** `[1, 3, 4]`
**Explanation:** 
- Level 0: 1 (rightmost)
- Level 1: 3 (rightmost)
- Level 2: 4 (rightmost)

### Example 2:
**Input:** 
```
  1
   \
    3
```
**Output:** `[1, 3]`
**Explanation:** Right skewed tree.

### Example 3:
**Input:** Empty tree
**Output:** `[]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 0 ≤ n ≤ 100 |
| Node Value | -100 ≤ val ≤ 100 |
| Data Type | Binary tree |
| Special Conditions | Return rightmost at each level |
| Time Complexity | O(n) |
| Space Complexity | O(n) for queue |
| Output Format | List of values |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Zillow |
| 🔵 Amazon | 🟡 Uber | 🟢 Yelp |
| 🔵 Microsoft | 🟡 LinkedIn | 🟢 Indeed |

---

## Follow-up Questions

1. How do you use BFS level-by-level?
2. Can you use DFS (right-first, track depth)?
3. What about left side view?
4. How about top view or bottom view?
