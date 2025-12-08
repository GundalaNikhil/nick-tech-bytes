# Postorder Traversal

## Problem Description

**Real-World Scenario:**
A build system compiles dependencies first before the main module. This is postorder: process children before parent.

**Example Setup:** 
A calculator evaluates expression trees in postorder to compute results (evaluate operands before operator).

**What is Postorder Traversal?**
Visit nodes in order: left → right → root. Useful for deletions, postfix expressions, and computing values bottom-up.

**Why is it important?**
- Dependency ordering
- Expression evaluation
- Memory deallocation
- Bottom-up computation

**Your Task:** 
Return the postorder traversal of a binary tree.

---

## Examples

### Example 1:
**Input:** 
```
    1
     \
      2
     /
    3
```
**Output:** `[3, 2, 1]`
**Explanation:** 3 → 2 → 1 (left of right's left → right → root).

### Example 2:
**Input:** Empty tree
**Output:** `[]`

### Example 3:
**Input:** `[1]`
**Output:** `[1]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 0 ≤ n ≤ 100 |
| Node Value | -100 ≤ val ≤ 100 |
| Data Type | Binary tree |
| Special Conditions | Iterative harder than preorder |
| Time Complexity | O(n) |
| Space Complexity | O(n) for stack |
| Output Format | List of values |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Nvidia |
| 🔵 Microsoft | 🟡 Oracle | 🟢 Cisco |
| 🔵 Google | 🟡 Adobe | 🟢 VMware |

---

## Follow-up Questions

1. Why is iterative postorder harder than preorder?
2. What's the two-stack method?
3. How is postorder useful for tree deletion?
4. What's Morris traversal for postorder?
