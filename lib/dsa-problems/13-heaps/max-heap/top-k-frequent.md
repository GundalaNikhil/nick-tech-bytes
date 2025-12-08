# Top K Frequent Elements

## Problem Description

**Real-World Scenario:**
Twitter's "Trending Topics" shows the most frequently mentioned hashtags. Given millions of tweets, find the K most used hashtags efficiently.

**Example Setup:** 
A music streaming service wants to show "Top 10 Most Played Songs This Week". Given play counts for thousands of songs, finding the top K efficiently is crucial for real-time dashboards.

**What is Top K Frequent Elements?**
Given an array, find the K elements that appear most frequently. Use a heap for better than O(n log n) performance.

**Why is it important?**
- Trending/popular items
- Log analysis
- Recommendation systems
- Heap/priority queue mastery

**Your Task:** 
Return the k most frequent elements. Answer may be in any order.

**Difficulty:** Medium
**Tags:** Heaps, Max Heap, Trending/Popular Items, Log Analysis, Recommendation Systems, Heap/Priority Queue Mastery, O(n log k), Interview

---

## Examples

### Example 1:
**Input:** `nums = [1, 1, 1, 2, 2, 3], k = 2`
**Output:** `[1, 2]`
**Explanation:** 1 appears 3 times, 2 appears 2 times - top 2 frequent.

### Example 2:
**Input:** `nums = [1], k = 1`
**Output:** `[1]`
**Explanation:** Only one element.

### Example 3:
**Input:** `nums = [1, 2], k = 2`
**Output:** `[1, 2]`
**Explanation:** Both appear once, return both.

### Example 4:
**Input:** `nums = [4, 1, -1, 2, -1, 2, 3], k = 2`
**Output:** `[-1, 2]`
**Explanation:** -1 and 2 both appear twice.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 10⁵ |
| Element Range | -10⁴ ≤ nums[i] ≤ 10⁴ |
| K Value | 1 ≤ k ≤ unique elements |
| Special Conditions | Answer is unique |
| Time Complexity | O(n log k) with heap |
| Space Complexity | O(n) for hash map |
| Output Format | Array of k elements |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Spotify |
| 🔵 Facebook | 🟡 Uber | 🟢 Twitter |
| 🔵 Google | 🟡 Oracle | 🟢 Pinterest |
| 🔵 Apple | 🟡 Yelp | 🟢 Snap |

---

## Follow-up Questions

1. Can you solve in O(n) using bucket sort?
2. Why use min-heap of size k instead of max-heap of size n?
3. How would you handle streaming data?
4. What's the Quickselect approach?
