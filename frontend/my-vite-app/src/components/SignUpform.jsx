import { useState } from "react";
import axios from 'axios';
import { SignUpUrl, mainEndpoint } from "../endPointUrls";
import Loader from "./Loader";
import "../styles/SignUpform.css";
import ImageUploader from './ImageUploader';
import { UploadImage } from "../uploadImage";
import { deleteImage } from "../deleteImage";

const Signup = ({ setFormType }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [data, setData] = useState({
        username: '',
        email: '',
        phonenumber: '',
        designation: '',
        department: '',
        password: '',
        role: '',
        image: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.password !== confirmPassword) {
            setError('Your password and confirm password do not match');
            return;
        }

        setError('');
        setLoading(true);
        let imageUrl = '';

        try {
            imageUrl = selectedFile ? await UploadImage(selectedFile) : '';

            const userData = {
                ...data,
                image: imageUrl ? `${mainEndpoint}/${imageUrl}` : '',
                designation: data.designation || 'Member',
            };

            console.log("Sending user data:", userData);

            await axios.post(SignUpUrl, userData);
            setFormType('login');
        }
        catch (err) {
            console.error("Error during signup:", err.response?.data || err.message);
            if (imageUrl) {
                let delimgpath = imageUrl.split('/').pop();
                await deleteImage(delimgpath);
            }
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
                <input name="designation" placeholder="Designation(if not leave empty)" value={data.designation} type="text" onChange={handleChange} />
                <input name="department" placeholder="Department" value={data.department} type="text" onChange={handleChange} />
                <input name="password" placeholder="Password" value={data.password} type="password" onChange={handleChange} required />
                <input name="confirmpassword" placeholder="Confirm Password" value={confirmPassword} type="password" onChange={handleChangeConfirmPassword} required />
                <ImageUploader setSelectedFile={setSelectedFile} />
                <label>Role:</label>
                <select name="role" value={data.role} onChange={handleChange} defaultValue={'student'}>
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
