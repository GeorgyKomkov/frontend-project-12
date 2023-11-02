import io from 'socket.io-client';
import { addMessages } from '../slices/messagesSlice';
import { addChannel, removeChanneFromState, renameChannelFromState } from '../slices/channelsSlice';

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

export const listenForRemoveChannel = (dispatch) => {
  socket.on('removeChannel', (payload) => {
    dispatch(removeChanneFromState(payload));
  });
};

export const renameChannel = (channalId, newNameChannel) => {
  socket.emit('renameChannel', { id: channalId, name: newNameChannel });
};

export const listenForRenameChannel = (dispatch) => {
  socket.on('renameChannel', (payload) => {
    dispatch(renameChannelFromState(payload));
  });
};
