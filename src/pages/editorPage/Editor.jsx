import React, { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export const EditorComp = () => {
     const socketRef = useRef();

       useEffect(() => {
        // Connect to backend
        socketRef.current = io('http://localhost:5001'); // 

        socketRef.current.on('connect', () => {
            console.log('Connected to socket server');
        });

        // Optional: clean up on unmount
        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Editor</h2>
            <textarea rows="30" cols="180" placeholder="Start typing your code here..."
            ></textarea>
        </div>
    );
};
