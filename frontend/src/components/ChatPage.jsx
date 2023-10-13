import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Channels from './Channels';
import Messages from './Messages';
// import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import getDataChannels from '../api/getDataChannels';

const ChatPage = () => {
  const auth = useAuth();
  console.log(auth.user.username);
  const dispatch = useDispatch();
  const { token } = auth.user;
  const header = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    dispatch(getDataChannels(header));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </div>
    </div>
  );
};

export default ChatPage;
