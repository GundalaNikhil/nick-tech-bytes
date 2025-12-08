# Bag of Tokens

## Problem Description

**Real-World Scenario:**
A trading bot manages "Power" (capital) and "Score" (reputation). It can buy reputation with capital (buy low) or sell reputation for capital (sell high) to maximize final reputation.

**Example Setup:** 
A game character manages energy and XP. Spend energy to gain XP (train), or spend XP to gain energy (rest/meditate).

**What is Bag of Tokens?**
You have an initial power `P`, an initial score of `0`, and a bag of `tokens` where `tokens[i]` is the value of the `ith` token. Your goal is to maximize your total score by potentially playing each token in one of two ways:
1. Face-up: If your current power is at least `tokens[i]`, you may play the `ith` token face up, losing `tokens[i]` power and gaining `1` score.
2. Face-down: If your current score is at least `1`, you may play the `ith` token face down, gaining `tokens[i]` power and losing `1` score.
Return the largest possible score you can achieve after playing any number of tokens.

**Why is it important?**
- Greedy Strategy
- Sorting + Two Pointers
- Resource management
- Optimization

**Your Task:** 
Return max score.

---

## Examples

### Example 1:
**Input:** `tokens = [100], P = 50`
**Output:** `0`

### Example 2:
**Input:** `tokens = [100,200], P = 150`
**Output:** `1`
**Explanation:** Buy 100 (Power 50, Score 1).

### Example 3:
**Input:** `tokens = [100,200,300,400], P = 200`
**Output:** `2`
**Explanation:** 
Buy 100 (P=100, S=1).
Buy 200 (P=0, S=2)? No, need 200.
Sell 400 (P=600, S=0)? No, need score.
Strategy: Buy smallest, Sell largest.
Buy 100 (P=100, S=1).
Sell 400 (P=500, S=0).
Buy 200 (P=300, S=1).
Buy 300 (P=0, S=2).
Max score 2.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Tokens | 0 ≤ n ≤ 1000 |
| Value | 0 ≤ tokens[i] ≤ 10⁴ |
| Power | 0 ≤ P ≤ 10⁴ |
| Data Type | Integer array |
| Time Complexity | O(N log N) |
| Space Complexity | O(1) or O(N) |
| Output Format | Integer score |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Coinbase |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Robinhood |
| 🔵 Facebook | 🟡 Apple | 🟢 Kraken |

---

## Follow-up Questions

1. Why sort tokens?
2. Why buy smallest (face-up) and sell largest (face-down)?
3. Why track `maxScore` during the process?
4. When should you stop?
