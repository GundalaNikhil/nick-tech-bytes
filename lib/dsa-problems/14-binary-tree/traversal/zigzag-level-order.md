# Zigzag Level Order Traversal

## Problem Description

**Real-World Scenario:**
A organizational chart displays alternating left-right, right-left for visual interest. First level left-to-right, next right-to-left, and so on.

**Example Setup:** 
A tournament bracket display shows teams in zigzag pattern for better visual layout on screen.

**What is Zigzag Level Order Traversal?**
Return level order traversal but alternate direction: first level left→right, second level right→left, third left→right, etc.

**Why is it important?**
- BFS with direction toggle
- Visual display patterns
- Level-aware traversal
- Queue manipulation

**Your Task:** 
Return zigzag level order traversal.

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
**Output:** `[[3], [20, 9], [15, 7]]`
**Explanation:** Level 0: left→right. Level 1: right→left. Level 2: left→right.

### Example 2:
**Input:** `[1]`
**Output:** `[[1]]`
**Explanation:** Single node.

### Example 3:
**Input:** Empty
**Output:** `[]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 0 ≤ n ≤ 2000 |
| Node Value | -100 ≤ val ≤ 100 |
| Data Type | Binary tree |
| Special Conditions | Alternate direction per level |
| Time Complexity | O(n) |
| Space Complexity | O(n) |
| Output Format | 2D list |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Qualcomm |
| 🔵 Facebook | 🟡 LinkedIn | 🟢 Nvidia |
| 🔵 Microsoft | 🟡 Apple | 🟢 Cisco |

---

## Follow-up Questions

1. How do you track and toggle direction?
2. When to reverse vs use deque insertion?
3. What's the relationship to normal level order?
4. Can you use two stacks instead of queue?
