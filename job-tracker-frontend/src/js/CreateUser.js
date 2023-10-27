import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import '../css/CreateUser.css';

const CreateUser = () => { // Removed props as it's not needed
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    });
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false); // For feedback color

    const navigate = useNavigate(); // Use the hook here

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            ...formData,
            savedJobs: []
        };
        
        try {
            const response = await fetch('http://localhost:8001/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const result = await response.json();
            setIsSuccess(response.ok);
            setMessage(result.message);
            
            if (response.ok) {
                navigate('/login'); // Use the navigate function here
            }
        } catch (error) {
            setIsSuccess(false);
            setMessage("Network error or server isn't responding.");
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
            {message && <div className={`message ${isSuccess ? 'success' : 'error'}`}>{message}</div>}
        </div>
    );
}

export default CreateUser;
