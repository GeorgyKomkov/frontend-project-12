// import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';
import { addChannel } from '../slices/channelsSlice.js';

// const getDataChannels = createAsyncThunk('data/getDataChannels', async (header) => {
//   const { data } = await axios.get(routes.dataPath(), {
//     headers: header,
//   });
//   console.log(data);
//   return data;
// });
const getDataChannels = (header) => async (dispatch) => {
  try {
    const { data } = await axios.get(routes.dataPath(), {
      headers: header,
    });

    dispatch(addChannel(data));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default getDataChannels;
