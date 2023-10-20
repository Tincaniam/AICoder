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
        enum: ['Essential', 'Beneficial'],  // This is just an example; you can choose other terms or even use a number scale.
        required: true
    }
});

module.exports = mongoose.model('JobSkill', jobSkillSchema);
