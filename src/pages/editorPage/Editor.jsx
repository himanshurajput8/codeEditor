import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

export const EditorComp = () => {
    const [code, setCode] = useState('');
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io('http://localhost:5001');

        socketRef.current.on('connect', () => {
            console.log('Connected to socket server');
        });

        // Listen for code updates from other users
        socketRef.current.on('code-change', (newCode) => {
            setCode(newCode); // Update local state
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    // When user types, emit new code to the server
    const handleChange = (e) => {
        const newCode = e.target.value;
        setCode(newCode);
        socketRef.current.emit('code-change', newCode);
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Live Code Editor</h2>
            <textarea
                rows="30"
                cols="180"
                placeholder="Start typing your code here..."
                value={code}
                onChange={handleChange}
            ></textarea>
        </div>
    );
};
