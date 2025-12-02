# React Contact Form Tutorial

## 1. What is the Question and What to Achieve Here

Create a contact form component that allows users to send messages. The form should include name, email, subject, and message fields with validation, submission handling, and success/error feedback.

**Goals:**
- Collect user contact information
- Validate all fields before submission
- Handle form submission (send to API/email service)
- Show success/error messages
- Reset form after successful submission
- Make it accessible and user-friendly

## 2. How to Solve

Use React's `useState` hook to manage form state and validation errors. Implement field validation and handle form submission with async operations. Display appropriate feedback based on submission results.

## 3. What Are the Things That Need to Be Gathered

**Requirements:**
- React with hooks
- Understanding of form handling and validation
- API integration (optional: EmailJS, Formspree, or custom backend)
- Error handling and user feedback
- Controlled components

## 4. Key Topics to Consider and Plan of Action

**Key Topics:**
- Form validation (name, email, message)
- Textarea handling for long messages
- Character limits for message field
- API integration for sending emails
- Loading and success states
- Error handling

**Plan of Action:**
1. Create ContactForm component
2. Set up form state and validation
3. Build form UI with all fields
4. Implement validation logic
5. Handle form submission
6. Integrate with email service (or API)
7. Display success/error feedback
8. Add loading states

## 5. Code the Question

```jsx
import React, { useState } from 'react';
import './ContactForm.css';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) return 'Name is required';
    if (name.trim().length < 2) return 'Name must be at least 2 characters';
    return '';
  };

  const validateEmail = (email) => {
    if (!email.trim()) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email';
    return '';
  };

  const validateSubject = (subject) => {
    if (!subject.trim()) return 'Subject is required';
    if (subject.trim().length < 3) return 'Subject must be at least 3 characters';
    return '';
  };

  const validateMessage = (message) => {
    if (!message.trim()) return 'Message is required';
    if (message.trim().length < 10) return 'Message must be at least 10 characters';
    if (message.length > 1000) return 'Message must be less than 1000 characters';
    return '';
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear submit status when user types
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  // Handle blur validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = '';

    switch (name) {
      case 'name':
        error = validateName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'subject':
        error = validateSubject(value);
        break;
      case 'message':
        error = validateMessage(value);
        break;
      default:
        break;
    }

    if (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      subject: validateSubject(formData.subject),
      message: validateMessage(formData.message)
    };

    // Remove empty errors
    Object.keys(newErrors).forEach(key => {
      if (!newErrors[key]) delete newErrors[key];
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call (replace with actual API)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In real app, send to backend:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // if (!response.ok) throw new Error('Failed to send');

      console.log('Contact form submitted:', formData);
      setSubmitStatus('success');

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setErrors({});

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const messageLength = formData.message.length;
  const maxMessageLength = 1000;

  return (
    <div className="contact-form-container">
      <div className="contact-form-header">
        <h2>Contact Us</h2>
        <p>Have a question? We'd love to hear from you.</p>
      </div>

      {submitStatus === 'success' && (
        <div className="alert alert-success">
          ✓ Thank you for your message! We'll get back to you soon.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="alert alert-error">
          ✗ Oops! Something went wrong. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} className="contact-form" noValidate>
        {/* Name Field */}
        <div className="form-field">
          <label htmlFor="name">
            Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.name ? 'error' : ''}
            placeholder="Your name"
            disabled={isSubmitting}
          />
          {errors.name && (
            <span className="error-text">{errors.name}</span>
          )}
        </div>

        {/* Email Field */}
        <div className="form-field">
          <label htmlFor="email">
            Email <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email ? 'error' : ''}
            placeholder="your.email@example.com"
            disabled={isSubmitting}
          />
          {errors.email && (
            <span className="error-text">{errors.email}</span>
          )}
        </div>

        {/* Subject Field */}
        <div className="form-field">
          <label htmlFor="subject">
            Subject <span className="required">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.subject ? 'error' : ''}
            placeholder="What is this about?"
            disabled={isSubmitting}
          />
          {errors.subject && (
            <span className="error-text">{errors.subject}</span>
          )}
        </div>

        {/* Message Field */}
        <div className="form-field">
          <label htmlFor="message">
            Message <span className="required">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.message ? 'error' : ''}
            placeholder="Tell us more..."
            rows={6}
            maxLength={maxMessageLength}
            disabled={isSubmitting}
          />
          <div className="message-footer">
            {errors.message ? (
              <span className="error-text">{errors.message}</span>
            ) : (
              <span className="char-count">
                {messageLength} / {maxMessageLength} characters
              </span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
```

**CSS (ContactForm.css):**

```css
.contact-form-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.contact-form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.contact-form-header h2 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.contact-form-header p {
  margin: 0;
  color: #666;
  font-size: 0.95rem;
}

.alert {
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.alert-success {
  background-color: #e8f5e9;
  color: #2e7d32;
  border-left: 4px solid #4caf50;
}

.alert-error {
  background-color: #ffebee;
  color: #c62828;
  border-left: 4px solid #f44336;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-field {
  display: flex;
  flex-direction: column;
}

.form-field label {
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
}

.required {
  color: #f44336;
}

.form-field input,
.form-field textarea {
  padding: 0.75rem;
  font-size: 1rem;
  font-family: inherit;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  transition: border-color 0.2s;
  outline: none;
}

.form-field input:focus,
.form-field textarea:focus {
  border-color: #2196f3;
}

.form-field input.error,
.form-field textarea.error {
  border-color: #f44336;
}

.form-field input:disabled,
.form-field textarea:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.form-field textarea {
  resize: vertical;
  min-height: 120px;
}

.message-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.25rem;
}

.error-text {
  color: #f44336;
  font-size: 0.8rem;
  margin-top: 0.375rem;
  font-weight: 500;
}

.char-count {
  color: #666;
  font-size: 0.8rem;
}

.submit-btn {
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background-color: #2196f3;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  background-color: #1976d2;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

## 6. Things to Consider

**Best Practices:**
- Validate all fields before submission
- Provide clear, helpful error messages
- Show character limits for text areas
- Disable form during submission
- Clear form after success
- Handle API errors gracefully
- Use proper ARIA attributes

**Email Service Integration Examples:**

```javascript
// Using EmailJS
import emailjs from '@emailjs/browser';

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  setIsSubmitting(true);
  
  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      formData,
      'YOUR_PUBLIC_KEY'
    );
    setSubmitStatus('success');
  } catch (error) {
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
  }
};

// Using Formspree
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  setIsSubmitting(true);
  
  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      setSubmitStatus('success');
    } else {
      throw new Error('Failed');
    }
  } catch (error) {
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
  }
};
```

**Testing:**
- Test all validation rules
- Test successful submission
- Test error handling
- Test with disabled JavaScript
- Test accessibility

**Real-World Use Cases:**
- Customer support forms
- Business inquiries
- Feedback forms
- Report issues
- General contact

This contact form is production-ready and can be integrated with any email service or backend API.