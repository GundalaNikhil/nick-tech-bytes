# React Show/Hide Component Tutorial

## 1. What is the Question and What to Achieve Here

Build a component that toggles the visibility of content. This pattern is commonly used for collapsible sections, FAQs, accordions, and any scenario where you want to conditionally display content based on user interaction.

**Goals:**
- Show/hide content on button click
- Provide smooth transitions when content appears/disappears
- Support multiple toggle patterns (expand/collapse, read more, etc.)
- Make the component reusable and flexible

## 2. How to Solve

Use React's `useState` hook to track visibility state as a boolean. Conditionally render content based on this state, and add CSS transitions for smooth animations.

## 3. What Are the Things That Need to Be Gathered

**Requirements:**
- React with hooks
- CSS for transitions and animations
- Understanding of:
  - Boolean state management
  - Conditional rendering
  - CSS transitions and max-height technique
  - Event handling

**No external dependencies required.**

## 4. Key Topics to Consider and Plan of Action

**Key Topics:**
- **Conditional Rendering:** Using `&&` operator or ternary for showing/hiding
- **CSS Transitions:** Smooth appearance/disappearance animations
- **Button Text/Icon:** Changing button content based on state
- **Accessibility:** ARIA attributes for expandable content
- **Animation Techniques:** CSS transitions vs animations

**Plan of Action:**
1. Create `ShowHide` functional component
2. Initialize visibility state with `useState(false)`
3. Create toggle handler function
4. Render toggle button and conditional content
5. Add CSS transitions for smooth show/hide
6. Implement accessibility features (aria-expanded)
7. Make component flexible with props

## 5. Code the Question

```jsx
import React, { useState } from 'react';
import './ShowHide.css';

function ShowHide({ 
  title = "Show More",
  children,
  initialVisible = false 
}) {
  const [isVisible, setIsVisible] = useState(initialVisible);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="showhide-container">
      <button
        className="toggle-button"
        onClick={toggleVisibility}
        aria-expanded={isVisible}
        aria-controls="content-section"
      >
        <span>{isVisible ? 'Hide' : 'Show'} {title}</span>
        <span className={`arrow ${isVisible ? 'up' : 'down'}`}>
          {isVisible ? '▲' : '▼'}
        </span>
      </button>

      <div
        id="content-section"
        className={`content ${isVisible ? 'visible' : 'hidden'}`}
        aria-hidden={!isVisible}
      >
        <div className="content-inner">
          {children}
        </div>
      </div>
    </div>
  );
}

export default ShowHide;
```

**CSS Styling (ShowHide.css):**

```css
.showhide-container {
  width: 100%;
  max-width: 600px;
  margin: 1rem auto;
  font-family: Arial, sans-serif;
}

.toggle-button {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background-color: #f5f5f5;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
}

.toggle-button:hover {
  background-color: #e8e8e8;
  border-color: #2196f3;
}

.toggle-button:focus {
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.3);
}

.arrow {
  font-size: 0.875rem;
  transition: transform 0.3s ease;
  color: #2196f3;
}

.arrow.up {
  transform: rotate(0deg);
}

.arrow.down {
  transform: rotate(0deg);
}

.content {
  overflow: hidden;
  transition: max-height 0.4s ease, opacity 0.3s ease, padding 0.3s ease;
  max-height: 0;
  opacity: 0;
  padding: 0;
}

.content.visible {
  max-height: 2000px; /* Large enough to fit most content */
  opacity: 1;
  padding: 1rem 0;
}

.content-inner {
  padding: 1rem 1.25rem;
  background-color: #fafafa;
  border: 1px solid #e0e0e0;
  border-top: none;
  border-radius: 0 0 8px 8px;
}

/* Alternative animation styles */
.content.hidden {
  visibility: hidden;
}

.content.visible .content-inner {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Usage Examples:**

```jsx
import React from 'react';
import ShowHide from './ShowHide';

function App() {
  return (
    <div className="app">
      <h1>FAQ Section</h1>

      <ShowHide title="Details" initialVisible={false}>
        <p>
          This is the hidden content that will be revealed when the button is clicked.
          You can put any content here, including text, images, forms, or other components.
        </p>
      </ShowHide>

      <ShowHide title="Shipping Information">
        <div>
          <h3>Shipping Options</h3>
          <ul>
            <li>Standard Shipping: 5-7 business days</li>
            <li>Express Shipping: 2-3 business days</li>
            <li>Overnight Shipping: Next business day</li>
          </ul>
        </div>
      </ShowHide>

      <ShowHide title="More Info" initialVisible={true}>
        <p>This section is visible by default.</p>
      </ShowHide>
    </div>
  );
}
```

**Advanced Version with Read More:**

```jsx
import React, { useState } from 'react';
import './ShowHide.css';

function ReadMore({ 
  text, 
  maxLength = 150,
  showMoreText = "Read more",
  showLessText = "Read less"
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine if text needs truncation
  const needsTruncation = text.length > maxLength;
  const displayText = isExpanded || !needsTruncation 
    ? text 
    : `${text.slice(0, maxLength)}...`;

  if (!needsTruncation) {
    return <p>{text}</p>;
  }

  return (
    <div className="read-more-container">
      <p className="read-more-text">{displayText}</p>
      <button
        className="read-more-button"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? showLessText : showMoreText}
      </button>
    </div>
  );
}

export default ReadMore;
```

## 6. Things to Consider

**Best Practices:**
- **Accessibility:** Always use aria-expanded and aria-controls attributes
- **Performance:** Use CSS transitions instead of JavaScript animations
- **Initial State:** Allow configurable initial visibility
- **Smooth Transitions:** Use max-height technique for smooth animations
- **Keyboard Support:** Ensure toggle works with keyboard (Enter/Space)

**Common Pitfalls:**
- Don't use `display: none` for animations - it's not animatable
- Be careful with max-height values - too large can cause animation issues
- Don't forget aria-hidden for screen readers
- Avoid nested state conflicts in complex layouts
- Remember to handle focus management for accessibility

**Enhancements:**
- **Multiple Sections:** Create accordion component with multiple sections
- **Animation Options:** Support different animation styles (fade, slide, scale)
- **Icons:** Add custom icons instead of arrows
- **Controlled Mode:** Support external state control
- **Callbacks:** Add onOpen/onClose callbacks
- **Nested Content:** Support deeply nested show/hide sections
- **Lazy Loading:** Load content only when expanded

**Accordion Component (Multiple Sections):**

```jsx
import React, { useState } from 'react';

function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div key={index} className="accordion-item">
          <button
            className="accordion-header"
            onClick={() => toggleSection(index)}
            aria-expanded={openIndex === index}
          >
            {item.title}
            <span className="icon">{openIndex === index ? '−' : '+'}</span>
          </button>
          
          {openIndex === index && (
            <div className="accordion-content">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Usage
function App() {
  const faqItems = [
    {
      title: "What is React?",
      content: "React is a JavaScript library for building user interfaces."
    },
    {
      title: "What are React Hooks?",
      content: "Hooks are functions that let you use state and lifecycle features in functional components."
    },
    {
      title: "What is JSX?",
      content: "JSX is a syntax extension for JavaScript that looks similar to HTML."
    }
  ];

  return <Accordion items={faqItems} />;
}
```

**Controlled Component Pattern:**

```jsx
// Controlled version where parent manages state
function ShowHide({ isVisible, onToggle, title, children }) {
  return (
    <div className="showhide-container">
      <button onClick={onToggle} aria-expanded={isVisible}>
        {isVisible ? 'Hide' : 'Show'} {title}
      </button>
      {isVisible && <div className="content">{children}</div>}
    </div>
  );
}

// Usage
function Parent() {
  const [sectionVisible, setSectionVisible] = useState(false);
  
  return (
    <ShowHide
      isVisible={sectionVisible}
      onToggle={() => setSectionVisible(!sectionVisible)}
      title="Details"
    >
      <p>Content here</p>
    </ShowHide>
  );
}
```

**Testing Considerations:**
- Test initial visibility states
- Test toggle functionality
- Test keyboard interaction (Tab, Enter, Space)
- Test with different content types and sizes
- Test ARIA attributes are correctly set
- Test multiple instances don't interfere
- Test animation completion

**Real-World Use Cases:**
- FAQ sections
- Collapsible navigation menus
- Product description expansions
- Terms and conditions
- User profile sections
- Form field groups
- Mobile menu panels
- Comment threads

This show/hide pattern is one of the most versatile components in UI development and forms the foundation for more complex disclosure widgets.