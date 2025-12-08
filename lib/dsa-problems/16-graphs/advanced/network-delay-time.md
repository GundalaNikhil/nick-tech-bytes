# Network Delay Time

## Problem Description

**Real-World Scenario:**
When you send a message on WhatsApp, it travels through multiple servers before reaching your friend. Each server-to-server link has latency (delay). What's the minimum time for the message to reach everyone in a group chat?

**Example Setup:** 
Anil is a network engineer at a data center. When he pushes a configuration update from the central server, it propagates to all other servers. He needs to know the maximum time until ALL servers receive the update.

**What is Network Delay Time?**
Given a network of n nodes with directed edges and travel times, find the time it takes for a signal sent from source node k to reach all other nodes. Return -1 if not all nodes can be reached.

**Why is it important?**
- Network latency analysis
- Broadcast propagation time
- CDN cache invalidation
- Distributed systems synchronization

**Your Task:** 
Calculate the minimum time for a signal from node k to reach all nodes.

**Difficulty:** Hard
**Tags:** Graphs, Advanced, Network Latency Analysis, Broadcast Propagation Time, Cdn Cache Invalidation, Distributed Systems Synchronization, O((V + E), Interview

---

## Examples

### Example 1:
**Input:** 
```
times = [[2,1,1], [2,3,1], [3,4,1]]
n = 4, k = 2
(Edge from node 2 to node 1 with time 1, etc.)
```
**Output:** `2`
**Explanation:** 
- Signal reaches 1 at time 1
- Signal reaches 3 at time 1
- Signal reaches 4 at time 2 (via 3)
- Maximum is 2.

### Example 2:
**Input:** 
```
times = [[1,2,1]]
n = 2, k = 1
```
**Output:** `1`
**Explanation:** Only one edge, signal reaches node 2 at time 1.

### Example 3:
**Input:** 
```
times = [[1,2,1]]
n = 2, k = 2
```
**Output:** `-1`
**Explanation:** Starting from node 2, cannot reach node 1.

### Example 4:
**Input:** 
```
times = [[1,2,1], [2,1,3]]
n = 2, k = 2
```
**Output:** `3`
**Explanation:** From 2, reach 1 with time 3.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ n ≤ 100 |
| Edges | 1 ≤ times.length ≤ 6000 |
| Edge Time | 1 ≤ time ≤ 100 |
| Special Conditions | Directed graph, positive weights |
| Time Complexity | O((V + E) log V) with Dijkstra |
| Space Complexity | O(V + E) |
| Output Format | Integer time or -1 if impossible |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Uber | 🟢 Akamai |
| 🔵 Amazon | 🟡 Cloudflare | 🟢 Fastly |
| 🔵 Facebook | 🟡 Netflix | 🟢 Datadog |

---

## Follow-up Questions

1. Why is this a single-source shortest path problem?
2. Why do we need the maximum of all shortest paths?
3. Could you use BFS if all times were 1?
4. How would you modify this for unreliable connections (packets may be lost)?
