import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Editor from '@monaco-editor/react'
import { useParams } from 'react-router-dom';
import './Editor.css'
import AsideBar from '../layouts/AsideBar'

export const EditorComp = () => {

    const { id: roomId } = useParams();
    const [code, setCode] = useState("// Write or paste code here...");
    const [socketId, setSocketId] = useState(null);

    const [remoteCursorPos, setRemoteCursorPos] = useState(null);
    const [remoteSelection, setRemoteSelection] = useState(null);

    const socketRef = useRef(null);
    const editorRef = useRef(null);


    useEffect(() => {
        // Connect to backend
        socketRef.current = io('http://localhost:5001');
        // socketRef.current = io('https://codeeditorbackend-pp93.onrender.com', {
        //     withCredentials: true,
        //     transports: ['websocket'],
        // });

        socketRef.current.on('connect', () => {
            console.log('Connected to socket server');
            socketRef.current.emit('join-room', roomId)
            setSocketId(socketRef.current.id);
        });

        // Receive code updates
        socketRef.current.on('code-update', (newCode) => {
            setCode(newCode);
        });

        // Receive remote cursor position
        socketRef.current.on('cursor-position-update', ({ lineNumber, column, senderId }) => {
            if (senderId === socketRef.current.id) return; // Ignore self

            setRemoteCursorPos({ lineNumber, column });
            console.log('Remote cursor at line:', lineNumber, 'column:', column);
        });

        socketRef.current.on('selection-update', ({ senderId, selection }) => {
            if (senderId === socketRef.current.id) return;
            setRemoteSelection(selection);
        });

        // Optional: clean up on unmount
        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId]);

    useEffect(() => {
        if (!editorRef.current || !remoteCursorPos) return;

        const editor = editorRef.current;

        // Decoration for remote cursor
        const decoration = {
            range: new window.monaco.Range(
                remoteCursorPos.lineNumber,
                remoteCursorPos.column,
                remoteCursorPos.lineNumber,
                remoteCursorPos.column
            ),
            options: {
                className: 'remote-cursor',
                stickiness: window.monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
            },
        };

        // Apply the decoration
        const decorations = editor.deltaDecorations([], [decoration]);

        // Cleanup on position change
        return () => {
            editor.deltaDecorations(decorations, []);
        };
    }, [remoteCursorPos]);


    useEffect(() => {
        if (!editorRef.current || !remoteSelection) return;

        const editor = editorRef.current;

        const decoration = {
            range: new window.monaco.Range(
                remoteSelection.startLineNumber,
                remoteSelection.startColumn,
                remoteSelection.endLineNumber,
                remoteSelection.endColumn
            ),
            options: {
                className: 'remote-selection',
                isWholeLine: false,
            },
        };

        const decorations = editor.deltaDecorations([], [decoration]);

        return () => {
            editor.deltaDecorations(decorations, []);
        };
    }, [remoteSelection]);


    const handleEditorChange = (value) => {
        setCode(value);
        socketRef.current.emit('code-change', {
            roomId,
            data: value,
        });
    };

    const handleEditorMount = (editor) => {
        editorRef.current = editor;
        editor.onDidChangeCursorPosition((e) => {
            const position = e.position;
            socketRef.current.emit('cursor-position-change', {
                roomId,
                lineNumber: position.lineNumber,
                column: position.column,
            });
        });

        editor.onDidChangeCursorSelection((e) => {
            const selection = e.selection;
            socketRef.current.emit('selection-change', {
                roomId,
                selection: {
                    startLineNumber: selection.startLineNumber,
                    startColumn: selection.startColumn,
                    endLineNumber: selection.endLineNumber,
                    endColumn: selection.endColumn,
                },
            });
        });
    };

    return (
        <div className='editor-main-div'>
            <Editor className='editor'
                height="89vh" width="100vw" defaultLanguage="javascript" defaultValue="// Write or paste code here..." theme="vs-dark"
                value={code}
                onChange={handleEditorChange}
                onMount={handleEditorMount}
                options={{
                    fontSize: 16,
                    wordWrap: 'on',
                    minimap: { enabled: true },
                    suggest: { enabled: true }, // 👈 Disables IntelliSense
                    formatOnType: true,
                    scrollBeyondLastLine: false,
                    quickSuggestions: false, // 👈 Disables suggestions-as-you-type
                    suggestOnTriggerCharacters: true,
                }}
            />
            <AsideBar />
        </div>
    );
};  