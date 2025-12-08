# Intersection of Two Linked Lists

## Problem Description

**Real-World Scenario:**
Two road networks merge at an intersection. Given the start of two roads (linked lists), find the exact intersection point where they merge.

**Example Setup:** 
A genealogy app traces two family trees. If they share a common ancestor, find where the lineages merge. The intersection node is the common ancestor.

**What is Intersection of Two Linked Lists?**
Given two linked lists, determine if they intersect and return the intersection node. If no intersection, return null.

**Why is it important?**
- Two-pointer technique
- Length difference handling
- Shared memory detection
- Graph intersection

**Your Task:** 
Return the intersection node or null.

---

## Examples

### Example 1:
**Input:** 
```
List A: 1→2→3→8→4→5
List B: 7→6→8→4→5
           ↑ intersection
```
**Output:** Node with value 8
**Explanation:** Lists merge at node 8.

### Example 2:
**Input:** 
```
List A: 1→2→3
List B: 4→5→6
```
**Output:** null
**Explanation:** No intersection.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 0 ≤ n, m ≤ 3 × 10⁴ |
| Node Value | 1 ≤ val ≤ 10⁵ |
| Data Type | Singly linked list |
| Special Conditions | Intersection by reference, not value |
| Time Complexity | O(n + m) |
| Space Complexity | O(1) |
| Output Format | Intersection node or null |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Ancestry |
| 🔵 Microsoft | 🟡 Adobe | 🟢 MyHeritage |
| 🔵 Facebook | 🟡 Uber | 🟢 23andMe |

---

## Follow-up Questions

1. How does the two-pointer "switch heads" approach work?
2. Why do both pointers meet at intersection?
3. Can you use a hash set (O(n) space)?
4. What if you need to preserve original lists?
