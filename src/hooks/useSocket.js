import { useEffect, useState } from 'react';
import { createSocket } from '../services/api';

export const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = createSocket();
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return socket;
};

export const useRealTimeVotes = (initialData) => {
  const [data, setData] = useState(initialData);
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on('votesUpdated', (updatedData) => {
        setData(updatedData);
      });

      socket.on('participantsUpdated', (updatedParticipants) => {
        setData(prev => ({ ...prev, participants: updatedParticipants }));
      });
    }

    return () => {
      if (socket) {
        socket.off('votesUpdated');
        socket.off('participantsUpdated');
      }
    };
  }, [socket]);

  return data;
};
