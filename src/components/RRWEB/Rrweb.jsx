import React, { useContext, useEffect } from 'react';
import { RrwebContext } from '../../ContextAPI/RrwebContext';
import { replayRecording } from '../../components/RRWEB/rrwebFunctions';
import './ReplayModal.css'; 

export default function RrwebReplayModal({ onClose }) {
  const { replayerContainerRef } = useContext(RrwebContext);

  useEffect(() => {
    replayRecording(replayerContainerRef);
  }, []);

  return (
    <div className="replay-modal-overlay">
      <div className="replay-modal-content">
        <div
          ref={replayerContainerRef}
        />
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
}