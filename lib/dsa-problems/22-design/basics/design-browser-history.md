# Design Browser History

## Problem Description

**Real-World Scenario:**
Implementing the back/forward button functionality in a web browser.

**Example Setup:** 
Undo/Redo functionality in a text editor.

**What is Design Browser History?**
You have a browser of one tab where you start on the `homepage` and you can visit another `url`, get back in the history number of `steps` or move forward in the history number of `steps`.
Implement the `BrowserHistory` class:
- `BrowserHistory(string homepage)` Initializes the object with the `homepage` of the browser.
- `void visit(string url)` Visits `url` from the current page. It clears up all the forward history.
- `string back(int steps)` Move `steps` back in history. If you can only return `x` steps in the history and `steps > x`, you will return only `x` steps. Return the current `url` after moving back in history at most `steps`.
- `string forward(int steps)` Move `steps` forward in history. If you can only forward `x` steps in the history and `steps > x`, you will forward only `x` steps. Return the current `url` after forwarding in history at most `steps`.

**Why is it important?**
- Doubly Linked List / Two Stacks / Dynamic Array
- System Design Basics

**Your Task:** 
Implement the class.

---

## Examples

### Example 1:
**Input:** 
`BrowserHistory("leetcode.com")`
`visit("google.com")`
`visit("facebook.com")`
`visit("youtube.com")`
`back(1)` -> "facebook.com"
`back(1)` -> "google.com"
`forward(1)` -> "facebook.com"
`visit("linkedin.com")`
`forward(2)` -> "linkedin.com" (forward history cleared)
`back(2)` -> "google.com"
`back(7)` -> "leetcode.com"

---

## Constraints

| Constraint | Value |
|------------|-------|
| Calls | At most 5000 calls |
| URL Length | 1 ≤ len ≤ 20 |
| Time Complexity | O(1) |
| Space Complexity | O(N) |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Roblox |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Tesla |
| 🔵 Facebook | 🟡 Apple | 🟢 Oracle |

---

## Follow-up Questions

1. Why Array/Vector is better than Linked List here? (O(1) access by index if we track current index. Resizing is cheap).
2. How to handle `visit`? (Overwrite forward history or resize array).
3. Memory optimization? (Only store strings once if repeated? Not needed for small constraints).
