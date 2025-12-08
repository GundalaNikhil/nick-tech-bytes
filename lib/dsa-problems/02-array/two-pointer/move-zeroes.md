# Move Zeroes

## Problem Description

**Real-World Scenario:**
A playlist manager moves "inactive" songs (rating 0) to the end while keeping active songs in order. All operations must be in-place.

**Example Setup:** 
A task manager app has tasks with priority scores. Move all tasks with priority 0 to the end of the queue while maintaining the order of other tasks.

**What is Move Zeroes?**
Move all 0s to the end of the array while maintaining the relative order of non-zero elements. Do this in-place.

**Why is it important?**
- Two-pointer technique
- In-place array manipulation
- Order preservation
- Interview warmup

**Your Task:** 
Move all zeros to the end in-place.

---

## Examples

### Example 1:
**Input:** `nums = [0, 1, 0, 3, 12]`
**Output:** `[1, 3, 12, 0, 0]`
**Explanation:** Non-zeros maintain order.

### Example 2:
**Input:** `nums = [0]`
**Output:** `[0]`
**Explanation:** Just one zero.

### Example 3:
**Input:** `nums = [1, 2, 3]`
**Output:** `[1, 2, 3]`
**Explanation:** No zeros to move.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 10⁴ |
| Element Range | -2³¹ ≤ nums[i] ≤ 2³¹-1 |
| Data Type | Integer array |
| Special Conditions | In-place, preserve order |
| Time Complexity | O(n) |
| Space Complexity | O(1) |
| Output Format | Modified array |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Nvidia |
| 🔵 Amazon | 🟡 Apple | 🟢 Cisco |
| 🔵 Microsoft | 🟡 Uber | 🟢 VMware |

---

## Follow-up Questions

1. How does the two-pointer approach work?
2. Can you minimize writes?
3. What if you needed to move all 1s instead?
4. What about moving zeros to the front?
