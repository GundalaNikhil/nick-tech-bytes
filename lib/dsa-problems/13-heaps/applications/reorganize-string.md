# Reorganize String

## Problem Description

**Real-World Scenario:**
A scheduling system assigns tasks so that identical tasks don't run consecutively. Given task types and counts, arrange so no two same tasks are adjacent.

**Example Setup:** 
A playlist generator ensures no artist appears twice in a row - rearranging songs for maximum variety.

**What is Reorganize String?**
Given a string, rearrange it so that no two adjacent characters are the same. Return "" if impossible.

**Why is it important?**
- Greedy + priority queue
- Character frequency
- Task scheduling variant
- Feasibility checking

**Your Task:** 
Return a valid rearrangement or "" if impossible.

**Difficulty:** Medium
**Tags:** Heaps, Applications, Greedy + Priority Queue, Character Frequency, Task Scheduling Variant, Feasibility Checking, O(n log 26), Interview

---

## Examples

### Example 1:
**Input:** `s = "aab"`
**Output:** `"aba"`
**Explanation:** a and b alternate with extra 'a'.

### Example 2:
**Input:** `s = "aaab"`
**Output:** `""`
**Explanation:** 3 'a's can't be separated with only 1 'b'.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Length | 1 ≤ s.length ≤ 500 |
| Data Type | Lowercase letters |
| Special Conditions | Max freq ≤ (n+1)/2 for valid |
| Time Complexity | O(n log 26) ≈ O(n) |
| Space Complexity | O(26) = O(1) |
| Output Format | Rearranged string or "" |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Spotify |
| 🔵 Google | 🟡 Uber | 🟢 Pandora |
| 🔵 Facebook | 🟡 Apple | 🟢 Tidal |

---

## Follow-up Questions

1. Why use max-heap of char frequencies?
2. What's the condition for valid rearrangement?
3. How is this related to Task Scheduler?
4. Can you do this without a heap (odd/even placement)?
