import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import PostList from '../components/posts/PostList';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import { getApiErrorMessage } from '../services/api';
import socket from '../services/socket';

const Dashboard = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    socket.auth = { token: localStorage.getItem('token') };

    // Connect when component mounts (user is logged in)
    socket.connect();

    // Listen for successful connection
    socket.on('connect', () => {
      console.log('Socket connected', socket.id);
    });

    // Listen for disconnection
    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected', reason);
    });

    // Listen for connection errors
    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error.message);
    });

    socket.on('newPost', (data) => {
      console.log('New post event:', data);
      if (data?.message) {
        toast.success(data.message);
      }
    });

    // Cleanup when component unmounts
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connect_error');
      socket.off('newPost');
      socket.disconnect();
    };
  }, []);
  
  // Fetch posts when component mounts or page changes
  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const fetchPosts = async (page) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await api.get(`/api/posts?page=${page}&limit=10`);

      setPosts(response.data.data);
      setPagination(response.data.pagination);
    } catch (err) {
      const message = getApiErrorMessage(err);
      setError(message);
      toast.error(message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleDelete = async (postId) => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      'Are you sure you want to delete this post? This action cannot be undone.'
    );

    if (!confirmed) {
      return; // User cancelled
    }

    try {
      const response = await api.delete(`/api/posts/${postId}`);

      if (response.data.success) {
        setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));

        setPagination(prev => ({
          ...prev,
          total: Math.max((prev.total || 1) - 1, 0)
        }));

        toast.success('Post deleted successfully');
      }
    } catch (error) {
      const message = getApiErrorMessage(error);
      console.error('Delete error:', error);
      toast.error(message);
    }
  };

  if (isLoading) {
    return <div style={loadingStyle}>Loading posts...</div>;
  }

  return (
    <div style={containerStyle}>
      {/* Header with Create Button */}
      <div style={headerStyle}>
        <h1>Welcome, {user.name}!</h1>
        <Link to="/create">
          <button style={createButtonStyle}>
            + Create New Post
          </button>
        </Link>
      </div>

      {/* Error Message */}
      {error && <div style={errorStyle}>{error}</div>}

      {/* Posts List */}
      <div style={postsContainerStyle}>
        <PostList
          posts={posts}
          pagination={pagination}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

const containerStyle = {
  minHeight: '80vh',
  padding: '2rem',
  maxWidth: '1200px',
  margin: '0 auto',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2rem',
  padding: '1rem',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const createButtonStyle = {
  padding: '0.7rem 1.5rem',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: '500',
};

const errorStyle = {
  padding: '1rem',
  backgroundColor: '#f8d7da',
  color: '#721c24',
  borderRadius: '5px',
  marginBottom: '1rem',
  border: '1px solid #f5c6cb',
};

const postsContainerStyle = {
  backgroundColor: '#f8f9fa',
  padding: '2rem',
  borderRadius: '8px',
};

const loadingStyle = {
  textAlign: 'center',
  padding: '2rem',
  fontSize: '1.1rem',
  color: '#666',
};
export default Dashboard;