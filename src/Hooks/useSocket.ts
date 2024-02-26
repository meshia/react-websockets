import { useState, useEffect } from 'react';

export type DataType = {
    id1_id: number,
    temperature1: number,
    id1: number | null,
    id2_id: number,
    temperature2: number,
    id2: number | null
    timestamp: string,
};

export function useSocket({ endpoint } : { endpoint: string }) {
    const [isConnected, setIsConnected] = useState(false);
    const [inMessage, setInMessage] = useState<DataType>();
    const [socket, setSocket] = useState<any>();
    
    useEffect(() => {
        const newSocket = new WebSocket(`ws://${endpoint}`);
        setSocket(newSocket);

        newSocket.onopen = () => {
            console.log('ws opened');
            setIsConnected(true);
        };
        newSocket.onclose = () => {
            console.log('ws closed');
            setIsConnected(false);
        };

        newSocket.onerror = (e) => {
            console.error("error", e)
            newSocket.close();
        }

        newSocket.onmessage = e => {
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
              setInMessage(message);
            }
        };

    return () => {
        if (newSocket.readyState === 1) {
            newSocket.close();
            setIsConnected(false);
        }
    }
  }, []);

  return {
    isConnected,
    inMessage,
    socket
  };
}
