import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Contacts = () => {
    const [contacts, setContacts] = useState([]);

    const [newContact, setNewContact] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        company: '',
        jobTitle: '',
        notes: '',
        user: '', // Assuming this should be a string representing the user ID
        relatedJobs: [] // Assuming this is an array of strings representing job IDs
    });

    useEffect(() => {
        // With Strict Mode, you may see this effect run twice in development mode
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await axios.get('/api/contacts');
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error.response || error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewContact((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const addContact = async () => {
        console.log("Trying to add a contact...");
        console.log(newContact); // Log the new contact data for debugging

        try {
            const response = await axios.post('/api/contacts', newContact);
            setContacts([...contacts, response.data]);
            // Reset newContact state after successful addition
            setNewContact({
                name: '',
                email: '',
                phoneNumber: '',
                company: '',
                jobTitle: '',
                notes: '',
                user: '',
                relatedJobs: []
            });
        } catch (error) {
            console.error('Error adding contact:', error.response || error);
        }
    };

    return (
        <div>
            <h1>Contacts</h1>
        <div>
            {/* Input fields for adding a new contact */}
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={newContact.name}
                onChange={handleInputChange}
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={newContact.email}
                onChange={handleInputChange}
            />
            <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={newContact.phoneNumber}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="company"
                placeholder="Company"
                value={newContact.company}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="jobTitle"
                placeholder="Job Title"
                value={newContact.jobTitle}
                onChange={handleInputChange}
            />
            <textarea
                name="notes"
                placeholder="Notes"
                value={newContact.notes}
                onChange={handleInputChange}
            />
            {/* Uncomment or modify these inputs based on how you want the user to input 'user' and 'relatedJobs'
            <input
                type="text"
                name="user"
                placeholder="User ID"
                value={newContact.user}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="relatedJobs"
                placeholder="Related Job IDs"
                value={newContact.relatedJobs}
                onChange={handleInputChange} // You will need a custom handler for relatedJobs if it's an array
            />
            */}
                <button type="button" onClick={addContact}>Add Contact</button>
            </div>
            <ul>
                {contacts.map(contact => (
                    <li key={contact._id}>
                        <div><strong>Name:</strong> {contact.name}</div>
                        <div><strong>Email:</strong> {contact.email}</div>
                        <div><strong>Phone Number:</strong> {contact.phoneNumber}</div>
                        <div><strong>Company:</strong> {contact.company}</div>
                        <div><strong>Job Title:</strong> {contact.jobTitle}</div>
                        <div><strong>Notes:</strong> {contact.notes}</div>
                        <div>
                            <strong>Related Jobs:</strong> 
                            {contact.relatedJobs.join(', ')}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Contacts;
