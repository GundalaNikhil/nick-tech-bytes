# Word Search

## Problem Description

**Real-World Scenario:**
In a word-search puzzle magazine, you hunt for words hidden in a grid. Words can be found by moving horizontally or vertically to adjacent cells.

**Example Setup:** 
A crossword puzzle generator needs to verify if a word can be traced in the grid by moving through adjacent cells without reusing any cell.

**What is Word Search?**
Given an m×n grid of characters and a word, determine if the word exists in the grid. You can move horizontally or vertically from one cell to adjacent cells. Each cell can be used only once per word.

**Why is it important?**
- Classic backtracking on grid
- DFS with visited tracking
- Board game logic
- Pattern matching

**Your Task:** 
Return true if the word can be found in the grid.

**Difficulty:** Medium
**Tags:** Backtracking, Path, Classic Backtracking On Grid, Dfs With Visited Tracking, Board Game Logic, Pattern Matching, O(m × n × 4^L), Interview

---

## Examples

### Example 1:
**Input:** 
```
board = [
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]
word = "ABCCED"
```
**Output:** `true`
**Explanation:** Path: A(0,0)→B(0,1)→C(0,2)→C(1,2)→E(2,2)→D(2,1)

### Example 2:
**Input:** Same board, `word = "SEE"`
**Output:** `true`
**Explanation:** Path: S(1,3)→E(2,3)→E(2,2)

### Example 3:
**Input:** Same board, `word = "ABCB"`
**Output:** `false`
**Explanation:** Can't reuse B at (0,1).

---

## Constraints

| Constraint | Value |
|------------|-------|
| Grid Rows | 1 ≤ m ≤ 6 |
| Grid Cols | 1 ≤ n ≤ 6 |
| Word Length | 1 ≤ word.length ≤ 15 |
| Data Type | Uppercase/lowercase letters |
| Special Conditions | No cell reuse per word |
| Time Complexity | O(m × n × 4^L) where L = word length |
| Space Complexity | O(L) for recursion |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Zynga |
| 🔵 Facebook | 🟡 Uber | 🟢 Electronic Arts |
| 🔵 Microsoft | 🟡 Snapchat | 🟢 King |

---

## Follow-up Questions

1. How do you optimize to prune early?
2. How would you find all words from a dictionary (Word Search II)?
3. What if you can move diagonally too?
4. How would you track the path?
