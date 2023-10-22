import io from 'socket.io-client';
import { addMessages } from './slices/messagesSlice';

const socket = io();
// отправляем данные на сервер
export const newMessage = async (messageData) => {
  socket.emit('newMessage', messageData);
};
export const getNewMessages = async (dispath) => {
  socket.on('newMessage', (payload) => dispath(addMessages(payload)));
};

// export default newMessage;

// socket.emit('newMessage', { body: "message text", channelId: 1, username: 'admin' });
