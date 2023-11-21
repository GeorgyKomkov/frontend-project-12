import axios from 'axios';
import routes from '../routes';
import { setInitialState } from '../slices/channelsSlice.js';

const getDataChannels = (dispatch, header) => async () => {
  try {
    const { data } = await axios.get(routes.dataPath(), {
      headers: header,
    });
    dispatch(setInitialState(data));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default getDataChannels;
