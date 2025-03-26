import { useState, useEffect } from "react";
import axios from 'axios';
import { SignUpUrl, imageUploadURL, mainEndpoint } from "../endPointUrls";
import Loader from "./Loader";
import "../styles/SignUpform.css";
import ImageUploader from './ImageUploader';

const Signup = ({ setFormType }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        username: '',
        email: '',
        phonenumber: '',
        password: '',
        confirmpassword: '',
        role: '',
        image: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const uploadImage = async () => {
        if (!selectedFile) return null;
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post(imageUploadURL, formData);
            return response.data.fileUrl;
        } catch (error) {
            setError('Image upload failed.');
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.password !== data.confirmpassword) {
            setError('Your password and confirm password do not match');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const imageUrl = await uploadImage();

            const userData = {
                ...data,
                image: imageUrl ? `${mainEndpoint}/${imageUrl}` : '',
            };

            await axios.post(SignUpUrl, userData);
            setFormType('login');
        }
        catch (err) {
            setError('User creation failed!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <input name="username" placeholder="Username" value={data.username} type="text" onChange={handleChange} required />
                <input name="email" placeholder="Email" value={data.email} type="email" onChange={handleChange} required />
                <input name="phonenumber" placeholder="Phone Number" value={data.phonenumber} type="text" onChange={handleChange} maxLength={11} />
                <input name="password" placeholder="Password" value={data.password} type="password" onChange={handleChange} required />
                <input name="confirmpassword" placeholder="Confirm Password" value={data.confirmpassword} type="password" onChange={handleChange} required />
                <ImageUploader setSelectedFile={setSelectedFile} />
                <label>Role:</label>
                <select name="role" value={data.role} onChange={handleChange}>
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit">Submit</button>
            </form>
            {error && <div><p>{error}</p></div>}
            {loading && <Loader />}
        </div>
    );
};

export default Signup;
