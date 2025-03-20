import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoginUrl } from "../endPointUrls";
import { HomeRoute } from "../routes";
import Loader from "./Loader";
import "../styles/LoginForm.css";

const LoginForm = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // const data = await axios.post(LoginUrl, formData);
            // if (data.status == 'ok') {

            // }
            navigate(HomeRoute)
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
