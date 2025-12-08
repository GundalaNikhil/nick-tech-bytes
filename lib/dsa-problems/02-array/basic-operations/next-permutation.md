# Next Permutation

## Problem Description

**Real-World Scenario:**
A password generator creates the next lexicographically larger password from the current one for rotating security credentials.

**Example Setup:** 
A test case generator produces the next permutation of input parameters to systematically test all orderings.

**What is Next Permutation?**
Find the next lexicographically greater permutation of an array. If at largest, rearrange to smallest. Do it in-place.

**Why is it important?**
- Permutation algorithms
- In-place array manipulation
- Password/key rotation
- STL next_permutation

**Your Task:** 
Modify the array to its next permutation in-place.

**Difficulty:** Medium
**Tags:** Array, Basic Operations, Permutation Algorithms, In-Place Array Manipulation, Password/Key Rotation, Stl Next_Permutation, O(n), Interview

---

## Examples

### Example 1:
**Input:** `nums = [1, 2, 3]`
**Output:** `[1, 3, 2]`
**Explanation:** Next greater permutation.

### Example 2:
**Input:** `nums = [3, 2, 1]`
**Output:** `[1, 2, 3]`
**Explanation:** Largest permutation wraps to smallest.

### Example 3:
**Input:** `nums = [1, 1, 5]`
**Output:** `[1, 5, 1]`
**Explanation:** Handle duplicates.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 100 |
| Element Value | 0 ≤ nums[i] ≤ 100 |
| Data Type | Integer array |
| Special Conditions | In-place, O(1) extra space |
| Time Complexity | O(n) |
| Space Complexity | O(1) |
| Output Format | Modified array |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Microsoft | 🟡 Bloomberg | 🟢 1Password |
| 🔵 Google | 🟡 Adobe | 🟢 LastPass |
| 🔵 Amazon | 🟡 Apple | 🟢 Dashlane |

---

## Follow-up Questions

1. What's the algorithm (find pivot, swap, reverse)?
2. Why find rightmost ascending pair?
3. How do you find the smallest larger element?
4. What about previous permutation?
