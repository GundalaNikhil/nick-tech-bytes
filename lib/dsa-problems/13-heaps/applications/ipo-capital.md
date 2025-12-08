# IPO (Maximize Capital)

## Problem Description

**Real-World Scenario:**
A startup investor with limited initial capital selects projects to maximize total capital. Each project has a required capital and profit.

**Example Setup:** 
A game progression system where you unlock upgrades based on current score, maximizing final score after k upgrades.

**What is IPO?**
Given initial capital and k project opportunities (each with capital requirement and profit), select at most k projects to maximize final capital.

**Why is it important?**
- Greedy + heap
- Capital accumulation
- Investment algorithms
- Project selection

**Your Task:** 
Return the maximum capital after completing k projects.

**Difficulty:** Medium
**Tags:** Heaps, Applications, Greedy + Heap, Capital Accumulation, Investment Algorithms, Project Selection, O(n log n), Interview

---

## Examples

### Example 1:
**Input:** `k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]`
**Output:** `4`
**Explanation:** Pick project 0 (profit 1), then project 2 (profit 3). Total = 0+1+3 = 4.

### Example 2:
**Input:** `k = 3, w = 0, profits = [1,2,3], capital = [0,1,2]`
**Output:** `6`
**Explanation:** Pick all three projects.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Projects | 1 ≤ n ≤ 10⁵ |
| K Value | 0 ≤ k ≤ 10⁵ |
| Capital | 0 ≤ capital[i] ≤ 10⁹ |
| Profit | 0 ≤ profits[i] ≤ 10⁴ |
| Time Complexity | O(n log n) |
| Space Complexity | O(n) |
| Output Format | Maximum capital |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Sequoia |
| 🔵 Google | 🟡 Goldman Sachs | 🟢 a16z |
| 🔵 Microsoft | 🟡 Citadel | 🟢 Accel |

---

## Follow-up Questions

1. Why use min-heap for capital and max-heap for profit?
2. How does two-heap approach work?
3. When do you stop early?
4. What about dependent projects (prerequisites)?
