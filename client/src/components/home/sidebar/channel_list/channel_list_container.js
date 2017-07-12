import { connect } from 'react-redux';
import ChannelList from './channel_list';
import { selectChannels } from '../../../../reducers/selectors';
// import { deleteChannel } from '../../../actions/channel_actions';

const mapStateToProps = (state) => {
  return({
    publicChannels: selectChannels(state, false),
    privateChannels: selectChannels(state, true)
  });
};

// const mapDispatchToProps = (dispatch) => {
//   return({
//     deleteChannel: (channelId) => dispatch(deleteChannel(channelId))
//   });
// };

export default connect(mapStateToProps, null)(ChannelList);
