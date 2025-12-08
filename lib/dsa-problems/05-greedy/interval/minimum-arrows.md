# Minimum Number of Arrows to Burst Balloons

## Problem Description

**Real-World Scenario:**
An archery game shoots vertically. Balloons span horizontal ranges. Find minimum arrows (at specific x-coordinates) to pop all balloons.

**Example Setup:** 
A satellite system fires signals at x-coordinates. Each target spans a range. Find minimum signals to hit all targets.

**What is Minimum Arrows?**
Balloons are at horizontal ranges [start, end]. An arrow at x bursts all balloons where start ≤ x ≤ end. Find minimum arrows.

**Why is it important?**
- Greedy intervals
- Overlap counting
- Activity scheduling variant
- Range coverage

**Your Task:** 
Return minimum number of arrows.

---

## Examples

### Example 1:
**Input:** `points = [[10,16],[2,8],[1,6],[7,12]]`
**Output:** `2`
**Explanation:** Arrow at x=6 pops [2,8],[1,6]. Arrow at x=11 pops [10,16],[7,12].

### Example 2:
**Input:** `points = [[1,2],[3,4],[5,6],[7,8]]`
**Output:** `4`
**Explanation:** No overlaps, need 4 arrows.

### Example 3:
**Input:** `points = [[1,2],[2,3],[3,4],[4,5]]`
**Output:** `2`
**Explanation:** Arrows at 2 and 4.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Balloons | 1 ≤ n ≤ 10⁵ |
| Range | -2³¹ ≤ start ≤ end ≤ 2³¹-1 |
| Data Type | Integer pairs |
| Special Conditions | Touching counts as overlap |
| Time Complexity | O(n log n) |
| Space Complexity | O(1) |
| Output Format | Minimum arrows |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Rovio |
| 🔵 Amazon | 🟡 Apple | 🟢 King |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Supercell |

---

## Follow-up Questions

1. Why sort by end time?
2. How is this similar to Non-overlapping Intervals?
3. Why does touching count as overlap?
4. What about weighted balloons?
