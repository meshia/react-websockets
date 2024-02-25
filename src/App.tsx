import React, { useEffect, useState, useMemo } from 'react';
import { useSocket } from './Hooks/useSocket';
import type { PlotState } from './Hooks/useSocket';
import Indicator from './Components/Indicator';
// import { LineChart, XAxis, YAxis, CartesianGrid, Line } from 'recharts';
import './App.css';

function App() {
  const [plotData, setPlotData] = useState<PlotState | null>(null);

  const randomUser = useMemo(() => {
    const randomName = Math.random().toString(36).substring(7);
    return `User-${randomName}`;
  }, []);

  const { socket, isConnected } = useSocket({ endpoint: `localhost:8999`, token: randomUser });

  socket.onmessage = e => {
      if (!isConnected) return;
      const message = JSON.parse(e.data);
      console.log('e from outside', message);
      setPlotData(message);
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
        <Indicator isConnected={isConnected}/>
        <div>
          <h2>WILIOT</h2>
          <span>Test</span>
        </div>
      </header>
      <section>

      </section>
    </div>
  );
}

export default App;
