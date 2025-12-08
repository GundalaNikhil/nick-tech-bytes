# Word Search II (Trie + Backtracking)

## Problem Description

**Real-World Scenario:**
A word puzzle game like Boggle finds all valid words in a letter grid. Given a dictionary, find every word that can be formed by connecting adjacent letters.

**Example Setup:** 
A crossword helper scans a puzzle grid and finds all dictionary words that fit - combining Trie-based lookup with grid traversal.

**What is Word Search II?**
Given a 2D grid of characters and a list of words, find all words that exist in the grid. Each word must be formed by adjacent cells (no reuse per word).

**Why is it important?**
- Trie + backtracking combo
- Word game algorithms
- Efficient multi-word search
- DFS on grid with Trie

**Your Task:** 
Return all words from the list found in the grid.

**Difficulty:** Hard
**Tags:** Trie, Advanced, Trie + Backtracking Combo, Word Game Algorithms, Efficient Multi-Word Search, Dfs On Grid With Trie, O(m × n × 4^L), Interview

---

## Examples

### Example 1:
**Input:** 
```
board = [
  ["o","a","a","n"],
  ["e","t","a","e"],
  ["i","h","k","r"],
  ["i","f","l","v"]
]
words = ["oath","pea","eat","rain"]
```
**Output:** `["eat", "oath"]`
**Explanation:** "eat" and "oath" can be traced in the grid.

### Example 2:
**Input:** `board = [["a","b"],["c","d"]], words = ["abcb"]`
**Output:** `[]`
**Explanation:** Can't form "abcb" (would reuse 'b').

---

## Constraints

| Constraint | Value |
|------------|-------|
| Grid Size | 1 ≤ m, n ≤ 12 |
| Words | 1 ≤ words.length ≤ 3 × 10⁴ |
| Word Length | 1 ≤ word.length ≤ 10 |
| Data Type | Lowercase letters |
| Time Complexity | O(m × n × 4^L) per word hint |
| Space Complexity | O(sum of word lengths) for Trie |
| Output Format | List of found words |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Zynga |
| 🔵 Google | 🟡 Uber | 🟢 King |
| 🔵 Microsoft | 🟡 Pinterest | 🟢 Scopely |

---

## Follow-up Questions

1. Why use Trie instead of searching each word separately?
2. How do you prune the Trie during search?
3. How do you avoid finding the same word twice?
4. What's the difference from single Word Search?
