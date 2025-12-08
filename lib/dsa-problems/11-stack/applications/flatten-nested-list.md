# Flatten Nested List Iterator

## Problem Description

**Real-World Scenario:**
A file system iterator traverses nested directories, flattening the structure to iterate through all files sequentially.

**Example Setup:** 
A JSON parser flattens nested arrays like [[1,[4,[6]]]] into a flat sequence [1,4,6].

**What is Flatten Nested List Iterator?**
Implement an iterator to flatten a nested list structure. Each element is either an integer or a list whose elements may also be integers or other lists.

**Why is it important?**
- Iterator pattern
- Stack-based flattening
- Lazy evaluation
- Nested structure traversal

**Your Task:** 
Implement NestedIterator with next() and hasNext().

---

## Examples

### Example 1:
**Input:** `nestedList = [[1,1],2,[1,1]]`
**Output:** `[1,1,2,1,1]`
**Explanation:** Flatten and iterate.

### Example 2:
**Input:** `nestedList = [1,[4,[6]]]`
**Output:** `[1,4,6]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Elements | 1 ≤ total elements ≤ 10⁵ |
| Depth | 1 ≤ nesting depth ≤ 50 |
| Data Type | Nested lists of integers |
| Special Conditions | Lazy evaluation |
| Time Complexity | O(1) amortized per next() |
| Space Complexity | O(depth) |
| Output Format | Iterator interface |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Dropbox |
| 🔵 Facebook | 🟡 LinkedIn | 🟢 Box |
| 🔵 Amazon | 🟡 Apple | 🟢 OneDrive |

---

## Follow-up Questions

1. How do you use a stack to track position?
2. Why flatten in hasNext() not constructor?
3. How to handle deeply nested lists?
4. What about infinite nested structure?
