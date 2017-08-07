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
      socket.broadcast.emit('receive notification', data.channel);
    });

    socket.on('broadcast created channel', function(data){
      socket.broadcast.emit('receive channel', data);
    });

    socket.on('broadcast emoticon', function(data){
      socket.broadcast.to(data.channel).emit('receive emoticon', data);
    });

    socket.on('broadcast updated message', function(data){
      socket.broadcast.to(data.channel).emit('receive updated message', data);
    });

    socket.on('broadcast deleted message', function(data){
      socket.broadcast.to(data.channel).emit('receive deleted message', data);
    });

  });
};
