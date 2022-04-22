import React from 'react';
import './App.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = () => {
    const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();
  
    const saveFile = async (blob) => {
      try {
        const handle = await window.showSaveFilePicker({
          types: [{
            accept: {
              // Omitted
            },
          }],
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        return handle;
      } catch (err) {
        console.error(err.name, err.message);
      }
    };
    
    SpeechRecognition.stopListening = () => {
      if (browserSupportsSpeechRecognition) {
        const file = new Blob([transcript.toLowerCase()], {
          type: "text/plain"
        });        
        saveFile(file);
      }
    };
    
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }
    return (
        <div>
          <p>Microphone: {listening ? 'on' : 'off'}</p>
          <button onClick={SpeechRecognition.startListening}>Start</button>
          <button onClick={SpeechRecognition.stopListening}>Stop</button>
          <button onClick={resetTranscript}>Reset</button>
          <p>{transcript}</p>
        </div>
    );
};
export default Dictaphone;