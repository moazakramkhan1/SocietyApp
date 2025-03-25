function ImageUploader({ setSelectedFile }) {
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    return (
        <div style={{ margin: '20px 0' }}>
            <input type="file" onChange={handleFileChange} accept="image/*" />
        </div>
    );
}

export default ImageUploader;
