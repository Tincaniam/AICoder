import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Create the user object to match the backend expectation
        const user = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
        };
        try {
            const response = await axios.post('http://localhost:5000/api/register', user);
            setMessage('User registered successfully');
            // You might want to redirect the user to the login page or do something else here.
        } catch (error) {
            setMessage('Registration failed: ' + error.response.data.message);
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <input 
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit">Register</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default Register;
