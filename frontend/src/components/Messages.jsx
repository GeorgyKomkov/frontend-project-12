import { useSelector } from 'react-redux';
import NewMessegeForm from './NewMessegeForm';

const Messages = () => {
  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);
  const currentChannel = channels.filter((channel) => currentChannelId === channel.id)[0];
  const currentName = currentChannel ? currentChannel.name : '';

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        {/* блок шапки */}
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`#${currentName}`}</b>
          </p>
          <span className="text-muted">0 сообщений</span>
        </div>
        {/* блок вывода сообщений */}
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          <div className="chat-messages overflow-auto px-5 " id="messages-box">
            <div className="text-break mb-2">заглушка</div>
          </div>
        </div>
        {/* блок формы отправки формы */}
        <NewMessegeForm />
      </div>
    </div>
  );
};

export default Messages;
