// intro point for our server.

// setup config first before anything by requiring it
const config = require('./server/config/config');
const app = require('./server/server');
const logger = require('./server/util/logger');

app.listen(config.port);
logger.log('listening on http://localhost:' + config.port);
