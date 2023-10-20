// src/js/ContactForm.js
import React, { useState } from 'react';
import '../css/ContactForm.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        contactName: '',
        contactInfo: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit form data to API (not implemented here)
    };

    return (
        <div className="form-container">
            <h2>Create Contact</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="contactName" placeholder="Contact Name" value={formData.contactName} onChange={handleChange} required />
                <textarea name="contactInfo" placeholder="Contact Information" value={formData.contactInfo} onChange={handleChange} required></textarea>
                <button type="submit">Create Contact</button>
            </form>
        </div>
    );
}

export default ContactForm;
