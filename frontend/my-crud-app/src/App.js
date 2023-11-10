import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Register from './Register';  // Importing Register component
import Login from './Login';        // Importing Login component
import Skills from './Skills';      // Importing Skills component
import Contacts from './Contacts';  // Importing Contacts component
import Jobs from './Jobs'; // Import the Jobs component

const Home = () => <h1>Home Page</h1>;


function App() {
    return (
        <Router>
            <div>
                {/* Routes content will render here */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/skills" element={<Skills />} />       {/* Added Skills route */}
                    <Route path="/contacts" element={<Contacts />} />   {/* Added Contacts route */}
                    <Route path="/jobs" element={<Jobs />} /> {/* Add this line for Jobs route */}
                </Routes>
            </div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/skills">Skills</Link></li>          {/* Added Skills link */}
                    <li><Link to="/contacts">Contacts</Link></li>      {/* Added Contacts link */}
                    <li><Link to="/jobs">Jobs</Link></li> {/* Add this line for Jobs link */}
                </ul>
            </nav>
        </Router>
    );
}

export default App;
