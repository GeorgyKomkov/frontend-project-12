/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setInitialmessages(state, { payload }) {
      state.messages = payload.messages;
    },
    addMessages(state, { payload }) {
      state.messages.push(payload);
    },
  },
});

export const { setInitialmessages, addMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
