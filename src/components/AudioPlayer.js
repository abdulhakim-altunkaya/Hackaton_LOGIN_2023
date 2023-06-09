import React, { useState } from 'react';

function AudioPlayer() {

  let[transcribe, setTranscribe] = useState(false);
  const [audioSrc, setAudioSrc] = useState('');

  function handleFileSelect(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = handleFileLoad;
    reader.readAsDataURL(file);
    setTranscribe(true);
  }

  function handleFileLoad(event) {
    setAudioSrc(event.target.result);
  }

  let[infoBox, setInfoBox] = useState("");
  const handleSubmit = () => {
    setInfoBox("With the upcoming Version 2 of the webpage, this audio will be analyzed for scam detection");
  }

  return (
    <div>
      <h2>Audio File Upload</h2>
      <label htmlFor="audioFile" className="custom-file-upload">
        <input
          type="file"
          id="audioFile"
          accept="audio/*"
          onChange={handleFileSelect}
        />
        Choose a file
      </label>
      <br />
      <br />
      {audioSrc && <audio src={audioSrc} controls />}
      {transcribe === true ? 
      <button className='button-85' onClick={handleSubmit}>ANALYZE AUDIO</button>:""}
      <p>{infoBox}</p>
    </div>
  );
}

export default AudioPlayer;