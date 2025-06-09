  import { record } from 'rrweb';
  import { Replayer } from 'rrweb';
  import 'rrweb-player/dist/style.css';
  let recordedEvents = [];
  let currentReplayer = null; // Track global replayer instance

  // Start recording and store events
  export const startRecording = (stopFnRef) => {
    recordedEvents = [];

    const stopFn = record({
      emit(event) {
        recordedEvents.push(event);
      },
    });

    stopFnRef.current = stopFn;
  };

  // Stop and save events to localStorage
  export const stopRecording = (stopFnRef) => {
    if (stopFnRef.current) {
      stopFnRef.current(); // Stop recording
      stopFnRef.current = null;

      if (recordedEvents.length > 0) {
        localStorage.setItem('rrweb-recording', JSON.stringify(recordedEvents));
      }
    }
  };

  // Safely replay the recording
  export const replayRecording = (container) => {
    const storedEvents = localStorage.getItem('rrweb-recording');
    
    if (!storedEvents || !container.current) {
      console.warn('No recording found or invalid container');
      return;
    }

    const events = JSON.parse(storedEvents);

    if (!events.length) {
      console.warn('No events to replay');
      return;
    }

    // Clear old content and destroy any existing replayer
    container.current.innerHTML = '';

    if (currentReplayer && typeof currentReplayer.pause === 'function') {
      try {
        currentReplayer.pause(); // Stop if playing
        currentReplayer = null;
      } catch (e) {
        console.warn('Error destroying old replayer:', e);
      }
    }

    try {
      currentReplayer = new Replayer(events, {
        root: container.current,
        frameSandbox: 'allow-same-origin allow-scripts',
      });

      currentReplayer.play();
    } catch (error) {
      console.error('Failed to create replayer:', error);
    }
  };

  // Clear recording from localStorage
  export const clearRecording = () => {
    localStorage.removeItem('rrweb-recording');
  };
