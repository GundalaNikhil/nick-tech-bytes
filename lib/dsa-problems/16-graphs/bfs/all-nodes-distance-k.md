# All Nodes Distance K in Binary Tree

## Problem Description

**Real-World Scenario:**
A social network finder identifies all users who are exactly "k degrees of separation" away from a specific user in a hierarchical org chart.

**Example Setup:** 
A file system utility finds all files that are exactly k directory hops away from a target folder (up or down).

**What is All Nodes Distance K?**
Given the `root` of a binary tree, the value of a target node `target`, and an integer `k`, return an array of the values of all nodes that have a distance `k` from the target node.

**Why is it important?**
- Graph conversion (Tree to Graph)
- BFS from target
- Parent pointers
- Tree traversal

**Your Task:** 
Return list of node values.

---

## Examples

### Example 1:
**Input:** `root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, k = 2`
**Output:** `[7,4,1]`
**Explanation:** Nodes 7 and 4 are children of 2 (dist 1 from 5). Node 1 is child of 3 (dist 1 from 5). Wait.
Path 5->2->7 (dist 2).
Path 5->2->4 (dist 2).
Path 5->3->1 (dist 2).

### Example 2:
**Input:** `root = [1], target = 1, k = 3`
**Output:** `[]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ n ≤ 500 |
| Values | 0 ≤ val ≤ 500 |
| Target | Exists in tree |
| Data Type | Binary Tree |
| Time Complexity | O(N) |
| Space Complexity | O(N) |
| Output Format | List of integers |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Zillow |
| 🔵 Google | 🟡 Microsoft | 🟢 Yelp |
| 🔵 Facebook | 🟡 Apple | 🟢 Redfin |

---

## Follow-up Questions

1. Why do we need parent pointers (or graph conversion)?
2. How does BFS ensure shortest distance (k)?
3. Can you do it without extra space for parent map (Recursion)?
4. What if the tree is a generic N-ary tree?
