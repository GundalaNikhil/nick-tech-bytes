# Odd Even Linked List

## Problem Description

**Real-World Scenario:**
A concert venue reorders seating: odd-numbered seats first, then even-numbered seats. Rearrange the seating chart (linked list) accordingly.

**Example Setup:** 
A warehouse picker reorders items: pick odd-positioned items first, then even-positioned, to optimize walking path.

**What is Odd Even Linked List?**
Rearrange a linked list so all nodes at odd indices come before nodes at even indices. Keep relative order within odd and even groups.

**Why is it important?**
- Linked list manipulation
- Two-pointer technique
- In-place rearrangement
- Order preservation

**Your Task:** 
Rearrange nodes with O(1) space and O(n) time.

---

## Examples

### Example 1:
**Input:** `1→2→3→4→5`
**Output:** `1→3→5→2→4`
**Explanation:** Odd indices (1,3,5) then even indices (2,4).

### Example 2:
**Input:** `2→1→3→5→6→4→7`
**Output:** `2→3→6→7→1→5→4`
**Explanation:** Odd positions first, then even.

### Example 3:
**Input:** `1→2`
**Output:** `1→2`
**Explanation:** Already separated.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 0 ≤ n ≤ 10⁴ |
| Node Value | -10⁶ ≤ val ≤ 10⁶ |
| Data Type | Singly linked list |
| Special Conditions | O(1) space, O(n) time |
| Time Complexity | O(n) |
| Space Complexity | O(1) |
| Output Format | Rearranged list |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Microsoft | 🟡 Bloomberg | 🟢 Nvidia |
| 🔵 Amazon | 🟡 Adobe | 🟢 Cisco |
| 🔵 Facebook | 🟡 Uber | 🟢 VMware |

---

## Follow-up Questions

1. How do you maintain two separate chains?
2. Why save the even head?
3. What's the termination condition?
4. Can this be done for any grouping pattern?
