# Encode and Decode Strings

## Problem Description

**Real-World Scenario:**
A file transfer protocol serializes a list of strings (which may contain any characters) into a single string for transmission, then deserializes back.

**Example Setup:** 
A database backup tool encodes table rows with varying delimiters into a single compact format.

**What is Encode and Decode Strings?**
Design algorithm to encode list of strings to single string, and decode back to original list. Strings may contain any characters including delimiters.

**Why is it important?**
- Serialization
- Escaping/encoding
- Length-prefixing
- Protocol design

**Your Task:** 
Implement encode(List<String>) → String and decode(String) → List<String>.

---

## Examples

### Example 1:
**Input:** `strs = ["hello","world"]`
**Output:** After encode+decode, returns `["hello","world"]`

### Example 2:
**Input:** `strs = [""]`
**Output:** `[""]`
**Explanation:** Empty string should be handled.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Strings | 0 ≤ strs.length ≤ 200 |
| String Length | 0 ≤ s.length ≤ 200 |
| Characters | Any ASCII characters |
| Special Conditions | Handle special chars |
| Time Complexity | O(n) total string length |
| Space Complexity | O(n) |
| Output Format | Encoded string and decoded list |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Dropbox |
| 🔵 Amazon | 🟡 Uber | 🟢 Box |
| 🔵 Facebook | 🟡 Apple | 🟢 OneDrive |

---

## Follow-up Questions

1. Why use length-prefixing (e.g., "5:hello")?
2. What about escaping delimiter approach?
3. How to handle empty strings?
4. What about binary data (non-ASCII)?
