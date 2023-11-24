/* eslint-disable max-len */
import { useTranslation } from 'react-i18next';
import { Button, Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useRef, useEffect, useState } from 'react';
import ChannelIcon from '../icons/ChannelIcon';
import { setCurrentChannel } from '../slices/channelsSlice';
import { open } from '../slices/modalSlice';

const Channels = () => {
  const channelsListRef = useRef(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);
  const [prevChannelsLength, setPrevChannelsLength] = useState(channels.length);
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
  useEffect(() => {
    const focusedChannel = channels.find((channel) => channel.id === currentChannelId);
    const lastChannel = channels[channels.length - 1];
    if (channelsListRef.current) {
      if (currentChannelId === 1) {
        channelsListRef.current.scrollTop = 0;
      } else if (focusedChannel && focusedChannel.id === lastChannel.id) {
        channelsListRef.current.scrollTop = channelsListRef.current.scrollHeight;
      }
    }
  }, [channels, currentChannelId]);
  useEffect(() => {
    if (channels.length > prevChannelsLength) {
      const currentId = channels[channels.length - 1].id;
      dispatch(setCurrentChannel(currentId));
    }
    setPrevChannelsLength(channels.length);
  }, [channels, dispatch, prevChannelsLength]);

  const listChannels = channels.map((channel) => (
    <li className="nav-item w-100" key={channel.id}>
      {channel.removable ? (
        <div role="group" className="d-flex dropdown btn-group">
          <Button
            className="w-100 rounded-0 text-start text-truncate "
            variant={channel.id === currentChannelId ? 'secondary' : 'light'}
            onClick={() => handleChannelClick(channel.id)}
          >
            <span className="me-1">#</span>
            {channel.name}
          </Button>
          <Dropdown>
            <Dropdown.Toggle
              id={`dropdownToggle_${channel.id}`}
              type="button"
              aria-expanded="false"
              className="flex-grow-0 dropdown-toggle dropdown-toggle-split "
              variant={channel.id === currentChannelId ? 'secondary' : 'light'}
            >
              <span className="visually-hidden">{t('dropdown.control')}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleRemoveChannel(channel.id)}>{t('dropdown.remove')}</Dropdown.Item>
              <Dropdown.Item onClick={() => handleRenameChannel(channel.id)}>{t('dropdown.rename')}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ) : (
        <Button
          className="w-100 rounded-0 text-start"
          variant={channel.id === currentChannelId ? 'secondary' : 'light'}
          onClick={() => handleChannelClick(channel.id)}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
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
        ref={channelsListRef}
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {listChannels}
      </ul>
    </div>
  );
};

export default Channels;
