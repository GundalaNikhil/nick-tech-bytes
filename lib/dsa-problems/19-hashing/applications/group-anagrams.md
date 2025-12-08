# Group Anagrams

## Problem Description

**Real-World Scenario:**
A word game app wants to show players all words that are anagrams of each other. Given a dictionary of words, group them so players can see related words together.

**Example Setup:** 
A language learning app groups words by their letter composition. "eat", "tea", and "ate" form one group; "tan" and "nat" form another. This helps students see word patterns.

**What is Group Anagrams?**
Given an array of strings, group anagrams together. Anagrams are strings that contain the same characters with the same frequencies.

**Why is it important?**
- Word games
- Search engines (word variations)
- Document analysis
- Hash map + sorting combo

**Your Task:** 
Group all anagrams together and return the groups.

---

## Examples

### Example 1:
**Input:** `strs = ["eat", "tea", "tan", "ate", "nat", "bat"]`
**Output:** `[["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]`
**Explanation:** Three groups of anagrams.

### Example 2:
**Input:** `strs = [""]`
**Output:** `[[""]]`
**Explanation:** Empty string is its own group.

### Example 3:
**Input:** `strs = ["a"]`
**Output:** `[["a"]]`
**Explanation:** Single character.

### Example 4:
**Input:** `strs = ["ab", "ba", "abc", "bca", "cab"]`
**Output:** `[["ab", "ba"], ["abc", "bca", "cab"]]`
**Explanation:** Two groups of anagrams.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ strs.length ≤ 10⁴ |
| String Length | 0 ≤ strs[i].length ≤ 100 |
| Data Type | Lowercase English letters |
| Special Conditions | Group order doesn't matter |
| Time Complexity | O(n × k log k) where k = max string length |
| Space Complexity | O(n × k) |
| Output Format | List of lists |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Zynga |
| 🔵 Facebook | 🟡 Uber | 🟢 Indeed |
| 🔵 Google | 🟡 Apple | 🟢 Quora |
| 🔵 Microsoft | 🟡 Goldman Sachs | 🟢 Zillow |

---

## Follow-up Questions

1. Can you use character count instead of sorting as key?
2. What if strings can have Unicode characters?
3. How would you handle very long strings efficiently?
4. What if you need to find the largest anagram group?
