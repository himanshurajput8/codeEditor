import { useEffect, useState, useContext } from 'react';
import { RrwebContext } from '../../../ContextAPI/RrwebContext';
import { startRecording, stopRecording, clearRecording } from '../rrwebFunctions';

export default function RecordingNavIconsHeader() {
  const { recording, setRecording, stopFnRef} = useContext(RrwebContext);
  const { setShowReplayModal } = useContext(RrwebContext);
  const [hasRecording, setHasRecording] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('rrweb-recording');
    setHasRecording(!!stored);
  }, [recording]); // Re-check whenever recording state changes

  const handleRecord = () => {
    startRecording(stopFnRef);
    setRecording(true);
    setHasRecording(false); // clear replay state while recording new
  };

  const handleStop = () => {
    stopRecording(stopFnRef);
    setRecording(false);
    setHasRecording(true); // allow replay button after stop
  };

  const handleReplay = () => {
    setShowReplayModal(true);
  };


  return (
    <div>
      {!recording ? (
        <button onClick={handleRecord} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
          <img src="/rec.png" alt="Start Recording" style={{ height: '40px' }} />
        </button>
      ) : (
        <button onClick={handleStop} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
          <img src="/stop.png" alt="Stop Recording" style={{ height: '40px' }} />
        </button>
      )}

      {hasRecording && (
        <button onClick={handleReplay} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
          <img src="/play.png" alt="Replay Recording" style={{ height: '30px' }} />
        </button>
      )}
      <button onClick={clearRecording}>
        Clear Recording
      </button>
    </div>
  );
}
