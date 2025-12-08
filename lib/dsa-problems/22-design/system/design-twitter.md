# Design Twitter

## Problem Description

**Real-World Scenario:**
Designing a simplified social media feed system where users can post tweets, follow/unfollow others, and see a news feed of the most recent tweets from people they follow.

**Example Setup:** 
Building a notification system aggregating events from subscribed sources.

**What is Design Twitter?**
Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and is able to see the 10 most recent tweets in the user's news feed.
Implement the `Twitter` class:
- `Twitter()` Initializes your twitter object.
- `void postTweet(int userId, int tweetId)` Composes a new tweet with ID `tweetId` by the user `userId`. Each call to this function will be made with a unique `tweetId`.
- `List<Integer> getNewsFeed(int userId)` Retrieves the 10 most recent tweet IDs in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user themself. Tweets must be ordered from most recent to least recent.
- `void follow(int followerId, int followeeId)` The user with ID `followerId` started following the user with ID `followeeId`.
- `void unfollow(int followerId, int followeeId)` The user with ID `followerId` started unfollowing the user with ID `followeeId`.

**Why is it important?**
- System Design (Object Oriented Design)
- Hash Map + Linked List / Heap
- Merge K Sorted Lists logic

**Your Task:** 
Implement the class.

**Difficulty:** Hard
**Tags:** Design, System, System Design, Hash Map + Linked List / Heap, Merge K Sorted Lists Logic, O(1), Interview

---

## Examples

### Example 1:
**Input:** 
`postTweet(1, 5)`
`getNewsFeed(1)` -> [5]
`follow(1, 2)`
`postTweet(2, 6)`
`getNewsFeed(1)` -> [6, 5]
`unfollow(1, 2)`
`getNewsFeed(1)` -> [5]

---

## Constraints

| Constraint | Value |
|------------|-------|
| Calls | At most 3 * 10^4 calls |
| IDs | Integer range |
| Time Complexity | O(1) post/follow, O(N log K) feed |
| Space Complexity | O(Users + Tweets) |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Twitter (Obviously) |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Snap |
| 🔵 Facebook | 🟡 Apple | 🟢 LinkedIn |

---

## Follow-up Questions

1. How to store tweets? (Global list or per-user list? Per-user is better for feed generation).
2. How to generate feed? (Merge K sorted lists using a Max Heap, where K is number of followees).
3. Why use a global timestamp/counter? (To order tweets across different users).
