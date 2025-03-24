import { useState } from 'react';
import axios from 'axios';
import { imageUploadURL } from '../endPointUrls';

function ImageUploader({ setImage }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setError('');
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Please select a file first.');
            return;
        }

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await axios.post(imageUploadURL, formData);
            const { fileUrl } = response.data;

            setImage(fileUrl);
            setError('');
        } catch (err) {
            console.error(err);
            setError('Upload failed. Try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{ margin: '20px 0' }}>
            <input type="file" onChange={handleFileChange} />
            <button
                type="button"
                onClick={handleUpload}
                disabled={uploading}
                style={{ marginLeft: '10px' }}
            >
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default ImageUploader;
