import { useState } from "react";
import axios from 'axios'
import { SignUpUrl } from "../endPointUrls";
import Loader from "./Loader";
import "../styles/SignUpform.css";

const Signup = ({ setFormType }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
    }
    );
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Your password and confirm password do not match');
            return;
        }

        setError('');
        setLoading(true);

        try {
            // const response = await axios.post(SignUpUrl, formData);
            // if (response.status === 'ok') {

            // }
            console.log('helloo')
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
                value={formData.username}
                type="text"
                onChange={handleChange}
                required
            />
            <input
                name="email"
                placeholder="Email"
                value={formData.email}
                type="email"
                onChange={handleChange}
                required
            />
            <input
                name="password"
                placeholder="Password"
                value={formData.password}
                type="password"
                onChange={handleChange}
                required
            />
            <input
                name="username"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                type="password"
                onChange={handleChange}
                required
            />
            <label>Role:</label>
            <select name="role" value={formData.role} onChange={handleChange}>
                <option value="student">Student</option>
                <option value="moderator">Moderator</option>
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