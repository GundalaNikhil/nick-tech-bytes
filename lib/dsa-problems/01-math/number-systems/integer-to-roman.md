# Integer to Roman

## Problem Description

**Real-World Scenario:**
Classic watches and movie credits display years in Roman numerals. Convert a given year (like 2024) to Roman (MMXXIV).

**Example Setup:** 
A museum exhibit generator converts dates to Roman numerals for historical authenticity.

**What is Integer to Roman?**
Convert an integer to its Roman numeral representation. Use greedy approach with value-symbol pairs.

**Why is it important?**
- Greedy algorithms
- Number representation
- Cultural applications
- String building

**Your Task:** 
Return the Roman numeral string.

---

## Examples

### Example 1:
**Input:** `num = 3749`
**Output:** `"MMMDCCXLIX"`
**Explanation:** 3000=MMM, 700=DCC, 40=XL, 9=IX.

### Example 2:
**Input:** `num = 58`
**Output:** `"LVIII"`
**Explanation:** 50=L, 5=V, 3=III.

### Example 3:
**Input:** `num = 1994`
**Output:** `"MCMXCIV"`
**Explanation:** 1000=M, 900=CM, 90=XC, 4=IV.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Number Range | 1 ≤ num ≤ 3999 |
| Data Type | Integer |
| Special Conditions | All valid Roman numerals |
| Time Complexity | O(1) - fixed iterations |
| Space Complexity | O(1) |
| Output Format | String |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Rolex |
| 🔵 Microsoft | 🟡 Oracle | 🟢 Patek Philippe |
| 🔵 Apple | 🟡 Adobe | 🟢 Omega |

---

## Follow-up Questions

1. What are the 13 value-symbol pairs needed?
2. Why is greedy (subtract largest first) correct?
3. What about Roman to Integer (reverse)?
4. Why is 3999 the typical maximum?
