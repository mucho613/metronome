import React, { useEffect, useRef, useState } from 'react';
import './App.css';

import { beep } from './metronome';

function App() {
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [bpm, setBpm] = useState(120);
  const [isActive, setBeat] = useState(false);
  const [barLength, setBarLength] = useState(4);
  const [count, setCount] = useState(0);
  const [startTime, setStartTime] = useState(new Date());

  const beat = () => {
    beep();
  }

  const start = (bpm: number) => {
    setBeat(true);

    beep();
    const intervalId = setInterval(() => beat(), 1000 / (bpm / 60));

    return intervalId;
  }

  const stop = (intervalId: NodeJS.Timeout) => {
    setBeat(false);
    clearInterval(intervalId);
  }

  return (
    <div className="App">
      <header>
        <h1>Metronone</h1>
      </header>
      <dl>
        <dt>Bar</dt>
        <dd>{ (Math.floor(count / barLength)) + 1}</dd>
        <dt>Beat</dt>
        <dd>{ count % barLength + 1 }</dd>
      </dl>
      <button onClick={() => {
        const intervalId = start(bpm)
        setIntervalId(intervalId);
      }}>
        Start
      </button>
      <button
        disabled={!intervalId}
        onClick={() => {
          if(intervalId) stop(intervalId);
        }}>
        Stop
      </button>
      <br></br>
      <label>
        Tempo: {bpm}
        <input type="range" name="tempo" value={bpm} min="1" max="500"
          onChange={(e) => setBpm(parseInt(e.target.value))}>
        </input>
      </label>
      <br></br>
      <label>
        BarLength
        <input type="number" name="barLength" value={barLength} min="1" max="16"
          onChange={(e) => setBarLength(parseInt(e.target.value))}>
        </input>
      </label>

      <div
        className={`indicator ${isActive ? 'active' : ''}`}
      ></div>
    </div>
  );
}

export default App;
