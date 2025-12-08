# Shifting Letters

## Problem Description

**Real-World Scenario:**
A cryptographic cipher applies a series of cumulative shift operations to a message string to encrypt it.

**Example Setup:** 
A mechanical odometer rolls digits forward based on a sequence of inputs.

**What is Shifting Letters?**
You are given a string `s` of lowercase English letters and an integer array `shifts` of the same length. Call the `shift()` of a letter, the next letter in the alphabet, (wrapping around so that 'z' becomes 'a'). For example, `shift('a') = 'b'`, `shift('t') = 'u'`, and `shift('z') = 'a'`. Now for each `shifts[i] = x`, we want to shift the first `i + 1` letters of `s`, `x` times. Return the final string after all such shifts to `s` are applied.

**Why is it important?**
- Prefix/Suffix Sums
- Modular Arithmetic
- String manipulation
- Optimization

**Your Task:** 
Return the final string.

**Difficulty:** Medium
**Tags:** String, Basic Operations, Prefix/Suffix Sums, Modular Arithmetic, String Manipulation, Optimization, O(N), Interview

---

## Examples

### Example 1:
**Input:** `s = "abc", shifts = [3,5,9]`
**Output:** `rpl`
**Explanation:** 
Shift 0 (3 times): "dbc" -> "abc" shifted 3 is "def"? No, first i+1 chars.
i=0: shift s[0] 3 times. "dbc".
i=1: shift s[0..1] 5 times. "igc".
i=2: shift s[0..2] 9 times. "rpl".

### Example 2:
**Input:** `s = "aaa", shifts = [1,2,3]`
**Output:** `gfd`

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ s.length ≤ 10⁵ |
| Shifts | 0 ≤ shifts[i] ≤ 10⁹ |
| Data Type | String |
| Time Complexity | O(N) |
| Space Complexity | O(N) |
| Output Format | String |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 WhatsApp |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Signal |
| 🔵 Facebook | 🟡 Apple | 🟢 Telegram |

---

## Follow-up Questions

1. Why calculate suffix sums of shifts?
2. `total_shift[i] = (shifts[i] + total_shift[i+1]) % 26`?
3. Why iterate backwards?
4. How to handle large shift values (modulo 26)?
