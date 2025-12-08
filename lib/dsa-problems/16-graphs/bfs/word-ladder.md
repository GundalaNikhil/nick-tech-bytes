# Word Ladder

## Problem Description

**Real-World Scenario:**
A word game transforms one word into another by changing one letter at a time. Each intermediate word must be valid. Find the shortest transformation sequence.

**Example Setup:** 
A spell checker suggests corrections by finding the shortest path of single-letter changes from misspelled to correct word.

**What is Word Ladder?**
Given begin word, end word, and dictionary, find the shortest transformation sequence length. Each transformation changes one letter, and intermediate words must be in dictionary.

**Why is it important?**
- BFS on implicit graph
- Word transformation
- Spell checkers
- Shortest path in word space

**Your Task:** 
Return the length of shortest transformation, or 0 if impossible.

---

## Examples

### Example 1:
**Input:** 
```
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log","cog"]
```
**Output:** `5`
**Explanation:** hit → hot → dot → dog → cog.

### Example 2:
**Input:** Same but endWord absent from list
**Output:** `0`
**Explanation:** End word must be in dictionary.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Word Length | 1 ≤ len ≤ 10 |
| Dictionary Size | 1 ≤ wordList.length ≤ 5000 |
| Data Type | Lowercase letters |
| Special Conditions | All words same length |
| Time Complexity | O(n × m × 26) where m = word length |
| Space Complexity | O(n × m) |
| Output Format | Length or 0 |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Grammarly |
| 🔵 Facebook | 🟡 Uber | 🟢 Quillbot |
| 🔵 Google | 🟡 LinkedIn | 🟢 LanguageTool |

---

## Follow-up Questions

1. How do you find neighbors (one letter different)?
2. Why is BFS better than DFS for shortest path?
3. What about bidirectional BFS optimization?
4. How to find all shortest paths (Word Ladder II)?
