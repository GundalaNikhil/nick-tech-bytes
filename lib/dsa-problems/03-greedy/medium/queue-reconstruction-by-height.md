# Queue Reconstruction by Height

## Problem Description

**Real-World Scenario:**
Arranging people for a group photo where taller people must stand behind shorter people, but with specific constraints on how many taller people are in front.

**Example Setup:** 
Reconstructing a queue from partial visibility data.

**What is Queue Reconstruction by Height?**
You are given an array of people, `people`, which are the attributes of some people in a queue (not necessarily in order). Each `people[i] = [hi, ki]` represents the `i-th` person of height `hi` with exactly `ki` other people in front who have a height greater than or equal to `hi`.
Reconstruct and return the queue that is represented by the input array `people`. The returned queue should be formatted as an array `queue`, where `queue[j] = [hj, kj]` is the attributes of the `j-th` person in the queue (`queue[0]` is the person at the front of the queue).

**Why is it important?**
- Greedy
- Sorting (Custom Comparator)
- Insertion Logic

**Your Task:** 
Return reconstructed queue.

**Difficulty:** Medium
**Tags:** Greedy, Medium, Sorting, Insertion Logic, O(N^2), Interview

---

## Examples

### Example 1:
**Input:** `people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]`
**Output:** `[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]`
**Explanation:**
Sorted: [[7,0], [7,1], [6,1], [5,0], [5,2], [4,4]]
Insert [7,0] at 0: [[7,0]]
Insert [7,1] at 1: [[7,0], [7,1]]
Insert [6,1] at 1: [[7,0], [6,1], [7,1]]
Insert [5,0] at 0: [[5,0], [7,0], [6,1], [7,1]]
...

### Example 2:
**Input:** `people = [[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]`
**Output:** `[[4,0],[5,0],[2,2],[3,2],[1,4],[6,0]]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| People (n) | 1 ≤ n ≤ 2000 |
| Height | 0 ≤ h ≤ 10^6 |
| Time Complexity | O(N^2) |
| Space Complexity | O(N) |
| Output Format | List of Lists |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Yandex |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Baidu |
| 🔵 Facebook | 🟡 Apple | 🟢 Alibaba |

---

## Follow-up Questions

1. Why sort by height descending? (Tallest people are "invisible" to shorter people. Place tallest first, then insert shorter ones based on `k`).
2. Why sort by `k` ascending for same height? (To maintain relative order).
3. Why does insertion at `k` work? (Because `k` represents people >= height. Since we insert shorter people later, they don't affect the `k` count of already placed taller people).
