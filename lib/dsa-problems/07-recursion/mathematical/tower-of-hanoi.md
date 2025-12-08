# Tower of Hanoi

## Problem Description

**Real-World Scenario:**
In an ancient temple, monks are moving 64 golden disks between 3 diamond needles following strict rules. Legend says when they finish, the world ends! This puzzle teaches recursive thinking beautifully.

**Example Setup:** 
A toys store has a Tower of Hanoi game. They want to print the solution for any number of disks to include in the instruction manual.

**What is Tower of Hanoi?**
Move N disks from source peg to destination peg using an auxiliary peg. Rules:
1. Only one disk can be moved at a time
2. A larger disk cannot be placed on a smaller disk
3. Only the top disk of any peg can be moved

**Why is it important?**
- Classic recursion problem
- Shows power of recursive thinking
- Minimum moves = 2^n - 1
- Used in backup rotation schemes

**Your Task:** 
Print the sequence of moves to solve Tower of Hanoi for N disks.

---

## Examples

### Example 1:
**Input:** `n = 2`
**Output:** 
```
Move disk 1 from A to B
Move disk 2 from A to C
Move disk 1 from B to C
```
**Explanation:** 3 moves for 2 disks (2² - 1 = 3).

### Example 2:
**Input:** `n = 3`
**Output:** 
```
Move disk 1 from A to C
Move disk 2 from A to B
Move disk 1 from C to B
Move disk 3 from A to C
Move disk 1 from B to A
Move disk 2 from B to C
Move disk 1 from A to C
```
**Explanation:** 7 moves for 3 disks (2³ - 1 = 7).

### Example 3:
**Input:** `n = 1`
**Output:** `Move disk 1 from A to C`
**Explanation:** Single disk, single move.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Disk Count | 1 ≤ n ≤ 20 |
| Data Type | Integer |
| Special Conditions | Three pegs: source, auxiliary, destination |
| Time Complexity | O(2^n) |
| Space Complexity | O(n) recursion stack |
| Output Format | Sequence of moves |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Adobe | 🟢 Epic Systems |
| 🔵 Amazon | 🟡 VMware | 🟢 Qualcomm |
| 🔵 Microsoft | 🟡 Bloomberg | 🟢 Nvidia |

---

## Follow-up Questions

1. Why is the minimum moves 2^n - 1?
2. What's the recursive logic (move n-1, then 1, then n-1)?
3. Can you solve iteratively?
4. What's the Frame-Stewart algorithm for 4+ pegs?
