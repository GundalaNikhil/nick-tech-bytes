# Subsets (Power Set)

## Problem Description

**Real-World Scenario:**
A restaurant wants to see all possible combo meals from a fixed menu. With items A, B, C, the combos are: nothing, A, B, C, AB, AC, BC, ABC. This is the power set of menu items!

**Example Setup:** 
A clothing store wants to show all possible outfit combinations from 4 featured items. Customers can buy any subset (including none or all). Generate all possible purchase combinations.

**What is Subsets/Power Set?**
Given a set of distinct elements, generate all possible subsets (the power set). For n elements, there are 2^n subsets.

**Why is it important?**
- Foundation for backtracking
- Combinatorial problems
- Feature selection in ML
- Configuration generation

**Your Task:** 
Return all possible subsets (the power set). The solution set must not contain duplicates.

---

## Examples

### Example 1:
**Input:** `nums = [1, 2, 3]`
**Output:** `[[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]`
**Explanation:** 2³ = 8 subsets including empty set.

### Example 2:
**Input:** `nums = [0]`
**Output:** `[[], [0]]`
**Explanation:** 2¹ = 2 subsets.

### Example 3:
**Input:** `nums = [1, 2]`
**Output:** `[[], [1], [2], [1,2]]`
**Explanation:** 2² = 4 subsets.

### Example 4:
**Input:** `nums = []`
**Output:** `[[]]`
**Explanation:** Empty input has one subset: the empty set.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 0 ≤ n ≤ 10 |
| Element Range | -10 ≤ nums[i] ≤ 10 |
| Data Type | Integer array |
| Special Conditions | All elements are unique |
| Time Complexity | O(n × 2^n) |
| Space Complexity | O(n × 2^n) for output |
| Output Format | List of all subsets |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Flipkart |
| 🔵 Facebook | 🟡 Adobe | 🟢 Walmart |
| 🔵 Google | 🟡 Uber | 🟢 Coupang |
| 🔵 Microsoft | 🟡 Goldman Sachs | 🟢 Intuit |

---

## Follow-up Questions

1. Can you solve using bit manipulation?
2. What if duplicates are allowed (Subsets II)?
3. How is this related to combination problems?
4. What's the iterative approach?
