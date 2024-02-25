import React, { useEffect, useState, useMemo } from 'react';
import { useSocket } from './Hooks/useSocket';
import type { PlotState } from './Hooks/useSocket';
// import { LineChart, XAxis, YAxis, CartesianGrid, Line } from 'recharts';
import './App.css';

function App() {
  const [plotData, setPlotData] = useState<PlotState | null>(null);

  const randomUser = useMemo(() => {
    const randomName = Math.random().toString(36).substring(7);
    return `User-${randomName}`;
  }, []);

  const { socket, isConnected } = useSocket({ endpoint: `localhost:8999`, token: randomUser });

  // socket.on('open', (newState: PlotState) => {
  //   console.log('open', newState);
  //   setPlotData(newState);
  // });

  
  socket.onopen = () => {
    console.log('ws opened from outside')
  };

  socket.onclose = () => {
      console.log('ws closed from outside');
  };

  socket.onmessage = e => {
      if (!isConnected) return;
      const message = JSON.parse(e.data);
      console.log('e from outside', message);
  };

  return (
    <div className="App">
      {/* <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="name"/>
        <YAxis/>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
      </LineChart> */}
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
