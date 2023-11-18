/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: null,
};
const defaultChannelId = 1;

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState,
  reducers: {
    setInitialState(state, { payload }) {
      state.channels = [...payload.channels];
      state.currentChannelId = payload.currentChannelId;
    },
    setCurrentChannel(state, { payload }) {
      state.currentChannelId = payload;
    },
    addChannel(state, { payload }) {
      state.channels.push(payload);
    },
    removeChanneFromState(state, { payload }) {
      if (state.currentChannelId === payload.id) state.currentChannelId = defaultChannelId;
      state.channels = state.channels.filter((channel) => channel.id !== payload.id);
    },
    renameChannelFromState(state, { payload }) {
      state.channels = state.channels.map((channel) => {
        if (channel.id === payload.id) {
          return {
            ...channel,
            name: payload.name,
          };
        }
        return channel;
      });
    },
  },
});

export const {
  setInitialState, setCurrentChannel, addChannel, removeChanneFromState, renameChannelFromState,
} = channelsSlice.actions;
export default channelsSlice.reducer;
