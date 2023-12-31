# Server Setup
To run the server, clone the repository, navigate to job-tracker-server, and run:

`npm start`

You can also run the automated test suite by running

`npm test`

# Server API Guide
The following serves as an example of the current functions the API supports and what kind of content it expects:

### Create a new user
POST http://localhost:3000/api/users/register HTTP/1.1
content-type: application/json

{
  "username": "testuser",
  "password": "testpassword",
  "email": "testuser@email.com"
}

### Get User by ID
GET http://localhost:3000/api/users/6530c4edda98b7d842ff035a

### Login User Test
POST http://localhost:3000/api/users/login
Content-Type: application/json

{
  "email": "testuser@email.com",
  "password": "testpassword"
}

### Update User by ID
PUT http://localhost:3000/api/users/6530c4edda98b7d842ff035a
Content-Type: application/json

{
    "email": "jane.doe@example.com",
    "password": "newpassword",
    "savedJobs": ["6531af097c0df22514c4982d"]
}

### Create Another User
POST http://localhost:3000/api/users/register
Content-Type: application/json

{
    "username": "user2",
    "email": "user2@example.com",
    "password": "password",
    "savedJobs": []
}

### Get All Users
GET http://localhost:3000/api/users

### Delete User by ID
DELETE http://localhost:3000/api/users/653800b7e367865f76ab1078

### Create Job Test
POST http://localhost:3000/api/jobs
Content-Type: application/json

{
    "title": "Software Developer",
    "location": "San Francisco, CA",
    "description": "Responsible for developing web applications."
}

### Update Job by ID
PUT http://localhost:3000/api/jobs/6531af097c0df22514c4982d
Content-Type: application/json

{
    "title": "Software Engineer",
    "location": "San Francisco, CA",
    "description": "Responsible for developing web applications."
}

### Get Job by ID
GET http://localhost:3000/api/jobs/6531af097c0df22514c4982d

### Create Another Job Test
POST http://localhost:3000/api/jobs
Content-Type: application/json

{
    "title": "Backend Developer",
    "location": "New York, NY",
    "description": "Responsible for developing backends for web applications."
}

### Get All Jobs Test
GET http://localhost:3000/api/jobs

### Delete Job by ID
DELETE http://localhost:3000/api/jobs/653807167b517cff19e0ec1c 

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

### Update UserSkill by ID
PUT http://localhost:3000/api/userSkills/6531b7a6ba2b522738f7ac18
Content-Type: application/json

{
    "proficiency": 90,
    "notes": "Currently learning advanced topics."
}

### Delete UserSkill by ID
DELETE http://localhost:3000/api/userSkills/653d8b2ec8ba5fc892440983
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

### Update JobSkill by ID
PUT http://localhost:3000/api/jobSkills/6531bc6059ee545b6621507e
Content-Type: application/json

{
  "importance": "Essential"
}

### Delete JobSkill by ID
DELETE http://localhost:3000/api/jobSkills/653d8b38c8ba5fc892440989
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

### Create Contact 2

POST http://localhost:3000/api/contacts
Content-Type: application/json

{   "userId": "6530c4edda98b7d842ff035a",
    "name": "Harry Potter",
    "email": "hpotter@hogswarts.edu",
    "phoneNumber": "123-456-7890",
    "company": "Hogwarts",
    "jobTitle": "Wizard",
    "notes": "Met at Tech Conference 2023.",
    "relatedJobs": ["6531af097c0df22514c4982d"]
}

### Get Contact by ID
GET http://localhost:3000/api/contacts/65371683efb387035ebe3687
Content-Type: application/json

### Get All Contacts for User
GET http://localhost:3000/api/contacts/user/6530c4edda98b7d842ff035a
Content-Type: application/json

### Create Contact 3
POST http://localhost:3000/api/contacts
Content-Type: application/json

{   "userId": "6530c4edda98b7d842ff035a",
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "phoneNumber": "123-456-7890",
    "company": "Tech Inc.",
    "jobTitle": "Software Engineer",
    "notes": "Met at Tech Conference 2023.",
    "relatedJobs": ["6531af097c0df22514c4982d"]
}

### Update Contact by ID
PUT http://localhost:3000/api/contacts/653d8b4ec8ba5fc892440995
Content-Type: application/json

{  
    "name": "Jane Smith"
}

### Delete Contact by ID
DELETE http://localhost:3000/api/contacts/6537f8be63f29520b5a8a5e8
Content-Type: application/json