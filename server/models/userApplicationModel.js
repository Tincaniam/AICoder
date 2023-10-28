// models/userApplicationModel.js

const mongoose = require('mongoose');

const userApplicationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    dateApplied: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pending', 'Interviewed', 'Rejected', 'Accepted', 'Withdrawn'],
        default: 'Pending'
    },
    notes: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('UserApplication', userApplicationSchema);
