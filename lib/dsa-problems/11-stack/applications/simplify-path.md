# Simplify Path

## Problem Description

**Real-World Scenario:**
A file system resolves paths like "/a/b/../c/./d" to "/a/c/d". Handle . (current), .. (parent), and multiple slashes.

**Example Setup:** 
A web server normalizes URL paths for routing and security (avoiding directory traversal attacks).

**What is Simplify Path?**
Given an absolute Unix-style file path, simplify it. Handle ".", "..", multiple slashes, and trailing slashes.

**Why is it important?**
- Stack application
- String parsing
- File system operations
- Security (path traversal)

**Your Task:** 
Return the simplified canonical path.

---

## Examples

### Example 1:
**Input:** `/home/`
**Output:** `/home`
**Explanation:** Remove trailing slash.

### Example 2:
**Input:** `/../`
**Output:** `/`
**Explanation:** Can't go above root.

### Example 3:
**Input:** `/home//foo/`
**Output:** `/home/foo`
**Explanation:** Multiple slashes treated as one.

### Example 4:
**Input:** `/a/./b/../../c/`
**Output:** `/c`
**Explanation:** Navigate through dots.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Path Length | 1 ≤ path.length ≤ 3000 |
| Characters | English letters, digits, '.', '/', '_' |
| Data Type | String |
| Special Conditions | Always starts with "/" |
| Time Complexity | O(n) |
| Space Complexity | O(n) for stack |
| Output Format | Simplified path |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Dropbox |
| 🔵 Microsoft | 🟡 Uber | 🟢 Box |
| 🔵 Google | 🟡 Amazon | 🟢 Cloudflare |

---

## Follow-up Questions

1. How do you split the path into components?
2. What does the stack represent?
3. How do you handle ".." at root?
4. What about Windows-style paths?
