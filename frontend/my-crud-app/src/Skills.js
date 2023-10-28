import React, { useState } from 'react';

const Skills = () => {
    const [skills, setSkills] = useState([]);  // list of skills
    const [newSkill, setNewSkill] = useState('');  // new skill input

    const addSkill = () => {
        if (newSkill) {
            setSkills([...skills, newSkill]);
            setNewSkill('');
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
                    <li key={skill}>
                        {skill} - [Statistics will be displayed here. E.g., Docker is noted in 60% of your applications.]
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Skills;
