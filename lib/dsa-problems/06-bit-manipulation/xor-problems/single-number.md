# Single Number (XOR)

## Problem Description

**Real-World Scenario:**
In a photo deduplication system, every photo appears twice except one unique photo. Find that unique photo using XOR properties - no extra memory needed!

**Example Setup:** 
A card matching game where all cards have pairs except one. When the game ends, which card was unpaired? XOR all card IDs - the unpaired one pops out magically!

**What is Single Number?**
Given an array where every element appears twice except one, find that single element. Use XOR: a ⊕ a = 0 and a ⊕ 0 = a.

**Why is it important?**
- Bit manipulation fundamentals
- O(1) space solution
- XOR properties in action
- Foundation for harder variants

**Your Task:** 
Find the element that appears only once.

**Difficulty:** Medium
**Tags:** Bit Manipulation, Xor Problems, Bit Manipulation Fundamentals, O Space Solution, Xor Properties In Action, Foundation For Harder Variants, O(n), Interview

---

## Examples

### Example 1:
**Input:** `nums = [2, 2, 1]`
**Output:** `1`
**Explanation:** 2 ⊕ 2 ⊕ 1 = 0 ⊕ 1 = 1

### Example 2:
**Input:** `nums = [4, 1, 2, 1, 2]`
**Output:** `4`
**Explanation:** 4 ⊕ 1 ⊕ 2 ⊕ 1 ⊕ 2 = 4 ⊕ 0 ⊕ 0 = 4

### Example 3:
**Input:** `nums = [1]`
**Output:** `1`
**Explanation:** Single element is the answer.

### Example 4:
**Input:** `nums = [-1, -1, 5]`
**Output:** `5`
**Explanation:** Works with negative numbers too!

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 3 × 10⁴ |
| Element Range | -3 × 10⁴ ≤ nums[i] ≤ 3 × 10⁴ |
| Data Type | Integer array |
| Special Conditions | Exactly one element appears once |
| Time Complexity | O(n) |
| Space Complexity | O(1) |
| Output Format | Single integer |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Citadel |
| 🔵 Amazon | 🟡 Adobe | 🟢 DE Shaw |
| 🔵 Facebook | 🟡 Uber | 🟢 Qualcomm |

---

## Follow-up Questions

1. What if every element appears three times except one (Single Number II)?
2. What if two elements appear once (Single Number III)?
3. Why does XOR work for this problem?
4. Can you solve without bit manipulation?
