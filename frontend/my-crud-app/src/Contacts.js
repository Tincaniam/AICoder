import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Import your actual AuthContext
import { AuthContext } from './AuthContext';

const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const { userId } = useContext(AuthContext); // Get the userId from the AuthContext
    const [newContact, setNewContact] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        company: '',
        jobTitle: '',
        notes: '',
        user: userId, // This will be set after the component mounts and the context is loaded
        relatedJobs: []
    });

    useEffect(() => {
        // With Strict Mode, you may see this effect run twice in development mode
        fetchContacts();
    }, []);

    useEffect(() => {
        // Update the user field in newContact when the userId is available or changes
        setNewContact(prev => ({ ...prev, user: userId }));
    }, [userId]);

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
        setNewContact(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const addContact = async () => {
        if (!userId) {
            console.error('User ID is required to add a contact.');
            return;
        }

        try {
            const response = await axios.post('/api/contacts', {
                ...newContact,
                user: userId // Make sure to include the userId in the request
            });
            setContacts([...contacts, response.data]);
            // Reset newContact state after successful addition
            setNewContact({
                name: '',
                email: '',
                phoneNumber: '',
                company: '',
                jobTitle: '',
                notes: '',
                user: userId, // Reset with userId still in place
                relatedJobs: []
            });
        } catch (error) {
            console.error('Error adding contact:', error.response ? error.response.data : error.message);
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
                <button type="button" onClick={addContact} disabled={!userId}>Add Contact</button>
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
