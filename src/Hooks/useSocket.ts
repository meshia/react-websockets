import { useState, useEffect } from 'react';

export type PlotState = {
    id: number;
    timestamp: number,
    temperature: number,
    data: number
}[];

export function useSocket({endpoint, token } : { endpoint: string, token: string }) {
    let socket = new WebSocket(`ws://${endpoint}/?access_token=${token}`);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.onopen = () => {
        console.log('ws opened');
        setIsConnected(true);

    };
    socket.onclose = () => {
        console.log('ws closed');
        setIsConnected(false);
    };

    return () => {
        if (socket.readyState === 1) {
            socket.close();
            setIsConnected(false);
        }
    }
  }, [endpoint]);

  return {
    isConnected,
    socket,
  };
}