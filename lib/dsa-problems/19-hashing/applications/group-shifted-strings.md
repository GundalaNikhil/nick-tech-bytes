# Group Shifted Strings

## Problem Description

**Real-World Scenario:**
A cipher system groups messages that use the same shift pattern. "abc" and "bcd" are equivalent (Caesar cipher with different offsets).

**Example Setup:** 
A word game groups words that are "shifted versions" of each other - matching letter-to-letter distance patterns.

**What is Group Shifted Strings?**
Group strings that belong to the same shifting sequence. A shifting sequence is when we can shift all letters by the same amount to go from one string to another.

**Why is it important?**
- Hashing with normalization
- Pattern recognition
- Cipher systems
- Grouping problems

**Your Task:** 
Return groups of shifted strings.

---

## Examples

### Example 1:
**Input:** `strings = ["abc","bcd","acef","xyz","az","ba","a","z"]`
**Output:** `[["acef"],["a","z"],["abc","bcd","xyz"],["az","ba"]]`
**Explanation:** Strings that can shift to each other are grouped.

### Example 2:
**Input:** `strings = ["a"]`
**Output:** `[["a"]]`
**Explanation:** Single string.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Strings | 1 ≤ n ≤ 200 |
| String Length | 1 ≤ s[i].length ≤ 50 |
| Data Type | Lowercase letters |
| Special Conditions | Handle wrap-around (z→a) |
| Time Complexity | O(n × m) where m = avg length |
| Space Complexity | O(n × m) |
| Output Format | Grouped lists |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Twilio |
| 🔵 Amazon | 🟡 Uber | 🟢 Signal |
| 🔵 Microsoft | 🟡 Apple | 🟢 WhatsApp |

---

## Follow-up Questions

1. How do you create a unique key for each shift pattern?
2. How do you handle the z→a wraparound?
3. What about different length strings?
4. Can you normalize to start with 'a'?
