import React, { useState, useLayoutEffect } from 'react';
import './App.css';
import { useSocket, DataType } from './Hooks/useSocket';
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
  const [graphData, setGraphData] = useState<DataType[]>([]);
  const [temp1, setTemp1] = useState(0);
  const [temp2, setTemp2] = useState(0);

  const { isConnected, inMessage } = useSocket({ endpoint: `localhost:8999`});

  useLayoutEffect(()=> {
    if(inMessage !== undefined) {
      setTemp1(inMessage.temperature1);
      setTemp2(inMessage.temperature2);
      if (graphData.length > 99) {
        setGraphData(prev => [...prev.slice(1), inMessage]);
      } else {
        setGraphData(prev => [ ...prev, inMessage]);
      }
    }
  }, [inMessage])
  
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
