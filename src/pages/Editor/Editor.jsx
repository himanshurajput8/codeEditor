import React, { useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Editor from '@monaco-editor/react';
import { useParams } from 'react-router-dom';
import AsideBar from '../../layouts/AsideBAr/AsideBar';
import { FullScreenContext } from '../../ContextAPI/ToggleFullScreenContext';
import { ThemeContext } from '../../ContextAPI/ThemeContext';
import { LanguageContext } from '../../ContextAPI/LanguageContext';

const generateColorForUser = (id) => {
    const colors = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff'];
    const hash = [...id].reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
};

export const EditorComp = () => {
    const { id: roomId } = useParams();
    const [code, setCode] = useState('');
    const [users, setUsers] = useState([]);
    const [userColors, setUserColors] = useState({});
    const [remoteCursors, setRemoteCursors] = useState({});
    const [remoteSelection, setRemoteSelection] = useState(null);

    const socketRef = useRef(null);
    const editorRef = useRef(null);
    const containerRef = useRef(null);
    const isRemoteUpdate = useRef(false);
    const remoteCursorDecorationIds = useRef([]);

    const { isFullScreen, fontSize, miniMap, isSettingOpen } = useContext(FullScreenContext);
    const { themeCoosed } = useContext(ThemeContext);
    const { languageChoosed } = useContext(LanguageContext);

    // Layout on fullscreen/setting change
    useEffect(() => {
        if (editorRef.current) editorRef.current.layout();
    }, [isFullScreen, isSettingOpen]);

    useEffect(() => {
        if (!containerRef.current || !editorRef.current) return;
        const observer = new ResizeObserver(() => {
            const { width, height } = containerRef.current.getBoundingClientRect();
            editorRef.current.layout({ width, height });
        });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!code) {
                setCode(languageChoosed?.defaultValue || "// Write or paste code here...");
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [languageChoosed, code]);


    useEffect(() => {
        socketRef.current = io('https://codeeditorbackend-pp93.onrender.com', {
            withCredentials: true,
            transports: ['websocket'],
        });

        socketRef.current.on('connect', () => {
            const username = sessionStorage.getItem('user_name') || 'Anonymous';
            console.log(username);
            socketRef.current.emit('join-room', { roomId, username });
        });

        socketRef.current.on('init-user-status', ({ isFirstUser, currentCode }) => {
            if (isFirstUser && currentCode) {
                setCode(currentCode);
            }
        });

        socketRef.current.on('initial-code', (initialCode) => {
            if (initialCode && initialCode !== code) {
                setCode(initialCode);
            }
        });

        socketRef.current.on('user-list', (userList) => {
            setUsers(userList);
            console.log('User List', userList);
            setUserColors(prev => {
                const updated = { ...prev };
                userList.forEach(user => {
                    if (!updated[user.id]) {
                        updated[user.id] = generateColorForUser(user.id);
                    }
                });
                return updated;
            });
        });

        socketRef.current.on('code-update', (newCode) => {
            if (!editorRef.current) return;
            const editor = editorRef.current;
            const currentCode = editor.getValue();
            if (newCode === currentCode) return;

            isRemoteUpdate.current = true;

            const position = editor.getPosition();
            const selection = editor.getSelection();

            editor.executeEdits('', [{
                range: editor.getModel().getFullModelRange(),
                text: newCode,
                forceMoveMarkers: true
            }]);

            setTimeout(() => {
                editor.setPosition(position);
                editor.setSelection(selection);
            }, 0);
        });

        socketRef.current.on('cursor-position-update', ({ lineNumber, column, senderId, username }) => {
            if (senderId === socketRef.current.id) return;
            setRemoteCursors(prev => ({
                ...prev,
                [senderId]: { lineNumber, column, username },
            }));
        });

        socketRef.current.on('selection-update', ({ senderId, selection }) => {
            if (senderId === socketRef.current.id) return;
            setRemoteSelection(selection);
        });

        return () => socketRef.current.disconnect();
    }, [roomId]);

    // Remote cursor render
    useEffect(() => {
        if (!editorRef.current) return;
        const editor = editorRef.current;
        const decorations = Object.entries(remoteCursors).map(([userId, cursor]) => ({
            range: new window.monaco.Range(cursor.lineNumber, cursor.column, cursor.lineNumber, cursor.column),
            options: {
                className: 'remote-cursor',
                hoverMessage: { value: `**${cursor.username}**` },
                after: {
                    content: '●',
                    inlineClassName: 'cursor-label',
                },
                stickiness: window.monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
            },
        }));
        remoteCursorDecorationIds.current = editor.deltaDecorations(remoteCursorDecorationIds.current, decorations);
    }, [remoteCursors]);

    // Remote selection render
    useEffect(() => {
        if (!editorRef.current || !remoteSelection) return;
        editorRef.current.deltaDecorations([], [
            {
                range: new window.monaco.Range(
                    remoteSelection.startLineNumber,
                    remoteSelection.startColumn,
                    remoteSelection.endLineNumber,
                    remoteSelection.endColumn
                ),
                options: {
                    inlineClassName: 'remote-selection-highlight',
                },
            },
        ]);
    }, [remoteSelection]);

    const handleEditorChange = (value) => {
        setCode(value);
        if (isRemoteUpdate.current) {
            isRemoteUpdate.current = false;
            return;
        }
        socketRef.current?.emit('code-change', { roomId, data: value });
    };

    const handleEditorMount = (editor) => {
        editorRef.current = editor;

        const cursorListener = editor.onDidChangeCursorPosition(({ position }) => {
            socketRef.current?.emit('cursor-position-change', {
                roomId,
                lineNumber: position.lineNumber,
                column: position.column,
            });
        });

        const selectionListener = editor.onDidChangeCursorSelection(({ selection }) => {
            socketRef.current?.emit('selection-change', {
                roomId,
                selection: {
                    startLineNumber: selection.startLineNumber,
                    startColumn: selection.startColumn,
                    endLineNumber: selection.endLineNumber,
                    endColumn: selection.endColumn,
                },
            });
        });

        return () => {
            cursorListener.dispose();
            selectionListener.dispose();
        };
    };

    return (
        <div className='editor-main-div' style={{ width: '100%', display: 'flex' }}>
            <div
                ref={containerRef}
                style={{
                    height: isFullScreen ? '100vh' : '92vh',
                    width: isSettingOpen ? '82vw' : '100%',
                    transition: 'width 0.5s ease',
                    border: '1px solid gray',
                    overflow: 'hidden',
                }}
            >
                <Editor
                    height={isFullScreen ? '100vh' : '92vh'}
                    width='100%'
                    language={languageChoosed.language}
                    value={code}
                    onChange={handleEditorChange}
                    onMount={handleEditorMount}
                    theme={themeCoosed}
                    options={{
                        fontSize: fontSize,
                        wordWrap: 'on',
                        minimap: { enabled: miniMap },
                        suggest: { enabled: true },
                        formatOnType: true,
                        scrollBeyondLastLine: false,
                        quickSuggestions: false,
                        suggestOnTriggerCharacters: true,
                    }}
                />
            </div>
            <AsideBar />
        </div>
    );
};