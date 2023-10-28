const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/usersRouter');
const jobRoutes = require('./routes/jobRouter');
const contactRoutes = require('./routes/contactRouter');
const skillRoutes = require('./routes/skillRouter');
const userSkillRoutes = require('./routes/userSkillRouter');
const jobSkillRoutes = require('./routes/jobSkillRouter');
const userApplicationRoutes = require('./routes/userApplicationRouter');



dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Basic Route
app.get('/', (req, res) => {
    res.send('Job Tracking API');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/user-skills', userSkillRoutes);
app.use('/api/job-skills', jobSkillRoutes);
app.use('/api/user-applications', userApplicationRoutes);