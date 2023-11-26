import axios from 'axios';
import routes from '../routes';
import { setChannelsInitialState } from '../slices/channelsSlice.js';
import { setMessagesInitialState } from '../slices/messagesSlice.js';

const getDataChannels = (dispatch, header) => async () => {
  const { data } = await axios.get(routes.dataPath(), {
    headers: header,
  });
  dispatch(setChannelsInitialState(data));
  dispatch(setMessagesInitialState(data));
};

export default getDataChannels;
