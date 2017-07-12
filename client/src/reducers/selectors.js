export const selectChannels = (state, bool) => {
  return Object
  .keys(state.channels.channels)
  .map(key => state.channels.channels[key])
  .filter(channel => channel.private === bool);
};
