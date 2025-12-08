# Video Stitching

## Problem Description

**Real-World Scenario:**
A video editor stitches together short clips to cover a full event duration [0, T] using the minimum number of clips.

**Example Setup:** 
A security team covers a 24-hour shift using the minimum number of guards, each with specific availability windows.

**What is Video Stitching?**
You are given a series of video clips from a sporting event that lasted `time` seconds. These video clips can be overlapping with each other and have varied lengths. Each video clip is described by an array `clips` where `clips[i] = [start, end]`. We want to cut these clips into segments such that we can stitch them together to cover the entire sporting event (`[0, time]`). Return the minimum number of clips needed.

**Why is it important?**
- Greedy Interval Coverage
- Jump Game variant
- DP approach
- Optimization

**Your Task:** 
Return minimum clips.

---

## Examples

### Example 1:
**Input:** `clips = [[0,2],[4,6],[8,10],[1,9],[1,5],[5,9]], time = 10`
**Output:** `3`
**Explanation:** [0,2], [1,9], [8,10]. Wait. [0,2] covers 0-2. [1,9] covers 1-9. [8,10] covers 8-10.
Combined: 0-10. Count 3.

### Example 2:
**Input:** `clips = [[0,1],[1,2]], time = 5`
**Output:** `-1`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Clips | 1 ≤ n ≤ 100 |
| Time | 1 ≤ time ≤ 100 |
| Coordinates | 0 ≤ start, end ≤ 100 |
| Data Type | Integer intervals |
| Time Complexity | O(N log N) or O(T) |
| Space Complexity | O(1) or O(T) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Hulu |
| 🔵 Google | 🟡 Apple | 🟢 Netflix |
| 🔵 Facebook | 🟡 Microsoft | 🟢 Disney+ |

---

## Follow-up Questions

1. Why is this similar to Jump Game II?
2. How to convert clips to "max reach from start time"?
3. What is the greedy choice (extend furthest)?
4. Can you solve it with DP?
