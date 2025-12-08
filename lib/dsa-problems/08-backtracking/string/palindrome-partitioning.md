# Palindrome Partitioning

## Problem Description

**Real-World Scenario:**
A text analyzer splits sentences into palindromic segments for linguistic analysis. Find all possible ways to partition a string into palindromes.

**Example Setup:** 
A word game challenges players to break words into palindrome pieces. Find all valid breakdowns.

**What is Palindrome Partitioning?**
Given a string, partition it such that every substring is a palindrome. Return all possible partitions.

**Why is it important?**
- Backtracking classic
- Palindrome checking
- String partitioning
- All-solutions enumeration

**Your Task:** 
Return all palindrome partitions.

---

## Examples

### Example 1:
**Input:** `s = "aab"`
**Output:** `[["a","a","b"], ["aa","b"]]`
**Explanation:** Two valid partitions.

### Example 2:
**Input:** `s = "a"`
**Output:** `[["a"]]`
**Explanation:** Single character is palindrome.

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ s.length ≤ 16 |
| Data Type | Lowercase letters |
| Special Conditions | All partitions valid |
| Time Complexity | O(n × 2^n) |
| Space Complexity | O(n) for recursion |
| Output Format | List of lists |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Grammarly |
| 🔵 Google | 🟡 Adobe | 🟢 Quillbot |
| 🔵 Facebook | 🟡 Apple | 🟢 ProWritingAid |

---

## Follow-up Questions

1. How do you efficiently check if substring is palindrome?
2. Can you precompute a isPalindrome table?
3. What about Palindrome Partitioning II (min cuts)?
4. How to prune the backtracking?
