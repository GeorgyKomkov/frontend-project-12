/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages(state, { payload }) {
      state.messages.push(payload);
    },
  },
});

export const { addMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
