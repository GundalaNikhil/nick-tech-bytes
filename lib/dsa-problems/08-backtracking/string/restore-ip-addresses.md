# Restore IP Addresses

## Problem Description

**Real-World Scenario:**
A network security tool parses log files where IP addresses lost their dots. Given a digit string, restore all valid IP addresses.

**Example Setup:** 
A data recovery tool reconstructs corrupted IP addresses from concatenated digits.

**What is Restore IP Addresses?**
Given a string of only digits, return all possible valid IP addresses by inserting dots. Each octet must be 0-255, no leading zeros.

**Why is it important?**
- Backtracking with constraints
- Network programming
- String parsing
- Validation logic

**Your Task:** 
Return all valid IP addresses.

---

## Examples

### Example 1:
**Input:** `s = "25525511135"`
**Output:** `["255.255.11.135", "255.255.111.35"]`
**Explanation:** Two valid IPs.

### Example 2:
**Input:** `s = "0000"`
**Output:** `["0.0.0.0"]`
**Explanation:** Only one valid configuration.

### Example 3:
**Input:** `s = "101023"`
**Output:** `["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]`
**Explanation:** Multiple valid IPs.

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ s.length ≤ 20 |
| Data Type | Digits only |
| Special Conditions | No leading zeros (except single 0) |
| Time Complexity | O(1) - constant max possibilities |
| Space Complexity | O(1) |
| Output Format | List of valid IPs |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Cisco |
| 🔵 Facebook | 🟡 Uber | 🟢 Palo Alto |
| 🔵 Microsoft | 🟡 Oracle | 🟢 Cloudflare |

---

## Follow-up Questions

1. What constraints make an octet valid?
2. How do you backtrack efficiently?
3. What's the maximum/minimum valid string length?
4. How about IPv6 addresses?
