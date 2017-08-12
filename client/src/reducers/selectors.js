export const selectChannels = (state, bool) => {
  return Object
  .keys(state.channels.channels)
  .map(key => state.channels.channels[key])
  .filter(channel => channel.private === bool);
};

export const selectMessages = (state) => {
  return Object
  .keys(state.messages.messages)
  .map(key => state.messages.messages[key])
  .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
};
