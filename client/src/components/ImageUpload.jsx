import React, { useState, useEffect } from 'react';

const ImageUpload = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState('');

  const validateFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      return 'Invalid file type. Please select a JPEG, PNG, WebP, or GIF image.';
    }

    if (file.size > maxSize) {
      return 'File is too large. Maximum size is 5MB.';
    }

    return null;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setError('');

    const validationError = validateFile(file);

    if (validationError) {
      setError(validationError);
      setSelectedFile(null);
      setPreviewUrl(null);
    } else {
      setSelectedFile(file);

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    if (onUpload) {
      onUpload(formData);
    }
  };

  return (
    <div className="image-upload-wrapper">
      <form onSubmit={handleSubmit}>
        <div className="file-input-container">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileChange}
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {previewUrl && (
          <div className="preview-container" style={{ margin: '10px 0' }}>
            <img
              src={previewUrl}
              alt="Preview"
              style={{
                width: '200px',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '8px',
                border: '1px solid #ccc'
              }}
            />
          </div>
        )}

        <button 
          type="submit" 
          disabled={!selectedFile || !!error}
          style={{ marginTop: '10px' }}
        >
          Upload Image
        </button>
      </form>
    </div>
  );
};

export default ImageUpload;
