// models/skillModel.js

const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Skill', skillSchema);
