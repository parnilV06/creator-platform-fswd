import { Link } from 'react-router-dom';

const PostList = ({ posts, pagination, currentPage, onPageChange, onDelete }) => {
  if (posts.length === 0) {
    return (
      <div style={emptyStateStyle}>
        <p>You haven't created any posts yet.</p>
        <Link to="/create">Create your first post</Link>
      </div>
    );
  }

  return (
    <>
      {posts.map((post) => (
        <div key={post._id} style={postCardStyle}>
          <h3>{post.title}</h3>
          <p style={contentPreviewStyle}>{post.content.substring(0, 150)}...</p>

          <div style={actionsStyle}>
            <Link to={`/edit/${post._id}`}>
              <button style={editButtonStyle}>Edit</button>
            </Link>

            <button onClick={() => onDelete(post._id)} style={deleteButtonStyle}>
              Delete
            </button>
          </div>

          <div style={metaStyle}>
            <span>{post.category}</span>
            <span>{post.status}</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      ))}

      <div style={paginationStyle}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!pagination.hasPrevPage}
          style={paginationButtonStyle}
        >
          Previous
        </button>

        <span style={pageInfoStyle}>
          Page {pagination.page || 1} of {pagination.totalPages || 1}
          {' '}
          ({pagination.total || 0} total posts)
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!pagination.hasNextPage}
          style={paginationButtonStyle}
        >
          Next
        </button>
      </div>
    </>
  );
};

const paginationStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '2rem',
  padding: '1rem',
  backgroundColor: 'white',
  borderRadius: '8px',
};

const paginationButtonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const pageInfoStyle = {
  color: '#666',
  fontSize: '0.9rem',
};

const postCardStyle = {
  padding: '1.5rem',
  backgroundColor: 'white',
  borderRadius: '8px',
  marginBottom: '1rem',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const contentPreviewStyle = {
  color: '#666',
  margin: '1rem 0',
};

const metaStyle = {
  display: 'flex',
  gap: '1rem',
  fontSize: '0.85rem',
  color: '#999',
};

const emptyStateStyle = {
  textAlign: 'center',
  padding: '3rem',
  backgroundColor: 'white',
  borderRadius: '8px',
};

const actionsStyle = {
  display: 'flex',
  gap: '1rem',
  marginTop: '1rem',
};

const deleteButtonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const editButtonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  textDecoration: 'none',
};

export default PostList;
