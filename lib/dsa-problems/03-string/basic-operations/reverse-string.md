# Reverse String

## Problem Description

**Real-World Scenario:**
A text editor implements an "undo" feature that reverses typed characters. Also, palindrome checkers often reverse strings to compare.

**Example Setup:** 
A messaging app has a "secret mode" that reverses messages for fun. Reverse the input string in-place to save memory.

**What is Reverse String?**
Reverse a string in-place. Do not allocate extra space for another array; modify the input array with O(1) extra memory.

**Why is it important?**
- Basic string manipulation
- Two-pointer technique
- In-place modification
- Foundation for other problems

**Your Task:** 
Reverse the string in-place.

---

## Examples

### Example 1:
**Input:** `s = ["h","e","l","l","o"]`
**Output:** `["o","l","l","e","h"]`
**Explanation:** Swap first and last, move inward.

### Example 2:
**Input:** `s = ["H","a","n","n","a","h"]`
**Output:** `["h","a","n","n","a","H"]`
**Explanation:** Reversed while preserving case.

### Example 3:
**Input:** `s = ["a"]`
**Output:** `["a"]`
**Explanation:** Single character unchanged.

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ n ≤ 10⁵ |
| Data Type | ASCII printable characters |
| Special Conditions | In-place, O(1) space |
| Time Complexity | O(n) |
| Space Complexity | O(1) |
| Output Format | Modified array |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Nvidia |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Cisco |
| 🔵 Apple | 🟡 Oracle | 🟢 Qualcomm |

---

## Follow-up Questions

1. Can you do this recursively?
2. How would you reverse words in a sentence?
3. What if you need to reverse only vowels?
4. How about reversing in groups of K?
