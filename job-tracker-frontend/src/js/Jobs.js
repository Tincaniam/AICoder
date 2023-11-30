import React, { useState, useEffect } from 'react';
import '../css/Jobs.css';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        jobTitle: '',
        jobLocation: '',
        jobDescription: ''
    });

    // Fetch all jobs when the component mounts
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('/api/jobs');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setJobs(data); // Assuming the API returns an array of jobs
            } catch (error) {
                console.error('There was a problem retrieving jobs data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newJob = {
            title: formData.jobTitle,
            location: formData.jobLocation,
            description: formData.jobDescription
        };

        try {
            const response = await fetch('/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newJob)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setJobs([...jobs, result]);
            setFormData({ jobTitle: '', jobLocation: '', jobDescription: '' }); // Reset form
        } catch (error) {
            console.error('There was a problem posting the new job:', error);
            setError(error.message);
        }
    };

    return (
        <div className="form-container">
            <h2>Create Job/Internship</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="jobTitle"
                    placeholder="Job Title"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="jobLocation"
                    placeholder="Location"
                    value={formData.jobLocation}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="jobDescription"
                    placeholder="Job Description"
                    value={formData.jobDescription}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Create Job</button>
            </form>
            {error && <p className="error">Error: {error}</p>}
            {loading ? (
                <p>Loading jobs...</p>
            ) : (
                jobs.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Location</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job) => (
                                <tr key={job._id}>
                                    <td>{job.title}</td>
                                    <td>{job.location}</td>
                                    <td>{job.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No jobs found.</p>
                )
            )}
        </div>
    );
}

export default Jobs;
