// models/jobSkillModel.js

const mongoose = require('mongoose');

const jobSkillSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    skillId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill',
        required: true
    },
    importance: {
        type: String,
        enum: ['Essential', 'Nice-to-have'],
        required: true
    }
});

module.exports = mongoose.model('JobSkill', jobSkillSchema);
