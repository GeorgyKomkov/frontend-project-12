import io from 'socket.io-client';
import { addMessages } from './slices/messagesSlice';

const socket = io();

export const newMessage = async (messageData) => {
  socket.emit('newMessage', messageData, (response) => {
    if (response.status === 'ok') {
      console.log('Сообщение успешно отправленно на сервер');
    } else {
      console.error('Ошибка при отправке сообщения на сервер');
    }
  });
};
export const getNewMessages = async (dispath) => {
  socket.on('newMessage', (payload) => dispath(addMessages(payload)));
};

// export default newMessage;

// socket.emit('newMessage', { body: "message text", channelId: 1, username: 'admin' });
