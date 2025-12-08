# Two Sum

## Problem Description

**Real-World Scenario:**
You're shopping online and have a gift card with a fixed amount. You want to buy exactly two items that together cost exactly the gift card value - no more, no less. Given a list of product prices, find which two products to buy.

**Example Setup:** 
Aarav has a ₹1000 Amazon gift card. He's looking at electronics with prices [₹400, ₹350, ₹600, ₹650]. He needs to find two items that sum to exactly ₹1000. Which two should he pick?

**What is Two Sum?**
Given an array of integers and a target sum, find two numbers that add up to the target. Return their indices.

**Why is it important?**
- Most popular interview question
- Introduces hash map optimization
- Foundation for n-sum problems
- Real-world shopping/matching applications

**Your Task:** 
Return indices of the two numbers such that they add up to the target.

---

## Examples

### Example 1:
**Input:** `nums = [2, 7, 11, 15], target = 9`
**Output:** `[0, 1]`
**Explanation:** nums[0] + nums[1] = 2 + 7 = 9

### Example 2:
**Input:** `nums = [3, 2, 4], target = 6`
**Output:** `[1, 2]`
**Explanation:** nums[1] + nums[2] = 2 + 4 = 6

### Example 3:
**Input:** `nums = [3, 3], target = 6`
**Output:** `[0, 1]`
**Explanation:** Same element value, different indices.

### Example 4:
**Input:** `nums = [1, 5, 8, 3, 9, 2], target = 11`
**Output:** `[2, 3]` or `[1, 3]` etc.
**Explanation:** 8 + 3 = 11 or other valid pairs.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 2 ≤ n ≤ 10⁴ |
| Element Range | -10⁹ ≤ nums[i] ≤ 10⁹ |
| Target Range | -10⁹ ≤ target ≤ 10⁹ |
| Special Conditions | Exactly one solution exists |
| Time Complexity | O(n) with hash map |
| Space Complexity | O(n) |
| Output Format | Array of two indices |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Adobe | 🟢 Flipkart |
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Infosys |
| 🔵 Facebook | 🟡 Uber | 🟢 TCS |
| 🔵 Apple | 🟡 Oracle | 🟢 Wipro |
| 🔵 Microsoft | 🟡 LinkedIn | 🟢 Accenture |

---

## Follow-up Questions

1. What if the array is sorted? (Two pointer approach)
2. What if there are multiple valid pairs?
3. How would you extend this to Three Sum or Four Sum?
4. What if you need to return all pairs, not just one?
