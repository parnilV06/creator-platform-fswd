import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import PostForm from '../components/posts/PostForm';
import api from '../services/api';
import { getApiErrorMessage } from '../services/api';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Technology',
    status: 'draft'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await api.post('/api/posts', formData);
      
      if (response.data.success) {
        toast.success('Post created successfully');
        navigate('/dashboard');
      }
    } catch (err) {
      const message = getApiErrorMessage(err);
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PostForm
      heading="Create New Post"
      formData={formData}
      error={error}
      isSaving={isLoading}
      submitLabel="Create Post"
      submittingLabel="Creating..."
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default CreatePost;