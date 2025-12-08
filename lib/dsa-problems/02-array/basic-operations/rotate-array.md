# Rotate Array

## Problem Description

**Real-World Scenario:**
A circular conveyor belt in a factory needs to rotate items by K positions. Items at the end wrap around to the beginning. Implement this rotation efficiently.

**Example Setup:** 
A playlist app has a "shuffle rotate" feature. When activated, it moves the last K songs to the beginning of the queue. How do you implement this without using extra space?

**What is Rotate Array?**
Rotate an array to the right by K steps. Elements that fall off the end appear at the beginning.

**Why is it important?**
- In-place manipulation
- Teaches reversal trick
- Cyclic replacement
- Memory-efficient algorithms

**Your Task:** 
Rotate the array to the right by K steps in-place.

---

## Examples

### Example 1:
**Input:** `nums = [1, 2, 3, 4, 5, 6, 7], k = 3`
**Output:** `[5, 6, 7, 1, 2, 3, 4]`
**Explanation:** Rotate right 3 times: 7→1, [7,1,2,3,4,5,6] → ...

### Example 2:
**Input:** `nums = [-1, -100, 3, 99], k = 2`
**Output:** `[3, 99, -1, -100]`
**Explanation:** Last 2 elements move to front.

### Example 3:
**Input:** `nums = [1, 2], k = 3`
**Output:** `[2, 1]`
**Explanation:** k=3 is same as k=1 (k mod n).

### Example 4:
**Input:** `nums = [1], k = 0`
**Output:** `[1]`
**Explanation:** No rotation needed.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 10⁵ |
| K Value | 0 ≤ k ≤ 10⁵ |
| Element Range | -2³¹ ≤ nums[i] ≤ 2³¹-1 |
| Special Conditions | Must be in-place |
| Time Complexity | O(n) |
| Space Complexity | O(1) |
| Output Format | Modified array in-place |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Nvidia |
| 🔵 Microsoft | 🟡 Adobe | 🟢 PayPal |
| 🔵 Google | 🟡 Uber | 🟢 Cisco |

---

## Follow-up Questions

1. What's the "reverse three times" approach?
2. What's the cyclic replacement approach?
3. How do you handle k > n?
4. Can you rotate left instead of right?
