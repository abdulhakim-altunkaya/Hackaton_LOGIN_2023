import React, { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';

function AudioTranscription() {
  const [audioFile, setAudioFile] = useState(null);
  const [transcription, setTranscription] = useState('');

  const apiKey = process.env.REACT_APP_CHATGPT_API; // Replace with your OpenAI API key
  const configuration = new Configuration({ apiKey });
  const openai = new OpenAIApi(configuration);

  const handleFileSelect = (event) => {
    setAudioFile(event.target.files[0]);
  };

  const handleTranscribe = async () => {
    const formData = new FormData();
    formData.append('audio', audioFile);

    try {
      const response = await openai.createTranscription(formData, {
        model: 'whisper-1',
      });

      const transcript = response.data.transcription;
      setTranscription(transcript);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Audio Transcription</h2>
      <input type="file" accept="audio/*" onChange={handleFileSelect} />
      <br />
      <button onClick={handleTranscribe} disabled={!audioFile}>
        Transcribe
      </button>
      <br />
      {transcription && <p>Transcription: {transcription}</p>}
    </div>
  );
}

export default AudioTranscription;
