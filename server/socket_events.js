module.exports = function(io){
  io.on('connection', function(socket){

    socket.on('broadcast new signup', function(data){
      socket.broadcast.emit('receive new signup', data);
    });

    socket.on('disconnect', function(){
    });

    socket.on('join channel', function(data){
      socket.join(data.channel);
    });

    socket.on('leave channel', function(data){
      socket.leave(data.channel);
    });

    socket.on('broadcast message', function(data){
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
