import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const EditPost = () => {
  const { id } = useParams(); // Get post ID from URL
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    status: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  // Fetch post data when component mounts
  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await api.get(`/api/posts/${id}`);
      const post = response.data.data;
      
      // Pre-fill form with existing data
      setFormData({
        title: post.title,
        content: post.content,
        category: post.category,
        status: post.status
      });
      
      setIsLoading(false);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.response?.data?.message || 'Failed to load post');
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSaving(true);

    try {
      const response = await api.put(`/api/posts/${id}`, formData);
      
      if (response.data.success) {
        // Redirect to dashboard after successful update
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post');
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div style={loadingStyle}>Loading post...</div>;
  }

  if (error && !formData.title) {
    return <div style={errorPageStyle}>{error}</div>;
  }

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h1>Edit Post</h1>
        
        {error && <div style={errorStyle}>{error}</div>}

        <form onSubmit={handleSubmit} style={formStyle}>
          {/* Title */}
          <div style={fieldStyle}>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          {/* Content */}
          <div style={fieldStyle}>
            <label>Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="10"
              required
              style={textareaStyle}
            />
          </div>

          {/* Category */}
          <div style={fieldStyle}>
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
            </select>
          </div>

          {/* Status */}
          <div style={fieldStyle}>
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div style={buttonGroupStyle}>
            <button 
              type="button"
              onClick={() => navigate('/dashboard')}
              style={cancelButtonStyle}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSaving}
              style={submitButtonStyle}
            >
              {isSaving ? 'Saving...' : 'Update Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const loadingStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '200px',
  fontSize: '1.2rem',
  color: '#666'
};

const errorPageStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '200px',
  fontSize: '1.2rem',
  color: '#e74c3c'
};

const containerStyle = {
  maxWidth: '800px',
  margin: '2rem auto',
  padding: '0 1rem'
};

const formContainerStyle = {
  background: '#fff',
  borderRadius: '8px',
  padding: '2rem',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
};

const errorStyle = {
  background: '#fdecea',
  color: '#e74c3c',
  padding: '0.75rem 1rem',
  borderRadius: '4px',
  marginBottom: '1rem'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem'
};

const fieldStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem'
};

const inputStyle = {
  padding: '0.6rem 0.8rem',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '1rem',
  width: '100%',
  boxSizing: 'border-box'
};

const textareaStyle = {
  ...inputStyle,
  resize: 'vertical',
  fontFamily: 'inherit'
};

const buttonGroupStyle = {
  display: 'flex',
  gap: '1rem',
  justifyContent: 'flex-end'
};

const cancelButtonStyle = {
  padding: '0.6rem 1.4rem',
  borderRadius: '4px',
  border: '1px solid #ccc',
  background: '#f5f5f5',
  cursor: 'pointer',
  fontSize: '1rem'
};

const submitButtonStyle = {
  padding: '0.6rem 1.4rem',
  borderRadius: '4px',
  border: 'none',
  background: '#3498db',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '1rem'
};

export default EditPost;