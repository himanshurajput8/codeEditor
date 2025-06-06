import { record } from 'rrweb';
import { Replayer } from 'rrweb';

let recordedEvents = [];

export const startRecording = (stopFnRef) => {
  recordedEvents = [];
  const stopFn = record({
    emit(event) {
      recordedEvents.push(event);
    },
  });
  stopFnRef.current = stopFn;
};

export const stopRecording = (stopFnRef) => {
  if (stopFnRef.current) {
    stopFnRef.current(); // stops recording
  }
};

export const replayRecording = (container) => {
  if (recordedEvents.length && container.current) {
    const replayer = new Replayer(recordedEvents, {
      root: container.current,
    });
    replayer.play();
  }
};