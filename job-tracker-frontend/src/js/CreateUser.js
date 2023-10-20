// src/CreateUser.js
import React, { useState } from 'react';
import '../css/CreateUser.css';

const CreateUser = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            setMessage(result.message);
        } catch (error) {
            setMessage('Error creating user.');
        }
    };

    return (
        <div className="container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <button type="submit">Sign Up</button>
            </form>
            {message && <div className="message">{message}</div>}
        </div>
    );
}

export default CreateUser;
