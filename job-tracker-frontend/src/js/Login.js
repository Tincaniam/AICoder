import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Login.css';
import UserTable from './UserTable';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const loginUser = async () => {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const data = await response.json();
            return { success: true, data };
        } else {
            const error = await response.json();
            return { success: false, error };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const result = await loginUser();
    
            if (result.success) {
                console.log("Server Response Data:", result.data); // <-- Add this line
                const userId = result.data.userId; 
                console.log("Logged in User ID:", userId); // <-- Add this line
                navigate('/profile', { state: { userId } });
    
                setIsSuccess(true);
                setMessage('Logged in successfully!');
                
            } else {
                setIsSuccess(false);
                setMessage(result.error.message || 'Login failed.');
            }
        } catch (error) {
            setIsSuccess(false);
            setMessage("Network error or server isn't responding.");
            console.error("API call error:", error);
        }
    };

    return (
        <div className="container-login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
            <Link to="/create-user" className="sign-up-link">Sign Up</Link>
            {message && <div className={`message ${isSuccess ? 'success' : 'error'}`}>{message}</div>}
            
            <h3 className="users-title">List of Users</h3>
            <UserTable />
        </div>
    );
}

export default Login;
