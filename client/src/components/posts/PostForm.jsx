const PostForm = ({
  heading,
  formData,
  error,
  isSaving,
  submitLabel,
  submittingLabel,
  onChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h1>{heading}</h1>

        {error ? <div style={errorStyle}>{error}</div> : null}

        <form onSubmit={onSubmit} style={formStyle}>
          <div style={fieldStyle}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={onChange}
              placeholder="Enter post title"
              required
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={onChange}
              placeholder="Write your post content..."
              rows="10"
              required
              style={textareaStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={onChange}
              style={inputStyle}
            >
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
            </select>
          </div>

          <div style={fieldStyle}>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={onChange}
              style={inputStyle}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div style={buttonGroupStyle}>
            {onCancel ? (
              <button type="button" onClick={onCancel} style={cancelButtonStyle}>
                Cancel
              </button>
            ) : null}
            <button type="submit" disabled={isSaving} style={submitButtonStyle}>
              {isSaving ? submittingLabel || 'Saving...' : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const containerStyle = {
  maxWidth: '800px',
  margin: '2rem auto',
  padding: '0 1rem',
};

const formContainerStyle = {
  background: '#fff',
  borderRadius: '8px',
  padding: '2rem',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
};

const errorStyle = {
  background: '#fdecea',
  color: '#e74c3c',
  padding: '0.75rem 1rem',
  borderRadius: '4px',
  marginBottom: '1rem',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
};

const fieldStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
};

const inputStyle = {
  padding: '0.6rem 0.8rem',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '1rem',
  width: '100%',
  boxSizing: 'border-box',
};

const textareaStyle = {
  ...inputStyle,
  resize: 'vertical',
  fontFamily: 'inherit',
};

const buttonGroupStyle = {
  display: 'flex',
  gap: '1rem',
  justifyContent: 'flex-end',
};

const cancelButtonStyle = {
  padding: '0.6rem 1.4rem',
  borderRadius: '4px',
  border: '1px solid #ccc',
  background: '#f5f5f5',
  cursor: 'pointer',
  fontSize: '1rem',
};

const submitButtonStyle = {
  padding: '0.6rem 1.4rem',
  borderRadius: '4px',
  border: 'none',
  background: '#3498db',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '1rem',
};

export default PostForm;
