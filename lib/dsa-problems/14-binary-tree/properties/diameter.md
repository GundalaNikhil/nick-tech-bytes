# Diameter of Binary Tree

## Problem Description

**Real-World Scenario:**
In a network topology shaped as a tree, the "diameter" is the longest path between any two nodes. This determines the maximum latency in the network.

**Example Setup:** 
A company's org chart is a tree. The "diameter" represents the longest chain of peer-to-peer communication (not going through CEO). How long is this chain?

**What is Diameter of Binary Tree?**
The diameter is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

**Why is it important?**
- Network analysis
- Tree properties
- Path calculations
- Recursive thinking

**Your Task:** 
Return the diameter of the binary tree (number of edges).

---

## Examples

### Example 1:
**Input:** 
```
    1
   / \
  2   3
 / \
4   5
```
**Output:** `3`
**Explanation:** Path is 4→2→1→3 or 5→2→1→3 with 3 edges.

### Example 2:
**Input:** 
```
  1
 /
2
```
**Output:** `1`
**Explanation:** Single edge from 1 to 2.

### Example 3:
**Input:** 
```
    1
   /
  2
 / \
3   4
     \
      5
       \
        6
```
**Output:** `4`
**Explanation:** Path 3→2→4→5→6, diameter doesn't pass through root!

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ n ≤ 10⁴ |
| Node Value | -100 ≤ val ≤ 100 |
| Data Type | Binary tree |
| Special Conditions | Count edges (not nodes) |
| Time Complexity | O(n) |
| Space Complexity | O(h) for recursion |
| Output Format | Integer length |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Uber | 🟢 Yelp |
| 🔵 Amazon | 🟡 LinkedIn | 🟢 Cisco |
| 🔵 Google | 🟡 Bloomberg | 🟢 Atlassian |

---

## Follow-up Questions

1. Why might diameter not pass through root?
2. What's the recurrence relation?
3. How do you track diameter while computing heights?
4. What if we count nodes instead of edges?
