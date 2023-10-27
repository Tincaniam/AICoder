// routes/jobs.js

const express = require('express');
const jobController = require('../controllers/jobController');

const router = express.Router();

router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJob, (req, res) => res.json(res.job));
router.post('/', jobController.createJob);

// Add routes for updating, deleting, etc., as needed

module.exports = router;
