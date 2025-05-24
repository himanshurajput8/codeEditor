import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Editor from '@monaco-editor/react';
import { useParams } from 'react-router-dom';
import './Editor.css';

export const EditorComp = () => {
    const { id: roomId } = useParams();
    const [code, setCode] = useState("// Write or paste code here...");
    const [remoteCursors, setRemoteCursors] = useState({});

    const socketRef = useRef(null);
    const editorRef = useRef(null);

    useEffect(() => {
        // Connect to backend
        socketRef.current = io('https://codeeditorbackend-pp93.onrender.com', {
            withCredentials: true,
            transports: ['websocket'],
        });

        socketRef.current.on('connect', () => {
            console.log('Connected to socket server');
            socketRef.current.emit('join-room', roomId);
        });

        // Receive code updates
        socketRef.current.on('code-update', (newCode) => {
            setCode(newCode);
        });

        // Receive remote cursor positions
        socketRef.current.on('cursor-update', ({ socketId, cursorData }) => {
            setRemoteCursors(prev => ({
                ...prev,
                [socketId]: cursorData
            }));
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId]);

    const handleEditorChange = (value) => {
        setCode(value);
        socketRef.current.emit('code-change', {
            roomId,
            data: value,
        });
    };

    useEffect(() => {
        if (!editorRef.current) return;

        const decorations = Object.entries(remoteCursors).map(([id, pos]) => ({
            range: new window.monaco.Range(pos.lineNumber, pos.column, pos.lineNumber, pos.column),
            options: {
                className: 'remote-cursor',
                hoverMessage: { value: `User ${id.slice(0, 4)}` },
            }
        }));

        editorRef.current.deltaDecorations([], decorations);
    }, [remoteCursors]);

    return (
        <div className='editor-main-div'>
            <Editor
                className='editor'
                height="90vh"
                width="95vw"
                defaultLanguage="javascript"
                defaultValue="// Write or paste code here..."
                theme="vs-dark"
                value={code}
                onChange={handleEditorChange}
                onMount={(editor) => {
                    editorRef.current = editor;

                    editor.onDidChangeCursorPosition((e) => {
                        const position = e.position;
                        socketRef.current.emit('cursor-move', {
                            roomId,
                            cursorData: position,
                        });
                    });
                }}
                options={{
                    fontSize: 16,
                    wordWrap: 'on',
                    minimap: { enabled: true },
                    suggest: { enabled: true },
                    formatOnType: true,
                    scrollBeyondLastLine: false,
                    quickSuggestions: false,
                    suggestOnTriggerCharacters: true,
                }}
            />
            <aside className='aside-bar'>
                <button><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="..." /></svg></button>
                <button><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="..." /></svg></button>
                <button><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="..." /></svg></button>
            </aside>
        </div>
    );
};
