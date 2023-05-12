import React, { useState } from 'react';

function AudioPlayer() {


  const [audioSrc, setAudioSrc] = useState('');

  function handleFileSelect(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = handleFileLoad;
    reader.readAsDataURL(file);
    setVideoStatus(true);
  }

  function handleFileLoad(event) {
    setAudioSrc(event.target.result);
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
      <button>SEND FILE</button>:""}
    </div>
  );
}

export default AudioPlayer;