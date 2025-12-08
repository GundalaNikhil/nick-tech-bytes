# Word Ladder

## Problem Description

**Real-World Scenario:**
Remember the word game where you transform one word into another by changing one letter at a time? "CAT" → "COT" → "COG" → "DOG". Each intermediate word must be valid. Find the shortest transformation sequence!

**Example Setup:** 
Meera is buixlding a word puzzle app like Wordle. She wants a "word morph" challenge where players transform a start word into a target word, one letter at a time: The shortest path wins!

**What is Word Ladder?**
Given two words (start and end) and a dictionary, find the shortest transformation sequence where:
1. Only one letter changes at a time
2. Each transformed word must exist in the dictionary

**Why is it important?**
- Word games and puzzles
- Spell checker suggestions
- DNA sequence alignment
- Network packet routing

**Your Task:** 
Find the length of the shortest transformation sequence from startWord to endWord.

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
**Transformation:** hit → hot → dot → dog → cog
**Explanation:** 5 words in the sequence (including start and end).

### Example 2:
**Input:** 
```
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log"]
```
**Output:** `0`
**Explanation:** endWord "cog" is not in wordList.

### Example 3:
**Input:** 
```
beginWord = "a"
endWord = "c"
wordList = ["a","b","c"]
```
**Output:** `2`
**Transformation:** a → c (single letter change)
**Explanation:** Direct transformation if possible.

### Example 4:
**Input:** 
```
beginWord = "hot"
endWord = "dog"
wordList = ["hot","dog"]
```
**Output:** `0`
**Explanation:** Cannot change "hot" to "dog" in one step, and no intermediates exist.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Word Length | 1 ≤ len ≤ 10 |
| WordList Size | 1 ≤ n ≤ 5000 |
| Data Type | Lowercase English letters |
| Special Conditions | All words have same length |
| Time Complexity | O(M² × N) where M = word length, N = word count |
| Space Complexity | O(M × N) |
| Output Format | Integer (length of shortest sequence, 0 if impossible) |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Uber | 🟢 Zynga |
| 🔵 Amazon | 🟡 LinkedIn | 🟢 EA Games |
| 🔵 Facebook | 🟡 Snapchat | 🟢 King |
| 🔵 Microsoft | 🟡 Lyft | 🟢 Scopely |

---

## Follow-up Questions

1. Why is BFS guaranteed to find the shortest path?
2. How would you return all shortest transformation sequences (Word Ladder II)?
3. Can you optimize using bidirectional BFS?
4. How would you preprocess the word list for faster neighbor lookup?
