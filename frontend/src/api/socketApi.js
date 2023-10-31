import io from 'socket.io-client';
import { addMessages } from '../slices/messagesSlice';
import { addChannel } from '../slices/channelsSlice';

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

export const newChannel = (newNameChannel) => {
  socket.emit('newChannel', { name: newNameChannel });
};

export const getNewChannels = (dispatch) => {
  socket.on('newChannel', (payload) => {
    dispatch(addChannel(payload));
  });
};

export const removeChannel = (channalId) => {
  socket.emit('removeChannel', { id: channalId });
};

// export default newMessage;

// socket.emit('newChannel', { name: "new channel" });
// добавить к каналам ту же проверку что и сообщением на счет того как они дошли до сервера
