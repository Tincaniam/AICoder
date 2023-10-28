import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TestApi() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://localhost:3001/api/test");
                setMessage(response.data.message);
            } catch (error) {
                console.error("There was an error fetching data", error);
            }
        }
        fetchData();
    }, []);

    return <div>{message}</div>;
}

export default TestApi;
