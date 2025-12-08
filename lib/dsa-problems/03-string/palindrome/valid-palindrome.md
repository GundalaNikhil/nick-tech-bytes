# Valid Palindrome

## Problem Description

**Real-World Scenario:**
A password validator checks if a phrase is a palindrome (reads same forward and backward), ignoring spaces, punctuation, and case. "A man, a plan, a canal: Panama" is a palindrome!

**Example Setup:** 
A word game challenges players to identify palindromic phrases. The game ignores non-alphanumeric characters and case.

**What is Valid Palindrome?**
Check if a string is a palindrome, considering only alphanumeric characters and ignoring case.

**Why is it important?**
- String cleaning/normalization
- Two-pointer technique
- Character classification
- Interview classic

**Your Task:** 
Return true if the string is a valid palindrome.

---

## Examples

### Example 1:
**Input:** `s = "A man, a plan, a canal: Panama"`
**Output:** `true`
**Explanation:** "amanaplanacanalpanama" is a palindrome.

### Example 2:
**Input:** `s = "race a car"`
**Output:** `false`
**Explanation:** "raceacar" is not a palindrome.

### Example 3:
**Input:** `s = " "`
**Output:** `true`
**Explanation:** Empty string after removing non-alphanumeric.

### Example 4:
**Input:** `s = "0P"`
**Output:** `false`
**Explanation:** "0p" ≠ "p0".

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ n ≤ 2 × 10⁵ |
| Data Type | ASCII printable characters |
| Special Conditions | Case-insensitive |
| Time Complexity | O(n) |
| Space Complexity | O(1) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Spotify |
| 🔵 Amazon | 🟡 Adobe | 🟢 Zillow |
| 🔵 Microsoft | 🟡 Uber | 🟢 Yelp |

---

## Follow-up Questions

1. How do you identify alphanumeric characters?
2. How do you handle mixed case comparison?
3. What if you need to find the longest palindromic substring?
4. What about Valid Palindrome II (can delete one character)?
