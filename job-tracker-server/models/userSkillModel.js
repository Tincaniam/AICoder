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
        type: Number,   // A number between 0 to 100 indicating proficiency.
        required: true
    },
    notes: String    // Optional notes about this particular skill for the user.
});

module.exports = mongoose.model('UserSkill', userSkillSchema);
