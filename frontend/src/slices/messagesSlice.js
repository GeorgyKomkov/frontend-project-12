/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { removeChanneFromState } from './channelsSlice';

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
    setMessagesInitialState(state, { payload }) {
      state.messages = [...payload.messages];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeChanneFromState, (state, { payload }) => {
      state.messages = state.messages.filter((message) => message.channelId !== payload.id);
    });
  },
});

export const { addMessages, setMessagesInitialState } = messagesSlice.actions;
export default messagesSlice.reducer;
