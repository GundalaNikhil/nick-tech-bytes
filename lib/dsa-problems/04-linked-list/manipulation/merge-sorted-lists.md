# Merge Two Sorted Linked Lists

## Problem Description

**Real-World Scenario:**
Two warehouses maintain sorted inventory lists. When merging into one central system, you need to combine these sorted lists into a single sorted list efficiently.

**Example Setup:** 
Two Spotify playlists are sorted by song popularity. To create a combined "Top Hits" playlist that stays sorted, merge both lists while maintaining order.

**What is Merge Two Sorted Lists?**
Given two sorted linked lists, merge them into one sorted list by splicing together the nodes of the original lists.

**Why is it important?**
- Foundation for merge sort
- Common in database operations
- File merging in OS
- Building block for "Merge K Sorted Lists"

**Your Task:** 
Merge two sorted linked lists and return the head of the new sorted list.

**Difficulty:** Medium
**Tags:** Linked List, Manipulation, Foundation For Merge Sort, Common In Database Operations, File Merging In Os, Building Block For "Merge K Sorted Lists", O(n + m), Interview

---

## Examples

### Example 1:
**Input:** 
```
list1: 1 → 2 → 4
list2: 1 → 3 → 4
```
**Output:** `1 → 1 → 2 → 3 → 4 → 4`
**Explanation:** Interleave maintaining sort order.

### Example 2:
**Input:** 
```
list1: empty
list2: empty
```
**Output:** `empty`
**Explanation:** Both empty, result is empty.

### Example 3:
**Input:** 
```
list1: empty
list2: 0
```
**Output:** `0`
**Explanation:** One empty, return the other.

### Example 4:
**Input:** 
```
list1: 1 → 5 → 10
list2: 2 → 3 → 4
```
**Output:** `1 → 2 → 3 → 4 → 5 → 10`
**Explanation:** Merge in sorted order.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 0 ≤ n, m ≤ 50 |
| Node Value | -100 ≤ val ≤ 100 |
| Data Type | Sorted linked lists |
| Special Conditions | Both lists are sorted ascending |
| Time Complexity | O(n + m) |
| Space Complexity | O(1) iterative, O(n+m) recursive |
| Output Format | Head of merged list |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Indeed |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Nvidia |
| 🔵 Google | 🟡 Uber | 🟢 Qualcomm |
| 🔵 Facebook | 🟡 LinkedIn | 🟢 Cisco |

---

## Follow-up Questions

1. Can you do this recursively?
2. How would you merge K sorted lists efficiently?
3. What if the lists were sorted in descending order?
4. How is this used in merge sort?
