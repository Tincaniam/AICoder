import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateUser from './CreateUser';
import JobForm from './JobForm';
import SkillForm from './SkillForm';
import ContactForm from './ContactForm';
import '../css/App.css';

function App() {
    return (
        <Router>
            <div className="app-container">
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/create-user">Create User</Link></li>
                        <li><Link to="/create-job">Create Job</Link></li>
                        <li><Link to="/create-skill">Create Skill</Link></li>
                        <li><Link to="/create-contact">Create Contact</Link></li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<div>Welcome to the Job Tracker</div>} />
                    <Route path="/create-user" element={<CreateUser />} />
                    <Route path="/create-job" element={<JobForm />} />
                    <Route path="/create-skill" element={<SkillForm />} />
                    <Route path="/create-contact" element={<ContactForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
