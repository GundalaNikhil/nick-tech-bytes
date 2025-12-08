# Patching Array

## Problem Description

**Real-World Scenario:**
A payment system wants to add the minimum number of coin denominations to be able to make exact change for any amount up to `n`.

**Example Setup:** 
Adding weights to a scale to measure any weight up to `n`.

**What is Patching Array?**
Given a sorted integer array `nums` and an integer `n`, add/patch elements to the array such that any number in the range `[1, n]` inclusive can be formed by the sum of some elements in the array.
Return the minimum number of patches required.

**Why is it important?**
- Greedy
- Mathematical Logic (Reachability)
- Constructive Algorithm

**Your Task:** 
Return min patches.

**Difficulty:** Hard
**Tags:** Greedy, Hard, Mathematical Logic, Constructive, O(M + log N), Interview

---

## Examples

### Example 1:
**Input:** `nums = [1,3], n = 6`
**Output:** `1`
**Explanation:**
Combinations of [1, 3] are 1, 3, 4.
Missing: 2, 5, 6.
Add 2. nums = [1, 2, 3].
Sums: 1, 2, 3, 1+2=3, 1+3=4, 2+3=5, 1+2+3=6.
Range [1, 6] covered.

### Example 2:
**Input:** `nums = [1,5,10], n = 20`
**Output:** `2`
**Explanation:**
Add 1 -> [1, 1, 5, 10]. Reach 2.
Add 2 -> [1, 1, 2, 5, 10]. Reach 4.
Wait, logic is:
Current reach = 0.
Need 1. nums[0]=1. Reach -> 1.
Need 2. nums[1]=5 > 2. Patch 2. Reach -> 1+2=3.
Need 4. nums[1]=5 > 4. Patch 4. Reach -> 3+4=7.
Need 8. nums[1]=5 <= 8. Use 5. Reach -> 7+5=12.
Need 13. nums[2]=10 <= 13. Use 10. Reach -> 12+10=22.
22 >= 20. Done. Patches: 2, 4. Total 2.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ len ≤ 1000 |
| n | 1 ≤ n ≤ 2^31 - 1 |
| Time Complexity | O(M + log N) |
| Space Complexity | O(1) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Yandex |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Baidu |
| 🔵 Facebook | 🟡 Apple | 🟢 Alibaba |

---

## Follow-up Questions

1. Why double the reach? (If we can reach `miss`, and we add `miss`, we can now reach `miss + miss = 2*miss`).
2. Why Greedy works? (Adding `miss` is always optimal because it extends the range the most without leaving a gap).
3. Handling overflow? (Use Long for `miss`).
