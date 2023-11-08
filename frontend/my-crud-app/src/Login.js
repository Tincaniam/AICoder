import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    // Update the formData to reflect the email instead of username.
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make sure you have the correct URL and endpoint for login.
            // Assuming '/api/login' is where your backend expects login requests.
            const response = await axios.post('http://localhost:5000/api/login', formData);
            setMessage(response.data.message);
            // Here you might also set a user token, navigate to dashboard, etc.
        } catch (error) {
            if (error.response) {
                // The server responded with a status code that falls out of the range of 2xx
                setMessage(error.response.data.message || 'Login failed: Invalid credentials.');
            } else {
                // The request was made but no response was received or an error occurred while setting up the request
                setMessage('Login failed: No response from the server or an error occurred.');
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" // Change type to email to validate email input
                    placeholder="Email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button type="submit">Login</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default Login;
