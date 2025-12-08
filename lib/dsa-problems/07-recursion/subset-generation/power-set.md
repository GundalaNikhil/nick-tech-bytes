# Power Set (All Subsets)

## Problem Description

**Real-World Scenario:**
A restaurant menu offers "build your own" combos. Given available toppings, generate all possible combinations a customer could order.

**Example Setup:** 
An A/B testing platform generates all possible combinations of features to test. With 3 features, there are 2³ = 8 test configurations.

**What is Power Set?**
Generate all possible subsets (including empty set) of a given set. For n elements, there are 2^n subsets.

**Why is it important?**
- Subset enumeration
- Backtracking template
- Combinatorial problems
- Bit manipulation approach

**Your Task:** 
Return all possible subsets (power set).

---

## Examples

### Example 1:
**Input:** `nums = [1, 2, 3]`
**Output:** `[[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]`
**Explanation:** All 2³ = 8 subsets.

### Example 2:
**Input:** `nums = [0]`
**Output:** `[[], [0]]`
**Explanation:** Empty and single element.

### Example 3:
**Input:** `nums = []`
**Output:** `[[]]`
**Explanation:** Only empty set.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 0 ≤ n ≤ 10 |
| Element Value | -10 ≤ nums[i] ≤ 10 |
| Data Type | Integer array |
| Special Conditions | All distinct elements |
| Time Complexity | O(n × 2^n) |
| Space Complexity | O(n) recursion |
| Output Format | List of lists |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Zynga |
| 🔵 Facebook | 🟡 Adobe | 🟢 Optimizely |
| 🔵 Google | 🟡 Microsoft | 🟢 Amplitude |

---

## Follow-up Questions

1. How does the backtracking approach work?
2. How does the bit manipulation approach work?
3. What if there are duplicates (Subsets II)?
4. What's the iterative cascading approach?
