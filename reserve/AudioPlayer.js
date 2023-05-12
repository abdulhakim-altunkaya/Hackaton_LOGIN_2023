import React, { useState } from 'react';
import { Configuration, OpenAIApi } from "openai";
import x from './x.mp3';


function AudioPlayer() {

  let[videoStatus, setVideoStatus] = useState(false);
  let[responseChatgpt, setResponseChatgpt] = useState("");

  const api = process.env.REACT_APP_CHATGPT_API;
  const configuration = new Configuration({apiKey: api});
  const openai = new OpenAIApi(configuration);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await openai.createCompletion({
        prompt:"Say this is a test",
        model: "text-davinci-003",
        temperature: 0,
        max_tokens: 1000
    });
    const message = response.data.choices[0].text;
    setResponseChatgpt(message);
  }


  const [audioSrc, setAudioSrc] = useState('');

  function handleFileSelect(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = handleFileLoad;
    reader.readAsDataURL(file);
    setVideoStatus(true);
    const resp = openai.createTranscription(
      file,
      "whisper-1"
    );
    console.log(resp);
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
      {videoStatus === true ? 
      <button className='button-87' onClick={handleSubmit}>SEND FILE</button>:""}
      <p>{responseChatgpt}</p>
    </div>
  );
}

export default AudioPlayer;