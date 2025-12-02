# React Avatar Uploader Component Tutorial

## 1. What is the Question and What to Achieve Here

Build an avatar/image uploader component that allows users to select and upload profile pictures. The component should preview the selected image, validate file type and size, and provide options to change or remove the avatar.

**Goals:**
- Allow users to select image files
- Preview the selected image before upload
- Validate file type (only images) and size
- Display current avatar or placeholder
- Provide change/remove functionality
- Show upload progress or status
- Handle errors gracefully

## 2. How to Solve

Use React's `useState` hook to manage the selected file and preview URL. Use the FileReader API to generate preview URLs. Implement file validation before accepting uploads. Optionally integrate with a backend API for actual file uploads.

## 3. What Are the Things That Need to Be Gathered

**Requirements:**
- React with hooks
- Understanding of:
  - File input handling
  - FileReader API
  - Image preview generation
  - File validation (type, size)
  - Blob URLs and object URLs
  - Optional: FormData for uploads

**No external dependencies needed for basic functionality.**

## 4. Key Topics to Consider and Plan of Action

**Key Topics:**
- **File Input:** Using HTML file input element
- **FileReader API:** Reading files and creating previews
- **File Validation:** Checking file type and size
- **Image Preview:** Displaying selected image
- **State Management:** Tracking file, preview, and upload status
- **Memory Management:** Cleaning up object URLs
- **Error Handling:** User-friendly error messages

**Plan of Action:**
1. Create `AvatarUploader` component
2. Initialize state for preview URL and file
3. Create file input handler with validation
4. Generate image preview using FileReader
5. Display current avatar or placeholder
6. Add change/remove buttons
7. Implement file validation (type, size)
8. Add loading and error states
9. Clean up object URLs to prevent memory leaks

## 5. Code the Question

```jsx
import React, { useState, useRef } from 'react';
import './AvatarUploader.css';

function AvatarUploader({
  currentAvatar = null,
  maxSizeMB = 5,
  onUpload,
  onRemove
}) {
  const [preview, setPreview] = useState(currentAvatar);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  // File validation
  const validateFile = (file) => {
    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return 'Please select a valid image file (JPEG, PNG, GIF, or WebP)';
    }

    // Check file size
    const maxSize = maxSizeMB * 1024 * 1024; // Convert MB to bytes
    if (file.size > maxSize) {
      return `File size must be less than ${maxSizeMB}MB`;
    }

    return null;
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle upload
  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError('');

    try {
      // Simulate upload (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Call parent callback with file
      if (onUpload) {
        await onUpload(selectedFile);
      }

      setSelectedFile(null);
    } catch (err) {
      setError('Upload failed. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle remove
  const handleRemove = () => {
    setPreview(null);
    setSelectedFile(null);
    setError('');
    
    if (onRemove) {
      onRemove();
    }

    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="avatar-uploader">
      <div className="avatar-container">
        {preview ? (
          <img 
            src={preview} 
            alt="Avatar preview" 
            className="avatar-image"
          />
        ) : (
          <div className="avatar-placeholder">
            <span className="placeholder-icon">👤</span>
          </div>
        )}
        
        {isLoading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
          </div>
        )}
      </div>

      <div className="upload-controls">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input"
          aria-label="Upload avatar image"
        />

        <button 
          onClick={handleButtonClick}
          className="btn btn-select"
          disabled={isLoading}
        >
          {preview ? 'Change Avatar' : 'Select Avatar'}
        </button>

        {selectedFile && !isLoading && (
          <button 
            onClick={handleUpload}
            className="btn btn-upload"
          >
            Upload
          </button>
        )}

        {preview && !selectedFile && (
          <button 
            onClick={handleRemove}
            className="btn btn-remove"
            disabled={isLoading}
          >
            Remove
          </button>
        )}
      </div>

      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}

      {selectedFile && (
        <div className="file-info">
          <p className="file-name">{selectedFile.name}</p>
          <p className="file-size">
            {(selectedFile.size / 1024).toFixed(2)} KB
          </p>
        </div>
      )}

      <p className="upload-hint">
        Accepted formats: JPEG, PNG, GIF, WebP<br />
        Maximum size: {maxSizeMB}MB
      </p>
    </div>
  );
}

export default AvatarUploader;
```

**CSS Styling (AvatarUploader.css):**

```css
.avatar-uploader {
  max-width: 300px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: Arial, sans-serif;
}

.avatar-container {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f5f5f5;
  border: 4px solid #e0e0e0;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.placeholder-icon {
  font-size: 4rem;
  opacity: 0.8;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.upload-controls {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.file-input {
  display: none;
}

.btn {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-select {
  background-color: #2196f3;
  color: white;
}

.btn-select:hover:not(:disabled) {
  background-color: #1976d2;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
}

.btn-upload {
  background-color: #4caf50;
  color: white;
}

.btn-upload:hover {
  background-color: #388e3c;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

.btn-remove {
  background-color: #f44336;
  color: white;
}

.btn-remove:hover:not(:disabled) {
  background-color: #d32f2f;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3);
}

.btn:active:not(:disabled) {
  transform: translateY(0);
}

.error-message {
  padding: 0.75rem;
  background-color: #ffebee;
  border-left: 4px solid #f44336;
  border-radius: 4px;
  color: #c62828;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  text-align: left;
}

.file-info {
  padding: 0.75rem;
  background-color: #e3f2fd;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.file-name {
  font-weight: 600;
  color: #1976d2;
  margin: 0 0 0.25rem 0;
  font-size: 0.875rem;
  word-break: break-word;
}

.file-size {
  color: #666;
  margin: 0;
  font-size: 0.75rem;
}

.upload-hint {
  font-size: 0.75rem;
  color: #666;
  line-height: 1.5;
  margin: 0;
}
```

**Usage Example:**

```jsx
import React, { useState } from 'react';
import AvatarUploader from './AvatarUploader';

function UserProfile() {
  const [avatarUrl, setAvatarUrl] = useState(null);

  const handleUpload = async (file) => {
    // Simulate API upload
    console.log('Uploading file:', file);
    
    // In real app, upload to server:
    // const formData = new FormData();
    // formData.append('avatar', file);
    // const response = await fetch('/api/upload-avatar', {
    //   method: 'POST',
    //   body: formData
    // });
    // const data = await response.json();
    // setAvatarUrl(data.url);
    
    // For demo, just use local preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setAvatarUrl(null);
    console.log('Avatar removed');
  };

  return (
    <div className="profile">
      <h1>User Profile</h1>
      <AvatarUploader
        currentAvatar={avatarUrl}
        maxSizeMB={5}
        onUpload={handleUpload}
        onRemove={handleRemove}
      />
    </div>
  );
}
```

## 6. Things to Consider

**Best Practices:**
- **File Validation:** Always validate file type and size on both client and server
- **Memory Management:** Clean up blob URLs when component unmounts
- **Error Handling:** Provide clear, user-friendly error messages
- **Loading States:** Show progress during upload
- **Accessibility:** Include proper labels and ARIA attributes
- **Security:** Sanitize filenames and validate on server side

**Common Pitfalls:**
- Don't forget to revoke object URLs to prevent memory leaks
- Always validate files before attempting upload
- Handle network errors gracefully
- Don't trust client-side validation alone
- Remember to reset file input after removal
- Handle large file uploads with progress indicators

**Enhancements:**
- **Image Cropping:** Add crop functionality before upload
- **Drag and Drop:** Support drag-and-drop file selection
- **Multiple Uploads:** Support uploading multiple images
- **Image Compression:** Compress large images before upload
- **Upload Progress:** Show real-time upload progress bar
- **Image Filters:** Apply filters or adjustments
- **Webcam Capture:** Option to take photo with webcam
- **Cloud Storage:** Integrate with AWS S3, Cloudinary, etc.

**Advanced Version with Drag and Drop:**

```jsx
import React, { useState, useRef } from 'react';

function AvatarUploaderWithDragDrop() {
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const dropZoneRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      processFile(file);
    }
  };

  const processFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      ref={dropZoneRef}
      className={`drop-zone ${isDragging ? 'dragging' : ''}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {preview ? (
        <img src={preview} alt="Preview" />
      ) : (
        <p>Drag and drop an image here, or click to select</p>
      )}
    </div>
  );
}
```

**Real API Integration Example:**

```jsx
const handleUpload = async (file) => {
  setIsLoading(true);
  
  try {
    const formData = new FormData();
    formData.append('avatar', file);
    formData.append('userId', currentUser.id);

    const response = await fetch('/api/users/avatar', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    setAvatarUrl(data.avatarUrl);
    
  } catch (error) {
    setError('Failed to upload avatar. Please try again.');
  } finally {
    setIsLoading(false);
  }
};
```

**Testing Considerations:**
- Test with various image formats
- Test file size validation
- Test with oversized files
- Test with non-image files
- Test upload success/failure scenarios
- Test remove functionality
- Test with no file selected
- Test drag and drop (if implemented)

**Real-World Use Cases:**
- User profile pictures
- Product images in e-commerce
- Document uploads
- Social media post images
- Team member photos
- Gallery uploads
- ID verification uploads

This avatar uploader component provides a complete image upload experience with validation, preview, and error handling.