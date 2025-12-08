# Queue Reconstruction by Height

## Problem Description

**Real-World Scenario:**
A photographer arranges a group of people for a photo based on height constraints: each person wants to know how many taller people are in front of them.

**Example Setup:** 
A queue management system reconstructs the order of people based on their height and the number of people in front of them with height greater than or equal to theirs.

**What is Queue Reconstruction by Height?**
You are given an array of people, `people`, which are the attributes of some people in a queue (not necessarily in order). Each `people[i] = [hi, ki]` represents the `ith` person of height `hi` with exactly `ki` other people in front who have a height greater than or equal to `hi`. Reconstruct and return the queue that is represented by the input array `people`.

**Why is it important?**
- Greedy sorting strategy
- Insertion logic
- Constructive algorithm
- Sorting by multiple criteria

**Your Task:** 
Return the reconstructed queue.

---

## Examples

### Example 1:
**Input:** `people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]`
**Output:** `[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]`
**Explanation:**
Person 0 has height 5 with 0 taller or equal in front.
Person 1 has height 7 with 0 taller or equal in front.
Person 2 has height 5 with 2 taller or equal in front.
Person 3 has height 6 with 1 taller or equal in front.
Person 4 has height 4 with 4 taller or equal in front.
Person 5 has height 7 with 1 taller or equal in front.

### Example 2:
**Input:** `people = [[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]`
**Output:** `[[4,0],[5,0],[2,2],[3,2],[1,4],[6,0]]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| People | 1 ≤ n ≤ 2000 |
| Height | 0 ≤ hi ≤ 10⁶ |
| K Value | 0 ≤ ki < n |
| Data Type | Integer pairs |
| Special Conditions | Valid queue guaranteed |
| Time Complexity | O(n²) |
| Space Complexity | O(n) |
| Output Format | List of pairs |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Yandex |
| 🔵 Amazon | 🟡 Apple | 🟢 Grab |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Gojek |

---

## Follow-up Questions

1. Why sort by height descending and k ascending?
2. Why does inserting at index k work?
3. Can you do it in O(n log n) or O(n sqrt n)?
4. How is this related to counting inversions?
