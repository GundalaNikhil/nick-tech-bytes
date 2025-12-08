# Valid Anagram

## Problem Description

**Real-World Scenario:**
Scrabble validates that players use exactly the letters on their rack, no more, no less. Checking if one word is an anagram of another means verifying both use identical letters with identical frequencies.

**Example Setup:** 
A children's word game asks: "Can you rearrange the letters in 'listen' to make another word?" Players discover it can become 'silent' - they're anagrams!

**What is Valid Anagram?**
Two strings are anagrams if they contain the exact same characters with the exact same frequencies, just rearranged.

**Why is it important?**
- Word games (Scrabble, Wordle)
- Cryptography
- Database duplicate detection
- Character frequency counting

**Your Task:** 
Return true if the two strings are anagrams of each other.

---

## Examples

### Example 1:
**Input:** `s = "anagram", t = "nagaram"`
**Output:** `true`
**Explanation:** Same letters, same counts, different order.

### Example 2:
**Input:** `s = "rat", t = "car"`
**Output:** `false`
**Explanation:** 't' vs 'c' - different letters.

### Example 3:
**Input:** `s = "a", t = "a"`
**Output:** `true`
**Explanation:** Identical single characters.

### Example 4:
**Input:** `s = "ab", t = "a"`
**Output:** `false`
**Explanation:** Different lengths can't be anagrams.

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ n ≤ 5 × 10⁴ |
| Data Type | Lowercase English letters |
| Special Conditions | Same length required |
| Time Complexity | O(n) with hash map |
| Space Complexity | O(1) - max 26 characters |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Zynga |
| 🔵 Google | 🟡 Adobe | 🟢 Spotify |
| 🔵 Facebook | 🟡 Uber | 🟢 Zillow |
| 🔵 Microsoft | 🟡 Oracle | 🟢 Quora |

---

## Follow-up Questions

1. What if inputs contain Unicode characters?
2. Can you solve with O(1) space using sorting?
3. How would you find all anagrams in a dictionary?
4. How about Group Anagrams (group words that are anagrams)?
