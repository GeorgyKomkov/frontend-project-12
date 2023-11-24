import { createContext, useMemo, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export const SocketContext = createContext({});

const SocketProvider = ({ socket, children }) => {
  const { t } = useTranslation();

  const newMessage = useCallback(async (messageData) => {
    socket.emit('newMessage', messageData, (response) => {
      if (response.status !== 'ok') {
        toast.error(t('notifications.errMessage'));
      }
    });
  }, [socket, t]);

  const newChannel = useCallback((newNameChannel) => {
    socket.emit('newChannel', { name: newNameChannel });
  }, [socket]);

  const removeChannel = useCallback((channelId) => {
    socket.emit('removeChannel', { id: channelId });
  }, [socket]);

  const renameChannel = useCallback((channelId, newNameChannel) => {
    socket.emit('renameChannel', { id: channelId, name: newNameChannel });
  }, [socket]);

  const context = useMemo(() => ({
    newMessage, newChannel, removeChannel, renameChannel,
  }), [newMessage, newChannel, removeChannel, renameChannel]);

  return (
    <SocketContext.Provider value={context}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
