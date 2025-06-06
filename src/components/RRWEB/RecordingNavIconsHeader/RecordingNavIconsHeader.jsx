import React, { useContext, useState } from 'react'
import { NavContext } from '../../../ContextAPI/NavBarContext';
import { RrwebContext } from '../../../ContextAPI/RrwebContext';
import { startRecording, stopRecording } from '../rrwebFunctions';
import { useLocation } from 'react-router-dom';

export default function RecordingNavIconsHeader() {
    
    const { isnav, setNav } = useContext(NavContext);
    const { recording, setRecording, stopFnRef, replayerContainerRef } = useContext(RrwebContext);
    const {setShowReplayModal} = useContext(RrwebContext);
    const location = useLocation();

    console.log(location);
    
    const handleRecord = () => {
      startRecording(stopFnRef);
      setRecording(true);
    };
    
    const handleStop = () => {
      stopRecording(stopFnRef);
      setRecording(false);
    };
    
    const handleReplay = () => {
      setShowReplayModal(true);
    };
    
  return (
    <div>
        {!recording ? (
              <button onClick={handleRecord}
                style={{
                    backgroundColor:'transparent',
                    border:'none'
                }}
             >
                <img src="/rec.png" alt="" 
                    style={{
                        height:'40px'
                    }}
                />
              </button>
            ) : (
              <button onClick={handleStop}
                style={{
                    backgroundColor:'transparent',
                    border:'none'
                }}
              >
                <img src="/stop.png" alt="" 
                    style={{
                        height:'40px'
                    }}
                />
              </button>
            )}
            {
                recording &&
                <button onClick={handleReplay}
                    style={{
                    backgroundColor:'transparent',
                    border:'none'
                }}
                >
                    <img src="/play.png" alt="" 
                        style={{
                        height:'30px'
                    }}
                    />
                </button>
            }
    </div>
  )
}
