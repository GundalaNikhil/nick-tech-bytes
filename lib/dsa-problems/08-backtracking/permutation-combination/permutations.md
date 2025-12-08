# Permutations

## Problem Description

**Real-World Scenario:**
A photo booth prints photos of friends in different arrangements. For 3 friends, there are 6 possible lineup orders: ABC, ACB, BAC, BCA, CAB, CBA. Generate all possible arrangements!

**Example Setup:** 
A race organizer needs to consider all possible finish orders for medal assignment. With 4 runners, how many different podium orders are possible? Generate them all.

**What is Permutations?**
Given an array of distinct elements, return all possible permutations (arrangements). For n elements, there are n! permutations.

**Why is it important?**
- Classic backtracking
- Arrangement and scheduling problems
- Password/code generation
- Foundation for combinations

**Your Task:** 
Return all possible permutations of the array.

---

## Examples

### Example 1:
**Input:** `nums = [1, 2, 3]`
**Output:** `[[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]`
**Explanation:** 3! = 6 permutations.

### Example 2:
**Input:** `nums = [0, 1]`
**Output:** `[[0,1], [1,0]]`
**Explanation:** 2! = 2 permutations.

### Example 3:
**Input:** `nums = [1]`
**Output:** `[[1]]`
**Explanation:** 1! = 1 permutation.

### Example 4:
**Input:** `nums = [1, 2, 3, 4]`
**Output:** 24 permutations
**Explanation:** 4! = 24.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 6 |
| Element Range | -10 ≤ nums[i] ≤ 10 |
| Data Type | Integer array |
| Special Conditions | All elements unique |
| Time Complexity | O(n × n!) |
| Space Complexity | O(n!) for output |
| Output Format | List of all permutations |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 LinkedIn | 🟢 Palantir |
| 🔵 Google | 🟡 Bloomberg | 🟢 Square |
| 🔵 Facebook | 🟡 Uber | 🟢 Robinhood |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Dropbox |

---

## Follow-up Questions

1. What if duplicates exist (Permutations II)?
2. How does this differ from combinations?
3. What's the "swap" approach vs "used array" approach?
4. How would you generate permutations iteratively?
