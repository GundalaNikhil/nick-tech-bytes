# Rotate Image (90 degrees)

## Problem Description

**Real-World Scenario:**
A photo editing app rotates images 90 degrees clockwise. Implement this rotation in-place without using extra matrix.

**Example Setup:** 
A game board rotates its tiles. Each position moves to a new location according to 90-degree rotation rules.

**What is Rotate Image?**
Rotate an n×n matrix by 90 degrees clockwise in-place. Do not allocate another matrix.

**Why is it important?**
- Matrix manipulation
- In-place operations
- Computer graphics
- Image processing

**Your Task:** 
Rotate the matrix 90 degrees clockwise in-place.

---

## Examples

### Example 1:
**Input:** 
```
[[1,2,3],
 [4,5,6],
 [7,8,9]]
```
**Output:** 
```
[[7,4,1],
 [8,5,2],
 [9,6,3]]
```

### Example 2:
**Input:** 
```
[[5,1,9,11],
 [2,4,8,10],
 [13,3,6,7],
 [15,14,12,16]]
```
**Output:** 
```
[[15,13,2,5],
 [14,3,4,1],
 [12,6,8,9],
 [16,7,10,11]]
```

---

## Constraints

| Constraint | Value |
|------------|-------|
| Matrix Size | n × n where 1 ≤ n ≤ 20 |
| Element Value | -1000 ≤ matrix[i][j] ≤ 1000 |
| Data Type | Integer matrix |
| Special Conditions | In-place, no extra matrix |
| Time Complexity | O(n²) |
| Space Complexity | O(1) |
| Output Format | Modified matrix |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Adobe |
| 🔵 Microsoft | 🟡 Apple | 🟢 Figma |
| 🔵 Facebook | 🟡 Uber | 🟢 Canva |

---

## Follow-up Questions

1. What's the transpose + reverse approach?
2. Can you rotate in layers (4-way swap)?
3. How about 90° counter-clockwise?
4. What about 180° rotation?
