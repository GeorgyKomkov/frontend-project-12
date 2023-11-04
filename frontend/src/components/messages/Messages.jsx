import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NewMessegeForm from './NewMessegeForm';
import { getNewMessages } from '../../socketApi';

const Messages = () => {
  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);
  const currentChannel = channels.filter((channel) => currentChannelId === channel.id)[0];
  const currentName = currentChannel ? currentChannel.name : '';
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messagesInfo.messages);
  const currentMesseges = messages.filter((messege) => messege.channelId === currentChannelId);

  useEffect(() => {
    getNewMessages(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const listMessages = currentMesseges.map((message) => (
    <div className="text-break mb-2" key={message.id}>
      <b>{message.username}</b>
      {`: ${message.body}`}
    </div>
  ));

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        {/* блок шапки */}
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${currentName}`}</b>
          </p>
          <span className="text-muted">{t('messagesCounter.messages', { count: currentMesseges.length })}</span>
        </div>
        {/* блок вывода сообщений */}
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {listMessages}
        </div>
        {/* блок формы отправки формы */}
        <NewMessegeForm />
      </div>
    </div>
  );
};

export default Messages;
