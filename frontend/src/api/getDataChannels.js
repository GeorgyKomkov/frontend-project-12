import axios from 'axios';
import routes from '../routes';
import { setInitialState } from '../slices/channelsSlice.js';

const getDataChannels = (dispatch, header) => async () => {
  const { data } = await axios.get(routes.dataPath(), {
    headers: header,
  });
  dispatch(setInitialState(data));
};

export default getDataChannels;
