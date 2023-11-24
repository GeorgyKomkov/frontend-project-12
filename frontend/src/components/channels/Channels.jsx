import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ChannelsList from './ChannelsList';
import ChannelIcon from '../../icons/ChannelIcon';
import { setCurrentChannel } from '../../slices/channelsSlice';
import { open } from '../../slices/modalSlice';

const Channels = () => {
  const channelsListRef = useRef(null);
  const addButtonRef = useRef(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);
  const [prevChannelsLength, setPrevChannelsLength] = useState(channels.length);

  const handleChannelClick = (id) => dispatch(setCurrentChannel(id));
  const hendleAddChannel = () => dispatch(open({ type: 'addChannel' }));
  const handleRemoveChannel = (id) => dispatch(open({ type: 'removeChannel', extra: { channalId: id } }));
  const handleRenameChannel = (id) => dispatch(open({ type: 'renameChannel', extra: { channalId: id } }));

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
    if (channels.length > prevChannelsLength && channels.length !== 2) {
      const currentId = channels[channels.length - 1].id;
      dispatch(setCurrentChannel(currentId));
    }
    setPrevChannelsLength(channels.length);
    addButtonRef.current.focus();
  }, [channels, dispatch, prevChannelsLength, addButtonRef]);

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels')}</b>
        <button
          ref={addButtonRef}
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
        <ChannelsList
          channels={channels}
          currentChannelId={currentChannelId}
          handleChannelClick={handleChannelClick}
          handleRemoveChannel={handleRemoveChannel}
          handleRenameChannel={handleRenameChannel}
        />
      </ul>
    </div>
  );
};

export default Channels;
