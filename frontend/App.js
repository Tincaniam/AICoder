import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [items, setItems] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        async function fetchItems() {
            const response = await axios.get('http://localhost:5000/items');
            setItems(response.data);
        }

        fetchItems();
    }, []);

    const handleAdd = async () => {
        const newItem = { name: input };
        const response = await axios.post('http://localhost:5000/items', newItem);
        setItems([...items, response.data]);
        setInput('');
    };

    return (
        <div className="App">
            <h1>CRUD App</h1>
            <input value={input} onChange={e => setInput(e.target.value)} />
            <button onClick={handleAdd}>Add</button>
            <ul>
                {items.map(item => (
                    <li key={item._id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
