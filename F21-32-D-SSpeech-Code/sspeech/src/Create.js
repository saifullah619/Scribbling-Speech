import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useHistory } from 'react-router-dom';

const Dictaphone = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
  
    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }
    
    const downloadTxtFile = (x) => {
        const element = document.createElement("a");
        const file = new Blob([x], {
          type: "text/plain"
        });
        element.href = URL.createObjectURL(file);
        element.download = "demo.txt";
        document.body.appendChild(element);
        element.click();
    };
    
    function handleClick(e) {
        e.preventDefault()
        downloadTxtFile(transcript);
    }
    
    return (
        <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button onClick={SpeechRecognition.startListening}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <button onClick={handleClick}>Send</button>
        </div>
    );
};
export default Dictaphone;