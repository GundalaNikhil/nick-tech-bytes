# React Character/Word Counter Component Tutorial

## 1. What is the Question and What to Achieve Here

Create a text input component that counts and displays the number of characters and words as the user types. This is commonly used in forms with length limits, social media posts, SMS messages, and blog platforms.

**Goals:**
- Track and display character count in real-time
- Track and display word count in real-time
- Show remaining characters if there's a limit
- Provide visual feedback when approaching or exceeding limits
- Support both textarea and input elements

## 2. How to Solve

Use React's `useState` hook to manage the text input value. Calculate character and word counts from the text value whenever it changes. Use CSS to provide visual feedback based on the counts.

## 3. What Are the Things That Need to Be Gathered

**Requirements:**
- React with hooks
- Understanding of:
  - Controlled components (input value tied to state)
  - String manipulation methods (length, split, trim)
  - Event handling (onChange)
  - Conditional styling
  - Regular expressions (for word counting)

**No external dependencies needed.**

## 4. Key Topics to Consider and Plan of Action

**Key Topics:**
- **Controlled Inputs:** Binding input value to React state
- **Real-time Calculations:** Computing counts on every keystroke
- **Word Counting Logic:** Handling edge cases (multiple spaces, punctuation)
- **Character Limits:** Enforcing maximum length restrictions
- **Visual Feedback:** Color-coded warnings for limits
- **Performance:** Efficient string operations

**Plan of Action:**
1. Create `CharacterCounter` component
2. Initialize state for text input
3. Create onChange handler to update state
4. Calculate character count (text.length)
5. Calculate word count using regex or split method
6. Display counts with visual indicators
7. Add optional character limit with validation
8. Implement color-coded feedback system

## 5. Code the Question

```jsx
import React, { useState } from 'react';
import './CharacterCounter.css';

function CharacterCounter({ 
  maxLength = 200,
  showWordCount = true,
  placeholder = "Start typing...",
  label = "Enter text"
}) {
  const [text, setText] = useState('');

  // Calculate character count
  const charCount = text.length;
  
  // Calculate word count
  const wordCount = text.trim().length === 0 
    ? 0 
    : text.trim().split(/\s+/).length;

  // Calculate remaining characters
  const remainingChars = maxLength - charCount;

  // Determine warning level
  const getWarningLevel = () => {
    const percentage = (charCount / maxLength) * 100;
    if (percentage >= 100) return 'exceeded';
    if (percentage >= 90) return 'danger';
    if (percentage >= 75) return 'warning';
    return 'normal';
  };

  const warningLevel = getWarningLevel();

  const handleChange = (e) => {
    const newText = e.target.value;
    // Only update if under max length or deleting
    if (newText.length <= maxLength) {
      setText(newText);
    }
  };

  return (
    <div className="character-counter-container">
      <label htmlFor="text-input" className="counter-label">
        {label}
      </label>

      <textarea
        id="text-input"
        className={`text-input ${warningLevel}`}
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        rows={6}
      />

      <div className="counter-info">
        <div className="count-displays">
          <span className={`char-count ${warningLevel}`}>
            <strong>{charCount}</strong> / {maxLength} characters
          </span>
          
          {showWordCount && (
            <span className="word-count">
              <strong>{wordCount}</strong> {wordCount === 1 ? 'word' : 'words'}
            </span>
          )}
        </div>

        <div className="counter-status">
          {warningLevel === 'warning' && (
            <span className="status-message warning">
              ⚠️ {remainingChars} characters remaining
            </span>
          )}
          {warningLevel === 'danger' && (
            <span className="status-message danger">
              🚨 Only {remainingChars} characters left!
            </span>
          )}
          {warningLevel === 'exceeded' && (
            <span className="status-message exceeded">
              ❌ Character limit reached!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default CharacterCounter;
```

**CSS Styling (CharacterCounter.css):**

```css
.character-counter-container {
  width: 100%;
  max-width: 600px;
  margin: 1rem auto;
  font-family: Arial, sans-serif;
}

.counter-label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
}

.text-input {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  font-family: inherit;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  resize: vertical;
  transition: border-color 0.3s ease;
  outline: none;
}

.text-input:focus {
  border-color: #2196f3;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

.text-input.warning {
  border-color: #ff9800;
}

.text-input.danger {
  border-color: #f44336;
}

.text-input.exceeded {
  border-color: #d32f2f;
  background-color: #ffebee;
}

.counter-info {
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.count-displays {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
}

.char-count {
  color: #666;
  transition: color 0.3s ease;
}

.char-count.warning {
  color: #ff9800;
}

.char-count.danger {
  color: #f44336;
  font-weight: 600;
}

.char-count.exceeded {
  color: #d32f2f;
  font-weight: 700;
}

.word-count {
  color: #666;
}

.char-count strong,
.word-count strong {
  font-size: 1rem;
}

.counter-status {
  min-height: 24px;
}

.status-message {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.status-message.warning {
  color: #f57c00;
  background-color: #fff3e0;
}

.status-message.danger {
  color: #d32f2f;
  background-color: #ffebee;
}

.status-message.exceeded {
  color: #c62828;
  background-color: #ffcdd2;
  animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
```

**Usage Example:**

```jsx
import React from 'react';
import CharacterCounter from './CharacterCounter';

function App() {
  return (
    <div className="app">
      <h1>Tweet Composer</h1>
      <CharacterCounter
        maxLength={280}
        showWordCount={true}
        placeholder="What's happening?"
        label="Your tweet"
      />

      <h2>SMS Message</h2>
      <CharacterCounter
        maxLength={160}
        showWordCount={false}
        placeholder="Enter your message"
        label="Text message"
      />
    </div>
  );
}
```

## 6. Things to Consider

**Best Practices:**
- **Controlled Components:** Always keep input value in sync with state
- **Efficient Word Counting:** Use regex for accurate word detection
- **User Feedback:** Provide clear visual indicators at different thresholds
- **Accessibility:** Include proper labels and ARIA attributes
- **Edge Cases:** Handle empty strings, whitespace-only input, special characters

**Common Pitfalls:**
- Don't count leading/trailing spaces in word count
- Handle multiple consecutive spaces correctly
- Consider how to count words with hyphens or apostrophes
- Don't block user input abruptly at limit
- Avoid performance issues with very large texts

**Enhancements:**
- **Character Exclusions:** Don't count spaces or special characters
- **Copy/Paste Handling:** Truncate pasted text if exceeds limit
- **Real-time Validation:** Integrate with form validation
- **Multiple Languages:** Handle multi-byte characters correctly
- **Statistics Display:** Show average word length, sentences, etc.
- **Export Functionality:** Copy or save text
- **Undo/Redo:** Implement text history

**Advanced Version with More Features:**

```jsx
import React, { useState, useMemo } from 'react';

function AdvancedCharacterCounter({ maxLength = 200 }) {
  const [text, setText] = useState('');

  // Memoize expensive calculations
  const stats = useMemo(() => {
    const trimmedText = text.trim();
    
    return {
      characters: text.length,
      charactersNoSpaces: text.replace(/\s/g, '').length,
      words: trimmedText.length === 0 ? 0 : trimmedText.split(/\s+/).length,
      sentences: trimmedText.length === 0 ? 0 : trimmedText.split(/[.!?]+/).filter(s => s.trim().length > 0).length,
      paragraphs: trimmedText.length === 0 ? 0 : trimmedText.split(/\n\n+/).filter(p => p.trim().length > 0).length,
      readingTime: Math.ceil(trimmedText.split(/\s+/).length / 200) // 200 words per minute
    };
  }, [text]);

  const handleChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
    }
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <div className="advanced-counter">
      <div className="input-section">
        <textarea
          value={text}
          onChange={handleChange}
          placeholder="Start typing..."
          rows={8}
        />
        <button onClick={handleClear} disabled={!text}>
          Clear
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.characters}</div>
          <div className="stat-label">Characters</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.charactersNoSpaces}</div>
          <div className="stat-label">Chars (no spaces)</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.words}</div>
          <div className="stat-label">Words</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.sentences}</div>
          <div className="stat-label">Sentences</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.paragraphs}</div>
          <div className="stat-label">Paragraphs</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.readingTime} min</div>
          <div className="stat-label">Reading Time</div>
        </div>
      </div>
    </div>
  );
}
```

**Word Count with Better Accuracy:**

```jsx
// More accurate word counting function
function countWords(text) {
  if (!text || text.trim().length === 0) return 0;
  
  // Remove multiple spaces and trim
  const cleaned = text.trim().replace(/\s+/g, ' ');
  
  // Split by spaces and filter out empty strings
  const words = cleaned.split(' ').filter(word => word.length > 0);
  
  return words.length;
}

// Alternative using regex for complex cases
function countWordsRegex(text) {
  if (!text || text.trim().length === 0) return 0;
  
  // Match word boundaries, including hyphenated words and contractions
  const matches = text.match(/\b[\w'-]+\b/g);
  
  return matches ? matches.length : 0;
}
```

**Testing Considerations:**
- Test with empty input
- Test with only whitespace
- Test with single word
- Test with multiple consecutive spaces
- Test with special characters and punctuation
- Test at boundary conditions (max length -1, max length, max length +1)
- Test copy/paste with long text
- Test with emojis and multi-byte characters

**Real-World Use Cases:**
- Twitter/X posts (280 characters)
- SMS messages (160 characters)
- Meta descriptions (155-160 characters)
- Blog post summaries
- Form text areas with limits
- Comment sections
- Product descriptions
- Bio/About sections

This character counter component is essential for any application with text input constraints and provides immediate feedback to improve user experience.