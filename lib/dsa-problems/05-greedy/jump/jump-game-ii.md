# Jump Game II

## Problem Description

**Real-World Scenario:**
A video streaming app skips ahead in chapters. From each chapter, you can jump forward a max distance. Find minimum jumps to reach the end.

**Example Setup:** 
A frog crosses a river on lily pads. Each pad shows max jump distance. Find the minimum hops to cross.

**What is Jump Game II?**
Given an array where nums[i] is the max jump length from position i, find the minimum number of jumps to reach the last index.

**Why is it important?**
- Greedy optimization
- BFS-like level thinking
- Jump game variant
- Interview staple

**Your Task:** 
Return the minimum number of jumps.

---

## Examples

### Example 1:
**Input:** `nums = [2, 3, 1, 1, 4]`
**Output:** `2`
**Explanation:** Jump 1→2 (index 0→1), then 2 steps to end.

### Example 2:
**Input:** `nums = [2, 3, 0, 1, 4]`
**Output:** `2`
**Explanation:** Same path works despite the 0.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 10⁴ |
| Element Value | 0 ≤ nums[i] ≤ 1000 |
| Data Type | Integer array |
| Special Conditions | Guaranteed reachable |
| Time Complexity | O(n) |
| Space Complexity | O(1) |
| Output Format | Minimum jumps |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Netflix |
| 🔵 Facebook | 🟡 Adobe | 🟢 Hulu |
| 🔵 Google | 🟡 Apple | 🟢 Disney+ |

---

## Follow-up Questions

1. How does the greedy level-by-level approach work?
2. What's the relationship to BFS?
3. Can you identify when a jump is forced?
4. What about Jump Game III (bidirectional)?
