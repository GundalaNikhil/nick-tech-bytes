# Minimum Depth of Binary Tree

## Problem Description

**Real-World Scenario:**
A network latency monitor finds the shortest path to any server (leaf). The minimum depth represents the closest reachable endpoint.

**Example Setup:** 
A customer support system finds the quickest escalation path - the shortest route from initial contact to a resolution specialist.

**What is Minimum Depth?**
The minimum depth is the number of nodes along the shortest path from root to the nearest leaf node.

**Why is it important?**
- BFS often better here
- Leaf node definition
- Shortest path variant
- Common edge case pitfall

**Your Task:** 
Return the minimum depth of the tree.

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
**Output:** `2`
**Explanation:** Path 3→9 has 2 nodes (9 is a leaf).

### Example 2:
**Input:** 
```
  2
   \
    3
     \
      4
```
**Output:** `4`
**Explanation:** Entire path is 2→3→4→5 (4 nodes).

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 0 ≤ n ≤ 10⁵ |
| Node Value | -1000 ≤ val ≤ 1000 |
| Data Type | Binary tree |
| Special Conditions | Must reach a LEAF node |
| Time Complexity | O(n) |
| Space Complexity | O(n) for BFS |
| Output Format | Integer depth |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Zendesk |
| 🔵 Facebook | 🟡 LinkedIn | 🟢 Freshdesk |
| 🔵 Microsoft | 🟡 Apple | 🟢 Intercom |

---

## Follow-up Questions

1. Why is BFS often better than DFS here?
2. What's the edge case with one-sided trees?
3. Why must the path end at a leaf?
4. How to optimize for skewed trees?
