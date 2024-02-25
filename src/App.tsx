import React, { useEffect, useState, useMemo } from 'react';
import './App.css';
import { useSocket } from './Hooks/useSocket';
import type { PlotState } from './Hooks/useSocket';
import Indicator from './Components/Indicator';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

function App() {
  const [plotData, setPlotData] = useState<PlotState[]>([]);

  const randomUser = useMemo(() => {
    const randomName = Math.random().toString(36).substring(7);
    return `User-${randomName}`;
  }, []);

  const { socket, isConnected } = useSocket({ endpoint: `localhost:8999`, token: randomUser });

  socket.onmessage = e => {
      if (!isConnected) return;
      const [ message1, message2 ] = JSON.parse(e.data);
      const message: PlotState[] = [];
      if(message1.data < 100) {
        message.push(message1);
      }
      if(message2.data < 100) {
        message.push(message2);
      }
      if(message.length > 1) {
        setPlotData(prev => [...message, ...prev]);
      }
  };

  useEffect(()=> {
    console.log("plotData", plotData)
  }, [plotData]);
  
  return (
    <div className="App">
      <header className="App-header">
        <Indicator isConnected={isConnected}/>
        <div>
          <h2>WILIOT</h2>
          <span>Test</span>
        </div>
      </header>
      <section>
      <LineChart
        width={500}
        height={300}
        data={plotData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="temperature"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="data" stroke="#82ca9d" />
      </LineChart>
      </section>
    </div>
  );
}

export default App;
