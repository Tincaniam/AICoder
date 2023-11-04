import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateUser from './CreateUser';
import JobForm from './JobForm';
import SkillForm from './SkillForm';
import Contacts from './Contacts';
import Login from './Login';  
import Profile from './Profile'; // Import the new Profile component
import '../css/App.css';

function App() {
    return (
        <Router>
            <div className="app-container">
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/create-user">Create User</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/profile">Profile</Link></li>  {/* Link to the new Profile page */}
                        <li><Link to="/create-job">Create Job</Link></li>
                        <li><Link to="/create-skill">Create Skill</Link></li>
                        <li><Link to="/contacts">Contacts</Link></li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<div>Welcome to the Job Tracker</div>} />
                    <Route path="/create-user" element={<CreateUser />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />  {/* Add the Profile route */}
                    <Route path="/create-job" element={<JobForm />} />
                    <Route path="/create-skill" element={<SkillForm />} />
                    <Route path="/contacts" element={<Contacts />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
