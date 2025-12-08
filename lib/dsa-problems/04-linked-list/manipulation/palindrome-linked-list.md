# Palindrome Linked List

## Problem Description

**Real-World Scenario:**
A DNA sequence analyzer checks if a genetic sequence reads the same forward and backward - a palindromic pattern that may indicate important biological markers.

**Example Setup:** 
A message encryption system verifies if an encoded message (stored as a linked list) is symmetric. This is checked during the verification phase.

**What is Palindrome Linked List?**
Given a singly linked list, check if the values form a palindrome.

**Why is it important?**
- Linked list + string problem combo
- Fast/slow pointer + reversal
- O(1) space challenge
- DNA/pattern analysis

**Your Task:** 
Return true if the linked list is a palindrome.

**Difficulty:** Medium
**Tags:** Linked List, Manipulation, Linked List + String Problem Combo, Fast/Slow Pointer + Reversal, O Space Challenge, Dna/Pattern Analysis, O(n), Interview

---

## Examples

### Example 1:
**Input:** `1 → 2 → 2 → 1`
**Output:** `true`
**Explanation:** Same forwards and backwards.

### Example 2:
**Input:** `1 → 2`
**Output:** `false`
**Explanation:** 1,2 ≠ 2,1.

### Example 3:
**Input:** `1 → 2 → 3 → 2 → 1`
**Output:** `true`
**Explanation:** Odd-length palindrome.

### Example 4:
**Input:** `1`
**Output:** `true`
**Explanation:** Single element is palindrome.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ n ≤ 10⁵ |
| Node Value | 0 ≤ val ≤ 9 |
| Data Type | Singly linked list |
| Special Conditions | O(n) time, O(1) space possible |
| Time Complexity | O(n) |
| Space Complexity | O(1) with reversal |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Illumina |
| 🔵 Amazon | 🟡 Adobe | 🟢 23andMe |
| 🔵 Microsoft | 🟡 Uber | 🟢 Snap |

---

## Follow-up Questions

1. How do you find the middle of the list?
2. Why reverse the second half?
3. Should you restore the list after checking?
4. Can you solve with O(n) space using a stack?
