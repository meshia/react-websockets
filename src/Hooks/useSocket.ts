import { useState, useEffect } from 'react';

export type PlotState = {
  question: string;
  options: {
    id: number;
    timestamp: number,
    temperature: number,
    data: number
  }[];
};

export function useSocket({endpoint, token } : { endpoint: string, token: string }) {
    let socket = new WebSocket(`ws://${endpoint}`);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.onopen = () => {
        console.log('ws opened')
        setIsConnected(true)
    };
    socket.onclose = () => {
        console.log('ws closed')
        setIsConnected(false)
    };

    return () => {
        if (socket.readyState === 1) { // <-- This is important
            socket.close();
        }
    }
  }, [endpoint]);

  return {
    isConnected,
    socket,
  };
}