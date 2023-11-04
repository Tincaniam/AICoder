import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/Contacts.css';

const Contacts = () => {
    const location = useLocation();
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Extract userId from the location state
    const userId = location.state?.userId;

    // Fetch contacts when component mounts or userId changes
    useEffect(() => {
        const fetchContacts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:8001/api/contacts/user/${userId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setContacts(data.contacts); // <-- Update this line
            } catch (error) {
                console.error('There was a problem retrieving contacts data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchContacts();
        }
    }, [userId]);

    // Handle form submissions for new contacts
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newContact = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('http://localhost:8001/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...newContact, userId }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setContacts([...contacts, result]);
        } catch (error) {
            console.error('There was a problem posting contact data:', error);
            setError(error.message);
        }
    };

    return (
        <div className="form-container">
            {userId ? <h2>User ID: {userId}</h2> : <h2>Loading user...</h2>}
            {error && <p>Error: {error}</p>}
            {loading ? (
                <p>Loading contacts...</p>
            ) : (
                <>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="name" placeholder="Name" required />
                        <input type="email" name="email" placeholder="Email" required />
                        <input type="text" name="phoneNumber" placeholder="Phone Number" />
                        <input type="text" name="company" placeholder="Company" />
                        <input type="text" name="jobTitle" placeholder="Job Title" />
                        <textarea name="notes" placeholder="Notes"></textarea>
                        <button type="submit">Add Contact</button>
                    </form>

                    {contacts.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Company</th>
                                    <th>Job Title</th>
                                    <th>Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map((contact) => (
                                    <tr key={contact._id}>
                                        <td>{contact.name}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.phoneNumber}</td>
                                        <td>{contact.company}</td>
                                        <td>{contact.jobTitle}</td>
                                        <td>{contact.notes}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No contacts found.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default Contacts;
