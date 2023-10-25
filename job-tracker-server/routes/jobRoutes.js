const express = require('express');
const jobController = require('../controllers/jobController');

const router = express.Router();

router.post('/', jobController.createJob);
router.get('/', jobController.getAllJobs);

// Map the GET endpoint to the /api/jobs/:id URL
router.get('/:id', jobController.getJobById);

// Map the PUT endpoint to the /api/jobs/:id URL
router.put('/:id', jobController.updateJobById);

// Map the DELETE endpoint to the /api/jobs/:id URL
router.delete('/:id', jobController.deleteJobById);

module.exports = router;
