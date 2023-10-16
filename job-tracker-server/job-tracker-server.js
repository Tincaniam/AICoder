const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
