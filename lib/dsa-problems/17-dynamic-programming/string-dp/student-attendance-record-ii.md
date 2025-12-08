# Student Attendance Record II

## Problem Description

**Real-World Scenario:**
A payroll system calculates the number of valid attendance records for an employee to be eligible for a bonus, based on strict absence and lateness rules.

**Example Setup:** 
A reliability model counts the number of valid system state sequences of length N that do not violate failure thresholds (e.g., max 1 critical failure, max 2 consecutive warnings).

**What is Student Attendance Record II?**
An attendance record for a student can be represented as a string where each character signifies whether the student was absent ('A'), late ('L'), or present ('P'). The record is valid if:
1. The student was absent ('A') for strictly fewer than 2 days total.
2. The student was never late ('L') for 3 or more consecutive days.
Given an integer `n`, return the number of possible attendance records of length `n` that make a student eligible for an attendance award. The answer may be very large, so return it modulo 10^9 + 7.

**Why is it important?**
- DP with State (Length, A count, L streak)
- Matrix Exponentiation (for large N)
- Combinatorics
- Hard counting problem

**Your Task:** 
Return count of valid records.

---

## Examples

### Example 1:
**Input:** `n = 2`
**Output:** `8`
**Explanation:** 
PP, PA, PL, AP, AL, LP, LL, LA.
(AA is invalid - 2 Absences).

### Example 2:
**Input:** `n = 1`
**Output:** `3`
**Explanation:** P, A, L.

### Example 3:
**Input:** `n = 10101`
**Output:** `183236316`

---

## Constraints

| Constraint | Value |
|------------|-------|
| N Value | 1 ≤ n ≤ 10⁵ |
| Data Type | Integer |
| Special Conditions | Modulo 10^9 + 7 |
| Time Complexity | O(N) or O(log N) with Matrix Exp |
| Space Complexity | O(1) (State size 2*3=6) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Workday |
| 🔵 Amazon | 🟡 Microsoft | 🟢 ADP |
| 🔵 Facebook | 🟡 Apple | 🟢 Paycom |

---

## Follow-up Questions

1. What are the DP states `dp[i][j][k]` (len i, j Absences, k trailing Lates)?
2. Why is the state space constant (2 Absences * 3 Lates = 6 states)?
3. How to use Matrix Exponentiation to solve for N=10^9?
4. What is the transition matrix?
