import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Channels from './Channels';
import Messages from './messages/Messages';
import { useAuth } from '../hooks';
import getDataChannels from '../api/getDataChannels';
import getModalComponent from './Modals/index';

const ChatPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const dispatch = useDispatch();
  const { token } = auth.user;
  const header = token ? { Authorization: `Bearer ${token}` } : {};
  const type = useSelector((state) => state.modal.type);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getDataChannels(dispatch, header));
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error(t('notifications.notАuthorized'));
          auth.logOut();
        } else {
          toast.error(t('notifications.another'));
        }
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

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
