import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import CreateUser from './CreateUser';
import Jobs from './Jobs';
import Skills from './Skills';
import Contacts from './Contacts';
import Login from './Login';
import Profile from './Profile';
import '../css/App.css';

function App() {
    return (
        <Router>
            <div className="app-container">

                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/create-user" element={<CreateUser />} />
                    {/* Redirecting /login to the home page */}
                    <Route path="/login" element={<Navigate replace to="/" />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/skills" element={<Skills />} />
                    <Route path="/contacts" element={<Contacts />} />
                    {/* Add more routes as needed */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
