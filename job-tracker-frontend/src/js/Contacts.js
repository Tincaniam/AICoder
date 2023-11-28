import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/Contacts.css';

const Contacts = () => {
    const location = useLocation();
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(null); // Track the ID of the contact being edited
    const [formData, setFormData] = useState({}); // Form data for updates

    const userId = location.state?.userId;

    useEffect(() => {
        const fetchContacts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/contacts/user/${userId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setContacts(data.contacts);
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newContact = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('http://localhost:3000/api/contacts', {
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

    const handleEdit = (contact) => {
        setEditingId(contact._id);
        setFormData(contact); // Initialize form data with contact's current data
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdateSubmit = async (event, id) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/api/contacts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedContact = await response.json();
            setContacts(contacts.map(contact => contact._id === id ? updatedContact : contact));
            setEditingId(null); // Reset editing ID to null after update
        } catch (error) {
            console.error('There was a problem updating the contact:', error);
            setError(error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/contacts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setContacts(contacts.filter(contact => contact._id !== id));
        } catch (error) {
            console.error('There was a problem deleting the contact:', error);
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
                        {/* Form fields for adding a new contact */}
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
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map((contact) => (
                                    <tr key={contact._id}>
                                        {editingId === contact._id ? (
                                            // Editable row
                                            <>
                                                <td><input type="text" name="name" value={formData.name} onChange={handleChange} /></td>
                                                <td><input type="email" name="email" value={formData.email} onChange={handleChange} /></td>
                                                <td><input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} /></td>
                                                <td><input type="text" name="company" value={formData.company} onChange={handleChange} /></td>
                                                <td><input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} /></td>
                                                <td><textarea name="notes" value={formData.notes} onChange={handleChange}></textarea></td>
                                                <td>
                                                    <button onClick={(e) => handleUpdateSubmit(e, contact._id)}>Save</button>
                                                    <button onClick={() => setEditingId(null)}>Cancel</button>
                                                </td>
                                            </>
                                        ) : (
                                            // Display row
                                            <>
                                                <td>{contact.name}</td>
                                                <td>{contact.email}</td>
                                                <td>{contact.phoneNumber}</td>
                                                <td>{contact.company}</td>
                                                <td>{contact.jobTitle}</td>
                                                <td>{contact.notes}</td>
                                                <td>
                                                    <button onClick={() => handleEdit(contact)}>Edit</button>
                                                    <button onClick={() => handleDelete(contact._id)}>Delete</button>
                                                </td>
                                            </>
                                        )}
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
