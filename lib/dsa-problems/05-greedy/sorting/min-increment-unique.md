# Minimum Increment to Make Array Unique

## Problem Description

**Real-World Scenario:**
A file naming system resolves conflicts by appending the smallest possible increment to duplicate filenames to make them unique.

**Example Setup:** 
A ticket numbering system ensures all issued tickets have unique IDs by incrementing duplicate requests.

**What is Minimum Increment...?**
You are given an integer array `nums`. In one move, you can pick an index `i` where `0 <= i < nums.length` and increment `nums[i]` by `1`. Return the minimum number of moves to make every value in `nums` unique.

**Why is it important?**
- Greedy Strategy
- Sorting
- Counting Sort (O(N))
- Optimization

**Your Task:** 
Return minimum moves.

**Difficulty:** Medium
**Tags:** Greedy, Sorting, Greedy Strategy, Counting Sort, Optimization, O(N log N), Interview

---

## Examples

### Example 1:
**Input:** `nums = [1,2,2]`
**Output:** `1`
**Explanation:** Increment one 2 to 3. [1,2,3]. Moves: 1.

### Example 2:
**Input:** `nums = [3,2,1,2,1,7]`
**Output:** `6`
**Explanation:** [1,1,2,2,3,7] -> [1,2,3,4,5,7].
1->1
1->2 (1 move)
2->3 (1 move)
2->4 (2 moves)
3->5 (2 moves)
7->7
Total 6.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 10⁵ |
| Element Value | 0 ≤ nums[i] ≤ 10⁵ |
| Data Type | Integer array |
| Time Complexity | O(N log N) or O(N) |
| Space Complexity | O(1) or O(N) |
| Output Format | Integer moves |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Square |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Stripe |
| 🔵 Facebook | 🟡 Apple | 🟢 PayPal |

---

## Follow-up Questions

1. Why sort the array first?
2. If `nums[i] <= nums[i-1]`, why set `nums[i] = nums[i-1] + 1`?
3. How to calculate moves (`new_val - old_val`)?
4. Can you use a frequency array for O(N) solution?
