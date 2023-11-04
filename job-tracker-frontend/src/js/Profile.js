import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';  // <-- Ensure useLocation is imported

import '../css/Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();  // <-- Use the useLocation hook
    const userId = location.state?.userId;
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8001/api/users/${userId}`);
                
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    console.error('Error fetching user data:', await response.text());
                }
            } catch (error) {
                console.error('Network error:', error);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    const handleJobsClick = () => {
        navigate('/jobs', { state: { userId, userData } });
    };

    const handleSkillsClick = () => {
        navigate('/skills', { state: { userId, userData } });
    };

    const handleContactsClick = () => {
        navigate('/contacts', { state: { userId, userData } });
    };

    return (
        <div className="profile-container">
            <div className="profile-image">
                <svg
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="50" cy="30" r="25" fill="#C4C4C4" />
                    <ellipse cx="50" cy="85" rx="40" ry="25" fill="#C4C4C4" />
                </svg>
            </div>
            <h3 className="username">{userData ? userData.username : 'Loading...'}</h3>
            <div className="profile-links">
                <button onClick={handleJobsClick}>Jobs</button>
                <button onClick={handleSkillsClick}>Skills</button>

                <button onClick={handleContactsClick}>Contacts</button>
            </div>
        </div>
    );
}

export default Profile;
