# Wiggle Sort II

## Problem Description

**Real-World Scenario:**
A data visualization tool arranges values in a zigzag pattern where alternating elements are peaks and valleys for aesthetic graphs.

**Example Setup:** 
A signal processing system reorders samples to create an alternating high-low pattern for oscillation detection.

**What is Wiggle Sort II?**
Reorder array so that nums[0] < nums[1] > nums[2] < nums[3]... (strict inequalities). Must be in-place with O(n log n) or better.

**Why is it important?**
- Median + partitioning
- Virtual indexing
- In-place rearrangement
- Dutch flag variant

**Your Task:** 
Reorder array to wiggle pattern.

---

## Examples

### Example 1:
**Input:** `nums = [1,5,1,1,6,4]`
**Output:** `[1,6,1,5,1,4]` (or any valid wiggle)
**Explanation:** Alternating pattern maintained.

### Example 2:
**Input:** `nums = [1,3,2,2,3,1]`
**Output:** `[2,3,1,3,1,2]` (one valid answer)

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 5 × 10⁴ |
| Element Value | 0 ≤ nums[i] ≤ 5000 |
| Data Type | Integer array |
| Special Conditions | Strict inequalities |
| Time Complexity | O(n) average with quickselect |
| Space Complexity | O(1) |
| Output Format | Wiggle-sorted array |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Tableau |
| 🔵 Amazon | 🟡 Adobe | 🟢 D3.js |
| 🔵 Microsoft | 🟡 Apple | 🟢 Plotly |

---

## Follow-up Questions

1. Why find median first?
2. What's virtual indexing (small-large-medium pattern)?
3. How does three-way partitioning help?
4. What about Wiggle Sort I (non-strict)?
