module.exports = function(io){
  io.on('connection', function(socket){
    console.log('USER HAS CONNECTED');

    socket.on('disconnect', function(){
      console.log('USER HAS DISCONNECTED');
    });

    socket.on('join channel', function(data){
      console.log("JOINING CHANNEL: " + data.channel);
      socket.join(data.channel);
    });

    socket.on('leave channel', function(data){
      console.log("LEAVING CHANNEL: " + data.channel);
      socket.leave(data.channel);
    });

    socket.on('broadcast message', function(data){
      console.log("BROADCASTING MESSAGE FROM: " + data.channel);
      socket.broadcast.to(data.channel).emit('receive message', data);
    });
  });
};
