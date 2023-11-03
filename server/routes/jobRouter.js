// routes/jobs.js

const express = require('express');
const jobController = require('../controllers/jobController');

const router = express.Router();

router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJob, (req, res) => res.json(res.job));
router.post('/', jobController.createJob);
router.put('/:id', jobController.updateJob);
router.delete('/:id', jobController.deleteJob);

module.exports = router;
