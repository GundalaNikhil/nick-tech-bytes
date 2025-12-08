# Open the Lock

## Problem Description

**Real-World Scenario:**
A security system cracker finds the minimum number of dial turns to open a 4-digit combination lock, avoiding specific "deadend" combinations that trigger an alarm.

**Example Setup:** 
A genetic algorithm finds the shortest mutation path from a starting gene to a target gene, avoiding lethal mutations.

**What is Open the Lock?**
You have a lock in front of you with 4 circular wheels. Each wheel has 10 slots: `'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'`. The wheels can rotate freely and wrap around: for example we can turn `'9'` to be `'0'`, or `'0'` to be `'9'`. Each move consists of turning one wheel one slot. The lock initially starts at `'0000'`, a string representing the state of the 4 wheels. You are given a list of `deadends` dead ends, meaning if the lock displays any of these codes, the wheels of the lock will stop turning and you will be unable to open it. Given a `target` representing the value of the wheels that will unlock the lock, return the minimum total number of turns required to open the lock, or -1 if it is impossible.

**Why is it important?**
- BFS (Shortest Path)
- State Space Search
- String manipulation
- Optimization (Bidirectional BFS)

**Your Task:** 
Return minimum turns.

**Difficulty:** Medium
**Tags:** Graphs, Bfs, State Space Search, String Manipulation, Optimization, O(10^4), Interview

---

## Examples

### Example 1:
**Input:** `deadends = ["0201","0101","0102","1212","2002"], target = "0202"`
**Output:** `6`
**Explanation:** 0000 -> 1000 -> 1100 -> 1200 -> 1201 -> 1202 -> 0202.

### Example 2:
**Input:** `deadends = ["8888"], target = "0009"`
**Output:** `1`
**Explanation:** 0000 -> 0009.

### Example 3:
**Input:** `deadends = ["8887","8889","8878","8898","8788","8988","7888","9888"], target = "8888"`
**Output:** `-1`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Deadends | 1 ≤ len ≤ 500 |
| Target | 4 digits |
| Data Type | String |
| Time Complexity | O(10^4) |
| Space Complexity | O(10^4) |
| Output Format | Integer turns |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 ADT |
| 🔵 Amazon | 🟡 Microsoft | 🟢 SimpliSafe |
| 🔵 Facebook | 🟡 Apple | 🟢 Ring |

---

## Follow-up Questions

1. Why use a HashSet for deadends and visited states?
2. How to generate the 8 neighbors of a state?
3. Why is Bidirectional BFS faster?
4. What if the lock had N wheels?
