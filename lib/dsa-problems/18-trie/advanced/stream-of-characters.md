# Stream of Characters

## Problem Description

**Real-World Scenario:**
A content moderation system monitors a live chat stream for banned words in real-time.

**Example Setup:** 
A spell checker highlights typos as you type by checking against a dictionary suffix tree.

**What is Stream of Characters?**
Design an algorithm that accepts a stream of characters and checks if a suffix of these characters is a string of a given array of strings `words`.

**Why is it important?**
- Trie (Reverse Trie)
- Streaming data
- Suffix matching
- Real-time processing

**Your Task:** 
Implement `StreamChecker` class.

---

## Examples

### Example 1:
**Operations:**
```
StreamChecker streamChecker = new StreamChecker(["cd", "f", "kl"]);
streamChecker.query('a'); // return false
streamChecker.query('b'); // return false
streamChecker.query('c'); // return false
streamChecker.query('d'); // return true, because 'cd' is in words
streamChecker.query('e'); // return false
streamChecker.query('f'); // return true, because 'f' is in words
```

---

## Constraints

| Constraint | Value |
|------------|-------|
| Words | 1 ≤ words.length ≤ 2000 |
| Word Length | 1 ≤ words[i].length ≤ 2000 |
| Queries | At most 4 × 10⁴ calls |
| Data Type | Lowercase letters |
| Time Complexity | O(M) per query where M is max word length |
| Space Complexity | O(N * M) for Trie |
| Output Format | Boolean per query |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Twitch |
| 🔵 Amazon | 🟡 Apple | 🟢 Discord |
| 🔵 Facebook | 🟡 Microsoft | 🟢 Slack |

---

## Follow-up Questions

1. Why store words in reverse in the Trie?
2. How do you query efficiently?
3. What is the max depth of traversal per query?
4. How to handle dynamic updates to the dictionary?
