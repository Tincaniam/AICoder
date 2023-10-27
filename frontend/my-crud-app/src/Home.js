import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Navbar = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="/register">Register</Link>
    <Link to="/login">Login</Link>
    <Link to="/dashboard">Dashboard</Link>
  </nav>
);

const MainSection = () => (
  <main>
    <h1>Welcome to Our Platform!</h1>
    <p>Explore jobs, skills, and expand your network.</p>
    <button>
      <Link to="/register">Get Started</Link>
    </button>
  </main>
);

const Footer = () => (
  <footer>
    <p>&copy; 2023 Company Name</p>
  </footer>
);

const Home = () => (
    <div>
        <h1>Home Page</h1>
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
            </ul>
        </nav>
    </div>
);

export default Home;
