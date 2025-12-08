# Remove K Digits

## Problem Description

**Real-World Scenario:**
A receipt printer minimizes the displayed total by removing k digits - find the smallest number.

**Example Setup:** 
An accountant reduces a number's value by crossing out k digits for minimum tax liability (hypothetically).

**What is Remove K Digits?**
Given a non-negative integer as a string, remove k digits to make the smallest possible number. Remove leading zeros.

**Why is it important?**
- Monotonic stack
- Greedy removal
- Number manipulation
- String optimization

**Your Task:** 
Return the smallest number after removing k digits.

---

## Examples

### Example 1:
**Input:** `num = "1432219", k = 3`
**Output:** `"1219"`
**Explanation:** Remove 4, 3, 2 to get 1219.

### Example 2:
**Input:** `num = "10200", k = 1`
**Output:** `"200"`
**Explanation:** Remove 1, then strip leading zero.

### Example 3:
**Input:** `num = "10", k = 2`
**Output:** `"0"`
**Explanation:** Remove all, return "0".

---

## Constraints

| Constraint | Value |
|------------|-------|
| Number Length | 1 ≤ n ≤ 10⁵ |
| K Value | 0 ≤ k ≤ n |
| Data Type | Digit string |
| Special Conditions | No leading zeros (except "0") |
| Time Complexity | O(n) |
| Space Complexity | O(n) |
| Output Format | Smallest number string |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Intuit |
| 🔵 Microsoft | 🟡 Adobe | 🟢 TurboTax |
| 🔵 Google | 🟡 Oracle | 🟢 H&R Block |

---

## Follow-up Questions

1. Why remove larger digits when they precede smaller?
2. How does the monotonic stack work here?
3. How do you handle remaining k after one pass?
4. How do you handle leading zeros?
