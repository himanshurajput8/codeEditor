import React, { useEffect, useState, useContext } from 'react';
import { supabase } from '../../components/Supabase/SupabaseClient';
import { AuthContext } from '../../ContextAPI/AuthUser';
import './Sessions.css'; // import CSS file
import RrwebPlayerComponent from '../../components/Player/RrwebPlayer';

export default function Sessions() {
  const [recordingData, setRecordingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRecording, setShowRecording] = useState(false);
  const { AuthUserData } = useContext(AuthContext);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [] = useState();

  // You must pass userId from props, context, or get it from Supabase auth
  const userId = AuthUserData.id;
  console.log(userId);

  useEffect(() => {
    const fetchRecordings = async () => {
      const { data, error } = await supabase
        .from('recordings')
        .select('*')
        .eq('user_id', '56d013eb-f199-4580-9b84-f8a879aab2be');
      if (error) {
        console.error(error);
      } else {
        console.log(data);
      }
    };
    fetchRecordings();
  }, []);

  useEffect(() => {
    const fetchRecordings = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('recordings')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching recordings:', error.message);
      } else {
        console.log(data);
        setRecordingData(data);
      }
      setLoading(false);
    };

    if (userId) {
      fetchRecordings();
    }
  }, [userId]);

  const ShowSingleRecording = (recEvent) => {
    console.log(recEvent);
    setSelectedEvents(recEvent);
    setShowRecording(true);
  }

  return (showRecording ? (

    <RrwebPlayerComponent events={selectedEvents} />
  ) : (
    <div className="sessions-container">

      <h2 className="sessions-title">Sessions</h2>
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : recordingData.length === 0 ? (
        <p className="no-recordings-text">No recordings found.</p>
      ) : (
        <div className="recordings-list">
          {recordingData.map((rec) => (
            <div key={rec.recording_id} className="recording-card"
              onClick={() => ShowSingleRecording(rec.events)}
            >
              <img
                src={rec.screenshot}
                alt="Recording Screenshot"
                className="recording-screenshot"
              />
              <div className="recording-info">
                <p><strong>ID:</strong> {rec.recording_id}</p>
                <p><strong>Date:</strong> {new Date(rec.created_at).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
  );
}