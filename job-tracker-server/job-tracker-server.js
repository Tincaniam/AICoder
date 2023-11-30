require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Import the CORS library
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const skillRoutes = require('./routes/skillRoutes');
const userSkillRoutes = require('./routes/userSkillRoutes');
const jobSkillRoutes = require('./routes/jobSkillRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up CORS before other middlewares and routes            
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/userSkills', userSkillRoutes);
app.use('/api/jobSkills', jobSkillRoutes);

// The user creation route 
app.post('/api/users', async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const newUser = new User({
            username,
            password,  // This password will be hashed by the pre-save hook before saving
            email
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch(err => {
    console.error("Error connecting to MongoDB", err);
});

app.get('/', (req, res) => {
    res.send('Job Tracker Server API');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on port ${PORT}`);
});

module.exports = app; // Export the app for testing
