import React, { useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const LoginForm = ()=>{
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email:'',
        password:''
    });

const handleChange = (e)=>{
    const {name, value} = e.target;
    setFormData((prevData)=>({...prevData, [name]: value}));
};
const handleSubmit = async (e)=>{
    e.preventDefault();
    setLoading(true);
    try{
    const data = await axios.post('',formData);
    if (data.status == 'ok'){
        navigate('/')

    }
    }
    catch(err){
        setError('Something went wrong!');
    }
    finally{
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
    {error !== '' ? 
        <p>Error Occured!</p>:null
    }
    {loading &&  
        <p>Error Occured!</p>
    }
    </div>
);
};

export default LoginForm
