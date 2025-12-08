# Encode and Decode TinyURL

## Problem Description

**Real-World Scenario:**
A URL shortening service like bit.ly that converts long URLs into short, unique aliases and redirects users back to the original URL.

**Example Setup:** 
Generating unique IDs for database records.

**What is Encode and Decode TinyURL?**
Note: This is a companion problem to the System Design problem: Design TinyURL.
TinyURL is a URL shortening service where you enter a URL such as `https://leetcode.com/problems/design-tinyurl` and it returns a short URL such as `http://tinyurl.com/4e9iAk`.
Design the `encode` and `decode` methods for the TinyURL service. There is no restriction on how your encode/decode algorithm should work. You just need to ensure that a URL can be encoded to a tiny URL and the tiny URL can be decoded to the original URL.

**Why is it important?**
- System Design
- Hashing / Random Generation
- Bi-directional Mapping

**Your Task:** 
Implement the class.

---

## Examples

### Example 1:
**Input:** `url = "https://leetcode.com/problems/design-tinyurl"`
**Output:** `encode(url)` returns "http://tinyurl.com/4e9iAk". `decode("http://tinyurl.com/4e9iAk")` returns "https://leetcode.com/problems/design-tinyurl".

---

## Constraints

| Constraint | Value |
|------------|-------|
| URL Length | No limit |
| Calls | At most 10^4 calls |
| Time Complexity | O(1) |
| Space Complexity | O(N) |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Bitly |
| 🔵 Amazon | 🟡 Microsoft | 🟢 TinyURL |
| 🔵 Facebook | 🟡 Apple | 🟢 Twitter |

---

## Follow-up Questions

1. How to generate unique keys? (Counter vs Random String).
2. Collision handling? (Check if key exists).
3. Database storage? (SQL vs NoSQL).
4. Expiration? (Store timestamp).
