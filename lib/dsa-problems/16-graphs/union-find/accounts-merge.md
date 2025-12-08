# Accounts Merge

## Problem Description

**Real-World Scenario:**
A social media platform merges user accounts with overlapping email addresses to detect duplicate profiles.

**Example Setup:** 
An email provider consolidates accounts when the same email appears in multiple user profiles.

**What is Accounts Merge?**
Given accounts where each account has a name and list of emails, merge accounts belonging to the same person (same email = same person).

**Why is it important?**
- Union-Find application
- Graph connectivity
- Deduplication
- Social network analysis

**Your Task:** 
Return merged accounts (name + sorted emails).

**Difficulty:** Medium
**Tags:** Graphs, Union Find, Union-Find Application, Graph Connectivity, Deduplication, Social Network Analysis, O(n × k × α(n), Interview

---

## Examples

### Example 1:
**Input:** 
```
accounts = [
  ["John","johnsmith@mail.com","john_newyork@mail.com"],
  ["John","johnsmith@mail.com","john00@mail.com"],
  ["Mary","mary@mail.com"],
  ["John","johnnybravo@mail.com"]
]
```
**Output:** 
```
[
  ["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],
  ["Mary","mary@mail.com"],
  ["John","johnnybravo@mail.com"]
]
```

---

## Constraints

| Constraint | Value |
|------------|-------|
| Accounts | 1 ≤ accounts.length ≤ 1000 |
| Emails | 2 ≤ account[i].length ≤ 10 |
| Email Length | 1 ≤ email.length ≤ 30 |
| Data Type | String arrays |
| Time Complexity | O(n × k × α(n)) |
| Space Complexity | O(n × k) |
| Output Format | Merged account lists |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 LinkedIn |
| 🔵 Google | 🟡 Uber | 🟢 Twitter |
| 🔵 Amazon | 🟡 Apple | 🟢 Instagram |

---

## Follow-up Questions

1. Why use Union-Find for emails?
2. How do you map emails to account indices?
3. Why sort emails in output?
4. What about DFS approach?
