# Koko Eating Bananas

## Problem Description

**Real-World Scenario:**
A factory line sets production speed. Given order sizes and deadline hours, find the minimum speed to finish all orders on time.

**Example Setup:** 
Koko the monkey eats bananas. Guards return in h hours. Find minimum eating speed to finish all piles before guards return.

**What is Koko Eating Bananas?**
Given piles of bananas and h hours, find minimum eating speed k (bananas/hour) to eat all bananas within h hours. Each pile takes ceil(pile/k) hours.

**Why is it important?**
- Binary search on answer
- Minimize maximum problems
- Resource allocation
- Interview favorite

**Your Task:** 
Return the minimum integer eating speed.

---

## Examples

### Example 1:
**Input:** `piles = [3,6,7,11], h = 8`
**Output:** `4`
**Explanation:** At speed 4: 1+2+2+3 = 8 hours.

### Example 2:
**Input:** `piles = [30,11,23,4,20], h = 5`
**Output:** `30`
**Explanation:** Must eat each pile in 1 hour, so speed = max pile.

### Example 3:
**Input:** `piles = [30,11,23,4,20], h = 6`
**Output:** `23`
**Explanation:** More time allows slower speed.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Piles | 1 ≤ piles.length ≤ 10⁴ |
| Pile Size | 1 ≤ piles[i] ≤ 10⁹ |
| Hours | piles.length ≤ h ≤ 10⁹ |
| Data Type | Integer array |
| Time Complexity | O(n log m) where m = max pile |
| Space Complexity | O(1) |
| Output Format | Minimum speed |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 DoorDash |
| 🔵 Amazon | 🟡 Uber | 🟢 Instacart |
| 🔵 Google | 🟡 Airbnb | 🟢 Gopuff |

---

## Follow-up Questions

1. What are the bounds for binary search (1 to max)?
2. How do you check if speed k is sufficient?
3. What's the ceiling division formula?
4. What about minimizing maximum workload problems?
