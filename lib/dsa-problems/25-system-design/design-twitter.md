# Design Twitter

## Problem Description

**Real-World Scenario:**
Twitter lets users post tweets, follow others, and see a news feed with recent tweets from followed users. Design the core functionality.

**Example Setup:** 
A social media startup needs the basic building blocks: posting, following, and personalized timeline generation.

**What is Design Twitter?**
Design a simplified Twitter with:
1. postTweet(userId, tweetId) - post a new tweet
2. getNewsFeed(userId) - get 10 most recent tweets from followed users
3. follow(followerId, followeeId) - follow a user
4. unfollow(followerId, followeeId) - unfollow a user

**Why is it important?**
- System design fundamentals
- Merge K sorted lists application
- Friend/follow relationships
- Timeline generation

**Your Task:** 
Implement the Twitter class.

---

## Examples

### Example 1:
**Operations:**
```
Twitter twitter = new Twitter()
twitter.postTweet(1, 5)     // User 1 posts tweet 5
twitter.getNewsFeed(1)      // returns [5]
twitter.follow(1, 2)        // User 1 follows user 2
twitter.postTweet(2, 6)     // User 2 posts tweet 6
twitter.getNewsFeed(1)      // returns [6, 5] (most recent first)
twitter.unfollow(1, 2)      // User 1 unfollows user 2
twitter.getNewsFeed(1)      // returns [5]
```

---

## Constraints

| Constraint | Value |
|------------|-------|
| User ID | 1 ≤ userId ≤ 500 |
| Tweet ID | 1 ≤ tweetId ≤ 10⁴ |
| Operations | Up to 3 × 10⁴ |
| News Feed | 10 most recent tweets |
| Time Complexity | O(n log k) for getNewsFeed |
| Space Complexity | O(users × tweets) |
| Output Format | List of tweet IDs |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Twitter/X | 🟡 Bloomberg | 🟢 Snap |
| 🔵 Amazon | 🟡 LinkedIn | 🟢 Pinterest |
| 🔵 Meta | 🟡 Uber | 🟢 Reddit |

---

## Follow-up Questions

1. How do you efficiently merge feeds from followed users?
2. Why use a min-heap for top K recent tweets?
3. How would you scale for millions of users?
4. What about fan-out on write vs read?
