# AI Coder Project: Job Tracker Web App

# Introduction
The aim of this project is to explore the efficiency and effectiveness of leveraging AI tools in developing a Job Tracker web application. The application intends to provide users with the ability to track job applications, required skills, and networking contacts. This document serves as a foundational roadmap, guiding our team through the initial planning and development phases.

# Background and Prior Approaches
Traditional development methodologies, whether Agile or Waterfall, typically involve a manual approach to coding, testing, and deployment. However, with the recent advancements in AI and machine learning, developers now have the opportunity to leverage these tools for enhanced productivity and potentially superior outcomes. There exists a potential for AI to scaffold project architectures, optimize database queries, or even offer frontend design suggestions. The extent of this potential is what our team seeks to uncover.

# Server Setup
To run the server, clone the repository, navigate to job-tracker-server, and run:

`npm start`

You can also run the automated test suite by running

`npm test`

# Server API Guide
The following serves as an example of the current functions the API supports and what kind of content it expects:

### Create a new user
POST http://localhost:3000/api/users HTTP/1.1
content-type: application/json

{
  "username": "testuser",
  "password": "testpassword",
  "email": "testuser@email.com"
}

### Login User Test
POST http://localhost:3000/api/users/login
Content-Type: application/json

{
  "email": "testuser@email.com",
  "password": "testpassword"
}

### Create Job Test
POST http://localhost:3000/api/jobs
Content-Type: application/json

{
    "title": "Software Developer",
    "location": "San Francisco, CA",
    "description": "Responsible for developing web applications."
}

### Get All Jobs Test
GET http://localhost:3000/api/jobs

### Creating a JavaScript Skill
POST http://localhost:3000/api/skills
Content-Type: application/json

{
    "name": "JavaScript"
}

### Creating a Docker Skill
POST http://localhost:3000/api/skills
Content-Type: application/json

{
    "name": "Docker"
}

### Get All Skills Test
GET http://localhost:3000/api/skills

### Create User Skill Test
POST http://localhost:3000/api/userSkills
Content-Type: application/json

{
    "userId": "6530c4edda98b7d842ff035a",
    "skillId": "6531b519f8fff23b4e5fcd11",
    "proficiency": 85,
    "notes": "Currently learning advanced topics."
}

### Get UserSkills by user ID
GET http://localhost:3000/api/userSkills/byUser/6530c4edda98b7d842ff035a
Content-Type: application/json

### Create JobSkill 1
POST http://localhost:3000/api/jobSkills
Content-Type: application/json

{
  "jobId": "6531af097c0df22514c4982d",
  "skillId": "6531b51df8fff23b4e5fcd13",
  "importance": "Beneficial"
}

### Create JobSkill 2
POST http://localhost:3000/api/jobSkills
Content-Type: application/json

{
  "jobId": "6531af097c0df22514c4982d",
  "skillId": "6531b519f8fff23b4e5fcd11",
  "importance": "Essential"
}

### Get JobSkills by job ID
GET http://localhost:3000/api/jobSkills/byJob/6531af097c0df22514c4982d
Content-Type: application/json

### Get JobSkills by skill ID
GET http://localhost:3000/api/jobSkills/bySkill/6531b519f8fff23b4e5fcd11
Content-Type: application/json

### Create Contact

POST http://localhost:3000/api/contacts
Content-Type: application/json

{   "userId": "6530c4edda98b7d842ff035a",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "123-456-7890",
    "company": "Tech Inc.",
    "jobTitle": "Software Engineer",
    "notes": "Met at Tech Conference 2023.",
    "relatedJobs": ["6531af097c0df22514c4982d"]
}



