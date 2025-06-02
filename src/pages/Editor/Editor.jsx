import React, { useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Editor from '@monaco-editor/react'
import { useParams } from 'react-router-dom';
import AsideBar from '../../layouts/AsideBAr/AsideBar'
import { FullScreenContext } from '../../ContextAPI/ToggleFullScreenContext';
import { ThemeContext } from '../../ContextAPI/ThemeContext';
import { LanguageContext } from '../../ContextAPI/LanguageContext';

export const EditorComp = () => {

    const { id: roomId } = useParams();
    const [code, setCode] = useState("// Write or paste code here...");
    const [socketId, setSocketId] = useState(null);
    
    const [remoteCursors, setRemoteCursors] = useState({});
    const [remoteSelection, setRemoteSelection] = useState(null);

    const socketRef = useRef(null);
    const editorRef = useRef(null);

    const [users, setUsers] = useState([]);

    const containerRef = useRef(null);   // Wrap editor in this container for fullscreen
    
    const {isFullScreen, fontSize, setFontSize, miniMap, toggleMiniMap, isSettingOpen, setSettingToOpen} = useContext(FullScreenContext);

    const {theme, setTheme, themeCoosed, setThemeCossed} = useContext(ThemeContext);

    const {totalLanguage, languageChoosed , setLanguageChoosed} = useContext(LanguageContext);

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.layout();
        }
    }, [isFullScreen]);

    useEffect(() => {
        if (editorRef.current && containerRef.current) {
            const { width, height } = containerRef.current.getBoundingClientRect();
            editorRef.current.layout({ width, height });
        }
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
        setCode(languageChoosed.defaultValue);
    }, [languageChoosed]);

    useEffect(() => {
        // Connect to backend
        // socketRef.current = io('http://localhost:5001');
        socketRef.current = io('https://codeeditorbackend-pp93.onrender.com', {
            withCredentials: true,
            transports: ['websocket'],
        });

        socketRef.current.on('connect', () => {
            console.log('Connected to socket server');
            const username = localStorage.getItem('user_name') || 'Anonymous';
            socketRef.current.emit('join-room', { roomId, username });
            setSocketId(socketRef.current.id);
        });

          socketRef.current.on('user-list', (userList) => {
              console.log('Updated user list:', userList);
            setUsers(userList);
        });

        // Receive code updates
        socketRef.current.on('code-update', (newCode) => {
            setCode(newCode);
        });

        // Receive remote cursor position
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

        // Optional: clean up on unmount
        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId]);


   useEffect(() => {
  if (!editorRef.current) return;

  const editor = editorRef.current;

  const decorations = Object.entries(remoteCursors).map(([userId, cursor]) => ({
    range: new window.monaco.Range(
      cursor.lineNumber,
      cursor.column,
      cursor.lineNumber,
      cursor.column
    ),
    options: {
      className: 'remote-cursor',
      hoverMessage: { value: `**${cursor.username}**` }, // 👈 Show username on hover
      after: {
        content: `Test`,
        inlineClassName: 'cursor-label',
    },
      stickiness: window.monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
    }
  }));

  const applied = editor.deltaDecorations([], decorations);

  return () => {
    editor.deltaDecorations(applied, []);
  };
}, [remoteCursors]);


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
        <div className='editor-main-div'
            style={{ width: '100%', display: 'flex' }}
        >
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

                <Editor className='editor'
                height={isFullScreen ? '100vh' : '92vh'} 
                width='100%'
                line={30} 
                language={languageChoosed.language} 
                defaultValue={languageChoosed.defaultValue}
                theme={themeCoosed}
                value={code} 
                onChange={handleEditorChange}
                onMount={handleEditorMount}
                options={{
                    fontSize: fontSize,
                    wordWrap: 'on',
                    minimap: { enabled: miniMap },
                    suggest: { enabled: true }, // 👈 Disables IntelliSense
                    formatOnType: true,
                    scrollBeyondLastLine: false,
                    quickSuggestions: false, // 👈 Disables suggestions-as-you-type
                    suggestOnTriggerCharacters: true,
                    }}
                />
            </div>
            <AsideBar />
        </div>
    );
};  