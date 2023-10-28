// models/userSkillModel.js

const mongoose = require('mongoose');

const userSkillSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    skillId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill',
        required: true
    },
    proficiency: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true
    },
    dateLearned: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('UserSkill', userSkillSchema);
