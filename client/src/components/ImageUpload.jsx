import React, { useState, useEffect } from "react";

const ImageUpload = ({ onUpload }) => {
	// selectedFile stores the File object from the browser input element.
	const [selectedFile, setSelectedFile] = useState(null);
	// previewUrl stores a temporary blob URL used by <img> for local preview.
	const [previewUrl, setPreviewUrl] = useState(null);
	// error stores client-side validation messages shown to the user.
	const [error, setError] = useState('');

	const validateFile = (file) => {
		// Frontend validation provides instant feedback before making a network request.
		const allowedTypes = [
			'image/jpeg',
			'image/png',
			'image/webp',
			'image/gif'
		];
		const maxSizeInBytes = 5 * 1024 * 1024;

		if (!allowedTypes.includes(file.type)) {
			return 'Please select an image file (JPEG, PNG, WebP, or GIF)';
		}

		if (file.size > maxSizeInBytes) {
			const sizeInMb = (file.size / (1024 * 1024)).toFixed(2);
			return `File is too large. Maximum size is 5MB. Your file is ${sizeInMb} MB`;
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
			return;
		}

		setSelectedFile(file);

		// Revoke the old blob URL before creating a new one to avoid memory leaks.
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl);
		}

		// URL.createObjectURL gives a local temporary URL so users can preview immediately.
		const objectUrl = URL.createObjectURL(file);
		setPreviewUrl(objectUrl);
	};

	useEffect(() => {
		// This prevents memory leaks by cleaning blob URLs when preview changes or component unmounts.
		return () => {
			if (previewUrl) {
				URL.revokeObjectURL(previewUrl);
			}
		};
	}, [previewUrl]);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!selectedFile) {
			setError('Please select an image first');
			return;
		}

		// FormData is used for multipart/form-data requests when sending binary files.
		const formData = new FormData();
		formData.append('image', selectedFile);

		// Do not set Content-Type manually; the browser adds multipart boundaries automatically.
		if (onUpload) {
			onUpload(formData);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="file"
				accept="image/jpeg,image/png,image/webp,image/gif"
				onChange={handleFileChange}
			/>

			{error && (
				<p style={{ color: 'red' }}>{error}</p>
			)}

			{previewUrl && (
				<div>
					<p>Preview:</p>
					<img
						src={previewUrl}
						alt="Selected file preview"
						style={{
							width: '200px',
							height: '200px',
							objectFit: 'cover'
						}}
					/>
				</div>
			)}

			<button
				type="submit"
				disabled={!selectedFile || !!error}
			>
				Upload Image
			</button>
		</form>
	);
};

export default ImageUpload;
