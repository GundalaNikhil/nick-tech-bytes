# Jump Game

## Problem Description

**Real-World Scenario:**
Imagine a river crossing game where you're on stones. Each stone tells you the maximum jump length. Can you reach the last stone, or will you get stuck?

**Example Setup:** 
A video game character is on a series of platforms. Each platform shows the maximum jump distance from that point. Determine if the character can reach the goal platform.

**What is Jump Game?**
Given an array where nums[i] represents the maximum jump length from position i, determine if you can reach the last index starting from the first index.

**Why is it important?**
- Greedy decision making
- Reachability problems
- Game development logic
- Foundation for Jump Game II

**Your Task:** 
Return true if you can reach the last index.

**Difficulty:** Medium
**Tags:** Greedy, String Array, Greedy Decision Making, Reachability Problems, Game Development Logic, Foundation For Jump Game Ii, O(n), Interview

---

## Examples

### Example 1:
**Input:** `nums = [2, 3, 1, 1, 4]`
**Output:** `true`
**Explanation:** Jump 1 step to index 1, then 3 steps to the last index.

### Example 2:
**Input:** `nums = [3, 2, 1, 0, 4]`
**Output:** `false`
**Explanation:** Always stuck at index 3 (value 0).

### Example 3:
**Input:** `nums = [0]`
**Output:** `true`
**Explanation:** Already at the destination.

### Example 4:
**Input:** `nums = [2, 0, 0]`
**Output:** `true`
**Explanation:** Can jump directly to end.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 10⁴ |
| Jump Value | 0 ≤ nums[i] ≤ 10⁵ |
| Data Type | Non-negative integer array |
| Special Conditions | Start from index 0 |
| Time Complexity | O(n) |
| Space Complexity | O(1) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Electronic Arts |
| 🔵 Apple | 🟡 Uber | 🟢 Riot Games |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Zynga |

---

## Follow-up Questions

1. What's the greedy approach (track max reachable)?
2. What if you need minimum jumps (Jump Game II)?
3. Can you solve with DP? Why is greedy better?
4. What if you can also jump backwards?
