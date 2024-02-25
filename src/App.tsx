import React, { useEffect, useState, useMemo } from 'react';
import './App.css';
import { useSocket } from './Hooks/useSocket';
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

export type DataType = {
  id1_id: number,
  temperature1: number,
  id1: number | null,
  id2_id: number,
  temperature2: number,
  id2: number | null
  timestamp: string,
};

function App() {
  const [graphData, setGraphData] = useState<DataType[]>([]);
  const [temp1, setTemp1] = useState(0);
  const [temp2, setTemp2] = useState(0);

  const randomUser = useMemo(() => {
    const randomName = Math.random().toString(36).substring(7);
    return `User-${randomName}`;
  }, []);

  const { socket, isConnected } = useSocket({ endpoint: `localhost:8999`, token: randomUser });

  socket.onmessage = e => {
      if (!isConnected) return;
      const [ message1, message2 ] = JSON.parse(e.data);
      if(message1.data < 100 && message2.data < 100) {
        const newDate = new Date(message1.timestamp);
        const message:DataType = {
          timestamp: `${newDate.getHours()}:${newDate.getMinutes()}`,
          id1_id: message1.id,
          temperature1: message1.temperature,
          id1: message1.data < 100 ? message1.data : null,
          id2_id: message2.id,
          temperature2: message2.temperature,
          id2: message2.data < 100 ? message2.data : null,
        };
        setTemp1(message1.temperature);
        setTemp2(message2.temperature);
        if (graphData.length > 3) {
          setGraphData(prev => [message, ...prev.slice(1)]);
        } else {
          setGraphData(prev => [message, ...prev]);
        }
      }
  };
  
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
      <div className='titles'>
        <div className='title'>
          <h2>ID 1</h2>
          <span>{`Temp: ${temp1}`}</span>
        </div>
        <div className='title'>
          <h2>ID 2</h2>
          <span>{`Temp: ${temp2}`}</span>
        </div>
      </div>
      <LineChart
        width={800}
        height={300}
        data={graphData}
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
          dataKey="id1"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="id2" stroke="#82ca9d" />
      </LineChart>
      </section>
    </div>
  );
}

export default App;
