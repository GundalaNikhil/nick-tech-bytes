# Reorder List

## Problem Description

**Real-World Scenario:**
A playlist shuffler interleaves songs from front and back for variety: first song, last song, second song, second-to-last, etc.

**Example Setup:** 
A card dealer interleaves a deck: top, bottom, second-from-top, second-from-bottom, creating an interesting shuffle.

**What is Reorder List?**
Reorder a linked list: L0→L1→L2→...→Ln becomes L0→Ln→L1→Ln-1→L2→Ln-2→...

**Why is it important?**
- Linked list manipulation
- Find middle + reverse + merge
- In-place reorganization
- Combines multiple techniques

**Your Task:** 
Reorder the list in-place.

---

## Examples

### Example 1:
**Input:** `1 → 2 → 3 → 4`
**Output:** `1 → 4 → 2 → 3`
**Explanation:** Interleave from ends.

### Example 2:
**Input:** `1 → 2 → 3 → 4 → 5`
**Output:** `1 → 5 → 2 → 4 → 3`
**Explanation:** Middle node stays in place.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ n ≤ 5 × 10⁴ |
| Node Value | 1 ≤ val ≤ 1000 |
| Data Type | Singly linked list |
| Special Conditions | In-place, no extra list |
| Time Complexity | O(n) |
| Space Complexity | O(1) |
| Output Format | Modified list in-place |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Spotify |
| 🔵 Facebook | 🟡 Adobe | 🟢 Pandora |
| 🔵 Microsoft | 🟡 Apple | 🟢 SoundCloud |

---

## Follow-up Questions

1. What are the three steps (find middle, reverse, merge)?
2. How do you split the list in half?
3. How do you interleave two lists?
4. Can you solve with a stack?
