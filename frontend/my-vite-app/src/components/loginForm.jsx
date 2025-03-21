import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoginUrl } from "../endPointUrls";
import { HomeRoute } from "../routes";
import Loader from "./Loader";
import "../styles/LoginForm.css";
import { jwtDecode } from "jwt-decode"

const LoginForm = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const formData = new URLSearchParams();
    formData.append("grant_type", "password");
    formData.append("username", data.email);
    formData.append("password", data.password);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log('before')
            const response = await axios.post(LoginUrl, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            const token = response.data.access_token;
            localStorage.setItem('access_token', token);
            const decoded_data = jwtDecode(token);
            localStorage.setItem('role', decoded_data.role)
            navigate(HomeRoute);
        }
        catch (err) {
            setError('Something went wrong!');
        }
        finally {
            setLoading(false);
        }
    };
    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error !== '' ? <div>
                <p>{error}</p>
            </div> : null}
            {loading &&
                <Loader />
            }
        </div>
    );
};

export default LoginForm
