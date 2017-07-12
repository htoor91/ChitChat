export const selectChannels = (state, bool) => {
  const channels = Object.keys(state.channels.channels)
                         .map(key => state.channels.channels[key]);
  return channels.filter(channel => channel.private === bool);
};
