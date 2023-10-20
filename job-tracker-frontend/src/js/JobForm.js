// src/js/JobForm.js
import React, { useState } from 'react';
import '../css/JobForm.css';

const JobForm = () => {
    const [formData, setFormData] = useState({
        jobTitle: '',
        jobDescription: ''
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
            <h2>Create Job/Internship</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="jobTitle" placeholder="Job Title" value={formData.jobTitle} onChange={handleChange} required />
                <textarea name="jobDescription" placeholder="Job Description" value={formData.jobDescription} onChange={handleChange} required></textarea>
                <button type="submit">Create Job</button>
            </form>
        </div>
    );
}

export default JobForm;
