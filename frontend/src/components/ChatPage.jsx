import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Channels from './Channels';
import Messages from './messages/Messages';
import { useAuth } from '../hooks';
import getDataChannels from '../api/getDataChannels';
import getModalComponent from './Modals/index';

const ChatPage = () => {
  const auth = useAuth();
  // const socket = useSocket();
  const dispatch = useDispatch();
  const { token } = auth.user;
  const header = token ? { Authorization: `Bearer ${token}` } : {};
  const type = useSelector((state) => state.modal.type);

  useEffect(() => {
    dispatch(getDataChannels(dispatch, header));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  // useEffect(() => {
  //   socket.socketOn();
  // }, [socket]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
        { getModalComponent(type) }
      </div>
    </div>
  );
};

export default ChatPage;
