import React, { useState, useEffect } from 'react';

const Skills = () => {
    const [skills, setSkills] = useState([]);  // List of skills as objects

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/skills');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setSkills(data);  // Assuming the API returns an array of skill objects
            } catch (error) {
                console.error('There was a problem fetching the skills:', error);
            }
        };

        fetchSkills();
    }, []);

    // Add newSkill state and its setter
    const [newSkill, setNewSkill] = useState('');

    const addSkill = async () => {
        if (newSkill.trim()) {
            try {
                const response = await fetch('http://localhost:5000/api/skills', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: newSkill }), // Adjust based on how your API expects the data
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const addedSkill = await response.json(); // Assuming the API returns the added skill object
                setSkills(skills => [...skills, addedSkill]); // Use a function to ensure we have the latest state
                setNewSkill('');
            } catch (error) {
                console.error('There was a problem adding the skill:', error);
            }
        }
    };

    return (
        <div>
            <h1>Skills</h1>
            <input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Enter a new skill"
            />
            <button onClick={addSkill}>Add Skill</button>

            <ul>
                {skills.map(skill => (
                    <li key={skill._id.$oid}>
                        {skill.name} - {skill.description}
                        {/* You can also display other properties like category and dateAdded */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Skills;
