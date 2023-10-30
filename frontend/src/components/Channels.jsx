/* eslint-disable max-len */
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import ChannelIcon from '../icons/ChannelIcon';
import { setCurrentChannel } from '../slices/channelsSlice';
import { open } from '../slices/modalSlice';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);
  const handleChannelClick = (id) => dispatch(setCurrentChannel(id));

  const listChannels = channels.map((channel) => (
    <li className="nav-item w-100" key={channel.id}>
      <Button
        className="w-100 rounded-0 text-start"
        variant={channel.id === currentChannelId ? 'secondary' : ''}
        onClick={() => handleChannelClick(channel.id)}
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>
    </li>
  ));
  const hendleAddChannel = () => {
    dispatch(open({ type: 'addChannel' }));
  };
  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels')}</b>
        <Button
          variant="link"
          className="p-0 text-primary btn-group-vertical border-0"
          onClick={hendleAddChannel}
        >
          <ChannelIcon />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {listChannels}
      </ul>
    </div>
  );
};

export default Channels;
