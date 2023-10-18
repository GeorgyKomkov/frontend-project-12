/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: null,
};

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
  },
});

export const { setInitialState, setCurrentChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
