import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel(state, { payload }) {
      // eslint-disable-next-line no-param-reassign
      state.channels.push(payload);
    },
  },
});

export const { addChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
