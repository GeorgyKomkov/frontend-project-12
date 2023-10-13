import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: null,
  },
});

export default store;
