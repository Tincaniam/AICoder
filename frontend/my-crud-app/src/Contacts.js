import React, { useState } from 'react';

const Contacts = () => {
    const [contacts, setContacts] = useState([]);  // list of contacts
    const [newContact, setNewContact] = useState({name: '', info: ''});  // new contact input fields

    const addContact = () => {
        if (newContact.name && newContact.info) {
            setContacts([...contacts, newContact]);
            setNewContact({name: '', info: ''});
        }
    };

    return (
        <div>
            <h1>Contacts</h1>
            <input
                value={newContact.name}
                onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                placeholder="Contact Name"
            />
            <input
                value={newContact.info}
                onChange={(e) => setNewContact({...newContact, info: e.target.value})}
                placeholder="Contact Info"
            />
            <button onClick={addContact}>Add Contact</button>

            <ul>
                {contacts.map(contact => (
                    <li key={contact.name}>
                        {contact.name} - {contact.info}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Contacts;
