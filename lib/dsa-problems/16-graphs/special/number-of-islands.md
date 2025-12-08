# Number of Islands

## Problem Description

**Real-World Scenario:**
You're looking at a satellite image of an ocean region. Land areas (1s) are grouped together to form islands, and water (0s) separates them. How many distinct islands are there?

**Example Setup:** 
NASA's Earth observation team receives grid-based data of a region. Each cell is either land (1) or water (0). They need to count distinct landmasses for environmental monitoring and disaster management.

**What is the Number of Islands Problem?**
Given a 2D grid of 1s (land) and 0s (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.

**Why is it important?**
- Geographic information systems (GIS)
- Image processing (connected components)
- Medical imaging (tumor detection)
- Game development (map generation)

**Your Task:** 
Count the number of islands in a binary 2D grid.

---

## Examples

### Example 1:
**Input:** 
```
grid = [
  ['1','1','0','0','0'],
  ['1','1','0','0','0'],
  ['0','0','1','0','0'],
  ['0','0','0','1','1']
]
```
**Output:** `3`
**Explanation:** 
- Island 1: top-left 2x2 block
- Island 2: middle single cell
- Island 3: bottom-right 1x2 block

### Example 2:
**Input:** 
```
grid = [
  ['1','1','1','1','0'],
  ['1','1','0','1','0'],
  ['1','1','0','0','0'],
  ['0','0','0','0','0']
]
```
**Output:** `1`
**Explanation:** All land cells are connected - one big island.

### Example 3:
**Input:** 
```
grid = [
  ['0','0','0'],
  ['0','0','0']
]
```
**Output:** `0`
**Explanation:** No land, no islands.

### Example 4:
**Input:** 
```
grid = [
  ['1','0','1'],
  ['0','1','0'],
  ['1','0','1']
]
```
**Output:** `5`
**Explanation:** Diagonal cells are NOT connected - 5 separate single-cell islands.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Grid Rows | 1 ≤ m ≤ 300 |
| Grid Cols | 1 ≤ n ≤ 300 |
| Data Type | Characters '1' or '0' |
| Special Conditions | Only horizontal/vertical adjacency counts |
| Time Complexity | O(m × n) |
| Space Complexity | O(m × n) worst case for recursion |
| Output Format | Integer count of islands |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Uber | 🟢 Zillow |
| 🔵 Amazon | 🟡 LinkedIn | 🟢 Yelp |
| 🔵 Facebook | 🟡 Twitter | 🟢 Expedia |
| 🔵 Microsoft | 🟡 Bloomberg | 🟢 DoorDash |

---

## Follow-up Questions

1. Can you solve this without modifying the original grid?
2. How would you use Union-Find (DSU) for this problem?
3. What if diagonal connections also count?
4. How would you find the largest island?
