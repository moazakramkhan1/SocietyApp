import { useState, useEffect } from "react";
import axios from 'axios';
import { CreateSocietyURL, imageUploadURL, mainEndpoint } from "../endPointUrls";
import Loader from "./Loader";
import "../styles/SignUpform.css";
import ImageUploader from './ImageUploader';
import getRoleORImageOREmail from "../getRole";

const CreateSocietyFormComponent = ({setModalStatus }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [image, setImage] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const email = getRoleORImageOREmail(3);
    const id = getRoleORImageOREmail(4);

    const [data, setData] = useState({
        admin_id: 0,
        name: '',
        description: '',
        members: 1,
        image: ''
    });

    useEffect(() => {
        setData((prevData) => ({ ...prevData, admin_id: id }));
    }, [id]);

    useEffect(() => {
        if (image) {
            setData((prevData) => ({ ...prevData, image }));
        }
    }, [image]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const uploadImage = async () => {
        if (!selectedFile) return null;

        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await axios.post(imageUploadURL, formData);
        return response.data.fileUrl;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            const imageUrl = await uploadImage();
            if (imageUrl) {
                setImage(`${mainEndpoint}/${imageUrl}`);
                data.image = imageUrl;
            }

            const response = await axios.post(CreateSocietyURL, data)
            setMessage('Society Created Successfully')
            setModalStatus(false);
        } catch (err) {
            console.error(err);
            setError('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    placeholder="email"
                    value={email}
                    type="text"
                    readOnly
                />
                <input
                    name="name"
                    placeholder="name"
                    value={data.name}
                    type="text"
                    onChange={handleChange}
                    required
                />
                <input
                    name="description"
                    placeholder="Description"
                    value={data.description}
                    type="text"
                    onChange={handleChange}
                />
                <label>Upload Society image</label>
                <ImageUploader setSelectedFile={setSelectedFile} />

                <button type="submit">Submit</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {loading && <Loader />}
        </div>
    );
};

export default CreateSocietyFormComponent;
