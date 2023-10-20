// src/js/SkillForm.js
import React, { useState } from 'react';
import '../css/SkillForm.css';

const SkillForm = () => {
    const [formData, setFormData] = useState({
        skillName: '',
        skillDescription: ''
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
            <h2>Create Skill</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="skillName" placeholder="Skill Name" value={formData.skillName} onChange={handleChange} required />
                <textarea name="skillDescription" placeholder="Skill Description" value={formData.skillDescription} onChange={handleChange} required></textarea>
                <button type="submit">Create Skill</button>
            </form>
        </div>
    );
}

export default SkillForm;
