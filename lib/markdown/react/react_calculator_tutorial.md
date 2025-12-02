# React Simple Calculator Component Tutorial

## 1. What is the Question and What to Achieve Here

Build a functional calculator component that performs basic arithmetic operations (addition, subtraction, multiplication, division). The calculator should have a display showing the current value and buttons for numbers and operations.

**Goals:**
- Display current value and operation
- Handle number input (0-9)
- Perform basic operations (+, -, ×, ÷)
- Clear display and reset calculator
- Handle decimal numbers
- Show calculation results
- Prevent invalid operations (divide by zero, etc.)

## 2. How to Solve

Use React's `useState` hook to manage calculator state including current display value, previous value, and the selected operation. Process button clicks to update state and perform calculations when equals is pressed.

## 3. What Are the Things That Need to Be Gathered

**Requirements:**
- React with hooks
- Understanding of:
  - State management for multiple values
  - Mathematical operations
  - String/number conversions
  - Event handling
  - Grid layout with CSS

**No external dependencies needed.**

## 4. Key Topics to Consider and Plan of Action

**Key Topics:**
- **State Management:** Tracking display, previous value, operation, and flags
- **Operation Logic:** Handling sequential operations
- **Decimal Handling:** Preventing multiple decimal points
- **Edge Cases:** Division by zero, consecutive operations
- **Display Formatting:** Number formatting and overflow handling
- **Clear vs All Clear:** Difference between C and AC buttons

**Plan of Action:**
1. Create `Calculator` component
2. Initialize state for display, previous value, operation, and waiting flag
3. Create handler for number buttons
4. Create handler for operation buttons
5. Create handler for equals button
6. Create handler for clear button
7. Design calculator grid layout with CSS
8. Handle decimal point button
9. Add error handling for edge cases

## 5. Code the Question

```jsx
import React, { useState } from 'react';
import './Calculator.css';

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  // Handle number button clicks
  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  // Handle decimal point
  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  // Clear display
  const clear = () => {
    setDisplay('0');
  };

  // All clear - reset everything
  const allClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  // Perform calculation
  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  // Calculate result based on operation
  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 'Error';
      default:
        return secondValue;
    }
  };

  // Handle equals button
  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const result = calculate(previousValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  // Handle percentage
  const handlePercent = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  // Toggle positive/negative
  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  return (
    <div className="calculator">
      <div className="calculator-display">{display}</div>
      
      <div className="calculator-keypad">
        <div className="calculator-row">
          <button className="function-key" onClick={allClear}>AC</button>
          <button className="function-key" onClick={toggleSign}>±</button>
          <button className="function-key" onClick={handlePercent}>%</button>
          <button className="operator-key" onClick={() => performOperation('÷')}>÷</button>
        </div>

        <div className="calculator-row">
          <button className="number-key" onClick={() => inputNumber(7)}>7</button>
          <button className="number-key" onClick={() => inputNumber(8)}>8</button>
          <button className="number-key" onClick={() => inputNumber(9)}>9</button>
          <button className="operator-key" onClick={() => performOperation('×')}>×</button>
        </div>

        <div className="calculator-row">
          <button className="number-key" onClick={() => inputNumber(4)}>4</button>
          <button className="number-key" onClick={() => inputNumber(5)}>5</button>
          <button className="number-key" onClick={() => inputNumber(6)}>6</button>
          <button className="operator-key" onClick={() => performOperation('-')}>−</button>
        </div>

        <div className="calculator-row">
          <button className="number-key" onClick={() => inputNumber(1)}>1</button>
          <button className="number-key" onClick={() => inputNumber(2)}>2</button>
          <button className="number-key" onClick={() => inputNumber(3)}>3</button>
          <button className="operator-key" onClick={() => performOperation('+')}>+</button>
        </div>

        <div className="calculator-row">
          <button className="number-key zero-key" onClick={() => inputNumber(0)}>0</button>
          <button className="number-key" onClick={inputDecimal}>.</button>
          <button className="operator-key equals-key" onClick={handleEquals}>=</button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
```

**CSS Styling (Calculator.css):**

```css
.calculator {
  width: 320px;
  margin: 2rem auto;
  padding: 1rem;
  background: linear-gradient(145deg, #2c2c2c, #1a1a1a);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  font-family: 'Arial', sans-serif;
}

.calculator-display {
  background-color: #1a1a1a;
  color: #fff;
  font-size: 3rem;
  text-align: right;
  padding: 1.5rem 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;
  word-wrap: break-word;
  font-weight: 300;
}

.calculator-keypad {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.calculator-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}

button {
  padding: 1.25rem;
  font-size: 1.5rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  outline: none;
}

button:active {
  transform: scale(0.95);
}

.number-key {
  background: linear-gradient(145deg, #4a4a4a, #3a3a3a);
  color: #fff;
}

.number-key:hover {
  background: linear-gradient(145deg, #5a5a5a, #4a4a4a);
}

.operator-key {
  background: linear-gradient(145deg, #ff9f0a, #ff8c00);
  color: #fff;
  font-size: 1.75rem;
}

.operator-key:hover {
  background: linear-gradient(145deg, #ffb03a, #ff9f0a);
}

.function-key {
  background: linear-gradient(145deg, #636363, #505050);
  color: #fff;
}

.function-key:hover {
  background: linear-gradient(145deg, #737373, #606060);
}

.zero-key {
  grid-column: span 2;
}

.equals-key {
  background: linear-gradient(145deg, #34c759, #28a745);
}

.equals-key:hover {
  background: linear-gradient(145deg, #44d769, #34c759);
}

/* Accessibility focus styles */
button:focus {
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
}
```

## 6. Things to Consider

**Best Practices:**
- **State Management:** Keep track of current value, previous value, operation, and waiting state
- **Floating Point Precision:** Handle JavaScript floating point arithmetic issues
- **User Feedback:** Provide visual feedback for button presses
- **Error Handling:** Handle division by zero and invalid operations
- **Display Overflow:** Limit display length or use scientific notation
- **Keyboard Support:** Add keyboard input handling

**Common Pitfalls:**
- Don't forget to handle consecutive operations without pressing equals
- Be careful with floating point arithmetic (0.1 + 0.2 !== 0.3 in JavaScript)
- Handle edge case of pressing equals multiple times
- Don't allow multiple decimal points
- Remember to reset waiting state appropriately

**Enhancements:**
- **Memory Functions:** M+, M-, MR, MC buttons
- **History:** Show calculation history
- **Keyboard Input:** Support keyboard number and operation keys
- **Scientific Mode:** Add advanced operations (sin, cos, sqrt, etc.)
- **Themes:** Multiple color themes
- **Sound Effects:** Button click sounds
- **Responsive Design:** Adapt to different screen sizes
- **Copy to Clipboard:** Copy result functionality

**Advanced Version with History:**

```jsx
import React, { useState } from 'react';

function CalculatorWithHistory() {
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState([]);
  // ... other state

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const result = calculate(previousValue, inputValue, operation);
      
      // Add to history
      const calculation = `${previousValue} ${operation} ${inputValue} = ${result}`;
      setHistory([calculation, ...history]);
      
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        {/* Calculator UI */}
      </div>
      
      <div className="history-panel">
        <h3>History</h3>
        {history.map((item, index) => (
          <div key={index} className="history-item">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Keyboard Support:**

```jsx
import React, { useState, useEffect } from 'react';

function Calculator() {
  // ... existing state

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        inputNumber(parseInt(e.key));
      } else if (e.key === '.') {
        inputDecimal();
      } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        const opMap = { '+': '+', '-': '-', '*': '×', '/': '÷' };
        performOperation(opMap[e.key]);
      } else if (e.key === 'Enter' || e.key === '=') {
        handleEquals();
      } else if (e.key === 'Escape') {
        allClear();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [display, previousValue, operation, waitingForOperand]);

  // ... rest of component
}
```

**Testing Considerations:**
- Test basic operations (1 + 1 = 2)
- Test chained operations (2 + 3 + 4 = 9)
- Test decimal operations (0.1 + 0.2)
- Test division by zero
- Test negative numbers
- Test clearing and resetting
- Test edge cases (very large numbers, very small numbers)
- Test rapid button clicking

**Real-World Use Cases:**
- Basic calculator applications
- Shopping cart totals
- Tip calculators
- Financial calculators
- Educational math tools
- Unit conversion calculators

This calculator component demonstrates complex state management and serves as a foundation for more advanced calculator applications.