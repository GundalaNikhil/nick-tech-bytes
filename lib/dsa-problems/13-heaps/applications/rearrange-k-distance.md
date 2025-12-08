# Rearrange String k Distance Apart

## Problem Description

**Real-World Scenario:**
A task scheduler ensures the same task type doesn't run within k time slots of each other for resource cooling.

**Example Setup:** 
A radio playlist prevents the same artist from playing within k songs of each other.

**What is Rearrange String k Distance Apart?**
Rearrange string so that same characters are at least distance k apart. Return any valid rearrangement or "" if impossible.

**Why is it important?**
- Greedy + heap
- Task scheduling variant
- Feasibility with distance constraint
- Resource allocation

**Your Task:** 
Return a valid rearrangement or "" if impossible.

---

## Examples

### Example 1:
**Input:** `s = "aabbcc", k = 3`
**Output:** `"abcabc"` (one valid answer)
**Explanation:** Same chars are 3 apart.

### Example 2:
**Input:** `s = "aaabc", k = 3`
**Output:** `""`
**Explanation:** Impossible - too many 'a's.

### Example 3:
**Input:** `s = "aaadbbcc", k = 2`
**Output:** `"abacabcd"` (one valid answer)

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ s.length ≤ 3 × 10⁵ |
| K Value | 0 ≤ k ≤ s.length |
| Data Type | Lowercase letters |
| Special Conditions | Return "" if impossible |
| Time Complexity | O(n log 26) |
| Space Complexity | O(26) = O(1) |
| Output Format | Rearranged string or "" |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Spotify |
| 🔵 Amazon | 🟡 Uber | 🟢 Pandora |
| 🔵 Facebook | 🟡 Apple | 🟢 iHeartRadio |

---

## Follow-up Questions

1. How does the cooldown queue work with max-heap?
2. What's the feasibility condition?
3. How is this different from Reorganize String (k=2)?
4. What about circular arrangement?
