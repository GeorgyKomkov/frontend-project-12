import { createContext, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addMessages } from '../slices/messagesSlice';
import { addChannel, removeChanneFromState, renameChannelFromState } from '../slices/channelsSlice';

export const SocketContext = createContext({});

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();
  const socketOn = useCallback(() => {
    socket.on('newMessage', (payload) => dispatch(addMessages(payload)));
    socket.on('newChannel', (payload) => dispatch(addChannel(payload)));
    socket.on('removeChannel', (payload) => dispatch(removeChanneFromState(payload)));
    socket.on('renameChannel', (payload) => dispatch(renameChannelFromState(payload)));
  }, [dispatch, socket]);

  const newMessage = useCallback(async (messageData) => {
    socket.timeout(3000).emit('newMessage', messageData, (response) => {
      if (response.status !== 'ok') {
        console.error('Ошибка при отправке сообщения на сервер');
      }
    });
  }, [socket]);

  const newChannel = useCallback((newNameChannel) => {
    socket.timeout(3000).emit('newChannel', { name: newNameChannel });
  }, [socket]);

  const removeChannel = useCallback((channelId) => {
    socket.timeout(3000).emit('removeChannel', { id: channelId });
  }, [socket]);

  const renameChannel = useCallback((channelId, newNameChannel) => {
    socket.timeout(3000).emit('renameChannel', { id: channelId, name: newNameChannel });
  }, [socket]);

  const context = useMemo(() => ({
    socketOn, newMessage, newChannel, removeChannel, renameChannel,
  }), [socketOn, newMessage, newChannel, removeChannel, renameChannel]);

  return (
    <SocketContext.Provider value={context}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
