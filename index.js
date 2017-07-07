const config = require('./server/config/config');
const app = require('./server/server');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const logger = require('./server/util/logger');
const socketEvents = require('./server/socket_events');

server.listen(config.port);
logger.log('listening on http://localhost:' + config.port);
socketEvents(io);
