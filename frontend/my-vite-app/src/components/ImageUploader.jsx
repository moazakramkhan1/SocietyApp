import { useState } from 'react';
import axios from 'axios'
import { imageUploadURL } from '../endPointUrls';

function ImageUploader({ setImage }) {
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
        setError('');
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            setError('Please select a file first.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('image', image);
            const response = await axios.post(imageUploadURL, formData)
            if (!response.ok) {
                throw new Error('Failed to upload file.');
            }
        } catch (err) {
            console.error(err);
            setError(err.message || 'Something went wrong while uploading.');
        }
    };

    return (
        <div style={{ margin: '20px' }}>
            <form onSubmit={handleUpload}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit" style={{ marginLeft: '10px' }}>
                    Upload
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default ImageUploader;
