module.exports = function(io){
  io.on('connection', function(socket){

    socket.on('new message', function(message){
      socket.broadcast.emit('new message', message);
    });





  });
};
