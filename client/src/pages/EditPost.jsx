import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import PostForm from '../components/posts/PostForm';
import api from '../services/api';
import { getApiErrorMessage } from '../services/api';

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

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await api.get(`/api/posts/${id}`);
        const post = response.data.data;

        setFormData({
          title: post.title,
          content: post.content,
          category: post.category,
          status: post.status
        });
      } catch (err) {
        const message = getApiErrorMessage(err);
        console.error('Fetch error:', err);
        setError(message);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

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
        toast.success('Post updated successfully');
        navigate('/dashboard');
      }
    } catch (err) {
      const message = getApiErrorMessage(err);
      setError(message);
      toast.error(message);
    } finally {
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
    <PostForm
      heading="Edit Post"
      formData={formData}
      error={error}
      isSaving={isSaving}
      submitLabel="Update Post"
      submittingLabel="Saving..."
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancel={() => navigate('/dashboard')}
    />
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

export default EditPost;