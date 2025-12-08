# Word Search II

## Problem Description

**Real-World Scenario:**
A Boggle game solver finding all valid words from a dictionary that can be formed on a 4x4 grid of letters.

**Example Setup:** 
Finding hidden words in a puzzle grid.

**What is Word Search II?**
Given an `m x n` `board` of characters and a list of strings `words`, return all words on the board.
Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.

**Why is it important?**
- Trie + DFS (Backtracking)
- Pruning (Remove found words from Trie)
- Grid Traversal
- Optimization

**Your Task:** 
Return list of found words.

---

## Examples

### Example 1:
**Input:** `board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]`
**Output:** `["eat","oath"]`

### Example 2:
**Input:** `board = [["a","b"],["c","d"]], words = ["abcb"]`
**Output:** `[]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Grid Size | 1 ≤ m, n ≤ 12 |
| Words (k) | 1 ≤ k ≤ 3 * 10^4 |
| Word Length | 1 ≤ len ≤ 10 |
| Time Complexity | O(M * N * 4^L) |
| Space Complexity | O(K * L) |
| Output Format | String list |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Uber |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Lyft |
| 🔵 Facebook | 🟡 Apple | 🟢 Snap |

---

## Follow-up Questions

1. Why use a Trie instead of checking each word individually? (Prefix pruning).
2. How to optimize? (Remove leaf nodes from Trie after finding a word to avoid re-searching).
3. Why modify the board in-place during DFS? (Visited tracking).
4. Time complexity analysis?
