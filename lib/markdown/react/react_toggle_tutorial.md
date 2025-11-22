# React Toggle Switch Component Tutorial

## 1. What is the Question and What to Achieve Here

Create a toggle switch component that allows users to switch between two states (ON/OFF, true/false). The switch should provide visual feedback and can be used for settings, preferences, or any binary choice scenario.

**Goals:**
- Create a visually appealing toggle switch
- Maintain boolean state (true/false or on/off)
- Provide smooth animations and transitions
- Make it reusable with customizable labels
- Ensure accessibility for keyboard and screen reader users

## 2. How to Solve

Use React's `useState` hook to track the toggle state as a boolean. Create a clickable component that switches between states and provides visual feedback through CSS styling and transitions.

## 3. What Are the Things That Need to Be Gathered

**Requirements:**
- React library with hooks
- CSS for styling and animations
- Understanding of:
  - Boolean state management
  - Conditional rendering/styling
  - Event handling
  - CSS transitions
  - Accessibility attributes (ARIA)

**No external dependencies needed.**

## 4. Key Topics to Consider and Plan of Action

**Key Topics:**
- **Boolean State:** Managing ON/OFF state with `useState`
- **Conditional Styling:** Applying different styles based on state
- **Accessibility:** Using proper ARIA attributes and keyboard support
- **CSS Transitions:** Smooth animations for toggle movement
- **Callback Props:** Allowing parent components to react to toggle changes

**Plan of Action:**
1. Create a `ToggleSwitch` functional component
2. Initialize boolean state with `useState(false)`
3. Create toggle handler function
4. Build the switch UI with proper semantic HTML
5. Add CSS for styling and animations
6. Implement accessibility features
7. Make component reusable with props

## 5. Code the Question

```jsx
import React, { useState } from 'react';
import './ToggleSwitch.css';

function ToggleSwitch({ 
  initialState = false, 
  onToggle, 
  label = "Toggle",
  disabled = false 
}) {
  const [isOn, setIsOn] = useState(initialState);

  const handleToggle = () => {
    if (disabled) return;
    
    const newState = !isOn;
    setIsOn(newState);
    
    // Call parent callback if provided
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <div className="toggle-switch-container">
      <span className="toggle-label">{label}</span>
      
      <button
        className={`toggle-switch ${isOn ? 'on' : 'off'} ${disabled ? 'disabled' : ''}`}
        onClick={handleToggle}
        disabled={disabled}
        role="switch"
        aria-checked={isOn}
        aria-label={label}
      >
        <span className="toggle-slider" />
      </button>
      
      <span className="toggle-status">
        {isOn ? 'ON' : 'OFF'}
      </span>
    </div>
  );
}

export default ToggleSwitch;
```

**CSS Styling (ToggleSwitch.css):**

```css
.toggle-switch-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  font-family: Arial, sans-serif;
}

.toggle-label {
  font-size: 1rem;
  color: #333;
  font-weight: 500;
}

.toggle-switch {
  position: relative;
  width: 60px;
  height: 30px;
  background-color: #ccc;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  outline: none;
}

.toggle-switch:focus {
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.3);
}

.toggle-switch.on {
  background-color: #4caf50;
}

.toggle-switch.off {
  background-color: #ccc;
}

.toggle-switch.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.toggle-slider {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 24px;
  height: 24px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle-switch.on .toggle-slider {
  transform: translateX(30px);
}

.toggle-status {
  font-size: 0.875rem;
  font-weight: 600;
  color: #666;
  min-width: 40px;
}

/* Hover effect */
.toggle-switch:not(.disabled):hover {
  opacity: 0.9;
}

/* Active effect */
.toggle-switch:not(.disabled):active .toggle-slider {
  width: 28px;
}
```

**Usage Example:**

```jsx
import React, { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div>
      <h2>Settings</h2>
      
      <ToggleSwitch
        label="Dark Mode"
        initialState={darkMode}
        onToggle={setDarkMode}
      />
      
      <ToggleSwitch
        label="Notifications"
        initialState={notifications}
        onToggle={setNotifications}
      />
      
      <ToggleSwitch
        label="Disabled Option"
        disabled={true}
      />
    </div>
  );
}
```

## 6. Things to Consider

**Best Practices:**
- **Accessibility:** Always include ARIA attributes (role="switch", aria-checked)
- **Keyboard Support:** Ensure toggle works with Space/Enter keys (handled by button element)
- **Visual Feedback:** Provide clear visual distinction between ON/OFF states
- **Disabled State:** Handle disabled state properly to prevent interaction
- **Callback Pattern:** Use onChange/onToggle callbacks to notify parent components

**Common Pitfalls:**
- Don't use a div for the switch - use a button for proper keyboard accessibility
- Don't forget to prevent interaction when disabled
- Ensure sufficient color contrast for accessibility
- Don't make the toggle too small - maintain minimum touch target size (44x44px)

**Enhancements:**
- Add loading state during async operations
- Implement controlled vs uncontrolled modes
- Add custom colors via props
- Support different sizes (small, medium, large)
- Add icons inside the toggle (checkmark, X)
- Implement haptic feedback for mobile
- Add sound effects for toggle actions

**Enhanced Version with Icons:**

```jsx
import React, { useState } from 'react';

function ToggleSwitch({ 
  initialState = false, 
  onToggle, 
  label = "Toggle",
  disabled = false,
  showIcons = false 
}) {
  const [isOn, setIsOn] = useState(initialState);

  const handleToggle = () => {
    if (disabled) return;
    const newState = !isOn;
    setIsOn(newState);
    if (onToggle) onToggle(newState);
  };

  return (
    <div className="toggle-switch-container">
      <span className="toggle-label">{label}</span>
      
      <button
        className={`toggle-switch ${isOn ? 'on' : 'off'} ${disabled ? 'disabled' : ''}`}
        onClick={handleToggle}
        disabled={disabled}
        role="switch"
        aria-checked={isOn}
      >
        <span className="toggle-slider">
          {showIcons && (
            <span className="toggle-icon">
              {isOn ? '✓' : '×'}
            </span>
          )}
        </span>
      </button>
      
      <span className="toggle-status">{isOn ? 'ON' : 'OFF'}</span>
    </div>
  );
}
```

**Controlled Component Pattern:**

```jsx
// Controlled version - state managed by parent
function ToggleSwitch({ isOn, onChange, label }) {
  return (
    <button
      className={`toggle-switch ${isOn ? 'on' : 'off'}`}
      onClick={() => onChange(!isOn)}
      role="switch"
      aria-checked={isOn}
      aria-label={label}
    >
      <span className="toggle-slider" />
    </button>
  );
}

// Usage
function Parent() {
  const [enabled, setEnabled] = useState(false);
  
  return (
    <ToggleSwitch 
      isOn={enabled} 
      onChange={setEnabled}
      label="Feature Toggle"
    />
  );
}
```

**Testing Considerations:**
- Test initial state rendering
- Test toggle functionality (click to switch)
- Test disabled state (should not toggle)
- Test keyboard navigation (Tab to focus, Space/Enter to toggle)
- Test callback execution
- Test accessibility attributes

**Real-World Use Cases:**
- Dark mode toggles
- Feature flags
- Notification preferences
- Privacy settings
- Accessibility options
- Form inputs for boolean values

This toggle switch component is fundamental for building modern UIs with clear binary choices.