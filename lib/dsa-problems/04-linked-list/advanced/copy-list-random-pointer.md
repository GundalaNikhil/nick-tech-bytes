# Copy List with Random Pointer

## Problem Description

**Real-World Scenario:**
A social network clones user profiles. Each profile has a reference to the next and a random "friend" reference. Deep copy the entire network.

**Example Setup:** 
A document editor copies linked content blocks where each block references another random block (like cross-references in a book).

**What is Copy List with Random Pointer?**
Create a deep copy of a linked list where each node has a next pointer and a random pointer to any node or null.

**Why is it important?**
- Deep copy techniques
- Two-pass approach
- Hash map usage
- O(1) space interweaving

**Your Task:** 
Return the head of the deep-copied list.

**Difficulty:** Hard
**Tags:** Linked List, Advanced, Deep Copy Techniques, Two-Pass, Hash Map Usage, O Space Interweaving, O(n), Interview

---

## Examples

### Example 1:
**Input:** `[[7,null],[13,0],[11,4],[10,2],[1,0]]`
**Output:** Deep copy of same structure
**Explanation:** Node values with random pointer indices.

### Example 2:
**Input:** `[[1,1],[2,1]]`
**Output:** Deep copy with same random connections
**Explanation:** Node 0 random→0, Node 1 random→1.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 0 ≤ n ≤ 1000 |
| Node Value | -10⁴ ≤ val ≤ 10⁴ |
| Data Type | Linked list with random pointer |
| Special Conditions | Random can be null or any node |
| Time Complexity | O(n) |
| Space Complexity | O(1) with interweaving |
| Output Format | New list head |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Snap |
| 🔵 Facebook | 🟡 Uber | 🟢 Pinterest |
| 🔵 Microsoft | 🟡 LinkedIn | 🟢 Quora |

---

## Follow-up Questions

1. Why use hash map (old node → new node)?
2. What's the O(1) space interweaving approach?
3. How do you handle the random pointer?
4. What about deep copy of a graph?
