import React, { useState, useEffect } from 'react';
import '../css/Skills.css';

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [skillName, setSkillName] = useState('');

    // Fetch all skills when the component mounts
    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await fetch('http://localhost:8001/api/skills');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setSkills(data); // Assuming the API directly returns an array of skills
            } catch (error) {
                console.error('There was a problem retrieving skills data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSkills();
    }, []);

    // Handle changes to the skill name input
    const handleChange = (e) => {
        setSkillName(e.target.value);
    };

    // Handle form submissions for new skills
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newSkill = {
            name: skillName
        };

        try {
            const response = await fetch('http://localhost:8001/api/skills', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSkill)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setSkills([...skills, result]);
            setSkillName(''); // Reset input field
        } catch (error) {
            console.error('There was a problem posting the new skill:', error);
            setError(error.message);
        }
    };

    return (
        <div className="form-container">
            <h2>Create Skill</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="skillName"
                    placeholder="Skill Name"
                    value={skillName}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Create Skill</button>
            </form>
            {error && <p>Error: {error}</p>}
            {loading ? (
                <p>Loading skills...</p>
            ) : (
                skills.length > 0 ? (
                    <ul>
                        {skills.map((skill) => (
                            <li key={skill._id}>{skill.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No skills found.</p>
                )
            )}
        </div>
    );
};

export default Skills;
