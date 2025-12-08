# Contains Duplicate II

## Problem Description

**Real-World Scenario:**
A security system detects if the same badge was swiped at two entrances within K seconds. This indicates a potential cloning attack.

**Example Setup:** 
A plagiarism detector checks if exact phrases repeat within K paragraphs of each other.

**What is Contains Duplicate II?**
Given an array, find if there are two distinct indices i and j such that nums[i] == nums[j] and |i - j| <= k.

**Why is it important?**
- Sliding window + hash map
- Window constraint
- Security applications
- Proximity checks

**Your Task:** 
Return true if such a pair exists.

---

## Examples

### Example 1:
**Input:** `nums = [1,2,3,1], k = 3`
**Output:** `true`
**Explanation:** nums[0] = nums[3], difference = 3 ≤ 3.

### Example 2:
**Input:** `nums = [1,0,1,1], k = 1`
**Output:** `true`
**Explanation:** nums[2] = nums[3], difference = 1 ≤ 1.

### Example 3:
**Input:** `nums = [1,2,3,1,2,3], k = 2`
**Output:** `false`
**Explanation:** Closest duplicate is 3 apart, but k=2.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 10⁵ |
| Element Value | -10⁹ ≤ nums[i] ≤ 10⁹ |
| K Value | 0 ≤ k ≤ 10⁵ |
| Data Type | Integer array |
| Time Complexity | O(n) |
| Space Complexity | O(min(n, k)) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Palantir |
| 🔵 Amazon | 🟡 Airbnb | 🟢 Turnitin |
| 🔵 Facebook | 🟡 Apple | 🟢 Copyscape |

---

## Follow-up Questions

1. Why use a sliding window of size k?
2. How do you maintain the window using a set?
3. What about Contains Duplicate III (range condition)?
4. Can you solve with just a hash map tracking last index?
