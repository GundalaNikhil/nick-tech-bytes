# Range Sum Query - Mutable

## Problem Description

**Real-World Scenario:**
A financial ledger where transactions are constantly added/updated, and you need to quickly calculate the total balance or revenue for a specific date range.

**Example Setup:** 
A game scoreboard where player scores change, and you need the sum of scores for players ranked 10-20.

**What is Range Sum Query - Mutable?**
Given an integer array `nums`, handle multiple queries of the following types:
1. **Update**: Update the value of an element in `nums`.
2. **Sum Range**: Calculate the sum of the elements of `nums` between indices `left` and `right` inclusive where `left <= right`.
Implement the `NumArray` class:
- `NumArray(int[] nums)` Initializes the object with the integer array `nums`.
- `void update(int index, int val)` Updates the value of `nums[index]` to be `val`.
- `int sumRange(int left, int right)` Returns the sum of the elements of `nums` between indices `left` and `right` inclusive (i.e. `nums[left] + nums[left + 1] + ... + nums[right]`).

**Why is it important?**
- Segment Tree
- Binary Indexed Tree (Fenwick Tree)
- Square Root Decomposition
- O(log N) updates and queries

**Your Task:** 
Implement the class.

---

## Examples

### Example 1:
**Input:** 
`NumArray([1, 3, 5])`
`sumRange(0, 2)` -> 9
`update(1, 2)` -> nums becomes [1, 2, 5]
`sumRange(0, 2)` -> 8

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 3 * 10^4 |
| Values | -100 ≤ nums[i] ≤ 100 |
| Calls | At most 3 * 10^4 calls |
| Time Complexity | O(log N) per operation |
| Space Complexity | O(N) |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Spotify |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Square |
| 🔵 Facebook | 🟡 Apple | 🟢 Twilio |

---

## Follow-up Questions

1. Why is Prefix Sum array not suitable? (Update takes O(N)).
2. Segment Tree vs BIT? (BIT is easier to implement for sums, Segment Tree is more flexible for min/max).
3. Space complexity of Segment Tree? (4N).
