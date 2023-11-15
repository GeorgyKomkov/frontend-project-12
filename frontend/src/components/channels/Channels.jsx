/* eslint-disable max-len */
import { useTranslation } from 'react-i18next';
import { Button, Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import ChannelIcon from '../../icons/ChannelIcon';
import { setCurrentChannel } from '../../slices/channelsSlice';
import { open } from '../../slices/modalSlice';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);
  const handleChannelClick = (id) => dispatch(setCurrentChannel(id));
  const hendleAddChannel = () => {
    dispatch(open({ type: 'addChannel' }));
  };
  const handleRemoveChannel = (id) => {
    dispatch(open({ type: 'removeChannel', extra: { channalId: id } }));
  };
  const handleRenameChannel = (id) => {
    dispatch(open({ type: 'renameChannel', extra: { channalId: id } }));
  };
  const renderChannelButton = (channel) => (
    <Button
      className="w-100 rounded-0 text-start"
      variant={channel.id === currentChannelId ? 'secondary' : 'light'}
      onClick={() => handleChannelClick(channel.id)}
    >
      <span className="me-1">#</span>
      {channel.name}
    </Button>
  );
  
  const listChannels = channels.map((channel) => (
    <li className="nav-item w-100" key={channel.id}>
      {channel.removable ? (
        <div role="group" className="d-flex dropdown btn-group">
          {renderChannelButton(channel)}
          <Dropdown>
            <Dropdown.Toggle
              id={`dropdownToggle_${channel.id}`}
              type="button"
              aria-expanded="false"
              className="flex-grow-0 dropdown-toggle dropdown-toggle-split "
              variant={channel.id === currentChannelId ? 'secondary' : 'light'}
            >
              <span className="visually-hidden">Управление каналом</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleRemoveChannel(channel.id)}>Удалить</Dropdown.Item>
              <Dropdown.Item onClick={() => handleRenameChannel(channel.id)}>Переименовать</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ) : (
        renderChannelButton(channel)
      )}
    </li>
  ));
  
  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels')}</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={hendleAddChannel}
        >
          <ChannelIcon />
          <span className="visually-hidden">+</span>
        </button>
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
