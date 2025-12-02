# React Like/Unlike Button Component Tutorial

## 1. What is the Question and What to Achieve Here

Create an interactive like button component similar to those found in social media platforms. The button should toggle between liked and unliked states, display a count of likes, and provide visual feedback with animations.

**Goals:**
- Toggle between liked and unliked states
- Display and update like count
- Provide visual feedback (color change, animation)
- Make it reusable across different contexts
- Add smooth animations for better UX

## 2. How to Solve

Use React's `useState` hook to manage two pieces of state: the liked status (boolean) and the like count (number). When clicked, toggle the status and increment/decrement the count accordingly.

## 3. What Are the Things That Need to Be Gathered

**Requirements:**
- React library with hooks
- CSS for styling and animations
- Understanding of:
  - Multiple state variables
  - Conditional rendering and styling
  - CSS animations and transitions
  - Event handling

**Optional:**
- Icon library (can use emoji or Unicode symbols as fallback)

## 4. Key Topics to Consider and Plan of Action

**Key Topics:**
- **Multiple State Management:** Managing both liked status and count
- **Optimistic Updates:** Updating UI immediately on click
- **Animation:** Adding heart animation on like
- **Conditional Styling:** Different colors for liked/unliked states
- **Debouncing:** Preventing rapid repeated clicks (optional)

**Plan of Action:**
1. Create `LikeButton` functional component
2. Initialize state for `isLiked` (boolean) and `likeCount` (number)
3. Create toggle handler that updates both states
4. Design button UI with heart icon
5. Add CSS animations for the "pop" effect
6. Implement color changes based on liked state
7. Make component reusable with props

## 5. Code the Question

```jsx
import React, { useState } from 'react';
import './LikeButton.css';

function LikeButton({ 
  initialLikes = 0, 
  initialIsLiked = false,
  onLikeChange 
}) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLike = () => {
    // Toggle liked state
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    
    // Update count
    if (newLikedState) {
      setLikeCount(likeCount + 1);
    } else {
      setLikeCount(likeCount - 1);
    }

    // Trigger animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    // Notify parent component if callback provided
    if (onLikeChange) {
      onLikeChange(newLikedState, newLikedState ? likeCount + 1 : likeCount - 1);
    }
  };

  return (
    <div className="like-button-container">
      <button
        className={`like-button ${isLiked ? 'liked' : ''} ${isAnimating ? 'animating' : ''}`}
        onClick={handleLike}
        aria-label={isLiked ? 'Unlike' : 'Like'}
        aria-pressed={isLiked}
      >
        <span className="heart-icon">
          {isLiked ? '❤️' : '🤍'}
        </span>
        <span className="like-count">
          {likeCount}
        </span>
      </button>
    </div>
  );
}

export default LikeButton;
```

**CSS Styling (LikeButton.css):**

```css
.like-button-container {
  display: inline-block;
  padding: 1rem;
}

.like-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  font-size: 1.125rem;
  background-color: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: Arial, sans-serif;
  outline: none;
}

.like-button:hover {
  border-color: #ff6b6b;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.2);
}

.like-button:focus {
  box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.3);
}

.like-button:active {
  transform: translateY(0);
}

.like-button.liked {
  background-color: #ffe0e0;
  border-color: #ff6b6b;
}

.heart-icon {
  font-size: 1.5rem;
  transition: transform 0.2s ease;
  display: inline-block;
}

.like-button.animating .heart-icon {
  animation: heartPop 0.3s ease;
}

@keyframes heartPop {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

.like-count {
  font-weight: 600;
  color: #333;
  min-width: 20px;
  text-align: left;
}

.like-button.liked .like-count {
  color: #ff6b6b;
}

/* Pulse animation for count change */
.like-button.animating .like-count {
  animation: countPulse 0.3s ease;
}

@keyframes countPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}
```

**Usage Example:**

```jsx
import React, { useState } from 'react';
import LikeButton from './LikeButton';

function PostCard() {
  const handleLikeChange = (isLiked, newCount) => {
    console.log(`Post is ${isLiked ? 'liked' : 'unliked'}. Total likes: ${newCount}`);
    // Here you could make an API call to update the server
  };

  return (
    <div className="post-card">
      <h3>Amazing Post Title</h3>
      <p>This is the post content...</p>
      
      <LikeButton
        initialLikes={42}
        initialIsLiked={false}
        onLikeChange={handleLikeChange}
      />
    </div>
  );
}
```

## 6. Things to Consider

**Best Practices:**
- **Optimistic UI Updates:** Update UI immediately, don't wait for server response
- **State Synchronization:** Ensure count and liked state stay in sync
- **Accessibility:** Include proper ARIA labels and keyboard support
- **Animation Timing:** Keep animations short and smooth (200-300ms)
- **Error Handling:** Handle API failures and rollback state if needed

**Common Pitfalls:**
- Don't forget to update both states together (liked status AND count)
- Avoid animation conflicts with rapid clicking
- Don't let count go negative
- Remember to clean up timeouts if component unmounts
- Handle edge cases (already liked, API errors)

**Enhancements:**
- **API Integration:** Connect to backend to persist likes
- **Loading State:** Show loading indicator during API calls
- **Error State:** Display error messages on failures
- **Double-tap Prevention:** Debounce rapid clicks
- **Animation Variations:** Add more sophisticated animations
- **Hover Effects:** Show tooltip with who liked
- **Count Formatting:** Display "1K", "1M" for large numbers

**Advanced Version with API Integration:**

```jsx
import React, { useState } from 'react';
import './LikeButton.css';

function LikeButton({ postId, initialLikes = 0, initialIsLiked = false }) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLike = async () => {
    // Optimistic update
    const newLikedState = !isLiked;
    const newCount = newLikedState ? likeCount + 1 : likeCount - 1;
    
    setIsLiked(newLikedState);
    setLikeCount(newCount);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    setIsLoading(true);

    try {
      // Make API call
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: newLikedState ? 'POST' : 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to update like');
      }

      const data = await response.json();
      // Update with server count if different
      setLikeCount(data.likeCount);
    } catch (error) {
      // Rollback on error
      console.error('Error updating like:', error);
      setIsLiked(!newLikedState);
      setLikeCount(likeCount);
      // Show error message to user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`like-button ${isLiked ? 'liked' : ''} ${isAnimating ? 'animating' : ''}`}
      onClick={handleLike}
      disabled={isLoading}
      aria-label={isLiked ? 'Unlike' : 'Like'}
    >
      <span className="heart-icon">{isLiked ? '❤️' : '🤍'}</span>
      <span className="like-count">{formatCount(likeCount)}</span>
    </button>
  );
}

// Helper function to format large numbers
function formatCount(count) {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count;
}

export default LikeButton;
```

**Version with Multiple Reactions:**

```jsx
function ReactionButton() {
  const [selectedReaction, setSelectedReaction] = useState(null);
  const reactions = ['❤️', '👍', '😂', '😮', '😢', '😡'];

  return (
    <div className="reaction-container">
      {reactions.map((emoji, index) => (
        <button
          key={index}
          className={`reaction ${selectedReaction === emoji ? 'selected' : ''}`}
          onClick={() => setSelectedReaction(emoji)}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
```

**Testing Considerations:**
- Test like/unlike toggle
- Test count increment/decrement
- Test animation triggers
- Test keyboard accessibility
- Test with different initial values
- Test API error scenarios (if integrated)
- Test rapid clicking behavior

**Real-World Use Cases:**
- Social media posts
- Blog comments
- Product reviews
- Forum threads
- Video content
- User-generated content platforms

This like button component demonstrates important concepts in interactive UI development and can be adapted for various social features.