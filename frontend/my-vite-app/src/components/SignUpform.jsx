import { useState, useEffect } from "react";
import axios from 'axios'
import { SignUpUrl } from "../endPointUrls";
import Loader from "./Loader";
import "../styles/SignUpform.css";
import ImageUploader from './ImageUploader';

const Signup = ({ setFormType }) => {
    const [image, setImage] = useState('')
    const [data, setData] = useState({
        username: '',
        email: '',
        phonenumber: '',
        password: '',
        confirmpassword: '',
        role: '',
        image: ''
    }
    );
    useEffect(() => {
        setData((prevData) => ({ ...prevData, image }));
    }, [image]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.password !== data.confirmpassword) {
            setError('Your password and confirm password do not match');
            return;
        }

        setError('');
        setLoading(true);

        try {
            await axios.post(SignUpUrl, data);
            setFormType('login')
        } catch (err) {
            setError('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };



    return <div className="container">
        <form onSubmit={handleSubmit}>
            <input
                name="username"
                placeholder="username"
                value={data.username}
                type="text"
                onChange={handleChange}
                required
            />
            <input
                name="email"
                placeholder="Email"
                value={data.email}
                type="email"
                onChange={handleChange}
                required
            />
            <input
                name="phonenumber"
                placeholder="Phone Number"
                value={data.phonenumber}
                type="text"
                onChange={handleChange}
            />
            <input
                name="password"
                placeholder="Password"
                value={data.password}
                type="password"
                onChange={handleChange}
                required
            />
            <input
                name="confirmpassword"
                placeholder="Confirm Password"
                value={data.confirmpassword}
                type="password"
                onChange={handleChange}
                required
            />
            <ImageUploader setImage={setImage} />
            <label>Role:</label>
            <select name="role" value={data.role} onChange={handleChange}>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
            </select>
            <button type="submit">Submit</button>
        </form>
        {error !== '' ? <div>
            <p>{error}</p>
        </div> : null}
        {loading && <Loader />}
    </div>
}
export default Signup