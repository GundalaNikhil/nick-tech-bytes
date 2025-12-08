# Container With Most Water

## Problem Description

**Real-World Scenario:**
You're designing a swimming pool with vertical walls of different heights placed at unit intervals. You want to fill it with water. The amount of water depends on which two walls you choose - the water level can only reach the shorter wall. How do you maximize the water volume?

**Example Setup:** 
An architect is designing a decorative water feature. She has vertical glass panels of different heights. Water will fill between any two panels up to the shorter panel's height. Which two panels should she use to hold maximum water?

**What is Container With Most Water?**
Given n vertical lines where the ith line has height height[i], find two lines that form a container holding the most water. The width is the distance between lines.

**Why is it important?**
- Classic two-pointer technique
- Greedy observation skills
- Real-world optimization
- Teaches thinking about area = width × height

**Your Task:** 
Find the maximum water a container can store (area between two lines).

---

## Examples

### Example 1:
**Input:** `height = [1, 8, 6, 2, 5, 4, 8, 3, 7]`
**Output:** `49`
**Explanation:** Use lines at index 1 (height 8) and index 8 (height 7). Area = 7 × (8-1) = 49.

### Example 2:
**Input:** `height = [1, 1]`
**Output:** `1`
**Explanation:** Only two lines, area = min(1,1) × 1 = 1.

### Example 3:
**Input:** `height = [4, 3, 2, 1, 4]`
**Output:** `16`
**Explanation:** Use the two 4s at ends: min(4,4) × 4 = 16.

### Example 4:
**Input:** `height = [1, 2, 1]`
**Output:** `2`
**Explanation:** Use index 0 and 2: min(1,1) × 2 = 2.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 2 ≤ n ≤ 10⁵ |
| Height Range | 0 ≤ height[i] ≤ 10⁴ |
| Data Type | Non-negative integers |
| Special Conditions | Lines have no thickness |
| Time Complexity | O(n) |
| Space Complexity | O(1) |
| Output Format | Maximum area integer |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Adobe | 🟢 Quora |
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Indeed |
| 🔵 Facebook | 🟡 Uber | 🟢 Wayfair |
| 🔵 Apple | 🟡 Goldman Sachs | 🟢 Zillow |

---

## Follow-up Questions

1. Why does the two-pointer approach work?
2. Why do we move the pointer at the shorter line?
3. How is this different from Trapping Rain Water?
4. Can you solve it with O(n²)? Why is O(n) better?
