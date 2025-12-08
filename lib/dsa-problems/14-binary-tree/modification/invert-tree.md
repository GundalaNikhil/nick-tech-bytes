# Invert Binary Tree

## Problem Description

**Real-World Scenario:**
A photo mirror effect flips an image horizontally. Similarly, inverting a binary tree swaps left and right children at every level - creating a mirror image of the tree.

**Example Setup:** 
A family tree display needs a "mirror view" for right-to-left reading cultures. Invert the tree so left becomes right and vice versa at every node.

**What is Invert Binary Tree?**
Swap the left and right children of every node in the tree, creating its mirror image.

**Why is it important?**
- Fundamental tree manipulation
- Recursion practice
- Famous Homebrew author tweet
- Interview classic

**Your Task:** 
Return the inverted binary tree.

---

## Examples

### Example 1:
**Input:** 
```
     4
   /   \
  2     7
 / \   / \
1   3 6   9
```
**Output:** 
```
     4
   /   \
  7     2
 / \   / \
9   6 3   1
```
**Explanation:** Every level is mirrored.

### Example 2:
**Input:** 
```
  2
 / \
1   3
```
**Output:** 
```
  2
 / \
3   1
```
**Explanation:** Children swapped.

### Example 3:
**Input:** Empty tree
**Output:** Empty tree

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 0 ≤ n ≤ 100 |
| Node Value | -100 ≤ val ≤ 100 |
| Data Type | Binary tree |
| Special Conditions | Invert all levels |
| Time Complexity | O(n) |
| Space Complexity | O(h) for recursion |
| Output Format | Root of inverted tree |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Spotify |
| 🔵 Amazon | 🟡 Uber | 🟢 Zillow |
| 🔵 Apple | 🟡 LinkedIn | 🟢 Twilio |

---

## Follow-up Questions

1. Can you do this iteratively?
2. Is this the same as rotating a tree?
3. How would you check if two trees are mirrors?
4. Why is this problem famous in tech culture?
